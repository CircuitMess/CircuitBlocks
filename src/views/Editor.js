import React, { Component } from "react";
import Blockly from "../BlocklyDuino";

import AppContext, { AppProvider } from "../contexts/AppContext";
import AppReducer from "../reducers/AppReducer";
import { toolbox } from "../assets/xmls.js";
import CodeEditor from "../components/CodeEditor";
import BlocklyEditor from "../components/BlocklyEditor";
import { EditorHeader } from "../components/Header";
import Popups from "../components/Popups";

const appInitState = {
  isModalOpen: false,
  modalType: "save",
  isAlertOpen: false,
  alertText: "You cant save an empty file",
  isCodeOpen: false
};

const NAV_BAR_HEIGHT = 64;

class Main extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      code: "",
      width: window.innerWidth,
      height: window.innerHeight - NAV_BAR_HEIGHT,
      isCodeOpen: false
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.openSaveModal = this.openSaveModal.bind(this);
    this.openLoadModal = this.openLoadModal.bind(this);
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

    Blockly.prompt = () => {
      console.log("asdlkjasdkl");
    };

    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener(e => {
      const code = Blockly.Arduino.workspaceToCode(this.workspace);
      if (this.state.code !== code) {
        this.setState({ code });
      }
    });

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
    this.setState(state => {
      const isCodeOpen = !state.isCodeOpen;
      // this.workspace.setVisible(!isCodeOpen);
      return { isCodeOpen: isCodeOpen };
    });
  }

  render() {
    const { code, width, height, isCodeOpen } = this.state;

    return (
      <div className="wrapper">
        <Popups load={this.load} />
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

const Editor = props => {
  return (
    <AppProvider initialState={appInitState} reducer={AppReducer}>
      <Main openHome={props.openHome} />
    </AppProvider>
  );
};

export default Editor;
