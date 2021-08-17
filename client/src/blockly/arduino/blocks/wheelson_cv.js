goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.WheelsonCV");

Blockly.defineBlocksWithJsonArray([
	{
		type: "wheelson_cam_fetch",
		message0: "fetch camera frame",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.WHEELSON_HUE,
		tooltip: "Grab camera frame",
		helpUrl: ""
	},
	{
		type: "wheelson_draw_frame",
		message0: "draw camera frame",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.DISPLAY_HUE,
		tooltip: "Draws the last frame to display",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "wheelson_markers",
		message0: "marker %1",
		args0: [
			{
				type: "field_dropdown",
				name: "MARKER",
				options: [
					[ "760 - forward", "750" ],
					[ "686 - backward", "686" ],
					[ "636 - LED on", "636" ],
					[ "576 - LED off", "576" ],
					[ "785 - burnout", "785" ],
					[ "5 - 360°", "5" ],

					[ "305 - 🥕", "305" ],
					[ "341 - 👽", "341" ],
					[ "152 - 🐉", "152" ],
					[ "204 - 🎯", "205" ],
					[ "409 - 🖤", "409" ],
					[ "100 - 🎧", "100" ],
				]
			}
		],
		output: "Number",
		outputShape: Blockly.OUTPUT_SHAPE_ROUND,
		colour: Blockly.Msg.WHEELSON_HUE,
		tooltip: "Button",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "wheelson_markers_detect",
		message0: "detect markers",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.WHEELSON_HUE,
		tooltip: "Detect markers on last camera frame",
		helpUrl: ""
	}
]);

Blockly.Blocks["wheelson_marker_detected"] = {
	init: function () {
		this.jsonInit({
			type: "wheelson_marker_detected",
			message0: "when marker %1 is detected",
			args0: [{
				type: "input_value",
				name: "ID",
				check: "Number"
			}],
			message1: "%1",
			args1: [{
				type: "input_statement",
				name: "CODE"
			}],
			message2: " ",
			outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
			colour: Blockly.Msg.WHEELSON_HUE,
			tooltip: "When a marker is detected",
			helpUrl: ""
		});

		this.arguments_ = [
			{
				name: "marker.projected[0].x",
				type: "Number",
				id: "Marker_X"
			},
			{
				name: "marker.projected[0].y",
				type: "Number",
				id: "Marker_Y"
			}
		];

		this.functionId_ = "Marker_detectedFunc";
		this.name_ = "markerDetected";
	},

	mutationToDom: function () {
		var a = document.createElement("mutation");
		this.arguments_.forEach(function (b) {
			var c = document.createElement("arg");
			c.setAttribute("name", b.name);
			c.setAttribute("id", b.id);
			c.setAttribute("type", b.type);
			a.appendChild(c)
		});
		return a
	},

	domToMutation: function (a) {
		for (var b = [], c = 0; c < a.childNodes.length; ++c) {
			var d = a.childNodes[c];
			"arg" == d.nodeName.toLowerCase() && b.push({
				id: d.getAttribute("id"),
				name: d.getAttribute("name"),
				type: d.getAttribute("type")
			})
		}
		this.arguments_ = b;
		this.updateDisplay_()
	},

	getName: Blockly.PXTBlockly.FunctionUtils.getName,
	getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
	getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
	removeValueInputs_: function(){}, // Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
	disconnectOldBlocks_: function(){}, // Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
	deleteShadows_: function(a){}, // Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
	createAllInputs_: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
	updateDisplay_: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
	setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
	populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDefinition_,
	addFunctionLabel_: function(a){},
	updateFunctionLabel_: function(a){},
	createArgumentReporter_: Blockly.PXTBlockly.FunctionUtils.createArgumentReporter_,

	ensureIds_: function () {}
};