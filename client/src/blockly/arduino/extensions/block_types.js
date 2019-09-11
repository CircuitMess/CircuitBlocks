goog.require('Blockly.Constants.Math');
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.Constants.Text');
goog.require('Blockly.Constants.Variables');
goog.require('Blockly.Constants.Procedures');

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

goog.provide("Blockly.BlockTypes");

// Math

Blockly.Blocks['math_number'].getBlockType = function(){
  // TODO: Check

  var numString = this.getFieldValue('NUM');
  return Blockly.Types.identifyNumber(numString);
};

Blockly.Blocks['math_single'].getBlockType = function(){
  return Blockly.Types.DECIMAL;
};

Blockly.Blocks['math_trig'].getBlockType = function(){
  return Blockly.Types.DECIMAL;
};

Blockly.Blocks['math_number_property'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['math_round'].getBlockType = function(){
  return Blockly.Types.DECIMAL;
};

Blockly.Blocks['math_modulo'].getBlockType = function(){
  return Blockly.Types.NUMBER;
};

Blockly.Blocks['math_random_int'].getBlockType = function(){
  return Blockly.Types.NUMBER;
};

Blockly.Blocks['math_random_float'].getBlockType = function(){
  return Blockly.Types.DECIMAL;
};

// Logic

Blockly.Blocks['logic_compare'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['logic_operation'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['logic_negate'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['logic_boolean'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['logic_null'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

// Text

Blockly.Blocks['text'].getBlockType = function(){
  return Blockly.Types.TEXT;
};

Blockly.Blocks['text_join'].getBlockType = function(){
  return Blockly.Types.TEXT;
};

Blockly.Blocks['text_length'].getBlockType = function(){
  return Blockly.Types.NUMBER;
};

Blockly.Blocks['text_isEmpty'].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks['text_trim'].getBlockType = function(){
  return Blockly.Types.TEXT;
};

Blockly.Blocks['text_prompt_ext'].getBlockType = function(){
  // TODO: check
  return (this.getFieldValue('TYPE') == Blockly.Types.TEXT.output) ?
    Blockly.Types.TEXT : Blockly.Types.NUMBER;
};

Blockly.Blocks['text_prompt'].getBlockType = function(){
  // TODO: check
  return (this.getFieldValue('TYPE') == Blockly.Types.NUMBER.output) ?
    Blockly.Types.NUMBER : Blockly.Types.TEXT;
};

// Variables

Blockly.Blocks['variables_get'].getBlockType = function(){
  var type = Blockly.Arduino.varsWithTypes[this.getFieldValue("VAR")];

  if(type === undefined || (Array.isArray(type) && type[0] == Blockly.Types.UNDEF)){
    return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
  }else{
    return type;
  }
};

// Procedures

Blockly.Blocks['procedures_callreturn'].getBlockType = function(){
  var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
    this.workspace);

  return defBlock.getReturnType();
};

Blockly.Blocks['procedures_defreturn'].getReturnType = function(){
  var returnType = Blockly.Types.NULL;
  var returnBlock = this.getInputTargetBlock('RETURN');
  if (returnBlock) {
    // First check if the block itself has a type already
    if (returnBlock.getBlockType) {
      returnType = returnBlock.getBlockType();
    } else {
      returnType = Blockly.Types.getChildBlockType(returnBlock);
    }
  }
  return returnType;
};

Blockly.Blocks['procedures_defnoreturn'].setArgsType = function(existingVars) {
  var varNames = this.arguments_;

  // Check if variable has been defined already and save type
  for (var name in existingVars) {
    for (var i = 0, length_ = varNames.length; i < length_; i++) {
      if (name === varNames[i]) {
        this.argsTypes[name] = existingVars[name];
      }
    }
  }
};

Blockly.Blocks['procedures_defnoreturn'].getArgType = function(varName) {
  for (var name in this.argsTypes) {
    if (name == varName) {
      return this.argsTypes[varName];
    }
  }
  return null;
};

Blockly.Blocks['procedures_defreturn'].setArgsType = Blockly.Blocks['procedures_defnoreturn'].setArgsType;
Blockly.Blocks['procedures_defreturn'].getArgType = Blockly.Blocks['procedures_defnoreturn'].getArgType;

// Function arguments

Blockly.Blocks['function_definition'].getArgType = function(varName) {
  for (var name in this.argsTypes) {
    if (name == varName) {
      return this.argsTypes[varName];
    }
  }
  return null;
};


Blockly.Blocks["argument_reporter_number"].getBlockType = function(){
  return Blockly.Types.NUMBER;
};

Blockly.Blocks["argument_reporter_boolean"].getBlockType = function(){
  return Blockly.Types.BOOLEAN;
};

Blockly.Blocks["argument_reporter_string"].getBlockType = function(){
  return Blockly.Types.TEXT;
};