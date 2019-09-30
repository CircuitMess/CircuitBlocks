import React, { useState, useEffect } from 'react';
import { AllElectron, IpcRenderer, IpcRendererEvent } from 'electron';
import styled from 'styled-components';

import { ProjectSection } from '../../components/Section';
import { HeaderImage, HeaderSection } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import {Loader} from "semantic-ui-react";

// const projects = [
//   {
//     title: 'Getting Started GuideModal',
//     author: 'Official Example',
//     description:
//       'In this sketch you can find real world examples of something important to your device programming.'
//   },
//   {
//     title: 'Getting Started Guide',
//     author: 'Official Example',
//     description:
//       'In this sketch you can find real world examples of something important to your device programming.'
//   }
// ];

const Main = styled.div`
  background-color: #fafafa;
`;

interface HomeProps {
  isEditorOpen: boolean;
  openEditor: (data: string, filename?: string) => void;
}

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

export interface Sketch {
  title: string;
  path?: string;
  snapshot?: string;
  description?: string;
}

export interface Category {
  title: string;
  sketches: Sketch[]
}

const Home: React.FC<HomeProps> = (props) => {
  const { isEditorOpen, openEditor } = props;
  const [loggedIn, setLoggedIn] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const [examples, setExamples] = useState<Category[]>([]);
  const [projectsLoadding, setProjectLoading] = useState(true);
  const [examplesLoading, setExamplesLoading] = useState(true);

  // useEffect(() => {
  //   setInterval(() => setLoggedIn((logged) => !logged), 2000);
  // }, []);

  const foo = () => {
    setAnimation(true);
    setTimeout(() => setLoggedIn(true), 300);
  };

  useEffect(() => {
    ipcRenderer.once('sketches', (event: IpcRendererEvent, args) => {
      if(args.sketches){
        setSketches(args.sketches);
      }

      setProjectLoading(false);
    });

    ipcRenderer.once('examples', (event: IpcRendererEvent, args) => {
      if(args.categories){
        setExamples(args.categories);
      }

      setExamplesLoading(false);
    });

    ipcRenderer.send('sketches');
    ipcRenderer.send('examples');
  }, [isEditorOpen]);

  const openFile = ({ type, filename }: { type: 'OPEN' | 'NEW'; filename?: string }) => {
    if (type === 'NEW') {
      openEditor('', undefined);
    } else {
      ipcRenderer.once('load', (event: IpcRendererEvent, args) => {
        if (args.error) {
          console.error('ERROR');
        } else {
          openEditor(args.data, filename && filename.slice(0, filename.length - 4));
        }
      });

      ipcRenderer.send('load', { filename });
    }
  };

  return (
    <div
      className={isEditorOpen ? 'd-none' : 'h-open'}
      style={{
        height: '100%',
        backgroundSize: 'cover',
        backgroundImage: `url(${require('../../assets/images/bg/bg-02.png')})`,
        zIndex: 10
      }}
    >
      <HeaderImage className={loggedIn ? 'shrink' : ''} loggedIn={loggedIn} />
      <HeaderSection loggedIn={loggedIn} />
      {loggedIn ? (
        <>
          <Main>
              <ProjectSection
                title={'Your sketches'}
                projects={sketches}
                onPress={openFile}
                createNew={ !projectsLoadding } />

              <Loader active={projectsLoadding || examplesLoading} inline={"centered"} style={{ margin: "20px auto" }} />

              { examples.map(category =>
                <ProjectSection
                    title={category.title}
                    projects={category.sketches}
                    key={`Section-${category.title}`}
                    onPress={openFile}
                /> )}
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
