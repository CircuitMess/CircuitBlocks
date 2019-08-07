import React, { Component } from "react";
import Blockly from "../BlocklyDuino";

import AppContext, { AppProvider } from "../contexts/AppContext";
import AppReducer from "../reducers/AppReducer";
import { toolbox } from "../assets/xmls.js";
import CodeEditor from "../components/CodeEditor";
import BlocklyEditor from "../components/BlocklyEditor";
import { EditorHeader } from "../components/Header";
import Popups from "../components/Popups";
import Prompt from "../components/Prompt";

const appInitState = {
  isModalOpen: false,
  modalType: "save",
  isAlertOpen: false,
  alertText: "You cant save an empty file",
  isCodeOpen: false
};

const NAV_BAR_HEIGHT = 64;

const xml = `<xml xmlns="https://developers.google.com/blockly/xml">
<variables>
  <variable id="7mJ{C@uaA68446C*.l.+">Foobar</variable>
</variables>
<block type="controls_if" id="3bFu]EuGml4DKM,qqVo/" x="110" y="75">
  <value name="IF0">
    <block type="variables_get" id="6VO[p;*;m.VHSfFqD9=">
      <field name="VAR" id="7mJ{C@uaA68446C*.l.+">Foobar</field>
    </block>
  </value>
</block>
</xml>`;

class Main extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      code: "",
      width: window.innerWidth,
      height: window.innerHeight - NAV_BAR_HEIGHT,
      isCodeOpen: false,
      initState: "",
      promptOpen: false,
      promptText: ""
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.openSaveModal = this.openSaveModal.bind(this);
    this.openLoadModal = this.openLoadModal.bind(this);
    this.closePrompt = this.closePrompt.bind(this);
    this.toggleCode = this.toggleCode.bind(this);
    this.setRef = this.setRef.bind(this);
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

    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener((e) => {
      const code = Blockly.Arduino.workspaceToCode(this.workspace);
      if (this.state.code !== code) {
        this.setState({ code });
      }
    });
    this.load(xml);
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  openSaveModal() {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    if (xmlText.split("<").length > 2) {
      this.appDispatch({
        type: "openModal",
        payload: { type: "save", xml: xmlText }
      });
    } else {
      this.appDispatch({
        type: "openAlert",
        payload: { text: "You cant save an empty file" }
      });
    }
  }

  openLoadModal() {
    this.appDispatch({
      type: "openModal",
      payload: { type: "load" }
    });
  }

  setRef(ref) {
    this.blocklyDiv = ref;
  }

  load(data) {
    const xml = Blockly.Xml.textToDom(data);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
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

  render() {
    const {
      code,
      width,
      height,
      isCodeOpen,
      initState,
      promptOpen,
      promptText
    } = this.state;

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
          openHome={this.props.openHome}
          toggleCode={this.toggleCode}
          isCodeOpen={isCodeOpen}
        />
        <BlocklyEditor
          setRef={this.setRef}
          width={width}
          height={height}
          isCodeOpen={isCodeOpen}
        />
        <CodeEditor code={code} isCodeOpen={isCodeOpen} />
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <AppProvider initialState={appInitState} reducer={AppReducer}>
      <Main openHome={props.openHome} />
    </AppProvider>
  );
};

export default Editor;
