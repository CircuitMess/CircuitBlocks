import React from "react";
import styled from "styled-components";

const ModalDiv = styled.div`
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 400px;
  width: 600px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 4px;

  .close {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px 5px;
    background-color: #aaa;
    cursor: pointer;
  }
`;

const ModalBackDrop = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = props => {
  const { close, children } = props;

  return (
    <>
      <ModalBackDrop onClick={close} />
      <ModalDiv>
        <div className="close" onClick={close}>
          X
        </div>
        {children}
      </ModalDiv>
    </>
  );
};

export default Modal;
