import React, { Component } from "react";
import Blockly from "node-blockly/browser";
import "./App.css";

import { toolbox } from "./assets/xmls.js";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";

class App extends Component {
  state = {
    code: ""
  };

  componentDidMount() {
    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
    this.workspace.addChangeListener(e => {
      const code = Blockly.JavaScript.workspaceToCode(this.workspace);
      console.log(code);
      this.setState({ code });
    });
  }

  render() {
    const { code } = this.state;

    return (
      <div className="wrapper">
        <Header />
        <div className="editor">
          <div id="blocklyContainer">
            <div
              id="blocklyDiv"
              ref={d => {
                this.blocklyDiv = d;
              }}
            />
          </div>
        </div>

        <CodeEditor code={code} />
      </div>
    );
  }
}

export default App;
