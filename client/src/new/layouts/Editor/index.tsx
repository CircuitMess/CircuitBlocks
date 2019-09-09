import React, { Component } from 'react';
import Blockly from '../../../blockly/blockly';

import { toolbox } from '../../../assets/xmls.js';
import EditorHeader from '../../components/EditorHeader';
import * as Modal from '../../components/Modal';
import EditorPopup from './components/EditorPopup';
import EditorPopupHeader from './components/EditorPopupHeader';
import Monaco from './components/Monaco';
import BlocklyEditor from '../../../components/BlocklyEditor';
import ReactDOM from 'react-dom';
import Toolbox from '../../../components/Toolbox';
import Prompt from '../../components/Modal/Prompt';

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

interface EditorProps {
  isEditorOpen: boolean;
  openHome: () => void;
  title: string;
  monacoRef: React.RefObject<any>;
}

interface State {
  isModalOpen: boolean;
  isCodeOpen: boolean;
  isCodeFull: boolean;
  width?: number;
  height?: number;
  code?: string;
  theme: 'vs-light' | 'vs-dark';
  initState?: string;
  isPromptOpen?: boolean;
  promptText?: string;
}

const CODE = `// Code goes here\n`;
const NAV_BAR_HEIGHT = 64;

class Editor extends Component<EditorProps, State> {
  blocklyDiv: any = undefined;
  workspace: any = undefined;
  callback: (value: string) => void = () => {};

  constructor(props: EditorProps) {
    super(props);

    this.state = {
      isModalOpen: false,
      isCodeOpen: true,
      isCodeFull: false,
      code: CODE,
      height: window.innerHeight - NAV_BAR_HEIGHT,
      theme: 'vs-dark'
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
        console.log(code);
        this.setState({ code });
      }
    });
    this.load(xml);
    this.updateDimensions();
    this.injectToolbox();
    window.addEventListener('resize', this.updateDimensions);
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
    console.log('RUN');
  };

  loadButton = () => {
    console.log('Load');
  };

  load = (data: string) => {
    const xml = Blockly.Xml.textToDom(data);
    Blockly.getMainWorkspace().clear();
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  };

  save = () => {
    console.log('Save');
  };

  toggle = () => {
    this.setState({ isCodeOpen: !this.state.isCodeOpen });
  };

  saveExternal = () => {
    console.log('save external');
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

  render() {
    const {
      isModalOpen,
      isCodeOpen,
      isCodeFull,
      height,
      code,
      theme,
      isPromptOpen,
      initState,
      promptText
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

    return (
      <div className={isEditorOpen ? '' : 'd-none'}>
        {isModalOpen && (
          <Modal.Modal footer={footer} title="Modal title" close={this.closeModal}>
            <h1>Foobar</h1>
            <h1>Foobar</h1>
          </Modal.Modal>
        )}

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
          load={this.loadButton}
          run={this.run}
          save={this.save}
          toggle={this.toggle}
          title={title}
          isCodeOpen={isCodeOpen}
          running={true}
        />

        <BlocklyEditor height={height} isCodeOpen={false} setRef={this.setRef} />

        {isCodeOpen && (
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
