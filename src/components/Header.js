import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  height: 64px;
  width: 100%;
  background-color: #1045ba;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 20px;

  .logo {
    height: 64px;
  }

  .item {
    height: 64px;
    padding: 0px 20px;
    text-align: center;
    align-items: center;
    color: white;
    cursor: pointer;
  }

  .item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .item.right {
    position: absolute;
    right: 0;
  }
`;

const Header = props => {
  const { isCodeOpen, toggle } = props;

  return (
    <HeaderDiv>
      <img class="logo" src={require("../assets/images/logo.png")} alt="logo" />
      <div class="item">
        <p>Save</p>
      </div>
      <div class="item">
        <p>Load</p>
      </div>
      <div class="item">
        <p>Run</p>
      </div>
      <div class="item right" onClick={toggle}>
        <p>Switch to {isCodeOpen ? "blocks" : "code"}</p>
      </div>
    </HeaderDiv>
  );
};

export default Header;
