goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.ledmatrixJayD");

Blockly.defineBlocksWithJsonArray([
	{
		type: "jayd_ledmatrix_push",
		message0: "push changes to LED matrix",
		args0: [],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Commits the latest changes to the LED matrix",
		helpUrl: ""
	},
	{
		type: "jayd_ledmatrix_clear",
		message0: "clear the LED matrix",
		args0: [],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Turns of all the LEDs on the matrix.",
		helpUrl: ""
	},
	{
		type: "jayd_ledmatrix_pixel",
		message0: "set matrix %4 pixel brightness %3 x %1 y %2",
		args0: [
			{
				type: "input_value",
				name: "X",
				check: "Number"
			},
			{
				type: "input_value",
				name: "Y",
				check: "Number"
			},
			{
				type: "input_value",
				name: "BRIGHTNESS",
				check: "Number"
			},
			{
				type: "field_dropdown",
				name: "MATRIX",
				options: [
					["left", "matrixL"],
					["right", "matrixR"],
					["middle", "matrixMid"],
					["big", "matrixBig"],
				]
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Set the brightness of a pixel",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "jayd_ledmatrix_start_animation",
		message0: "play matrix %2 animation %1",
		args0: [
			{
				type: "field_dropdown",
				name: "ANIMATION",
				options: [
					["1", "1"],
					["2", "2"],
					["3", "3"],
				]
			},
			{
				type: "field_dropdown",
				name: "MATRIX",
				options: [
					["left", "matrixL"],
					["right", "matrixR"],
					["middle", "matrixMid"],
					["big", "matrixBig"],
				]
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Start a LED matrix animation",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "jayd_ledmatrix_stop_animation",
		message0: "stop matrix %1 animation",
		args0: [
			{
				type: "field_dropdown",
				name: "MATRIX",
				options: [
					["left", "matrixL"],
					["right", "matrixR"],
					["middle", "matrixMid"],
					["big", "matrixBig"],
				]
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Stop the current LED matrix animation",
		helpUrl: ""
	}
]);