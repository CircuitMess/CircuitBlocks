
goog.require("Blockly.Blocks");

goog.provide("Blockly.Blocks.phone");

Blockly.defineBlocksWithJsonArray([
    {
        type: "phone_update",
        message0: "update",
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Commits changes to display and checks for button presses",
        helpUrl: ""
    },
    {
        type: "led_colour",
        message0: "LED colour %1",
        args0: [
            {
                type: "field_dropdown",
                name: "COLOUR",
                options: [
                    /*[ "AliceBlue", "CRGB::AliceBlue" ],
                    [ "Amethyst", "CRGB::Amethyst" ],
                    [ "AntiqueWhite", "CRGB::AntiqueWhite" ],
                    [ "Aqua", "CRGB::Aqua" ],
                    [ "Aquamarine", "CRGB::Aquamarine" ],
                    [ "Azure", "CRGB::Azure" ],
                    [ "Beige", "CRGB::Beige" ],
                    [ "Bisque", "CRGB::Bisque" ],*/
                    [ "Black", "CRGB::Black" ],
                    //[ "BlanchedAlmond", "CRGB::BlanchedAlmond" ],
                    [ "Blue", "CRGB::Blue" ],
                    //[ "BlueViolet", "CRGB::BlueViolet" ],
                    [ "Brown", "CRGB::Brown" ],
                    /*[ "BurlyWood", "CRGB::BurlyWood" ],
                    [ "CadetBlue", "CRGB::CadetBlue" ],
                    [ "Chartreuse", "CRGB::Chartreuse" ],
                    [ "Chocolate", "CRGB::Chocolate" ],
                    [ "Coral", "CRGB::Coral" ],
                    [ "CornflowerBlue", "CRGB::CornflowerBlue" ],
                    [ "Cornsilk", "CRGB::Cornsilk" ],
                    [ "Crimson", "CRGB::Crimson" ],*/
                    [ "Cyan", "CRGB::Cyan" ],
                    [ "DarkBlue", "CRGB::DarkBlue" ],
                    [ "DarkCyan", "CRGB::DarkCyan" ],
                    //[ "DarkGoldenrod", "CRGB::DarkGoldenrod" ],
                    [ "DarkGray", "CRGB::DarkGray" ],
                    [ "DarkGreen", "CRGB::DarkGreen" ],
                    //[ "DarkKhaki", "CRGB::DarkKhaki" ],
                    [ "DarkMagenta", "CRGB::DarkMagenta" ],
                    //[ "DarkOliveGreen", "CRGB::DarkOliveGreen" ],
                    [ "DarkOrange", "CRGB::DarkOrange" ],
                    //[ "DarkOrchid", "CRGB::DarkOrchid" ],
                    [ "DarkRed", "CRGB::DarkRed" ],
                    /*[ "DarkSalmon", "CRGB::DarkSalmon" ],
                    [ "DarkSeaGreen", "CRGB::DarkSeaGreen" ],
                    [ "DarkSlateBlue", "CRGB::DarkSlateBlue" ],
                    [ "DarkSlateGray", "CRGB::DarkSlateGray" ],
                    [ "DarkSlateGrey", "CRGB::DarkSlateGrey" ],
                    [ "DarkTurquoise", "CRGB::DarkTurquoise" ],
                    [ "DarkViolet", "CRGB::DarkViolet" ],
                    [ "DeepPink", "CRGB::DeepPink" ],
                    [ "DeepSkyBlue", "CRGB::DeepSkyBlue" ],
                    [ "DimGray", "CRGB::DimGray" ],
                    [ "DimGrey", "CRGB::DimGrey" ],
                    [ "DodgerBlue", "CRGB::DodgerBlue" ],
                    [ "FireBrick", "CRGB::FireBrick" ],
                    [ "FloralWhite", "CRGB::FloralWhite" ],
                    [ "ForestGreen", "CRGB::ForestGreen" ],
                    [ "Fuchsia", "CRGB::Fuchsia" ],
                    [ "Gainsboro", "CRGB::Gainsboro" ],
                    [ "GhostWhite", "CRGB::GhostWhite" ],
                    [ "Gold", "CRGB::Gold" ],
                    [ "Goldenrod", "CRGB::Goldenrod" ],*/
                    [ "Gray", "CRGB::Gray" ],
                    [ "Green", "CRGB::Green" ],
                    /*[ "GreenYellow", "CRGB::GreenYellow" ],
                    [ "Honeydew", "CRGB::Honeydew" ],
                    [ "HotPink", "CRGB::HotPink" ],
                    [ "IndianRed", "CRGB::IndianRed" ],
                    [ "Indigo", "CRGB::Indigo" ],
                    [ "Ivory", "CRGB::Ivory" ],
                    [ "Khaki", "CRGB::Khaki" ],
                    [ "Lavender", "CRGB::Lavender" ],
                    [ "LavenderBlush", "CRGB::LavenderBlush" ],
                    [ "LawnGreen", "CRGB::LawnGreen" ],
                    [ "LemonChiffon", "CRGB::LemonChiffon" ],*/
                    [ "LightBlue", "CRGB::LightBlue" ],
                    [ "LightCoral", "CRGB::LightCoral" ],
                    [ "LightCyan", "CRGB::LightCyan" ],
                    //[ "LightGoldenrodYellow", "CRGB::LightGoldenrodYellow" ],
                    [ "LightGreen", "CRGB::LightGreen" ],
                    [ "LightGrey", "CRGB::LightGrey" ],
                    /*[ "LightPink", "CRGB::LightPink" ],
                    [ "LightSalmon", "CRGB::LightSalmon" ],
                    [ "LightSeaGreen", "CRGB::LightSeaGreen" ],
                    [ "LightSkyBlue", "CRGB::LightSkyBlue" ],
                    [ "LightSlateGray", "CRGB::LightSlateGray" ],
                    [ "LightSlateGrey", "CRGB::LightSlateGrey" ],
                    [ "LightSteelBlue", "CRGB::LightSteelBlue" ],
                    [ "LightYellow", "CRGB::LightYellow" ],
                    [ "Lime", "CRGB::Lime" ],
                    [ "LimeGreen", "CRGB::LimeGreen" ],
                    [ "Linen", "CRGB::Linen" ],*/
                    [ "Magenta", "CRGB::Magenta" ],
                    /*[ "Maroon", "CRGB::Maroon" ],
                    [ "MediumAquamarine", "CRGB::MediumAquamarine" ],
                    [ "MediumBlue", "CRGB::MediumBlue" ],
                    [ "MediumOrchid", "CRGB::MediumOrchid" ],
                    [ "MediumPurple", "CRGB::MediumPurple" ],
                    [ "MediumSeaGreen", "CRGB::MediumSeaGreen" ],
                    [ "MediumSlateBlue", "CRGB::MediumSlateBlue" ],
                    [ "MediumSpringGreen", "CRGB::MediumSpringGreen" ],
                    [ "MediumTurquoise", "CRGB::MediumTurquoise" ],
                    [ "MediumVioletRed", "CRGB::MediumVioletRed" ],
                    [ "MidnightBlue", "CRGB::MidnightBlue" ],
                    [ "MintCream", "CRGB::MintCream" ],
                    [ "MistyRose", "CRGB::MistyRose" ],
                    [ "Moccasin", "CRGB::Moccasin" ],
                    [ "NavajoWhite", "CRGB::NavajoWhite" ],*/
                    [ "Navy", "CRGB::Navy" ],
                    //[ "OldLace", "CRGB::OldLace" ],
                    [ "Olive", "CRGB::Olive" ],
                    //[ "OliveDrab", "CRGB::OliveDrab" ],
                    [ "Orange", "CRGB::Orange" ],
                    /*[ "OrangeRed", "CRGB::OrangeRed" ],
                    [ "Orchid", "CRGB::Orchid" ],
                    [ "PaleGoldenrod", "CRGB::PaleGoldenrod" ],
                    [ "PaleGreen", "CRGB::PaleGreen" ],
                    [ "PaleTurquoise", "CRGB::PaleTurquoise" ],
                    [ "PaleVioletRed", "CRGB::PaleVioletRed" ],
                    [ "PapayaWhip", "CRGB::PapayaWhip" ],
                    [ "PeachPuff", "CRGB::PeachPuff" ],
                    [ "Peru", "CRGB::Peru" ],
                    [ "Pink", "CRGB::Pink" ],
                    [ "Plaid", "CRGB::Plaid" ],
                    [ "Plum", "CRGB::Plum" ],
                    [ "PowderBlue", "CRGB::PowderBlue" ],
                    [ "Purple", "CRGB::Purple" ],*/
                    [ "Red", "CRGB::Red" ],
                    /*[ "RosyBrown", "CRGB::RosyBrown" ],
                    [ "RoyalBlue", "CRGB::RoyalBlue" ],
                    [ "SaddleBrown", "CRGB::SaddleBrown" ],
                    [ "Salmon", "CRGB::Salmon" ],
                    [ "SandyBrown", "CRGB::SandyBrown" ],
                    [ "SeaGreen", "CRGB::SeaGreen" ],
                    [ "Seashell", "CRGB::Seashell" ],
                    [ "Sienna", "CRGB::Sienna" ],
                    [ "Silver", "CRGB::Silver" ],
                    [ "SkyBlue", "CRGB::SkyBlue" ],
                    [ "SlateBlue", "CRGB::SlateBlue" ],
                    [ "SlateGray", "CRGB::SlateGray" ],
                    [ "SlateGrey", "CRGB::SlateGrey" ],
                    [ "Snow", "CRGB::Snow" ],
                    [ "SpringGreen", "CRGB::SpringGreen" ],
                    [ "SteelBlue", "CRGB::SteelBlue" ],
                    [ "Tan", "CRGB::Tan" ],
                    [ "Teal", "CRGB::Teal" ],
                    [ "Thistle", "CRGB::Thistle" ],
                    [ "Tomato", "CRGB::Tomato" ],
                    [ "Turquoise", "CRGB::Turquoise" ],
                    [ "Violet", "CRGB::Violet" ],
                    [ "Wheat", "CRGB::Wheat" ],*/
                    [ "White", "CRGB::White" ],
                    //[ "WhiteSmoke", "CRGB::WhiteSmoke" ],
                    /*[ "Yellow", "CRGB::Yellow" ],
                    [ "YellowGreen", "CRGB::YellowGreen" ],
                    [ "FairyLight", "CRGB::FairyLight" ],
                    [ "FairyLightNCC", "CRGB::FairyLightNCC" ]*/
                ]
            }
        ],
        output: "LED_Colour",
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Colour",
        helpUrl: ""
    },
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
        colour: Blockly.Msg.IO_HUE,
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
                ]
            }
        ],
        extensions: [ "return_boolean" ],
        output: "Boolean",
        outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Returns TRUE if the selected button has been pressed."
    },
    {
        type: "button_held",
        message0: "button %1 has been held for %2 milliseconds",
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
                type: "input_value",
                name: "DURATION",
                check: "Number"
            }
        ],
        extensions: [ "return_boolean" ],
        output: "Boolean",
        outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Returns TRUE if the selected button has been held for the specified duration."
    },
    {
        type: "button_repeat",
        message0: "simulate button %1 repeated press every %2 milliseconds",
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
                type: "input_value",
                name: "INTERVAL",
                check: "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Simulates repeated button press"
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
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Returns the joystick offset on the selected axis."
    },
    {
        type: "led_on",
        message0: "set led %1 to colour %2",
        args0: [
            {
                type: "input_value",
                name: "LED",
                check: "Number"
            },
            {
                type: "input_value",
                name: "COLOUR",
                check: "LED_Colour"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Lights the led"
    },
    {
        type: "led_off",
        message0: "turn off led %1",
        args0: [
            {
                type: "input_value",
                name: "LED",
                check: "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        colour: Blockly.Msg.IO_HUE,
        tooltip: "Lights the led"
    },
]);