
import {ipcMain} from 'electron';
import ArduinoCompiler from "../compiler/compiler";
import {ArduinoSerial} from "./arduinoSerial";

export default class ArduinoCompile {

    private arduinoSerial: ArduinoSerial;

    public constructor(arduinoSerial: ArduinoSerial){
        this.arduinoSerial = arduinoSerial;

        ipcMain.on("run", (event, args) => {
            const code = args.code;

            event.reply("runprogress", { error: null, stage: "COMPILE", progress: 0 });
            this.compile(code, (binary) => {
                event.reply('runprogress', { error: null, stage: 'UPLOAD', progress: 0 });
                this.upload(binary, () => event.reply('runprogress', { error: null, stage: 'DONE' }), event);
            }, event);
        });
    }

    private compile(code: string, callback: (binary) => void, event){
        ArduinoCompiler.compile(code, progress => event.reply('runprogress', { error: null, stage: 'COMPILE', progress }))
            .then((data) => {
                callback(data.binary);
            }).catch(error => {
                console.log(error);
                event.reply('runprogress', { error: "Compile error. Check your code then try again.", stage: 'DONE' });
            }
        );
    }

    private upload(binary: string, callback: () => void, event){
        if(this.arduinoSerial.getPort() == undefined){
            console.log(new Error("Ringo disconnected"));
            event.reply('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
            return;
        }

        ArduinoCompiler.uploadBinary(binary, this.arduinoSerial.getPort().comName,
            progress => event.reply("runprogress", { error: null, stage: "UPLOAD", progress }))
            .then(() => {
                callback();
            })
            .catch(error => {
                console.log(error);
                event.reply('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
            });
    }
}