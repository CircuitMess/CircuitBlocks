import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {SketchType} from "../../Editor";

export interface RestoreFirmwareProps {
    open: boolean;
    callback: (device: string) => void;
    closeFirmwareModal: () => void;
}

interface RestoreFirmwareState {

}

export class RestoreFirmware extends React.Component<RestoreFirmwareProps, RestoreFirmwareState> {

    public constructor(props: RestoreFirmwareProps){
        super(props);

        this.state = {
            nibble: false,
            type: SketchType.BLOCK
        };
    }


    public render(){
        const { open, callback } = this.props;

        return <Dimmer active={open}>
            <ModalBase className={"medium"}>
                <div style={{ display: "inline-flex"}}>
                    <div className="title" style={{ position: "relative", fontSize: 26, top: 0, textAlign: "center", marginBottom: 30, lineHeight: 1.2 }}>Restore firmware</div>
                    <i className="close link icon" style={{right: 10, top: 10, position: "absolute"}} onClick={()=> this.props.closeFirmwareModal()}/>
                </div>

                <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <p style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}>Device:</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
                        <Button primary onClick={() => callback("cm:esp32:ringo")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Ringo</Button>
                        <Button primary onClick={() => callback("cm:esp8266:nibble")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Nibble</Button>
                        <Button primary onClick={() => callback("cm:esp32:spencer")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Spencer</Button>
                        <Button primary onClick={() => callback("cm:esp32:jayd")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Jay-D</Button>
                        <Button primary onClick={() => callback("cm:esp32:wheelson")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Wheelson</Button>
                        <Button primary onClick={() => callback("cm:esp32:byteboi")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>ByteBoi</Button>
                        <Button primary onClick={() => callback("cm:esp32:chatter")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Chatter</Button>
                        <Button primary onClick={() => callback("cm:esp32:synthia")} style={{margin: "0 15px", whiteSpace: "nowrap", marginBottom: 10 }}>Synthia</Button>
                    </div>
                </div>
            </ModalBase>
        </Dimmer>
    }
}