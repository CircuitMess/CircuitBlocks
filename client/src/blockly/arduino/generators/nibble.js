goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.Nibble");

Blockly.Arduino.additionals["Nibble"] = function(){
  Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
  Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
  Blockly.Arduino.addInclude("i2c_include", "#include <Input/I2cExpander.h>");
  Blockly.Arduino.addInclude("Disp_include", "#include <Display/Display.h>");
  Blockly.Arduino.addDeclaration("i2c_declare", "I2cExpander i2c;");
  Blockly.Arduino.addDeclaration("Disp_declare", "Display display(128, 128, -1, 0);");
  Blockly.Arduino.addDeclaration("Canv_declare", "Sprite* sprite;");
  Blockly.Arduino.addSetup("BL_init1", `i2c.begin(0x74, 4, 5);`);
  Blockly.Arduino.addSetup("BL_init2", `i2c.pinMode(8, OUTPUT);`);
  Blockly.Arduino.addSetup("BL_init3", `i2c.pinWrite(8, 1);`);
  Blockly.Arduino.addSetup("Disp_begin", "display.begin();");
  Blockly.Arduino.addSetup("Disp_canvas", "sprite = display.getBaseSprite();");
};