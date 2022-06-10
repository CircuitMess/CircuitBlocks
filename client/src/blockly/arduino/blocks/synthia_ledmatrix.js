goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.ledmatrixSynthia");

const MatrixMono = {
	type: "field_dropdown",
	name: "MATRIX",
	options: [
		["track monochrome", "TrackMatrix"],
		["slider monochrome", "SlidersMatrix"],
		["cursor monochrome", "CursorMatrix"]
	]
};

const MatrixRGB = {
	type: "field_dropdown",
	name: "MATRIX",
	options: [
		["track RGB", "TrackRGB"],
		["slot RGB", "SlotRGB"],
	]
};

const MatrixAll = {
	type: "field_dropdown",
	name: "MATRIX",
	options: [
		["track monochrome", "TrackMatrix"],
		["slider monochrome", "SlidersMatrix"],
		["cursor monochrome", "CursorMatrix"],
		["track RGB", "TrackRGB"],
		["slot RGB", "SlotRGB"],
	]
};

Blockly.defineBlocksWithJsonArray([
	{
		type: "synthia_ledmatrix_push",
		message0: "push changes to %1 matrix",
		args0: [ MatrixAll ],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Commits the latest changes to the LED matrix.",
		helpUrl: ""
	},
	{
		type: "synthia_ledmatrix_clear",
		message0: "clear the %1 matrix",
		args0: [ MatrixAll ],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Turns of all the LEDs on the matrix.",
		helpUrl: ""
	},
	{
		type: "synthia_ledmatrix_pixel_mono",
		message0: "set %4 matrix pixel brightness to %3 x %1 y %2",
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
			MatrixMono
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Set the brightness of a matrix pixel.",
		helpUrl: ""
	},
	{
		type: "synthia_ledmatrix_pixel_rgb",
		message0: "set %3 matrix pixel %1 color %2",
		args0: [
			{
				type: "input_value",
				name: "INDEX",
				check: "Number"
			},
			{
				type: "field_dropdown",
				name: "COLOR",
				options: [
					["off", "MatrixPixel::Off"],
					["white", "MatrixPixel::White"],
					["red", "MatrixPixel::Red"],
					["green", "MatrixPixel::Green"],
					["blue", "MatrixPixel::Blue"],
					["yellow", "MatrixPixel::Yellow"],
					["magenta", "MatrixPixel::Magenta"],
					["cyan", "MatrixPixel::Cyan"]
				]
			},
			MatrixRGB
		],
		inputsInline: false,
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Set the color of a RGB matrix pixel.",
		helpUrl: ""
	}
]);


Blockly.defineBlocksWithJsonArray([
	{
		type: "synthia_ledmatrix_start_animation",
		message0: "play matrix animation %1",
		args0: [
			{
				type: "field_dropdown",
				name: "ANIMATION",
				options: [
					["pitch", "/GIF/Pitch.gif"],
					["volume", "/GIF/Volume.gif"],
					["sample: kick", "/GIF/Samples/Kick.gif"],
					["sample: snare", "/GIF/Samples/Snare.gif"],
					["sample: clap", "/GIF/Samples/Clap.gif"],
					["sample: open hi-hat", "/GIF/Samples/HatOpen.gif"],
					["sample: closed hi-hat", "/GIF/Samples/HatClos.gif"],
					["sample: recording 1", "/GIF/Samples/RecIn.gif"],
					["sample: recording 2", "/GIF/Samples/RecOut.gif"],
					["sample: recording 3", "/GIF/Samples/RecWait.gif"],
					["effect: bit crusher", "/GIF/Effects/BitCrush.gif"],
					["effect: reverb", "/GIF/Effects/Reverb.gif"],
					["effect: low pass", "/GIF/Effects/LowPass.gif"],
					["effect: high pass", "/GIF/Effects/HighPass.gif"],
					["intro", "/GIF/Intro/Track.gif"],
					["sample edit", "/GIF/SampleEdit.gif"],
					["track edit", "/GIF/TrackEdit.gif"]
				]
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Start a LED matrix animation.",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "synthia_ledmatrix_stop_animation",
		message0: "stop matrix animation",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Stop the current LED matrix animation.",
		helpUrl: ""
	}
]);
