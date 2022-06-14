goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.ledmatrix");

let goog = Blockly.goog;

Blockly.Arduino['ledmatrix_push'] = function(block) {
	var code = "LEDmatrix.push();\n";
	return code;
};

Blockly.Arduino['ledmatrix_clear'] = function(block) {
	var code = "LEDmatrix.clear();\n";
	return code;
};

Blockly.Arduino['ledmatrix_pixel'] = function(block) {
	var brightness = Blockly.Arduino.valueToCode(block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC);
	var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
	var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);

	var code = `LEDmatrix.drawPixel(${x}, ${y}, ${brightness});\n`;
	return code;
};

Blockly.Arduino['ledmatrix_text'] = function(block) {
	var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
	var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
	var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
	var brightness = Blockly.Arduino.valueToCode(block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC);

	var code = `LEDmatrix.drawString(${x}, ${y}, ${text}, ${brightness});\n`;
	return code;
};

Blockly.Arduino['ledmatrix_brightness'] = function(block) {
	var brightness = Blockly.Arduino.valueToCode(block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC);

	var code = `LEDmatrix.setBrightness(${brightness});\n`;
	return code;
};

Blockly.Arduino['ledmatrix_start_animation'] = function(block) {
	Blockly.Arduino.addDeclaration("Spencer_Matrix_Anim", "MatrixAnim* anim = nullptr;")

	var anim = Blockly.Arduino.valueToCode(block, 'ANIMATION', Blockly.Arduino.ORDER_ATOMIC);

	var code = `delete anim;\nanim = new MatrixAnimGIF(new SerialFlashFileAdapter(${anim}), &LEDmatrix);\nanim->start();\n`;
	return code;
};

Blockly.Arduino['ledmatrix_stop_animation'] = function(block) {
	Blockly.Arduino.addDeclaration("Spencer_Matrix_Anim", "MatrixAnim* anim = nullptr;")

	var code = `delete anim;\nanim = nullptr;\n`;
	return code;
};

Blockly.Arduino['ledmatrix_animation'] = function(block) {
	var anim = block.getFieldValue('ANIMATION');

	return [ `"${anim}"`, Blockly.Arduino.ORDER_ATOMIC ];
};