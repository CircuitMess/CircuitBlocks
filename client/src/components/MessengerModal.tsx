import React, {ReactElement} from 'react';
import {ModalBase} from "./Modal/Common";
import {Loader, Dimmer, Button, ButtonGroup} from "semantic-ui-react";
import {AllElectron, IpcRenderer} from "electron";

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

enum MessageType {
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

interface MessengerCallback {
    title: string;
    action?: string;
    secondary?: boolean;
}

interface MessengerModalProps {

}

interface MessengerModalState {
    data: MessengerData | undefined;
}

export class MessengerModal extends React.Component<MessengerModalProps, MessengerModalState> {

    private readonly titles = [
        "Error",
        "Installing...",
        "Updating...",
        "Restoring firmware",
        "Running",
        "Export",
        "Daemon"
    ];

    public constructor(props: MessengerModalProps){
        super(props);

        this.state = {
            data: undefined
        };

        ipcRenderer.on("messenger", (event, args) => {
            this.setState({ data: args.data });
        });
    }

    private pingBack(callback?: string){
        if(callback){
            ipcRenderer.send(callback);
        }

        this.setState({ data: undefined });
    }

    public render(){
        const { data } = this.state;
        if(!data) return null;

        const { type, text, callback, loader } = data;

        const title = this.titles[type];

        let textDom: ReactElement[] = [];
        text.forEach(t => textDom.push(<div style={{ paddingTop: 0, paddingBottom: 5, textAlign: "center" }}>{ t }</div>));

        let callbackDom: ReactElement[] = [];
        if(callback){
            callback.forEach(t => callbackDom.push(<Button onClick={ () => this.pingBack(t.action) } primary style={{ margin: "0 auto", marginTop: 20 }}>{ t.title }</Button>));
        }

        return <div>
            <Dimmer active={true} />
                <ModalBase className={"small"}>
                    <div className={"title"} style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>{ title }</div>
                    <div className="content">
                        <Loader active={ loader } indeterminate size={"massive"} inline={"centered"} style={{ margin: "20px auto" }} />
                        { textDom }
                        { callback && <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            { callbackDom }
                        </div> }
                    </div>
                </ModalBase>
        </div>
    }
}

export default MessengerModal;
