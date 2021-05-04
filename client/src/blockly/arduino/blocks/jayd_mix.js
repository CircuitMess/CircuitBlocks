'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.JayDMix');

Blockly.defineBlocksWithJsonArray([
	{
		type: "mix_song",
		message0: "pre-recorded %1",
		args0: [
			{
				type: "field_dropdown",
				name: "SONG",
				options: [
					[ "A cup of tea - TAD", "/A cup of tea - TAD.aac" ],
					[ "Bartender - TAD", "/Bartender - TAD.aac" ],
					[ "Blues - 3uhox", "/Blues - 3uhox.aac" ],
					[ "Butcherd Beats - Type of Guy (Joe2Shine remix)", "/Butcherd Beats - Type of Guy (Joe2Shine remix).aac" ],
					[ "Cat caffe - TAD", "/Cat caffe - TAD.aac" ],
					[ "Champion - Kahli ABDU featuring Bella ALUBO & Teddy TEMZ", "/Champion - Kahli ABDU featuring Bella ALUBO & Teddy TEMZ.aac" ],
					[ "Chill Lofi - omfgdude", "/Chill Lofi - omfgdude.aac" ],
					[ "Countryside - TAD", "/Countryside - TAD.aac" ],
					[ "Dark Alleys, Dark Times - Section 31 - Tech", "/Dark Alleys, Dark Times - Section 31 - Tech.aac" ],
					[ "Digital Acid - Xenocity", "/Digital Acid - Xenocity.aac" ],
					[ "Doomed - Alexander Ehlers", "/Doomed - Alexander Ehlers.aac" ],
					[ "Florist - TAD", "/Florist - TAD.aac" ],
					[ "High Alert - Section 31 - Tech", "/High Alert - Section 31 - Tech.aac" ],
					[ "Hit and Run - Section 31 - Tech", "/Hit and Run - Section 31 - Tech.aac" ],
					[ "House of God - Kahli ABDU featuring Teddy TEMZ", "/House of God - Kahli ABDU featuring Teddy TEMZ.aac" ],
					[ "I'm Wavy - Kahli ABDU featuring RETJI", "/I'm Wavy - Kahli ABDU featuring RETJI.aac" ],
					[ "Joe2Shine - For Just One Day ", "/Joe2Shine - For Just One Day .aac" ],
					[ "Joe2Shine - sunlight", "/Joe2Shine - sunlight.aac" ],
					[ "Joe2Shine - Together (Original mix)", "/Joe2Shine - Together (Original mix).aac" ],
					[ "Joe2Shine - Years (original VIP mix)", "/Joe2Shine - Years (original VIP mix).aac" ],
					[ "Next to You - Joth", "/Next to You - Joth.aac" ],
					[ "Night Prowler - Section 31 - Tech", "/Night Prowler - Section 31 - Tech.aac" ],
					[ "Oceanside - TAD", "/Oceanside - TAD.aac" ],
					[ "One Step At A Time - Alex McCulloch", "/One Step At A Time - Alex McCulloch.aac" ],
					[ "Pa00k - Luka Fucek", "/Pa00k - Luka Fucek.aac" ],
					[ "Rainy Forest - TAD", "/Rainy Forest - TAD.aac" ],
					[ "Shining Star - Kahli ABDU featuring SMYLEY & Alan PRATER", "/Shining Star - Kahli ABDU featuring SMYLEY & Alan PRATER.aac" ],
					[ "Strut - chasersgaming", "/Strut - chasersgaming.aac" ],
					[ "Summer Town - 3uhox", "/Summer Town - 3uhox.aac" ],
					[ "Sunny Side Up - Alex McCulloch", "/Sunny Side Up - Alex McCulloch.aac" ],
					[ "The Beach Where Dreams Die - The Chayed", "/The Beach Where Dreams Die - The Chayed.aac" ],
					[ "The Gears of Progress - Section 31 - Tech", "/The Gears of Progress - Section 31 - Tech.aac" ],
					[ "Twists - Alexander Ehlers", "/Twists - Alexander Ehlers.aac" ],
					[ "Warped - Alexander Ehlers", "/Warped - Alexander Ehlers.aac" ]
				]
			}
		],
		output: "String",
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Effect",
		helpUrl: ""
	},
	{
		type: "mix_open",
		message0: "open file %1",
		args0: [
			{
				type: "input_value",
				name: "FILE",
				check: "String"
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Open a file from SD card",
		helpUrl: ""
	},
	{
		type: "mix_start",
		message0: "start playing",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Start playing opened file",
		helpUrl: ""
	},
	{
		type: "mix_stop",
		message0: "stop playing",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Stop playing opened file",
		helpUrl: ""
	},
	{
		type: "mix_effect",
		message0: "effect %1",
		args0: [
			{
				type: "field_dropdown",
				name: "EFFECT",
				options: [
					["none", "NONE"],
					["low pass", "LOWPASS"],
					["high pass", "HIGHPASS"],
					["reverb", "REVERB"],
					["bit crusher", "BITCRUSHER"],
				]
			}
		],
		output: "Mix_Effect",
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Effect",
		helpUrl: ""
	},
	{
		type: "mix_effect_set",
		message0: "set effect slot %1 to %2",
		args0: [
			{
				type: "field_dropdown",
				name: "SLOT",
				options: [
					[ "0", "0" ],
					[ "1", "1" ],
					[ "2", "2" ],
				]
			},
			{
				type: "input_value",
				name: "EFFECT",
				check: "Mix_Effect"
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Set effect",
		helpUrl: ""
	},
	{
		type: "mix_effect_set_intensity",
		message0: "set effect slot %1 intensity to %2",
		args0: [
			{
				type: "field_dropdown",
				name: "SLOT",
				options: [
					[ "0", "0" ],
					[ "1", "1" ],
					[ "2", "2" ],
				]
			},
			{
				type: "input_value",
				name: "INTENSITY",
				check: "Number"
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Set effect intensity",
		helpUrl: ""
	},
	{
		type: "mix_speed",
		message0: "set speed to %1",
		args0: [
			{
				type: "input_value",
				name: "SPEED",
				check: "Number"
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Set speed",
		helpUrl: ""
	},
	{
		type: "mix_volume",
		message0: "set volume to %1",
		args0: [
			{
				type: "input_value",
				name: "VOLUME",
				check: "Number"
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.MIX_HUE,
		tooltip: "Set volume",
		helpUrl: ""
	}
]);