import React from 'react';
import PropTypes from 'prop-types';

class BlocklyEditor extends React.Component {
  static propTypes = {
    setRef: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    isCodeOpen: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    if (window.Blockly) {
      window.Blockly.svgResize(this.props.ws);
    }
  }

  render() {
    const { setRef, height, width, isCodeOpen } = this.props;
    // const [appState, appDispatch] = useAppStateValue();
    // const { isCodeOpen } = appState;

    return (
      <div id="blocklyDiv" style={{ height, width: isCodeOpen ? width / 2 : width }} ref={setRef} />
    );
  }
}

export default BlocklyEditor;
