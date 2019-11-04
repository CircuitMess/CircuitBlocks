import * as os from "os";

export interface LogEntry {
    message: string;
    error?: any;
    time: Time;
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

    public generateReport(): any {

        return {
            os: os.type(),
            arch: os.arch(),
            user: os.userInfo().username,
            home: os.homedir(),
            timezone: this.startTime.timezone,
            start: this.startTime.toString(),
            data: this.entries
        };
    }

    public generateJSON(): string {
        return JSON.stringify(this.generateReport());
    }

    public generateLog(): string {
        const data = this.generateReport();

        const parts: string[] = [];

        parts.push("OS: " + data.os + ", arch: " + data.arch);
        parts.push("User: " + data.user + ", home: " + data.home);
        parts.push("Start time: " + data.start + ", timezone: " + data.timezone);
        parts.push("");

        data.data.forEach((entry: LogEntry) => {
            const elapsed = Time.elapsed(this.startTime, entry.time);

            parts.push("[ " + elapsed.getPreciseTimeString() + " ] " + entry.message);
            if(entry.error){
                parts.push(JSON.stringify(entry.error, null, 2));
            }
        });

        return parts.join("\n");
    }
}

const logger = new Logger();

export default logger;