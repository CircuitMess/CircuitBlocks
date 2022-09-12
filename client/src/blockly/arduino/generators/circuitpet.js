goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.CircuitPet");

Blockly.Arduino.additionals["CircuitPet"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("CP_include", "#include <CircuitPet.h>");
  Blockly.Arduino.addInclude("LM_include", "#include <Loop/LoopManager.h>");
  Blockly.Arduino.addWrap("LM_loop", "LoopManager::loop();");

  var serialId = "Serial";
  var setupCode = serialId + '.begin(115200);';
  var clearCode = serialId + '.println();';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  Blockly.Arduino.addSetup('serial_clr_' + serialId, clearCode, false);

  Blockly.Arduino.addDeclaration("Disp_declare", "Display* display;");
  Blockly.Arduino.addDeclaration("Canv_declare", "Sprite* sprite;");

  Blockly.Arduino.addSetup("CP_begin", "CircuitPet.begin();");
  Blockly.Arduino.addSetup("Disp_get", "display = CircuitPet.getDisplay();");
  Blockly.Arduino.addSetup("Canv_get", "sprite = display->getBaseSprite();");
};