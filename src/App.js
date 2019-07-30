import React, { Component } from "react";
import Blockly from "node-blockly/browser";
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
      console.log(code);
      this.setState({ code });
    });
  }

  toggle = () => {
    this.setState(state => ({ isCodeOpen: !state.isCodeOpen }));
  };

  render() {
    const { code, isCodeOpen } = this.state;

    return (
      <div className="wrapper">
        <Header isCodeOpen={isCodeOpen} toggle={this.toggle} />
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
