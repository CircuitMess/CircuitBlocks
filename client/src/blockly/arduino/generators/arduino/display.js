
goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.display");

let goog = Blockly.goog;

Blockly.Arduino['display_colour'] = function(block) {
    var COLOUR = block.getFieldValue('COLOUR');

    return [ COLOUR, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['display_popup'] = function(block) {
    var message = Blockly.Arduino.valueToCode(block, 'MESSAGE', Blockly.Arduino.ORDER_ATOMIC);
    var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);

    var code = 'mp.popup(' + message + ', ' + duration + ');\n';
    return code;
};

Blockly.Arduino['display_clear'] = function(block) {
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = "mp.tft.fillScreen(" + colour + ");\n";
    return code;
};

Blockly.Arduino['display_invert'] = function(block) {
    var invert = Blockly.Arduino.valueToCode(block, 'INVERT', Blockly.Arduino.ORDER_ATOMIC);

    var code = "mp.tft.invertDisplay(" + invert + ");\n";
    return code;
};

Blockly.Arduino['display_fontsize'] = function(block) {
    var size = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_ATOMIC);

    var code = "mp.tft.setTextFont(" + size + ");\n";
    return code;
};

Blockly.Arduino['display_fontcolour'] = function(block) {
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = "mp.tft.setTextColor(" + colour + ");\n";
    return code;
};

Blockly.Arduino['display_println'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);

    var code = "mp.tft.println(" + text + ");\n";
    return code;
};

Blockly.Arduino['draw_text'] = function(block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);

    var code = `mp.tft.drawString(${text}, ${x}, ${y});\n`;
    return code;
};

Blockly.Arduino['draw_rect'] = function(block) {
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    var w = Blockly.Arduino.valueToCode(block, 'W', Blockly.Arduino.ORDER_ATOMIC);
    var h = Blockly.Arduino.valueToCode(block, 'H', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = `mp.tft.drawRect(${x}, ${y}, ${w}, ${h}, ${colour});\n`;
    return code;
};

Blockly.Arduino['draw_circle'] = function(block) {
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = `mp.tft.drawCircle(${x}, ${y}, ${r}, ${colour});\n`;
    return code;
};

Blockly.Arduino['draw_ellipse'] = function(block) {
    var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    var rx = Blockly.Arduino.valueToCode(block, 'RX', Blockly.Arduino.ORDER_ATOMIC);
    var ry = Blockly.Arduino.valueToCode(block, 'RY', Blockly.Arduino.ORDER_ATOMIC);
    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = `mp.tft.drawCircle(${x}, ${y}, ${rx}, ${ry}, ${colour});\n`;
    return code;
};

Blockly.Arduino['draw_triangle'] = function(block) {
    var x0 = Blockly.Arduino.valueToCode(block, 'X0', Blockly.Arduino.ORDER_ATOMIC);
    var y0 = Blockly.Arduino.valueToCode(block, 'Y0', Blockly.Arduino.ORDER_ATOMIC);
    var x1 = Blockly.Arduino.valueToCode(block, 'X1', Blockly.Arduino.ORDER_ATOMIC);
    var y1 = Blockly.Arduino.valueToCode(block, 'Y1', Blockly.Arduino.ORDER_ATOMIC);
    var x2 = Blockly.Arduino.valueToCode(block, 'X2', Blockly.Arduino.ORDER_ATOMIC);
    var y2 = Blockly.Arduino.valueToCode(block, 'Y2', Blockly.Arduino.ORDER_ATOMIC);

    var colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);

    var code = `mp.tft.drawTriangle(${x0}, ${y0}, ${x1}, ${y1}, ${x2}, ${y2}, ${colour});\n`;
    return code;
};