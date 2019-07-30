import re

'''
 ## Please don't lynch me....
'''

files = [
        "js/arduino_boards.js",

        "blocks/colors.js",
        "blocks/arduino_base/arduino_base.js",
        "blocks/grove/grove.js",
        "blocks/servo/servo.js",

        "generators/arduino.js",
        "generators/arduino/blockly/colour.js",
        "generators/arduino/blockly/lists.js",
        "generators/arduino/blockly/logic.js",
        "generators/arduino/blockly/loops.js",
        "generators/arduino/blockly/math.js",
        "generators/arduino/blockly/procedures.js",
        "generators/arduino/blockly/text.js",
        "generators/arduino/blockly/variables.js",
        "generators/arduino/blockly/variables_dynamic.js",

        "generators/arduino/arduino_base.js",
        "generators/arduino/addon/grove.js",
        "generators/arduino/addon/servo.js",

        "themes/bw.js",
        "themes/classic.js",
        "themes/highcontrast.js",
        "themes/modern.js",

        "msg/blocklyduino/en.js",
        "msg/blocks/en.js",
    ]

OUTPUT = "../src/BlocklyDuino.js"

HEADER = "import Blockly from \"node-blockly/browser\";\n\n"
FOOTER = "\nexport default Blockly;"

provideRegex = re.compile("goog\.provide\(\s*[\"'](.*)[\"']\s*\)")

def googProvide(line):
    if line.startswith("goog.require"):
        return "\n"

    tokens = provideRegex.search(line)
    return tokens.group(1) + " = {};"

if __name__ == "__main__":
    code = ""

    for file in files:
        f = open(file, "r")
        lines = f.readlines()

        for line in lines:
            if "use strict" in line:
                continue

            if line.startswith("goog"):
                code += googProvide(line)
            else:
                code += line

        code += "\n"
        f.close()

    f = open(OUTPUT, "w")
    f.write(HEADER + code + FOOTER)
    f.close()