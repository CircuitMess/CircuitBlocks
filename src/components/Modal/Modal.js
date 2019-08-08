import React from 'react';
import styled from 'styled-components';

import ModalHeader from './ModalHeader';
import { useAppStateValue } from '../../contexts/AppContext';

const ModalDiv = styled.div`
  z-index: 200;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 400px;
  width: 600px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
`;

const ModalBackDrop = styled.div`
  z-index: 150;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Modal = (props) => {
  const { children } = props;
  const [appState, appDispatch] = useAppStateValue();

  const { modalType } = appState;
  const title = modalType === 'save' ? 'Save' : 'Load';

  const close = () => appDispatch({ type: 'closeModal' });

  return (
    <>
      <ModalBackDrop onClick={close} />
      <ModalDiv>
        <ModalHeader close={close} title={title} />
        <ModalBody>{children}</ModalBody>
      </ModalDiv>
    </>
  );
};

export default Modal;
