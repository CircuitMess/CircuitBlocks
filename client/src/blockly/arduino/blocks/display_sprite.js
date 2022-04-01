
goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.display_sprite");

Blockly.defineBlocksWithJsonArray([
    {
        type: "display_commit",
        message0: "draw sprite to display",
        args0: [],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Commits the contents of sprite to the display",
        helpUrl: ""
    }
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: "sprite_clear",
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
    }
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: "sprite_fontsize",
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
        type: "sprite_fonttype",
        message0: "set font type %1",
        args0: [
            {
                type: "field_dropdown",
                name: "TYPE",
                options: [
                    [ "1", "1" ],
                    [ "2", "2" ],
                ]
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.DISPLAY_HUE,
        tooltip: "Sets the display font type",
        helpUrl: ""
    },
    {
        type: "sprite_fontcolour",
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
        type: "sprite_println",
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
        type: "sprite_draw_text",
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
        type: "sprite_draw_rect",
        message0: "draw %1 rectangle with colour %2 x %3 y %4 width %5 height %6",
        args0: [
            {
                type: "field_dropdown",
                name: "FUNC",
                options: [
                    [ "filled", "fill" ],
                    [ "outlined", "draw" ],
                ]
            },
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
        type: "sprite_draw_circle",
        message0: "draw %1 circle with colour %2 x %3 y %4 radius %5",
        args0: [
            {
                type: "field_dropdown",
                name: "FUNC",
                options: [
                    [ "filled", "fill" ],
                    [ "outlined", "draw" ],
                ]
            },
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
        type: "sprite_draw_ellipse",
        message0: "draw %1 ellipse with colour %2 x %3 y %4 radius x %5 radius y %6",
        args0: [
            {
                type: "field_dropdown",
                name: "FUNC",
                options: [
                    [ "filled", "fill" ],
                    [ "outlined", "draw" ],
                ]
            },
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
        type: "sprite_draw_triangle",
        message0: "draw %1 triangle with colour %2 x0 %3 y0 %4 x1 %5 y1 %6 x2 %7 y2 %8",
        args0: [
            {
                type: "field_dropdown",
                name: "FUNC",
                options: [
                    [ "filled", "fill" ],
                    [ "outlined", "draw" ],
                ]
            },
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

Blockly.defineBlocksWithJsonArray([{
    type: "sprite_draw_sprite",
    message0: "draw sprite %1 x %2 y %3",
    args0: [
        {
            type: "input_dummy",
            name: "SPRITE",
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
    extensions: ["extension_spriteDraw"],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
    colour: Blockly.Msg.DISPLAY_HUE,
    tooltip: "Draw a line of text on the specified coordinates",
    helpUrl: ""
}]);

Blockly.Extensions.register('extension_spriteDraw', function(){
    const input = this.getInput('SPRITE');
    input.appendField(new Blockly.FieldDropdown(function(){
        if(!Array.isArray(Blockly.DefaultSprites) || !Array.isArray(Blockly.Sprites) || Blockly.DefaultSprites.length === 0) return [["ERROR", "FOO"]];

        const sprites = [];

        Blockly.Sprites.forEach(function(sprite){
            sprites.push([ sprite.name, sprite.name ]); // lijepo, strojno
        });

        Blockly.DefaultSprites.forEach(function(sprite){
            sprites.push([ sprite.name, `def:${sprite.name}` ]); // lijepo, strojno
        });

        return sprites;
    }), 'SPRITEVAL');
});
