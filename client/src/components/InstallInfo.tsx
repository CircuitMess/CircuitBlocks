import React from 'react';
import {ModalBase} from "./Modal/Common";
import {Loader, Dimmer, Button} from "semantic-ui-react";
import {AllElectron, IpcRenderer} from "electron";

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface InstallInfoProps {
    setIsInstalling: (installing: boolean) => void;
    reportError: (error: string, fatal?: boolean) => void;
}

interface InstallInfoState {
    stage: string;
    error: string | undefined;
    restoring: boolean | undefined;
}

export class InstallInfo extends React.Component<InstallInfoProps, InstallInfoState> {

    public constructor(props: InstallInfoProps){
        super(props);

        this.state = {
            stage: "",
            error: undefined,
            restoring: false
        };

        ipcRenderer.on("installstate", (event, args) => {
            if(!this.state.restoring) this.props.setIsInstalling([ "", "DONE" ].indexOf(args.state.stage || "") == -1); // go figure
            if(this.state.restoring && this.state.stage == "0%") this.props.setIsInstalling(true);
            this.setState(args.state);
        });

        ipcRenderer.send("install", null);
    }

    private retry(){
        const wasRestoring = this.state.restoring;

        this.setState({ stage: "DONE", error: undefined, restoring: false });

        if(!wasRestoring){
            ipcRenderer.send("install");
        }else{
            this.props.setIsInstalling(false);
        }
    }

    public render(){
        const { stage, error, restoring } = this.state;
        const loading = stage == "";

        if(stage == "DONE"){
            return null;
        }

        let subtitle: string | undefined = undefined;

        const stages: any = {
            ARDUINO: "Arduino",
            CLI: "Arduino CLI",
            RINGO: "Ringo board and libraries",
            UPDATE: "Checking for updates..."
        };

        let heading, status;

        if(error) {
            heading = "Error";
            status = error;
        }else if(restoring){
            heading = "Restoring Firmware";
            status = stage;
        }else{
            if(stage == "UPDATE"){
                heading = "Updating...";
                subtitle = "Hold on tight. This might take a bit.";
            }else{
                heading = "Installing...";
                subtitle = "Hold on tight. This might take up to 10 minutes.";
            }

            status = stages[stage];
        }

        return <div>
            <Dimmer active={true} />
            { loading
                ? <Loader active={true} size={"massive"} />
                : <ModalBase className={"small"}>
                    <div className={"title"} style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>{ heading }</div>
                    <div className="content">
                        <Loader active={ error == undefined } indeterminate size={"massive"} inline={"centered"} style={{ margin: "20px auto" }} />
                        <div style={{ paddingTop: 0, textAlign: "center" }}>{ status }</div>
                        { subtitle && <div style={{ paddingTop: 5, textAlign: "center" }}>{ subtitle }</div> }
                        { (error != undefined) && <Button onClick={ () => this.retry() } primary style={{ margin: "0 auto", display: "block", marginTop: 20 }}>{ restoring ? "Ok" : "Try again" }</Button> }
                    </div>
                </ModalBase> }
        </div>
    }
}

export default InstallInfo;
