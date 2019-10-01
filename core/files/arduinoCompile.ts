
import {ipcMain, BrowserWindow} from 'electron';
import ArduinoCompiler from "../compiler/compiler";
import {ArduinoSerial} from "./arduinoSerial";
import * as fs from "fs";
import * as path from "path";

export default class ArduinoCompile {

    private arduinoSerial: ArduinoSerial;
    private running: boolean = false;
    private window: BrowserWindow;

    public constructor(arduinoSerial: ArduinoSerial){
        this.arduinoSerial = arduinoSerial;

        ipcMain.on("run", (event, args) => {
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
                    }, event);
            }, event);
        });

        ipcMain.on("export", (event, args) => {
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
            }, event, "EXPORT");
        });
    }

    private send(event, args){
        if(!this.window) return;
        this.window.webContents.send(event, args);
    }

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private compile(code: string, callback: (binary) => void, event, stage?: string){
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

    private upload(binary: string, callback: () => void, event){
        if(this.arduinoSerial.getPort() == undefined){
            console.log(new Error("Ringo disconnected"));
            this.send('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
            return;
        }

        ArduinoCompiler.uploadBinary(binary, this.arduinoSerial.getPort().comName,
            progress => this.send("runprogress", { error: null, stage: "UPLOAD", progress }))
            .then(() => {
                callback();
            })
            .catch(error => {
                console.log(error);
                this.send('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
                this.running = false;
            });
    }
}