import {ipcMain, BrowserWindow} from "electron";
import logger from "./logger";

export default class ErrorReport {

    private report: any | undefined;
    private fatal: boolean = false;

    private window: BrowserWindow | undefined;


    public setWindow(value: Electron.BrowserWindow | undefined) {
        this.window = value;
    }

    public constructor(){
        ipcMain.on("report", (event, args) => {
            event.reply("report", { collecting: true, sending: false });

            if(args && args.fatal){
                this.fatal = true;
            }else{
                this.fatal = false;
            }

            this.report = logger.generateReport();
            event.reply("report", { collecting: false, sending: false, content: logger.stringifyReport(this.report) });
        });

        ipcMain.on("reportsend", (event, args) => {
            event.reply("report", { collecting: false, sending: true, content: logger.stringifyReport(this.report) });

            logger.sendReport(this.report, this.fatal).then((id) => {
                event.reply("report",  { sending: false, id });
            }).catch(() => {
                event.reply("report",  { sending: false, id: -1, path: logger.saveReport(this.report) });
            });
        });

        ipcMain.on("reportdone", (event, args) => {
            if(this.fatal && this.window){
                this.window.close();
            }
        });
    }
}