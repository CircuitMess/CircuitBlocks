import Blockly from "node-blockly/browser-raw";

let goog = {
  isArray: Array.isArray,

  isString: function(val) {
    return typeof val == 'string';
  }
};