import React, { useState, useEffect } from 'react';
import { AllElectron, IpcRenderer, IpcRendererEvent } from 'electron';
import styled from 'styled-components';

import { ProjectSection } from '../../components/Section';
import { HeaderImage, HeaderSection } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';

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

interface listExamples {
  error: any;
  data?: {};
}

interface listFiles {
  error: any;
  data?: string[];
}

export interface FileCard {
  title: string;
  author: string;
  description?: string;
  filename: string;
}

const map_lambda = (author: string) => (filename: string) => ({
  title: filename.slice(0, filename.length - 4),
  author: 'You',
  filename
});

const Home: React.FC<HomeProps> = (props) => {
  const { isEditorOpen, openEditor } = props;
  const [loggedIn, setLoggedIn] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [projects, setProjects] = useState<FileCard[]>([]);
  const [examples, setExamples] = useState<any[]>([]);
  const [areProjectLoading, setAreProjectLoading] = useState(true);
  const [areExamplesLoading, setAreExamplesLoading] = useState(true);

  // useEffect(() => {
  //   setInterval(() => setLoggedIn((logged) => !logged), 2000);
  // }, []);

  const foo = () => {
    setAnimation(true);
    setTimeout(() => setLoggedIn(true), 300);
  };

  useEffect(() => {
    ipcRenderer.once('listExamples', (event: IpcRendererEvent, args: listExamples) => {
      if (args.error) {
        console.error('Error loading examples');
      } else {
        if (args.data) {
          const data = Object.keys(args.data).map((section_key) => ({
            title: section_key,
            data: (args.data as any)[section_key].map(map_lambda('Official example'))
          }));
          console.log(data);
          setExamples(data);
          setAreExamplesLoading(false);
        }
      }
    });

    ipcRenderer.send('listExamples');

    ipcRenderer.once('listFiles', (event: IpcRendererEvent, args: listFiles) => {
      if (args.error) {
        console.error('Error loading examples');
      } else {
        if (args.data) {
          const data = args.data.map(map_lambda('You'));
          console.log(data);
          setProjects(data);
          setAreProjectLoading(false);
        }
      }
    });

    ipcRenderer.send('listFiles');
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
            {areProjectLoading ? (
              <h3>Loading...</h3>
            ) : (
              <ProjectSection
                title={'Your projects'}
                projects={projects}
                onPress={openFile}
                createNew
              />
            )}
            {areExamplesLoading ? (
              <h3>Loading...</h3>
            ) : (
              examples.map((section) => (
                <ProjectSection
                  title={section.title.slice(0, 1).toUpperCase() + section.title.slice(1)}
                  projects={section.data}
                  key={`Section-${section.title}`}
                  onPress={openFile}
                />
              ))
            )}
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
