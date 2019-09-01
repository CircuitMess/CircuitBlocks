import React from 'react';
import styled from 'styled-components';

import { ProjectSection } from './components/Section';
// import Header from './components/Header';

import './tmp.css';
import '../assets/material_icons.css';
import '../assets/poppins.css';
import Section from './components/Section';
import Profile from './components/Profile';

const projects = [
  {
    title: 'Getting Started Guide',
    author: 'Official Example',
    description:
      'In this sketch you can find real world examples of something important to your device programming.'
  },
  {
    title: 'Getting Started Guide',
    author: 'Official Example',
    description:
      'In this sketch you can find real world examples of something important to your device programming.'
  }
];

const Header = styled.div`
  position: relative;
  color: white;
  transform: translateY(0%);
  transition-duration: 0.3s;

  .left {
    position: absolute;
    left: 0;
    top: 0;
    text-align: left;
  }

  .right {
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
  }

  .logo {
    height: 20px;
    margin-top: 19px;
  }
`;

const HeaderSection = () => (
  <Section className="bg-image">
    <Header>
      <div class="left">
        <img class="logo" src={require('../assets/images/logo.png')} />
      </div>
      <div class="right">
        <Profile username="Albert Gajsak" image_url={require('../assets/images/profile.png')} />
      </div>
    </Header>
  </Section>
);

const HeaderImage = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${require('../assets/images/bg/bg-01.png')});
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: translate(50px, -50px);
  transition-duration: 0.3s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;

  &.shrink {
    height: 400px;
  }

  ${(props) =>
    props.loggedIn
      ? {
          transform: 'translate(0px, 0px)',
          opacity: 1,
          transitionDuration: '1s',
          transitionDelay: '0.3s',
          transitionTimingFunction: 'ease-in-out'
        }
      : {}}
`;

const App = () => {
  return (
    <>
      <HeaderImage className="shrink" loggedIn />
      <HeaderSection />
      <ProjectSection title={'Foobar'} projects={projects} />
    </>
  );
};

export default App;
