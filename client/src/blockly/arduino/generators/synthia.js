goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.Synthia");

Blockly.Arduino.additionals["Synthia"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("Synth_include", "#include <Synthia.h>");
  Blockly.Arduino.addInclude("LM_include", "#include <Loop/LoopManager.h>");
  Blockly.Arduino.addWrap("LM_loop", "LoopManager::loop();");

  var serialId = "Serial";
  var setupCode = serialId + '.begin(115200);';
  var clearCode = serialId + '.println();';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  Blockly.Arduino.addSetup('serial_clr_' + serialId, clearCode, false);

  Blockly.Arduino.addSetup("Synthia_begin", "Synthia.begin();");
};