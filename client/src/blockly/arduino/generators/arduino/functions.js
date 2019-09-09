goog.require("Blockly.Arduino");
goog.require("Blockly.Type");
goog.require("Blockly.Types");

goog.provide("Blockly.Arduino.functions");

const arduinoTypes = {
    string: Blockly.Types.TEXT,
    boolean: Blockly.Types.BOOLEAN,
    number: Blockly.Types.NUMBER
};

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
        let typeText = block.arguments_[x].type;
        let type = arduinoTypes.hasOwnProperty(typeText) ? arduinoTypes[typeText] : Blockly.Types.UNDEF;


        args[x] =
            Blockly.Arduino.getArduinoType_(type) +
            ' ' +
            Blockly.Arduino.variableDB_.getName(block.arguments_[x].name,
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

Blockly.Arduino["function_callreturn"] = function(block){
    var funcName = Blockly.Arduino.variableDB_.getName(
        block.getFieldValue('function_name'), Blockly.Functions.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.Arduino.valueToCode(block, block.arguments_[i].id,
            Blockly.Arduino.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino["argument_reporter_number"] = Blockly.Arduino["argument_reporter_boolean"]
    = Blockly.Arduino["argument_reporter_string"] = Blockly.Arduino["argument_reporter_custom"] = function(block){

    return [ block.getFieldValue("VALUE"), Blockly.Arduino.ORDER_UNARY_POSTFIX ];
};
