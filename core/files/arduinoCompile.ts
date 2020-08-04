import {BrowserWindow, ipcMain} from 'electron';
import ArduinoCompiler from "../compiler/compiler";
import {ArduinoSerial} from "./arduinoSerial";
import * as fs from "fs";
import * as path from "path";
import * as util from "../compiler/util";
import logger from "./logger";
import messenger, {MessageType} from "./messenger";

export default class ArduinoCompile {

    private arduinoSerial: ArduinoSerial;
    private running: boolean = false;
    private window: BrowserWindow;
    private cancel: boolean = false;

    public constructor(arduinoSerial: ArduinoSerial){
        this.arduinoSerial = arduinoSerial;

        ipcMain.on("stop", (event, args) => {
            if(!this.running){
                this.send('runprogress', { stage: 'DONE' });
                return;
            }

            this.cancel = true;

            logger.log("Force stopping compile/upload");
            ArduinoCompiler.stopDaemon(true);

            this.running = false;

            const context = this;

            setTimeout(() => {
                ArduinoCompiler.startDaemon()
                    .then(() => {
                        logger.log("Daemon started");
                        console.log('Daemon started');
                    })
                    .catch((error) => {
                        console.log(error);
                        logger.log("Daemon start error", error);

                        messenger.reportFatal();
                    });

                context.send('runprogress', { stage: 'DONE', cancel: true });
            }, 1000);
        });

        ipcMain.on("run", (event, args) => {
            const stats = ArduinoCompiler.getDaemon();
            if(!stats.connected){
                this.send('runprogress', { stage: 'DONE' });

                if(stats.connecting){
                    messenger.report(MessageType.DAEMON, [ "Arduino daemon still loading. Please wait a bit and then try again." ], [{ title: "Ok", action: "installstate" }]);
                }else{
                    messenger.reportFatal();
                    //this.send("runprogress", { stage: "DONE", error: "Arduino daemon couldn't load. Please restart CircuitMess.", fatal: true});
                }
                return;
            }

            if(this.running){
                this.send("runprogress", { stage: "DONE", running: true });
                messenger.report(MessageType.RUN, [ "A compile operation is already running. Please wait or restart CircuitBlocks." ], [{ title: "Ok" }]);
                return;
            }
            this.running = true;

            const code = args.code;
            const minimal = args.minimal != undefined && args.minimal;

            this.send("runprogress", { stage: "COMPILE", progress: 0 });
            this.compile(code, (binary) => {
                this.send('runprogress', { stage: 'UPLOAD', progress: 0 });
                this.upload(binary, args.device,() => {
                    this.send('runprogress', { stage: 'DONE' });
                    this.running = false;
                });
            }, args.device, undefined, minimal);
        });

        ipcMain.on("export", (event, args) => {
            const stats = ArduinoCompiler.getDaemon();
            if(!stats.connected){
                if(stats.connecting){
                    messenger.report(MessageType.DAEMON, [ "Arduino daemon still loading. Please wait a bit and then try again." ], [{ title: "Ok", action: "installstate" }]);
                    //this.send("runprogress", { stage: "DONE", error: "Arduino daemon still loading. Please try a bit later."});
                }else{
                    messenger.reportFatal();
                    //this.send("runprogress", { stage: "DONE", error: "Arduino daemon couldn't load. Please restart CircuitMess.", fatal: true});
                }
                return;
            }

            if(this.running){
                this.send("runprogress", { stage: "DONE", running: true });
                messenger.report(MessageType.RUN, [ "A compile operation is already running. Please wait or restart CircuitBlocks." ], [{ title: "Ok" }]);
                return;
            }
            this.running = true;

            const { code } = args;
            let exportPath = args.path;

            const parsed = path.parse(exportPath);
            if(parsed.ext.toLowerCase() != ".bin"){
                exportPath += ".bin";
            }

            const minimal = args.minimal != undefined && args.minimal;

            this.send("runprogress", { error: null, stage: "EXPORT", progress: 0 });
            this.compile(code, (binary) => {
                fs.copyFile(binary, exportPath, error => {
                    if(error){
                        logger.log("Export copy error", error);
                        this.send('runprogress', { stage: 'DONE', progress: 0 });
                        messenger.report(MessageType.EXPORT, [ "Error saving compiled binary. Make sure you have the permissions to write to the specified file." ], [{ title: "Ok" }])
                    }else{
                        this.send('runprogress', { stage: 'DONE', progress: 0 });
                        messenger.report(MessageType.EXPORT, [ "Export successful" ], [{ title: "Ok" }]);
                    }

                    this.running = false;
                });
            }, args.device, "EXPORT", minimal);
        });

        ipcMain.on("firmware", (event, args) => {
            if(this.running){
                //this.send("installstate", { state: { stage: "DONE", error: "Firmware is already uploading", restoring: true } });
                messenger.report(MessageType.EXPORT, [ "Firmware is already uploading" ], [{ title: "Ok" }]);
                return;
            }

            const stats = ArduinoCompiler.getDaemon();
            if(!stats.connected && stats.connecting){
                messenger.report(MessageType.DAEMON, [ "Arduino daemon still loading. Please wait a bit and then try again." ], [{ title: "Ok" }]);
                //this.send("installstate", { state: { stage: "0%", error: "Arduino daemon still loading. Please wait a bit and then try again.", restoring: true } });
                return;
            }

            const hardwareDir = path.join(ArduinoCompiler.getInstallInfo().local, "packages", "cm", "hardware", "esp32");
            let newest = "";
            fs.readdirSync(hardwareDir).forEach((version) => {
                const versionDir = path.join(hardwareDir, version);
                if(!fs.statSync(versionDir).isDirectory()) return;

                if(newest == "" || util.isNewer(version, newest)){
                    newest = version;
                }
            });
            const firmware = path.join(hardwareDir, newest, "firmware", "firmware.bin");

            this.running = true;
            this.send("installstate", { state: { stage: "0%", restoring: true } });

            this.upload(firmware, "cm:esp32:ringo", () => {
                this.send("installstate", { state: { stage: "DONE" } });
                this.running = false;
            }, (progress => {
                this.send("installstate", { state: { stage: "" + progress + "%", restoring: true } });
            }), (error) => {
                this.send("installstate", { state: { stage: "DONE", restoring: true } });
                messenger.report(MessageType.RESTORE, [ error ], [{ title: "Ok" }]);
                this.running = false;
            });
        });
    }

    private send(event, args){
        if(!this.window) return;
        this.window.webContents.send(event, args);
    }

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private compile(code: string, callback: (binary) => void, device: string, stage?: string, minimal?: boolean){
        if(!stage) stage = "COMPILE";

        ArduinoCompiler.compile(code, device, progress => this.send('runprogress', { stage: stage, progress }), minimal)
            .then((data) => {
                callback(data.binary);
            }).catch(error => {
                if(this.cancel){
                    this.cancel = false;
                    return;
                }
                console.log(error);
                messenger.report(MessageType.RUN, [ "Compile error. Check your code then try again." ], [{ title: "Ok" }]);
                this.send('runprogress', { stage: 'DONE' });
                this.running = false;
            }
        );
    }

    private upload(binary: string, device: string, callback: () => void, pCallback?: (progress) => void, eCallback?: (error) => void){
        if(this.arduinoSerial.getPort() == undefined){
            logger.log("Upload error: Ringo disconnected");
            console.log(new Error("Ringo disconnected"));
            if(eCallback){
                eCallback("Upload error. Check your Ringo then try again.");
            }else{
                this.send('runprogress', { stage: 'DONE' });
                messenger.report(MessageType.RUN, [ "Upload error. Check your Ringo then try again." ], [{ title: "Ok" }]);
            }
            return;
        }

        ArduinoCompiler.uploadBinary(binary, this.arduinoSerial.getPort().comName, device,
            pCallback ? pCallback : progress => this.send("runprogress", { stage: "UPLOAD", progress }))
            .then(() => {
                callback();
            })
            .catch(error => {
                if(this.cancel){
                    this.cancel = false;
                    return;
                }
                console.log(error);
                if(eCallback){
                    eCallback("Upload error. Check your Ringo then try again.")
                }else{
                    this.send('runprogress', { stage: 'DONE' });
                    messenger.report(MessageType.RUN, [ "Upload error. Check your Ringo then try again." ], [{ title: "Ok" }]);
                }
                this.running = false;
            });
    }
}