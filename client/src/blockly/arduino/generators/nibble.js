goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.Nibble");

Blockly.Arduino.additionals["Nibble"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("Nibble_include", "#include <Nibble.h>");
  Blockly.Arduino.addDeclaration("Disp_declare", "Display* display;");
  Blockly.Arduino.addDeclaration("Canv_declare", "Sprite* sprite;");
  Blockly.Arduino.addSetup("Nibble_begin", "Nibble.begin();");
  Blockly.Arduino.addSetup("Disp_get", "display = Nibble.getDisplay();");
  Blockly.Arduino.addSetup("Canv_get", "sprite = display->getBaseSprite();");
};