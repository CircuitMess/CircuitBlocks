import React, { Component } from "react";
import Blockly from "node-blockly/browser";
import "./App.css";

import AppContext, { AppProvider } from "./contexts/AppContext";
import AppReducer from "./reducers/AppReducer";
import { toolbox } from "./assets/xmls.js";
import CodeEditor from "./components/CodeEditor";
import BlocklyEditor from "./components/BlocklyEditor";
import Header from "./components/Header";
import Popups from "./components/Popups";

const appInitState = {
  isModalOpen: false,
  modalType: "",
  isAlertOpen: false,
  alertText: "",
  isCodeOpen: false
};

class Main extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      code: ""
    };

    this.openSaveModal = this.openSaveModal.bind(this);
    this.openLoadModal = this.openLoadModal.bind(this);
    this.setRef = this.setRef.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    const [appState, appDispatch] = this.context;
    this.appState = appState;
    this.appDispatch = appDispatch;
    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener(e => {
      const code = Blockly.JavaScript.workspaceToCode(this.workspace);
      this.setState({ code });
    });
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

  render() {
    const { code } = this.state;

    return (
      <div className="wrapper">
        <Popups load={this.load} />
        <Header save={this.openSaveModal} load={this.openLoadModal} />
        <BlocklyEditor setRef={this.setRef} />
        <CodeEditor code={code} />
      </div>
    );
  }
}

const App = () => {
  return (
    <AppProvider initialState={appInitState} reducer={AppReducer}>
      <Main />
    </AppProvider>
  );
};

export default App;
