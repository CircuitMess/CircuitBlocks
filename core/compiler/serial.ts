import ArduinoCompiler, {PortDescriptor} from './compiler';
import SerialPort from 'serialport';
import * as path from 'path';
import * as os from 'os';
import * as child_process from 'child_process';
import logger from "../files/logger";

export default class Serial {
  private messageListener: (msg: string) => void = undefined;
  private splitMessageListener: (msg: string) => void = undefined;
  private com: SerialPort.SerialPort;
  private buffer: string = '';
  private uploading: boolean = false;

  public constructor() {}

  private flush() {
    if (this.buffer == '') return;

    let lastnl = this.buffer.lastIndexOf("\n");

    let message = this.buffer.substring(0, lastnl);

    if(lastnl != this.buffer.length-1){
      this.buffer = this.buffer.substr(lastnl+1);
    }else{
      this.buffer = "";
    }

    if(this.messageListener != undefined){
      this.messageListener(message);
    }

    if(this.splitMessageListener != undefined){
      const parts = message.split("\n");
      parts.forEach(part => {
        this.splitMessageListener(part.replace("\r", ""));
      });
    }
  }

  public isConnected(){
    return this.com !== undefined && this.com.isOpen;
  }

  public setUploading(uploading: boolean) {
    this.uploading = uploading;
  }

  public stop() {
    if (this.com === undefined || !this.com.isOpen) return;

    this.com.drain();
    this.com.close();
    this.com = undefined;

    this.flush();
  }

  private data(buffer) {
    const data = buffer.toString();

    this.buffer += data;

    if (data.indexOf("\n") != -1) {
      this.flush();
    }
  }

  public start(port?: PortDescriptor) {
    if (this.uploading) return;
    this.stop();

    const context = this;

    function connect(comName){
      logger.log("conncting " + comName);
      console.log("conncting " + comName);

      const options: any = { baudRate: 115200 };

      // fix for old version of serialport on Windows. left for archive purposes
      /*if(os.type() == "Windows_NT"){
        options.hupcl = true;
        options.rtscts = true;
      }*/

      context.com = new SerialPort(comName, options);
      context.com.on('data', (data) => context.data(data));
    }

    if(port){
      connect(port.comName);
    }else{
      ArduinoCompiler.identifyPort().then((ports) => {
        if(ports.length == 0) return;
        connect(ports[0].comName);
      }).catch(err => {
        logger.log("Port identify error", err);
      });
    }
  }

  public registerListener(listener: (msg: string) => void) {
    this.messageListener = listener;
  }

  public registerSplitListener(listener: (msg: string) => void) {
    this.splitMessageListener = listener;
  }

  public write(message: string) {
    if (this.com === undefined) return;

    this.com.write(message + "\n");
    this.com.drain();
  }

  public writeRaw(message: string){
    if (this.com === undefined) return;

    this.com.write(message);
    this.com.drain();
  }

  /**
   * Uploads the specified binary to the MAKERphone
   * @deprecated Use {@link ArduinoCompiler.uploadBinary} instead
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
