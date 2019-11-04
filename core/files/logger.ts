
export interface LogEntry {
    message: string;
    error?: any;
}

class Logger {
    private entries: LogEntry[] = [];

    public constructor(){

    }

    public log(message: string, error?: any){
        this.entries.push({ message, error });
    }
}

const logger = new Logger();

export default logger;