
goog.require("Blockly.Extensions");

goog.provide("Blockly.Extensions.ReturnBoolean");

Blockly.Extensions.register("return_boolean", function(){
    this.getBlockType = function(){
        return Blockly.Types.BOOLEAN;
    }
});