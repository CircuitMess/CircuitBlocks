import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {SketchType} from "../../Editor";
import ReactSwitch from "react-switch";

export interface NewSketchProps {
    open: boolean;
    callback: (type: SketchType, device: string) => void;
}

interface NewSketchState {
    nibble: boolean;
}

export class NewSketch extends React.Component<NewSketchProps, NewSketchState> {

    public constructor(props: NewSketchProps){
        super(props);

        this.state = {
            nibble: false
        };
    }

    private create(type: SketchType){
        const { callback } = this.props;
        callback(type, this.state.nibble ? "cm:esp8266:nibble" : "cm:esp32:ringo");
    }

    public render(){
        const { open, callback } = this.props;
        const { nibble } = this.state;

        return <Dimmer active={open}>
            <ModalBase className={"small"}>
                <div className="title" style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>New sketch</div>
                <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: "10px", fontWeight: "bold" }}>
                        <span>Ringo</span>
                        <div style={{ margin: "0 20px" }}>
                            <ReactSwitch checkedIcon={false} uncheckedIcon={false} offColor={"#E3384D"} onColor={"#FFC629"} checked={ nibble } size={30} onChange={(checked) => { this.setState({ nibble: checked }) }} />
                        </div>
                        <span>Nibble</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <Button onClick={ () => this.create(SketchType.CODE) } primary style={{ margin: "0 auto", marginTop: 20 }}>Code</Button>
                        <Button onClick={ () => this.create(SketchType.BLOCK) } primary style={{ margin: "0 auto", marginTop: 20 }}>Block</Button>
                    </div>
                </div>
            </ModalBase>
        </Dimmer>
    }
}