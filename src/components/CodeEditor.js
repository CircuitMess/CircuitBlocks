import React from "react";
import styled from "styled-components";
// import { useAppStateValue } from "../contexts/AppContext";

const Code = styled.p`
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  background-color: black;
  color: #22ff22;
  height: calc(100% - 64px);
  margin: 0 auto;
  white-space: pre;
`;

const CodeEditor = (props) => {
  const { code, isCodeOpen } = props;
  // const [appState, appDispatch] = useAppStateValue();
  // const { isCodeOpen } = appState;

  return <Code className={!isCodeOpen ? "d-none" : ""}>{code}</Code>;
};

export default CodeEditor;
