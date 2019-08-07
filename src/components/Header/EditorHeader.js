import React from "react";

import HeaderBase from "./HeaderBase";
import HeaderItem from "./HeaderItem";

const EditorHeader = (props) => {
  const { save, load, toggleCode, isCodeOpen, openHome } = props;

  return (
    <HeaderBase onPressLogo={openHome}>
      <HeaderItem onClick={save}>
        <p>Save</p>
      </HeaderItem>
      <HeaderItem onClick={load}>
        <p>Load</p>
      </HeaderItem>
      <HeaderItem>
        <p>Run</p>
      </HeaderItem>
      <HeaderItem right onClick={toggleCode}>
        <p>Switch to {isCodeOpen ? "blocks" : "code"}</p>
      </HeaderItem>
    </HeaderBase>
  );
};

export default EditorHeader;
