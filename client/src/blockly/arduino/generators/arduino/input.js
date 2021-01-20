"use strict";

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.input');

const Button_CallbackReg = {
    press: "setBtnPressCallback",
    release: "setBtnReleaseCallback"
};

Blockly.Arduino['input_button'] = function(block) {
    if(!Blockly.Device) return;

    Blockly.Arduino.addWrap("Input_loop", "Input::getInstance()->loop(0);");

    const BUTTON = Blockly.Arduino.valueToCode(block, 'BUTTON', Blockly.Arduino.ORDER_ATOMIC);
    const STATE = block.getField('STATE').getValue();
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `${BUTTON}_${STATE}`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `Input::getInstance()->${Button_CallbackReg[STATE]}(${BUTTON}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_${STATE}`, setupCode, false);
};

Blockly.Arduino['input_button_held'] = function(block) {
    if(!Blockly.Device) return;

    Blockly.Arduino.addWrap("Input_loop", "Input::getInstance()->loop(0);");

    const BUTTON = Blockly.Arduino.valueToCode(block, 'BUTTON', Blockly.Arduino.ORDER_ATOMIC);
    const DURATION = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `${BUTTON}_held_${DURATION}ms`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `Input::getInstance()->setButtonHeldCallback(${BUTTON}, ${DURATION}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_held_${DURATION}`, setupCode, false);
};

Blockly.Arduino['input_button_any'] = function(block) {
    if(!Blockly.Device) return;

    Blockly.Arduino.addWrap("Input_loop", "Input::getInstance()->loop(0);");

    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `BTN_any`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `Input::getInstance()->setAnyKeyCallback(${funcName});`;
    Blockly.Arduino.addSetup(`input_button_any`, setupCode, false);
};

Blockly.Arduino['input_button_spencer'] = function(block) {
    if(!Blockly.Device) return;

    const BUTTON = "BTN_PIN";
    const STATE = block.getField('STATE').getValue();
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `BTN_${STATE}`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `Input::getInstance()->${Button_CallbackReg[STATE]}(${BUTTON}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_${STATE}`, setupCode, false);
};

Blockly.Arduino['input_button_held_spencer'] = function(block) {
    if(!Blockly.Device) return;

    const BUTTON = "BTN_PIN";
    const DURATION = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const funcName = `BTN_held_${DURATION}ms`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `Input::getInstance()->setButtonHeldCallback(${BUTTON}, ${DURATION}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_held_${DURATION}`, setupCode, false);
};