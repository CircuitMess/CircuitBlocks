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

    public static display_sprite: any = {
        commit: '<block type="display_commit"></block>',
        clear: '<block type="sprite_clear"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_BLACK</field></shadow></value></block>',

        fontsize: '<block type="sprite_fontsize"><value name="SIZE"><shadow type="math_number"><field name="NUM">6</field></shadow></value></block>',
        fonttype: '<block type="sprite_fonttype"></block>',
        fontcolour: '<block type="sprite_fontcolour"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value></block>',
        println: '<block type="sprite_println"><value name="TEXT"><shadow type="text"></shadow></value></block>',
        drawtext: '<block type="sprite_draw_text"><value name="TEXT"><shadow type="text"></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',

        drawrect: '<block type="sprite_draw_rect"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">25</field></shadow></value><value name="H"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>',
        drawcircle: '<block type="sprite_draw_circle"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>',
        drawellipse: '<block type="sprite_draw_ellipse"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">30</field></shadow></value><value name="RX"><shadow type="math_number"><field name="NUM">15</field></shadow></value><value name="RY"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',
        drawtriangle: '<block type="sprite_draw_triangle"><value name="COLOUR"><shadow type="display_colour"><field name="COLOUR">TFT_GREEN</field></shadow></value><value name="X0"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="X1"><shadow type="math_number"><field name="NUM">60</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">20</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">60</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">60</field></shadow></value></block>',

    };

    public static input: any = {
        input_button: '<block type="input_button"></block>',
        input_button_held: '<block type="input_button_held"><value name="DURATION"><block type="math_number"><field name="NUM">500</field></block></value></block>',
        input_button_any: '<block type="input_button_any"></block>',

        input_button_nibble: '<block type="input_button"><value name="BUTTON"><block type="nibble_buttons"></block></value></block>',
        input_button_held_nibble: '<block type="input_button_held"><value name="BUTTON"><block type="nibble_buttons"></block></value><value name="DURATION"><block type="math_number"><field name="NUM">500</field></value></block>',
        nibble_buttons: '<block type="nibble_buttons"></block>',

        input_button_spencer: '<block type="input_button_spencer"></block>',
        input_button_held_spencer: '<block type="input_button_held_spencer"><value name="DURATION"><block type="math_number"><field name="NUM">500</field></block></value></block>',
    };

    public static input_jayd: any = {
        input_button: '<block type="input_jayd_button"><value name="BUTTON"><block type="jayd_buttons"></block></value></block>',
        input_button_held: '<block type="input_jayd_button_held"><value name="BUTTON"><block type="jayd_buttons"></block></value><value name="DURATION"><block type="math_number"><field name="NUM">500</field></value></block>',
        jayd_buttons: '<block type="jayd_buttons"></block>',

        jayd_encoder: '<block type="input_jayd_encoder"><value name="ENC"><block type="jayd_encoders"></block></value></block>',
        jayd_encoders: '<block type="jayd_encoders"></block>',

        jayd_pot_current: '<block type="input_jayd_pot_current"><value name="POT"><block type="jayd_pots"></block></value></block>',
        jayd_pot: '<block type="input_jayd_pot"><value name="POT"><block type="jayd_pots"></block></value></block>',
        jayd_pots: '<block type="jayd_pots"></block>',
    };

    public static jayd_mix: any = {
        song: '<block type="mix_song"></block>',
        open_prerecorded: '<block type="mix_open"><value name="FILE"><block type="mix_song"></block></value></block>',
        open: '<block type="mix_open"><value name="FILE"><block type="text"><field name="TEXT">/My Mix.aac</field></block></value></block>',
        start: '<block type="mix_start"></block>',
        stop: '<block type="mix_stop"></block>',

        effect_set: '<block type="mix_effect_set"><value name="SLOT"></value><value name="EFFECT"><shadow type="mix_effect"><field name="EFFECT">LOWPASS</field></shadow></value></block>',
        effect_set_intensity: '<block type="mix_effect_set_intensity"><value name="SLOT">0</value><value name="INTENSITY"><block type="math_number"><field name="NUM">100</field></block></value></block>',

        speed: '<block type="mix_speed"><value name="SPEED"><block type="math_number"><field name="NUM">200</field></block></value></block>',
        volume: '<block type="mix_volume"><value name="VOLUME"><block type="math_number"><field name="NUM">150</field></block></value></block>',
    };

    public static io_wheelson: any = {
        input_button: '<block type="input_universal_button"><value name="BUTTON"><block type="wheelson_buttons"></block></value></block>',
        input_button_held: '<block type="input_universal_button_held"><value name="BUTTON"><block type="wheelson_buttons"></block></value><value name="DURATION"><block type="math_number"><field name="NUM">500</field></value></block>',
        jayd_buttons: '<block type="wheelson_buttons"></block>',
    };

    public static piezo: any = {
        tone: '<block type="piezo_tone"><value name="FREQUENCY"><block type="math_number"><field name="NUM">1000</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">500</field></block></value></block>',
        notone: '<block type="piezo_notone"></block>',
        mute: '<block type="piezo_mute"><value name="MUTE"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value></block>',
        is_mute: '<block type="piezo_ismute"></block>'
    }

    public static ledmatrix: any = {
        push: '<block type="ledmatrix_push"></block>',
        clear: '<block type="ledmatrix_clear"></block>',
        pixel: '<block type="ledmatrix_pixel"><value name="X"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">6</field></shadow></value><value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">255</field></shadow></value></block>',
        text: '<block type="ledmatrix_text"><value name="TEXT"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">255</field></shadow></value></block>',
        brightness: '<block type="ledmatrix_brightness"><value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">150</field></shadow></value></block>',
        start_animation: '<block type="ledmatrix_start_animation"><value name="ANIMATION"><shadow type="ledmatrix_animation"><field name="ANIMATION">GIF-idle1.gif</field></shadow></value></block>',
        stop_animation: '<block type="ledmatrix_stop_animation"></block>',
    }

    public static ledmatrix_jayd: any = {
        push: '<block type="jayd_ledmatrix_push"></block>',
        clear: '<block type="jayd_ledmatrix_clear"></block>',
        pixel: '<block type="jayd_ledmatrix_pixel"><value name="X"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">6</field></shadow></value><value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">255</field></shadow></value></block>',
        start_animation: '<block type="jayd_ledmatrix_start_animation"></block>',
        stop_animation: '<block type="jayd_ledmatrix_stop_animation"></block>',
    }

    public static audio_spencer: any = {
        play: '<block type="audio_spencer_playsample"></block>',
        stop: '<block type="audio_spencer_stopsample"></block>',
        done: '<block type="audio_spencer_done"></block>',

        samples_error: '<block type="audio_spencer_sample_error"></block>',
        samples_generic: '<block type="audio_spencer_sample_generic"></block>',
        samples_level: '<block type="audio_spencer_sample_level"></block>',
        samples_special: '<block type="audio_spencer_sample_special"></block>',
        samples_weather: '<block type="audio_spencer_sample_weather"></block>',
        samples_month: '<block type="audio_spencer_sample_month"></block>',
        samples_weekday: '<block type="audio_spencer_sample_weekday"></block>',
        samples_number: '<block type="audio_spencer_sample_number"></block>',
        samples_number_ordinal: '<block type="audio_spencer_sample_number_ordinal"></block>',
        samples_funpack: '<block type="audio_spencer_sample_funpack"></block>',
    };

    public static network: any = {
        set: '<block type="wifi_set_info"><value name="SSID"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="PASS"><shadow type="text"><field name="TEXT"></field></shadow></value></block>',
        state_changed: '<block type="wifi_state_changed"></block>',
        is_connected: '<block type="wifi_is_connected"></block>',
        wifi_connect: '<block type="wifi_connect"></block>',
        wifi_connect_callback: '<block type="wifi_connect_callback"></block>',
    };

    public static spencer_speech: any = {
        listen: '<block type="spencer_speech_listen"></block>',
        process: '<block type="spencer_speech_processed"></block>',
        synthesize: '<block type="spencer_speech_synthesize"><value name="TEXT"><shadow type="text"><field name="TEXT">Hello! My name is Spencer!</field></shadow></value></block>',
    };
}