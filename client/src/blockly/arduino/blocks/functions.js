
goog.require('Blockly.Blocks');

goog.provide('Blockly.Blocks.functions');

function arduTypeIs(check, type){
    if(type.typeId === check){
        return true;
    }

    if(!type.compatibleTypes_){
        return false;
    }

    for(let i = 0; i < type.compatibleTypes_.length; i++){
        if(type.compatibleTypes_[i].typeId === type.typeId) continue;

        if(type.compatibleTypes_[i].typeId === check) return true;
    }

    return false;
}

function arduTypeToBlockly(type){
    if(arduTypeIs("Text", type)){
        return "String";
    }

    if(arduTypeIs("Number", type)){
        return "Number";
    }

    if(arduTypeIs("Boolean", type)){
        return "Boolean";
    }

    return undefined;
}

const styles = {
    Boolean: { shape: Blockly.OUTPUT_SHAPE_HEXAGONAL, colour: Blockly.Msg.LOGIC_HUE },
    String: { shape: Blockly.OUTPUT_SHAPE_ROUND, colour: Blockly.Msg.TEXTS_HUE },
    Number: { shape: Blockly.OUTPUT_SHAPE_ROUND, colour: Blockly.Msg.MATH_HUE }
};

Blockly.Blocks['function_callreturn'] = {
    /**
     * Block for calling a function with no return value.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "extensions": ["function_contextmenu_edit"]
        });
        /* Data known about the function. */
        this.name_ = ""; // The name of the function.
        this.arguments_ = []; // The arguments of this function.
        this.functionId_ = ""; // An ID, independent from the block ID, to track a function across its call, definition and declaration blocks.

        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setColour(Blockly.Msg.PROCEDURES_HUE);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.setTooltip(Blockly.Msg.FUNCTION_CALL_TOOLTIP);
    },
    // Shared.
    mutationToDom: Blockly.PXTBlockly.FunctionUtils.mutationToDom,
    domToMutation: Blockly.PXTBlockly.FunctionUtils.domToMutation,
    getName: Blockly.PXTBlockly.FunctionUtils.getName,
    getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
    getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
    removeValueInputs_: Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
    disconnectOldBlocks_: Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
    deleteShadows_: Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
    createAllInputs__: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
    createAllInputs_: function(connectionMap){
        var hasTitle = false;
        var hasName = false;
        this.inputList.forEach(function(i) {
            if (i.name == 'function_title') {
                hasTitle = true;
            } else if (i.name == 'function_name') {
                hasName = true;
            }
        });

        // Create the main label if it doesn't exist.
        if (!hasTitle) {
            this.appendDummyInput('function_title').appendField(Blockly.Msg.FUNCTIONS_CALL_TITLE, 'function_title');
        }

        this.createAllInputs__(connectionMap);
    },
    updateDisplay__: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
    updateDisplay_: function(){
        this.updateType();
        this.updateDisplay__();
    },
    setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
    ensureIds_: function(){
        var def = Blockly.Functions.getDefinition(this.name_, this.workspace);
        if (def) {
            this.functionId_ = def.getFunctionId();
            var defArgs = def.getArguments();
            for (var i = 0; i < this.arguments_.length; ++i) {
                for (var j = 0; j < defArgs.length; ++j) {
                    if (defArgs[j].name === this.arguments_[i].name) {
                        this.arguments_[i].id = defArgs[j].id;
                        break;
                    }
                }
            }
        }
    },

    // Exists on all three blocks, but have different implementations.
    populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnCaller_,
    addFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.addLabelField_,
    updateFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.updateLabelField_,

    // Only exists on function_call.
    attachShadow_: Blockly.PXTBlockly.FunctionUtils.attachShadow_,
    buildShadowDom_: Blockly.PXTBlockly.FunctionUtils.buildShadowDom_,
    onchange_: Blockly.PXTBlockly.FunctionUtils.onCallerChange,
    onchange: function(event){
        this.updateType();
        this.onchange_(event );
    },

    // Arduino

    getVarType: Blockly.Blocks['procedures_defnoreturn'].getVarType,

    setArgsType: Blockly.Blocks['procedures_defnoreturn'].setArgsType,
    getArgType: Blockly.Blocks['procedures_defnoreturn'].getArgType,

    getBlockType: function(){
        let funcName = this.getFieldValue('function_name');
        let funcBlock = Blockly.Functions.getDefinition(funcName, this.workspace);

        return funcBlock ? funcBlock.getReturnType() : Blockly.Types.UNDEF;
    },

    updateType: function(){
        let type = arduTypeToBlockly(this.getBlockType());

        this.setOutput(true, type);

        this.setStyling(styles[type]);
    },

    setStyling: function(style){
        if(!this.setOutputShape) return;

        if(!style){
            this.setColour(Blockly.Msg.PROCEDURES_HUE);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
        }else{
            this.setColour(style.colour);
            this.setOutputShape(style.shape);
        }
    }
};