import React from "react";
import styled from "styled-components";

import { HomeHeader } from "../../components/Header";
import Section from "./components/Section";

import home from "../../assets/images/home.png";

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
`;

const BackgroundImage = styled.div`
  background: url(${home}) no-repeat center center;
  background-size: 100%;
  height: 400px;
`;

const Home = (props) => {
  const { closeHome, open } = props;

  const items = [
    {
      title: "Tutorial 1",
      lastEdited: "10 min ago",
      image: "foobar",
      filename: "Tutorial_1/asd.xml"
    },
    {
      title: "Tutorial 2",
      lastEdited: "10 min ago",
      image: "foobar",
      filename: "Tutorial_1/foo.xml"
    },
    {
      title: "Tutorial 2",
      lastEdited: "10 min ago",
      image: "foobar",
      filename: "Tutorial_1/foobar.xml"
    },
    {
      title: "Tutorial 2",
      lastEdited: "10 min ago",
      image: "foobar",
      filename: "Tutorial_2/gfhj.xml"
    },
    {
      title: "Tutorial 2",
      lastEdited: "10 min ago",
      image: "foobar",
      filename: "Tutorial_2/nesto.xml"
    }
  ];

  return (
    <Wrapper>
      <HomeHeader onPressLogo={closeHome} />
      <BackgroundImage />
      <Section title="My Projects" projects open={open} closeHome={closeHome} />
      <Section
        title="Examples"
        items={items}
        open={open}
        closeHome={closeHome}
      />
    </Wrapper>
  );
};

export default Home;
