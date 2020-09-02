'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.input');

Blockly.Blocks["input_button"] = {
    init: function(){
        this.setColour(Blockly.Msg.IO_HUE);
        this.appendValueInput('BUTTON')
            .setCheck("PIN")
            .appendField("When");
        this.appendDummyInput()
            .appendField("gets");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["pressed", "press"],
                ["released", "release"]
            ]), "STATE");

        this.appendStatementInput('CODE');
    }
};

Blockly.Blocks["input_button_held"] = {
    init: function(){
        this.setColour(Blockly.Msg.IO_HUE);
        this.appendValueInput('BUTTON')
            .setCheck("PIN")
            .appendField("When");
        this.appendValueInput("DURATION")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("gets held for");
        this.appendDummyInput()
            .appendField("milliseconds");

        this.appendStatementInput('CODE');
    }
};

Blockly.Blocks["input_button_any"] = {
    init: function(){
        this.setColour(Blockly.Msg.IO_HUE);
        this.appendDummyInput()
            .appendField("When any button gets pressed or released");
        this.appendStatementInput('CODE');
        this.appendValueInput("RETURN")
            .setCheck(Blockly.Types.BOOLEAN.checkList)
            .appendField("Ignore other button events");
    }
};