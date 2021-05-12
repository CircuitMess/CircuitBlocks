import React from "react";
import {Button, Dimmer, Modal} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";


interface SaveModalProps{
    open: boolean;
    closeModalCallback: (option: string) => void;

}

interface SaveModalState{

}

export class CloseConfirm extends React.Component<SaveModalProps, SaveModalState>{
    public render(){
        const {open} = this.props;

        return <div>
            <Dimmer active={open}>
                <ModalBase className={"small"}>
                    <h2>Discard unsaved changes?</h2>
                    <Button onClick={() => this.props.closeModalCallback("saveAndExit")} primary>Save and close</Button>
                    <Button onClick={() => this.props.closeModalCallback("exit")}>Close without saving</Button>
                    <Button onClick={() => this.props.closeModalCallback("cancel")}>Don't close</Button>
                </ModalBase>
            </Dimmer>
        </div>;
    }
}