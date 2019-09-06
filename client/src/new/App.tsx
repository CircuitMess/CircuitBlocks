import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProjectSection } from './components/Section';
// import Header from './components/Header';

import './tmp.css';
import '../assets/material_icons.css';
import '../assets/poppins.css';
import Section from './components/Section';
import Profile from './components/Profile';
import EditorHeader from './components/EditorHeader';
import * as Modal from './components/Modal';

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

interface StyledHeaderProps {
  loggedIn: boolean;
}

const Header = styled.div<StyledHeaderProps>`
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

  ${(props) => !props.loggedIn && { transform: 'translateY(-80px)', transitionDuration: '0.5s' }}
`;

interface HeaderSectionProps {
  loggedIn: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ loggedIn }) => (
  <Section className="bg-image">
    <Header loggedIn={loggedIn}>
      <div className="left">
        <img className="logo" src={require('../assets/images/logo.png')} />
      </div>
      <div className="right">
        <Profile username="Albert Gajsak" image_url={require('../assets/images/profile.png')} />
      </div>
    </Header>
  </Section>
);

const HeaderImage = styled.div<StyledHeaderProps>`
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
          transitionDuration: '0.5s',
          transitionDelay: '0s',
          transitionTimingFunction: 'ease-in-out'
        }
      : {}}
`;

const Footer = styled.div`
  height: 48px;
  background-color: #333333;

  p {
    line-height: 16px;
    padding: 16px 16px;
    margin: 0px;
    text-align: center;
    color: #fff;
  }
`;

const Main = styled.div`
  height: calc(100% - 448px); /* header image 400px, footer 48px */
  background-color: #fafafa;
`;

const Login = styled.div`
  width: 400px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition-duration: 0.3s;
  opacity: 1;

  &.log-in {
    transform: translate(-50%, -65%);
    transition-duration: 0.3s;
    opacity: 0;
  }
`;

interface HomeProps {
  isEditorOpen: boolean;
  openEditor: () => void;
}

const Home: React.FC<HomeProps> = (props) => {
  const { isEditorOpen } = props;
  const [loggedIn, setLoggedIn] = useState(false);
  const [animation, setAnimation] = useState(false);

  // useEffect(() => {
  //   setInterval(() => setLoggedIn((logged) => !logged), 2000);
  // }, []);

  const foo = () => {
    setAnimation(true);
    setTimeout(() => setLoggedIn(true), 300);
  };

  return (
    <div className={isEditorOpen ? 'd-none' : ''} style={{ height: '100%' }}>
      <HeaderImage className={loggedIn ? 'shrink' : ''} loggedIn={loggedIn} />
      <HeaderSection loggedIn={loggedIn} />
      {loggedIn ? (
        <>
          <Main>
            <ProjectSection title={'Foobar'} projects={projects} />
            {/* <ProjectSection title={'Foobar'} projects={projects} /> */}
          </Main>
          <Footer>
            <p>v0.1</p>
          </Footer>
        </>
      ) : (
        <Login className={animation ? 'log-in' : ''}>
          <img src={require('../assets/SVG/login.svg')} height="80px" />
          <div className="form">
            <h2>Log In</h2>
            <p>Connect with your CircuitMess ID</p>
            <br />
            <div className="label">Email</div>
            <input type="text" className="error" />
            <div className="errortext">You must provide an Email!</div>

            <div className="label">Password</div>
            <input type="password" />
            <div className="errortext">&nbsp;</div>

            <div className="button mid blue">
              <div className="text">Log In</div>
            </div>
          </div>
          <div className="form clickable a-l">
            <h3 className="stack blue">Sign Up</h3>
            <p>Not a member? Not a problem!</p>
            <div className="icon right blue">
              <i className="material-icons"> open_in_new </i>
            </div>
          </div>
          <div className="button mid teal">
            <button onClick={foo}>Skip Log In</button>
          </div>
        </Login>
      )}
    </div>
  );
};

interface EditorProps {
  isEditorOpen: boolean;
  openHome: () => void;
  title: string;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { isEditorOpen, openHome, title } = props;
  const [isModalOpen, setIsModalOpen] = useState(true);

  const run = () => {
    console.log('RUN');
  };

  const load = () => {
    console.log('Load');
  };

  const save = () => {
    console.log('Save');
  };

  const toggle = () => {
    console.log('Toggle');
  };

  const saveExternal = () => {
    console.log('save external');
  };

  const close = () => {
    console.log('close');
  };

  const footer = {
    left: [{ text: 'Save externally', onClick: saveExternal }],
    right: [
      { text: 'Cancel', onClick: close },
      { text: 'Save', onClick: save, color: 'blue' },
      { text: 'Save', onClick: save, color: 'blue', disabled: true }
    ]
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={isEditorOpen ? '' : 'd-none'}>
      {isModalOpen && (
        <Modal.Modal footer={footer} title="Modal title" close={closeModal}>
          <h1>Foobar</h1>
          <h1>Foobar</h1>
        </Modal.Modal>
      )}
      <EditorHeader
        home={openHome}
        load={load}
        run={run}
        title={title}
        save={save}
        toggle={toggle}
      />
    </div>
  );
};

const App = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openHome = () => {
    setIsEditorOpen(false);
  };

  const openEditor = () => {
    setIsEditorOpen(true);
  };

  const closeAlert = () => {
    console.log('No :(');
    setIsAlertOpen(false);
  };

  const okAlert = () => {
    console.log('Ok');
    setIsAlertOpen(false);
  };

  return (
    <>
      {isAlertOpen && (
        <Modal.Alert title="Foobar" body="Something......" close={closeAlert} yes={okAlert} />
      )}
      <Home isEditorOpen={isEditorOpen} openEditor={openEditor} />
      <Editor isEditorOpen={isEditorOpen} title={'Foobar'} openHome={openHome} />
    </>
  );
};

export default App;
