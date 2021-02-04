import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";


interface SaveModalProps{
    open: boolean;
    closeModalCallback: (option: string) => void;

}

interface SaveModalState{

}

export class SaveModal extends React.Component<SaveModalProps, SaveModalState>{
    public render(){
        const {open} = this.props;

        return <div>
            <Dimmer active={open}>
                <ModalBase>
                    <h2>Are you sure you want to stop editing?</h2>
                    <Button onClick={() => this.props.closeModalCallback("saveAndExit")}>Yes, save and exit</Button>
                    <Button onClick={() => this.props.closeModalCallback("exit")}>Yes, and don't save</Button>
                    <Button onClick={() => this.props.closeModalCallback("cancel")}>Cancel</Button>
                </ModalBase>
            </Dimmer>
        </div>;
    }
}