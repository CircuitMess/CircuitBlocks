goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.WheelsonIO");

Blockly.Arduino['wheelson_buttons'] = function(block) {
	var BUTTON = block.getFieldValue('BUTTON');
	return [ BUTTON, Blockly.Arduino.ORDER_ATOMIC ];
};