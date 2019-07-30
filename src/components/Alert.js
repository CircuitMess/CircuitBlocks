import React from "react";
import styled from "styled-components";

import Button from "./Button";
import { useAppStateValue } from "../contexts/AppContext";

const AlertBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const AlertDiv = styled.div`
  z-index: 1200;
  position: absolute;
  top: 50%;
  left: 50%;
  min-height: 120px;
  min-width: 300px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  padding: 10px 50px;
  text-align: center;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-around;
`;

const Alert = () => {
  const [appState, appDispatch] = useAppStateValue();

  const { alertText } = appState;
  const closeAlert = () => {
    appDispatch({ type: "closeAlert" });
  };

  return (
    <>
      <AlertBackdrop onClick={closeAlert} />
      <AlertDiv>
        <h2>{alertText}</h2>
        <Footer>
          <Button onClick={closeAlert} color="primary">
            Close
          </Button>
        </Footer>
      </AlertDiv>
    </>
  );
};

export default Alert;
