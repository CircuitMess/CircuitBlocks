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
    },
    {
        type: "jayd_encoders",
        message0: "encoder %1",
        args0: [
            {
                type: "field_dropdown",
                name: "ENCODER",
                options: [
                    [ "middle", "ENC_MID" ],
                    [ "left top", "ENC_L1" ],
                    [ "left middle", "ENC_L2" ],
                    [ "left bottom", "ENC_L3" ],
                    [ "right top", "ENC_R1" ],
                    [ "right middle", "ENC_R2" ],
                    [ "right bottom", "ENC_R3" ],
                ]
            }
        ],
        output: "Number",
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Encoder",
        helpUrl: ""
    }
]);

Blockly.Blocks["input_jayd_button"] = {
    init: function(){
        this.setColour(Blockly.Msg.IO_HUE);
        this.appendValueInput('BUTTON')
            .setCheck("Number")
            .appendField("when");
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
            .appendField("when");
        this.appendValueInput("DURATION")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("gets held for");
        this.appendDummyInput()
            .appendField("milliseconds");

        this.appendStatementInput('CODE');
    }
};

Blockly.Blocks["input_jayd_encoder"] = {
    init: function () {
        this.jsonInit({
            type: "input_jayd_encoder",
            message0: "when %1 moves",
            args0: [{
                type: "input_value",
                name: "ENC",
                check: "Number"
            }],
            message1: "%1",
            args1: [{
                type: "input_statement",
                name: "CODE"
            }],
            message3: "",
            outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
            colour: Blockly.Msg.IO_HUE,
            tooltip: "When encoder is moved",
            helpUrl: ""
        });

        this.arguments_ = [
            {
                name: "amount",
                type: "Number",
                id: "ENC_Moved_Value"
            }
        ];

        this.functionId_ = "ENC_moved";
        this.name_ = "ENC_moved";
    },

    mutationToDom: function () {
        var a = document.createElement("mutation");
        this.arguments_.forEach(function (b) {
            var c = document.createElement("arg");
            c.setAttribute("name", b.name);
            c.setAttribute("id", b.id);
            c.setAttribute("type", b.type);
            a.appendChild(c)
        });
        return a
    },

    domToMutation: function (a) {
        for (var b = [], c = 0; c < a.childNodes.length; ++c) {
            var d = a.childNodes[c];
            "arg" == d.nodeName.toLowerCase() && b.push({
                id: d.getAttribute("id"),
                name: d.getAttribute("name"),
                type: d.getAttribute("type")
            })
        }
        this.arguments_ = b;
        this.updateDisplay_()
    },

    getName: Blockly.PXTBlockly.FunctionUtils.getName,
    getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
    getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
    removeValueInputs_: function(){}, // Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
    disconnectOldBlocks_: function(){}, // Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
    deleteShadows_: function(a){}, // Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
    createAllInputs_: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
    updateDisplay_: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
    setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
    populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDefinition_,
    addFunctionLabel_: function(a){},
    updateFunctionLabel_: function(a){},
    createArgumentReporter_: Blockly.PXTBlockly.FunctionUtils.createArgumentReporter_,

    ensureIds_: function () {}
};
