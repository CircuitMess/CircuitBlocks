import React from 'react';
import PropTypes from 'prop-types';

class BlocklyEditor extends React.Component {
  propTypes = {
    setRef: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isCodeOpen: PropTypes.bool.isRequired
  };

  render() {
    const {setRef, width, height, isCodeOpen} = this.props;
    // const [appState, appDispatch] = useAppStateValue();
    // const { isCodeOpen } = appState;

    return (
        <div
          id="blocklyDiv"
          className={isCodeOpen ? 'd-none' : ''}
          style={{height}}
          ref={setRef}
        />
    );
  }
}

export default BlocklyEditor;
