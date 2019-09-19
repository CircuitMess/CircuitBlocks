import ArduinoCompiler from "./compiler";
import SerialPort from 'serialport';
import * as path from "path";
import * as os from "os";
import * as child_process from 'child_process';

export default class Serial {

    private messageListener: (msg: string) => void;
    private com: SerialPort.SerialPort;
    private buffer: string = "";
    private uploading: boolean = false;

    public constructor() {

    }

    private flush(){
        if(this.buffer == "") return;

        this.messageListener(this.buffer);
        this.buffer = "";
    }

    public stop(){
        if(this.com === undefined) return;

        this.com.flush();
        this.com.close();
        this.com = undefined;

        this.flush();
    }

    private data(buffer){
        const char = buffer.toString();

        if(char == "\n"){
            this.flush();
        }else{
            this.buffer += char;
        }
    }

    public start(){
        if(this.uploading) return;
        this.stop();

        ArduinoCompiler.identifyPort().then(ports => {
            if(ports.length == 0) return;
            const port = ports[0].comName;

            this.com = new SerialPort(port, { baudRate: 9600 });
            this.com.on("data", data => this.data(data));
        });
    }

    public registerListener(listener: (msg: string) => void) {
        this.messageListener = listener;
    }

    public write(message: string){
        if(this.com === undefined) return;

        this.com.write(message);
    }

    /**
     * Uploads the specified binary to the MAKERphone
     * @param binary Path to the binary
     * @param port MAKERphone port
     */
    public upload(binary: string, port: string) {
        this.stop();
        this.uploading = true;

        const CM_LOCAL: string = path.join(ArduinoCompiler.getDirectories().local, 'packages', 'cm');

        const win = os.type() === 'Windows_NT';
        const TOOL = path.join(
            CM_LOCAL,
            'tools',
            'esptool_py',
            '2.6.1',
            'esptool.' + (win ? 'exe' : 'py')
        );

        const binaryPath = path.parse(binary);

        const options: string[] = [
            TOOL,
            '--chip esp32',
            '--port ' + port,
            '--baud 921600',
            '--before default_reset',
            '--after hard_reset',
            'write_flash',
            '-z',
            '--flash_mode dio',
            '--flash_freq 80m',
            '--flash_size detect',
            '0xe000 ' +
            path.join(CM_LOCAL, 'hardware', 'esp32', '1.0.0', 'tools', 'partitions', 'boot_app0.bin'),
            '0x1000 ' +
            path.join(
                CM_LOCAL,
                'hardware',
                'esp32',
                '1.0.0',
                'tools',
                'sdk',
                'bin',
                'bootloader_dio_80m.bin'
            ),
            '0x10000 ' + binary,
            '0x8000 ' + path.join(binaryPath.dir, binaryPath.name + '.partitions.bin')
        ];

        if (!win) options.unshift('python');
        child_process.execSync(options.join(' '));

        this.uploading = false;
        this.start();
    }
}