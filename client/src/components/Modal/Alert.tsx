import React from 'react';

import { ModalBase, Backdrop } from './Common';
import Button from '../Button';

interface Props {
  title: string;
  body?: string;
  close: () => void;
  yes: () => void;
  yesText?: string;
  noText?: string;
}

const Alert: React.FC<Props> = ({ title, body, close, yes, yesText, noText }) => {
  return (
    <>
      <Backdrop onClick={close} />
      <ModalBase className="small">
        <div className="title">{title}</div>
        <div className="icons" onClick={close}>
          <i className="material-icons"> close </i>
        </div>
        <div className="content">
          <p>{body}</p>
        </div>
        <div className="buttons left">
          <Button color="white" onClick={close}>
            <div className="text">{yesText || 'Nope'}</div>
          </Button>
        </div>
        <div className="buttons right">
          <Button color="red" onClick={yes}>
            <div className="text">{noText || 'Yup'}</div>
          </Button>
        </div>
      </ModalBase>
    </>
  );
};

export default Alert;
