export class Blocks {

    public static logic: any = {
        controls_if: '<block type="controls_if"><value name="IF0"><shadow type="logic_boolean"></shadow></value>',
        controls_if_else: '<block type="controls_if"><mutation else="1"></mutation><value name="IF0"><shadow type="logic_boolean"></shadow></value>',
        logic_compare_eq: '<block type="logic_compare"><value name="A"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value>',
        logic_compare_lt: '<block type="logic_compare"><field name="OP">LT</field><value name="A"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value>',
        logic_compare_str: '<block type="logic_compare"><field name="OP">EQ</field><value name="A"><shadow type="text"></shadow></value><value name="B"><shadow type="text"></shadow></value>',
        logic_and: '<block type="logic_operation"><field name="OP">AND</field></block>',
        logic_or: '<block type="logic_operation"><field name="OP">OR</field></block>',
        logic_negate: '<block type="logic_negate"></block>',
        logic_boolean_true: '<block type="logic_boolean"><field name="BOOL">TRUE</field></block>',
        logic_boolean_false: '<block type="logic_boolean"><field name="BOOL">FALSE</field></block>',
        logic_null: '<block type="logic_null" disabled="true"></block>',
        logic_ternary: '<block type="logic_ternary"></block>',
    };

    public static loops: any = {
        controls_repeat_ext: '<block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value>',
        controls_repeat: '<block type="controls_repeat" disabled="true"></block>',
        controls_whileuntil: '<block type="controls_whileUntil" disabled="true"></block>',
        controls_for: '<block type="controls_for"><value name="VAR"><shadow type="variables_get_reporter"><field name="VAR">index</field></shadow></value><value name="FROM"><shadow type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value>',
        controls_foreach: '<block type="controls_forEach"><value name="VAR"><shadow type="variables_get_reporter"><field name="VAR">item</field></shadow></value>',
        controls_flow_statements: '<block type="controls_flow_statements"></block>',
    };

    public static math: any = {
        math_number: '<block type="math_number" gap="32"><field name="NUM">123</field>',
        math_number_minmax: '<block type="math_number_minmax" gap="32"><mutation min="0" max="100"></mutation>',
        math_arithmetic: '<block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>',
        math_single: '<block type="math_single"><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value>',
        math_trig: '<block type="math_trig"><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value>',
        math_constant: '<block type="math_constant"></block>',
        math_number_property: '<block type="math_number_property"><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value>',
        math_round: '<block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value>',
        math_on_list: '<block type="math_on_list"></block>',
        math_modulo: '<block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value>',
        math_constrain: '<block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value>',
        math_random_int: '<block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value>',
        math_random_float: '<block type="math_random_float"></block>',
    };

    public static text: any = {
        text: '<block type="text"></block>',
        text_join: '<block type="text_join"></block>',
        text_length: '<block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value>',
        text_isempty: '<block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value>',
        text_indexof: '<block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value>',
        text_charat: '<block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></value>',
        text_getsubstring: '<block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></value>',
        text_changecase: '<block type="text_changeCase"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value>',
        text_trim: '<block type="text_trim"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value>',
        text_count: '<block type="text_count"><value name="SUB"><shadow type="text"></shadow></value><value name="TEXT"><shadow type="text"></shadow></value>',
        text_replace: '<block type="text_replace"><value name="FROM"><shadow type="text"></shadow></value><value name="TO"><shadow type="text"></shadow></value><value name="TEXT"><shadow type="text"></shadow></value>',
        text_reverse: '<block type="text_reverse"><value name="TEXT"><shadow type="text"></shadow></value>',
        text_print: '<block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value>',
        text_prompt_ext: '<block type="text_prompt_ext"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value>',
    };

    public static variables: any = {
    };

    public static functions: any = {
    };

    public static input_output: any = {
        io_digitalwrite: '<block type="io_digitalwrite"><value name="STATE"><block type="io_highlow"></block></value>',
        io_digitalread: '<block type="io_digitalread"></block>',
        io_builtin_led: '<block type="io_builtin_led"><value name="STATE"><block type="io_highlow"></block></value>',
        io_analogwrite: '<block type="io_analogwrite"></block>',
        io_analogread: '<block type="io_analogread"></block>',
        io_highlow: '<block type="io_highlow"></block>',
        io_pulsein: '<block type="io_pulsein"><value name="PULSETYPE"><shadow type="io_highlow"></shadow></value>',
        io_pulsetimeout: '<block type="io_pulsetimeout"><value name="PULSETYPE"><shadow type="io_highlow"></shadow></value><value name="TIMEOUT"><shadow type="math_number"><field name="NUM">100</field></shadow></value>',
    };

    public static time: any = {
        time_delay: '<block type="time_delay"><value name="DELAY_TIME_MILI"><block type="math_number"><field name="NUM">1000</field></value>',
        time_delaymicros: '<block type="time_delaymicros"><value name="DELAY_TIME_MICRO"><block type="math_number"><field name="NUM">100</field></value>',
        time_millis: '<block type="time_millis"></block>',
        time_micros: '<block type="time_micros"></block>',
        infinite_loop: '<block type="infinite_loop"></block>',
    };

    public static audio: any = {
        io_tone: '<block type="io_tone"><field name="TONEPIN">0</field><value name="FREQUENCY"><shadow type="math_number"><field name="NUM">220</field></shadow></value>',
        io_notone: '<block type="io_notone"></block>',
    };

    public static comms: any = {
        serial_setup: '<block type="serial_setup"></block>',
        serial_print: '<block type="serial_print"></block>',
        text_prompt_ext: '<block type="text_prompt_ext"><value name="TEXT"><block type="text"></block></value>',
        spi_setup: '<block type="spi_setup"></block>',
        spi_transfer: '<block type="spi_transfer"></block>',
        spi_transfer_return: '<block type="spi_transfer_return"></block>',
    };

}