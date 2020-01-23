import React, { useState, useEffect } from 'react';
import { AllElectron, IpcRenderer, IpcRendererEvent } from 'electron';
import styled from 'styled-components';

import { ProjectSection } from '../../components/Section';
import { HeaderImage, HeaderSection } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import {Loader} from "semantic-ui-react";
import Error from "./components/Error";

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
  padding: 30px 0;
`;

interface HomeProps {
  isEditorOpen: boolean;
  openEditor: (data: string, filename?: string) => void;
  scrollStop: boolean;
  reportError: (error: string, fatal?: boolean) => void;
}

interface HomeState {
  animation: boolean;
  loggedIn: boolean;
  sketches: Sketch[];
  examples: Category[];
  projectsLoading: boolean;
  examplesLoading: boolean;
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

export default class Home extends React.Component<HomeProps, HomeState> {


  // useEffect(() => {
  //   setInterval(() => setLoggedIn((logged) => !logged), 2000);
  // }, []);

  public constructor(props: HomeProps){
    super(props);

    this.state = {
      loggedIn: true,
      animation: false,
      sketches: [],
      examples: [],
      projectsLoading: true,
      examplesLoading: true
    };

    ipcRenderer.on('sketches', (event: IpcRendererEvent, args) => {
      this.setState({ sketches: args.sketches || [], projectsLoading: false });
    });

    ipcRenderer.on('examples', (event: IpcRendererEvent, args) => {
      this.setState({ examples: args.categories || [], examplesLoading: false });
    });
  }

  private foo(){
    this.setState({ animation: true });
    setTimeout(() => this.setState({ loggedIn: true }), 300);
  };

  public componentDidUpdate(prevProps: Readonly<HomeProps>, prevState: Readonly<HomeState>, snapshot?: any): void {
    if(prevProps.isEditorOpen == this.props.isEditorOpen) return;

    window.scrollTo(0, 0);

    this.loadSketches();
  }

  public componentDidMount(): void {
    this.loadSketches();
  }

  public loadSketches(){
    this.setState({ projectsLoading: true, examplesLoading: true });

    ipcRenderer.send('sketches');
    ipcRenderer.send('examples');
  } //, [isEditorOpen]);

  public restoreFirmware(){
    ipcRenderer.send("firmware");
  }

  public openErrorReport(){
    ipcRenderer.send("report");
  }

  public openFile(type: 'NEW' | 'OPEN', sketch?: Sketch){
    const { reportError, openEditor } = this.props;

    if (type === 'NEW') {
      openEditor('', undefined);
    } else if(sketch) {
      ipcRenderer.once('load', (event: IpcRendererEvent, args) => {
        if (args.error) {
          reportError(args.error);
        } else {
          openEditor(args.data, sketch.title);
        }
      });

      ipcRenderer.send('load', { path: sketch.path });
    }
  }

  public render(){
    const { isEditorOpen, scrollStop } = this.props;
    const { animation, loggedIn, sketches, examples, projectsLoading, examplesLoading } = this.state;

    return <div
            className={isEditorOpen ? 'd-none' : 'h-open'}
            style={{
              height: '100%',
              backgroundSize: 'cover',
              backgroundImage: `url(${require('../../assets/images/bg/bg-02.png')})`,
              zIndex: 10,
              overflow: (scrollStop) ? "hidden" : undefined
            }}
        >
          <HeaderImage className={loggedIn ? 'shrink' : ''} loggedIn={loggedIn} />
          <HeaderSection loggedIn={loggedIn} restoreCallback={() => this.restoreFirmware()} />
          {loggedIn ? (
              <>
                <Main>
                  <ProjectSection
                      title={'Your sketches'}
                      projects={sketches}
                      onPress={(type, sketch) => this.openFile(type, sketch)}
                      createNew={ !projectsLoading } />

                  <Loader active={projectsLoading || examplesLoading} inline={"centered"} style={{ marginBottom: 20 }} />

                  { examples.map(category =>
                      <ProjectSection
                          title={category.title}
                          projects={category.sketches}
                          key={`Section-${category.title}`}
                          onPress={(type, sketch) => this.openFile(type, sketch)}
                      /> )}
                </Main>
                <Footer>
                  <p>v1.0.2 <span style={{ padding: "0 10px" }}>|</span> <a style={{ cursor: "pointer" }} onClick={ () => this.openErrorReport() }>Send error report</a></p>
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
                  <button onClick={() => this.foo()}>Skip Log In</button>
                </div>
              </Login>
          )}
        </div>
  }
};
