goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.ledmatrixJayD");

let goog = Blockly.goog;


Blockly.Arduino['jayd_ledmatrix_push'] = function(block) {
	Blockly.Arduino.addInclude("Matrix_Include", "#include <Matrix/MatrixManager.h>");

	var code = "matrixManager.push();\n";
	return code;
};

Blockly.Arduino['jayd_ledmatrix_clear'] = function(block) {
	Blockly.Arduino.addInclude("Matrix_Include", "#include <Matrix/MatrixManager.h>");

	var code = "matrixManager.clear();\n";
	return code;
};

Blockly.Arduino['jayd_ledmatrix_pixel'] = function(block) {
	Blockly.Arduino.addInclude("Matrix_Include", "#include <Matrix/MatrixManager.h>");

	var matrix = block.getFieldValue('MATRIX');
	var brightness = Blockly.Arduino.valueToCode(block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC);
	var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
	var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);

	var code = `matrixManager.${matrix}.drawPixel(${x}, ${y}, ${brightness});\n`;
	return code;
};

Blockly.Arduino['jayd_ledmatrix_start_animation'] = function(block) {
	Blockly.Arduino.addInclude("Matrix_Include", "#include <Matrix/MatrixManager.h>");

	var matrix = block.getFieldValue('MATRIX');
	var anim = block.getFieldValue('ANIMATION');

	const animName = {
		matrixL: "left",
		matrixR: "right",
		matrixMid: "mid",
		matrixBig: "big"
	};

	var code = `matrixManager.${matrix}.startAnimation(new Animation(new File(SPIFFS.open("/matrixGIF/${animName[matrix]}${anim}.gif"))), true);\n`;
	return code;
};

Blockly.Arduino['jayd_ledmatrix_stop_animation'] = function(block) {
	Blockly.Arduino.addInclude("Matrix_Include", "#include <Matrix/MatrixManager.h>");

	var matrix = block.getFieldValue('MATRIX');

	var code = `matrixManager.${matrix}.stopAnimation();\n`;
	return code;
};
