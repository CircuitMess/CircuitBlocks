import React from 'react';
import {ModalBase} from "./Modal/Common";
import {Loader, Dimmer, Button} from "semantic-ui-react";
import {AllElectron, IpcRenderer} from "electron";

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface ErrorReportProps {
    setIsOpen: (isOpen: boolean) => void
}

interface ErrorReportState {
    collecting: boolean;
    sending: boolean;
    id: number | undefined;
    content: string | undefined;
    shown: boolean;
    path: string | undefined;
    jsonContent: string | undefined;
}

export class InstallInfo extends React.Component<ErrorReportProps, ErrorReportState> {

    public constructor(props: ErrorReportProps){
        super(props);

        this.state = {
            collecting: false,
            sending: false,
            id: undefined,
            content: undefined,
            shown: false,
            path: undefined,
            jsonContent: undefined
        };

        ipcRenderer.on("report", (event, args) => {
            const { collecting, sending, content, id, path, jsonContent } = args;

            this.setState({ collecting, sending, content, id, path, jsonContent, shown: true });

            this.props.setIsOpen(true);
        });
    }

    private send(){
        ipcRenderer.send("reportsend");
    }

    private close(){
        this.setState({ content: undefined, collecting: false, sending: false, id: undefined, path: undefined, shown: false });
        this.props.setIsOpen(false);
    }

    private done(){
        ipcRenderer.send("reportdone");
        this.close();
    }

    public render(){
        const { sending, collecting, id, path, content, shown, jsonContent } = this.state;

        if(!shown) return null;

        const loading = sending || collecting;
        const status = sending ? "Sending report..." : "Collecting report...";

        return <div>
            <Dimmer active={true} />
            <ModalBase className={"medium"}>
                <div className={"title"} style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>Error report</div>
                <div className="content">
                    <Loader active={ loading } indeterminate size={"massive"} inline={"centered"} style={{ margin: "20px auto" }} />
                    { loading ?
                        <div style={{ paddingTop: 0, textAlign: "center" }}>{ status }</div>
                        : <div>
                            { id == undefined
                                ? <div>
                                    <div>
                                        <p>The following data will be sent and stored on our servers. You can contact us at contact@circuitmess.com if you wish we remove your data from our server.</p>
                                        <div style={{ maxHeight: 200, overflowY: "auto", whiteSpace: "pre", padding: "5px 10px", boxShadow: "0 0 3px rgba(0, 0, 0, 0.5) inset" }}>
                                            { content != undefined ? content : "" }
                                        </div>
                                    </div>
                                    <div>
                                        <Button onClick={ () => this.close() } secondary style={{ marginTop: 20 }}>Cancel</Button>
                                        <Button onClick={ () => this.send() } primary right floated={"right"} style={{ marginTop: 20 }}>Send report</Button>
                                    </div>
                                </div>
                                :
                                <div>
                                    { id == -1
                                    ? <div>
                                            <p>There has been an error sending the report, but it has been saved at <b>{ path }</b>. You can contact us with your problem at <b>contact@circuitmess.com</b>. Don't forget to attach the generated report!</p>
                                            { jsonContent &&  <div>
                                                <p>If you're having trouble finding the file, you can also copy the report into a text file manually:</p>
                                                <div style={{ maxHeight: 200, overflowY: "auto", whiteSpace: "pre", padding: "5px 10px", boxShadow: "0 0 3px rgba(0, 0, 0, 0.5) inset" }}>{ JSON.stringify(jsonContent) }</div>
                                            </div> }
                                        </div>
                                    : <div>
                                            <p>The report has been sent. Your report ID is</p>
                                            <p style={{ padding: "10px 0", textAlign: "center", fontSize: "2em", fontWeight: "bold" }}>{ id }</p>
                                            <p>You can contact us with your problem at <b>contact@circuitmess.com</b>. Don't forget to attach your report ID!</p>
                                        </div>
                                    }
                                    <Button onClick={ () => this.done() } primary style={{ display: "block", margin: "0 auto", marginTop: 20 }}>Ok</Button>
                                </div> }
                        </div>
                    }
                </div>
            </ModalBase>
        </div>
    }
}

export default InstallInfo;
