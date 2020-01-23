import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {SketchType} from "../../Editor";

export interface NewSketchProps {
    open: boolean;
    callback: (type: SketchType) => void;
}

export class NewSketch extends React.Component<NewSketchProps> {

    public constructor(props: NewSketchProps){
        super(props);
    }

    public render(){
        const { open, callback } = this.props;

        return <Dimmer active={open}>
            <ModalBase className={"small"}>
                <div className="title" style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>New sketch</div>
                <div className="content" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <Button onClick={ () => callback(SketchType.CODE) } primary style={{ margin: "0 auto", marginTop: 20 }}>Code</Button>
                    <Button onClick={ () => callback(SketchType.BLOCK) } primary style={{ margin: "0 auto", marginTop: 20 }}>Block</Button>
                </div>
            </ModalBase>
        </Dimmer>
    }
}