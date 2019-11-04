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

export function tmpdir(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix + '-'));
}

export function download(download: string, directory: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const filename = path.posix.basename(url.parse(download).pathname);
    const filepath = path.join(directory, filename);

    const output = fs.createWriteStream(filepath);

    request
      .get(download)
      .on('response', (response) => {
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

export function extract(file: string, directory: string): Promise<null> {
  return new Promise<null>((resolve, reject) => {
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
    const partsNewer = newer.split('.');
    const partsOlder = older.split('.');

    for (let i = 0; i < partsNewer.length; i++) {
        if (parseInt(partsNewer[i]) > parseInt(partsOlder[i])) return true;
    }

    return false;
}
