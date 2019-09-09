
goog.require("Blockly.Functions");

goog.provide("Blockly.Ext.Functions");

const goog = Blockly.goog;

const flyoutCategory_ = Blockly.Functions.flyoutCategory;

Blockly.Functions.flyoutCategory = function(workspace) {
    var xmlList = flyoutCategory_(workspace);

    function populateFunctions(functionList, templateName) {
        for (var i = 0; i < functionList.length; i++) {
            var name = functionList[i].getName();
            var args = functionList[i].getArguments();
            // <block type="function_call" x="25" y="25">
            //   <mutation name="myFunc">
            //     <arg name="bool" type="boolean" id="..."></arg>
            //     <arg name="text" type="string" id="..."></arg>
            //     <arg name="num" type="number" id="..."></arg>
            //   </mutation>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', templateName);
            block.setAttribute('gap', 16);
            var mutation = goog.dom.createDom('mutation');
            mutation.setAttribute('name', name);
            block.appendChild(mutation);
            for (var j = 0; j < args.length; j++) {
                var arg = goog.dom.createDom('arg');
                arg.setAttribute('name', args[j].name);
                arg.setAttribute('type', args[j].type);
                arg.setAttribute('id', args[j].id);
                mutation.appendChild(arg);
            }
            xmlList.push(block);
        }
    }

    var existingFunctions = Blockly.Functions.getAllFunctionDefinitionBlocks(workspace);
    populateFunctions(existingFunctions, 'function_callreturn');
    return xmlList;
};

