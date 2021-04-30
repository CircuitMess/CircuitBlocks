"use strict";

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.inputJayD');

Blockly.Arduino['jayd_buttons'] = function(block) {
    var BUTTON = block.getFieldValue('BUTTON');
    return [ BUTTON, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['jayd_encoders'] = function(block) {
    var ENC = block.getFieldValue('ENCODER');
    return [ ENC, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['jayd_pots'] = function(block) {
    var POT = block.getFieldValue('POT');
    return [ POT, Blockly.Arduino.ORDER_ATOMIC ];
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

    const funcName = `button_${BUTTON}_${STATE}`;
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

    const funcName = `button_${BUTTON}_held_${DURATION}ms`;
    const generated = `void ${funcName}(){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(funcName, generated);

    const setupCode = `InputJayD::getInstance()->setBtnHeldCallback(${BUTTON}, ${DURATION}, ${funcName});`;
    Blockly.Arduino.addSetup(`input_${BUTTON}_held_${DURATION}`, setupCode, false);
};

Blockly.Arduino['input_jayd_encoder'] = function(block){
    if(!Blockly.Device) return;

    Blockly.Arduino.addInclude("JayD_Input", "#include <Input/InputJayD.h>");
    
    const ENC = Blockly.Arduino.valueToCode(block, 'ENC', Blockly.Arduino.ORDER_ATOMIC);
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const callbackName = `encoder_${ENC}_moved`;
    if(Blockly.Arduino.codeFunctions_[callbackName] !== undefined){
        Blockly.Arduino.codeFunctions_[callbackName] = undefined;
    }
    const callback = `void ${callbackName}(int8_t amount){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(callbackName, callback);

    const setupCode = `InputJayD::getInstance()->setEncoderMovedCallback(${ENC}, ${callbackName});`;
    Blockly.Arduino.addSetup(`encoder_${ENC}_moved`, setupCode, false);
}

Blockly.Arduino['input_jayd_pot'] = function(block){
    if(!Blockly.Device) return;

    Blockly.Arduino.addInclude("JayD_Input", "#include <Input/InputJayD.h>");

    const POT = Blockly.Arduino.valueToCode(block, 'POT', Blockly.Arduino.ORDER_ATOMIC);
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const callbackName = `potentiometer_${POT}_moved`;
    if(Blockly.Arduino.codeFunctions_[callbackName] !== undefined){
        Blockly.Arduino.codeFunctions_[callbackName] = undefined;
    }
    const callback = `void ${callbackName}(uint8_t value){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(callbackName, callback);

    const setupCode = `InputJayD::getInstance()->setPotMovedCallback(${POT}, ${callbackName});`;
    Blockly.Arduino.addSetup(`potentiometer_${POT}_moved`, setupCode, false);
}

Blockly.Arduino['input_jayd_pot_current'] = function(block){
    if(!Blockly.Device) return;

    Blockly.Arduino.addInclude("JayD_Input", "#include <Input/InputJayD.h>");

    const POT = Blockly.Arduino.valueToCode(block, 'POT', Blockly.Arduino.ORDER_ATOMIC);

    var code = `InputJayD::getInstance()->getPotValue(${POT})`;

    return [ code, Blockly.Arduino.ORDER_ATOMIC ];
}