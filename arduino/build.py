import re

'''
 ## Please don't lynch me....
'''

files = [
        "extensions/type.js",
        "extensions/types.js",
        "extensions/static_typing.js",

        "blocks/io.js",
        "blocks/logo.js",
        "blocks/map.js",
        "blocks/procedures.js",
        "blocks/serial.js",
        "blocks/servo.js",
        "blocks/spi.js",
        "blocks/stepper.js",
        "blocks/time.js",
        "blocks/tone.js",
        "blocks/variables.js",

        "generators/arduino.js",
        "generators/arduino/boards.js",
        "generators/arduino/colour.js",
        "generators/arduino/io.js",
        "generators/arduino/lists.js",
        "generators/arduino/logic.js",
        "generators/arduino/loops.js",
        "generators/arduino/map.js",
        "generators/arduino/math.js",
        "generators/arduino/procedures.js",
        "generators/arduino/serial.js",
        "generators/arduino/servo.js",
        "generators/arduino/spi.js",
        "generators/arduino/stepper.js",
        "generators/arduino/text.js",
        "generators/arduino/time.js",
        "generators/arduino/tone.js",
        "generators/arduino/variables.js",

        "msg/arduino.js"
    ]

OUTPUT = "../src/BlocklyDuino.js"

HEADER = "import Blockly from \"node-blockly/browser\";\n\nlet goog = { isArray: Array.isArray, isString: function(val) { return typeof val == 'string'; } };\n\n"
FOOTER = "\nexport default Blockly;"

googRegex = re.compile("goog\.(require|provide)\(\s*[\"'](.*)[\"']\s*\)")

def goog(line):
    tokens = googRegex.search(line)

    if line.startswith("goog.require"):
        what = tokens.group(2)
        return what + " = " + what + " || {};"

    elif line.startswith("goog.provide"):
        return tokens.group(2) + " = {};"

    else:
        return "\n"

if __name__ == "__main__":
    code = ""

    for file in files:
        code += "// " + file + "\n"

        f = open(file, "r")
        lines = f.readlines()

        for line in lines:
            if "use strict" in line:
                continue

            if line.startswith("goog"):
                code += goog(line)
            else:
                code += line

        code += "\n"
        f.close()

    f = open(OUTPUT, "w")
    f.write(HEADER + code + FOOTER)
    f.close()