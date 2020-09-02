"use strict";

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.audio');

Blockly.Arduino['piezo_tone'] = function(block) {
    const FREQUENCY = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC);
    const DURATION = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);

    return `Piezo.tone(${FREQUENCY}, ${DURATION});\n`
};

Blockly.Arduino['piezo_notone'] = function(block) {
    return `Piezo.noTone();\n`
};

Blockly.Arduino['piezo_mute'] = function(block) {
    const MUTE = Blockly.Arduino.valueToCode(block, 'MUTE', Blockly.Arduino.ORDER_ATOMIC);

    return `Piezo.setMute(${MUTE});\n`
};

Blockly.Arduino['piezo_ismute'] = function(block) {
    return ["Piezo.isMuted()", Blockly.Arduino.ORDER_ATOMIC];
};
