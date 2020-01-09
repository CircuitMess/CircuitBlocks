import {BrowserWindow} from "electron";

export enum MessageType {
    ERROR,
    INSTALL,
    UPDATE,
    RESTORE,
    RUN,
    EXPORT,
    DAEMON
}

interface MessengerData {
    type: MessageType,
    text: string[],
    callback?: MessengerCallback[],
    loader?: boolean;
}

export interface MessengerCallback {
    title: string;
    action?: string;
    secondary?: boolean;
}

class Messenger {
    private window: BrowserWindow;

    public setWindow(window: BrowserWindow){
        this.window = window;
    }

    private send(data: MessengerData){
        if(this.window == undefined) return;

        this.window.webContents.send("messenger", { data });
    }

    public report(type: MessageType, text: string[], callback?: MessengerCallback[], loader?: boolean){
        const data: MessengerData = {
            type, text, callback, loader
        };

        this.send(data);
    }

    public reportFatal(){
        const data: MessengerData = {
            type: MessageType.DAEMON,
            text: [ "Arduino daemon couldn't load. Please restart the app. If this problem persists, please reinstall CircuitBlocks." ],
            callback: [{
                title: "Send error report",
                action: "report"
            }]
        };

        this.send(data);
    }
}

const messenger = new Messenger();
export default messenger;