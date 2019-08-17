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
# self global doesn't exist in react
HEADER += "var self = window.self;"

FOOTER = "export default Blockly;"

OUTPUT = "src/Blockly.js"

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

def calcSources(roots):
    try:
        treescan = import_path(os.path.join(closure_library, "closure", "bin", "build", "treescan.py"))
        depstree = import_path(os.path.join(closure_library, "closure", "bin", "build", "depstree.py"))
        builder = import_path(os.path.join(closure_library, "closure", "bin", "build", "closurebuilder.py"))
    except ImportError:
        print("Error importing dependencies")
        exit(1)

    sources = set()

    msg = os.path.join("pxt-blockly", "msg", "js", "en.js")

    for root in roots:
        for js_path in treescan.ScanTreeForJsFiles(root):
            if js_path.endswith(msg): continue
            sources.add(builder._PathSource(js_path))

    tree = depstree.DepsTree(sources)

    namespaces = set(["Blockly.Ardu", "Blockly"])

    base = builder._GetClosureBaseFile(sources)
    deps = [base] + tree.GetDependencies(namespaces)

    return [js_source.GetPath() + '\n' for js_source in deps]

if __name__ == "__main__":
    closure_library = os.getenv("CLOSURE_LIB", "")
    closure_compiler = os.getenv("CLOSURE_COMPILER", "")

    if closure_library == "":
        print("Closure lib path not specified, specify it with CLOSURE_LIB env variable")
        exit(1)

    if closure_compiler == "":
        print("Closure compiler path not specified, specify it with CLOSURE_COMPILER env variable")
        exit(1)

    print("Closure library path: " + closure_library)
    print("Closure compiler path: " + closure_compiler)
    print("")

    try:
        jscompiler = import_path(os.path.join(closure_library, "closure", "bin", "build", "jscompiler.py"))
    except ImportError:
        print("Error importing dependencies")
        exit(1)

    roots = [
        closure_library,
        os.path.abspath(os.path.join(os.path.curdir, "pxt-blockly")),
        os.path.abspath(os.path.join(os.path.curdir, "arduino"))
    ]

    # Patch pxt-blockly/blocks/procedures.js
    with open("pxt-blockly/blocks/procedures.js", "r+a") as procedures:
        proceduresBackup = procedures.read()
        procedures.seek(0)
        procedures.write("goog.provide('Blockly.Constants.Procedures');/*\n")

    print("Calculating dependencies...")
    sources = calcSources(roots)

    try:
        jscompiler = import_path(os.path.join(closure_library, "closure", "bin", "build", "jscompiler.py"))
    except ImportError:
        print("Error importing jscompiler")
        exit(1)

    # Compile
    print("Compiling...")
    compiled = jscompiler.Compile(closure_compiler,
                     sources,
                     jvm_flags=None,
                     compiler_flags=["--compilation_level=SIMPLE"])
    print("")

    # Write compiled code
    print("Writing to " + OUTPUT)
    code = HEADER + compiled + FOOTER
    output = open(OUTPUT, "w")
    output.write(code)
    output.close()

    # Revert pxt-blockly/blocks/procedures.js
    with open("pxt-blockly/blocks/procedures.js", "w") as procedures:
        procedures.write(proceduresBackup)

    print("Done.")
