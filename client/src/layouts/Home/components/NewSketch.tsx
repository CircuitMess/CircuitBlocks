import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {SketchType} from "../../Editor";

export interface NewSketchProps {
    open: boolean;
    callback: (type: SketchType, device: string) => void;
}

interface NewSketchState {
    nibble: boolean;
    type: SketchType;
}

export class NewSketch extends React.Component<NewSketchProps, NewSketchState> {

    public constructor(props: NewSketchProps){
        super(props);

        this.state = {
            nibble: false,
            type: SketchType.BLOCK
        };
    }

    private create(){
        const { callback } = this.props;
        const { type } = this.state;
        callback(type, this.state.nibble ? "cm:esp8266:nibble" : "cm:esp32:ringo");
    }

    public render(){
        const { open, callback } = this.props;
        const { nibble, type } = this.state;

        return <Dimmer active={open}>
            <ModalBase className={"small"}>
                <div className="title" style={{ position: "relative", fontSize: 26, top: 0, textAlign: "center", marginBottom: 30, lineHeight: 1.2 }}>New sketch</div>
                <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <p style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}>Device:</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                        <Button primary inverted={nibble} onClick={() => this.setState({ nibble: false }) } style={{margin: "0 15px"}}>Ringo</Button>
                        <Button primary inverted={!nibble} onClick={() => this.setState({ nibble: true }) } style={{margin: "0 15px"}}>Nibble</Button>
                    </div>
                    <p style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}>Sketch type:</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Button primary inverted={type != SketchType.CODE} onClick={() => this.setState({ type: SketchType.CODE }) } style={{margin: "0 15px"}}>Code</Button>
                        <Button primary inverted={type != SketchType.BLOCK} onClick={() => this.setState({ type: SketchType.BLOCK }) } style={{margin: "0 15px"}}>Block</Button>
                    </div>

                    <Button onClick={() => this.create() } color="red" style={{ margin: "0 auto", marginTop: 30, backgroundColor:"#E3384D", width: "50%" }} size={"big"}>Create</Button>
                </div>
            </ModalBase>
        </Dimmer>
    }
}