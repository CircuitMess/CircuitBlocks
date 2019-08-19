import React from 'react';
import PropTypes from 'prop-types';

const BlocklyEditor = (props) => {
  const { setRef, width, height, isCodeOpen } = props;
  // const [appState, appDispatch] = useAppStateValue();
  // const { isCodeOpen } = appState;

  return (
    <div
      id="blocklyDiv"
      className={isCodeOpen ? 'd-none' : ''}
      style={{ width, height }}
      ref={setRef}
    />
  );
};

BlocklyEditor.propTypes = {
  setRef: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isCodeOpen: PropTypes.bool.isRequired
};

export default BlocklyEditor;
