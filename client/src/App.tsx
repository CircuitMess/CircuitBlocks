import React, { Component } from 'react';

import loadFile from './assets/xmls';
import { AppProvider } from './contexts/AppContext';
import AppReducer from './reducers/AppReducer';
import { Home, Editor } from './views';
import './App.css';

const appInitState = {
  isModalOpen: false,
  modalType: 'save',
  isAlertOpen: false,
  alertText: 'You cant save an empty file',
  isCodeOpen: false
};

interface Props {}
interface State {
  homeOpen: boolean;
}

class App extends Component<Props, State> {
  editor: any = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      homeOpen: true
    };

    this.editor = React.createRef();

    this.toggleHome = this.toggleHome.bind(this);
    this.closeHome = this.closeHome.bind(this);
    this.openHome = this.openHome.bind(this);
    this.open = this.open.bind(this);
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

  open(filename?: string) {
    if (filename) {
      const xml = loadFile(`tutorials/${filename}`);
      if (xml) {
        this.editor.current.load(xml);
      } else {
        alert('Error');
      }
    } else {
      this.editor.current.clear();
    }
  }

  render() {
    const { homeOpen } = this.state;

    return (
      <AppProvider initialState={appInitState} reducer={AppReducer}>
        {homeOpen && <Home closeHome={this.closeHome} open={this.open} />}
        <Editor openHome={this.openHome} ref={this.editor} />
      </AppProvider>
    );
  }
}

export default App;
