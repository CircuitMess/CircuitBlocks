"use strict";

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.inputSynthia');

Blockly.Arduino['input_synthia_encoder'] = function(block){
    if(!Blockly.Device) return;
    
    const ENC = block.getFieldValue("ENC");
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const callbackName = `encoder_${ENC}_moved`;
    if(Blockly.Arduino.codeFunctions_[callbackName] !== undefined){
        Blockly.Arduino.codeFunctions_[callbackName] = undefined;
    }
    const callback = `void ${callbackName}(int8_t amount){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(callbackName, callback);

    const encName = ENC.charAt(0).toUpperCase() + ENC.slice(1);
    const setupCode = `Encoders.set${encName}EncCallback(${callbackName});`;
    Blockly.Arduino.addSetup(`encoder_${ENC}_moved`, setupCode, false);
}

Blockly.Arduino['input_synthia_pot'] = function(block){
    if(!Blockly.Device) return;

    const POT = block.getFieldValue("POT");
    const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

    const callbackName = `slider_${POT}_moved`;
    if(Blockly.Arduino.codeFunctions_[callbackName] !== undefined){
        Blockly.Arduino.codeFunctions_[callbackName] = undefined;
    }
    const callback = `void ${callbackName}(uint8_t value){\n${CODE}\n}`;
    Blockly.Arduino.addFunction(callbackName, callback);

    const potName = POT.charAt(0).toUpperCase() + POT.slice(1);
    const setupCode = `Sliders.set${potName}PotCallback(${callbackName});`;
    Blockly.Arduino.addSetup(`slider_${POT}_moved`, setupCode, false);
}

Blockly.Arduino['input_synthia_pot_current'] = function(block){
    if(!Blockly.Device) return;

    const POT = Blockly.Arduino.valueToCode(block, 'POT', Blockly.Arduino.ORDER_ATOMIC);

    var code = `InputJayD::getInstance()->getPotValue(${POT})`;

    return [ code, Blockly.Arduino.ORDER_ATOMIC ];
}