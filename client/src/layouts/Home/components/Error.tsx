import React from 'react';
import {Button, Dimmer, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {AllElectron, IpcRenderer} from "electron";

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface ErrorProps {
    message: string;
    dismiss?: () => void;
}

export default class Error extends React.Component<ErrorProps, {}> {

    public constructor(props: ErrorProps){
        super(props);
    }

    private report(){
        ipcRenderer.send("report", { fatal: true });
    }

    public render(){
        const { message, dismiss } = this.props;

        return <Dimmer active={true}>
            <ModalBase className={"small"}>
                <div className={"title"}>Error</div>
                <div className={"content"}><p>{message}</p></div>
                <div className={"buttons"}>
                    { dismiss ? <Button primary onClick={dismiss}>Ok</Button>
                        : <Button primary onClick={() => this.report()}>Send error report</Button> }
                </div>
            </ModalBase>
        </Dimmer>
    }
}