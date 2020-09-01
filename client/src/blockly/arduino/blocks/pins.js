
goog.require('Blockly.Blocks');

goog.provide('Blockly.Blocks.pins');

Blockly.defineBlocksWithJsonArray([
    {
        type: "nibble_buttons",
        message0: "button %1",
        args0: [
            {
                type: "field_dropdown",
                name: "BUTTON",
                options: [
                    [ "up", "BTN_UP" ],
                    [ "down", "BTN_DOWN" ],
                    [ "left", "BTN_LEFT" ],
                    [ "right", "BTN_RIGHT" ],
                    [ "A", "BTN_A" ],
                    [ "B", "BTN_B" ],
                    [ "Menu", "BTN_C" ]
                ]
            }
        ],
        output: "PIN",
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Button",
        helpUrl: ""
    }
]);