import React from 'react';
import PropTypes from 'prop-types';

class BlocklyEditor extends React.Component {
  static propTypes = {
    setRef: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    isCodeOpen: PropTypes.bool.isRequired
  };

  render() {
    const { setRef, height, width, isCodeOpen } = this.props;
    // const [appState, appDispatch] = useAppStateValue();
    // const { isCodeOpen } = appState;

    return (
      <div
        id="blocklyDiv"
        className={isCodeOpen ? 'd-none' : ''}
        style={{ height, width }}
        ref={setRef}
      />
    );
  }
}

export default BlocklyEditor;
