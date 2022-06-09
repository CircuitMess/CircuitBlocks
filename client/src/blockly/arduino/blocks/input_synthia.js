'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.inputSynthia');

Blockly.Blocks["input_synthia_encoder"] = {
    init: function () {
        this.jsonInit({
            type: "input_synthia_encoder",
            message0: "when encoder %1 moves",
            args0: [{
                type: "field_dropdown",
                name: "ENC",
                options: [
                    [ "left", "left" ],
                    [ "right", "right" ]
                ]
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

Blockly.Blocks["input_synthia_pot"] = {
    init: function () {
        this.jsonInit({
            type: "input_synthia_pot",
            message0: "when slider %1 moves",
            args0: [{
                type: "field_dropdown",
                name: "POT",
                options: [
                    [ "left", "left" ],
                    [ "right", "right" ]
                ]
            }],
            message1: "%1",
            args1: [{
                type: "input_statement",
                name: "CODE"
            }],
            message3: "",
            outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
            colour: Blockly.Msg.IO_HUE,
            tooltip: "When potentiometer is moved",
            helpUrl: ""
        });

        this.arguments_ = [
            {
                name: "value",
                type: "Number",
                id: "POT_Moved_Value"
            }
        ];

        this.functionId_ = "POT_moved";
        this.name_ = "POT_moved";
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

Blockly.defineBlocksWithJsonArray([
    {
        type: "input_synthia_pot_current",
        message0: "%1 current value",
        args0: [{
            type: "field_dropdown",
            name: "POT",
            options: [
                [ "left", "left" ],
                [ "right", "right" ]
            ]
        }],
        output: "Number",
        outputShape: Blockly.OUTPUT_SHAPE_ROUND,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Current potentiometer value",
        helpUrl: ""
    }
]);