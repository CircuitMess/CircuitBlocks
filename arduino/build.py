import re

'''
 ## Please don't lynch me....
'''

files = [
        "header.js",

        "extensions/core/procedures.js",
        "extensions/core/block.js",

        "extensions/type.js",
        "extensions/types.js",
        "extensions/static_typing.js",
        "extensions/block_types.js",
        "extensions/block_var_types.js",
        "extensions/field_instance.js",
        "extensions/instances.js",

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

        "msg/arduino.js",

        "footer.js"
    ]

OUTPUT = "../src/BlocklyDuino.js"

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
    print("Combining JS files:")

    code = ""

    for file in files:
        print(file)

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

    print("")
    print("Writing to " + OUTPUT)

    f = open(OUTPUT, "w")
    f.write(code)
    f.close()

    print("Done")