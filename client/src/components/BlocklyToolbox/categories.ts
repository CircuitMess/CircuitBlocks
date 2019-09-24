import {ToolboxCategory} from "../Toolbox";
import {Blocks} from './blocks'

export enum ToolboxCategorySpecial {
    VARIABLES, FUNCTIONS
}

/*
export function cachedBuiltinCategories(): ToolboxCategory[] {
    let categories: any = {};

    categories[CategoryNameID.Loops] = {
        name: lf("{id:category}Loops"),
        nameid: CategoryNameID.Loops,
        blocks: [
            {
                name: "controls_repeat_ext",
                attributes: {
                    blockId: "controls_repeat_ext",
                    weight: 49
                },
                blockXml: `<block type="controls_repeat_ext">
                    <value name="TIMES">
                        <shadow type="math_whole_number">
                            <field name="NUM">4</field>
                        </shadow>
                    </value>
                </block>`
            }, {
                name: "device_while",
                attributes: {
                    blockId: "device_while",
                    weight: 48
                },
                blockXml: `<block type="device_while">
                    <value name="COND">
                        <shadow type="logic_boolean"></shadow>
                    </value>
                </block>`
            },
            {
                name: "pxt_controls_for",
                attributes: {
                    blockId: "pxt_controls_for",
                    weight: 47
                },
                blockXml: `<block type="pxt_controls_for">
                    <value name="VAR">
                        <shadow type="variables_get_reporter">
                            <field name="VAR">${lf("{id:var}index")}</field>
                        </shadow>
                    </value>
                    <value name="TO">
                        <shadow type="math_whole_number">
                            <field name="NUM">4</field>
                        </shadow>
                    </value>
                </block>`
            },
            {
                name: "pxt_controls_for_of",
                attributes: {
                    blockId: "pxt_controls_for_of",
                    weight: 46
                },
                blockXml: `<block type="pxt_controls_for_of">
                    <value name="VAR">
                        <shadow type="variables_get_reporter">
                            <field name="VAR">${lf("{id:var}value")}</field>
                        </shadow>
                    </value>
                    <value name="LIST">
                        <shadow type="variables_get">
                            <field name="VAR">list</field>
                        </shadow>
                    </value>
                </block>`
            }
        ],
        attributes: {
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            icon: "loops",
            weight: 50.09,
            paramDefl: {}
        }
    };
    categories[CategoryNameID.Logic] = {
        name: lf("{id:category}Logic"),
        nameid: CategoryNameID.Logic,
        groups: [lf("Conditionals"), lf("Comparison"), lf("Boolean"), "other"],
        blocks: [
            {
                name: "controls_if",
                attributes: {
                    blockId: "controls_if",
                    group: lf("Conditionals"),
                    weight: 49
                },
                blockXml: `<block type="controls_if" gap="8">
                    <value name="IF0">
                        <shadow type="logic_boolean">
                            <field name="BOOL">TRUE</field>
                        </shadow>
                    </value>
                </block>`
            }, {
                name: "controls_if_else",
                attributes: {
                    blockId: "controls_if",
                    group: lf("Conditionals"),
                    weight: 48
                },
                blockXml: `<block type="controls_if" gap="8">
                    <mutation else="1"></mutation>
                    <value name="IF0">
                        <shadow type="logic_boolean">
                            <field name="BOOL">TRUE</field>
                        </shadow>
                    </value>
                </block>`
            }, {
                name: "logic_compare_eq",
                attributes: {
                    blockId: "logic_compare",
                    group: lf("Comparison"),
                    weight: 47
                },
                blockXml: `<block type="logic_compare" gap="8">
                    <value name="A">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="B">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>`
            }, {
                name: "logic_compare_lt",
                attributes: {
                    blockId: "logic_compare",
                    group: lf("Comparison"),
                    weight: 46
                },
                blockXml: `<block type="logic_compare">
                    <field name="OP">LT</field>
                    <value name="A">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="B">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>`
            }, {
                name: "logic_compare_strings",
                attributes: {
                    blockId: "logic_compare",
                    group: lf("Comparison"),
                    weight: 45
                },
                blockXml: `<block type="logic_compare" gap="8">
                    <value name="A">
                        <shadow type="text">
                            <field name="TEXT"></field>
                        </shadow>
                    </value>
                    <value name="B">
                        <shadow type="text">
                            <field name="TEXT"></field>
                        </shadow>
                    </value>
                </block>`
            }, {
                name: "logic_operation_and",
                attributes: {
                    blockId: "logic_operation",
                    group: lf("Boolean"),
                    weight: 44
                },
                blockXml: `<block type="logic_operation" gap="8">
                    <field name="OP">AND</field>
                </block>`
            }, {
                name: "logic_operation_or",
                attributes: {
                    blockId: "logic_operation",
                    group: lf("Boolean"),
                    weight: 43
                },
                blockXml: `<block type="logic_operation" gap="8">
                    <field name="OP">OR</field>
                </block>`
            }, {
                name: "logic_negate",
                attributes: {
                    blockId: "logic_negate",
                    group: lf("Boolean"),
                    weight: 42
                },
                blockXml: `<block type="logic_negate"></block>`
            }, {
                name: "logic_boolean_true",
                attributes: {
                    blockId: "logic_boolean",
                    group: lf("Boolean"),
                    weight: 41
                },
                blockXml: `<block type="logic_boolean" gap="8">
                    <field name="BOOL">TRUE</field>
                </block>`
            }, {
                name: "logic_boolean_false",
                attributes: {
                    blockId: "logic_boolean",
                    group: lf("Boolean"),
                    weight: 40
                },
                blockXml: `<block type="logic_boolean">
                    <field name="BOOL">FALSE</field>
                </block>`
            }],
        attributes: {
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            weight: 50.08,
            icon: "logic",
            paramDefl: {}
        }
    };
    categories[CategoryNameID.Variables] = {
        name: lf("{id:category}Variables"),
        nameid: CategoryNameID.Variables,
        blocks: undefined,
        custom: true,
        customClick: () => {
            // theEditor.showVariablesFlyout();
            return false;
        },
        attributes: {
            weight: 50.07,
            icon: "variables",
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            paramDefl: {}
        }
    };
    categories[CategoryNameID.Maths] = {
        name: lf("{id:category}Math"),
        nameid: CategoryNameID.Maths,
        blocks: [
            {
                name: "math_arithmetic_ADD",
                attributes: {
                    blockId: "math_arithmetic",
                    weight: 90
                },
                blockXml: `<block type="math_arithmetic" gap="8">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <field name="OP">ADD</field>
                    </block>`
            }, {
                name: "math_arithmetic_MINUS",
                attributes: {
                    blockId: "math_arithmetic",
                    weight: 89
                },
                blockXml: `<block type="math_arithmetic" gap="8">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <field name="OP">MINUS</field>
                    </block>`
            }, {
                name: "math_arithmetic_TIMES",
                attributes: {
                    blockId: "math_arithmetic",
                    weight: 88
                },
                blockXml: `<block type="math_arithmetic" gap="8">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <field name="OP">MULTIPLY</field>
                    </block>`
            }, {
                name: "math_arithmetic_DIVIDE",
                attributes: {
                    blockId: "math_arithmetic",
                    weight: 87
                },
                blockXml: `<block type="math_arithmetic" gap="8">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <field name="OP">DIVIDE</field>
                    </block>`
            }, {
                name: "math_number",
                attributes: {
                    blockId: "math_number",
                    weight: 86
                },
                blockXml: `<block type="math_number" gap="8">
                        <field name="NUM">0</field>
                    </block>`
            }, {
                name: "math_modulo",
                attributes: {
                    blockId: "math_modulo",
                    weight: 85
                },
                blockXml: `<block type="math_modulo">
                        <value name="DIVIDEND">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="DIVISOR">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
            }, {
                name: "math_op2_min",
                attributes: {
                    blockId: "math_op2",
                    weight: 84
                },
                blockXml: `<block type="math_op2" gap="8">
                        <value name="x">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="y">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <field name="op">min</field>
                    </block>`
            }, {
                name: "math_op2_max",
                attributes: {
                    blockId: "math_op2",
                    weight: 83
                },
                blockXml: `<block type="math_op2" gap="8">
                        <value name="x">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="y">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <field name="op">max</field>
                    </block>`
            }, {
                name: "math_op3",
                attributes: {
                    blockId: "math_op3",
                    weight: 82
                },
                blockXml: `<block type="math_op3">
                        <value name="x">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            }, {
                name: "math_js_op",
                attributes: {
                    blockId: "math_js_op",
                    weight: 81
                },
                blockXml: `<block type="math_js_op">
                        <field name="OP">sqrt</field>
                        <value name="ARG0">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            }, {
                name: "math_js_round",
                attributes: {
                    blockId: "math_js_round",
                    weight: 80
                },
                blockXml: `<block type="math_js_round">
                        <field name="OP">round</field>
                        <value name="ARG0">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            }
        ],
        attributes: {
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            weight: 50.06,
            icon: "math",
            paramDefl: {}
        }
    };
    categories[CategoryNameID.Functions] = {
        name: lf("{id:category}Functions"),
        nameid: CategoryNameID.Functions,
        blocks: [],
        custom: true,
        customClick: () => {
            //theEditor.showFunctionsFlyout();
            return false;
        },
        attributes: {
            advanced: true,
            weight: 50.08,
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            icon: "functions",
            paramDefl: {}
        }
    };
    categories[CategoryNameID.Arrays] = {
        name: lf("{id:category}Arrays"),
        nameid: CategoryNameID.Arrays,
        blocks: [
            {
                name: "lists_create_with",
                attributes: {
                    blockId: "lists_create_with",
                    weight: 90
                },
                blockXml: `<block type="variables_set" gap="8">
                        <field name="VAR" variabletype="">${lf("{id:var}list")}</field>
                        <value name="VALUE">
                            <block type="lists_create_with">
                                <mutation items="2"></mutation>
                                <value name="ADD0">
                                    <shadow type="math_number">
                                        <field name="NUM">1</field>
                                    </shadow>
                                </value>
                                <value name="ADD1">
                                    <shadow type="math_number">
                                        <field name="NUM">2</field>
                                    </shadow>
                                </value>
                            </block>
                        </value>
                    </block>`
            }, {
                name: "lists_create_with",
                attributes: {
                    blockId: "lists_create_with",
                    weight: 89
                },
                blockXml: `<block type="variables_set">
                        <field name="VAR" variabletype="">${lf("{id:var}text list")}</field>
                        <value name="VALUE">
                            <block type="lists_create_with">
                                <mutation items="3"></mutation>
                                <value name="ADD0">
                                    <shadow type="text">
                                        <field name="TEXT">${lf("a")}</field>
                                    </shadow>
                                </value>
                                <value name="ADD1">
                                    <shadow type="text">
                                        <field name="TEXT">${lf("b")}</field>
                                    </shadow>
                                </value>
                                <value name="ADD2">
                                    <shadow type="text">
                                        <field name="TEXT">${lf("c")}</field>
                                    </shadow>
                                </value>
                            </block>
                        </value>
                    </block>`
            }, {
                name: "lists_create_with",
                attributes: {
                    blockId: "lists_create_with",
                    weight: 5
                },
                blockXml: `<block type="lists_create_with">
                        <mutation items="0"></mutation>
                    </block>`
            },
            {
                name: "lists_index_get",
                attributes: {
                    blockId: "lists_index_get",
                    weight: 87
                },
                blockXml: `<block type="lists_index_get">
                        <value name="LIST">
                            <block type="variables_get">
                                <field name="VAR">${lf("{id:var}list")}</field>
                            </block>
                        </value>
                        <value name="INDEX">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            },
            {
                name: "lists_index_set",
                attributes: {
                    blockId: "lists_index_set",
                    weight: 86
                },
                blockXml: `<block type="lists_index_set">
                        <value name="INDEX">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="LIST">
                            <block type="variables_get">
                                <field name="VAR">${lf("{id:var}list")}</field>
                            </block>
                        </value>
                    </block>`
            },
            {
                name: "lists_length",
                attributes: {
                    blockId: "lists_length",
                    weight: 88
                },
                blockXml: `<block type="lists_length">
                        <value name="VALUE">
                            <block type="variables_get">
                                <field name="VAR">${lf("{id:var}list")}</field>
                            </block>
                        </value>
                    </block>`
            }
        ],
        attributes: {
            advanced: true,
            weight: 50.07,
            icon: "arrays",
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            paramDefl: {}
        }
    };
    categories[CategoryNameID.Text] = {
        name: lf("{id:category}Text"),
        nameid: CategoryNameID.Text,
        blocks: [
            {
                name: "text",
                attributes: {
                    blockId: "text",
                    weight: 90
                },
                blockXml: `<block type="text"></block>`
            }, {
                name: "text_length",
                attributes: {
                    blockId: "text_length",
                    weight: 89
                },
                blockXml: `<block type="text_length">
                        <value name="VALUE">
                            <shadow type="text">
                                <field name="TEXT">${lf("Hello")}</field>
                            </shadow>
                        </value>
                    </block>`
            }, {
                name: "text_join",
                attributes: {
                    blockId: "text_join",
                    weight: 88
                },
                blockXml: `<block type="text_join">
                        <mutation items="2"></mutation>
                        <value name="ADD0">
                            <shadow type="text">
                                <field name="TEXT">${lf("Hello")}</field>
                            </shadow>
                        </value>
                        <value name="ADD1">
                            <shadow type="text">
                                <field name="TEXT">${lf("World")}</field>
                            </shadow>
                        </value>
                    </block>`
            }
        ],
        attributes: {
            advanced: true,
            weight: 50.06,
            icon: "text",
            //callingConvention: ts.pxtc.ir.CallingConvention.Plain,
            paramDefl: {}
        }
    };
    return categories;
}
*/

let categories: ToolboxCategory[] = [];

export const moreCategory: ToolboxCategory = {
    name: "More",
    color: "more",
    icon: "\uf005",
    subcategories: []
};

categories.push({
    color: "#c94e4e",
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

    subcategories: [
        {
            ...moreCategory,

            blocks: [
                {
                    name: "logic_null",
                    xml: Blocks.logic.logic_null
                },
                {
                    name: "logic_ternary",
                    xml: Blocks.logic.logic_ternary
                }
            ]
        }
    ], // ToolboxCategory
    advanced: false
});

categories.push({
    name: "Loops",
    icon: "\uf2f1",
    color: "#3c4c9c",

    blocks: [
        {
            name: "loops_repeat_ext",
            xml: Blocks.loops.controls_repeat_ext
        },
        {
            name: "loops_repeat",
            xml: Blocks.loops.controls_repeat
        },
        {
            name: "loops_while",
            xml: Blocks.loops.controls_whileuntil
        },
        {
            name: "loops_for",
            xml: Blocks.loops.controls_for
        }
    ],

    subcategories: [
        {
            ...moreCategory,

            blocks: [
                {
                    name: "loops_foreach",
                    xml: Blocks.loops.controls_foreach
                },
                {
                    name: "loops_flowcontrol",
                    xml: Blocks.loops.controls_flow_statements
                },
            ]
        }
    ]
});

categories.push({
    name: "Math",
    color: "#91ca55",
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
    color: "#3c70ac",
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
            /*{
                name: "text_trim",
                xml: Blocks.text.text_trim
            },
            {
                name: "text_count",
                xml: Blocks.text.text_count
            },*/
            {
                name: "text_replace",
                xml: Blocks.text.text_replace
            },
            /*{
                name: "text_reverse",
                xml: Blocks.text.text_reverse
            },*/

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
    color: "#364652",
    special: ToolboxCategorySpecial.VARIABLES,

    blocks: [],
    subcategories: []
});

categories.push({
    name: "Functions",
    icon: "\uf013",
    color: "#50c45f",
    special: ToolboxCategorySpecial.FUNCTIONS,

    blocks: [],
    subcategories: []
});

categories.push({
    name: "I/O",
    icon: "\uf360",
    color: "#744780",

    blocks: [
        {
            name: "vibrate",
            xml: Blocks.phone.vibrate
        },
        {
            name: "button_action",
            xml: Blocks.phone.button_action
        },
        {
            name: "joystick",
            xml: Blocks.phone.joystick
        },
        {
            name: "led_colour",
            xml: Blocks.phone.led_colour
        },
        {
            name: "led_on",
            xml: Blocks.phone.led_on
        },
        {
            name: "led_off",
            xml: Blocks.phone.led_off
        }
    ],
    subcategories: []
});

categories.push({
    name: "Display",
    icon: "\uf108",
    color: "#ff9100",

    blocks: [
        {
            name: "display_colour",
            xml: Blocks.display.colour
        },
        {
            name: "display_popup",
            xml: Blocks.display.popup
        },
        {
            name: "display_clear",
            xml: Blocks.display.clear
        },
        {
            name: "display_invert",
            xml: Blocks.display.invert
        },

        {
            name: "display_fontsize",
            group: "Text",
            xml: Blocks.display.fontsize
        },
        {
            name: "display_fonttype",
            group: "Text",
            xml: Blocks.display.fonttype
        },
        {
            name: "display_fontcolour",
            group: "Text",
            xml: Blocks.display.fontcolour
        },
        {
            name: "display_fontcolour",
            group: "Text",
            xml: Blocks.display.println
        },
        {
            name: "draw_text",
            group: "Text",
            xml: Blocks.display.drawtext
        },

        {
            name: "draw_rect",
            group: "Shapes",
            xml: Blocks.display.drawrect
        },
        {
            name: "draw_circle",
            group: "Shapes",
            xml: Blocks.display.drawcircle
        },
        {
            name: "draw_ellipse",
            group: "Shapes",
            xml: Blocks.display.drawellipse
        },
        {
            name: "draw_triangle",
            group: "Shapes",
            xml: Blocks.display.drawtriangle
        }
    ],
    subcategories: []
});

categories.push({
    name: "Time",
    icon: "\uf2f2",
    color: "#ec652f",

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
            name: "time_micros",
            xml: Blocks.time.time_micros
        },
        {
            name: "time_millis",
            xml: Blocks.time.time_millis
        }
    ]
});

export function getCategories(): ToolboxCategory[] {
    return categories;
}