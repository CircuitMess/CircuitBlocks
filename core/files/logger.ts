import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import ArduinoCompiler, {InstallInfo} from "../compiler/compiler";
import * as request from 'request';
import {getDocumentsFolder} from 'platform-folders';

export interface LogEntry {
    message: string;
    error?: any;
    time: Time;
}

interface DirectoryData {
    name: string;
    files: string[];
    directories: DirectoryData[];
}

class Time {
    public day: number;
    public month: number;
    public year: number;
    public hour: number;
    public minute: number;
    public second: number;
    public milli: number;
    public timezone: string;

    private date: Date;

    public constructor(date?: Date | number){
        if(date == undefined) date = new Date();

        if(date instanceof Date){
            this.day = date.getDate();
            this.month = date.getMonth() + 1;
            this.year = date.getFullYear();
            this.hour = date.getHours();
            this.minute = date.getMinutes();
            this.second = date.getSeconds();
            this.milli = date.getMilliseconds();

            const offset = -date.getTimezoneOffset();
            this.timezone = "" + (offset >= 0 ? "+" : "") + (offset/60) + ":" + (offset % 60)

            this.date = date;
        }else{
            this.milli = date;
            this.second = Math.floor(date / 1000);
            this.minute = Math.floor(date / (1000 * 60));
            this.hour = Math.floor(date / (1000 * 60 * 60));
        }
    }

    public getDateString(): string {
        return "" + this.day + "." + this.month + "." + this.year + ".";
    }

    public getTimeString(): string {
        return "" + this.hour + ":" + this.minute + ":" + this.second;
    }

    public getPreciseTimeString(): string {
        return "" + this.hour + ":" + this.minute + ":" + this.second + "." + this.milli;
    }

    public toString(): string {
        return this.getDateString() + " " + this.getTimeString();
    }

    public static elapsed(start: Time, to: Time){
        return new Time(to.date.getTime() - start.date.getTime());
    }
}

class Logger {
    private entries: LogEntry[] = [];
    private startTime: Time;

    public constructor(){
        this.startTime = new Time(new Date());
    }

    public log(message: string, error?: any){
        this.entries.push({ message, error, time: new Time() });
    }

    public sendReport(report: any, fatal: boolean): Promise<number> {
        const data = JSON.stringify(report);

        return new Promise<number>((resolve, reject) => {
            request.post("https://repman.circuitmess.com/submit.php", {
                form: { data, fatal: fatal ? "1" : "0" },
                rejectUnauthorized: false,
                requestCert: true
                }, (err, res, body) => {
                    if(err){
                        console.log(err);
                        reject(new Error("Network error. Please check your internet connection. " + (err.message || "")));
                        return;
                    }

                    if(res.statusCode != 200){
                        reject(new Error("Error submitting report. Please contact us at contact@circuitmess.com"));
                        return;
                    }

                    if(body == "" || body == "0"){
                        reject(new Error("Error submitting report. Please contact us at contact@circuitmess.com"));
                        return;
                    }

                    const id = parseInt(body);

                    if(isNaN(id)){
                        reject(new Error("Error submitting report. Please contact us at contact@circuitmess.com"));
                        return;
                    }

                    resolve(id);
                });
        });
    }

    public generateReport(): any {
        const installInfo = ArduinoCompiler.checkInstall();

        const data: any = {
            os: os.type(),
            arch: os.arch(),
            user: os.userInfo().username,
            home: os.homedir(),
            timezone: this.startTime.timezone,
            start: this.startTime.toString(),
            data: this.entries,
            info: installInfo,
            directories: null
        };

        if(installInfo){
            data.directories = this.directoryTree(installInfo);
        }

        return data;
    }

    public stringifyReport(report: any): string {
        const parts: string[] = [];

        parts.push("OS: " + report.os + ", arch: " + report.arch);
        parts.push("User: " + report.user + ", home: " + report.home);
        parts.push("Start time: " + report.start + ", timezone: " + report.timezone);
        parts.push("");

        function appendDir(dir: any){
            parts.push("\tFiles:");
            dir.files.forEach(file => parts.push("\t" + file));
            parts.push("\tDirectories:");
            dir.directories.forEach(directory => {
                parts.push("\tDirectory " + directory.name + ":");
                appendDir(directory);
            })
        }

        if(report.info){
            parts.push("Arduino local: " + report.info.local);
            parts.push("Sketchbook: " + report.info.sketchbook);
            parts.push("Arduino: " + report.info.arduino);
            parts.push("CLI: " + report.info.cli);
            parts.push("");
        }

        if(report.directories){
            if(report.directories.sketchbook){
                parts.push("Sketchbook contents:");
                appendDir(report.directories.sketchbook);
            }
            if(report.directories.cli){
                parts.push("CLI directory contents:");
                appendDir(report.directories.cli);
            }
            parts.push("");
        }

        report.data.forEach((entry: LogEntry) => {
            const elapsed = Time.elapsed(this.startTime, entry.time);

            parts.push("[ " + elapsed.getPreciseTimeString() + " ] " + entry.message);
            if(entry.error){
                parts.push(JSON.stringify(entry.error, null, 2));
            }
        });

        return parts.join("\n");
    }

    public saveReport(report: any){
        let reportDir = os.homedir();
        if(os.type() == "Windows_NT" || os.type() == "Darwin"){
            reportDir = getDocumentsFolder();
        }

        const reportPath = path.join(reportDir, "CircuitBlocksReport.txt");

        fs.writeFileSync(reportPath, JSON.stringify(report));

        return reportPath;
    }

    private directoryTree(info: InstallInfo){
        const data: any = { };
        return data;

        if(info.sketchbook){
            data.sketchbook = this.walkDirectory(info.sketchbook);
        }

        if(info.cli){
            data.cli = this.walkDirectory(info.cli, undefined, 2);
        }

        return data;
    }

    private walkDirectory(start: string, context?: any, depth?: number): DirectoryData {
        if(depth == 0) return null;
        const content: DirectoryData = { name: "", files: [], directories: [] };

        if(context === undefined) context = this;

        fs.readdirSync(start).forEach(file => {
            const filePath = path.join(start, file);
            const stat = fs.statSync(filePath);

            if(stat.isDirectory()){
                const dirData = context.walkDirectory(filePath, context, depth-1);
                if(dirData == null) return;
                dirData.name = file;
                content.directories.push(dirData);
            }else{
                content.files.push(file);
            }
        });

        return content;
    }

    private generateFullReport(){

    }
}

const logger = new Logger();

export default logger;