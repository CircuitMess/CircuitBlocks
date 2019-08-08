goog.require("Blockly.Block");

// TODO: check

/**
 * DEPRECATED Return all variables referenced by this block.
 * @return {!Array.<string>} List of variable names.
 */
/*Blockly.Block.prototype.getVars = function() {
  var vars = [];
  for (var i = 0, input; input = this.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldVariable) {
        vars.push(field.getValue());
      }
    }
  }
  return vars;
};*/

/**
 * Notification that a variable is renaming.
 * If the name matches one of this block's variables, rename it.
 * @param {string} oldName Previous name of variable.
 * @param {string} newName Renamed variable.
 */
Blockly.Block.prototype.renameVar = function(oldName, newName) {
  for (var i = 0, input; input = this.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldVariable &&
        Blockly.Names.equals(oldName, field.getValue())) {
        field.setValue(newName);
      }
    }
  }
};

/**
 * Return all instances referenced by this block.
 * @param {string=} opt_instanceType Optional type of the instances to collect,
 *     if not defined it collects all instances.
 * @return {!Array.<string>} List of instance names.
 */
Blockly.Block.prototype.getInstances = function(opt_instanceType) {
  var vars = [];
  for (var i = 0, input; input = this.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldInstance) {
        var validInstance = opt_instanceType ?
          field.getInstanceTypeValue(opt_instanceType) :
          field.getValue();
        if (validInstance) {
          vars.push(validInstance);
        }
      }
    }
  }
  return vars;
};

/**
 * Notification that a instance is renaming.
 * If the name and type matches one of this block's instances, rename it.
 * @param {string} oldName Previous name of the instance.
 * @param {string} newName Renamed instance.
 * @param {string} instanceType Type of the instances to rename.
 */
Blockly.Block.prototype.renameInstance = function(
  oldName, newName, instanceType) {
  for (var i = 0, input; input = this.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldInstance) {
        var validInstance = field.getInstanceTypeValue(instanceType);
        if (validInstance && Blockly.Names.equals(oldName, validInstance)) {
          field.setValue(newName);
        }
      }
    }
  }
};