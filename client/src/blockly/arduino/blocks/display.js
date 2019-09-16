
goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.display");

Blockly.defineBlocksWithJsonArray([
    {
        type: "display_colour",
        message0: "display colour %1",
        args0: [
            {
                type: "field_dropdown",
                name: "COLOUR",
                options: [
                    [ "Black", "TFT_BLACK" ],
                    [ "Navy", "TFT_NAVY" ],
                    [ "Dark green", "TFT_DARKGREEN" ],
                    [ "Dark cyan", "TFT_DARKCYAN" ],
                    [ "Maroon", "TFT_MAROON" ],
                    [ "Olive", "TFT_OLIVE" ],
                    [ "Light grey", "TFT_LIGHTGREY" ],
                    [ "Dark grey", "TFT_DARKGREY" ],
                    [ "Purple", "TFT_PURPLE" ],
                    [ "Blue", "TFT_BLUE" ],
                    [ "Green", "TFT_GREEN" ],
                    [ "Cyan", "TFT_CYAN" ],
                    [ "Red", "TFT_RED" ],
                    [ "Magenta", "TFT_MAGENTA" ],
                    [ "Yellow", "TFT_YELLOW" ],
                    [ "White", "TFT_WHITE" ],
                    [ "Orange", "TFT_ORANGE" ],
                    [ "Green Yellow", "TFT_GREENYELLOW" ],
                    [ "Pink", "TFT_PINK" ],
                ]
            }
        ],
        output: "TFT_Colour",
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Colour",
        helpUrl: ""
    },
    {
        type: "display_popup",
        message0: "display message %1 for %2 second(s)",
        args0: [
            {
                type: "input_value",
                name: "MESSAGE",
                check: "String"
            },
            {
                type: "input_value",
                name: "DURATION",
                check: "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Displays a pop-up message",
        helpUrl: ""
    },
    {
        type: "display_clear",
        message0: "clear the display with %1",
        args0: [
            {
                type: "input_value",
                name: "COLOUR",
                check: "TFT_Colour"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Clears the display",
        helpUrl: ""
    },
    {
        type: "display_invert",
        message0: "invert display colours %1",
        args0: [
            {
                type: "input_value",
                name: "INVERT",
                check: "Boolean"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Inverts the display",
        helpUrl: ""
    }
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: "display_fontsize",
        message0: "set font size to %1",
        args0: [
            {
                type: "input_value",
                name: "SIZE",
                check: "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Sets the display font size",
        helpUrl: ""
    },
    {
        type: "display_fontcolour",
        message0: "set font colour to %1",
        args0: [
            {
                type: "input_value",
                name: "COLOUR",
                check: "TFT_Colour"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Sets the display font colour",
        helpUrl: ""
    },
    {
        type: "display_println",
        message0: "print %1",
        args0: [
            {
                type: "input_value",
                name: "TEXT",
                check: "String"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Prints a line of text onto the display",
        helpUrl: ""
    },
    {
        type: "draw_text",
        message0: "print %1 x %2 y %3",
        args0: [
            {
                type: "input_value",
                name: "TEXT",
                check: "String"
            },
            {
                type: "input_value",
                name: "X",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y",
                check: "Number"
            }
        ],
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Draw a line of text on the specified coordinates",
        helpUrl: ""
    }
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: "draw_rect",
        message0: "draw rectangle with colour %1 x %2 y %3 width %4 height %5",
        args0: [
            {
                type: "input_value",
                name: "COLOUR",
                check: "TFT_Colour"
            },
            {
                type: "input_value",
                name: "X",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y",
                check: "Number"
            },
            {
                type: "input_value",
                name: "W",
                check: "Number"
            },
            {
                type: "input_value",
                name: "H",
                check: "Number"
            }
        ],
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Draw a rectangle",
        helpUrl: ""
    },
    {
        type: "draw_circle",
        message0: "draw circle with colour %1 x %2 y %3 radius %4",
        args0: [
            {
                type: "input_value",
                name: "COLOUR",
                check: "TFT_Colour"
            },
            {
                type: "input_value",
                name: "X",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y",
                check: "Number"
            },
            {
                type: "input_value",
                name: "R",
                check: "Number"
            }
        ],
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Draw a circle",
        helpUrl: ""
    },
    {
        type: "draw_ellipse",
        message0: "draw ellipse with colour %1 x %2 y %3 radius x %4 radius y %5",
        args0: [
            {
                type: "input_value",
                name: "COLOUR",
                check: "TFT_Colour"
            },
            {
                type: "input_value",
                name: "X",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y",
                check: "Number"
            },
            {
                type: "input_value",
                name: "RX",
                check: "Number"
            },
            {
                type: "input_value",
                name: "RY",
                check: "Number"
            }
        ],
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Draw an ellipse",
        helpUrl: ""
    },
    {
        type: "draw_triangle",
        message0: "draw triangle with colour %1 x0 %2 y0 %3 x1 %4 y1 %5 x2 %6 y2 %7",
        args0: [
            {
                type: "input_value",
                name: "COLOUR",
                check: "TFT_Colour"
            },
            {
                type: "input_value",
                name: "X0",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y0",
                check: "Number"
            },
            {
                type: "input_value",
                name: "X1",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y1",
                check: "Number"
            },
            {
                type: "input_value",
                name: "X2",
                check: "Number"
            },
            {
                type: "input_value",
                name: "Y2",
                check: "Number"
            }
        ],
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Draw a triangle",
        helpUrl: ""
    }
]);