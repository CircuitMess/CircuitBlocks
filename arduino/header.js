import Blockly from "node-blockly/browser";

let goog = {
  isArray: Array.isArray,

  isString: function(val) {
    return typeof val == 'string';
  }
};