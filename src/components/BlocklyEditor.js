import React from "react";

const BlocklyEditor = props => {
  const { setRef, isCodeOpen } = props;

  return (
    <div id="blocklyDiv" className={isCodeOpen ? "d-none" : ""} ref={setRef} />
  );
};

export default BlocklyEditor;
