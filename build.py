#!/bin/python

import os
import sys
import httplib
import urllib
import json
from StringIO import StringIO

"""
    Script for bundling Arduino Blockly extensions into one Node.JS module.
    Based on build.py found in https://github.com/google/blockly
"""

# eslint doesn't play nice with closure compiled code
HEADER = "/* eslint no-unused-expressions: 0, no-undef: 0 */"
# HEADER += "import Blockly from 'node-blockly/browser-raw';"
# self global doesn't exist in react
HEADER += "var self = window.self;"
FOOTER = "export default Blockly;"

def import_path(path):
    """Import a file with full path specification.
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

class StdCapture(tuple):
    def __enter__(self):
        self.stdout = sys.stdout
        self.out = StringIO()
        sys.stdout = self.out

        return self

    def __exit__(self, *args):
        self.out = self.out.getvalue().splitlines()
        sys.stdout = self.stdout


if __name__ == "__main__":
    closure_library = os.getenv("CLOSURE_LIB", "")
    closure_compiler = os.getenv("CLOSURE_COMPILER", "")


    if closure_library == "":
        print("Closure lib path not specified, specify it with CLOSURE_LIB env variable")
        exit(1)

    if closure_compiler == "":
        print("Closure compiler path not specified, specify it with CLOSURE_COMPILER env variable")
        exit(1)

    try:
        deps = import_path(os.path.join(closure_library, "closure", "bin", "build", "closurebuilder.py"))
    except ImportError:
        print("Error, read https://developers.google.com/blockly/hacking/closure")
        exit(1)

    sys.argv.append("--root=" + closure_library)
    sys.argv.append("--root=" + os.path.abspath(os.path.join(os.path.curdir, "pxt-blockly")))
    sys.argv.append("--root=" + os.path.abspath(os.path.join(os.path.curdir, "arduino")))
    # sys.argv.append("--namespace=Blockly")
    sys.argv.append("--namespace=Blockly.Ardu")
    sys.argv.append("--namespace=Blockly")

    sys.argv.append("--compiler_jar=/home/filip/Downloads/closure-compiler-v20190729.jar")
    sys.argv.append("--output_mode=list")

    sys.argv.append("--compiler_flags='--language_out=STABLE'")
    sys.argv.append("--compiler_flags='--warning_level=VERBOSE'")

    # Patch pxt-blockly/blocks/procedures.js
    with open("pxt-blockly/blocks/procedures.js", "r+a") as procedures:
        proceduresBackup = procedures.read()
        procedures.seek(0)
        procedures.write("goog.provide('Blockly.Constants.Procedures');/*\n")

    with StdCapture() as output:
        deps.main()

    # print("\n".join(output.out))
    # exit(0)

    sources = output.out
    try:
        jscompiler = import_path(os.path.join(closure_library, "closure", "bin", "build", "jscompiler.py"))
    except ImportError:
        print("Error importing jscompiler")
        exit(1)

    compiled = jscompiler.Compile(closure_compiler,
                     sources,
                     jvm_flags=None,
                     compiler_flags=["--warning_level=DEFAULT", "--formatting=PRETTY_PRINT", "--compilation_level=SIMPLE"])

    code = HEADER + compiled + FOOTER
    # Write compiled code
    output = open("src/BlocklyDuino.js", "w")
    output.write(code)
    output.close()

    # Revert pxt-blockly/blocks/procedures.js
    with open("pxt-blockly/blocks/procedures.js", "w") as procedures:
        procedures.write(proceduresBackup)
