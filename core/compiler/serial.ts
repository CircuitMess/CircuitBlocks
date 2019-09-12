import ArduinoCompiler from "./compiler";
import SerialPort from 'serialport';

export default class Serial {

    private messageListener: (msg: string) => void;
    private com: SerialPort.SerialPort;
    private buffer: string = "";

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
        this.stop();
        if(!ArduinoCompiler.canSerialCom()) return;

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
}