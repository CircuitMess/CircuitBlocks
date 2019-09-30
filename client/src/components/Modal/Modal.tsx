import React from 'react';

import { ModalBase, Backdrop } from './Common';
import Button from '../Button';

interface FooterButton {
  onClick: () => void;
  text: string;
  color?: string;
  disabled?: boolean;
}

export interface FooterProps {
  left: FooterButton[];
  right: FooterButton[];
}

export interface Props {
  title: string;
  close: () => void;
  footer: FooterProps;
}

const Footer: React.FC<FooterProps> = ({ left, right }) => {
  return (
    <>
      <div className="buttons left">
        {null && left.map(({ color, onClick, text, disabled }, index) => (
          <Button
            key={`ButtonFooterLeft${index}`}
            color={color || 'white'}
            onClick={onClick}
            disabled={disabled}
            className={disabled ? 'disabled' : ''}
          >
            <div className="text">{text}</div>
          </Button>
        ))}
      </div>
      <div className="buttons left">
        {right.reverse().map(({ color, onClick, text, disabled }, index) => (
          <Button
            key={`ButtonFooterLeft${index}`}
            color={color || 'white'}
            onClick={onClick}
            disabled={disabled}
            className={disabled ? 'disabled' : ''}
          >
            <div className="text">{text}</div>
          </Button>
        ))}
      </div>
    </>
  );
};

const Modal: React.FC<Props> = ({ title, close, children, footer }) => {
  return (
    <>
      <Backdrop onClick={close} />
      <ModalBase>
        <div className="title">{title}</div>
        <div className="icons" onClick={close}>
          <i className="material-icons"> close </i>
        </div>
        <div className="content">{children}</div>
        <Footer {...footer} />
      </ModalBase>
    </>
  );
};

export default Modal;
