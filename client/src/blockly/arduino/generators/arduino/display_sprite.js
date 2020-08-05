
goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.display_sprite");

let goog = Blockly.goog;

Blockly.Arduino['display_commit'] = function(block) {
    var code = "display.commit();\n";
    return code;
};

Blockly.Arduino['sprite_clear'] = function(block) {
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = "sprite->clear(" + colour + ");\n";
    return code;
};

Blockly.Arduino['sprite_fontsize'] = function(block) {
    var size = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_ATOMIC);

    var code = "sprite->setTextSize(" + size + ");\n";
    return code;
};

Blockly.Arduino['sprite_fonttype'] = function(block) {
    var type = block.getFieldValue('TYPE');

    var code = "sprite->setTextFont(" + type + ");\n";
    return code;
};

Blockly.Arduino['sprite_fontcolour'] = function(block) {
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = "sprite->setTextColor(" + colour + ");\n";
    return code;
};

Blockly.Arduino['sprite_println'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);

    var code = "sprite->println(" + text + ");\n";
    return code;
};

Blockly.Arduino['sprite_draw_text'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);

    var code = `sprite->drawString(${text}, ${x}, ${y});\n`;
    return code;
};

Blockly.Arduino['sprite_draw_rect'] = function(block) {
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    var w = Blockly.Arduino.valueToCode(block, 'W', Blockly.Arduino.ORDER_ATOMIC);
    var h = Blockly.Arduino.valueToCode(block, 'H', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var func = block.getFieldValue("FUNC");

    var code = `sprite->${func}Rect(${x}, ${y}, ${w}, ${h}, ${colour});\n`;
    return code;
};

Blockly.Arduino['sprite_draw_circle'] = function(block) {
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var func = block.getFieldValue("FUNC");

    var code = `sprite->${func}Circle(${x}, ${y}, ${r}, ${colour});\n`;
    return code;
};

Blockly.Arduino['sprite_draw_ellipse'] = function(block) {
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    var rx = Blockly.Arduino.valueToCode(block, 'RX', Blockly.Arduino.ORDER_ATOMIC);
    var ry = Blockly.Arduino.valueToCode(block, 'RY', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var func = block.getFieldValue("FUNC");

    var code = `sprite->${func}Ellipse(${x}, ${y}, ${rx}, ${ry}, ${colour});\n`;
    return code;
};

Blockly.Arduino['sprite_draw_triangle'] = function(block) {
    var x0 = Blockly.Arduino.valueToCode(block, 'X0', Blockly.Arduino.ORDER_ATOMIC);
    var y0 = Blockly.Arduino.valueToCode(block, 'Y0', Blockly.Arduino.ORDER_ATOMIC);
    var x1 = Blockly.Arduino.valueToCode(block, 'X1', Blockly.Arduino.ORDER_ATOMIC);
    var y1 = Blockly.Arduino.valueToCode(block, 'Y1', Blockly.Arduino.ORDER_ATOMIC);
    var x2 = Blockly.Arduino.valueToCode(block, 'X2', Blockly.Arduino.ORDER_ATOMIC);
    var y2 = Blockly.Arduino.valueToCode(block, 'Y2', Blockly.Arduino.ORDER_ATOMIC);

    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);
    var func = block.getFieldValue("FUNC");

    var code = `sprite->${func}Triangle(${x0}, ${y0}, ${x1}, ${y1}, ${x2}, ${y2}, ${colour});\n`;
    return code;
};