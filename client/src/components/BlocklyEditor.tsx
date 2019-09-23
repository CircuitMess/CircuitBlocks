import React from 'react';

import Blockly from '../blockly/blockly';

interface BlocklyEditorProps {
  height?: number;
  width?: number;
  isCodeOpen: boolean;
  ws: any;
  setRef: (instance: HTMLDivElement | null) => void;
}

class BlocklyEditor extends React.Component<BlocklyEditorProps, {}> {
  componentDidUpdate() {
    const blockly: typeof Blockly = (window as any).Blockly;

    if (blockly) {
      blockly.svgResize(this.props.ws);
    }
  }

  render() {
    const { setRef, height, width, isCodeOpen } = this.props;

    return (
      <div
        id="blocklyDiv"
        style={{ height, width: isCodeOpen ? width && width / 2 : width }}
        ref={setRef}
      />
    );
  }
}

export default BlocklyEditor;
