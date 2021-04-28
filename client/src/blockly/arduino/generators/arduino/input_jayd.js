"use strict";

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.inputJayD');

Blockly.Arduino['jayd_buttons'] = function(block) {
    var BUTTON = block.getFieldValue('BUTTON');
    return [ BUTTON, Blockly.Arduino.ORDER_ATOMIC ];
};

const Button_CallbackReg = {
    press: "setBtnPressCallback",
    release: "setBtnReleaseCallback"
};

Blockly.Arduino['input_jayd_button'] = function(block) {
    if(!Blockly.Device) return;

    Blockly.Arduino.addInclude("JayD_Input", "#include <Input/InputJayD.h>");

    const BUTTON = Blockly.Arduino.valueToCode(block, 'BUTTON', Blockly.Arduino.ORDER_ATOMIC);
    const STATE = block.getField('STATE').getValue();
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `${BUTTON}_${STATE}`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `InputJayD::getInstance()->${Button_CallbackReg[STATE]}(${BUTTON}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_${STATE}`, setupCode, false);
};

Blockly.Arduino['input_jayd_button_held'] = function(block) {
    if(!Blockly.Device) return;

    Blockly.Arduino.addInclude("JayD_Input", "#include <Input/InputJayD.h>");

    const BUTTON = Blockly.Arduino.valueToCode(block, 'BUTTON', Blockly.Arduino.ORDER_ATOMIC);
    const DURATION = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `${BUTTON}_held_${DURATION}ms`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `InputJayD::getInstance()->setBtnHeldCallback(${BUTTON}, ${DURATION}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_held_${DURATION}`, setupCode, false);
};