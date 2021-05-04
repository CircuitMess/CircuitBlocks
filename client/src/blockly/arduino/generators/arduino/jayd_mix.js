"use strict";


goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.JayDMix');

function registerSystem(){
	Blockly.Arduino.addInclude("Mix_System_Include", "#include <AudioLib/Systems/MixSystem.h>");
	Blockly.Arduino.addVariable("mix", "MixSystem* mix;");
	Blockly.Arduino.addSetup("Mix_System_Constr", "mix = new MixSystem();");
	Blockly.Arduino.addSetup("Mix_System_Mix", "mix->setMix(0);");
	Blockly.Arduino.addSetup("Mix_System_Speed", "mix->addSpeed(0);");
}

Blockly.Arduino['mix_song'] = function(block) {
	var SONG = block.getFieldValue('SONG');

	return [ `"${SONG}"`, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['mix_open'] = function(block) {
	registerSystem();

	Blockly.Arduino.addInclude("SD", "#include <SD.h>");

	var path = Blockly.Arduino.valueToCode(block, 'FILE', Blockly.Arduino.ORDER_ATOMIC);

	var code = "mix->open(0, SD.open(" + path + "));\n";
	return code;
};

Blockly.Arduino['mix_start'] = function(block) {
	registerSystem();

	var code = "mix->start();\n";
	return code;
};

Blockly.Arduino['mix_stop'] = function(block) {
	registerSystem();

	var code = "mix->stop();\n";
	return code;
};

Blockly.Arduino['mix_effect'] = function(block) {
	var EFFECT = block.getFieldValue('EFFECT');

	return [ EFFECT, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['mix_effect_set'] = function(block) {
	var SLOT = block.getFieldValue('SLOT');
	var EFFECT = Blockly.Arduino.valueToCode(block, 'EFFECT', Blockly.Arduino.ORDER_ATOMIC);

	return `mix->setEffect(0, ${SLOT}, ${EFFECT});\n`;
};

Blockly.Arduino['mix_effect_set_intensity'] = function(block) {
	var SLOT = block.getFieldValue('SLOT');
	var INTENSITY = Blockly.Arduino.valueToCode(block, 'INTENSITY', Blockly.Arduino.ORDER_ATOMIC);

	return `mix->setEffectIntensity(0, ${SLOT}, ${INTENSITY});\n`;
};

Blockly.Arduino['mix_speed'] = function(block) {
	var SPEED = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

	return `mix->setSpeed(0, ${SPEED});\n`;
};

Blockly.Arduino['mix_volume'] = function(block) {
	var VOLUME = Blockly.Arduino.valueToCode(block, 'VOLUME', Blockly.Arduino.ORDER_ATOMIC);

	return `mix->setVolume(0, ${VOLUME});\n`;
};