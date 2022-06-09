
goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.pins');

Blockly.Arduino['nibble_buttons'] = function(block) {
    var BUTTON = block.getFieldValue('BUTTON');

    return [ BUTTON, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['synthia_buttons'] = Blockly.Arduino['chatter_buttons'] = Blockly.Arduino['nibble_buttons'];