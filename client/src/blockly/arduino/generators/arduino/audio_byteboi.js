"use strict";

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.audio_byteboi');

Blockly.Arduino['playback_tone'] = function(block) {
    const FREQUENCY = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC);
    const DURATION = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);

    return `Playback.tone(${FREQUENCY}, ${DURATION});\n`
};

Blockly.Arduino['playback_notone'] = function(block) {
    return `Playback.noTone();\n`
};

Blockly.Arduino['playback_setVolume'] = function(block) {
    const VOLUME = Blockly.Arduino.valueToCode(block, 'VOLUME', Blockly.Arduino.ORDER_ATOMIC);

    return `Settings.get().volume = ${VOLUME};\n  Playback.updateGain();\n`
};

Blockly.Arduino['playback_getVolume'] = function(block) {
    return ["Settings.get().volume", Blockly.Arduino.ORDER_ATOMIC];
};
