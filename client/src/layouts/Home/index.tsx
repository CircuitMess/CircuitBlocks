import React, { useState } from 'react';
import styled from 'styled-components';

import { ProjectSection } from '../../components/Section';
import { HeaderImage, HeaderSection } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';

const projects = [
  {
    title: 'Getting Started GuideModal',
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

const Main = styled.div`
  background-color: #fafafa;
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
            <ProjectSection title={'Foobar'} projects={projects} />
          </Main>
          <Footer>
            <p>v0.1</p>
          </Footer>
        </>
      ) : (
        <Login className={animation ? 'log-in' : ''}>
          <img src={require('../../assets/SVG/login.svg')} height="80px" alt="Login" />
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

export default Home;
