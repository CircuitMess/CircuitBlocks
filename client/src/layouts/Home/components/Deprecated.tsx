import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {SketchType} from "../../Editor";
import {AllElectron, IpcRenderer} from "electron";

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

export interface DeprecatedProps {
    open: boolean;
    closeModal: () => void;
}

export interface DeprecatedState {
    installed: boolean;
}

export class Deprecated extends React.Component<DeprecatedProps, DeprecatedState> {

    public constructor(props: DeprecatedProps){
        super(props);

        this.state = {
            installed: false
        };
    }

    private async yes(){
        await electron.shell.openExternal("https://code.circuitmess.com/");
        await ipcRenderer.send("kill", null);
    }

    private no(){
        if(!this.state.installed){
            ipcRenderer.send("install", null);
            this.setState({ installed: true });
        }
        this.props.closeModal();
    }

    public render(){
        const { open } = this.props;

        return <Dimmer active={open}>
            <ModalBase className={"small"}>
                <div style={{ display: "inline-flex"}}>
                    <div className="title" style={{ position: "relative", fontSize: 26, top: 0, textAlign: "center", marginBottom: 30, lineHeight: 1.2 }}>CircuitBlocks</div>
                    <i className="close link icon" style={{right: 10, top: 10, position: "absolute"}} onClick={() => this.no()}/>
                </div>

                <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <p style={{ marginBottom: 42, fontSize: 18, lineHeight: 1.4 }}>This version of CircuitBlocks is no longer supported, check out the brand new web-based app.</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                        <Button primary onClick={() => this.yes()} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Open web version</Button>
                        <Button secondary onClick={() => this.no()} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Continue offline</Button>
                    </div>
                </div>
            </ModalBase>
        </Dimmer>
    }
}
