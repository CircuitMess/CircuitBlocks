goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.ByteBoiIO");

Blockly.defineBlocksWithJsonArray([{
	type: "byteboi_rgb",
	message0: "set RGB LED color %1",
	args0: [
		{
			type: "field_dropdown",
			name: "COLOR",
			options: [
				["off", "LEDColor::OFF"],
				["red", "LEDColor::RED"],
				["green", "LEDColor::GREEN"],
				["yellow", "LEDColor::YELLOW"],
				["blue", "LEDColor::BLUE"],
				["magenta", "LEDColor::MAGENTA"],
				["cyan", "LEDColor::CYAN"],
				["white", "LEDColor::WHITE"]
			]
		}
	],
	previousStatement: null,
	nextStatement: null,
	outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
	colour: Blockly.Msg.IO_HUE,
	tooltip: "Set RGB LED color",
	helpUrl: ""
},
	{
		type: "byteboi_splash",
		message0: "show splash screen",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Show splash screen",
		helpUrl: ""
	}
]);