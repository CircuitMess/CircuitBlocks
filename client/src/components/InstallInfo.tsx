import React from 'react';
import {ModalBase} from "./Modal/Common";
import {Loader, Dimmer, Button} from "semantic-ui-react";
import {AllElectron, IpcRenderer} from "electron";

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface InstallInfoProps {

}

interface InstallInfoState {
    stage: string;
    error: string | undefined;
}

export class InstallInfo extends React.Component<InstallInfoProps, InstallInfoState> {

    public constructor(props: InstallInfoProps){
        super(props);

        this.state = {
            stage: "",
            error: undefined
        };

        ipcRenderer.on("installstate", (event, args) => {
            this.setState(args.state);
        });

        ipcRenderer.send("installstate", null);
    }

    private retry(){
        this.setState({ stage: "", error: undefined });
        ipcRenderer.send("install");
    }

    public render(){
        const { stage, error } = this.state;
        const loading = stage == "";

        if(stage == "DONE"){
            return null;
        }

        const stages: any = {
            ARDUINO: "Arduino",
            CLI: "Arduino CLI",
            RINGO: "Ringo board and libraries"
        };

        let heading, status;

        if(error){
            heading = "Error";
            status = error;
        }else{
            heading = "Installing...";
            status = stages[stage];
        }

        return <div>
            <Dimmer active={true} />
            { loading
                ? <Loader active={true} size={"massive"} />
                : <ModalBase style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <div className={"title"} style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10 }}>{ heading }</div>
                    <div className="content">
                        <Loader active={ error == undefined } indeterminate size={"massive"} inline={"centered"} style={{ margin: "20px auto" }} />
                        <div style={{ paddingTop: 0, textAlign: "center" }}>{ status }</div>
                        { error != undefined && <Button onClick={ () => this.retry() } primary fluid style={{ marginTop: 20 }}>Try again</Button> }
                    </div>
                </ModalBase> }
        </div>
    }
}

export default InstallInfo;
