import * as path from 'path';
import DomParser from 'dom-parser';

import {ipcMain, BrowserWindow} from 'electron';

import homePath from './consts';
import * as fs from "fs";
import logger from "./logger";
import ArduinoCompiler from "../compiler/compiler";

interface Sketch {
    title: string;
    path: string;
    snapshot?: string;
    description?: string;
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
                    event.reply("load", { data, type });
                }
            });
        });

        ipcMain.on("save", (event, args) => {
            const { title, data, type } = args;

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
                path: sketchPath
            };

            const content = fs.readFileSync(sketchPath, { encoding: "utf-8" });
            const dom = domParser.parseFromString(content);

            if(dom.getElementsByTagName("variables").length == 0 || dom.getElementsByTagName("block").length == 0) return;

            const snapshots = dom.getElementsByTagName("snapshot");
            if(snapshots.length > 0){
                const snapshot = snapshots[0].innerHTML.trim();

                if(snapshot != ""){
                    sketch.snapshot = snapshot;
                }
            }

            const descriptions = dom.getElementsByTagName("description");
            if(descriptions.length > 0){
                const description = descriptions[0].innerHTML.trim();

                if(description != ""){
                    sketch.description = description;
                }
            }

            sketches.push(sketch);
        });

        return sketches;
    }

    private getCodeSketches(directory: string){
        if(!fs.existsSync(directory)) return [];

        const sketches: Sketch[] = [];

        const files = fs.readdirSync(directory);
        files.forEach(file => {
            if(file.toLowerCase() == "libraries") return;

            const sketchPath = path.join(directory, file, file + ".ino");
            if(!fs.existsSync(sketchPath)) return;

            const sketch: Sketch = {
                title: file,
                path: sketchPath
            };

            sketches.push(sketch);
        });

        return sketches;
    }

    private getExamples(): Category[] {
        const examplesDir = path.join(".", "examples");
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
