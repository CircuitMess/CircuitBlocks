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