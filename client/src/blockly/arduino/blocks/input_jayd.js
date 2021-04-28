'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.inputJayD');

Blockly.defineBlocksWithJsonArray([
    {
        type: "jayd_buttons",
        message0: "button %1",
        args0: [
            {
                type: "field_dropdown",
                name: "BUTTON",
                options: [
                    [ "bottom left", "BTN_L" ],
                    [ "bottom right", "BTN_R" ],
                    [ "encoder middle", "BTN_MID" ],
                    [ "encoder left top", "BTN_L1" ],
                    [ "encoder left middle", "BTN_L2" ],
                    [ "encoder left bottom", "BTN_L3" ],
                    [ "encoder right top", "BTN_R1" ],
                    [ "encoder right middle", "BTN_R2" ],
                    [ "encoder right bottom", "BTN_R3" ]
                ]
            }
        ],
        output: "Number",
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Button",
        helpUrl: ""
    }
]);

Blockly.Blocks["input_jayd_button"] = {
    init: function(){
        this.setColour(Blockly.Msg.IO_HUE);
        this.appendValueInput('BUTTON')
            .setCheck("Number")
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

Blockly.Blocks["input_jayd_button_held"] = {
    init: function(){
        this.setColour(Blockly.Msg.IO_HUE);
        this.appendValueInput('BUTTON')
            .setCheck("Number")
            .appendField("When");
        this.appendValueInput("DURATION")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("gets held for");
        this.appendDummyInput()
            .appendField("milliseconds");

        this.appendStatementInput('CODE');
    }
};