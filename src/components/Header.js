import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  height: 64px;
  width: 100%;
  background-color: #1045ba;

  .logo {
    height: 64px;
  }

  .item {
    height: 64px;
  }
`;

const Header = () => {
  return (
    <HeaderDiv>
      <img class="logo" src={require("../assets/images/logo.png")} alt="logo" />
      <p class="item">Save</p>
      <p class="item">Load</p>
      <p class="item">Run</p>
    </HeaderDiv>
  );
};

export default Header;
