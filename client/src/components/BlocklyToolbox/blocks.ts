export class Blocks {

    public static logic: any = {
        controls_if: '<block type="controls_if"><value name="IF0"><shadow type="logic_boolean"></shadow></value></block>',
        controls_if_else: '<block type="controls_if"><mutation else="1"></mutation><value name="IF0"><shadow type="logic_boolean"></shadow></value></block>',
        logic_compare_eq: '<block type="logic_compare"><value name="A"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>',
        logic_compare_lt: '<block type="logic_compare"><field name="OP">LT</field><value name="A"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>',
        logic_compare_str: '<block type="logic_compare"><field name="OP">EQ</field><value name="A"><shadow type="text"></shadow></value><value name="B"><shadow type="text"></shadow></value></block>',
        logic_and: '<block type="logic_operation"><field name="OP">AND</field></block>',
        logic_or: '<block type="logic_operation"><field name="OP">OR</field></block>',
        logic_negate: '<block type="logic_negate"></block>',
        logic_boolean_true: '<block type="logic_boolean"><field name="BOOL">TRUE</field></block>',
        logic_boolean_false: '<block type="logic_boolean"><field name="BOOL">FALSE</field></block>',
        logic_null: '<block type="logic_null" disabled="true"></block>',
        logic_ternary: '<block type="logic_ternary"></block>',
    };

    public static loops: any = {
        controls_repeat_ext: '<block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>',
        controls_whileuntil: '<block type="controls_whileUntil"></block>',
        controls_for_simple: '<block type="pxt_controls_for"><value name="VAR"><shadow type="variables_get_reporter"><field name="VAR">${lf("{id:var}index")}</field></shadow></value><value name="TO"><shadow type="math_whole_number"><field name="NUM">4</field></shadow></value></block>',
        controls_for: '<block type="controls_for"><value name="VAR"><shadow type="variables_get"><field name="VAR">i</field></shadow></value><value name="FROM"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
        controls_foreach: '<block type="controls_forEach"><value name="VAR"><shadow type="variables_get_reporter"><field name="VAR">item</field></shadow></value></block>',
        controls_flow_statements: '<block type="controls_flow_statements"></block>',
    };

    public static math: any = {
        math_number: '<block type="math_number" gap="32"><field name="NUM">123</field></block>',

        math_const_pi: '<block type="math_constant"><field name="CONSTANT">PI</field></block>',
        math_const_e: '<block type="math_constant"><field name="CONSTANT">E</field></block>',

        math_round: '<block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value></block>',
        math_random_int: '<block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>',
        math_random_float: '<block type="math_random_float"></block>',

        math_arithmetic_sum: '<block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
        math_arithmetic_sub: '<block type="math_arithmetic"><field name="OP">MINUS</field><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
        math_arithmetic_mul: '<block type="math_arithmetic"><field name="OP">MULTIPLY</field><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
        math_arithmetic_div: '<block type="math_arithmetic"><field name="OP">DIVIDE</field><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
        math_arithmetic_pow: '<block type="math_arithmetic"><field name="OP">POWER</field><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',

        math_modulo: '<block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>',

        math_single_root: '<block type="math_single"><field name="OP">ROOT</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',
        math_single_abs: '<block type="math_single"><field name="OP">ABS</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',
        math_single_neg: '<block type="math_single"><field name="OP">NEG</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',
        math_single_ln: '<block type="math_single"><field name="OP">LN</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',
        math_single_log: '<block type="math_single"><field name="OP">LOG10</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',
        math_single_exp: '<block type="math_single"><field name="OP">EXP</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',
        math_single_sci: '<block type="math_single"><field name="OP">POW10</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>',

        math_trig_sin: '<block type="math_trig"><field name="OP">SIN</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>',
        math_trig_cos: '<block type="math_trig"><field name="OP">COS</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>',
        math_trig_tan: '<block type="math_trig"><field name="OP">TAN</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>',
        math_trig_asin: '<block type="math_trig"><field name="OP">ASIN</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>',
        math_trig_acos: '<block type="math_trig"><field name="OP">ACOS</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>',
        math_trig_atan: '<block type="math_trig"><field name="OP">ATAN</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>',

        math_constrain: '<block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>',
        math_property_even: '<block type="math_number_property"><field name="PROPERTY">EVEN</field><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">12</field></shadow></value></block>',
        math_property_odd: '<block type="math_number_property"><field name="PROPERTY">ODD</field><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">12</field></shadow></value></block>',
        math_on_list: '<block type="math_on_list"></block>'
    };

    public static text: any = {
        text: '<block type="text"></block>',
        text_join: '<block type="text_join"></block>',
        text_length: '<block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',
        text_isempty: '<block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block>',
        text_case_upper: '<block type="text_changeCase"><field name="CASE">UPPERCASE</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',
        text_case_lower: '<block type="text_changeCase"><field name="CASE">LOWERCASE</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',

        text_getsubstring: '<block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value></block>',
        text_trim: '<block type="text_trim"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',
        text_count: '<block type="text_count"><value name="SUB"><shadow type="text"></shadow></value><value name="TEXT"><shadow type="text"></shadow></value></block>',
        text_replace: '<block type="text_replace"><value name="FROM"><shadow type="text"></shadow></value><value name="TO"><shadow type="text"></shadow></value><value name="TEXT"><shadow type="text"></shadow></value></block>',
        text_reverse: '<block type="text_reverse"><value name="TEXT"><shadow type="text"></shadow></value></block>',

        text_print: '<block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',
        text_prompt_ext: '<block type="text_prompt_ext"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',

        text_charat: '<block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block>',
        text_indexof: '<block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',

    };

    public static variables: any = {
    };

    public static functions: any = {
        arduino: '<block type="arduino_functions"></block>'
    };

    public static input_output: any = {
        io_digitalwrite: '<block type="io_digitalwrite"><value name="STATE"><block type="io_highlow"></block></value></block>',
        io_digitalread: '<block type="io_digitalread"></block>',
        io_builtin_led: '<block type="io_builtin_led"><value name="STATE"><block type="io_highlow"></block></value></block>',
        io_analogwrite: '<block type="io_analogwrite"></block>',
        io_analogread: '<block type="io_analogread"></block>',
        io_highlow: '<block type="io_highlow"></block>',
        io_pulsein: '<block type="io_pulsein"><value name="PULSETYPE"><shadow type="io_highlow"></shadow></value></block>',
        io_pulsetimeout: '<block type="io_pulsetimeout"><value name="PULSETYPE"><shadow type="io_highlow"></shadow></value><value name="TIMEOUT"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>',
    };

    public static time: any = {
        time_delay: '<block type="time_delay"><value name="DELAY_TIME_MILI"><block type="math_number"><field name="NUM">1000</field></value></block>',
        time_delaymicros: '<block type="time_delaymicros"><value name="DELAY_TIME_MICRO"><block type="math_number"><field name="NUM">100</field></value></block>',
        time_delayseconds: '<block type="time_delayseconds"><value name="DELAY_TIME_SEC"><block type="math_number"><field name="NUM">2</field></value></block>',
        time_millis: '<block type="time_millis"></block>',
        time_micros: '<block type="time_micros"></block>',
        infinite_loop: '<block type="infinite_loop"></block>',
    };

    public static audio: any = {
        io_tone: '<block type="io_tone"><field name="TONEPIN">0</field><value name="FREQUENCY"><shadow type="math_number"><field name="NUM">220</field></shadow></value></block>',
        io_notone: '<block type="io_notone"></block>',
    };

    public static comms: any = {
        serial_setup: '<block type="serial_setup"></block>',
        serial_print: '<block type="serial_print"></block>',
        text_prompt_ext: '<block type="text_prompt_ext"><value name="TEXT"><block type="text"></block></value></block>',
        spi_setup: '<block type="spi_setup"></block>',
        spi_transfer: '<block type="spi_transfer"></block>',
        spi_transfer_return: '<block type="spi_transfer_return"></block>',
    };

    public static phone: any = {
        update: '<block type="phone_update"></block>',
        button_action: '<block type="button_action"></block>',
        button_held: '<block type="button_held"><value name="DURATION"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>',
        button_repeat: '<block type="button_repeat"><value name="INTERVAL"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>',
        joystick: '<block type="joystick"></block>',
        led_colour: '<block type="led_colour"></block>',
        led_rgb: '<block type="led_colour_rgb"><value name="R"><shadow type="math_number"><field name="NUM">112</field></shadow></value><value name="G"><shadow type="math_number"><field name="NUM">27</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">254</field></shadow></value></block>',
        led_on: '<block type="led_on"><value name="LED"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="COLOUR"><shadow type="led_colour"><field name="COLOUR">CRGB::Blue</field></shadow></value></block>',
        led_off: '<block type="led_off"><value name="LED"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>'
    };

    public static display: any = {
        colour: '<block type="display_colour"></block>',
        popup: '<block type="display_popup"><value name="MESSAGE"><shadow type="text"></shadow></value><value name="DURATION"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>',
        clear: '<block type="display_clear"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_BLACK</field></shadow></value></block>',
        invert: '<block type="display_invert"><value name="INVERT"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></block>',

        fontsize: '<block type="display_fontsize"><value name="SIZE"><shadow type="math_number"><field name="NUM">6</field></shadow></value></block>',
        fonttype: '<block type="display_fonttype"></block>',
        fontcolour: '<block type="display_fontcolour"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value></block>',
        println: '<block type="display_println"><value name="TEXT"><shadow type="text"></shadow></value></block>',
        drawtext: '<block type="draw_text"><value name="TEXT"><shadow type="text"></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',

        drawrect: '<block type="draw_rect"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">25</field></shadow></value><value name="H"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>',
        drawcircle: '<block type="draw_circle"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>',
        drawellipse: '<block type="draw_ellipse"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="RX"><shadow type="math_number"><field name="NUM">15</field></shadow></value><value name="RY"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',
        drawtriangle: '<block type="draw_triangle"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X0"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="X1"><shadow type="math_number"><field name="NUM">60</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">20</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">60</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">60</field></shadow></value></block>',

    };

}