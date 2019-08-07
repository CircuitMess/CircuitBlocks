import React from "react";
import styled from "styled-components";

import { HomeHeader } from "../components/Header";

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
`;

const Home = (props) => {
  const { closeHome } = props;

  return (
    <Wrapper>
      <HomeHeader onPressLogo={closeHome} />
      <h1>Home</h1>
      <button onClick={closeHome}>Editor</button>
    </Wrapper>
  );
};

export default Home;
