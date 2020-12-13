import {ipcMain, BrowserWindow} from "electron";
import ArduinoCompiler, {PortDescriptor} from "../compiler/compiler";
import Serial from "../compiler/serial";
import logger from "./logger";

export class ArduinoSerial {
    private serial: Serial;
    private window: BrowserWindow;

    private connected: boolean = false;
    private port: PortDescriptor | undefined = undefined;

    private checking: boolean = false;

    public constructor(){
        this.serial = ArduinoCompiler.getSerial();

        ipcMain.on('ports', (event, _args) => {
            const res = { port: this.connected ? this.port : null };
            event.reply('ports', res);
        });

        ipcMain.on("serial", (event, args) => {
            const { input } = args;
            this.serial.write(input);
        });

        ipcMain.on("monitorOpen", () => {
            this.serial.registerListener((content) => {
                if(!this.window) return;
                this.window.webContents.send('serial', { content })
            });
        });

        setInterval(() => this.checkConnection(), 1000);
    }

    public getPort(): PortDescriptor {
        return this.port;
    }

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private onConnect(){
        this.serial.start(this.port);

        if(!this.window) return;
        this.window.webContents.send('ports', { port: this.port.comName });
    }

    private onDisconnect(){
        this.serial.stop();

        if(!this.window) return;
        this.window.webContents.send('ports', { port: null });
    }

    private checkConnection(){
        if(this.checking) return;
        this.checking = true;

        ArduinoCompiler.identifyPort()
            .then(ports => {
                if(ports.length == 0 && this.connected){
                    this.connected = false;
                    this.port = undefined;
                    this.onDisconnect();
                }else if(ports.length != 0 && !this.connected){
                    this.connected = true;
                    this.port = ports[0];
                    this.onConnect();
                }

                this.checking = false;
            })
            .catch(err => {
                logger.log("Port identifying error", err);

                console.log("Port identifying failed");
                console.log(err);
            });
    }

}