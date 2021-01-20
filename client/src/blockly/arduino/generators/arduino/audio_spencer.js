goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.audio_spencer');

function SpencerAudioFunc(group){
	return function(block){
		var sample = block.getFieldValue('SAMPLE');

		var code = `SampleStore::load(SampleGroup::${group}, "${sample}")`;

		return [ code, Blockly.Arduino.ORDER_ATOMIC ];
	}
}

Blockly.Arduino['audio_spencer_sample_error'] = SpencerAudioFunc("Error");
Blockly.Arduino['audio_spencer_sample_generic'] = SpencerAudioFunc("Generic");
Blockly.Arduino['audio_spencer_sample_level'] = SpencerAudioFunc("Levels");
Blockly.Arduino['audio_spencer_sample_special'] = SpencerAudioFunc("Special");
Blockly.Arduino['audio_spencer_sample_weather'] = SpencerAudioFunc("Weather");
Blockly.Arduino['audio_spencer_sample_month'] = SpencerAudioFunc("Months");
Blockly.Arduino['audio_spencer_sample_weekday'] = SpencerAudioFunc("Weekdays");
Blockly.Arduino['audio_spencer_sample_number'] = SpencerAudioFunc("Number");
Blockly.Arduino['audio_spencer_sample_number_ordinal'] = SpencerAudioFunc("Numbers");
Blockly.Arduino['audio_spencer_sample_funpack'] = SpencerAudioFunc("Funpack");
Blockly.Arduino['audio_spencer_sample_joke'] = SpencerAudioFunc("Jokes");

Blockly.Arduino['audio_spencer_playsample'] = function(block){
	var sample = Blockly.Arduino.valueToCode(block, 'SAMPLE', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Playback.playMP3(${sample});\n`;
	return code;
};

Blockly.Arduino['audio_spencer_stopsample'] = function(block){
	var code = `Playback.stopPlayback();\n`;
	return code;
};

Blockly.Arduino['audio_spencer_done'] = function(block){
	const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Playback.setPlaybackDoneCallback([](){\n${CODE}\n});\n`;
	return code;
};