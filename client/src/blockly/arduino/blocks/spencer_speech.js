goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.spencer_speech');

Blockly.Blocks["spencer_speech_listen"] = {
	init: function(){
		this.jsonInit({
			type: "spencer_speech_listen",
			message0: "start listening",
			message1: "when done %1",
			args1: [{
				type: "input_statement",
				name: "CODE_PRE"
			}],
			message2: " ",
			message3: "and start processing",
			previousStatement: null,
			nextStatement: null,
			outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
			colour: Blockly.Msg.IO_HUE,
			tooltip: "Record and process speech",
			helpUrl: ""
		});
	},

	isDuplicatable: function(){
		return false;
	},
};

Blockly.Blocks["spencer_speech_processed"] = {
	init: function () {
		this.jsonInit({
			type: "spencer_speech_processed",
			message0: "when speech gets processed",
			message1: "%1",
			args1: [{
				type: "input_statement",
				name: "CODE"
			}],
			message2: "if error happens %1",
			args2: [{
				type: "input_statement",
				name: "CODE_ERR"
			}],
			message3: " ",
			outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
			colour: Blockly.Msg.IO_HUE,
			tooltip: "When recorded speech gets processed",
			helpUrl: ""
		});

		this.arguments_ = [
			{
				name: "intentResult->transcript",
				type: "String",
				id: "SSR_transcript"
			},
			{
				name: "intentResult->intent",
				type: "String",
				id: "SSR_intent"
			}
		];

		this.functionId_ = "SSR_checkFunc";
		this.name_ = "listenProcess";
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

Blockly.defineBlocksWithJsonArray([
	{
		type: "spencer_speech_synthesize",
		message0: "synthesize and say %1",
		args0: [
			{
				type: "input_value",
				name: "TEXT",
				check: "String"
			}
		],
		message1: "when synthesized %1",
		args1: [{
			type: "input_statement",
			name: "CODE_SYN"
		}],
		message2: "when done talking %1",
		args2: [{
			type: "input_statement",
			name: "CODE_DONE"
		}],
		message3: "if error happens %1",
		args3: [{
			type: "input_statement",
			name: "CODE_ERR"
		}],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.IO_HUE,
		tooltip: "Say custom text",
		helpUrl: ""
	}
]);