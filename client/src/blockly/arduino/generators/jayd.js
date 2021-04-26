goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.JayD");

Blockly.Arduino.additionals["Jay-D"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("JayD_include", "#include <JayD.h>");
  Blockly.Arduino.addInclude("LM_include", "#include <Loop/LoopManager.h>");
  Blockly.Arduino.addWrap("LM_loop", "LoopManager::loop();");

  var serialId = "Serial";
  var setupCode = serialId + '.begin(115200);';
  var clearCode = serialId + '.println();';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  Blockly.Arduino.addSetup('serial_clr_' + serialId, clearCode, false);

  Blockly.Arduino.addSetup("JayD_begin", "JayD.begin();");
  Blockly.Arduino.addSetup("JayD_backlight", "pinMode(PIN_BL, OUTPUT); digitalWrite(PIN_BL, HIGH);");
};