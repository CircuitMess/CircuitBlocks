goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.WheelsonIO");

Blockly.defineBlocksWithJsonArray([
	{
		type: "wheelson_buttons",
		message0: "button %1",
		args0: [
			{
				type: "field_dropdown",
				name: "BUTTON",
				options: [
					[ "left", "BTN_LEFT" ],
					[ "right", "BTN_RIGHT" ],
					[ "up", "BTN_UP" ],
					[ "down", "BTN_DOWN" ],
					[ "middle", "BTN_MID" ],
					[ "back", "BTN_BACK" ],
				]
			}
		],
		output: "Number",
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Button",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "wheelson_backlight",
		message0: "set backlight %1",
		args0: [
			{
				type: "input_value",
				name: "VAL",
				check: "Boolean"
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Sets the screen backlight",
		helpUrl: ""
	},
	{
		type: "wheelson_headlight",
		message0: "set headlight %1",
		args0: [
			{
				type: "input_value",
				name: "VAL",
				check: "Boolean"
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Sets headlight",
		helpUrl: ""
	},
	{
		type: "wheelson_backlight_get",
		message0: "is backlight on",
		//args0: [],
		output: "Boolean",
		outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Get backlight state",
		helpUrl: ""
	},
	{
		type: "wheelson_headlight_get",
		message0: "is headlight on",
		//args0: [],
		output: "Boolean",
		outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Get headlight state",
		helpUrl: ""
	}
]);