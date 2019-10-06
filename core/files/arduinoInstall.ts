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
	private installing: boolean = false;

    constructor(){
        ipcMain.on("installstate", (event, args) => {
            event.reply("installstate", { state: this.setupState });
        });

        ipcMain.on("install", (event, args) => {
            this.setup();
        });

        ipcMain.on("daemoncheck", (event, args) => {
            const stats = ArduinoCompiler.getDaemon();
            if (!this.installing && !stats.connected && !stats.connecting) {
				console.log(stats);
                event.reply("daemonfatal", {error: "Arduino daemon couldn't load. Please restart the app. If this problem persists, please reinstall CircuitMess."});
            }
        });
    }

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private startDaemon(){
        ArduinoCompiler.startDaemon()
            .then(() => {
                console.log('Daemon started');
            })
            .catch((error) => {
                console.log(error);

                if(this.window){
                    this.window.webContents.send("daemonfatal", { error:  "Arduino daemon couldn't load. Please restart the app. If this problem persists, please reinstall CircuitMess." });
                }
            });
    }

    private sendSetupState(){
        if(this.window == undefined) return;

        this.window.webContents.send("installstate", { state: this.setupState });
    }

    public setup(){
		this.installing = true;
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
					this.installing = false;
                }
            }, (err) => {
				this.installing = false;
				console.log(err);
                this.setupState.error = err instanceof Error ? err.message : err;
                this.sendSetupState();
            });
        } else {
			this.installing = false;
			
            console.log('All ok');
            this.setupState.stage = "DONE";
            this.sendSetupState();

            this.startDaemon();
        }
    }
}