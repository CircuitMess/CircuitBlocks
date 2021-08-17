goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.WheelsonIO");

Blockly.Arduino['wheelson_battery'] = function(block) {
	var code = `Battery.getPercentage()`;
	return [ code, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['wheelson_buttons'] = function(block) {
	var BUTTON = block.getFieldValue('BUTTON');
	return [ BUTTON, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['wheelson_backlight'] = function(block) {
	var val = Blockly.Arduino.valueToCode(block, 'VAL', Blockly.Arduino.ORDER_ATOMIC);

	var code = "LED.setBacklight(" + val + ");\n";
	return code;
};

Blockly.Arduino['wheelson_headlight'] = function(block) {
	var val = Blockly.Arduino.valueToCode(block, 'VAL', Blockly.Arduino.ORDER_ATOMIC);

	var code = "LED.setHeadlight(" + val + ");\n";
	return code;
};

Blockly.Arduino['wheelson_backlight_get'] = function(block) {
	var code = "LED.getBacklight()";
	return [ code, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['wheelson_headlight_get'] = function(block) {
	var code = "LED.getHeadlight()";
	return [ code, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['wheelson_motor_set'] = function(block) {
	var ID = block.getFieldValue('ID');
	var SPEED = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Motors.setMotor(${ID}, ${SPEED});\n`;
	return code;
};

Blockly.Arduino['wheelson_motor_get'] = function(block) {
	var ID = block.getFieldValue('ID');

	var code = `Motors.getMotor(${ID})`;
	return [ code, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['wheelson_rgb'] = function(block) {
	var COLOR = block.getFieldValue('COLOR');

	var code = "LED.setRGB(" + COLOR + ");\n";
	return code;
};