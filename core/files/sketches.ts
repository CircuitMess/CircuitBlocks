import { existsSync, mkdirSync, readdir, readdirSync } from 'fs';
import * as path from 'path';
import DomParser from 'dom-parser';

import {ipcMain, BrowserWindow} from 'electron';

import homePath from './consts';
import * as fs from "fs";
import {StringDecoder} from "string_decoder";

interface Sketch {
    title: string;
    path: string;
    snapshot?: string;
    description?: string;
}

interface Category {
    title: string;
    sketches: Sketch[];
}

export default class Sketches {

    private static domParser: DomParser;

    public constructor(){
        Sketches.domParser = new DomParser();

        ipcMain.on("sketches", (event, args) => {
            const sketches = this.getSkecthes(homePath);
            event.reply("sketches", { sketches });
        });

        ipcMain.on("examples", (event, args) => {
            const categories = this.getExamples();
            event.reply("examples", { categories });
        });
    }

    private getSkecthes(directory: string): Sketch[] {
        const domParser = Sketches.domParser;

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

    private getExamples(): Category[] {
        const examplesDir = path.join(".", "examples");
        const categories: Category[] = [];

        const getSketches = this.getSkecthes;

        const categoryDirs = fs.readdirSync(examplesDir);
        categoryDirs.forEach(dir => {
            const categoryPath = path.join(examplesDir, dir);

            const stat = fs.statSync(categoryPath);
            if(!stat.isDirectory()) return;

            const parsed = path.parse(categoryPath);

            const category: Category = {
                title: parsed.name,
                sketches: getSketches(categoryPath)
            };

            categories.push(category);
        });

        return categories;
    }
}
