import { ToolboxCategory } from "../Toolbox";
import { Blocks } from './blocks'

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

categories.push({
    color: "#1e90ff",
    icon: "\uf005",
    name: "Basic",

    blocks: [],
    subcategories: [{
        color: "#1e90ff",
        icon: "\uf005",
        name: "More",

        subcategories: []
    }], // ToolboxCategory
    advanced: false
});

categories.push({
    color: "#006970",
    icon: "\uf074",
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
            color: "#006970",
            icon: "\uf005",
            name: "More",

            blocks: [
                {
                    name: "logic_null",
                    xml: Blocks.logic.logic_null
                },
                {
                    name: "logic_ternary",
                    xml: Blocks.logic.logic_ternary
                }
            ],
            subcategories: []
        }
    ], // ToolboxCategory
    advanced: false
});

export function getCategories(): ToolboxCategory[] {
    return categories;
}