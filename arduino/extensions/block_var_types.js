
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");


// Variables

Blockly.Blocks["variables_get"].getVarType = function(varName) {
  return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
};

Blockly.Blocks["variables_set"].getVarType = function(varName) {
  return Blockly.Types.getChildBlockType(this);
};

// Loops

Blockly.Blocks['controls_for'].getVarType = function(varName){
  return Blockly.Types.NUMBER;
};

Blockly.Blocks['controls_forEach'].getVarType = function(varName){
  return Blockly.Types.NUMBER;
};

// Procedures

Blockly.Blocks['procedures_defnoreturn'].getVarType = function(varName){
  return Blockly.Types.UNDEF;
};

Blockly.Blocks['procedures_defreturn'].getVarType = Blockly.Blocks['procedures_defnoreturn'].getVarType;

// Math

Blockly.Blocks['math_change'].getVarType = function(varName){
  return Blockly.Types.NUMBER;
};

// Text

Blockly.Blocks['text_append'].getVarType = function(varName){
  return Blockly.Types.TEXT;
};
