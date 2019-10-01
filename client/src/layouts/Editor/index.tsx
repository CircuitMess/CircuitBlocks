import React, {Component, DOMElement} from 'react';
import ReactDOM from 'react-dom';
import Blockly from '../../blockly/blockly';
import { IpcRenderer, AllElectron } from 'electron';
import { saveAs } from 'file-saver';

import { toolbox } from '../../assets/xmls.js';
import EditorHeader from './components/EditorHeader';
import * as Modal from '../../components/Modal';
import EditorPopup from './components/EditorPopup';
import EditorPopupHeader from './components/EditorPopupHeader';
import Monaco from './components/Monaco';
import BlocklyEditor from '../../components/BlocklyEditor';
import Toolbox from '../../components/Toolbox';
import Prompt from '../../components/Modal/Prompt';
import Notification, { NotificationWrapper } from '../../components/Notification';
import Serial from "./components/Serial";
import { Sketch } from "../Home/index";

const xml = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="controls_repeat_ext" id="GjRfTgQ%?xU(rWxi%pl+" x="201" y="165">
    <value name="TIMES">
      <block type="math_number" id="K;jtzgt3E9*pzyW(Tz_=">
        <field name="NUM">10</field>
      </block>
    </value>
    <statement name="DO">
      <block type="io_digitalwrite" id="~xaStXz~,~#~Z9S*v(h4">
        <field name="PIN">0</field>
        <value name="STATE">
          <block type="io_highlow" id="f\`UziPkNCW*S-VOoNtQc">
            <field name="STATE">LOW</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>`;

const sanitizeName = (name: string) => name.replace(/ /g, '_').replace(/\./g, '');

interface EditorProps {
  isEditorOpen: boolean;
  openHome: () => void;
  title: string;
  setFilename: (filename: string) => void;
  monacoRef: React.RefObject<any>;
  reportError: (error: string, fatal?: boolean) => void;
}

interface State {
  isModalOpen: boolean;
  modal: {
    type: 'save' | 'load';
    data?: any;
  };
  serial: string;
  isSerialOpen: boolean;
  isCodeOpen: boolean;
  isCodeFull: boolean;
  width?: number;
  height?: number;
  code?: string;
  theme: 'vs-light' | 'vs-dark';
  initState?: string;
  isPromptOpen?: boolean;
  promptText?: string;
  running: boolean;
  runningStage?: string;
  runningPercentage?: number;
  notifications: Notification[];
  makerPhoneConnected: boolean;
  filename: string;
  filenames?: string[];
  filenameError?: string;
  xml?: string;
}

const CODE = `// Code goes here\n`;
const NAV_BAR_HEIGHT = 64;

const INIT_STATE: State = {
  isModalOpen: false,
  modal: {
    type: 'save'
  },
  isCodeOpen: true,
  isCodeFull: false,
  code: CODE,
  height: window.innerHeight - NAV_BAR_HEIGHT,
  theme: 'vs-dark',
  running: false,
  notifications: [],
  makerPhoneConnected: false,
  filename: '',
  runningPercentage: 0,
  serial: '',
  isSerialOpen: false
};

interface Notification {
  id: string;
  message: string;
  icon?: string;
  close?: boolean;
}

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;
const { dialog } = electron.remote;

console.log("dialog");
console.log(electron.dialog);

class Editor extends Component<EditorProps, State> {
  blocklyDiv: any = undefined;
  workspace: any = undefined;
  callback: (value: string) => void = () => {};

  constructor(props: EditorProps) {
    super(props);

    this.state = {
      ...INIT_STATE
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    const { innerWidth, innerHeight } = window;
    this.setState({
      width: innerWidth,
      height: innerHeight - NAV_BAR_HEIGHT
    });

    Blockly.svgResize(this.workspace);
  }

  componentDidMount() {
    Blockly.prompt = (a, b, c) => {
      const initState = a.split("'")[1];
      this.callback = c;
      this.setState({ initState: initState, isPromptOpen: true, promptText: a });
    };

    (window as any).Blockly = Blockly;
    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener((e: any) => {
      const code = Blockly.Arduino.workspaceToCode(this.workspace);
      if (this.state.code !== code) {
        this.setState({ code });
      }
    });

    this.load(xml);
    this.updateDimensions();
    this.injectToolbox();
    window.addEventListener('resize', this.updateDimensions);

    ipcRenderer.on('ports', (event: any, args: any) => {
      const { port } = args;

      if(port && !this.state.makerPhoneConnected){
        this.addNotification('Makerphone connected');
        this.setState({ makerPhoneConnected: true });
      }else if(!port && this.state.makerPhoneConnected){
        this.addNotification(`Makerphone disconnected`);
        this.setState({ makerPhoneConnected: false });
      }
    });

    ipcRenderer.on("runprogress", (event: any, args: any) => {
      if(!this.state.running) return;

      if(args.stage == "DONE"){
        this.setState({ running: false, runningStage: undefined, runningPercentage: undefined });

        if(args.error){
          this.addNotification(args.error);
        }

        return;
      }

      let progress = args.stage == "UPLOAD" ? 50 : 0;
      progress += args.progress / 2;

      if(args.stage == "EXPORT"){
        progress *= 2;
      }

      if(progress == 0) progress = 0.1;
      if(progress == 0.5) progress = 0.56;

      this.setState({ runningPercentage: progress, runningStage: args.stage })
    });

    ipcRenderer.send('ports');
  }

  injectToolbox() {
    const blockly = ReactDOM.findDOMNode(this.blocklyDiv) as Element;
    const blocklyToolboxDiv = blockly.getElementsByClassName('blocklyToolboxDiv')[0];

    const blocklyToolbox = (
      <div className="blocklyToolbox">
        <Toolbox editorname="blocks" blockly={Blockly} />
      </div>
    );

    ReactDOM.render(blocklyToolbox, blocklyToolboxDiv);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  run = () => {
    this.setState({ running: true, runningPercentage: 0 });
    ipcRenderer.send('run', { code: this.state.code });
  };

  openLoadModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeNotification = (id: string) => () => {
    this.setState((oldState) => {
      const newNotifications = oldState.notifications.map((item) =>
        item.id !== id ? item : { ...item, close: true }
      );

      setTimeout(() => {
        this.setState((oldState) => {
          const removeNotifications = oldState.notifications.filter((item) => item.id !== id);
          return { notifications: removeNotifications };
        });
      }, 500);

      return { notifications: newNotifications };
    });
  };

  addNotification = (message: string, time: number = 2000) => {
    const notification: Notification = {
      message,
      id: new Date().getTime().toString()
    };
    this.setState({ notifications: [...this.state.notifications, notification] });

    if (time !== -1) {
      setTimeout(this.closeNotification(notification.id), time);
    }
  };

  load = (data: string) => {
    const xml = Blockly.Xml.textToDom(data);
    this.workspace.clear();
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  };

  private generateSketch(): string {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace) as unknown as Element;

    const node = this.workspace.getCanvas().cloneNode(true);
    node.removeAttribute("transform");
    node.firstChild.removeAttribute("transform");
    const snapshot = document.createElement("snapshot");
    snapshot.appendChild(node);
    xmlDom.prepend(snapshot);

    return Blockly.Xml.domToText(xmlDom);
  }

  save = () => {
    ipcRenderer.once('save', (event, arg) => {
      if(arg.error) {
        this.addNotification(arg.error);
      }else{
        this.addNotification("Sketch saved.");
      }
    });

    ipcRenderer.send('save', { title: this.props.title, data: this.generateSketch() });
  };

  onSubmitSaveModal = (e?: React.FormEvent<HTMLFormElement>) => {
    const filename = sanitizeName(this.state.filename);
    e && e.preventDefault();

    ipcRenderer.once('save', (event, arg) => {
      if(arg.error) {
        this.addNotification(arg.error);
      } else {
        this.props.setFilename(filename);
        this.finishSaveModal();
        this.addNotification("Sketch saved.");
      }
    });

    ipcRenderer.send('save', { title: filename, data: this.state.xml });
  };

  openSaveModal = () => {
    if (this.workspace.getAllBlocks().length === 0) {
      this.addNotification("You can't save an empty sketch.");
      return;
    }

    this.setState({ xml: this.generateSketch() });

    ipcRenderer.once('sketches', (event, arg) => {
      if (!arg.sketches) return;
      const filenames = arg.sketches.map((sketch: Sketch) => sketch.title);
      this.setState({filenames});
    });

    ipcRenderer.send('sketches');

    this.setState({
      isModalOpen: true,
      modal: {
        type: 'save'
      },
      filename: '',
      filenameError: 'EMPTY'
    });
  };

  exportBinary = () => {
    const path = dialog.showSaveDialogSync({});
    this.setState({ running: true, runningPercentage: 0 });
    ipcRenderer.send('export', { code: this.state.code, path });
  };

  saveExternal = () => {
    if (this.state.xml) {
      const blob = new Blob([this.state.xml], {
        type: 'application/xml;charset=utf-8'
      });
      saveAs(blob, 'filename.xml');
    }
    this.finishSaveModal();
  };

  toggle = () => {
    this.setState({ isCodeOpen: !this.state.isCodeOpen });
    this.updateDimensions();
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  closeCode = () => {
    this.state.isCodeOpen && this.toggle();
  };

  fullScreenToggle = () => {
    this.setState({ isCodeFull: !this.state.isCodeFull });
  };

  setRef = (ref: any) => {
    this.blocklyDiv = ref;
  };

  toggleTheme = () => {
    this.setState({ theme: this.state.theme === 'vs-dark' ? 'vs-light' : 'vs-dark' });
  };

  closePrompt = () => {
    this.setState({ isPromptOpen: false });
  };

  onChangeSaveModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filename = e.target.value;
    const newState: { filename: string; filenameError: string | undefined } = {
      filename,
      filenameError: undefined
    };

    if (filename.length === 0) {
      newState['filenameError'] = 'EMPTY';
    } else if (this.state.filenames && this.state.filenames.includes(filename)) {
      newState['filenameError'] = 'EXISTS';
    }

    console.log(newState);

    this.setState(newState);
  };

  finishSaveModal = () => {
    this.setState({
      isModalOpen: false,
      filename: '',
      filenameError: undefined
    });
  };

  cleanup = () => {
    Blockly.hideChaff();
  };

  render() {
    const {
      isModalOpen,
      modal,
      isCodeOpen,
      isCodeFull,
      height,
      width,
      code,
      theme,
      isPromptOpen,
      initState,
      promptText,
      running,
      runningStage,
      runningPercentage,
      notifications,
      makerPhoneConnected,
      filename,
      filenameError,
      serial,
      isSerialOpen
    } = this.state;
    const { isEditorOpen, openHome, title, monacoRef } = this.props;

    const footer = {
      left: [{ text: 'Save externally', onClick: this.saveExternal }],
      right: [
        { text: 'Cancel', onClick: this.closeModal },
        { text: 'Save', onClick: this.save, color: 'blue' },
        { text: 'Save', onClick: this.save, color: 'blue', disabled: true }
      ]
    };

    const saveFooter = {
      left: [{ text: 'Save externally', onClick: this.saveExternal }],
      right: [
        { text: 'Cancel', onClick: this.closeModal },
        {
          text: 'Save',
          onClick: this.onSubmitSaveModal,
          color: 'blue',
          disabled: this.state.filenameError !== undefined
        }
      ]
    };

    const modalProps = {
      footer: modal.type === 'save' ? saveFooter : footer,
      title: 'Modal title',
      close: this.closeModal
    };

    return (
      <div className={isEditorOpen ? 'e-open' : 'e-close'} style={{ backgroundColor: '#F9F9F9' }}>
        {isEditorOpen && (
          <React.Fragment>
            {isModalOpen &&
              (modal.type === 'save' ? (
                <Modal.SaveModal
                  {...modalProps}
                  filename={filename}
                  filenameError={filenameError}
                  onChange={this.onChangeSaveModal}
                  onSubmit={this.onSubmitSaveModal}
                />
              ) : (
                null
              ))}

            {isPromptOpen && (
              <Prompt
                initValue={initState || ''}
                callback={this.callback}
                promptText={promptText || ''}
                closePrompt={this.closePrompt}
              />
            )}

            <EditorHeader
              home={openHome}
              load={this.openLoadModal}
              run={this.run}
              save={this.props.title.length > 0 ? this.save : this.openSaveModal}
              toggle={this.toggle}
              title={title}
              isCodeOpen={isCodeOpen}
              isSerialOpen={isSerialOpen}
              openSerial={() => this.setState({isSerialOpen: !this.state.isSerialOpen})}
              running={running}
              runningStage={runningStage}
              runningPercentage={runningPercentage}
              connected={makerPhoneConnected}
              exportBinary={this.exportBinary}
            />

            {notifications && (
              <NotificationWrapper>
                {notifications.map((item) => (
                  <Notification key={item.id} {...item} onClick={this.closeNotification(item.id)} />
                ))}
              </NotificationWrapper>
            )}
          </React.Fragment>
        )}

        <BlocklyEditor
          running={this.state.running}
          runStage={this.state.runningStage}
          height={height}
          width={width}
          isCodeOpen={isCodeOpen}
          setRef={this.setRef}
          ws={this.workspace}

        />

        <Serial connected={this.state.makerPhoneConnected && runningStage != "UPLOAD"} isOpen={isSerialOpen} />

        {isCodeOpen && isEditorOpen && (
          <EditorPopup className={isCodeFull ? 'fullscreen' : ''} theme={theme}>
            <EditorPopupHeader
              closeCode={this.closeCode}
              fullScreenToggle={this.fullScreenToggle}
              toggleTheme={this.toggleTheme}
              theme={theme}
            />
            <Monaco ref={monacoRef} code={code} theme={theme} />
          </EditorPopup>
        )}
      </div>
    );
  }
}

export default Editor;
