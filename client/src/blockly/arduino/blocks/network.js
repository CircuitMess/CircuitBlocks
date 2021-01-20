goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

goog.provide('Blockly.Blocks.wifi');

Blockly.defineBlocksWithJsonArray([
	{
		type: "wifi_set_info",
		message0: "set SSID %1 password %2",
		args0: [
			{
				type: "input_value",
				name: "SSID",
				check: "String"
			},
			{
				type: "input_value",
				name: "PASS",
				check: "String"
			}
		],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.VARIABLES_DYNAMIC_HUE,
		tooltip: "Set WiFi SSID and password. If this block isn't used, standard Spencer settings will be used.",
		helpUrl: ""
	}
]);


Blockly.Blocks["wifi_state_changed"] = {
	init: function(){
		this.jsonInit({
			message0: "when wifi state changes",
			args0: [],
			message1: "%1",
			args1: [
				{
					type: "input_statement",
					name: "CODE"
				}
			],
			inputsInline: true,
			outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
			colour: Blockly.Msg.VARIABLES_DYNAMIC_HUE,
			tooltip: "Will be triggered when WiFi state changes.",
			helpUrl: ""
		});

		this.arg_ = {
			name: "state",
			type: "number",
			id: "adasddsads"
		};

		this.arguments_ = [this.arg_];
	},

	/*mutationToDom: Blockly.PXTBlockly.FunctionUtils.mutationToDom,
	domToMutation: Blockly.PXTBlockly.FunctionUtils.domToMutation,
	getName: Blockly.PXTBlockly.FunctionUtils.getName,
	getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
	getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
	removeValueInputs_: Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
	disconnectOldBlocks_: Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
	deleteShadows_: Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
	createAllInputs_: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
	updateDisplay_: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
	setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
	ensureIds_: Blockly.PXTBlockly.FunctionUtils.ensureIds_,
	populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDefinition_,
	addFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.addLabelEditor_,
	updateFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.updateLabelEditor_,
	createArgumentReporter_: Blockly.PXTBlockly.FunctionUtils.createArgumentReporter_*/

};

Blockly.Blocks["wifi_is_connected"] = {
	init: function(){
		this.jsonInit({
			message0: "wifi is connected",
			output: "Boolean",
			outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
			colour: Blockly.Msg.VARIABLES_DYNAMIC_HUE,
			tooltip: "Whether WiFi is connected and operational.",
			helpUrl: ""
		});
	},

	getBlockType: function(){
		return Blockly.Types.BOOLEAN;
	}
};

Blockly.defineBlocksWithJsonArray([
	{
		type: "wifi_connect",
		message0: "connect to WiFi network",
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.VARIABLES_DYNAMIC_HUE,
		tooltip: "Connect to the configured WiFi network.",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		type: "wifi_connect_callback",
		message0: "connect to WiFi network",
		message1: "and then %1",
		args1: [{
			type: "input_statement",
			name: "CODE"
		}],
		previousStatement: null,
		nextStatement: null,
		outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
		colour: Blockly.Msg.VARIABLES_DYNAMIC_HUE,
		tooltip: "Connect to the configured WiFi network.",
		helpUrl: ""
	}
]);