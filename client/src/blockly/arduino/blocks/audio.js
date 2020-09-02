'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.audio');

Blockly.Blocks["piezo_tone"] = {
    init: function(){
        this.appendValueInput("FREQUENCY")
            .appendField("Play tone with frequency")
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.appendValueInput("DURATION")
            .appendField("for")
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.appendDummyInput()
            .appendField("milliseconds");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Msg.IO_HUE);
    },

    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }
        var freq = Blockly.Arduino.valueToCode(this, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC)
        if (freq < 31 || freq > 65535) {
            this.setWarningText(Blockly.Msg.ARD_TONE_WARNING, 'piezo_tone');
        } else {
            this.setWarningText(null, 'piezo_tone');
        }
    }
};

Blockly.Blocks["piezo_notone"] = {
    init: function(){
        this.appendDummyInput()
            .appendField("Stop playing tone");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Msg.IO_HUE);
    }
};

Blockly.Blocks["piezo_mute"] = {
    init: function(){
        this.appendValueInput("MUTE")
            .appendField("Mute piezo speaker")
            .setCheck(Blockly.Types.BOOLEAN.checkList);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Msg.IO_HUE);
    }
};

Blockly.Blocks["piezo_ismute"] = {
    init: function(){
        this.appendDummyInput()
            .appendField("is piezo speaker muted");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setColour(Blockly.Msg.IO_HUE);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
    },

    getBlockType: function() {
        return Blockly.Types.BOOLEAN;
    }
};