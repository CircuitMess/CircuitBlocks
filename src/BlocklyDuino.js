import Blockly from "node-blockly/browser";

let goog = { isArray: Array.isArray, isString: function(val) { return typeof val == 'string'; } };

// extensions/type.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Object that defines Types that can then be converted to
 *     language specific types in each language generator.
 */

Blockly.Type = {};
goog.asserts = goog.asserts || {};

/**
 * Blockly Type class constructor.
 * @param {Object} args Object/dictionary with typeId, typeMsgName, and
 *     compatibleTypes.
 * @constructor
 */
Blockly.Type = function(args) {
  if ((args.typeId === undefined) || (args.typeMsgName === undefined) ||
    (args.compatibleTypes === undefined)) {
    throw new Error('Creating a Type requires the following format:\n{\n' +
      '  typeId: string,\n' +
      '  typeMsgName: Blockly.Msg string member var name to\n' +
      '               identify the translatable Type name.\n' +
      '  compatibleTypes: [Blockly.Type,]\n}');
  }
  if (!goog.isArray(args.compatibleTypes)) {
    throw new Error('The compatible types for a Blockly Types needs to be an ' +
      'array of Blockly.Type items.');
  }
  /** @type {string} */
  this.typeId = args.typeId;
  /** @type {string}
   * This is the translatable Blockly.Msg member string name.
   * @private
   */
  this.typeMsgName_ = args.typeMsgName;
  /**
   * @type {Array<Blockly.Type>}
   * @private
   */
  this.compatibleTypes_ = args.compatibleTypes;
  this.compatibleTypes_.push(this);
  /**
   * @type {Array<string>}
   * @private
   */
  this.generatedCheckList_ = [];
  this.generateCheckList_();
};

/** Getter for the typeName property, used for translatable Type naming. */
Object.defineProperty(Blockly.Type.prototype, 'typeName', {
  get: function() {
    return Blockly.Msg[this.typeMsgName_] || this.typeId;
  },
  set: function(value) {
    console.warn('"Blockly.Type" property "typeName" is not allowed to be set.');
  }
});

/** Getter for the output property, used for block output types. */
Object.defineProperty(Blockly.Type.prototype, 'output', {
  get: function() {
    return this.typeId;
  },
  set: function(value) {
    console.warn('"Blockly.Type" property "output" is not allowed to be set.');
  }
});

/** Getter for the check property, use for block input checks. */
Object.defineProperty(Blockly.Type.prototype, 'checkList', {
  get : function() {
    return this.generatedCheckList_;
  },
  set: function(value) {
    console.warn('"Blockly.Type" property "check" is not allowed to be set.');
  }
});

/**
 * Generates the Type check list for the blocks input.
 * @param {!Blockly.Type} compatibleType New type to add to compatibility list.
 * @private
 */
Blockly.Type.prototype.generateCheckList_ = function(compatibleType) {
  this.generatedCheckList_ = [];
  for (var i = 0; i < this.compatibleTypes_.length; i++) {
    var unique = true;
    for (var j = 0; j < this.generatedCheckList_.length; j++) {
      if (this.generatedCheckList_[j] === this.compatibleTypes_[i].typeId) {
        unique = false;
      }
    }
    if (unique) {
      this.generatedCheckList_.push(this.compatibleTypes_[i].typeId);
    }
  }
};

/**
 * Adds a new type to be compatible with this one.
 * @param {!Blockly.Type} compatibleType New type to add to compatibility list.
 */
Blockly.Type.prototype.addCompatibleType = function(compatibleType) {
  if (!compatibleType || !compatibleType.constructor ||
    !(compatibleType instanceof Blockly.Type)) {
    throw new Error('To add a compatible type to ' + this.typeId +
      ' provide a Blockly.Type object.');
  }
  this.compatibleTypes_.push(compatibleType);
  this.generateCheckList_();
};

/**
 * Adds an array of new types to be compatible with this one.
 * @param {!Array<Blockly.Type>} compatibleTypeArray Array of new type to add to
 *     compatibility list.
 */
Blockly.Type.prototype.addCompatibleTypes = function(compatibleTypeArray) {
  if (!goog.isArray(compatibleTypeArray)) {
    throw new Error('To add compatible types to the Blockly Type ' +
      this.typeId +' provide an array of Blockly.Type items.');
  }
  for (var i = 0; i < compatibleTypeArray.length; i++) {
    if (!compatibleTypeArray[i] || !compatibleTypeArray[i].constructor ||
      !(compatibleTypeArray[i] instanceof Blockly.Type)) {
      throw new Error('To add a compatible type to ' + this.typeId + ' you ' +
        'must point to a Blockly.Type object.');
    }
    this.compatibleTypes_.push(compatibleTypeArray[i]);
  }
  this.generateCheckList_();
};

// extensions/types.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blockly Types declarations and helper functions to identify
 *     types.
 */

Blockly.Types = {};
Blockly.Type = Blockly.Type || {};
/** Single character. */
Blockly.Types.CHARACTER = new Blockly.Type({
  typeId: 'Character',
  typeMsgName: 'ARD_TYPE_CHAR',
  compatibleTypes: []
});

/** Text string. */
Blockly.Types.TEXT = new Blockly.Type({
  typeId: 'Text',
  typeMsgName: 'ARD_TYPE_TEXT',
  compatibleTypes: [Blockly.Types.CHARACTER]
});

/** Boolean. */
Blockly.Types.BOOLEAN = new Blockly.Type({
  typeId: 'Boolean',
  typeMsgName: 'ARD_TYPE_BOOL',
  compatibleTypes: []
});

/** Short integer number. */
Blockly.Types.SHORT_NUMBER = new Blockly.Type({
  typeId: 'Short Number',
  typeMsgName: 'ARD_TYPE_SHORT',
  compatibleTypes: []    // Circular dependencies, add after all declarations
});

/** Integer number. */
Blockly.Types.NUMBER = new Blockly.Type({
  typeId: 'Number',
  typeMsgName: 'ARD_TYPE_NUMBER',
  compatibleTypes: []    // Circular dependencies, add after all declarations
});

/** Large integer number. */
Blockly.Types.LARGE_NUMBER = new Blockly.Type({
  typeId: 'Large Number',
  typeMsgName: 'ARD_TYPE_LONG',
  compatibleTypes: []    // Circular dependencies, add after all declarations
});

/** Decimal/floating point number. */
Blockly.Types.DECIMAL = new Blockly.Type({
  typeId: 'Decimal',
  typeMsgName: 'ARD_TYPE_DECIMAL',
  compatibleTypes: [Blockly.Types.BOOLEAN,
    Blockly.Types.SHORT_NUMBER,
    Blockly.Types.NUMBER,
    Blockly.Types.LARGE_NUMBER]
});

/** Array/List of items. */
Blockly.Types.ARRAY = new Blockly.Type({
  typeId: 'Array',
  typeMsgName: 'ARD_TYPE_ARRAY',
  compatibleTypes: []
});

/** Null indicate there is no type. */
Blockly.Types.NULL = new Blockly.Type({
  typeId: 'Null',
  typeMsgName: 'ARD_TYPE_NULL',
  compatibleTypes: []
});

/** Type not defined, or not yet defined. */
Blockly.Types.UNDEF = new Blockly.Type({
  typeId: 'Undefined',
  typeMsgName: 'ARD_TYPE_UNDEF',
  compatibleTypes: []
});

/** Set when no child block (meant to define the variable type) is connected. */
Blockly.Types.CHILD_BLOCK_MISSING = new Blockly.Type({
  typeId: 'ChildBlockMissing',
  typeMsgName: 'ARD_TYPE_CHILDBLOCKMISSING',
  compatibleTypes: []
});

/**
 * Some Types have circular dependencies on their compatibilities, so add them
 * after declaration.
 */
Blockly.Types.NUMBER.addCompatibleTypes([
  Blockly.Types.BOOLEAN,
  Blockly.Types.SHORT_NUMBER,
  Blockly.Types.LARGE_NUMBER,
  Blockly.Types.DECIMAL]);

Blockly.Types.SHORT_NUMBER.addCompatibleTypes([
  Blockly.Types.BOOLEAN,
  Blockly.Types.NUMBER,
  Blockly.Types.LARGE_NUMBER,
  Blockly.Types.DECIMAL]);

Blockly.Types.LARGE_NUMBER.addCompatibleTypes([
  Blockly.Types.BOOLEAN,
  Blockly.Types.SHORT_NUMBER,
  Blockly.Types.NUMBER,
  Blockly.Types.DECIMAL]);


/**
 * Adds another type to the Blockly.Types collection.
 * @param {string} typeId_ Identifiable name of the type.
 * @param {string} typeMsgName_ Name of the member variable from Blockly.Msg
 *     object to identify the translateble string.for the Type name.
 * @param {Array<Blockly.Type>} compatibleTypes_ List of types this Type is
 *     compatible with.
 */
Blockly.Types.addType = function(typeId_, typeMsgName_, compatibleTypes_) {
  // The Id is used as the key from the value pair in the BlocklyTypes object
  var key = typeId_.toUpperCase().replace(/ /g, '_');
  if (Blockly.Types[key] !== undefined) {
    throw 'The Blockly type ' + key + ' already exists.';
  }
  Blockly.Types[key] = new Blockly.Type({
    typeId: typeId_,
    typeName: typeMsgName_,
    compatibleTypes: compatibleTypes_
  });
};

/**
 * Converts the static types dictionary in to a an array with 2-item arrays.
 * This array only contains the valid types, excluding any error or temp types.
 * @return {!Array<Array<string>>} Blockly types in the format described above.
 */
Blockly.Types.getValidTypeArray = function() {
  var typesArray = [];
  for (var typeKey in Blockly.Types) {
    if ((typeKey !== 'UNDEF') && (typeKey !== 'CHILD_BLOCK_MISSING') &&
      (typeKey !== 'NULL') && (typeKey !== 'ARRAY') &&
      (typeof Blockly.Types[typeKey] !== 'function') &&
      !(Blockly.Types[typeKey] instanceof RegExp)) {
      typesArray.push([Blockly.Types[typeKey].typeName, typeKey]);
    }
  }
  return typesArray;
};

/**
 * Navigates through child blocks of the argument block to get this block type.
 * @param {!Blockly.Block} block Block to navigate through children.
 * @return {Blockly.Type} Type of the input block.
 */
Blockly.Types.getChildBlockType = function(block) {
  var blockType = null;
  var nextBlock = block;
  // Only checks first input block, so it decides the type. Incoherences amongst
  // multiple inputs dealt at a per-block level with their own block warnings
  while (nextBlock && (nextBlock.getBlockType === undefined) &&
  (nextBlock.inputList.length > 0) &&
  (nextBlock.inputList[0].connection)) {
    nextBlock = nextBlock.inputList[0].connection.targetBlock();
  }
  if (nextBlock === block) {
    // Set variable block is empty, so no type yet
    blockType = Blockly.Types.CHILD_BLOCK_MISSING;
  } else if (nextBlock === null) {
    // Null return from targetBlock indicates no block connected
    blockType = Blockly.Types.CHILD_BLOCK_MISSING;
  } else {
    var func = nextBlock.getBlockType;
    if (func) {
      blockType = nextBlock.getBlockType();
    } else {
      // Most inner block, supposed to define a type, is missing getBlockType()
      blockType = Blockly.Types.NULL;
    }
  }
  return blockType;
};

/**
 * Regular expressions to identify an integer.
 * @private
 */
Blockly.Types.regExpInt_ = new RegExp(/^-?\d+$/);

/**
 * Regular expressions to identify a decimal.
 * @private
 */
Blockly.Types.regExpFloat_ = new RegExp(/^-?[0-9]*[.][0-9]+$/);

/**
 * Uses regular expressions to identify if the input number is an integer or a
 * floating point.
 * @param {string} numberString String of the number to identify.
 * @return {!Blockly.Type} Blockly type.
 */
Blockly.Types.identifyNumber = function(numberString) {
  if (Blockly.Types.regExpInt_.test(numberString)) {
    var intValue = parseInt(numberString);
    if (isNaN(intValue)) {
      return Blockly.Types.NULL;
    }
    if (intValue > 32767 || intValue < -32768) {
      return Blockly.Types.LARGE_NUMBER;
    }
    return Blockly.Types.NUMBER;
  } else if (Blockly.Types.regExpFloat_.test(numberString)) {
    return Blockly.Types.DECIMAL;
  }
  return Blockly.Types.NULL;
};


// extensions/static_typing.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Object that defines static objects and methods to assign
 *     Blockly types to Blockly blocks. These can then be converted to language
 *     specific types in each language generator.
 */

Blockly.StaticTyping = {};
Blockly.Block = Blockly.Block || {};Blockly.Type = Blockly.Type || {};Blockly.Types = Blockly.Types || {};Blockly.Workspace = Blockly.Workspace || {};goog.asserts = goog.asserts || {};
/**
 * Class for Static Typing.
 * @constructor
 */
Blockly.StaticTyping = function() {
  this.varTypeDict = Object.create(null);
  this.pendingVarTypeDict = Object.create(null);
};

/**
 * Navigates through all the statement blocks, collecting all variables and
 * their type into an associative array with the variable names as the keys and
 * the type as the values.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect variables.
 * @return {Object{ String: Blockly.Type, } Associative array with the variable
 *     names as the keys and the type as the values.
 */
Blockly.StaticTyping.prototype.collectVarsWithTypes = function(workspace) {
  this.varTypeDict = Object.create(null);
  this.pendingVarTypeDict = Object.create(null);
  var blocks = Blockly.StaticTyping.getAllStatementsOrdered(workspace);
  for (var i = 0; i < blocks.length; i++) {
    //blocks[i].select();  // for step debugging, highlights block in workspace
    // Each statement block iterates through its input children collecting vars
    var blockVarAndTypes = Blockly.StaticTyping.getBlockVars(blocks[i]);
    for (var j = 0; j < blockVarAndTypes.length; j++) {
      var variableName = blockVarAndTypes[j][0];
      var variableType = blockVarAndTypes[j][1];
      // If the type comes from a variable, so it's not directly defined, it
      // returns an Array<String(block type), String(source variable name)>
      if (goog.isArray(variableType)) {
        if (this.varTypeDict[variableType[1]]) {
          variableType = this.varTypeDict[variableType[1]];
        } else {
          // Dependant variable undefined, add this var to the pending list
          if (!goog.isArray(this.pendingVarTypeDict[variableType[1]])) {
            this.pendingVarTypeDict[variableType[1]] = [variableName];
          } else {
            this.pendingVarTypeDict[variableType[1]].push(variableName);
          }
          variableType = Blockly.Types.UNDEF;
        }
      }
      this.assignTypeToVars(blocks[i], variableName, variableType);
    }
  }
  return this.varTypeDict;
};

/**
 * Navigates through each top level block in the workspace to collect all
 * statement blocks, ordered from top left.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect blocks.
 * @return {Array<Blockly.Block>} Array containing all workspace statement
 *     blocks.
 */
Blockly.StaticTyping.getAllStatementsOrdered = function(workspace) {
  if (!workspace.getTopBlocks) {
    throw 'Not a valid workspace: ' + workspace;
  }

  /**
   * Navigates through each continuous block to collect all statement blocks.
   * Function required to use recursion for block input statements.
   * @param {Blockly.Block} startBlock Block to start iterating from..
   * @return {Array<Blockly.Block>} Array containing all continuous statement
   *     blocks.
   */
  var getAllContinuousStatements = function(startBlock) {
    var block = startBlock;
    var nextBlock = null;
    var connections = null;
    var blockNextConnection = null;
    var blocks = [];
    do {
      //block.select();    // for step debugging, highlights block in workspace
      blocks.push(block);
      blockNextConnection = block.nextConnection;
      connections = block.getConnections_();
      block = null;
      for (var j = 0; j < connections.length; j++) {
        if (connections[j].type == Blockly.NEXT_STATEMENT) {
          nextBlock = connections[j].targetBlock();
          if (nextBlock) {
            // If it is the next connection select it and move to the next block
            if (connections[j] === blockNextConnection) {
              block = nextBlock;
            } else {
              // Recursion as block children can have their own input statements
              blocks = blocks.concat(getAllContinuousStatements(nextBlock));
            }
          }
        }
      }
    } while (block);

    return blocks;
  };

  var allStatementBlocks = [];
  var topBlocks = workspace.getTopBlocks(true);
  for (var i = 0; i < topBlocks.length; i++) {
    allStatementBlocks = allStatementBlocks.concat(
      getAllContinuousStatements(topBlocks[i]));
  }

  return allStatementBlocks;
};

/**
 * Retrieves the input argument block variables with their set type.
 * @param {Blockly.Block} block Block to retrieve variables from.
 * @return {Array<Array<String, Blockly.Type>>} Two dimensional array with the
 *     block variable as the first item pair and variable type as the second.
 */
Blockly.StaticTyping.getBlockVars = function(block) {
  var blockVarAndTypes = [];
  var getVars = block.getVars;
  if (getVars) {
    var blockVariables = getVars.call(block);
    // Iterate through the variables used in this block
    for (var i = 0; i < blockVariables.length; i++) {
      var varName = blockVariables[i];
      var getVarType = block.getVarType;
      if (getVarType) {
        var varType = getVarType.call(block, varName);
        blockVarAndTypes.push([varName, varType]);
      } else {
        blockVarAndTypes.push([varName, Blockly.Types.NULL]);
      }
    }
  } // else: !(block.getVars), block does not define variables, so do nothing
  return blockVarAndTypes;
};

/**
 * Manages the associative array of variables with their type.
 * @param {Blockly.Block} block Blockly providing the variable to manage.
 * @param {string} varName Name of the variable to manage.
 * @param {Blockly.Type} varType Type assigned by current block.
 */
Blockly.StaticTyping.prototype.assignTypeToVars =
  function(block, varName, varType) {
    switch (this.varTypeDict[varName]) {
      // First time variable is encountered, or previously undefined
      case undefined:
      case Blockly.Types.UNDEF:
        this.varTypeDict[varName] = varType;
        if ((varType != Blockly.Types.UNDEF) &&
          (this.pendingVarTypeDict[varName] !== undefined)) {
          for (var i = 0; i < this.pendingVarTypeDict[varName].length; i++) {
            this.assignTypeToVars(
              block, this.pendingVarTypeDict[varName][i], varType);
          }
        }
        break;
      // Variable with valid type already registered
      default:
        this.setBlockTypeWarning(
          block, varType, varName, this.varTypeDict[varName]);
        break;
    }
  };

/**
 * When a block uses a variable this function can compare its type with the
 * variable type and set a warning if they are not the same or compatible.
 * @param {!Blockly.Block} block The block to manage its warning.
 * @param {!Blockly.Type} blockType The type of this block.
 * @param {!string} varName The variable name.
 */
Blockly.StaticTyping.prototype.setBlockTypeWarning =
  function(block, blockType, varName) {
    var warningLabel = 'varType';
    if ((blockType == Blockly.Types.CHILD_BLOCK_MISSING) ||
      (this.varTypeDict[varName] == Blockly.Types.CHILD_BLOCK_MISSING)) {
      // User still has to attach a block to this variable or its first
      // declaration, so for now do not display any warning
      block.setWarningText(null, warningLabel);
    } else if ((this.varTypeDict[varName] !== blockType) &&
      (blockType !== Blockly.Types.UNDEF)) {
      block.setWarningText('The variable ' + varName + ' has been first ' +
        'assigned to the "' + this.varTypeDict[varName].typeName + '" type\n' +
        'and this block tries to assign the type "' + blockType.typeName + '"!',
        warningLabel);
    } else {
      block.setWarningText(null, warningLabel);
    }
  };

/**
 * Iterates through the list of top level blocks and sets the function arguments
 * types.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect variables.
 */
Blockly.StaticTyping.prototype.setProcedureArgs = function(workspace) {
  var blocks = workspace.getTopBlocks();
  for (var i = 0, length_ = blocks.length; i < length_; i++) {
    var setArgsType = blocks[i].setArgsType;
    if (setArgsType) {
      setArgsType.call(blocks[i], this.varTypeDict);
    }
  }
};

// blocks/io.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */

Blockly.Blocks.io = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};
/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.io.HUE = 250;

Blockly.Blocks['io_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_DIGITALWRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_digitalread'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIGITALREAD)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_builtin_led'] = {
  /**
   * Block for setting built-in LED to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_BUILTIN_LED)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.builtinLed), 'BUILT_IN_LED')
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_BUILTIN_LED_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'BUILT_IN_LED', 'builtinLed');
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
};

Blockly.Blocks['io_analogwrite'] = {
  /**
   * Block for creating a 'set pin' to an analogue value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('NUM')
        .appendField(Blockly.Msg.ARD_ANALOGWRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'PIN')
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.NUMBER.output);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_ANALOGWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'pwmPins');
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

Blockly.Blocks['io_analogread'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ANALOGREAD)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};

Blockly.Blocks['io_highlow'] = {
  /**
   * Block for creating a pin state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.ARD_HIGH, 'HIGH'], [Blockly.Msg.ARD_LOW, 'LOW']]),
           'STATE');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_HIGHLOW_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};

Blockly.Blocks['io_pulsein'] = {
  /**
   * Block for measuring the duration of a pulse in an input pin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "math_foo",
      "message0": Blockly.Msg.ARD_PULSE_READ,
      "args0": [{
          "type": "input_value",
          "name": "PULSETYPE",
          "check": Blockly.Types.BOOLEAN.check
        }, {
          "type": "field_dropdown",
          "name": "PULSEPIN",
          "options": Blockly.Arduino.Boards.selected.digitalPins
        }
      ],
      "output": Blockly.Types.NUMBER.output,
      "inputsInline": true,
      "colour": Blockly.Blocks.io.HUE,
      "tooltip": Blockly.Msg.ARD_PULSE_TIP,
      "helpUrl": 'https://www.arduino.cc/en/Reference/PulseIn'
    });
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pulsetimeout'] = {
  /**
   * Block for measuring (with a time-out) the duration of a pulse in an input
   * pin.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "type": "math_foo",
      "message0": Blockly.Msg.ARD_PULSE_READ_TIMEOUT,
      "args0": [{
          "type": "input_value",
          "name": "PULSETYPE",
          "check": Blockly.Types.BOOLEAN.check
        }, {
          "type": "field_dropdown",
          "name": "PULSEPIN",
          "options": Blockly.Arduino.Boards.selected.digitalPins
        }, {
          "type": "input_value",
          "name": "TIMEOUT",
          "check": Blockly.Types.NUMBER.check
        }
      ],
      "output": Blockly.Types.NUMBER.output,
      "inputsInline": true,
      "colour": Blockly.Blocks.io.HUE,
      "tooltip": Blockly.Msg.ARD_PULSETIMEOUT_TIP,
      "helpUrl": 'https://www.arduino.cc/en/Reference/PulseIn'
    });
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

// blocks/logo.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks use for the Ardublockly logo creation.
 *     These are not mean to used at all.
 *
 * Generator:
 *  var noCode = function(block) { return ''; };
 *  Blockly.Arduino['ardublockly_name_bottom'] = noCode;
 *  Blockly.Arduino['ardublockly_plus_top_large'] = noCode;
 *  Blockly.Arduino['ardublockly_plus_top_small'] = noCode;
 *  Blockly.Arduino['ardublockly_plus_bottom_large'] = noCode;
 *  Blockly.Arduino['ardublockly_plus_bottom_small'] = noCode;
 *  Blockly.Arduino['ardublockly_plus_both_small'] = noCode;
 *  Blockly.Arduino['ardublockly_plus_both_large'] = noCode;
 *  Blockly.Arduino['ardublockly_minus_large'] = noCode;
 *  Blockly.Arduino['ardublockly_minus_small'] = noCode;
 *  
 * Toolbox:
 *  <sep></sep>
 *  <category name="Logo">
 *    <block type="ardublockly_name_top"></block>
 *    <block type="ardublockly_name_bottom"></block>
 *    <block type="ardublockly_plus_top_large"></block>
 *    <block type="ardublockly_plus_top_small"></block>
 *    <block type="ardublockly_plus_bottom_large"></block>
 *    <block type="ardublockly_plus_bottom_small"></block>
 *    <block type="ardublockly_minus_large"></block>
 *    <block type="ardublockly_minus_small"></block>
 *  </category>
 */

Blockly.Blocks.logo = {};
Blockly.Blocks = Blockly.Blocks || {};

Blockly.Blocks.logo.HUE = 180;

/* Ardublockly block */
Blockly.Blocks['ardublockly_name_top'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ardublockly");
    this.setPreviousStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_name_bottom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ardublockly");
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
    this.setTooltip('');
  }
};

/* Plus block */
Blockly.Blocks['ardublockly_plus_top_large'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("     +");
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_plus_top_small'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("  +");
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_plus_bottom_large'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("     +");
    this.setPreviousStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_plus_bottom_small'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("  +");
    this.setPreviousStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_plus_both_small'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("  +");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_plus_both_large'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("     +");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

/* Minus block */
Blockly.Blocks['ardublockly_minus_large'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("-     ");
    this.setInputsInline(false);
    this.setOutput(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

Blockly.Blocks['ardublockly_minus_small'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("-  ");
    this.setInputsInline(false);
    this.setOutput(true);
    this.setColour(Blockly.Blocks.logo.HUE);
  }
};

// blocks/map.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino map functionality.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */

Blockly.Blocks.map = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.map.HUE = 230;

Blockly.Blocks['base_map'] = {
  /**
   * Block for creating a the map function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/map');
    this.setColour(Blockly.Blocks.map.HUE);
    this.appendValueInput('NUM')
        .appendField(Blockly.Msg.ARD_MAP)
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendValueInput('DMAX')
        .appendField(Blockly.Msg.ARD_MAP_VAL)
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_MAP_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

// blocks/procedures.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */

Blockly.Blocks = Blockly.Blocks || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.procedures.HUE = 290;

Blockly.Blocks['arduino_functions'] = {
  /**
   * Block for defining the Arduino setup() and loop() functions.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_FUN_RUN_SETUP);
    this.appendStatementInput('SETUP_FUNC');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_FUN_RUN_LOOP);
    this.appendStatementInput('LOOP_FUNC');
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.procedures.HUE);
    this.setTooltip(Blockly.Msg.ARD_FUN_RUN_TIP);
    this.setHelpUrl('https://arduino.cc/en/Reference/Loop');
    this.contextMenu = false;
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getArduinoLoopsInstance: function() {
    return true;
  }
};

// blocks/serial.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino serial communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */

Blockly.Blocks.serial = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.serial.HUE = 160;

Blockly.Blocks['serial_setup'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Serial/Begin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERIAL_SETUP)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_SPEED)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serialSpeed), 'SPEED')
        .appendField(Blockly.Msg.ARD_SERIAL_BPS);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_SETUP_TIP);
  },
  /**
   * Returns the serial instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getSerialSetupInstance: function() {
    return this.getFieldValue('SERIAL_ID');
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPEED', 'serialSpeed');
  }
};

Blockly.Blocks['serial_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT');
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SERIAL_ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
          break;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_SERIAL_PRINT_WARN.replace('%1',
          thisInstanceName), 'serial_setup');
    } else {
      this.setWarningText(null, 'serial_setup');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
  }
};

// blocks/servo.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino blocks for the Servo library.
 *     The Arduino Servo functions can be found in
 *     http://arduino.cc/en/reference/servo
 *
 * TODO: Add angle selector instead of block input.
 */

Blockly.Blocks.servo = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.servo.HUE = 60;

Blockly.Blocks['servo_write'] = {
  /**
   * Block for writing an angle value into a servo pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'SERVO_PIN');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'digitalPins');
  }
};

Blockly.Blocks['servo_read'] = {
  /**
   * Block for reading an angle value of a servo pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'SERVO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'digitalPins');
  }
};

// blocks/spi.js
  /**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino SPI library.
 *     The Arduino SPI functions syntax can be found in:
 *     http://arduino.cc/en/Reference/SPI
 */

Blockly.Blocks.spi = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.spi.HUE = 170;

Blockly.Blocks['spi_setup'] = {
  /**
   * Block for the spi configuration. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/SPI');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP)
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.spi), 'SPI_ID')
        .appendField(Blockly.Msg.ARD_SPI_SETUP_CONF);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP_SHIFT)
        .appendField(
            new Blockly.FieldDropdown(
                [[Blockly.Msg.ARD_SPI_SETUP_MSBFIRST, 'MSBFIRST'],
		[Blockly.Msg.ARD_SPI_SETUP_LSBFIRST, 'LSBFIRST']]),
            'SPI_SHIFT_ORDER');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP_DIVIDE)
        .appendField(
          new Blockly.FieldDropdown(
              Blockly.Arduino.Boards.selected.spiClockDivide),
          'SPI_CLOCK_DIVIDE');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP_MODE)
        .appendField(
            new Blockly.FieldDropdown(
                [[Blockly.Msg.ARD_SPI_SETUP_MODE0, 'SPI_MODE0'],
                 [Blockly.Msg.ARD_SPI_SETUP_MODE1, 'SPI_MODE1'],
                 [Blockly.Msg.ARD_SPI_SETUP_MODE2, 'SPI_MODE2'],
                 [Blockly.Msg.ARD_SPI_SETUP_MODE3, 'SPI_MODE3']]),
            'SPI_MODE');
    this.setTooltip(Blockly.Msg.ARD_SPI_SETUP_TIP);
  },
  /**
   * Returns the selected SPI instance.
   * @return {!string} SPI instance name.
   * @this Blockly.Block
   */
  getSpiSetupInstance: function() {
    return this.getFieldValue('SPI_ID');
  },
  /**
   * Updates the content of the the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPI_ID', 'spi');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPI_CLOCK_DIVIDE', 'spiClockDivide');
  }
};

Blockly.Blocks['spi_transfer'] = {
  /**
   * Block for for the spi transfer. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contain all digital pins plus an option for 'none'
    var slaveNone = [[Blockly.Msg.ARD_SPI_TRANS_NONE, 'none']];
    var digitalPinsExtended = slaveNone.concat(
        Blockly.Arduino.Boards.selected.digitalPins);

    this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.spi), 'SPI_ID');
    this.appendValueInput('SPI_DATA')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SPI_TRANS_VAL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_TRANS_SLAVE)
        .appendField(
            new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SPI_TRANS_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SPI_ID');

    // Iterate through top level blocks to find a setup instance for the SPI id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0, length_ = blocks.length; x < length_; x++) {
      var func = blocks[x].getSpiSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(
          Blockly.Msg.ARD_SPI_TRANS_WARN1.replace('%1', thisInstanceName),
          'spi_setup');
    } else {
      this.setWarningText(null, 'spi_setup');
    }
  },
  /**
   * Retrieves the type of the selected variable, Arduino code returns a byte,
   * for now set it to integer.
   * @return {!string} Blockly type.
   */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    // Special case, otherwise Blockly.Arduino.Boards.refreshBlockFieldDropdown
    var field = this.getField('SPI_SS');
    var fieldValue = field.getValue();
    var slaveNone = [[Blockly.Msg.ARD_SPI_TRANS_NONE, 'none']];
    field.menuGenerator_ =
        slaveNone.concat(Blockly.Arduino.Boards.selected['digitalPins']);

    var currentValuePresent = false;
    for (var i = 0, length_ = field.menuGenerator_.length; i < length_; i++) {
      if (fieldValue == field.menuGenerator_[i][1]) {
        currentValuePresent = true;
      }
    }
    // If the old value is not present any more, add a warning to the block.
    if (!currentValuePresent) {
      this.setWarningText(
          Blockly.Msg.ARD_SPI_TRANS_WARN2.replace('%1', fieldValue), 'bPin');
    } else {
      this.setWarningText(null, 'bPin');
    }
  }
};

Blockly.Blocks['spi_transfer_return'] = {
  /**
   * Block for for the spi transfer with a return value.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contain all digital pins plus an option for 'none'
    var slaveNone = [[Blockly.Msg.ARD_SPI_TRANS_NONE, 'none']];
    var digitalPinsExtended = slaveNone.concat(
        Blockly.Arduino.Boards.selected.digitalPins);

    this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.spi), 'SPI_ID');
    this.appendValueInput('SPI_DATA')
        .appendField(Blockly.Msg.ARD_SPI_TRANS_VAL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_TRANS_SLAVE)
        .appendField(
            new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_SPI_TRANSRETURN_TIP);
  },
  /** Same as spi_transfer block */
  onchange: Blockly.Blocks['spi_transfer'].onchange,
  /** Same as spi_transfer block */
  getBlockType: Blockly.Blocks['spi_transfer'].getBlockType,
  /** Same as spi_transfer block */
  updateFields: Blockly.Blocks['spi_transfer'].updateFields
};

// blocks/stepper.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Stepper library.
 *     The Arduino Servo functions syntax can be found in the following URL:
 *     http://arduino.cc/en/Reference/Stepper
 *     Note that this block uses the Blockly.FieldInstance instead of
 *     Blockly.FieldDropdown which generates a unique instance per setup block
 *     in the workspace.
 */

Blockly.Blocks.stepper = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.stepper.HUE = 80;

Blockly.Blocks['stepper_config'] = {
  /**
   * Block for for the stepper generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    var dropdownOptions = [[Blockly.Msg.ARD_STEPPER_TWO_PINS, 'TWO'],
                           [Blockly.Msg.ARD_STEPPER_FOUR_PINS, 'FOUR']];
    var dropdown = new Blockly.FieldDropdown(dropdownOptions, function(option) {
      var input = (option == 'FOUR');
      this.sourceBlock_.updateShape_(input);
    });

    this.setHelpUrl('http://arduino.cc/en/Reference/StepperConstructor');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_SETUP)
        .appendField(
            new Blockly.FieldInstance('Stepper',
                                      Blockly.Msg.ARD_STEPPER_DEFAULT_NAME,
                                      true, true, false),
            'STEPPER_NAME')
        .appendField(Blockly.Msg.ARD_STEPPER_MOTOR);
    this.appendDummyInput('PINS_DROPDOWN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_NUMBER_OF_PINS)
        .appendField(dropdown, "STEPPER_NUMBER_OF_PINS");
    this.appendDummyInput('PINS')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_PIN1)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN1')
        .appendField(Blockly.Msg.ARD_STEPPER_PIN2)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN2');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_REVOLVS);
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_SPEED);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_SETUP_TIP);
  },
  /**
   * Parse XML to restore the number of pins available.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var input = (xmlElement.getAttribute('number_of_pins') == 'FOUR');
    this.updateShape_(input);
  },
  /**
   * Create XML to represent number of pins selection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var input = this.getFieldValue('STEPPER_NUMBER_OF_PINS');
    container.setAttribute("number_of_pins", input);
    return container;
  },
  /**
   * Modify this block to have the correct number of pins available.
   * @param {boolean} fourPins True if this block has a 4 or 2 stepper pins.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(fourPins) {
    // Single check as Pin 3 and 4 should always be added or removed together
    var extraPinsExist = this.getFieldValue('STEPPER_PIN3');
    if (fourPins) {
      if (!extraPinsExist) {
         this.getInput("PINS")
            .appendField(Blockly.Msg.ARD_STEPPER_PIN3, "PIN3")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN3')
            .appendField(Blockly.Msg.ARD_STEPPER_PIN4, "PIN4")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN4');
      }
    } else {
      // Two pins is selected
      if (extraPinsExist) {
        this.getInput("PINS").removeField("STEPPER_PIN3");
        this.getInput("PINS").removeField("PIN3");
        this.getInput("PINS").removeField("STEPPER_PIN4");
        this.getInput("PINS").removeField("PIN4");
      }
    }
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN1', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN2', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN3', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN4', 'digitalPins');
  }
};

Blockly.Blocks['stepper_step'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperStep');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEP)
        .appendField(
            new Blockly.FieldInstance('Stepper',
                                      Blockly.Msg.ARD_STEPPER_DEFAULT_NAME,
                                      false, true, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEPS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Stepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

// blocks/time.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Time functions.
 *     The arduino built in functions syntax can be found in
 *     http://arduino.cc/en/Reference/HomePage
 */

Blockly.Blocks.time = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.time.HUE = 140;

Blockly.Blocks['time_delay'] = {
  /**
   * Delay block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Delay');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MILI')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};

Blockly.Blocks['time_delaymicros'] = {
  /**
   * delayMicroseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DelayMicroseconds');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MICRO')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_DELAY_MICROS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_MICRO_TIP);
  }
};

Blockly.Blocks['time_millis'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MILLIS);
    this.setOutput(true, Blockly.Types.LARGE_NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_TIME_MILLIS_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};

Blockly.Blocks['time_micros'] = {
  /**
   * Elapsed time in microseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Micros');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MICROS);
    this.setOutput(true, Blockly.Types.LARGE_NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_TIME_MICROS_TIP);
  },
  /**
   * Should be a long (32bit), but  for for now an int.
   * @return {string} The type of return value for the block, an integer.
   */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};

Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_INF);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_INF_TIP);
  }
};

// blocks/tone.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Tone generation
 *     The Arduino function syntax can be found at
 *     https://www.arduino.cc/en/Reference/tone
 *
 */

Blockly.Blocks.tone = {};
Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};
/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.tone.HUE = 250;

Blockly.Blocks['io_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SETTONE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), "TONEPIN");
    this.appendValueInput("FREQUENCY")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TONEFREQ);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_TONE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/tone');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks frequency values and sets a warning if out of range.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    var freq = Blockly.Arduino.valueToCode(
        this, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC)
    if (freq < 31 || freq > 65535) {
      this.setWarningText(Blockly.Msg.ARD_TONE_WARNING, 'io_tone');
    } else {
      this.setWarningText(null, 'io_tone');
    }
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_notone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_NOTONE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), "TONEPIN");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_NOTONE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/noTone');
  },
    /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

// blocks/variables.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino map functionality.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */

Blockly.Blocks = Blockly.Blocks || {};Blockly.Types = Blockly.Types || {};

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_set_type'] = {
  /**
   * Block for variable casting.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/HomePage');
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VARIABLE_SETTYPE_INPUT');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_VAR_AS)
        .appendField(new Blockly.FieldDropdown(
                         Blockly.Types.getValidTypeArray()),
                     'VARIABLE_SETTYPE_TYPE');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_VAR_AS_TIP);
  },
  /**
   * Assigns a type to the block based on the selected type to cast.
   * @return {!string} Blockly type for this block configuration.
   * @this Blockly.Block
   */
  getBlockType: function() {
    var blocklyTypeKey = this.getFieldValue('VARIABLE_SETTYPE_TYPE');
    return Blockly.Types[blocklyTypeKey];
  }
};

// generators/arduino.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Based on work of Fred Lin (gasolin@gmail.com) for Blocklyduino.
 *
 * @fileoverview Helper functions for generating Arduino language (C++).
 */

Blockly.Arduino = {};
Blockly.Generator = Blockly.Generator || {};Blockly.StaticTyping = Blockly.StaticTyping || {};

/**
 * Arduino code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Arduino = new Blockly.Generator('Arduino');
Blockly.Arduino.StaticTyping = new Blockly.StaticTyping();

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * Arduino specific keywords defined in: http://arduino.cc/en/Reference/HomePage
 * @private
 */
Blockly.Arduino.addReservedWords(
  'Blockly,' +  // In case JS is evaled in the current window.
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
  'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
  'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
  'float,double,string,String,array,static,volatile,const,sizeof,pinMode,' +
  'digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,' +
  'noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,' +
  'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,' +
  'lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' +
  'detachInterrupt,interrupts,noInterrupts');

/** Order of operation ENUMs. */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/**
 * A list of types tasks that the pins can be assigned. Used to track usage and
 * warn if the same pin has been assigned to more than one task.
 */
Blockly.Arduino.PinTypes = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  PWM: 'PWM',
  SERVO: 'SERVO',
  STEPPER: 'STEPPER',
  SERIAL: 'SERIAL',
  I2C: 'I2C/TWI',
  SPI: 'SPI'
};

/**
 * Arduino generator short name for
 * Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_
 * @type {!string}
 */
Blockly.Arduino.DEF_FUNC_NAME = Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_;

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
  // Create a dictionary of definitions to be printed at the top of the sketch
  Blockly.Arduino.includes_ = Object.create(null);
  // Create a dictionary of global definitions to be printed after variables
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of variables
  Blockly.Arduino.variables_ = Object.create(null);
  // Create a dictionary of functions from the code generator
  Blockly.Arduino.codeFunctions_ = Object.create(null);
  // Create a dictionary of functions created by the user
  Blockly.Arduino.userFunctions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions)
  Blockly.Arduino.functionNames_ = Object.create(null);
  // Create a dictionary of setups to be printed in the setup() function
  Blockly.Arduino.setups_ = Object.create(null);
  // Create a dictionary of pins to check if their use conflicts
  Blockly.Arduino.pins_ = Object.create(null);

  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
      new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }

  // Iterate through to capture all blocks types and set the function arguments
  var varsWithTypes = Blockly.Arduino.StaticTyping.collectVarsWithTypes(workspace);
  Blockly.Arduino.StaticTyping.setProcedureArgs(workspace, varsWithTypes);

  // Set variable declarations with their Arduino type in the defines dictionary
  for (var varName in varsWithTypes) {
    Blockly.Arduino.addVariable(varName,
      Blockly.Arduino.getArduinoType_(varsWithTypes[varName]) +' ' +
      Blockly.Arduino.variableDB_.getName(varName, Blockly.Variables.NAME_TYPE) + ';');
  }
};

/**
 * Prepare all generated code to be placed in the sketch specific locations.
 * @param {string} code Generated main program (loop function) code.
 * @return {string} Completed sketch code.
 */
Blockly.Arduino.finish = function(code) {
  // Convert the includes, definitions, and functions dictionaries into lists
  var includes = [], definitions = [], variables = [], functions = [];
  for (var name in Blockly.Arduino.includes_) {
    includes.push(Blockly.Arduino.includes_[name]);
  }
  if (includes.length) {
    includes.push('\n');
  }
  for (var name in Blockly.Arduino.variables_) {
    variables.push(Blockly.Arduino.variables_[name]);
  }
  if (variables.length) {
    variables.push('\n');
  }
  for (var name in Blockly.Arduino.definitions_) {
    definitions.push(Blockly.Arduino.definitions_[name]);
  }
  if (definitions.length) {
    definitions.push('\n');
  }
  for (var name in Blockly.Arduino.codeFunctions_) {
    functions.push(Blockly.Arduino.codeFunctions_[name]);
  }
  for (var name in Blockly.Arduino.userFunctions_) {
    functions.push(Blockly.Arduino.userFunctions_[name]);
  }
  if (functions.length) {
    functions.push('\n');
  }

  // userSetupCode added at the end of the setup function without leading spaces
  var setups = [''], userSetupCode= '';
  if (Blockly.Arduino.setups_['userSetupCode'] !== undefined) {
    userSetupCode = '\n' + Blockly.Arduino.setups_['userSetupCode'];
    delete Blockly.Arduino.setups_['userSetupCode'];
  }
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }
  if (userSetupCode) {
    setups.push(userSetupCode);
  }

  // Clean up temporary data
  delete Blockly.Arduino.includes_;
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.codeFunctions_;
  delete Blockly.Arduino.userFunctions_;
  delete Blockly.Arduino.functionNames_;
  delete Blockly.Arduino.setups_;
  delete Blockly.Arduino.pins_;
  Blockly.Arduino.variableDB_.reset();

  var allDefs = includes.join('\n') + variables.join('\n') +
    definitions.join('\n') + functions.join('\n\n');
  var setup = 'void setup() {' + setups.join('\n  ') + '\n}\n\n';
  var loop = 'void loop() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}';
  return allDefs + setup + loop;
};

/**
 * Adds a string of "include" code to be added to the sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} includeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Arduino.addInclude = function(includeTag, code) {
  if (Blockly.Arduino.includes_[includeTag] === undefined) {
    Blockly.Arduino.includes_[includeTag] = code;
  }
};

/**
 * Adds a string of code to be declared globally to the sketch.
 * Once it is added it will not get overwritten with new code.
 * @param {!string} declarationTag Identifier for this declaration code.
 * @param {!string} code Code to be added below the includes.
 */
Blockly.Arduino.addDeclaration = function(declarationTag, code) {
  if (Blockly.Arduino.definitions_[declarationTag] === undefined) {
    Blockly.Arduino.definitions_[declarationTag] = code;
  }
};

/**
 * Adds a string of code to declare a variable globally to the sketch.
 * Only if overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} varName The name of the variable to declare.
 * @param {!string} code Code to be added for the declaration.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the declaration overwrote a previous one.
 */
Blockly.Arduino.addVariable = function(varName, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.variables_[varName] === undefined)) {
    Blockly.Arduino.variables_[varName] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code into the Arduino setup() function. It takes an
 * identifier to not repeat the same kind of initialisation code from several
 * blocks. If overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} setupTag Identifier for the type of set up code.
 * @param {!string} code Code to be included in the setup() function.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the new setup code overwrote a previous one.
 */
Blockly.Arduino.addSetup = function(setupTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.setups_[setupTag] === undefined)) {
    Blockly.Arduino.setups_[setupTag] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code as a function. It takes an identifier (meant to be the
 * function name) to only keep a single copy even if multiple blocks might
 * request this function to be created.
 * A function (and its code) will only be added on first request.
 * @param {!string} preferedName Identifier for the function.
 * @param {!string} code Code to be included in the setup() function.
 * @return {!string} A unique function name based on input name.
 */
Blockly.Arduino.addFunction = function(preferedName, code) {
  if (Blockly.Arduino.codeFunctions_[preferedName] === undefined) {
    var uniqueName = Blockly.Arduino.variableDB_.getDistinctName(
      preferedName, Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.codeFunctions_[preferedName] =
      code.replace(Blockly.Arduino.DEF_FUNC_NAME, uniqueName);
    Blockly.Arduino.functionNames_[preferedName] = uniqueName;
  }
  return Blockly.Arduino.functionNames_[preferedName];
};

/**
 * Description.
 * @param {!Blockly.Block} block Description.
 * @param {!string} pin Description.
 * @param {!string} pinType Description.
 * @param {!string} warningTag Description.
 */
Blockly.Arduino.reservePin = function(block, pin, pinType, warningTag) {
  if (Blockly.Arduino.pins_[pin] !== undefined) {
    if (Blockly.Arduino.pins_[pin] != pinType) {
      block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
        .replace('%2', warningTag).replace('%3', pinType)
        .replace('%4', Blockly.Arduino.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    Blockly.Arduino.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything. A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\\n')
    .replace(/\$/g, '\\$')
    .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  if (code === null) { return ''; } // Block has handled code generation itself

  var commentCode = '';
  // Only collect comments for blocks that aren't inline
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments
    // Don't collect comments for nested statements
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Generates Arduino Types from a Blockly Type.
 * @param {!Blockly.Type} typeBlockly The Blockly type to be converted.
 * @return {string} Arduino type for the respective Blockly input type, in a
 *     string format.
 * @private
 */
Blockly.Arduino.getArduinoType_ = function(typeBlockly) {
  switch (typeBlockly.typeId) {
    case Blockly.Types.SHORT_NUMBER.typeId:
      return 'char';
    case Blockly.Types.NUMBER.typeId:
      return 'int';
    case Blockly.Types.LARGE_NUMBER.typeId:
      return 'long';
    case Blockly.Types.DECIMAL.typeId:
      return 'float';
    case Blockly.Types.TEXT.typeId:
      return 'String';
    case Blockly.Types.CHARACTER.typeId:
      return 'char';
    case Blockly.Types.BOOLEAN.typeId:
      return 'boolean';
    case Blockly.Types.NULL.typeId:
      return 'void';
    case Blockly.Types.UNDEF.typeId:
      return 'undefined';
    case Blockly.Types.CHILD_BLOCK_MISSING.typeId:
      // If no block connected default to int, change for easier debugging
      //return 'ChildBlockMissing';
      return 'int';
    default:
      return 'Invalid Blockly Type';
  }
};

/** Used for not-yet-implemented block code generators */
Blockly.Arduino.noGeneratorCodeInline = function() {
  return ['', Blockly.Arduino.ORDER_ATOMIC];
};

/** Used for not-yet-implemented block code generators */
Blockly.Arduino.noGeneratorCodeLine = function() { return ''; };
// generators/arduino/boards.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Implements the required data for functions for selecting
 *     amongst different Arduino boards.
 */

Blockly.Arduino.Boards = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the digital IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     digital IO pins.
 */
Blockly.Arduino.Boards.generateDigitalIo = function(pinStart, pinEnd) {
  var digitalIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    digitalIo.push([i.toString(), i.toString()]);
  }
  return digitalIo;
};

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the analogue IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     analogue IO pins.
 */
Blockly.Arduino.Boards.generateAnalogIo = function(pinStart, pinEnd) {
  var analogIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
  }
  return analogIo;
};

/**
 * Creates a new Board Profile copying all the attributes from an existing
 * profile, with the exception of the name, and optionally the description and
 * compiler flag.
 * @param {!string} name_ Mandatory new name of the new board profile.
 * @param {string=} description Optional new description of the new profile.
 * @param {string=} compilerFlag Optional new description of the new profile.
 * @return {!Object} Duplicated object with the different argument data.
 */
Blockly.Arduino.Boards.duplicateBoardProfile =
    function(originalBoard, name_, description, compilerFlag) {
  return {
    name: name_,
    description: description || originalBoard.description,
    compilerFlag: compilerFlag || originalBoard.compilerFlag,
    analogPins: originalBoard.analogPins,
    digitalPins: originalBoard.digitalPins,
    pwmPins: originalBoard.pwmPins,
    serial: originalBoard.serial,
    serialPins: originalBoard.serialPins,
    serialSpeed: originalBoard.serialSpeed,
    spi: originalBoard.spi,
    spiPins: originalBoard.spiPins,
    spiClockDivide: originalBoard.spiClockDivide,
    i2c: originalBoard.i2c,
    i2cPins: originalBoard.i2cPins,
    i2cSpeed: originalBoard.i2cSpeed,
    builtinLed: originalBoard.builtinLed,
    interrupt: originalBoard.interrupt
  }
};

/** Object to contain all Arduino board profiles. */
Blockly.Arduino.Boards.profiles = new Object();

/** Arduino Uno board profile. */
Blockly.Arduino.Boards.profiles.uno = {
  name: 'Arduino Uno',
  description: 'Arduino Uno standard compatible board',
  compilerFlag: 'arduino:avr:uno',
  analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 5),
  digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.Arduino.Boards.generateAnalogIo(0, 5)),
  pwmPins: [['3', '3'], ['5', '5'], ['6', '6'], ['9', '9'], ['10', '10'],
            ['11', '11']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', '0'], ['TX', '1']] },
  serialSpeed: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '11'], ['MISO', '12'], ['SCK', '13']] },
  spiClockDivide: [['2 (8MHz)', 'SPI_CLOCK_DIV2'],
                   ['4 (4MHz)', 'SPI_CLOCK_DIV4'],
                   ['8 (2MHz)', 'SPI_CLOCK_DIV8'],
                   ['16 (1MHz)', 'SPI_CLOCK_DIV16'],
                   ['32 (500KHz)', 'SPI_CLOCK_DIV32'],
                   ['64 (250KHz)', 'SPI_CLOCK_DIV64'],
                   ['128 (125KHz)', 'SPI_CLOCK_DIV128']],
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', 'A4'], ['SCL', 'A5']] },
  i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
  builtinLed: [['BUILTIN_1', '13']],
  interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};

/** Arduino Nano board profile (ATmega328p). */
Blockly.Arduino.Boards.profiles.nano_328 = {
  name: 'Arduino Nano 328',
  description: 'Arduino Nano with ATmega328 board',
  compilerFlag: 'arduino:avr:nano:cpu=atmega328',
  analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 7),
  digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.Arduino.Boards.generateAnalogIo(0, 7)),
  pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
  serial: Blockly.Arduino.Boards.profiles.uno.serial,
  serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: Blockly.Arduino.Boards.profiles.uno.spi,
  spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
  i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
  i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
  builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
  interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt
};
Blockly.Arduino.Boards.profiles.nano_168 =
    Blockly.Arduino.Boards.duplicateBoardProfile(
        Blockly.Arduino.Boards.profiles.nano_328,
        'Arduino Nano 168',
        'Arduino Nano with ATmega168 compatible board',
        'arduino:avr:nano:cpu=atmega168');

/** Arduino Duemilanove boards profile (ATmega168p, ATmega328p). */
Blockly.Arduino.Boards.profiles.duemilanove_168p = {
  name: 'Arduino Nano 168p',
  description: 'Arduino Duemilanove with ATmega168p compatible board',
  compilerFlag: 'arduino:avr:diecimila:cpu=atmega168',
  analogPins: Blockly.Arduino.Boards.profiles.uno.analogPins,
  digitalPins: Blockly.Arduino.Boards.profiles.uno.digitalPins,
  pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
  serial: Blockly.Arduino.Boards.profiles.uno.serial,
  serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: Blockly.Arduino.Boards.profiles.uno.spi,
  spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
  i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
  i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
  builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
  interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt
};
Blockly.Arduino.Boards.profiles.duemilanove_328p =
    Blockly.Arduino.Boards.duplicateBoardProfile(
        Blockly.Arduino.Boards.profiles.duemilanove_168p,
        'Arduino Duemilanove 328p',
        'Arduino Duemilanove with ATmega328p compatible board',
        'arduino:avr:diecimila');

/** Arduino Mega board profile. */
Blockly.Arduino.Boards.profiles.mega = {
  name: 'Arduino Mega',
  description: 'Arduino Mega-compatible board',
  compilerFlag: 'arduino:avr:mega',
  analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 15),
  //TODO: Check if the Mega can use analogue pins as digital, it would be
  //      logical but it is not clear on the arduino.cc website
  digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 53),
  pwmPins: Blockly.Arduino.Boards.generateDigitalIo(2, 13).concat(
               Blockly.Arduino.Boards.generateDigitalIo(44, 46)),
  serial: [['serial', 'Serial'], ['serial_1', 'Serial1'],
           ['serial_2', 'Serial2'], ['serial_3', 'Serial3']],
  serialPins: {
    Serial: [['TX', '0'], ['RX', '1']],
    Serial1: [['TX', '18'], ['TX', '19']],
    Serial2: [['TX', '16'], ['TX', '17']],
    Serial3: [['TX', '14'], ['TX', '15']]
  },
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '51'], ['MISO', '50'], ['SCK', '52']] },
  //TODO: confirm the clock divides are the same for the DUE and UNO
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', '20'], ['SCL', '21']] },
  i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
  builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
  interrupt: [['interrupt0', '2'], ['interrupt1', '3'], ['interrupt2', '21'],
              ['interrupt3', '20'], ['interrupt4', '19'], ['interrupt5', '18']]
};

/** Arduino Leonardo board profile. */
Blockly.Arduino.Boards.profiles.leonardo = {
  name: 'Arduino Leonardo',
  description: 'Arduino Leonardo-compatible board',
  compilerFlag: 'arduino:avr:leonardo',
  analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 5).concat(
                  [['A6', '4'], ['A7', '6'], ['A8', '8'], ['A9', '9'],
                   ['A10', '10'], ['A11', '12']]),
  digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.Arduino.Boards.generateAnalogIo(0, 5)),
  pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins.concat([['13', '13']]),
  serial: Blockly.Arduino.Boards.profiles.uno.serial,
  serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', 'ICSP-4'], ['MISO', 'ICSP-1'], ['SCK', 'ICSP-3']] },
  //TODO: confirm the clock divides are the same for the Leonardo and UNO
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', '2'], ['SCL', '3']] },
  i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
  builtinLed: Blockly.Arduino.Boards.profiles.uno.builtinLed,
  interrupt: [['interrupt0', '3'], ['interrupt1', '2'], ['interrupt2', '0'],
              ['interrupt3', '1'], ['interrupt4', '17']]
};

/** Arduino Yun board processor and profile is identical to Leonardo. */
Blockly.Arduino.Boards.profiles.yun =
    Blockly.Arduino.Boards.duplicateBoardProfile(
        Blockly.Arduino.Boards.profiles.leonardo,
        'Arduino Yun',
        'Arduino Yun compatible board');

/** Atmel Xplained mini boards profile (atmega328p, atmega328pb, atmega168pb).*/
Blockly.Arduino.Boards.profiles.atmel_atmega328p_xplained_mini = {
  name: 'Atmel atmega328p Xplained mini',
  description: 'Atmel Xplained mini board with atmega328p (Uno compatible)',
  compilerFlag: 'atmel:avr:atmega328p_xplained_mini',
  analogPins: Blockly.Arduino.Boards.profiles.uno.analogPins,
  digitalPins: Blockly.Arduino.Boards.profiles.uno.digitalPins.concat(
      [['20', '20']]),
  pwmPins: Blockly.Arduino.Boards.profiles.uno.pwmPins,
  serial: Blockly.Arduino.Boards.profiles.uno.serial,
  serialPins: Blockly.Arduino.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: Blockly.Arduino.Boards.profiles.uno.spi,
  spiPins: Blockly.Arduino.Boards.profiles.uno.spiPins,
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: Blockly.Arduino.Boards.profiles.uno.i2c,
  i2cPins: Blockly.Arduino.Boards.profiles.uno.i2cPins,
  i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
  builtinLed: [['BUILTIN_LED', '13']],
  interrupt: Blockly.Arduino.Boards.profiles.uno.interrupt,
  builtinButton: [['BUILTIN_BUTTON', '20']]
};
Blockly.Arduino.Boards.profiles.atmel_atmega328pb_xplained_mini =
    Blockly.Arduino.Boards.duplicateBoardProfile(
        Blockly.Arduino.Boards.profiles.atmel_atmega328p_xplained_mini,
        'Atmel atmega328pb Xplained mini',
        'Atmel Xplained mini board with atmega328pb (Arduino Uno compatible)',
        'atmel:avr:atmega328pb_xplained_mini');
Blockly.Arduino.Boards.profiles.atmel_atmega168pb_xplained_mini =
    Blockly.Arduino.Boards.duplicateBoardProfile(
        Blockly.Arduino.Boards.profiles.atmel_atmega328p_xplained_mini,
        'Atmel atmega168pb Xplained mini',
        'Atmel Xplained mini board with atmega168pb (Arduino Uno compatible)',
        'atmel:avr:atmega168pb_xplained_mini');

/** ESP8266 for the Adafruit Huzzah. */
Blockly.Arduino.Boards.profiles.esp8266_huzzah = {
  name: 'Adafruit Feather HUZZAH',
  description: 'Adafruit HUZZAH ESP8266 compatible board',
  compilerFlag: 'esp8266:esp8266:generic',
  analogPins: [['A0', 'A0']],
  digitalPins: [['0', '0'], ['2', '2'], ['4', '4'], ['5', '5'], ['12', '12'],
                ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16']],
  pwmPins: [['2', '2']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', 'RX'], ['TX', 'TX']] },
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '13'], ['MISO', '12'], ['SCK', '14']] },
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', '4'], ['SCL', '5']] },
  i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
  builtinLed: [['BUILTIN_1', '0']],
  interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};

/** ESP8266 for the Wemos D1 R2. */
Blockly.Arduino.Boards.profiles.esp8266_wemos_d1 = {
  name: 'Wemos D1',
  description: 'Wemos D1 R2 compatible board',
  compilerFlag: 'esp8266:esp8266:generic',
  analogPins: [['A0', 'A0']],
  digitalPins: [['D0', 'D0'], ['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'],
                ['D4', 'D4'], ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']],
  pwmPins:  [['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'], ['D4', 'D4'],
             ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', 'RX'], ['TX', 'TX']] },
  serialSpeed: Blockly.Arduino.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', 'D7'], ['MISO', 'D6'], ['SCK', 'D5']] },
  spiClockDivide: Blockly.Arduino.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', 'D2'], ['SCL', 'D1']] },
  i2cSpeed: Blockly.Arduino.Boards.profiles.uno.i2cSpeed,
  builtinLed: [['BUILTIN_1', 'D4']],
  interrupt: [['D0', 'D0'], ['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'],
              ['D4', 'D4'], ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']]
};

/** Set default profile to Arduino standard-compatible board */
Blockly.Arduino.Boards.selected = Blockly.Arduino.Boards.profiles.uno;

/**
 * Changes the Arduino board profile selected, which trigger a refresh of the
 * blocks that use the profile.
 * @param {Blockly.Workspace} workspace Workspace to trigger the board change.
 * @param {string} newBoard Name of the new profile to set.
 */
Blockly.Arduino.Boards.changeBoard = function(workspace, newBoard) {
  if (Blockly.Arduino.Boards.profiles[newBoard] === undefined) {
    console.log('Tried to set non-existing Arduino board: ' + newBoard);
    return;
  }
  Blockly.Arduino.Boards.selected = Blockly.Arduino.Boards.profiles[newBoard];
  // Update the pin out of all the blocks that uses them
  var blocks = workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    var updateFields = blocks[i].updateFields;
    if (updateFields) {
      updateFields.call(blocks[i]);
    }
  }
};

/**
 * Refreshes the contents of a block Field Dropdown.
 * This is use to refresh the blocks after the board profile has been changed.
 * @param {!Blockly.Block} block Generated code.
 * @param {!string} fieldName Name of the block FieldDropdown to refresh.
 * @param {!string} boardKey Name of the board profile property to fetch.
 */
Blockly.Arduino.Boards.refreshBlockFieldDropdown =
    function(block, fieldName, boardKey) {
  var field = block.getField(fieldName);
  var fieldValue = field.getValue();
  var dataArray = Blockly.Arduino.Boards.selected[boardKey];
  field.menuGenerator_ = dataArray;

  var currentValuePresent = false;
  for (var i = 0; i < dataArray.length; i++) {
    if (fieldValue == dataArray[i][1]) {
      currentValuePresent = true;
    }
  }
  // If the old value is not present any more, add a warning to the block.
  if (!currentValuePresent) {
    block.setWarningText(
        'The old pin value ' + fieldValue + ' is no longer available.', 'bPin');
  } else {
    block.setWarningText(null, 'bPin');
  }
};

// generators/arduino/colour.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for colour blocks.
 *
 * TODO: These blocks do not really serve a purpose for Arduino code.
 */


Blockly.Arduino.colour = {};
Blockly.Arduino = Blockly.Arduino || {};

Blockly.Arduino['colour_picker'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_random'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_rgb'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_blend'] = Blockly.Arduino.noGeneratorCodeInline;

// generators/arduino/io.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Arduino Digital and Analogue input/output.
 *     Arduino built in function docs: http://arduino.cc/en/Reference/HomePage
 */

Blockly.Arduino.IO = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Function for 'set pin' (X) to a state (Y).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_digitalwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading a digital pin (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_digitalread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_builtin_led'] = function(block) {
  var pin = block.getFieldValue('BUILT_IN_LED');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Set LED');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for setting the state (Y) of an analogue output (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { analogWrite(X, Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_analogwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Analogue Write');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  // Warn if the input value is out of range
  if ((stateOutput < 0) || (stateOutput > 255)) {
    block.setWarningText('The analogue value set must be between 0 and 255',
                         'pwm_value');
  } else {
    block.setWarningText(null, 'pwm_value');
  }

  var code = 'analogWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading an analogue pin value (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { analogRead(X)      }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_analogread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'analogRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Value for defining a digital pin state.
 * Arduino code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_highlow'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_pulsein'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.Arduino.valueToCode(block, "PULSETYPE", Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_pulsetimeout'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.Arduino.valueToCode(block, "PULSETYPE", Blockly.Arduino.ORDER_ATOMIC);
  var timeout = Blockly.Arduino.valueToCode(block, "TIMEOUT", Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ', ' + timeout + ')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
}; 

// generators/arduino/lists.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for list blocks.
 *
 * TODO: A lot of this can be converted to arrays code by creating functions to
 *       replicate this kind of behavior.
 */

Blockly.Arduino.lists = {};
Blockly.Arduino = Blockly.Arduino || {};

Blockly.Arduino['lists_create_empty'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_create_with'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_repeat'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_length'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_isEmpty'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_indexOf'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_getIndex'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['lists_setIndex'] = Blockly.Arduino.noGeneratorCodeLine;

// generators/arduino/logic.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the logic blocks.
 */

Blockly.Arduino.logic = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator to create if/if else/else statement.
 * Arduino code: loop { if (X)/else if ()/else { X } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_if'] = function(block) {
  var n = 0;
  var argument = Blockly.Arduino.valueToCode(block, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
    branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.Arduino.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

/**
 * Code generator for the comparison operator block.
 * Arduino code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

/**
 * Code generator for the logic operator block.
 * Arduino code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_operation'] = function(block) {
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || 'false';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || 'false';
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

/**
 * Code generator for the logic negate operator.
 * Arduino code: loop { !X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_negate'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

/**
 * Code generator for the boolean values true and false.
 * Arduino code: loop { true/false }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_boolean'] = function(block) {
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the null value.
 * Arduino code: loop { X ? Y : Z }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_null'] = function(block) {
  var code = 'NULL';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the ternary operator.
 * Arduino code: loop { NULL }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 *
 * TODO: Check types of THEN and ELSE blocks and add warning to this block if
 *       they are different from each other.
 */
Blockly.Arduino['logic_ternary'] = function(block) {
  var valueIf = Blockly.Arduino.valueToCode(block, 'IF',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'false';
  var valueThen = Blockly.Arduino.valueToCode(block, 'THEN',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
  var valueElse = Blockly.Arduino.valueToCode(block, 'ELSE',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
  var code = valueIf + ' ? ' + valueThen + ' : ' + valueElse;
  return [code, Blockly.Arduino.ORDER_CONDITIONAL];
};

// generators/arduino/loops.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the loop blocks.
 *
 * TODO: 'For each' block needs to have lists implemented.
 */

Blockly.Arduino.loops = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Generator for the repeat block (number in a drop down) using a For loop
 * statement.
 * Arduino code: loop { for (int count = 0; count < X; count++) { Y } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_repeat'] = function(block) {
  var repeats = Number(block.getFieldValue('TIMES'));
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

/**
 * Generator for the repeat block (using external number block) using a
 * For loop statement.
 * Arduino code: loop { for (int count = 0; count < X; count++) { Y } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_repeat_ext'] = function(block) {
  var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
      Blockly.Arduino.ORDER_ADDITIVE) || '0';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Arduino.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

/**
 * Generator for the repeat while block using a While statement.
 * Arduino code: loop { while (X) { Y } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL',
      until ? Blockly.Arduino.ORDER_LOGICAL_OR :
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  if (until) {
    if (!argument0.match(/^\w+$/)) {
      argument0 = '(' + argument0 + ')';
    }
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

/**
 * Generator for the For loop statements.
 * Arduino code: loop { for (i = X; i <= Y; i+=Z) { } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_for'] = function(block) {
  var variable0 = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Arduino.valueToCode(block, 'BY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      var startVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Arduino.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'int ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.Arduino.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '     ' + incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '     ' + variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

/**
 * A "for each" block.
 * TODO: Removed for now from toolbox as lists are not yet implemented.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_forEach'] = Blockly.Arduino.noGeneratorCodeLine;

/**
 * Generator for the loop flow control statements.
 * Arduino code: loop { break;/continue; }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_flow_statements'] = function(block) {
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};

// generators/arduino/map.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino map functionality.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */

Blockly.Arduino.map = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator for the map block.
 * Arduino code: loop { map(x, 0, 1024, 0, y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['base_map'] = function(block) {
  var valueNum = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_NONE) || '0';
  var valueDmax = Blockly.Arduino.valueToCode(
      block, 'DMAX', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = 'map(' + valueNum + ', 0, 1024, 0, ' + valueDmax + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

// generators/arduino/math.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the Math blocks.
 *
 * TODO: Math on list needs lists to be implemented.
 *       math_constant and math_change needs to be tested in compiler.
 */

Blockly.Arduino.math = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Generator for a numeric value (X).
 * Arduino code: loop { X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  if (code == Infinity) {
    code = 'INFINITY';
  } else if (code == -Infinity) {
    code = '-INFINITY';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Generator for a basic arithmetic operators (X and Y) and power function
 * (X ^ Y).
 * Arduino code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_arithmetic'] = function(block) {
  var OPERATORS = {
    ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
    MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
    MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    POWER: [null, Blockly.Arduino.ORDER_NONE]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in C++ requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

/**
 * Generator for math operators that contain a single operand (X).
 * Arduino code: loop { operator(X) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_single'] = function(block) {
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedents.
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_UNARY_PREFIX) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in C++ in this context.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
  }
  if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
  } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses.
  switch (operator) {
    case 'ABS':
      code = 'abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'log(' + arg + ')';
      break;
    case 'EXP':
      code = 'exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin(' + arg + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'cos(' + arg + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'tan(' + arg + ' / 180 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  // Second, handle cases which generate values that may need parentheses.
  switch (operator) {
    case 'LOG10':
      code = 'log(' + arg + ') / log(10)';
      break;
    case 'ASIN':
      code = 'asin(' + arg + ') / M_PI * 180';
      break;
    case 'ACOS':
      code = 'acos(' + arg + ') / M_PI * 180';
      break;
    case 'ATAN':
      code = 'atan(' + arg + ') / M_PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

/**
 * Generator for math constants (PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2),
 * INFINITY).
 * Arduino code: loop { constant }
 * TODO: Might need to include "#define _USE_MATH_DEFINES"
 *       The arduino header file already includes math.h
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['math_constant'] = function(block) {
  var CONSTANTS = {
    'PI': ['M_PI', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'E': ['M_E', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'GOLDEN_RATIO': ['(1 + sqrt(5)) / 2', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'SQRT2': ['M_SQRT2', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'SQRT1_2': ['M_SQRT1_2', Blockly.Arduino.ORDER_UNARY_POSTFIX],
    'INFINITY': ['INFINITY', Blockly.Arduino.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

/**
 * Generator for math checks: if a number is even, odd, prime, whole, positive,
 * negative, or if it is divisible by certain number. Returns true or false.
 * Arduino code: complex code, can create external functions.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_number_property'] = function(block) {
  var number_to_check = Blockly.Arduino.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    var func = [
        'boolean ' + Blockly.Arduino.DEF_FUNC_NAME + '(int n) {',
        '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
        '  if (n == 2 || n == 3) {',
        '    return true;',
        '  }',
        '  // False if n is NaN, negative, is 1.',
        '  // And false if n is divisible by 2 or 3.',
        '  if (isnan(n) || (n <= 1) || (n == 1) || (n % 2 == 0) || ' +
            '(n % 3 == 0)) {',
        '    return false;',
        '  }',
        '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
        '  for (int x = 6; x <= sqrt(n) + 1; x += 6) {',
        '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
        '      return false;',
        '    }',
        '  }',
        '  return true;',
        '}'];
    var funcName = Blockly.Arduino.addFunction('mathIsPrime', func.join('\n'));
    Blockly.Arduino.addInclude('math', '#include <math.h>');
    code = funcName + '(' + number_to_check + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      Blockly.Arduino.addInclude('math', '#include <math.h>');
      code = '(floor(' + number_to_check + ') == ' + number_to_check + ')';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Arduino.valueToCode(block, 'DIVISOR',
          Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.Arduino.ORDER_EQUALITY];
};

/**
 * Generator to add (Y) to a variable (X).
 * If variable X has not been declared before this block it will be declared as
 * a (not initialised) global int, however globals are 0 initialised in C/C++.
 * Arduino code: loop { X += Y; }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_change'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'DELTA',
      Blockly.Arduino.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' += ' + argument0 + ';\n';
};

/** Rounding functions have a single operand. */
Blockly.Arduino['math_round'] = Blockly.Arduino['math_single'];

/** Trigonometry functions have a single operand. */
Blockly.Arduino['math_trig'] = Blockly.Arduino['math_single'];

/**
 * Generator for the math function to a list.
 * Arduino code: ???
 * TODO: List have to be implemented first. Removed from toolbox for now.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_on_list'] = Blockly.Arduino.noGeneratorCodeInline;

/**
 * Generator for the math modulo function (calculates remainder of X/Y).
 * Arduino code: loop { X % Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_modulo'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'DIVIDEND',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'DIVISOR',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

/**
 * Generator for clipping a number(X) between two limits (Y and Z).
 * Arduino code: loop { (X < Y ? Y : ( X > Z ? Z : X)) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_NONE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'LOW',
      Blockly.Arduino.ORDER_NONE) || '0';
  var argument2 = Blockly.Arduino.valueToCode(block, 'HIGH',
      Blockly.Arduino.ORDER_NONE) || '0';
  var code = '(' + argument0 + ' < ' + argument1 + ' ? ' + argument1 +
      ' : ( ' + argument0 + ' > ' + argument2 + ' ? ' + argument2 + ' : ' +
      argument0 + '))';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Generator for a random integer between two numbers (X and Y).
 * Arduino code: loop { math_random_int(X, Y); }
 *               and an aditional math_random_int function
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['math_random_int'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_NONE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_NONE) || '0';
  var functionName = Blockly.Arduino.variableDB_.getDistinctName(
      'math_random_int', Blockly.Generator.NAME_TYPE);
  Blockly.Arduino.math_random_int.random_function = functionName;
  var func = [
      'int ' + Blockly.Arduino.DEF_FUNC_NAME + '(int min, int max) {',
      '  if (min > max) {',
      '    // Swap min and max to ensure min is smaller.',
      '    int temp = min;',
      '    min = max;',
      '    max = temp;',
      '  }',
      '  return min + (rand() % (max - min + 1));',
      '}'];
  var funcName = Blockly.Arduino.addFunction('mathRandomInt', func.join('\n'));
  var code = funcName + '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Generator for a random float from 0 to 1.
 * Arduino code: loop { (rand() / RAND_MAX) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['math_random_float'] = function(block) {
  return ['(rand() / RAND_MAX)', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

// generators/arduino/procedures.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for procedure (function) blocks.
 *
 * TODO: For now all variables will stay at "int". Once type is implemented
 *       it needs to be captured on the functions with return.
 */

Blockly.Arduino.procedures = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator to create a function with a return value (X).
 * Arduino code: void functionname { return X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {null} There is no code added to loop.
 */
Blockly.Arduino['procedures_defreturn'] = function(block) {
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    branch = Blockly.Arduino.prefixLines(
        Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Arduino.INDENT) + branch;
  }
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }

  // Get arguments with type
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] =
        Blockly.Arduino.getArduinoType_(block.getArgType(block.arguments_[x])) +
        ' ' +
        Blockly.Arduino.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
  }

  // Get return type
  var returnType = Blockly.Types.NULL;
  if (block.getReturnType) {
    returnType = block.getReturnType();
  }
  returnType = Blockly.Arduino.getArduinoType_(returnType);

  // Construct code
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Arduino.scrub_(block, code);
  Blockly.Arduino.userFunctions_[funcName] = code;
  return null;
};

/**
 * Code generator to create a function without a return value.
 * It uses the same code as with return value, as it will maintain the void
 * type.
 * Arduino code: void functionname { }
 */
Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

/**
 * Code generator to create a function call with a return value.
 * Arduino code: loop { functionname() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['procedures_callreturn'] = function(block) {
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to create a function call without a return value.
 * Arduino code: loop { functionname() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['procedures_callnoreturn'] = function(block) {
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

/**
 * Code generator to create a conditional (X) return value (Y) for a function.
 * Arduino code: if (X) { return Y; }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['procedures_ifreturn'] = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};

/**
 * Code generator to add code into the setup() and loop() functions.
 * Its use is not mandatory, but necessary to add manual code to setup().
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['arduino_functions'] = function(block) {
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    var targetBlock = block.getInputTargetBlock(name);
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    return code;
  }

  var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
  //var setupCode = Blockly.Arduino.scrub_(block, setupBranch); No comment block
  if (setupBranch) {
    Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
  }

  var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
  //var loopcode = Blockly.Arduino.scrub_(block, loopBranch); No comment block
  return loopBranch;
};

// generators/arduino/serial.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino serial blocks.
 *     Arduino Serial library docs: https://www.arduino.cc/en/Reference/Serial
 *
 * TODO: There are more functions that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */

Blockly.Arduino.serial = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator of block for writing to the serial com.
 * Arduino code: loop { Serial.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['serial_print'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  var serialPins = Blockly.Arduino.Boards.selected.serialPins[serialId];
  for (var i = 0; i < serialPins.length; i++) {
    Blockly.Arduino.reservePin(block, serialPins[i][1],
        Blockly.Arduino.PinTypes.SERIAL, 'SERIAL ' + serialPins[i][0]);
  }

  if (checkbox_name) {
    var code = serialId + '.println(' + content + ');\n';
  } else {
    var code = serialId + '.print(' + content + ');\n';
  }
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['serial_setup'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialSpeed = block.getFieldValue('SPEED');
  var serialSetupCode = serialId + '.begin(' + serialSpeed + ');';
  Blockly.Arduino.addSetup('serial_' + serialId, serialSetupCode, true);
  var code = '';
  return code;
};

// generators/arduino/servo.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */

Blockly.Arduino.servo = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator to set an angle (Y) value to a servo pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoName = 'myServo' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Read');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// generators/arduino/spi.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino ode generator for SPI library blocks.
 *     The Arduino SPI library docs: http://arduino.cc/en/Reference/SPI
 */

Blockly.Arduino.spi = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator for the SPI configuration block. It does not add any LoC to
 * the loop(), but it generates code for the setup() function.
 * Arduino code: #include <SPI.h>
 *               setup() { SPI.setBitOrder(X);
 *                         SPI.setDataMode(Y);
 *                         SPI.setClockDivider(Z);
 *                         SPI.begin(); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['spi_setup'] = function(block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiShift = block.getFieldValue('SPI_SHIFT_ORDER');
  var spiClockDivide = block.getFieldValue('SPI_CLOCK_DIVIDE');
  var spiMode = block.getFieldValue('SPI_MODE');

  Blockly.Arduino.addInclude('spi', '#include <SPI.h>');
  Blockly.Arduino.addSetup('spi_order',
      spiId + '.setBitOrder(' + spiShift + ');', true);
  Blockly.Arduino.addSetup('spi_mode',
      spiId + '.setDataMode(' + spiMode + ');', true);
  Blockly.Arduino.addSetup('spi_div',
      spiId + '.setClockDivider(' + spiClockDivide + ');', true);
  Blockly.Arduino.addSetup('spi_begin',
      spiId + '.begin();', true);

  return '';
};

/**
 * Code generator for the SPI transfer block.
 * SPI bus can have several slaves, which are selected using a digital output
 * as a SS pin. This digital pin will be configured as a normal output.
 * Arduino code: #include <SPI.h>
 *               setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, HIGH);
 *                       SPI.transfer(0);
 *                       digitalWrite(X, LOW); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['spi_transfer'] = function(block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiSs = block.getFieldValue('SPI_SS');
  var spiData = Blockly.Arduino.valueToCode(
      block, 'SPI_DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';

  Blockly.Arduino.addInclude('spi', '#include <SPI.h>');
  Blockly.Arduino.addSetup('spi_begin', spiId + '.begin();', false);

  // Reserve SPI pins MOSI, MISO, and SCK
  var spiPins = Blockly.Arduino.Boards.selected.spiPins[spiId];
  for (var i = 0; i < spiPins.length; i++) {
    Blockly.Arduino.reservePin(block, spiPins[i][1],
        Blockly.Arduino.PinTypes.SPI, 'SPI ' + spiPins[i][0]);
  }

  // Configure the Slave Select as a normal output if a pin is used
  if (spiSs !== 'none') {
    Blockly.Arduino.reservePin(
        block, spiSs, Blockly.Arduino.PinTypes.OUTPUT, 'SPI Slave pin');
    var setupCode = 'pinMode(' + spiSs + ', OUTPUT);';
    Blockly.Arduino.addSetup('io_' + spiSs, setupCode, false);
  } // else means the SS pin is always set for the device

  // Add the code, but only use a SS pin if one is selected
  var code = [];
  if (spiSs !== 'none') {
    code.push('digitalWrite(' + spiSs + ', HIGH);');
  }
  code.push(spiId + '.transfer(' + spiData + ');');
  if (spiSs !== 'none') {
    code.push('digitalWrite(' + spiSs + ', LOW);');
  }
  return code.join('\n') + '\n';
};

/**
 * Code generator for the SPI transfer block with a return value.
 * The rest is the same as the spi_transfer block.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['spi_transfer_return'] = function(block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiSs = block.getFieldValue('SPI_SS');
  var spiData = Blockly.Arduino.valueToCode(
      block, 'SPI_DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // The spi_transfer block invoked to generate all setup stuff, code discarded
  var spiTransferOnlyCode = Blockly.Arduino['spi_transfer'](block);
  if (spiSs === 'none') {
    var code = spiId + '.transfer(' + spiData + ')';
  } else {
    var func = [
        'int ' + Blockly.Arduino.DEF_FUNC_NAME + '() {',
        '  int spiReturn = 0;',
        '  digitalWrite(' + spiSs + ', HIGH);',
        '  spiReturn = ' + spiId + '.transfer(' + spiData + ');',
        '  digitalWrite(' + spiSs + ', LOW);',
        '  return spiReturn;',
        '}'];
    var functionName = Blockly.Arduino.addFunction(
        'spiReturnSlave' + spiSs, func.join('\n'));
    var code = functionName + '()';
  }
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

// generators/arduino/stepper.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Stepper library blocks.
 *     The Arduino Stepper library docs: http://arduino.cc/en/Reference/Stepper
 */

Blockly.Arduino.stepper = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator for the stepper generator configuration. Nothing is added
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * Arduino code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
Blockly.Arduino['stepper_config'] = function(block) {
  var pinType = Blockly.Arduino.PinTypes.STEPPER;
  var stepperName = block.getFieldValue('STEPPER_NAME');
  var numberOfPins = block.getFieldValue('STEPPER_NUMBER_OF_PINS');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '90';
  var pins = [block.getFieldValue('STEPPER_PIN1'),
              block.getFieldValue('STEPPER_PIN2')];
  if (numberOfPins === 'FOUR') {
    pins.push(block.getFieldValue('STEPPER_PIN3'));
    pins.push(block.getFieldValue('STEPPER_PIN4'));
  }

  var pinArray = 'int ' + stepperName + '[' + pins.length +'] = {';
  var globalCode = 'Stepper stepper_' + stepperName + '(' + stepperSteps + ', ';
  for (var i = 0; i < pins.length; i++) {
    Blockly.Arduino.reservePin(block, pins[i], pinType, 'Stepper');
    pinArray += pins[i] + ', ';
    globalCode += pins[i] + ', ';
  }
  pinArray = pinArray.slice(0, -2) + '};';
  globalCode = globalCode.slice(0, -2) + ');';

  //stepper is a variable containing the used pins
  Blockly.Arduino.addVariable(stepperName,
      pinArray, true);
  stepperName = 'stepper_' + stepperName;

  Blockly.Arduino.addInclude('stepper', '#include <Stepper.h>');

  Blockly.Arduino.addDeclaration(stepperName, globalCode);

  var setupCode = stepperName + '.setSpeed(' + stepperSpeed + ');';
  Blockly.Arduino.addSetup(stepperName, setupCode, true);

  return '';
};

/**
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_step'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = stepperInstanceName + '.step(' + stepperSteps + ');\n';
  return code;
};

// generators/arduino/text.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the text blocks.
 *     Partially implements the Arduino Serial interface as described in:
 *     http://arduino.cc/en/Reference/Serial
 *
 * TODO: Too many calls to String constructor, which consumes a lot of uC
 *     resources. This will need revisiting for better type recognition.
 *
 * TODO: Trim generator is not correct.
 */

Blockly.Arduino.text = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator for a literal String (X).
 * Arduino code: loop { "X" }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text'] = function(block) {
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for a String concatenation (X...Y). This string can be made
 * up of any number of elements of any type.
 * This block uses a mutator.
 * String construction info: http://arduino.cc/en/Reference/StringConstructor
 * Arduino code: loop { "String(X)" + ... + "String(Y)" }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_join'] = function(block) {
  var code;
  if (block.itemCount_ == 0) {
    return ['""', Blockly.Arduino.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'ADD0',
        Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  } else {
    var argument;
    code = [];
    for (var n = 0; n < block.itemCount_; n++) {
      argument = Blockly.Arduino.valueToCode(
          block, 'ADD' + n, Blockly.Arduino.ORDER_NONE);
      if (argument == '') {
        code[n] = '""';
      } else {
        code[n] = 'String(' + argument + ')';
      }
    }
    code = code.join(' + ');
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
};

/**
 * Code generator for appending text (Y) to a variable in place (X).
 * String constructor info: http://arduino.cc/en/Reference/StringConstructor
 * Arduino code: loop { X += String(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return varName + ' += ' + argument0 + ';\n';
};

/**
 * Code generator to get the length of a string (X).
 * String length info: http://arduino.cc/en/Reference/StringLength
 * Arduino code: loop { String(X).length() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_length'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
  var code = 'String(' + argument0 + ').length()';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to test if a string (X) is null/empty.
 * String length info: http://arduino.cc/en/Reference/StringLength
 * Arduino code: boolean isStringEmpty(...) { ... }
 *               loop { isStringEmpty(X) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_isEmpty'] = function(block) {
  var func = [];
  func.push('boolean ' + Blockly.Arduino.DEF_FUNC_NAME + '(String msg) {');
  func.push('  if (msg.length() == 0) {');
  func.push('    return true;');
  func.push('  } else {');
  func.push('    return false;');
  func.push('  }');
  func.push('}');
  var funcName = Blockly.Arduino.addFunction('isStringEmpty', func.join('\n'));
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  var code = funcName + '(' + argument0 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to trim spaces from a string (X).
 * String trim info: http://arduino.cc/en/Tutorial/StringLengthTrim
 * Arduino code: loop { String(X).trim() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_trim'] = function(block) {
  // Trim spaces.
  Blockly.Arduino.text_trim.OPERATORS = {
    LEFT: '.trim()',
    RIGHT: '.trim()',
    BOTH: '.trim()'
  };
  var mode = block.getFieldValue('MODE');
  var operator = Blockly.Arduino.text_trim.OPERATORS[mode];
  var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return [argument0 + operator, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to print to the serial comm.
 * Serial info: http://arduino.cc/en/Reference/Serial
 * Arduino code: setup { Serial.begin(9600);     }
 *               loop  { Serial.print(String(X)) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['text_print'] = function(block) {
  var serialId = Blockly.Arduino.Boards.selected.serial[0][1];
  var setupCode = serialId + '.begin(9600);';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return serialId + '.print(' + argument0 + ');\n';
};

/**
 * Code generator to prompt the user with a string (X) and request input.
 * Serial info: http://arduino.cc/en/Reference/Serial
 * Arduino code: getUserInputPrompt(...) { ... }
 *               loop { getUserInputPrompt("X")) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_prompt_ext'] = function(block) {
  // Get the first Serial peripheral of arduino board
  var serialId = Blockly.Arduino.Boards.selected.serial[0][1];
  var returnType = block.getFieldValue('TYPE');

  // The function code changes based on reading a number or string
  var func = [];
  var toNumber = returnType == Blockly.Types.NUMBER.output;
  if (toNumber) {
    func.push('int ' + Blockly.Arduino.DEF_FUNC_NAME + '(String msg) {');
  } else {
    func.push('String ' + Blockly.Arduino.DEF_FUNC_NAME + '(String msg) {');
  }
  func.push('  ' + serialId + '.println(msg);');
  func.push('  boolean stringComplete = false;');
  if (toNumber) {
    func.push('  int content = 0;');// + serialId + '.parseInt();');
  } else {
    func.push('  String content = "";');
  }
  func.push('  while (stringComplete == false) {');
  func.push('    if (' + serialId + '.available()) {');
  if (toNumber) {
    func.push('      content = ' + serialId + '.parseInt();');
    func.push('      stringComplete = true;');
  } else {
    func.push('      char readChar = (char)' + serialId + '.read();');
    func.push('      if (readChar == \'\\n\' || readChar == \'\\r\') {');
    func.push('        stringComplete = true;');
    func.push('      } else {');
    func.push('        content += readChar;');
    func.push('      }');
  }
  func.push('    }');
  func.push('  }');
  func.push('  // Empty incoming serial buffer');
  func.push('  while(Serial.available()) { Serial.read(); };');
  func.push('  return content;');
  func.push('}');
  var funcName = Blockly.Arduino.addFunction(
      'getUserInputPrompt' + returnType, func.join('\n'));

  // Only overwrite the serial set up if not present already
  var setupCode = serialId + '.begin(9600);';
  Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);

  var msg = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '""';
  var code = funcName + '(' + msg + ')';

  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};


/* ***************************************************************** *
 * The rest of the blocks have been left unimplemented, as they have *
 * been removed from the toolbox and not used for Arduino code.      *
 * ***************************************************************** */
Blockly.Arduino['text_endString'] = function(block) {
  return ['', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_indexOf'] = function(block) {
  return ['', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_charAt'] = function(block) {
  return ['', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_getSubstring'] = function(block) {
  return ['', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_changeCase'] = function(block) {
  return ['', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_prompt'] = function(block) {
  return ['', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

// generators/arduino/time.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Time blocks.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */

Blockly.Arduino.time = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator for the delay Arduino block.
 * Arduino code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delay'] = function(block) {
  var delayTime = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delay(' + delayTime + ');\n';
  return code;
};

/**
 * Code generator for the delayMicroseconds block.
 * Arduino code: loop { delayMicroseconds(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delaymicros'] = function(block) {
  var delayTimeMs = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

/**
 * Code generator for the elapsed time in milliseconds block.
 * Arduino code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Arduino['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * Arduino code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Arduino['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * Arduino code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['infinite_loop'] = function(block) {
  return 'while(true);\n';
};

// generators/arduino/tone.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Arduino Digital and Analogue input/output.
 *     Arduino built in function docs: http://arduino.cc/en/Reference/HomePage
 */

Blockly.Arduino.tone = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Function for turning the tone library on on a given pin (X).
 * Arduino code: setup { pinMode(X, OUTPUT) }
 *               loop  { tone(X, frequency) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */

Blockly.Arduino['io_tone'] = function(block) {
  var pin = block.getFieldValue('TONEPIN');
  var freq = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Tone Pin');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'tone(' + pin + ',' + freq + ');\n';
  return code;
};

Blockly.Arduino['io_notone'] = function(block) {
  var pin = block.getFieldValue("TONEPIN");
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Tone Pin');
  
  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'noTone(' + pin + ');\n';
  return code;
};

// generators/arduino/variables.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for variables blocks.
 */

Blockly.Arduino.variables = {};
Blockly.Arduino = Blockly.Arduino || {};

/**
 * Code generator for variable (X) getter.
 * Arduino code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['variables_get'] = function(block) {
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * Arduino code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['variables_set'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * Code generator for variable (X) casting (Y).
 * Arduino code: loop { (Y)X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['variables_set_type'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VARIABLE_SETTYPE_INPUT',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varType = Blockly.Arduino.getArduinoType_(
      Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// msg/arduino.js
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview  Ardublockly specific English strings.
 *
 * After modifying this file, either run "build.py" from the blockly directory,
 * or run (from this directory):
 * ../i18n/js_to_json.py
 * to regenerate json/{en,qqq,synonyms}.json.
 *
 * To convert all of the json files to .js files, run:
 * ../i18n/create_messages.py json/*.json
 */

Blockly.Msg.en = {};
Blockly.Msg = Blockly.Msg || {};

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

/**
 * Each message is preceded with a triple-slash comment that becomes the
 * message descriptor.  The build process extracts these descriptors, adds
 * them to msg/json/qqq_ardublockly.json, and they show up in the translation
 * console.
 * Note the strings have to be surrounded by single quotation marks: ''
 */

/**
 * Ardublockly Types
 */
/// Arduino Types - Character C type char
Blockly.Msg.ARD_TYPE_CHAR = 'Character';
/// Arduino Types - Text C type String
Blockly.Msg.ARD_TYPE_TEXT = 'Text';
/// Arduino Types - Boolean type
Blockly.Msg.ARD_TYPE_BOOL = 'Boolean';
/// Arduino Types - Short number C type char
Blockly.Msg.ARD_TYPE_SHORT = 'Short Number';
/// Arduino Types - Number C type integer
Blockly.Msg.ARD_TYPE_NUMBER = 'Number';
/// Arduino Types - Large number C type long integer
Blockly.Msg.ARD_TYPE_LONG = 'Large Number';
/// Arduino Types - Decimal number C type floating point
Blockly.Msg.ARD_TYPE_DECIMAL = 'Decimal';
/// Arduino Types - Array
Blockly.Msg.ARD_TYPE_ARRAY = 'Array';
/// Arduino Types - Null C type void
Blockly.Msg.ARD_TYPE_NULL = 'Null';
/// Arduino Types - Undefined type
Blockly.Msg.ARD_TYPE_UNDEF = 'Undefined';
/// Arduino Types - Place holder value, indicates block with type not connected
Blockly.Msg.ARD_TYPE_CHILDBLOCKMISSING = 'ChildBlockMissing';

/// Arduino Blocks
Blockly.Msg.ARD_HIGH = 'HIGH';
Blockly.Msg.ARD_LOW = 'LOW';
Blockly.Msg.ARD_ANALOGREAD = 'read analog pin#';
Blockly.Msg.ARD_ANALOGREAD_TIP = 'Return value between 0 and 1024';
Blockly.Msg.ARD_ANALOGWRITE = 'set analog pin#';
Blockly.Msg.ARD_ANALOGWRITE_TIP = 'Write analog value between 0 and 255 to a specific PWM Port';
Blockly.Msg.ARD_HIGHLOW_TIP = 'Set a pin state logic High or Low.';
Blockly.Msg.ARD_DIGITALREAD = 'read digital pin#';
Blockly.Msg.ARD_DIGITALREAD_TIP = 'Read digital value on a pin: HIGH or LOW';
Blockly.Msg.ARD_DIGITALWRITE = 'set digitial pin#';
Blockly.Msg.ARD_WRITE_TO = 'to';
Blockly.Msg.ARD_DIGITALWRITE_TIP = 'Write digital value HIGH or LOW to a specific Port';
Blockly.Msg.ARD_BUILTIN_LED = 'set built-in LED';
Blockly.Msg.ARD_BUILTIN_LED_TIP = 'Light on or off for the built-in LED of the Arduino';
Blockly.Msg.ARD_DEFINE = 'Define';
Blockly.Msg.ARD_TONE_PIN = 'Tone PIN#';
Blockly.Msg.ARD_TONE_FREQ = 'frequency';
Blockly.Msg.ARD_TONE_PIN_TIP = 'Generate audio tones on a pin';
Blockly.Msg.ARD_NOTONE_PIN = 'No tone PIN#';
Blockly.Msg.ARD_NOTONE_PIN_TIP = 'Stop generating a tone on a pin';
Blockly.Msg.ARD_MAP = 'Map';
Blockly.Msg.ARD_MAP_VAL = 'value to [0-';
Blockly.Msg.ARD_MAP_TIP = 'Re-maps a number from [0-1024] to another.';
Blockly.Msg.ARD_FUN_RUN_SETUP = 'Arduino run first:';
Blockly.Msg.ARD_FUN_RUN_LOOP = 'Arduino loop forever:';
Blockly.Msg.ARD_FUN_RUN_TIP = 'Defines the Arduino setup() and loop() functions.';
Blockly.Msg.ARD_PIN_WARN1 = 'Pin %1 is needed for %2 as pin %3. Already used as %4.';
Blockly.Msg.ARD_SERIAL_SETUP = 'Setup';
Blockly.Msg.ARD_SERIAL_SPEED = ':  speed to';
Blockly.Msg.ARD_SERIAL_BPS = 'bps';
Blockly.Msg.ARD_SERIAL_SETUP_TIP = 'Selects the speed for a specific Serial peripheral';
Blockly.Msg.ARD_SERIAL_PRINT = 'print';
Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE = 'add new line';
Blockly.Msg.ARD_SERIAL_PRINT_TIP = 'Prints data to the console/serial port as human-readable ASCII text.';
Blockly.Msg.ARD_SERIAL_PRINT_WARN = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.ARD_SERVO_WRITE = 'set SERVO from Pin';
Blockly.Msg.ARD_SERVO_WRITE_TO = 'to';
Blockly.Msg.ARD_SERVO_WRITE_DEG_180 = 'Degrees (0~180)';
Blockly.Msg.ARD_SERVO_WRITE_TIP = 'Set a Servo to an specified angle';
Blockly.Msg.ARD_SERVO_READ = 'read SERVO from PIN#';
Blockly.Msg.ARD_SERVO_READ_TIP = 'Read a Servo angle';
Blockly.Msg.ARD_SPI_SETUP = 'Setup';
Blockly.Msg.ARD_SPI_SETUP_CONF = 'configuration:';
Blockly.Msg.ARD_SPI_SETUP_SHIFT = 'data shift';
Blockly.Msg.ARD_SPI_SETUP_MSBFIRST = 'MSBFIRST';
Blockly.Msg.ARD_SPI_SETUP_LSBFIRST = 'LSBFIRST';
Blockly.Msg.ARD_SPI_SETUP_DIVIDE = 'clock divide';
Blockly.Msg.ARD_SPI_SETUP_MODE = 'SPI mode (idle - edge)';
Blockly.Msg.ARD_SPI_SETUP_MODE0 = '0 (Low - Falling)';
Blockly.Msg.ARD_SPI_SETUP_MODE1 = '1 (Low - Rising)';
Blockly.Msg.ARD_SPI_SETUP_MODE2 = '2 (High - Falling)';
Blockly.Msg.ARD_SPI_SETUP_MODE3 = '3 (High - Rising)';
Blockly.Msg.ARD_SPI_SETUP_TIP = 'Configures the SPI peripheral.';
Blockly.Msg.ARD_SPI_TRANS_NONE = 'none';
Blockly.Msg.ARD_SPI_TRANS_VAL = 'transfer';
Blockly.Msg.ARD_SPI_TRANS_SLAVE = 'to slave pin';
Blockly.Msg.ARD_SPI_TRANS_TIP = 'Send a SPI message to an specified slave device.';
Blockly.Msg.ARD_SPI_TRANS_WARN1 = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.ARD_SPI_TRANS_WARN2 = 'Old pin value %1 is no longer available.';
Blockly.Msg.ARD_SPI_TRANSRETURN_TIP = 'Send a SPI message to an specified slave device and get data back.';
Blockly.Msg.ARD_STEPPER_SETUP = 'Setup stepper motor';
Blockly.Msg.ARD_STEPPER_MOTOR = 'stepper motor:';
Blockly.Msg.ARD_STEPPER_DEFAULT_NAME = 'MyStepper';
Blockly.Msg.ARD_STEPPER_NUMBER_OF_PINS = 'Number of pins';
Blockly.Msg.ARD_STEPPER_TWO_PINS = '2';
Blockly.Msg.ARD_STEPPER_FOUR_PINS = '4';
Blockly.Msg.ARD_STEPPER_PIN1 = 'pin1#';
Blockly.Msg.ARD_STEPPER_PIN2 = 'pin2#';
Blockly.Msg.ARD_STEPPER_PIN3 = 'pin3#';
Blockly.Msg.ARD_STEPPER_PIN4 = 'pin4#';
Blockly.Msg.ARD_STEPPER_REVOLVS = 'how many steps per revolution';
Blockly.Msg.ARD_STEPPER_SPEED = 'set speed (rpm) to';
Blockly.Msg.ARD_STEPPER_SETUP_TIP = 'Configures a stepper motor pinout and other settings.';
Blockly.Msg.ARD_STEPPER_STEP = 'move stepper';
Blockly.Msg.ARD_STEPPER_STEPS = 'steps';
Blockly.Msg.ARD_STEPPER_STEP_TIP = 'Turns the stepper motor a specific number of steps.';
Blockly.Msg.ARD_STEPPER_COMPONENT = 'stepper';
Blockly.Msg.ARD_COMPONENT_WARN1 = 'A %1 configuration block with the same %2 name must be added to use this block!';
Blockly.Msg.ARD_TIME_DELAY = 'wait';
Blockly.Msg.ARD_TIME_MS = 'milliseconds';
Blockly.Msg.ARD_TIME_DELAY_TIP = 'Wait specific time in milliseconds';
Blockly.Msg.ARD_TIME_DELAY_MICROS = 'microseconds';
Blockly.Msg.ARD_TIME_DELAY_MICRO_TIP = 'Wait specific time in microseconds';
Blockly.Msg.ARD_TIME_MILLIS = 'current elapsed Time (milliseconds)';
Blockly.Msg.ARD_TIME_MILLIS_TIP = 'Returns the number of milliseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.ARD_TIME_MICROS = 'current elapsed Time (microseconds)';
Blockly.Msg.ARD_TIME_MICROS_TIP = 'Returns the number of microseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.ARD_TIME_INF = 'wait forever (end program)';
Blockly.Msg.ARD_TIME_INF_TIP = 'Wait indefinitely, stopping the program.';
Blockly.Msg.ARD_VAR_AS = 'as';
Blockly.Msg.ARD_VAR_AS_TIP = 'Sets a value to a specific type';
/// IO blocks - pulseIn - Block for function pulseIn(), it measure a pulse duration in a given pin.
Blockly.Msg.ARD_PULSE_READ = 'measure %1 pulse on pin #%2';
/// IO blocks - pulseIn - Block similar to ARD_PULSE_READ, but it adds a time-out in microseconds.
Blockly.Msg.ARD_PULSE_READ_TIMEOUT = 'measure %1 pulse on pin #%2 (timeout after %3 μs)';
/// IO blocks - pulseIn - Tooltip for pulseIn() block.
Blockly.Msg.ARD_PULSE_TIP = 'Measures the duration of a pulse on the selected pin.';
/// IO blocks - pulseIn - Tooltip for pulseIn() block when it uses the optional argument for time-out.
Blockly.Msg.ARD_PULSETIMEOUT_TIP = 'Measures the duration of a pulse on the selected pin, if it is within the time-out in microseconds.';
Blockly.Msg.ARD_SETTONE = 'Set tone on pin #';
Blockly.Msg.ARD_TONEFREQ = 'at frequency';
Blockly.Msg.ARD_TONE_TIP = 'Sets tone on pin to specified frequency within range 31 - 65535';
Blockly.Msg.ARD_TONE_WARNING = 'Frequency must be in range 31 - 65535';
Blockly.Msg.ARD_NOTONE = 'Turn off tone on pin #';
Blockly.Msg.ARD_NOTONE_TIP = 'Turns the tone off on the selected pin';

/**
 * Ardublockly instances
 */
/// Instances - Menu item to indicate that it will create a new instance
Blockly.Msg.NEW_INSTANCE = 'New instance...';
/// Instances - Menu item to rename an instance name
Blockly.Msg.RENAME_INSTANCE = 'Rename instance...';
/// Instances - Menu item to create a new instance name and apply it to that block
Blockly.Msg.NEW_INSTANCE_TITLE = 'New instance name:';
/// Instances - Confirmation message that a number of instances will be renamed to a new name
Blockly.Msg.RENAME_INSTANCE_TITLE = 'Rename all "%1" instances to:';

export default Blockly;