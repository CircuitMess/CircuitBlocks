import React, { Component } from 'react';
import Blockly from '../../blockly/blockly';

import AppContext from '../../contexts/AppContext';
import { toolbox } from '../../assets/xmls.js';
import CodeEditor from '../../components/CodeEditor';
import BlocklyEditor from '../../components/BlocklyEditor';
import { EditorHeader } from '../../components/Header';
import Popups from '../../components/Popups';
import Prompt from '../../components/Prompt';
import Toolbox from "../../components/Toolbox";
import * as ReactDOM from "react-dom";

const NAV_BAR_HEIGHT = 64;

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

class Editor extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      code: '',
      width: window.innerWidth,
      height: window.innerHeight - NAV_BAR_HEIGHT,
      isCodeOpen: false,
      initState: '',
      promptOpen: false,
      promptText: ''
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.openSaveModal = this.openSaveModal.bind(this);
    this.openLoadModal = this.openLoadModal.bind(this);
    this.closePrompt = this.closePrompt.bind(this);
    this.toggleCode = this.toggleCode.bind(this);
    this.openHome = this.openHome.bind(this);
    this.setRef = this.setRef.bind(this);
    this.clear = this.clear.bind(this);
    this.load = this.load.bind(this);
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
    const [appState, appDispatch] = this.context;
    this.appState = appState;
    this.appDispatch = appDispatch;

    Blockly.prompt = (a, b, c) => {
      const initState = a.split("'")[1];
      this.callback = c;
      this.setState({ initState: initState, promptOpen: true, promptText: a });
    };

    window.Blockly = Blockly;
    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener((e) => {
      const code = Blockly.Arduino.workspaceToCode(this.workspace);
      if (this.state.code !== code) {
        this.setState({ code });
      }
    });
    this.load(xml);
    this.updateDimensions();
    this.injectToolbox();
    window.addEventListener('resize', this.updateDimensions);
  }

  injectToolbox(){
    const blocklyToolboxDiv = ReactDOM.findDOMNode(this.blocklyDiv).getElementsByClassName("blocklyToolboxDiv")[0];

    const blocklyToolbox = <div className="blocklyToolbox">
      <Toolbox editorname="blocks" blockly={Blockly}/>
    </div>;

    ReactDOM.render(blocklyToolbox, blocklyToolboxDiv);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  openSaveModal() {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    if (xmlText.split('<').length > 2) {
      this.appDispatch({
        type: 'openModal',
        payload: { type: 'save', xml: xmlText }
      });
    } else {
      this.appDispatch({
        type: 'openAlert',
        payload: { text: 'You cant save an empty file' }
      });
    }
  }

  openLoadModal() {
    this.appDispatch({
      type: 'openModal',
      payload: { type: 'load' }
    });
  }

  clear() {
    this.workspace.clear();
  }

  setRef(ref) {
    this.blocklyDiv = ref;
  }

  load(data) {
    const xml = Blockly.Xml.textToDom(data);
    Blockly.getMainWorkspace().clear();
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }

  toggleCode() {
    this.setState((state) => {
      const isCodeOpen = !state.isCodeOpen;
      // this.workspace.setVisible(!isCodeOpen);
      return { isCodeOpen: isCodeOpen };
    });
  }

  closePrompt() {
    this.setState({ promptOpen: false });
  }

  openHome() {
    this.callback = (data) => {
      if (data === undefined) {
        // alert(`dont save`);
      } else {
        // alert(`Save as ${data}`);
      }
      this.props.openHome();
    };
    this.setState({
      promptOpen: true,
      promptText: 'Do you want to save',
      initState: undefined
    });
  }

  render() {
    const { code, width, height, isCodeOpen, initState, promptOpen, promptText } = this.state;

    return (
      <div className="wrapper">
        <Popups load={this.load} />
        {promptOpen && (
          <Prompt
            initValue={initState}
            callback={this.callback}
            promptText={promptText}
            closePrompt={this.closePrompt}
          />
        )}
        <EditorHeader
          save={this.openSaveModal}
          load={this.openLoadModal}
          openHome={this.openHome}
          toggleCode={this.toggleCode}
          isCodeOpen={isCodeOpen}
        />
        <BlocklyEditor setRef={this.setRef} width={width} height={height} isCodeOpen={isCodeOpen} />
        <CodeEditor code={code} isCodeOpen={isCodeOpen} />
      </div>
    );
  }
}

export default Editor;
