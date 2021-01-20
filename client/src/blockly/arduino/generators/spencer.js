goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.Spencer");

Blockly.Arduino.additionals["Spencer"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("Spencer_include", "#include <Spencer.h>");
  Blockly.Arduino.addWrap("LM_loop", "LoopManager::loop();");

  var serialId = "Serial";
  var setupCode = serialId + '.begin(115200);';
  var clearCode = serialId + '.println();';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  Blockly.Arduino.addSetup('serial_clr_' + serialId, clearCode, false);

  Blockly.Arduino.addSetup("Spencer_begin", "Spencer.begin();");
  Blockly.Arduino.addSetup("Spencer_settings", "Spencer.loadSettings();");
};