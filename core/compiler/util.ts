import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import * as zlib from 'zlib';
import * as lzma from 'lzma-native';
import * as tar from 'tar';
import * as os from 'os';
import * as request from 'request';
import * as unzip from 'unzipper';
import logger from "../files/logger";
import * as child_process from "child_process";
import {ExecException} from "child_process";
import {ipcMain, BrowserWindow} from "electron";

export function tmpdir(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix + '-'));
}

export function download(download: string, directory: string, callback?: ({ percent, bytesPerSecond }) => void): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const filename = path.posix.basename(url.parse(download).pathname);
    const filepath = path.join(directory, filename);

    const output = fs.createWriteStream(filepath);

    let total: number = 1;
    let transferred: number = 0;

    let writes: number = 0;
    let lastTransferred: number = 0;
    let time = process.hrtime();

    request
      .get(download, { timeout: 10000 })
      .on('data', (chunk) => {
          transferred += chunk.length;

          writes++;
          if(callback && writes == 200){
              let timeNow = process.hrtime();
              let speed = (transferred-lastTransferred)
                  / (timeNow[0] + timeNow[1] * Math.pow(10, -9) - (time[0] + time[1] * Math.pow(10, -9)));

              callback({ percent: 100 * transferred / total, bytesPerSecond: speed });

              writes = 0;
              time = timeNow;
              lastTransferred = transferred;

          }
      })
      .on('response', (response) => {
        total = response.headers["content-length"];

        response.pipe(output);
        output
            .on('finish', () => {
                resolve(filepath);
            })
            .on("error", err => {
                logger.log("Download error: " + download + ", dir: " + directory, err);
                reject(new Error("Download error. " + (err.message || "")))
            })
      })
      .on('error', (err) => {
          logger.log("Download error: " + download + ", dir: " + directory, err);
        reject(new Error("Network error. Please check your internet connection. " + (err.message || "")));
      });
  });
}

export function extract(file: string, directory: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const extension = path.extname(file);
    let handler;

    if (extension === '.zip') {
      fs.createReadStream(file)
        .pipe(unzip.Extract({ path: directory }))
        .on('close', () => resolve())
        .on("error", err => {
            logger.log("Extract error: " + file + ", dir: " + directory, err);
            reject("Extract error. " + (err.message || ""));
        });

      return;
    }

    if (extension === '.gz') {
      handler = zlib.createGunzip();
    } else if (extension === '.xz') {
      handler = lzma.createDecompressor();
    } else {
      logger.log("Extract error: " + file, "Invalid archive format");
      reject(new Error('Invalid archive format.'));
    }

    handler.on('error', (err) => {
        logger.log("Extract error: " + file + ", dir: " + directory, err);
        reject(new Error("Archive unpacking error. " + (err.message || "")))
    });

    fs.createReadStream(file)
      .on('error', (err) => {
          logger.log("Extract error: " + file + ", dir: " + directory, err);
          reject(new Error("Archive unpacking error. " + (err.message || "")))
      })
      .pipe(handler)
      .pipe(new tar.Parse())
      .on('entry', (entry) => {
        const filepath = path.join(directory, entry.path);
        if (entry.type === 'Directory' && !fs.existsSync(filepath)) {
          fs.mkdirSync(filepath, { recursive: true });
          entry.resume();
          return;
        }

        const filedir = path.dirname(filepath);
        if (!fs.existsSync(filedir)) {
          fs.mkdirSync(filedir, { recursive: true });
        }

        entry.pipe(fs.createWriteStream(filepath))
            .on("error", err => {
                logger.log("Extract error: " + file + ", dir: " + directory, err);
                reject(new Error("Error extracting archive. " + (err.message || "")))
            });
      })
      .on('end', () => resolve());
  });
}

export function isNewer(newer: string, older: string): boolean {
    const partsNewer = newer.split("-")[0].split('.');
    const partsOlder = older.split("-")[0].split('.');

    for (let i = 0; i < partsNewer.length; i++) {
        if (parseInt(partsNewer[i]) > parseInt(partsOlder[i])) return true;
    }

    return false;
}

export function parseProps(contents: string) {
    const lines = contents.split("\n");

    let props: any = {};

    for(let line of lines){
        const lineParts = line.split("=");
        if(lineParts.length != 2) continue;
        props[lineParts[0]] = lineParts[1];
    }

    return props;
}

export function parsePropsFile(path: string){
    const contents = fs.readFileSync(path, { encoding: "utf-8", flag: "r" });
    return parseProps(contents);
}

const HDI_VOL_REGEX = /\/Volumes\/(.*)/m;
export function mountDmg(path: string, callback: (error: ExecException | Error | null, mountPoint?: string) => void, rw?: boolean){
    let command = [
        "hdiutil",
        "attach",
        "-nobrowse"
    ];

    if(rw){
        command.push("-readwrite");
    }

    command.push(`'${path}'`);

    child_process.exec(command.join(" "), (err, stdout, stderr) => {
        if(err) return callback(err);

        var match = stdout.match(HDI_VOL_REGEX);
        if(!match){
            return callback(new Error("Could not mount dmg archive."));
        }

        callback(null, match[0]);
    });
}

export function clientUtil(){
    ipcMain.on("openlink", (event, args) => {
        let app: string = "";
        let type = os.type();

        if(type == "Windows_NT"){
            app = "start";
        }else if(type == "Darwin"){
            app = "open";
        }else if(type == "Linux"){
            app = "xdg-open";
        }else{
            return;
        }

        child_process.exec([app, args.href].join(" "));
    });
}