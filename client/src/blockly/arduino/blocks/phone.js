
goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.phone");

Blockly.defineBlocksWithJsonArray([
    {
        type: "vibrate",
        message0: "vibrate for %1 second(s)",
        args0: [
            {
                type: "input_value",
                name: "DURATION",
                check: "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Blocks.io.HUE,
        tooltip: "Vibrate the MAKERphone.",
        helpUrl: ""
    },
    {
        type: "button_action",
        message0: "button %1 has been %2",
        args0: [
            {
                type: "field_dropdown",
                name: "BUTTON",
                options: [
                    [ "Button 1", "BTN_1" ],
                    [ "Button 2", "BTN_2" ],
                    [ "Button 3", "BTN_3" ],
                    [ "Button 4", "BTN_4" ],
                    [ "Button 5", "BTN_5" ],
                    [ "Button 6", "BTN_6" ],
                    [ "Button 7", "BTN_7" ],
                    [ "Button 8", "BTN_8" ],
                    [ "Button 9", "BTN_9" ],
                    [ "Button 0", "BTN_0" ],
                    [ "Button *", "BTN_ASTERISK" ],
                    [ "Button #", "BTN_HASHTAG" ],
                    [ "- Left", "BTN_FUN_LEFT" ],
                    [ "- Right", "BTN_FUN_RIGHT" ],
                    [ "Home", "BTN_HOME" ],
                    [ "A", "BTN_A" ],
                    [ "B", "BTN_B" ]
                ]
            },
            {
                type: "field_dropdown",
                name: "ACTION",
                options: [
                    [ "Pressed", "pressed" ],
                    [ "Released", "released" ],
                    [ "Held", "held" ]
                ]
            }
        ],
        extensions: [ "return_boolean" ],
        output: "Boolean",
        outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
        colour: Blockly.Blocks.io.HUE,
        tooltip: "Returns TRUE if the selected button has been pressed."
    },
    {
        type: "joystick",
        message0: "joystick %1 axis value",
        args0: [
            {
                type: "field_dropdown",
                name: "AXIS",
                options: [
                    [ "X", "X" ],
                    [ "Y", "Y" ]
                ]
            }
        ],
        extensions: [ "return_decimal" ],
        output: "Number",
        outputShape: Blockly.OUTPUT_SHAPE_ROUND,
        colour: Blockly.Blocks.io.HUE,
        tooltip: "Returns the joystick offset on the selected axis."
    }
]);