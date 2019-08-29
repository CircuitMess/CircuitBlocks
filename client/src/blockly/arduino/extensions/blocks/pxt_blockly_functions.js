goog.require("Blockly");
goog.require("Blockly.Blocks");
goog.require("Blockly.Constants.Procedures");

goog.provide("Blockly.Ext.Functions");

Blockly.Blocks['function_definition'].updateDisplay__ = Blockly.Blocks['function_definition'].updateDisplay_;

const updateDisplay = function(){
    this.updateDisplay__();
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
};

Blockly.Blocks['function_definition'].updateDisplay_ = updateDisplay;