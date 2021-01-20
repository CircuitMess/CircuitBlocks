goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.ledmatrix");

Blockly.defineBlocksWithJsonArray([
	{
		type: "ledmatrix_push",
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
		type: "ledmatrix_clear",
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
		type: "ledmatrix_pixel",
		message0: "set pixel brightness %3 x %1 y %2",
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
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Set the brightness of a pixel",
		helpUrl: ""
	},
	{
		type: "ledmatrix_text",
		message0: "print %1 x %2 y %3 brightness %4",
		args0: [
			{
				type: "input_value",
				name: "TEXT",
				check: "String"
			},
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
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Draw a line of text on the LED matrix",
		helpUrl: ""
	},
	{
		type: "ledmatrix_brightness",
		message0: "set brightness %1",
		args0: [
			{
				type: "input_value",
				name: "BRIGHTNESS",
				check: "Number"
			}
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Set brightness for the LED matrix",
		helpUrl: ""
	},
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "ledmatrix_start_animation",
		message0: "play animation %1",
		args0: [
			{
				type: "input_value",
				name: "ANIMATION",
				check: "LEDmatrix_Animation"
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
		type: "ledmatrix_stop_animation",
		message0: "stop animation",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Stop the current LED matrix animation",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "ledmatrix_animation",
		message0: "%1",
		args0: [
			{
				type: "field_dropdown",
				name: "ANIMATION",
				options: [
					["angry", "GIF-angry.gif"],
					["clouds", "GIF-clouds.gif"],
					["error500", "GIF-error500.gif"],
					["error", "GIF-error.gif"],
					["fog", "GIF-fog.gif"],
					["heart", "GIF-heart.gif"],
					["horoscope", "GIF-horoscope.gif"],
					["idle10", "GIF-idle10.gif"],
					["idle1", "GIF-idle1.gif"],
					["idle2", "GIF-idle2.gif"],
					["idle3", "GIF-idle3.gif"],
					["idle4", "GIF-idle4.gif"],
					["idle5", "GIF-idle5.gif"],
					["idle6", "GIF-idle6.gif"],
					["idle7", "GIF-idle7.gif"],
					["idle8", "GIF-idle8.gif"],
					["idle9", "GIF-idle9.gif"],
					["laugh", "GIF-laugh.gif"],
					["listen", "GIF-listen.gif"],
					["loading0", "GIF-loading0.gif"],
					["loading1", "GIF-loading1.gif"],
					["loading2", "GIF-loading2.gif"],
					["loading3", "GIF-loading3.gif"],
					["loading4", "GIF-loading4.gif"],
					["loading5", "GIF-loading5.gif"],
					["loading6", "GIF-loading6.gif"],
					["loading7", "GIF-loading7.gif"],
					["music", "GIF-music.gif"],
					["news", "GIF-news.gif"],
					["night", "GIF-night.gif"],
					["noWifi", "GIF-noWifi.gif"],
					["questionMark", "GIF-questionMark.gif"],
					["rain", "GIF-rain.gif"],
					["random0", "GIF-random0.gif"],
					["random10", "GIF-random10.gif"],
					["random11", "GIF-random11.gif"],
					["random1", "GIF-random1.gif"],
					["random2", "GIF-random2.gif"],
					["random3", "GIF-random3.gif"],
					["random4", "GIF-random4.gif"],
					["random5", "GIF-random5.gif"],
					["random6", "GIF-random6.gif"],
					["random7", "GIF-random7.gif"],
					["random8", "GIF-random8.gif"],
					["random9", "GIF-random9.gif"],
					["red", "GIF-red.gif"],
					["relax", "GIF-relax.gif"],
					["shutdown", "GIF-shutdown.gif"],
					["smile", "GIF-smile.gif"],
					["snow", "GIF-snow.gif"],
					["startup", "GIF-startup.gif"],
					["sunClouds", "GIF-sunClouds.gif"],
					["sun", "GIF-sun.gif"],
					["talk", "GIF-talk.gif"],
					["wifi", "GIF-wifi.gif"],
					["wink", "GIF-wink.gif"],
					["yawn", "GIF-yawn.gif"],

				]
			}
		],
		output: "LEDmatrix_Animation",
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Animation",
		helpUrl: ""
	}
]);