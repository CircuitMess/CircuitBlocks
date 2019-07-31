import React from "react";
import { useAppStateValue } from "../contexts/AppContext";

const BlocklyEditor = props => {
  const { setRef, width, height, isCodeOpen } = props;
  // const [appState, appDispatch] = useAppStateValue();
  // const { isCodeOpen } = appState;

  return (
    <div
      id="blocklyDiv"
      className={isCodeOpen ? "d-none" : ""}
      style={{ width, height }}
      ref={setRef}
    />
  );
};

export default BlocklyEditor;
