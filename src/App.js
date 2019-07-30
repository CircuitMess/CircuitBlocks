import React, { Component } from "react";
import Blockly from "node-blockly/browser";
import { saveAs } from "file-saver";
import "./App.css";

import { toolbox } from "./assets/xmls.js";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";

class App extends Component {
  state = {
    code: "",
    isCodeOpen: false
  };

  componentDidMount() {
    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener(e => {
      const code = Blockly.JavaScript.workspaceToCode(this.workspace);
      this.setState({ code });
    });
  }

  save = () => {
    var xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    var blob = new Blob([xmlText], { type: "application/xml;charset=utf-8" });
    saveAs(blob, "file.xml");
  };

  toggle = () => {
    this.setState(state => ({ isCodeOpen: !state.isCodeOpen }));
  };

  loadOnChange = e => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onloadend = e => {
      if (e.returnValue) {
        const xml = Blockly.Xml.textToDom(fr.result);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
      }
    };
    fr.readAsText(file);
  };

  render() {
    const { code, isCodeOpen } = this.state;

    return (
      <div className="wrapper">
        <Header
          isCodeOpen={isCodeOpen}
          toggle={this.toggle}
          save={this.save}
          loadOnChange={this.loadOnChange}
        />
        <div className={`editor ${isCodeOpen ? "d-none" : ""}`}>
          <div id="blocklyContainer">
            <div
              id="blocklyDiv"
              ref={d => {
                this.blocklyDiv = d;
              }}
            />
          </div>
        </div>

        <div className={`code ${!isCodeOpen ? "d-none" : ""}`}>
          <CodeEditor code={code} />
        </div>
      </div>
    );
  }
}

export default App;
