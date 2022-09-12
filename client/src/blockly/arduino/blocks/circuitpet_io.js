goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.CircuitPetIO");

Blockly.defineBlocksWithJsonArray([
	{
		type: "circuitpet_rgb",
		message0: "set RGB LED color %1",
		args0: [
			{
				type: "field_dropdown",
				name: "COLOR",
				options: [
					[ "off", "Pixel::Black" ],
					[ "red", "Pixel::Red" ],
					[ "green", "Pixel::Green" ],
					[ "blue", "Pixel::Blue" ],
					[ "yellow", "Pixel::Yellow" ],
					[ "magenta", "Pixel::Magenta" ],
					[ "cyan", "Pixel::Cyan" ],
					[ "white", "Pixel::White" ]
				]
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Set RGB LED color",
		helpUrl: ""
	}
]);