/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for colour blocks.
 *
 * TODO: These blocks do not really serve a purpose for Arduino code.
 */

'use strict';

goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.colour');


Blockly.Arduino['colour_picker'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_random'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_rgb'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_blend'] = Blockly.Arduino.noGeneratorCodeInline;
