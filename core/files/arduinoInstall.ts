import ArduinoCompiler from "../compiler/compiler";
import Installer from "../compiler/installer";
import {ipcMain, BrowserWindow} from "electron";
import logger from "./logger";
import messenger from "./messenger";

interface SetupState {
    stage: string;
    error: string | undefined;
}

export default class arduinoInstall {

    private setupState: SetupState = { stage: "", error: undefined };
    private window: BrowserWindow;
    private installer: Installer;
	private installing: boolean = false;

    constructor(callback?: () => void){
        ipcMain.on("installstate", (event, args) => {
            event.reply("installstate", { state: this.setupState });
        });

        ipcMain.once("install", (event, args) => {
            this.setup(callback);
        });

        ipcMain.on("daemoncheck", (event, args) => {
            const stats = ArduinoCompiler.getDaemon();
            if (!this.installing && !stats.connected && !stats.connecting) {
				console.log(stats);
				messenger.reportFatal();
                //event.reply("daemonfatal", {error: "Arduino daemon couldn't load. Please restart the app. If this problem persists, please reinstall CircuitBlocks."});
            }
        });
    }

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private startDaemon(){
        ArduinoCompiler.startDaemon()
            .then(() => {
                logger.log("Daemon started");
                console.log('Daemon started');
            })
            .catch((error) => {
                console.log(error);
                logger.log("Daemon start error", error);

                if(this.window){
                    messenger.reportFatal();
                    //this.window.webContents.send("daemonfatal", { error:  "Arduino daemon couldn't load. Please restart the app. If this problem persists, please reinstall CircuitBlocks." });
                }
            });
    }

    private sendSetupState(){
        if(this.window == undefined) return;

        this.window.webContents.send("installstate", { state: this.setupState });
    }

    public setup(callback?: () => void){
		this.installing = true;
        this.setupState.error = undefined;
        const installInfo = ArduinoCompiler.checkInstall();

        if(this.installer == undefined){
            this.installer = new Installer();
        }

        if (installInfo === null || Object.values(installInfo).indexOf(null) !== -1) {
            logger.log("Installing");
            console.log('Installing');

            this.installer.install(installInfo, (stage) => {
                console.log(stage);
                this.setupState.stage = stage;
                this.sendSetupState();

                if(stage == "DONE"){
					this.installing = false;
                    this.startDaemon();
                    if(callback) callback();
                }
            }, (err) => {
				this.installing = false;
				console.log(err);
				logger.log("Install error", err);
                this.setupState.error = err instanceof Error ? err.message : err;
                this.sendSetupState();
                if(callback) callback();
            });
        } else {
            logger.log("Installed, updating");
            console.log('All ok, updating');
            this.setupState.stage = "UPDATE";
            this.sendSetupState();

            // The CLI usually hogs all the IO and doesn't let electron start. We add a delay to the update so
            // that the app can start and display an "Updating" message to the user
            setTimeout(() => {
                this.installer.update((stage) => {
                    this.setupState.stage = stage;
                    this.installing = false;
                    this.sendSetupState();
                    this.startDaemon();
                    if(callback) callback();
                }, installInfo, (err) => {
                    logger.log("Update error", err);
                    this.installing = false;
                    this.setupState.error = err instanceof Error ? err.message : err;
                    console.log(err);
                    this.sendSetupState();
                    if(callback) callback();
                });
            }, 2000);
        }
    }
}