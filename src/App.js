import React, { Component } from "react";
import Blockly from "node-blockly/browser";
import "./App.css";

import toolbox from "./assets/toolbox";

class App extends Component {
  componentDidMount() {
    Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
  }

  render = () => {
    return (
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
    );
  };
}

export default App;
