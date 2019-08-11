goog.provide("Blockly.Ext.Procedures");

goog.require("Blockly.Procedures");

var oldFlyoutCat = Blockly.Procedures.flyoutCategory;

Blockly.Procedures.flyoutCategory = function(workspace){
  var originalXmlList = oldFlyoutCat(workspace);
  var arduinoXmlList = [];

  if (Blockly.Blocks['arduino_functions']) {
    // <block type="arduino_functions" gap="16"></block>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'arduino_functions');
    block.setAttribute('gap', 16);
    // If this parent block present already in the workspace show as disabled
    var workspaceTopBlocks = workspace.getTopBlocks();
    for (var i = 0; i < workspaceTopBlocks.length; i++) {
      if (workspaceTopBlocks[i].getArduinoLoopsInstance &&
        workspaceTopBlocks[i].getArduinoLoopsInstance()) {
        block.setAttribute('disabled', true);
      }
    }
    arduinoXmlList.push(block);
  }

  return arduinoXmlList.concat(originalXmlList);
};