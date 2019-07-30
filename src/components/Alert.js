import React from "react";
import styled from "styled-components";
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
  min-height: 100;
  min-width: 100px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 4px;
  text-align: center;
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
        <h1>{alertText}</h1>
        <button onClick={closeAlert}>Close</button>
      </AlertDiv>
    </>
  );
};

export default Alert;
