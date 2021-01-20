import {ToolboxCategory} from "../../Toolbox";
import {Blocks} from '../blocks'
import Blockly from '../../../blockly/blockly';
import {moreCategory, ToolboxCategorySpecial} from "./Common";


let categories: ToolboxCategory[] = [];

categories.push({
    color: Blockly.Msg.LOGIC_HUE,
    icon: "\uf085",
    name: "Logic",

    blocks: [
        {
            name: "controls_if",
            xml: Blocks.logic.controls_if,
            group: "Conditionals"
        },
        {
            name: "controls_if_else",
            xml: Blocks.logic.controls_if_else,
            group: "Conditionals"
        },
        {
            name: "logic_ternary",
            xml: Blocks.logic.logic_ternary,
            group: "Conditionals"
        },
        {
            name: "logic_compare_eq",
            xml: Blocks.logic.logic_compare_eq,
            group: "Comparison"
        },
        {
            name: "logic_compare_lt",
            xml: Blocks.logic.logic_compare_lt,
            group: "Comparison"
        },
        {
            name: "logic_compare_str",
            xml: Blocks.logic.logic_compare_str,
            group: "Comparison"
        },
        {
            name: "logic_and",
            xml: Blocks.logic.logic_and,
            group: "Boolean"
        },
        {
            name: "logic_or",
            xml: Blocks.logic.logic_or,
            group: "Boolean"
        },
        {
            name: "logic_negate",
            xml: Blocks.logic.logic_negate,
            group: "Boolean"
        },
        {
            name: "logic_boolean_true",
            xml: Blocks.logic.logic_boolean_true,
            group: "Boolean"
        },
        {
            name: "logic_boolean_false",
            xml: Blocks.logic.logic_boolean_false,
            group: "Boolean"
        },
    ],

    subcategories: [ ], // ToolboxCategory
    advanced: false
});

categories.push({
    name: "Loops",
    icon: "\uf2f1",
    color: Blockly.Msg.LOOPS_HUE,

    blocks: [
        {
            name: "loops_repeat_ext",
            xml: Blocks.loops.controls_repeat_ext
        },
        {
            name: "loops_while",
            xml: Blocks.loops.controls_whileuntil
        },
        {
            name: "loops_for",
            xml: Blocks.loops.controls_for
        },
        {
            name: "loops_flowcontrol",
            xml: Blocks.loops.controls_flow_statements
        }
    ],

    subcategories: [ ]
});

categories.push({
    name: "Math",
    color: Blockly.Msg.MATH_HUE,
    icon: "\uf1ec",

    blocks: [
        {
            name: "math_number",
            xml: Blocks.math.math_number
        },
        {
            name: "math_const_pi",
            xml: Blocks.math.math_const_pi
        },
        {
            name: "math_const_e",
            xml: Blocks.math.math_const_e
        },
        {
            name: "math_round",
            xml: Blocks.math.math_round
        },
        {
            name: "math_rand_int",
            xml: Blocks.math.math_random_int
        },
        {
            name: "math_rand_float",
            xml: Blocks.math.math_random_float
        },
        {
            name: "math_arithmetic_sum",
            xml: Blocks.math.math_arithmetic_sum,
            group: "Arithmetic"
        },
        {
            name: "math_arithmetic_sub",
            xml: Blocks.math.math_arithmetic_sub,
            group: "Arithmetic"
        },
        {
            name: "math_arithmetic_mul",
            xml: Blocks.math.math_arithmetic_mul,
            group: "Arithmetic"
        },
        {
            name: "math_arithmetic_div",
            xml: Blocks.math.math_arithmetic_div,
            group: "Arithmetic"
        },
        {
            name: "math_arithmetic_pow",
            xml: Blocks.math.math_arithmetic_pow,
            group: "Arithmetic"
        },
        {
            name: "math_arithmetic_modulo",
            xml: Blocks.math.math_modulo,
            group: "Arithmetic"
        },
        {
            name: "math_single_root",
            xml: Blocks.math.math_single_root,
            group: "Single operand"
        },
        {
            name: "math_single_abs",
            xml: Blocks.math.math_single_abs,
            group: "Single operand"
        },
        {
            name: "math_single_neg",
            xml: Blocks.math.math_single_neg,
            group: "Single operand"
        },
        {
            name: "math_single_ln",
            xml: Blocks.math.math_single_ln,
            group: "Single operand"
        },
        {
            name: "math_single_log",
            xml: Blocks.math.math_single_log,
            group: "Single operand"
        },
        {
            name: "math_single_exp",
            xml: Blocks.math.math_single_exp,
            group: "Single operand"
        },
        {
            name: "math_single_sci",
            xml: Blocks.math.math_single_sci,
            group: "Single operand"
        },
        {
            name: "math_trig_sin",
            xml: Blocks.math.math_trig_sin,
            group: "Trigonometry"
        },
        {
            name: "math_trig_cos",
            xml: Blocks.math.math_trig_cos,
            group: "Trigonometry"
        },
        {
            name: "math_trig_tan",
            xml: Blocks.math.math_trig_tan,
            group: "Trigonometry"
        },
        {
            name: "math_trig_asin",
            xml: Blocks.math.math_trig_asin,
            group: "Trigonometry"
        },
        {
            name: "math_trig_acos",
            xml: Blocks.math.math_trig_acos,
            group: "Trigonometry"
        },
        {
            name: "math_trig_atan",
            xml: Blocks.math.math_trig_atan,
            group: "Trigonometry"
        },

    ],

    subcategories: [{
        ...moreCategory,

        blocks: [
            {
                name: "math_constraint",
                xml: Blocks.math.math_constrain
            },
            {
                name: "math_property_even",
                xml: Blocks.math.math_property_even
            },
            {
                name: "math_property_odd",
                xml: Blocks.math.math_property_odd
            },
            /*{
                name: "math_on_list",
                xml: Blocks.math.math_on_list
            }*/
        ]
    }]
});

categories.push({
    name: "Text",
    color: Blockly.Msg.TEXTS_HUE,
    icon: "\uf031",

    blocks: [
        {
            name: "text",
            xml: Blocks.text.text
        },
        {
            name: "text_join",
            xml: Blocks.text.text_join
        },
        {
            name: "text_length",
            xml: Blocks.text.text_length
        },
        {
            name: "text_isempty",
            xml: Blocks.text.text_isempty
        },
        {
            name: "text_case_upper",
            xml: Blocks.text.text_case_upper
        },
        {
            name: "text_case_lower",
            xml: Blocks.text.text_case_lower
        }
    ],

    subcategories: [{
        ...moreCategory,

        blocks: [
            {
                name: "text_substring",
                xml: Blocks.text.text_getsubstring
            },
            {
                name: "text_replace",
                xml: Blocks.text.text_replace
            },
            {
                name: "text_print",
                xml: Blocks.text.text_print
            },
            {
                name: "text_prompt_ext",
                xml: Blocks.text.text_prompt_ext
            },

            {
                name: "text_charat",
                xml: Blocks.text.text_charat
            },
            {
                name: "text_indexof",
                xml: Blocks.text.text_indexof
            }
        ]
    }]
});

categories.push({
    name: "Variables",
    icon: "\uf01c",
    color: Blockly.Msg.VARIABLES_HUE,
    special: ToolboxCategorySpecial.VARIABLES,

    blocks: [],
    subcategories: []
});

categories.push({
    name: "Functions",
    icon: "\uf013",
    color: Blockly.Msg.PROCEDURES_HUE,
    special: ToolboxCategorySpecial.FUNCTIONS,

    blocks: [],
    subcategories: []
});

categories.push({
    name: "I/O",
    icon: "\uf360",
    color: Blockly.Msg.IO_HUE,

    subcategories: [],

    blocks: [
        {
            name: "button_press_release",
            xml: Blocks.input.input_button_spencer,
            group: "Buttons"
        },
        {
            name: "button_held",
            xml: Blocks.input.input_button_held_spencer,
            group: "Buttons"
        }
    ]
});

categories.push({
    name: "Network",
    icon: "\uf1eb",
    color: Blockly.Msg.VARIABLES_DYNAMIC_HUE,

    blocks: [
        {
            name: "wifi_set_info",
            xml: Blocks.network.set
        },
        {
            name: "wifi_state_changed",
            xml: Blocks.network.state_changed
        },
        {
            name: "wifi_is_connected",
            xml: Blocks.network.is_connected
        },
        {
            name: "wifi_connect",
            xml: Blocks.network.wifi_connect
        },
        {
            name: "wifi_connect_callback_then",
            xml: Blocks.network.wifi_connect_callback
        }
    ],

    subcategories: []
});

categories.push({
    name: "LED matrix",
    icon: "\uf108",
    color: Blockly.Msg.DISPLAY_HUE,

    blocks: [
        {
            name: "ledmatrix_push",
            xml: Blocks.ledmatrix.push
        },
        {
            name: "ledmatrix_clear",
            xml: Blocks.ledmatrix.clear
        },
        {
            name: "ledmatrix_brightness",
            xml: Blocks.ledmatrix.brightness
        },
        {
            name: "ledmatrix_pixel",
            xml: Blocks.ledmatrix.pixel,
            group: "Drawing"
        },
        {
            name: "ledmatrix_text",
            xml: Blocks.ledmatrix.text,
            group: "Drawing"
        },
        {
            name: "ledmatrix_start_animation",
            xml: Blocks.ledmatrix.start_animation,
            group: "Animation"
        },
        {
            name: "ledmatrix_stop_animation",
            xml: Blocks.ledmatrix.stop_animation,
            group: "Animation"
        },

    ],
    subcategories: []
});

categories.push({
    name: "Playback",
    icon: "\uf04b",
    color: Blockly.Msg.REPORTERS_HUE,

    blocks: [
        {
            name: "audio_play_sample",
            xml: Blocks.audio_spencer.play,
            group: "Control"
        },
        {
            name: "audio_stop_sample",
            xml: Blocks.audio_spencer.stop,
            group: "Control"
        },
        {
            name: "audio_sample_done",
            xml: Blocks.audio_spencer.done,
            group: "Control"
        },

        {
            name: "audio_samples_error",
            xml: Blocks.audio_spencer.samples_error,
            group: "Samples"
        },
        {
            name: "audio_samples_generic",
            xml: Blocks.audio_spencer.samples_generic,
            group: "Samples"
        },
        {
            name: "audio_samples_level",
            xml: Blocks.audio_spencer.samples_level,
            group: "Samples"
        },
        {
            name: "audio_samples_special",
            xml: Blocks.audio_spencer.samples_special,
            group: "Samples"
        },
        {
            name: "audio_samples_weather",
            xml: Blocks.audio_spencer.samples_weather,
            group: "Samples"
        },
        {
            name: "audio_samples_month",
            xml: Blocks.audio_spencer.samples_month,
            group: "Samples"
        },
        {
            name: "audio_samples_weekday",
            xml: Blocks.audio_spencer.samples_weekday,
            group: "Samples"
        },
        {
            name: "audio_samples_number",
            xml: Blocks.audio_spencer.samples_number,
            group: "Samples"
        },
        {
            name: "audio_samples_number_ordinal",
            xml: Blocks.audio_spencer.samples_number_ordinal,
            group: "Samples"
        },
        {
            name: "audio_samples_funpack",
            xml: Blocks.audio_spencer.samples_funpack,
            group: "Samples"
        },

    ],

    subcategories: []
});

categories.push({
    name: "Speech",
    icon: "\uf130",
    color: Blockly.Msg.IO_HUE,

    blocks: [
        {
            name: "spencer_speech_listen",
            xml: Blocks.spencer_speech.listen,
            group: "Speech to text"
        },
        {
            name: "spencer_speech_processed",
            xml: Blocks.spencer_speech.process,
            group: "Speech to text"
        },

        {
            name: "spencer_speech_synthesize",
            xml: Blocks.spencer_speech.synthesize,
            group: "Text to speech"
        },

    ],

    subcategories: []
});

categories.push({
    name: "Time",
    icon: "\uf2f2",
    color: Blockly.Msg.TIME_HUE,

    subcategories: [],

    blocks: [
        {
            name: "infinite_loop",
            xml: Blocks.time.infinite_loop
        },
        {
            name: "time_delay",
            xml: Blocks.time.time_delay
        },
        {
            name: "time_delay_microseconds",
            xml: Blocks.time.time_delaymicros
        },
        {
            name: "time_delay_seconds",
            xml: Blocks.time.time_delayseconds
        },
        {
            name: "time_micros",
            xml: Blocks.time.time_micros
        },
        {
            name: "time_millis",
            xml: Blocks.time.time_millis
        }
    ]
});

export function getToolbox(): ToolboxCategory[] {
    return categories;
}