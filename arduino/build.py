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
HEADER += "import Blockly from 'node-blockly/browser-raw';"
# self global doesn't exist in react
HEADER += "var self = window.self;"
FOOTER = "export default Blockly;"

DEPS = [ "Blockly.Blocks", "Blockly.Block", "Blockly.Procedures", "Blockly.Generator", "Blockly.Msg", "Blockly.FieldDropdown", "Blockly.utils", "Blockly.Workspace" ]

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
        self._stdout = sys.stdout
        self._stderr = sys.stderr

        self.out = StringIO()
        self.err = StringIO()

        sys.stdout = self.out
        sys.stderr = self.err

        return self

    def __exit__(self, *args):
        self.out = self.out.getvalue().splitlines()
        self.err = self.err.getvalue().splitlines()

        sys.stdout = self._stdout
        sys.stderr = self._stderr


if __name__ == "__main__":
    closure = os.getenv("CLOSURE_LIB", "")

    if closure == "":
        print("Closure lib path not specified, specify it with CLOSURE_LIB env variable")
        exit(1)

    try:
        deps = import_path(os.path.join(closure, "closure", "bin", "build", "closurebuilder.py"))
    except ImportError:
        print("Error, read https://developers.google.com/blockly/hacking/closure")
        exit(1)

    sys.argv.append("--root=" + closure)
    sys.argv.append("--root=" + os.path.abspath(os.path.curdir))
    sys.argv.append("--namespace=Blockly.Ardu")

    # BlocklyDuino dependencies. Provided by Blockly node module, but need it written out so closure can compile
    depsInternal = ""
    for dep in DEPS:
        depsInternal += "goog.provide('" + dep + "');\n"

    # Temporary deps.js file so Closure dependency resolution can calculate import order
    depsFile = open("deps.js", "w")
    depsFile.write(depsInternal)
    depsFile.close()

    # Import order
    with StdCapture() as output:
        deps.main()

    # If there were any errors (info messages are written to stderr, usually only 3 lines if everything is OK)
    if len(output.err) > 3:
        print(output.err)
        exit(1)

    # Remove temporary dependency file
    os.remove("deps.js")

    sources = output.out  # type: list

    params = [
        ("compilation_level", "SIMPLE_OPTIMIZATIONS"),
        ("output_format", "json"),
        ("output_info", "compiled_code"),
        ("output_info", "warnings"),
        ("output_info", "errors"),
        ("output_info", "statistics")
    ]

    # Add Blockly and BlocklyDuino dependencies to code sent to the Closure compiler API
    params.append(("js_code", "goog.provide('Blockly'); Blockly = Blockly || {};"))
    params.append(("js_code", depsInternal))

    for source in sources:
        if os.path.basename(source) == "deps.js": continue

        f = open(source)
        params.append(("js_code", "".join(f.readlines())))
        f.close()

    sources.insert(0, "[ Internal Blockly ]")
    sources.insert(1, "[ Internal Deps ]")

    headers = {"Content-type": "application/x-www-form-urlencoded"}
    conn = httplib.HTTPSConnection("closure-compiler.appspot.com")
    conn.request("POST", "/compile", urllib.urlencode(params), headers)
    response = conn.getresponse()
    json_str = response.read()
    conn.close()
    json_data = json.loads(json_str)


    def file_lookup(name):
        if not name.startswith("Input_"):
            return "???"
        n = int(name[6:])
        return sources[n]

    if json_data.has_key("serverErrors"):
        errors = json_data["serverErrors"]
        for error in errors:
            print("SERVER ERROR: %s" % "../src/BlocklyDuino.js")
            print(error["error"])
    elif json_data.has_key("errors"):
        errors = json_data["errors"]
        for error in errors:
            print("FATAL ERROR")
            print(error["error"])
            if error["file"]:
                print("%s at line %d:" % (
                    file_lookup(error["file"]), error["lineno"]))
                print(error["line"])
                print((" " * error["charno"]) + "^")
            sys.exit(1)
    else:
        if json_data.has_key("warnings"):
            warnings = json_data["warnings"]
            for warning in warnings:
                print("WARNING")
                print(warning["warning"])
                if warning["file"]:
                    print("%s at line %d:" % (
                        file_lookup(warning["file"]), warning["lineno"]))
                    print(warning["line"])
                    print((" " * warning["charno"]) + "^")
            print()

    code = HEADER + json_data["compiledCode"] + FOOTER

    # Remove Blockly and BlocklyDuino dependencies from compiled code
    code = code.replace("var Blockly=Blockly||{};", "")

    for dep in DEPS:
        code = code.replace(dep + "={};", "")

    # Write compiled code
    output = open("../src/BlocklyDuino.js", "w")
    output.write(code)
    output.close()
