import React, { Component } from "react";

import { Home, Editor } from "./views";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homeOpen: true
    };

    this.toggleHome = this.toggleHome.bind(this);
    this.closeHome = this.closeHome.bind(this);
    this.openHome = this.openHome.bind(this);
  }

  closeHome() {
    this.setState({ homeOpen: false });
  }

  openHome() {
    this.setState({ homeOpen: true });
  }

  toggleHome() {
    this.setState({ homeOpen: !this.state.homeOpen });
  }

  render() {
    const { homeOpen } = this.state;

    return (
      <>
        {homeOpen && <Home closeHome={this.closeHome} />}
        <Editor openHome={this.openHome} />
      </>
    );
  }
}

export default App;
