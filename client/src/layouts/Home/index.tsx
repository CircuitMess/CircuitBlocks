import React from 'react';
import {AllElectron, IpcRenderer, IpcRendererEvent} from 'electron';
import styled from 'styled-components';

import {ProjectSection} from '../../components/Section';
import {HeaderImage, HeaderSection} from './components/Header';
import {Footer} from './components/Footer';
import {Login} from './components/Login';
import {Loader} from "semantic-ui-react";
import {SketchLoadInfo, SketchType} from "../Editor";
import {NewSketch} from "./components/NewSketch";
import {RestoreFirmware} from "./components/RestoreFirmware";
import {SpencerSettings} from "./components/SpencerSettings";

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
  openEditor: (data: SketchLoadInfo, filename?: string) => void;
  scrollStop: boolean;
  reportError: (error: string, fatal?: boolean) => void;
}

interface HomeState {
  animation: boolean;
  loggedIn: boolean;
  sketches: { block: Sketch[], code: Sketch[] };
  examples: Category[];
  projectsLoading: boolean;
  examplesLoading: boolean;
  newSketchOpen: boolean;
  restoreFirmwareModalOpen: boolean;
  spencerSettingsModalOpen: boolean;
}

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface Device {
  fqbn: string;
  name: string;
}

export const Devices: { [name: string]: Device } = {
  "cm:esp32:ringo": { fqbn: "cm:esp32:ringo", name: "Ringo" },
  "cm:esp8266:nibble": { fqbn: "cm:esp8266:nibble", name: "Nibble" }
};

export interface Sketch {
  title: string;
  device: string;
  path?: string;
  snapshot?: string;
  description?: string;
}

export interface Category {
  title: string;
  sketches: { code: Sketch[], block: Sketch[] };
}

export default class Home extends React.Component<HomeProps, HomeState> {


  // useEffect(() => {
  //   setInterval(() => setLoggedIn((logged) => !logged), 2000);
  // }, []);

  public constructor(props: HomeProps){
    super(props);

    this.state = {
      spencerSettingsModalOpen: false,
      loggedIn: true,
      animation: false,
      sketches: { code: [], block: [] },
      examples: [],
      projectsLoading: true,
      examplesLoading: true,
      newSketchOpen: false,
      restoreFirmwareModalOpen: false
    };

    ipcRenderer.on('sketches', (event: IpcRendererEvent, args) => {
      this.setState({ sketches: args.sketches || { code: [], block: [] }, projectsLoading: false });
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

  public restoreFirmware(device: string){
    this.setState({ restoreFirmwareModalOpen: false });
    ipcRenderer.send("firmware", { device });
  }

  public openErrorReport(){
    ipcRenderer.send("report");
  }

  public openFile(type: 'NEW' | 'NEWTYPE' | 'OPEN', device: string, sketch?: Sketch, sketchType?: SketchType){
    const { reportError, openEditor } = this.props;

    if (type === 'NEW') {
      this.setState({ newSketchOpen: true });
    } else if(type == "NEWTYPE" && sketchType != undefined) {
      this.setState({ newSketchOpen: false });
      openEditor({ type: sketchType, device, data: "" }, undefined);
    } else if(sketch) {
      ipcRenderer.once('load', (event: IpcRendererEvent, args) => {
        if (args.error) {
          reportError(args.error);
        } else {
          openEditor({ type: args.type, device: args.device, data: args.data }, sketch.title);
        }
      });

      ipcRenderer.send('load', { path: sketch.path });
    }
  }

  public render(){
    const { isEditorOpen, scrollStop } = this.props;
    const { newSketchOpen, animation, loggedIn, sketches, examples, projectsLoading, examplesLoading, restoreFirmwareModalOpen, spencerSettingsModalOpen } = this.state;

    return <div
            className={isEditorOpen ? 'd-none' : 'h-open'}
            style={{
              height: '100%',
              backgroundSize: 'cover',
              backgroundImage: `url(${require('../../assets/images/bg/bg-02.png')})`,
              zIndex: 10,
              overflow: (scrollStop || newSketchOpen) ? "hidden" : undefined
            }}
        >

          <NewSketch open={newSketchOpen} callback={ (type: SketchType, device: string) => this.openFile("NEWTYPE", device, undefined, type) } />
          <HeaderImage className={loggedIn ? 'shrink' : ''} loggedIn={loggedIn} />
          <HeaderSection loggedIn={loggedIn} restoreCallback={() => this.setState({ restoreFirmwareModalOpen: true })} openSpencerModal={()=> this.setState({ spencerSettingsModalOpen: true})} />
          <RestoreFirmware open={restoreFirmwareModalOpen} callback={device => this.restoreFirmware(device)} />
          <SpencerSettings
            open={spencerSettingsModalOpen}
            closeCallback={() => { this.setState({ spencerSettingsModalOpen: false }); }}
          />
          {loggedIn ? (
              <>
                <Main>
                  <ProjectSection
                      title={'Your sketches'}
                      projects={sketches}
                      onPress={(type, sketch) => this.openFile(type, sketch ? sketch.device : "cm:esp32:ringo", sketch)}
                      createNew={ !projectsLoading } />

                  <Loader active={projectsLoading || examplesLoading} inline={"centered"} style={{ marginBottom: 20 }} />

                  { examples.map(category =>
                      <ProjectSection
                          title={category.title}
                          projects={category.sketches}
                          key={`Section-${category.title}`}
                          onPress={(type, sketch) => this.openFile(type, sketch ? sketch.device : "cm:esp32:ringo", sketch)}
                      /> )}
                </Main>
                <Footer>
                  <p>v1.2.3 <span style={{ padding: "0 10px" }}>|</span> <a style={{ cursor: "pointer" }} onClick={ () => this.openErrorReport() }>Send error report</a></p>
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
