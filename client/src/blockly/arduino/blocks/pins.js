
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

Blockly.defineBlocksWithJsonArray([
    {
        type: "chatter_buttons",
        message0: "button %1",
        args0: [
            {
                type: "field_dropdown",
                name: "BUTTON",
                options: [
                    [ "left", "BTN_LEFT" ],
                    [ "right", "BTN_RIGHT" ],
                    [ "enter", "BTN_ENTER" ],
                    [ "back", "BTN_BACK" ],
                    [ "1", "BTN_1" ],
                    [ "2", "BTN_2" ],
                    [ "3", "BTN_3" ],
                    [ "4", "BTN_4" ],
                    [ "5", "BTN_5" ],
                    [ "6", "BTN_6" ],
                    [ "7", "BTN_7" ],
                    [ "8", "BTN_8" ],
                    [ "9", "BTN_9" ],
                    [ "0", "BTN_0" ],
                    [ "backspace", "BTN_L" ],
                    [ "shift / meme menu", "BTN_R" ],
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