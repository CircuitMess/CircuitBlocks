goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.CircuitPetIO");

Blockly.Arduino['circuitpet_rgb'] = function(block) {
	var COLOR = block.getFieldValue('COLOR');

	var code = "RGB.setColor(" + COLOR + ");\n";
	return code;
};