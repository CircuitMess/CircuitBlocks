
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

Blockly.Arduino['led_colour'] = function(block) {
    var COLOUR = block.getFieldValue('COLOUR');

    return [ COLOUR, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['led_on'] = function(block) {
    var led = Blockly.Arduino.valueToCode(block, 'LED', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = 'mp.leds[' + led + '] = ' + colour + ";\n";
    return code;
};

Blockly.Arduino['led_off'] = function(block) {
    var led = block.getFieldValue('LED');

    var code = 'mp.leds[' + led + '] = 0;\n';
    return code;
};