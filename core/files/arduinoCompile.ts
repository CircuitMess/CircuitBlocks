
import {ipcMain, BrowserWindow} from 'electron';
import ArduinoCompiler from "../compiler/compiler";
import {ArduinoSerial} from "./arduinoSerial";
import * as fs from "fs";
import * as path from "path";
import * as util from "../compiler/util";

export default class ArduinoCompile {

    private arduinoSerial: ArduinoSerial;
    private running: boolean = false;
    private window: BrowserWindow;

    public constructor(arduinoSerial: ArduinoSerial){
        this.arduinoSerial = arduinoSerial;

        ipcMain.on("run", (event, args) => {
            const stats = ArduinoCompiler.getDaemon();
            if(!stats.connected){
                if(stats.connecting){
                    this.send("runprogress", { stage: "DONE", error: "Arduino daemon still loading. Please try a bit later."});
                }else{
                    this.send("runprogress", { stage: "DONE", error: "Arduino daemon couldn't load. Please restart CircuitMess.", fatal: true});
                }
                return;
            }

            if(this.running){
                this.send("runprogress", { stage: "DONE", error: "A compile operation is already running. Please wait or restart CircuitBlocks.", running: true });
                return;
            }
            this.running = true;

            const code = args.code;

            this.send("runprogress", { error: null, stage: "COMPILE", progress: 0 });
            this.compile(code, (binary) => {
                this.send('runprogress', { error: null, stage: 'UPLOAD', progress: 0 });
                this.upload(binary, () => {
                    this.send('runprogress', { error: null, stage: 'DONE' });
                    this.running = false;
                    });
            });
        });

        ipcMain.on("export", (event, args) => {
            const stats = ArduinoCompiler.getDaemon();
            if(!stats.connected){
                if(stats.connecting){
                    this.send("runprogress", { stage: "DONE", error: "Arduino daemon still loading. Please try a bit later."});
                }else{
                    this.send("runprogress", { stage: "DONE", error: "Arduino daemon couldn't load. Please restart CircuitMess.", fatal: true});
                }
                return;
            }

            if(this.running){
                this.send("runprogress", { stage: "DONE", error: "A compile operation is already running. Please wait or restart CircuitBlocks.", running: true });
                return;
            }
            this.running = true;

            const { code } = args;
            let exportPath = args.path;

            const parsed = path.parse(exportPath);
            if(parsed.ext.toLowerCase() != ".bin"){
                exportPath += ".bin";
            }

            this.send("runprogress", { error: null, stage: "EXPORT", progress: 0 });
            this.compile(code, (binary) => {
                fs.copyFile(binary, exportPath, error => {
                    if(error){
                        this.send('runprogress', { error: "Error saving compiled binary. Make sure you have the permissions to write to the specified file.", stage: 'DONE', progress: 0 });
                    }else{
                        this.send('runprogress', { error: "Export successful.", stage: 'DONE', progress: 0 });
                    }

                    this.running = false;
                });
            }, "EXPORT");
        });

        ipcMain.on("firmware", (event, args) => {
            if(this.running){
                this.send("installstate", { state: { stage: "DONE", error: "Firmware is already uploading", restoring: true } });
                return;
            }

            const stats = ArduinoCompiler.getDaemon();
            if(!stats.connected && stats.connecting){
                this.send("installstate", { state: { stage: "0%", error: "Arduino daemon still loading. Please wait a bit and then try again.", restoring: true } });
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

            this.upload(firmware, () => {
                this.send("installstate", { state: { stage: "DONE" } });
                this.running = false;
            }, (progress => {
                this.send("installstate", { state: { stage: "" + progress + "%", restoring: true } });
            }), (error) => {
                this.send("installstate", { state: { error, restoring: true } });
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

    private compile(code: string, callback: (binary) => void, stage?: string){
        if(!stage) stage = "COMPILE";

        ArduinoCompiler.compile(code, progress => this.send('runprogress', { error: null, stage: stage, progress }))
            .then((data) => {
                callback(data.binary);
            }).catch(error => {
                console.log(error);
                this.send('runprogress', { error: "Compile error. Check your code then try again.", stage: 'DONE' });
                this.running = false;
            }
        );
    }

    private upload(binary: string, callback: () => void, pCallback?: (progress) => void, eCallback?: (error) => void){
        if(this.arduinoSerial.getPort() == undefined){
            console.log(new Error("Ringo disconnected"));
            if(eCallback){
                eCallback("Upload error. Check your Ringo then try again.");
            }else{
                this.send('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
            }
            return;
        }

        ArduinoCompiler.uploadBinary(binary, this.arduinoSerial.getPort().comName,
            pCallback ? pCallback : progress => this.send("runprogress", { error: null, stage: "UPLOAD", progress }))
            .then(() => {
                callback();
            })
            .catch(error => {
                console.log(error);
                if(eCallback){
                    eCallback("Upload error. Check your Ringo then try again.")
                }else{
                    this.send('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
                }
                this.running = false;
            });
    }
}