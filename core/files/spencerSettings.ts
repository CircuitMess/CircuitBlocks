import {ipcMain} from 'electron';
import Serial from "../compiler/serial";
import ArduinoCompiler from "../compiler/compiler";

interface Settings {
    ssid: string;
    password: string;
    fahrenheit: number
}

export default class SpencerSettings {
    private serial: Serial;
    
    public constructor(){
        this.serial = ArduinoCompiler.getSerial();

        ipcMain.on("SpencerGet", (e) => this.get(e.reply));

        ipcMain.on("SpencerSet", (e, args) => this.set(args.settings, e.reply));

        ipcMain.on("SpencerScan", (e) => this.scan(e.reply));
    }

    private get(reply: Function){
        if(!this.serial.isConnected()){
            reply("SpencerGet", { error: "nocon" });
            return;
        }

        const keys = [ "ssid", "password", "fahrenheit" ];
        const settings: Settings = { ssid: "", password: "", fahrenheit: 0 };
        let i = 0;

        const timeout = setTimeout(() => {
            reply("SpencerGet", { error: "nocon" });
            this.serial.registerSplitListener(undefined);
        }, 1000);

        this.serial.registerSplitListener(msg => {
            const parts = msg.split(":");
            if(parts.length !== 2 || parts[0] != "SET") return;

            if(parts[1] == "--SET"){
                clearTimeout(timeout);
                reply("SpencerGet", { settings });
                this.serial.registerSplitListener(undefined);
                return;
            }

            settings[keys[i++]] = parts[1];
        });

        this.serial.write("GET");
    }

    private set(settings: Settings, reply: Function){
        if(!this.serial.isConnected()){
            reply("SpencerSet", { error: "nocon" });
            return;
        }

        for(const [key, value] of Object.entries(settings)){
            if(value == ""){
                settings[key] = "SpencerFoo";
            }
        }

        const timeout = setTimeout(() => {
            reply("SpencerSet", { error: "nocon" });
            this.serial.registerSplitListener(undefined);
        }, 1000);

        this.serial.registerSplitListener(msg => {
            if(msg == "OK"){
                clearTimeout(timeout);
                reply("SpencerSet", { ok: true });
                this.serial.registerSplitListener(undefined);
            }
        });

        const ssid = settings.ssid && settings.ssid !== "" ? settings.ssid : "SpencerFoo";
        const pass = settings.password && settings.password !== "" ? settings.password : "SpencerFoo";
        const fah = settings.fahrenheit ? "" + settings.fahrenheit : "0";

        this.serial.writeRaw("SET");
        this.serial.write(ssid);
        this.serial.write(pass);
        this.serial.write(fah);
        this.serial.write("");
    }

    private scan(reply: Function){
        if(!this.serial.isConnected()){
            reply("SpencerScan", { error: "nocon" });
            return;
        }

        const networks: string[] = [];

        const timeout = setTimeout(() => {
            if(networks.length === 0){
                reply("SpencerScan", { error: "nocon" });
            }else{
                reply("SpencerScan", { networks });
            }
            this.serial.registerSplitListener(undefined);
        }, 10000);

        this.serial.registerSplitListener(msg => {
            const parts = msg.split(":");
            if(parts.length !== 2 || parts[0] !== "SCN") return;

            if(parts[1] == "--SCN"){
                clearTimeout(timeout);
                reply("SpencerScan", { networks });
                this.serial.registerSplitListener(undefined);
                return;
            }

            networks.push(parts[1]);
        });

        this.serial.write("SCN");
    }
}