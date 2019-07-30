import React, { Component } from "react";
import Blockly from "node-blockly/browser";
import "./App.css";

import { toolbox } from "./assets/xmls.js";
import CodeEditor from "./components/CodeEditor";
import BlocklyEditor from "./components/BlocklyEditor";
import Header from "./components/Header";
import Modal from "./components/Modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      isCodeOpen: false,
      isModalOpen: false,
      modalType: "" //save / load / ...
    };

    this.openSaveModal = this.openSaveModal.bind(this);
    this.openLoadModal = this.openLoadModal.bind(this);
    this.toggleCode = this.toggleCode.bind(this);
    this.setRef = this.setRef.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
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
      this.setState({ isModalOpen: true, modalType: "save", xmlText });
    } else {
      alert("You cant save an empty file");
    }
  }

  openLoadModal() {
    this.setState({ isModalOpen: true, modalType: "load" });
  }

  toggleCode() {
    this.setState(state => ({ isCodeOpen: !state.isCodeOpen }));
  }

  setRef(ref) {
    this.blocklyDiv = ref;
  }

  load(data) {
    const xml = Blockly.Xml.textToDom(data);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { code, isCodeOpen, isModalOpen, modalType, xmlText } = this.state;

    return (
      <div className="wrapper">
        <Modal
          {...{ isModalOpen, modalType, xmlText }}
          load={this.load}
          closeModal={this.closeModal}
        />
        <Header
          isCodeOpen={isCodeOpen}
          toggle={this.toggleCode}
          save={this.openSaveModal}
          load={this.openLoadModal}
        />
        <BlocklyEditor setRef={this.setRef} isCodeOpen={isCodeOpen} />
        <CodeEditor code={code} isCodeOpen={isCodeOpen} />
      </div>
    );
  }
}

export default App;
