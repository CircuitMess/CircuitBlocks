import * as path from 'path';
import DomParser from 'dom-parser';

import {ipcMain, BrowserWindow} from 'electron';

import homePath from './consts';
import * as fs from "fs";
import * as os from "os";
import logger from "./logger";
import ArduinoCompiler from "../compiler/compiler";

interface Device {
    fqbn: string;
    name: string;
}

export const Devices: { [name: string]: Device } = {
    "cm:esp32:ringo": { fqbn: "cm:esp32:ringo", name: "Ringo" },
    "cm:esp8266:nibble": { fqbn: "cm:esp8266:nibble", name: "Nibble" },
    "cm:esp32:spencer": { fqbn: "cm:esp32:spencer", name: "Spencer" },
    "cm:esp32:jayd": { fqbn: "cm:esp32:jayd", name: "Jay-D" },
    "cm:esp32:wheelson": { fqbn: "cm:esp32:wheelson", name: "Wheelson" },
    "cm:esp32:byteboi": { fqbn: "cm:esp32:byteboi", name: "ByteBoi" },
};

interface Sketch {
    title: string;
    device: string;
    path: string;
    snapshot?: string;
    description?: string;
    pos?: number;
}

interface Category {
    title: string;
    sketches: { code: Sketch[], block: Sketch[] };
}

enum SketchType { BLOCK, CODE }

export default class Sketches {

    private static domParser: DomParser;

    public constructor(){
        Sketches.domParser = new DomParser();

        ipcMain.on("sketches", (event, args) => {
            const installInfo = ArduinoCompiler.getInstallInfo();

            if(!installInfo || !installInfo.sketchbook){
                event.reply("sketches", { sketches: { block: [], code: [] } });
                return;
            }

            const sketches = {
                block: this.getBlockSketches(homePath),
                code: this.getCodeSketches(installInfo.sketchbook)
            };
            event.reply("sketches", { sketches });
        });

        ipcMain.on("examples", (event, args) => {
            const categories = this.getExamples();
            event.reply("examples", { categories });
        });

        ipcMain.on("load", (event, args) => {
            const parsed = path.parse(args.path);
            let type: SketchType;
            if(parsed.ext.toLowerCase() == ".ino"){
                type = SketchType.CODE;
            }else if(parsed.ext.toLowerCase() == ".xml"){
                type = SketchType.BLOCK;
            }else{
                event.reply("load", { error: "Invalid sketch." });
                return;
            }

            fs.readFile(args.path, { encoding: "utf-8" }, (err, data) => {
                if(err){
                    logger.log("Loading sketch", err);
                    event.reply("load", { error: "Error loading sketch. Please restart or make sure the sketch wasn't deleted." });
                }else{
                    let device: string = "cm:esp32:ringo";
                    if(type == SketchType.BLOCK){
                        const dom = Sketches.domParser.parseFromString(data);
                        const devices = dom.getElementsByTagName("device");
                        if(devices.length > 0){
                            const _device = devices[0].innerHTML.trim();

                            if(Devices.hasOwnProperty(_device)){
                                device = _device;
                            }
                        }
                    }else{
                        const deviceParts = data.split(os.EOL)[0].trim().split(" ");
                        if(deviceParts.length == 2 && Devices.hasOwnProperty(deviceParts[1])){
                            device = deviceParts[1];
                        }
                    }
                    event.reply("load", { data, type, device });
                }
            });
        });

        ipcMain.on("save", (event, args) => {
            const { title, type, device } = args;
            var data = args.data;

            let sketchDir: string;
            let ext: string;
            if(type == SketchType.BLOCK){
                sketchDir = homePath;
                ext = ".xml";
            }else{
                if(title.toLowerCase() == "libraries"){
                    event.reply("save", { error: "Sketch cannot be named 'libraries'." });
                    return;
                }

                const installInfo = ArduinoCompiler.getInstallInfo();
                sketchDir = path.join(installInfo.sketchbook, title);
                ext = ".ino";

                const deviceParts = data.split(os.EOL)[0].trim().split(" ");
                if(deviceParts.length != 2 || !Devices.hasOwnProperty(deviceParts[1])){
                    data = "// " + device + os.EOL + data;
                }
            }

            if(!fs.existsSync(sketchDir)){
                fs.mkdirSync(sketchDir);
            }

            const sketchPath = path.join(sketchDir, title + ext);
            fs.writeFile(sketchPath, data, { encoding: "utf-8" }, err => {
                if(err){
                    logger.log("Saving sketch", err);
                    event.reply("save", { error: "Error saving sketch." })
                }else{
                    event.reply("save", { });
                }
            });
        });
    }

    private getBlockSketches(directory: string): Sketch[] {
        const domParser = Sketches.domParser;

        if(!fs.existsSync(directory)) return [];

        const sketches: Sketch[] = [];

        const files = fs.readdirSync(directory);
        files.forEach(file => {
            const sketchPath = path.join(directory, file);
            const parsed = path.parse(sketchPath);
            if(parsed.ext.toLowerCase() != ".xml") return;

            const sketch: Sketch = {
                title: parsed.name,
                path: sketchPath,
                device: "cm:esp32:ringo"
            };

            const content = fs.readFileSync(sketchPath, { encoding: "utf-8" });
            const dom = domParser.parseFromString(content);

            if(dom.getElementsByTagName("variables").length == 0 || dom.getElementsByTagName("block").length == 0) return;

            const get = (prop: string): any => {
                const elements = dom.getElementsByTagName(prop);
                if(elements.length == 0) return undefined;

                const element = elements[0].innerHTML.trim();
                if(element == "") return undefined;

                return element;
            }

            const device = get("device");
            if(Devices.hasOwnProperty(device)){
                sketch.device = device;
            }

            sketch.snapshot = get("snapshot");
            sketch.description = get("description");
            sketch.pos = get("pos");

            sketches.push(sketch);
        });

        sketches.sort((a, b) => a.pos - b.pos);

        return sketches;
    }

    private getCodeSketches(directory: string){
        if(!fs.existsSync(directory)) return [];

        const sketches: Sketch[] = [];

        const files: string[] = [];
        try{
            files.push(...fs.readdirSync(directory));
        }catch(e){
            logger.log("Get code sketches readdir error", e);
            return [];
        }

        files.forEach(file => {
            if(file.toLowerCase() == "libraries") return;

            const sketchPath = path.join(directory, file, file + ".ino");
            if(!fs.existsSync(sketchPath) || !fs.statSync(sketchPath).isFile()) return;

            const sketch: Sketch = {
                title: file,
                path: sketchPath,
                device: "cm:esp32:ringo"
            };

            const deviceLine = fs.readFileSync(sketchPath, { encoding: "utf-8" }).split(os.EOL)[0];
            const deviceParts = deviceLine.trim().split(" ");
            if(deviceParts.length == 2 && Devices.hasOwnProperty(deviceParts[1])){
                sketch.device = deviceParts[1];
            }

            sketches.push(sketch);
        });

        return sketches;
    }

    private getExamples(): Category[] {
        const examplesDir = (process.env.ELECTRON_ENV && process.env.ELECTRON_ENV == "development")
        ? path.join(".", "examples")
        : path.join(process.resourcesPath, "examples");

        const categories: Category[] = [];

        const getSketches = this.getBlockSketches;

		if(!fs.existsSync(examplesDir)) return [];

        const categoryDirs = fs.readdirSync(examplesDir);
        categoryDirs.forEach(dir => {
            const categoryPath = path.join(examplesDir, dir);

            const stat = fs.statSync(categoryPath);
            if(!stat.isDirectory()) return;

            const parsed = path.parse(categoryPath);

            const category: Category = {
                title: parsed.name,
                sketches: { block: getSketches(categoryPath), code: [] }
            };

            categories.push(category);
        });

        return categories;
    }
}
