
goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.phone");

Blockly.Arduino['vibrate'] = function(block) {
    var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);

    var code = "mp.vibrate(" + duration + ");\n";
    return code;
};

Blockly.Arduino['button_action'] = function(block) {
    var button = block.getFieldValue('BUTTON');
    var action = block.getFieldValue('ACTION');

    var code = 'mp.buttons.' + action + '(' + button + ')';
    return [ code, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['joystick'] = function(block) {
    var axis = block.getFieldValue('AXIS');

    var code = 'mp.buttons.getJoystick' + axis + '()';
    return [ code, Blockly.Arduino.ORDER_ATOMIC ];
};