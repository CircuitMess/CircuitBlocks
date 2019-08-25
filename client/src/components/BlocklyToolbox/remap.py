import os
import re

class CategoryWriter:
    def __init__(self, output):
        self.output = output
        self.nameRegex = re.compile(".*name=['\"](.*?)['\"]")

    def enter(self, line):
        name = self.nameRegex.findall(line)[0]
        self.output.write("    public " + name.lower().replace("/", "_") + ": object = {\n")

    def exit(self):
        self.output.write("    };\n\n")


class BlockWriter:
    def __init__(self, output):
        self.output = output
        self.nameRegex = re.compile(".*type=['\"](.*?)['\"]")
        self.inside = False
        self.level = 0

    def enter(self, line):
        if self.inside:
            self.level = self.level+1
            self.line(line)
            return

        name = self.nameRegex.findall(line)[0]
        self.output.write("        " + name.lower() + ": '")
        self.line(line)
        self.inside = True

    def line(self, line):
        self.output.write(line)

    def exit(self):
        if self.level != 0:
            self.level = self.level-1
            return

        self.output.write("',\n")
        self.inside = False


def main():
    input = open(os.path.join("..", "..", "public", "xmls", "pxt-toolbox.xml"))
    output = open("blocks.ts", "w")

    lines = input.read().splitlines()
    input.close()

    category = CategoryWriter(output)
    block = BlockWriter(output)

    output.write("export class Blocks {\n\n")

    for line in lines:
        line = line.strip()

        if line.startswith("<category"):
            category.enter(line)

            if line.endswith("</category>"):
                category.exit()

        elif line.startswith("</category"):
            category.exit()

        elif line.startswith("<block"):
            block.enter(line)

            if line.endswith("</block>"):
                block.exit()

        elif line.startswith("</block"):
            block.exit()

        elif block.inside:
            block.line(line)

    output.write("}")
    output.close()



if __name__ == "__main__":
    main()