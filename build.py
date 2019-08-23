#!/bin/python

import os
import sys
import httplib
import urllib
import json
from StringIO import StringIO
import shutil

"""
    Script for bundling Arduino Blockly extensions into one Node.JS module.
    Based on build.py found in https://github.com/google/blockly
"""

# eslint doesn't play nice with closure compiled code
UNIHEADER = "/* eslint no-unused-expressions: 0, no-undef: 0 */"
# self global doesn't exist in react
UNIHEADER += "var self = window.self;"

BLOCKLY_PROVIDES = [ "Blockly", "Blockly.Block", "Blockly.FieldDropdown",
 "Blockly.Generator", "Blockly.Procedures", "Blockly.Workspace", "Blockly.Msg", "Blockly.utils" ]
BLOCKS_PROVIDES = [ "Blockly.Blocks", "Blockly.Colours", "Blockly.Constants.Logic", "Blockly.Constants.Loops",
 "Blockly.Constants.Math", "Blockly.Constants.Text", "Blockly.Constants.Procedures", "Blockly.Constants.Variables" ]

OUTPUT = os.path.join("client", "src", "blockly")

def import_path(path):
    """
    Import a file with full path specification.
    Allows one to import from any directory, something __import__ does not do.
    Args:
        path:  Path and filename of import.
    Returns:
        An imported module.
    """
    path, filename = os.path.split(path)
    filename, ext = os.path.splitext(filename)
    sys.path.append(path)
    module = __import__(filename)
    reload(module)  # Might be out of date.
    del sys.path[-1]
    return module

def copy(file, provides, requires = None):
    input = open(os.path.join("..", "pxt-blockly", file), "r")
    output = open(os.path.join(OUTPUT, file), "w")

    output.write(UNIHEADER + "\n")

    if requires is not None:
        for require in requires:
                output.write("goog.require('" + require + "');\n")

    for provide in provides:
        output.write("goog.provide('" + provide + "');\n")

    output.write(input.read())

    input.close()
    output.close()

if __name__ == "__main__":
    print("Compiling PXT Blockly...")

    try:
        pxt = import_path(os.path.join("..", "pxt-blockly", "build.py"))
    except ImportError:
        print("Error importing ../pxt-blockly/build.py")
        exit(1)

    print("Copying files...")

    copy("blockly_compressed.js", BLOCKLY_PROVIDES)
    copy("blocks_compressed.js", BLOCKS_PROVIDES, [ "Blockly" ])

    shutil.copy(os.path.join("..", "pxt-blockly", "msg", "messages.js"), os.path.join(OUTPUT, "en.js"))

    print("Done.")
