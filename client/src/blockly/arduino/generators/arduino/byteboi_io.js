goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.ByteBoiIO");

Blockly.Arduino['byteboi_rgb'] = function(block) {
	var COLOR = block.getFieldValue('COLOR');

	var code = "LED.setRGB(" + COLOR + ");\n";
	return code;
};

Blockly.Arduino['byteboi_splash'] = function(block) {
	var code = "ByteBoi.splash();\n";
	return code;
};