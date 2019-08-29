goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.functions");

Blockly.Arduino["function_definition"] = function(block){
    var funcName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('function_name'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Arduino.statementToCode(block, 'STACK');
    if (Blockly.Arduino.STATEMENT_PREFIX) {
        branch = Blockly.Arduino.prefixLines(
            Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g,
                '\'' + block.id + '\''), Blockly.Arduino.INDENT) + branch;
    }
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
        Blockly.Arduino.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }

    // Get arguments with type
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] =
            Blockly.Arduino.getArduinoType_(block.getArgType(block.arguments_[x])) +
            ' ' +
            Blockly.Arduino.variableDB_.getName(block.arguments_[x],
                Blockly.Variables.NAME_TYPE);
    }

    // Get return type
    var returnType = Blockly.Types.NULL;
    if (block.getReturnType) {
        returnType = block.getReturnType();
    }
    returnType = Blockly.Arduino.getArduinoType_(returnType);

    // Construct code
    var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.Arduino.scrub_(block, code);
    Blockly.Arduino.userFunctions_[funcName] = code;
    return null;
};

Blockly.Arduino["function_call"] = function(block){
    var funcName = Blockly.Arduino.variableDB_.getName(
        block.getFieldValue('function_name'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
            Blockly.Arduino.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
};

Blockly.Arduino["argument_reporter_number"] = function(block){

};

Blockly.Arduino["argument_reporter_boolean"] = function(block){

};

Blockly.Arduino["argument_reporter_string"] = function(block){

};