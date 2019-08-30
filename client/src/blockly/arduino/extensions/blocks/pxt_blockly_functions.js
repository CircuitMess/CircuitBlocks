goog.require("Blockly");
goog.require("Blockly.Blocks");
goog.require("Blockly.Constants.Procedures");

goog.provide("Blockly.Ext.Blocks.Functions");

Blockly.Blocks['function_definition'].updateDisplay__ = Blockly.Blocks['function_definition'].updateDisplay_;

const updateDisplay = function(){
    this.updateDisplay__();
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
};

Blockly.Blocks['function_definition'].updateDisplay_ = updateDisplay;

Blockly.Blocks['function_definition'].getReturnType = function(){
    var returnType = Blockly.Types.NULL;
    var returnBlock = this.getInputTargetBlock('RETURN');
    if (returnBlock) {
        // First check if the block itself has a type already
        if (returnBlock.getBlockType) {
            returnType = returnBlock.getBlockType();
        } else {
            returnType = Blockly.Types.getChildBlockType(returnBlock);
        }
    }

    return returnType;
};
