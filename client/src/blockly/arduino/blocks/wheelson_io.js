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
		output: "Boolean",
		outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Get backlight state",
		helpUrl: ""
	},
	{
		type: "wheelson_headlight_get",
		message0: "is headlight on",
		output: "Boolean",
		outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Get headlight state",
		helpUrl: ""
	},
	{
		type: "wheelson_rgb",
		message0: "set RGB LED color %1",
		args0: [
			{
				type: "field_dropdown",
				name: "COLOR",
				options: [
					[ "off", "WLEDColor::OFF" ],
					[ "red", "WLEDColor::RED" ],
					[ "green", "WLEDColor::GREEN" ],
					[ "yellow", "WLEDColor::YELLOW" ],
					[ "blue", "WLEDColor::BLUE" ],
					[ "magenta", "WLEDColor::MAGENTA" ],
					[ "cyan", "WLEDColor::CYAN" ],
					[ "white", "WLEDColor::WHITE" ]
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

Blockly.defineBlocksWithJsonArray([
	{
		type: "wheelson_motor_set",
		message0: "set motor %1 speed %2",
		args0: [
			{
				type: "field_dropdown",
				name: "ID",
				options: [
					[ "left rear", "MOTOR_BL" ],
					[ "left front", "MOTOR_FL" ],
					[ "right rear", "MOTOR_BR" ],
					[ "right front", "MOTOR_FR" ],
				]
			},
			{
				type: "input_value",
				name: "SPEED",
				check: "Number"
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Sets the motor speed",
		helpUrl: ""
	},
	{
		type: "wheelson_motor_get",
		message0: "motor %1 speed",
		args0: [
			{
				type: "field_dropdown",
				name: "ID",
				options: [
					[ "left rear", "MOTOR_BL" ],
					[ "left front", "MOTOR_FL" ],
					[ "right rear", "MOTOR_BR" ],
					[ "right front", "MOTOR_FR" ],
				]
			},
		],
		output: "Number",
		outputShape: Blockly.OUTPUT_SHAPE_ROUND,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Get motor speed",
		helpUrl: ""
	},
]);