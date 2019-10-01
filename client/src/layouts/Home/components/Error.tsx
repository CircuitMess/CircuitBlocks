import React from 'react';
import {Button, Dimmer, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";

interface ErrorProps {
    message: string;
    dismiss: () => void;
}

export default class Error extends React.Component<ErrorProps, {}> {

    public constructor(props: ErrorProps){
        super(props);
    }

    public render(){
        const { message, dismiss } = this.props;

        return <Dimmer active={true}>
            <ModalBase className={"small"}>
                <div className={"title"}>Error</div>
                <div className={"content"}><p>{message}</p></div>
                <div className={"buttons"}>
                    <Button onClick={dismiss}>Ok</Button>
                </div>
            </ModalBase>
        </Dimmer>
    }
}