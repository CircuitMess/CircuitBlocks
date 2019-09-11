goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.MAKERphone");

Blockly.Arduino.additionals["MAKERphone"] = function(){
  Blockly.Arduino.addInclude("MP_include", "#include <MAKERphone.h>");
  Blockly.Arduino.addDeclaration("MP_declare", "MAKERphone mp;");
  Blockly.Arduino.addSetup("MP_begin", "mp.begin(1);");
  Blockly.Arduino.addSetup("display_clear", "mp.display.fillScreen(TFT_BLACK);");
  Blockly.Arduino.addWrap("MP_update", "mp.update();");
};