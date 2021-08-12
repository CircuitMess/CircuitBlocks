goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.Wheelson");

Blockly.Arduino.additionals["Wheelson"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("JayD_include", "#include <Wheelson.h>");
  Blockly.Arduino.addInclude("LM_include", "#include <Loop/LoopManager.h>");
  Blockly.Arduino.addWrap("LM_loop", "LoopManager::loop();");

  var serialId = "Serial";
  var setupCode = serialId + '.begin(115200);';
  var clearCode = serialId + '.println();';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  Blockly.Arduino.addSetup('serial_clr_' + serialId, clearCode, false);

  Blockly.Arduino.addDeclaration("Disp_declare", "Display* display;");
  Blockly.Arduino.addDeclaration("Canv_declare", "Sprite* sprite;");

  Blockly.Arduino.addSetup("Wheelson_begin", "Wheelson.begin();");
  Blockly.Arduino.addSetup("Wheelson_backlight", "LED.setBacklight(true);");
  Blockly.Arduino.addSetup("Disp_get", "display = &Wheelson.getDisplay();");
  Blockly.Arduino.addSetup("Canv_get", "sprite = display->getBaseSprite();");
};