/**
 * BlocklyDuino
 * Specific function
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for BlocklyDuino.
 * @author gasolin@gmail.com (Gasolin)
 * 
 */
'use strict';

/**
 * Prepare code to send it to function Code.uploadCode.
 */
BlocklyDuino.uploadClick = function() {
    var code = Blockly.Arduino.workspaceToCode();
    alert("Ready to upload to Arduino.");    
    BlocklyDuino.uploadCode(code, function(status, errorInfo) {
        if (status == 200) {
            alert("Program uploaded ok");
        } else {
            alert("Error uploading program: " + errorInfo);
        }
    });
};

/**
 * Send code to Python server on 8080 port.
 */
BlocklyDuino.uploadCode = function(code, callback) {
    var target = document.getElementById('content_arduino');
    var spinner = new Spinner().spin(target);

    var url = "http://127.0.0.1:8080/";
    var method = "POST";

    // You REALLY want async = true.
    // Otherwise, it'll block ALL execution waiting for server response.
    var async = true;
    var request = new XMLHttpRequest();    
    request.onreadystatechange = function() {
        if (request.readyState != 4) { 
            return; 
        }        
        spinner.stop();        
        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        var errorInfo = null;
        switch (status) {
        case 200:
            break;
        case 0:
            errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
            break;
        case 400:
            errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
            break;
        case 500:
            errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
            break;
        case 501:
            errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
            break;
        default:
            errorInfo = "code " + status + "\n\nUnknown error.";
            break;
        };        
        callback(status, errorInfo);
    };
    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(code);	     
};

/**
 * Send blank code to Python server to 'clean' Arduino card firmware.
 */
BlocklyDuino.resetClick = function() {
    var code = "void setup() {} void loop() {}";

    uploadCode(code, function(status, errorInfo) {
        if (status != 200) {
            alert("Error resetting program: " + errorInfo);
        }
    });
};

/**
* Save Arduino generated code to local file.
*/
BlocklyDuino.saveCode = function() {
  var fileName = window.prompt('What would you like to name your file?', 'BlocklyDuino')
  //doesn't save if the user quits the save prompt
  if(fileName){
    var blob = new Blob([Blockly.Arduino.workspaceToCode()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, fileName + '.ino');
  }
};


/**
 * Save blocks to local file.
 * better include Blob and FileSaver for browser compatibility
 */
BlocklyDuino.saveXML = function() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var data = Blockly.Xml.domToText(xml);
  var fileName = window.prompt('What would you like to name your file?', 'BlocklyDuino');
  if(fileName){
    var blob = new Blob([data], {type: 'text/xml'});
    saveAs(blob, fileName + ".blocklyduino");
  }
};

/**
 * Restore code blocks from localStorage, needed for XML load.
 */
BlocklyDuino.restore_blocks = function() {
  if ('localStorage' in window && window.localStorage.arduino) {
    var xml = Blockly.Xml.textToDom(window.localStorage.arduino);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
};

/*
 * auto save and restore blocks
 * for XML load
 */
BlocklyDuino.auto_save_and_restore_blocks = function() {
  // Restore saved blocks in a separate thread so that subsequent
  // initialization is not affected from a failed load.
  window.setTimeout(BlocklyDuino.restore_blocks, 0);
  // Hook a save function onto unload.
  bindEvent(window, 'unload', backup_blocks);
  tabClick(selected);

  // Init load event.
  var loadInput = document.getElementById('loadXMLbutton');
  loadInput.addEventListener('change', loadXMLfunction, false);
  document.getElementById('loadXMLfakeButton').onclick = function() {
    loadInput.click();
  };
};


/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
  if (element.addEventListener) {  // W3C
    element.addEventListener(name, func, false);
  } else if (element.attachEvent) {  // IE
    element.attachEvent('on' + name, func);
  }
}

/**
 * Load blocks from local file.
 */
function loadXMLfunction(event) {
  var files = event.target.files;
  // Only allow uploading one file.
  if (files.length != 1) {
    return;
  }

  // FileReader
  var reader = new FileReader();
  reader.onloadend = function(event) {
    var target = event.target;
    // 2 == FileReader.DONE
    if (target.readyState == 2) {
      try {
        var xml = Blockly.Xml.textToDom(target.result);
      } catch (e) {
        alert('Error parsing XML:\n' + e);
        return;
      }
      var count = Blockly.mainWorkspace.getAllBlocks().length;
      if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
        Blockly.mainWorkspace.clear();
      }
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
    // Reset value of input after loading because Chrome will not fire
    // a 'change' event if the same file is loaded again.
    document.getElementById('loadXMLaction').value = '';
  };
  reader.readAsText(files[0]);
};


/**
 * Change theme and color, useful for disabled people
 */
function changeTheme() {
  var theme = document.getElementById('themeChanger');
  if (theme.value === "modern") {
    Blockly.setTheme(Blockly.Themes.Modern);
  } else if (theme.value === "high_contrast") {
    Blockly.setTheme(Blockly.Themes.HighContrast);
  } else if (theme.value === "black_white") {
    Blockly.setTheme(Blockly.Themes.BlackWhite);
  } else {
    Blockly.setTheme(Blockly.Themes.Classic);
  }
}