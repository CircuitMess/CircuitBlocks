/**
 * BlocklyDuino
 * from Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var BlocklyDuino = {};

/**
 * Lookup for names of supported languages.	 Keys should be in ISO 639 format.
 */
BlocklyDuino.LANGUAGE_NAME = {
  'de': 'Deutsch',
  'en': 'English',
  'fr': 'Français',
  'ja': '日本語'
};

/**
 * List of RTL languages.
 */
BlocklyDuino.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
BlocklyDuino.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
BlocklyDuino.getStringParamFromUrl = function(name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
BlocklyDuino.getLang = function() {
  var lang = BlocklyDuino.getStringParamFromUrl('lang', '');
  if (BlocklyDuino.LANGUAGE_NAME[lang] === undefined) {
	// Default to English.
	lang = 'en';
  }
  return lang;
};

/**
 * Is the current language (BlocklyDuino.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
BlocklyDuino.isRtl = function() {
  return BlocklyDuino.LANGUAGE_RTL.indexOf(BlocklyDuino.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
BlocklyDuino.loadBlocks = function(defaultXml) {
  try {
	var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
	// Firefox sometimes throws a SecurityError when accessing sessionStorage.
	// Restarting Firefox fixes this, so it looks like a bug.
	var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
	// An href with #key trigers an AJAX call to retrieve saved blocks.
	BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
	// Language switching stores the blocks during the reload.
	delete window.sessionStorage.loadOnceBlocks;
	var xml = Blockly.Xml.textToDom(loadOnce);
	Blockly.Xml.domToWorkspace(xml, BlocklyDuino.workspace);
  } else if (defaultXml) {
	// Load the editor with default starting blocks.
	var xml = Blockly.Xml.textToDom(defaultXml);
	Blockly.Xml.domToWorkspace(xml, BlocklyDuino.workspace);
  } else if ('BlocklyStorage' in window) {
	// Restore saved blocks in a separate thread so that subsequent
	// initialization is not affected from a failed load.
	window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Save the blocks and reload with a different language.
 */
BlocklyDuino.changeLanguage = function() {
  // Store the blocks for the duration of the reload.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (window.sessionStorage) {
	var xml = Blockly.Xml.workspaceToDom(BlocklyDuino.workspace);
	var text = Blockly.Xml.domToText(xml);
	window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
	  languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
	search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
	search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
	search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
	  window.location.host + window.location.pathname + search;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
BlocklyDuino.bindClick = function(el, func) {
  if (typeof el == 'string') {
	el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
BlocklyDuino.importPrettify = function() {
  var script = document.createElement('script');
  script.setAttribute('src', './js/addon/run_prettify.js');
  document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
BlocklyDuino.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
	x += element.offsetLeft;
	y += element.offsetTop;
	element = element.offsetParent;
  } while (element);
  return {
	height: height,
	width: width,
	x: x,
	y: y
  };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
BlocklyDuino.LANG = BlocklyDuino.getLang();

/**
 * List of tab names.
 * @private
 */
// Code.TABS_ = ['blocks', 'javascript', 'php', 'python', 'dart', 'lua', 'arduino', 'xml'];
BlocklyDuino.TABS_ = ['blocks', 'arduino'];
BlocklyDuino.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
BlocklyDuino.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  // if (document.getElementById('tab_xml').className == 'tabon') {
	// var xmlTextarea = document.getElementById('content_xml');
	// var xmlText = xmlTextarea.value;
	// var xmlDom = null;
	// try {
	  // xmlDom = Blockly.Xml.textToDom(xmlText);
	// } catch (e) {
	  // var q =
		  // window.confirm(MSG['badXml'].replace('%1', e));
	  // if (!q) {
		// Leave the user on the XML tab.
		// return;
	  // }
	// }
	// if (xmlDom) {
	  // Code.workspace.clear();
	  // Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
	// }
  // }

  if (document.getElementById('tab_blocks').className == 'tabon') {
	BlocklyDuino.workspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < BlocklyDuino.TABS_.length; i++) {
	var name = BlocklyDuino.TABS_[i];
	document.getElementById('tab_' + name).className = 'taboff';
	document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  BlocklyDuino.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
	  'visible';
  BlocklyDuino.renderContent();
  if (clickedName == 'blocks') {
	BlocklyDuino.workspace.setVisible(true);
  }
  Blockly.svgResize(BlocklyDuino.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
BlocklyDuino.renderContent = function() {
  var content = document.getElementById('content_' + BlocklyDuino.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
	var xmlTextarea = document.getElementById('content_xml');
	var xmlDom = Blockly.Xml.workspaceToDom(BlocklyDuino.workspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	xmlTextarea.value = xmlText;
	xmlTextarea.focus();
  // } else if (content.id == 'content_javascript') {
	// Code.attemptCodeGeneration(Blockly.JavaScript, 'js');
  // } else if (content.id == 'content_python') {
	// Code.attemptCodeGeneration(Blockly.Python, 'py');
  // } else if (content.id == 'content_php') {
	// Code.attemptCodeGeneration(Blockly.PHP, 'php');
  // } else if (content.id == 'content_dart') {
	// Code.attemptCodeGeneration(Blockly.Dart, 'dart');
  } else if (content.id == 'content_arduino') {
	BlocklyDuino.attemptCodeGeneration(Blockly.Arduino, 'cpp');
  // } else if (content.id == 'content_lua') {
	// Code.attemptCodeGeneration(Blockly.Lua, 'lua');
  }
};


// This function will escape html passed to it.
// It is needed for correct pretification of code like #include <SoftwareSerial.h>
function htmlEscape(s) {
return s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
}

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 * @param prettyPrintType {string} The file type key for the pretty printer.
 */
BlocklyDuino.attemptCodeGeneration = function(generator, prettyPrintType) {
  var content = document.getElementById('content_' + BlocklyDuino.selected);
  content.textContent = '';
  if (BlocklyDuino.checkAllGeneratorFunctionsDefined(generator)) {
	var code = generator.workspaceToCode(BlocklyDuino.workspace);

	content.textContent = code;
	if (typeof PR.prettyPrintOne == 'function') {
	  code = content.textContent;
	  code = PR.prettyPrintOne(htmlEscape(code), prettyPrintType);
	  content.innerHTML = code;
	}
  }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
BlocklyDuino.checkAllGeneratorFunctionsDefined = function(generator) {
  var blocks = BlocklyDuino.workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
	var blockType = blocks[i].type;
	if (!generator[blockType]) {
	  if (missingBlockGenerators.indexOf(blockType) === -1) {
		missingBlockGenerators.push(blockType);
	  }
	}
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
	var msg = 'The generator code for the following blocks not specified for '
		+ generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
	Blockly.alert(msg);	 // Assuming synchronous. No callback.
  }
  return valid;
};

/**
 * Initialize Blockly.	Called on page load.
 */
BlocklyDuino.init = function() {
  BlocklyDuino.initLanguage();

  var rtl = BlocklyDuino.isRtl();
  var container = document.getElementById('content_area');
  var onresize = function(e) {
	var bBox = BlocklyDuino.getBBox_(container);
	for (var i = 0; i < BlocklyDuino.TABS_.length; i++) {
	  var el = document.getElementById('content_' + BlocklyDuino.TABS_[i]);
	  el.style.top = bBox.y + 'px';
	  el.style.left = bBox.x + 'px';
	  // Height and width need to be set, read back, then set again to
	  // compensate for scrollbars.
	  el.style.height = bBox.height + 'px';
	  el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
	  el.style.width = bBox.width + 'px';
	  el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
	}
	// Make the 'Blocks' tab line up with the toolbox.
	if (BlocklyDuino.workspace && BlocklyDuino.workspace.toolbox_.width) {
	  document.getElementById('tab_blocks').style.minWidth =
		  (BlocklyDuino.workspace.toolbox_.width - 38) + 'px';
		  // Account for the 19 pixel margin and on each side.
	}
  };
  window.addEventListener('resize', onresize, false);

  // The toolbox XML specifies each category name using Blockly's messaging
  // format (eg. `<category name="%{BKY_CATLOGIC}">`).
  // These message keys need to be defined in `Blockly.Msg` in order to
  // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
  // been defined for each language to import each category name message
  // into `Blockly.Msg`.
  // TODO: Clean up the message files so this is done explicitly instead of
  // through this for-loop.
  for (var messageKey in MSG) {
	if (messageKey.indexOf('cat') == 0) {
	  Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
	}
  }

  // Construct the toolbox XML, replacing translated variable names.
  // var toolboxText = document.getElementById('toolbox').outerHTML;
  // toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
	  // function(m, p1, p2) {return p1 + MSG[p2];});
  // var toolboxXml = Blockly.Xml.textToDom(toolboxText);
  
  // Use external file, BlocklyDuino enhancement
	var xml = null;
	var request = new XMLHttpRequest();
	request.open('GET', 'toolbox/blocklyduino.xml', false);	 
	request.send();
	if (request.readyState == 4 && request.status == 200) {
		xml = request.responseXML;
	}
	var toolboxXml = new XMLSerializer().serializeToString(xml.documentElement);

  BlocklyDuino.workspace = Blockly.inject('content_blocks',
		{
		grid:
		  {spacing: 25,
		   length: 3,
		   colour: '#ccc',
		   snap: true
		   },
		media: '../blockly/media/',
		sounds: true,
		rtl: rtl,
		toolbox: toolboxXml,
		trashcan: true,
		zoom:
		   {controls: true,
			wheel: true,
			startScale: 1.0,
			maxScale: 5,
			minScale: 0.2,
			scaleSpeed: 1.2
			},
		}
	);

  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
  // Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  BlocklyDuino.loadBlocks('');

  if ('BlocklyStorage' in window) {
	// Hook a save function onto unload.
	BlocklyStorage.backupOnUnload(BlocklyDuino.workspace);
  }

  BlocklyDuino.tabClick(BlocklyDuino.selected);

  BlocklyDuino.bindClick('uploadButton',
	  function() {BlocklyDuino.uploadClick();});
  BlocklyDuino.bindClick('resetButton',
	  function() {BlocklyDuino.resetClick();});
  BlocklyDuino.bindClick('trashButton',
	  function() {BlocklyDuino.discard(); BlocklyDuino.renderContent();});
  BlocklyDuino.bindClick('saveCodeButton',
	  function() {BlocklyDuino.saveCode();});
  BlocklyDuino.bindClick('saveXMLButton',
	  function() {BlocklyDuino.saveXML();});

  for (var i = 0; i < BlocklyDuino.TABS_.length; i++) {
	var name = BlocklyDuino.TABS_[i];
	BlocklyDuino.bindClick('tab_' + name,
		function(name_) {return function() {BlocklyDuino.tabClick(name_);};}(name));
  }
  onresize();
  Blockly.svgResize(BlocklyDuino.workspace);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyDuino.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
BlocklyDuino.initLanguage = function() {
  // Set the HTML's language and direction.
  var rtl = BlocklyDuino.isRtl();
  document.dir = rtl ? 'rtl' : 'ltr';
  document.head.parentElement.setAttribute('lang', BlocklyDuino.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in BlocklyDuino.LANGUAGE_NAME) {
	languages.push([BlocklyDuino.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function(a, b) {
	// Sort based on first argument ('English', 'Русский', '简体字', etc).
	if (a[0] > b[0]) return 1;
	if (a[0] < b[0]) return -1;
	return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');
  languageMenu.options.length = 0;
  for (var i = 0; i < languages.length; i++) {
	var tuple = languages[i];
	var lang = tuple[tuple.length - 1];
	var option = new Option(tuple[0], lang);
	if (lang == BlocklyDuino.LANG) {
	  option.selected = true;
	}
	languageMenu.options.add(option);
  }
  languageMenu.addEventListener('change', BlocklyDuino.changeLanguage, true);

  // Inject language strings.
  document.title += ' ' + MSG['title'];
  // document.getElementById('title').textContent = MSG['title'];
  document.getElementById('tab_blocks').textContent = MSG['blocks'];

  // document.getElementById('linkButton').title = MSG['linkTooltip'];
  // document.getElementById('runButton').title = MSG['runTooltip'];
  document.getElementById('trashButton').title = MSG['trashTooltip'];
  //change Blockly title span by this one
  document.getElementById('title2').textContent = Blockly.Msg.TITLE2;
  //change Blockly title buttons by this one
  document.getElementById('uploadButton_span').textContent = MSG['uploadButton_span'];
  document.getElementById('resetButton_span').textContent = MSG['resetButton_span'];
  document.getElementById('trashButton_span').textContent = MSG['trashButton_span'];
  document.getElementById('saveCodeButton_span').textContent = MSG['saveCodeButton_span'];
  document.getElementById('saveXMLButton_span').textContent = MSG['saveXMLButton_span'];
  document.getElementById('loadXMLfakeButton_span').textContent = MSG['loadXMLfakeButton_span'];
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.	 Catch infinite loops.
 */
//not used by BlocklyDuino

// Code.runJS = function() {
  // Blockly.JavaScript.INFINITE_LOOP_TRAP = '	checkTimeout();\n';
  // var timeouts = 0;
  // var checkTimeout = function() {
	// if (timeouts++ > 1000000) {
	  // throw MSG['timeout'];
	// }
  // };
  // var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
  // Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  // try {
	// eval(code);
  // } catch (e) {
	// alert(MSG['badCode'].replace('%1', e));
  // }
// };

/**
 * Discard all blocks from the workspace.
 */
BlocklyDuino.discard = function() {
  var count = BlocklyDuino.workspace.getAllBlocks(false).length;
  if (count < 2 ||
	  window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
	BlocklyDuino.workspace.clear();
	if (window.location.hash) {
	  window.location.hash = '';
	}
  }
};

// Load the Code demo's language strings.
// document.write('<script src="../blockly/demos/code/msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="../blockly/msg/js/' + BlocklyDuino.LANG + '.js"></script>\n');

// Load BlocklyDuino's language strings.
document.write('<script src="./msg/blocklyduino/' + BlocklyDuino.LANG + '.js"></script>\n');
document.write('<script src="./msg/blocks/' + BlocklyDuino.LANG + '.js"></script>\n');

window.addEventListener('load', BlocklyDuino.init);