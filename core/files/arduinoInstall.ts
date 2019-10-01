import ArduinoCompiler from "../compiler/compiler";
import Installer from "../compiler/installer";
import {ipcMain, BrowserWindow} from "electron";

interface SetupState {
    stage: string;
    error: string | undefined;
}

export default class arduinoInstall {

    private setupState: SetupState = { stage: "", error: undefined };
    private window: BrowserWindow;
    private installer: Installer;

    constructor(){
        ipcMain.on("installstate", (event, args) => {
            event.reply("installstate", { state: this.setupState });
        });

        ipcMain.on("install", (event, args) => {
            this.setup();
        });
    }

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private startDaemon(){
        ArduinoCompiler.startDaemon()
            .catch((error) => console.log(error))
            .then(() => {
                console.log('Daemon started');
            });
    }

    private sendSetupState(){
        if(this.window == undefined) return;

        this.window.webContents.send("installstate", { state: this.setupState });
    }

    public setup(){
        this.setupState.error = undefined;
        const installInfo = ArduinoCompiler.checkInstall();
        if (installInfo === null || Object.values(installInfo).indexOf(null) !== -1) {
            console.log('Installing');

            if(this.installer == undefined){
                this.installer = new Installer();
            }

            this.installer.install(installInfo, (stage) => {
                console.log(stage);
                this.setupState.stage = stage;
                this.sendSetupState();

                if(stage == "DONE"){
                    this.startDaemon();
                }
            }, (err) => {
                this.setupState.error = err instanceof Error ? err.message : err;
                this.sendSetupState();
            });
        } else {
            console.log('All ok');
            this.setupState.stage = "DONE";
            this.sendSetupState();

            this.startDaemon();
        }
    }
}