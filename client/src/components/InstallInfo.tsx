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
            console.log(args);
            props.setIsInstalling([ "", "DONE" ].indexOf(args.state.stage || "") == -1); // go figure
            this.setState(args.state);
        });

        ipcRenderer.send("installstate", null);
    }

    private retry(){
        const wasRestoring = this.state.restoring;

        this.setState({ stage: "DONE", error: undefined, restoring: false });

        if(!wasRestoring){
            ipcRenderer.send("install");
        }
    }

    public render(){
        const { stage, error, restoring } = this.state;
        const loading = stage == "";

        if(stage == "DONE"){
            return null;
        }

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
            }else{
                heading = "Installing...";
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
                        { (error != undefined) && <Button onClick={ () => this.retry() } primary fluid style={{ marginTop: 20 }}>{ restoring ? "Ok" : "Try again" }</Button> }
                    </div>
                </ModalBase> }
        </div>
    }
}

export default InstallInfo;
