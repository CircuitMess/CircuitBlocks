import React from "react";
import styled from "styled-components";
import { useAppStateValue } from "../../contexts/AppContext";

const HeaderDiv = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  box-sizing: border-box;
`;

const CloseButton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: #ddd;
  }
`;

const ModalHeader = props => {
  const { title } = props;
  const [appState, appDispatch] = useAppStateValue();

  return (
    <HeaderDiv>
      <Title>{title}</Title>
      <CloseButton onClick={() => appDispatch({ type: "closeModal" })}>
        <i className="material-icons">close</i>
      </CloseButton>
    </HeaderDiv>
  );
};

export default ModalHeader;
