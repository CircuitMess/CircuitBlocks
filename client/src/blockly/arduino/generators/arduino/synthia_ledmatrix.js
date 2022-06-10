goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.ledmatrixSynthia");

let goog = Blockly.goog;


Blockly.Arduino['synthia_ledmatrix_push'] = function(block) {
	var matrix = block.getFieldValue('MATRIX');

	var code = `Synthia.${matrix}.push();\n`
	return code;
};

Blockly.Arduino['synthia_ledmatrix_clear'] = function(block) {
	var matrix = block.getFieldValue('MATRIX');

	var code = `Synthia.${matrix}.clear();\n`
	return code;
};

Blockly.Arduino['synthia_ledmatrix_pixel_mono'] = function(block) {
	var matrix = block.getFieldValue('MATRIX');
	var brightness = Blockly.Arduino.valueToCode(block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC);
	var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
	var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Synthia.${matrix}.drawPixel(${x}, ${y}, { 255, 255, 255, ${brightness} });\n`;
	return code;
};

Blockly.Arduino['synthia_ledmatrix_pixel_rgb'] = function(block) {
	var matrix = block.getFieldValue('MATRIX');
	var color = block.getFieldValue('COLOR');
	var i = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Synthia.${matrix}.drawPixel(${i}, ${color});\n`;
	return code;
};

Blockly.Arduino['synthia_ledmatrix_start_animation'] = function(block) {
	Blockly.Arduino.addDeclaration("Synthia_Matrix_Anim", "MatrixAnim* anim = nullptr;")

	var anim = block.getFieldValue('ANIMATION');

	var code = `delete anim;\nanim = new MatrixAnimGIF(SPIFFS.open("${anim}"), &Synthia.TrackMatrix);\nanim->start();\n`;
	return code;
};

Blockly.Arduino['synthia_ledmatrix_stop_animation'] = function(block) {
	Blockly.Arduino.addDeclaration("Synthia_Matrix_Anim", "MatrixAnim* anim = nullptr;")

	var code = `delete anim;\nanim = nullptr;\n`;
	return code;
};
