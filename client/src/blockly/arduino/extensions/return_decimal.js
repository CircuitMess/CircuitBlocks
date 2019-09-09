
goog.require("Blockly.Extensions");

goog.provide("Blockly.Extensions.ReturnDecimal");

Blockly.Extensions.register("return_decimal", function(){
    var block = this;

    this.getBlockType = function(){
        return Blockly.Types.DECIMAL;
    }
});