/* eslint-disable */
var self = window.self;

goog.require("Blockly");

goog.provide("Blockly.Blocks");

goog.provide("Blockly.Colours");
goog.provide("Blockly.Constants.Logic");
goog.provide("Blockly.Constants.Loops");
goog.provide("Blockly.Constants.Math");
goog.provide("Blockly.Constants.Text");
goog.provide("Blockly.Constants.Procedures");
goog.provide("Blockly.Constants.Variables");

var goog = Blockly.goog;

Blockly.Colours = {
  text: "#575E75",
  workspace: "#F9F9F9",
  toolboxHover: "#4C97FF",
  toolboxSelected: "#e9eef2",
  toolboxText: "#575E75",
  toolbox: "#FFFFFF",
  flyout: "#444",
  scrollbar: "#CECDCE",
  scrollbarHover: "#CECDCE",
  textField: "#FFFFFF",
  insertionMarker: "#000000",
  insertionMarkerOpacity: .2,
  dragShadowOpacity: .4,
  stackGlow: "#FFF200",
  stackGlowSize: 4,
  stackGlowOpacity: 1,
  replacementGlow: "#FFF200",
  replacementGlowSize: 2,
  replacementGlowOpacity: 1,
  highlightGlow: "#FFF200",
  highlightGlowSize: 1.1,
  highlightGlowOpacity: 1,
  selectedGlow: "#FFF200",
  selectedGlowSize: .4,
  warningGlow: "#E53D00",
  warningGlowSize: 1.1,
  warningGlowOpacity: 1,
  colourPickerStroke: "#FFFFFF",
  fieldShadow: "rgba(255, 255, 255, 0.2)",
  dropDownShadow: "rgba(0, 0, 0, .3)",
  numPadBackground: "#547AB2",
  numPadBorder: "#435F91",
  numPadActiveBackground: "#435F91",
  numPadText: "#FFFFFF",
  valueReportBackground: "#FFFFFF",
  valueReportBorder: "#AAAAAA",
  canvasTransitionLength: 500
};
Blockly.constants = {};
Blockly.DRAG_RADIUS = 3;
Blockly.FLYOUT_DRAG_RADIUS = 10;
Blockly.SNAP_RADIUS = 48;
Blockly.CONNECTING_SNAP_RADIUS = 96;
Blockly.CURRENT_CONNECTION_PREFERENCE = 20;
Blockly.BUMP_DELAY = 0;
Blockly.COLLAPSE_CHARS = 30;
Blockly.LONGPRESS = 750;
Blockly.SOUND_LIMIT = 100;
Blockly.DRAG_STACK = !0;
Blockly.HSV_SATURATION = .45;
Blockly.HSV_VALUE = .65;
Blockly.SPRITE = {width: 96, height: 124, url: "sprites.png"};
Blockly.SVG_NS = "http://www.w3.org/2000/svg";
Blockly.HTML_NS = "http://www.w3.org/1999/xhtml";
Blockly.INPUT_VALUE = 1;
Blockly.OUTPUT_VALUE = 2;
Blockly.NEXT_STATEMENT = 3;
Blockly.PREVIOUS_STATEMENT = 4;
Blockly.DUMMY_INPUT = 5;
Blockly.ALIGN_LEFT = -1;
Blockly.ALIGN_CENTRE = 0;
Blockly.ALIGN_RIGHT = 1;
Blockly.DRAG_NONE = 0;
Blockly.DRAG_STICKY = 1;
Blockly.DRAG_BEGIN = 1;
Blockly.DRAG_FREE = 2;
Blockly.OPPOSITE_TYPE = [];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT;
Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT;
Blockly.TOOLBOX_AT_TOP = 0;
Blockly.TOOLBOX_AT_BOTTOM = 1;
Blockly.TOOLBOX_AT_LEFT = 2;
Blockly.TOOLBOX_AT_RIGHT = 3;
Blockly.OUTPUT_SHAPE_HEXAGONAL = 1;
Blockly.OUTPUT_SHAPE_ROUND = 2;
Blockly.OUTPUT_SHAPE_SQUARE = 3;
Blockly.DELETE_AREA_NONE = null;
Blockly.DELETE_AREA_TRASH = 1;
Blockly.DELETE_AREA_TOOLBOX = 2;
Blockly.VARIABLE_CATEGORY_NAME = "VARIABLE";
Blockly.VARIABLE_DYNAMIC_CATEGORY_NAME = "VARIABLE_DYNAMIC";
Blockly.PROCEDURE_CATEGORY_NAME = "PROCEDURE";
Blockly.CREATE_VARIABLE_ID = "CREATE_VARIABLE";
Blockly.RENAME_VARIABLE_ID = "RENAME_VARIABLE_ID";
Blockly.DELETE_VARIABLE_ID = "DELETE_VARIABLE_ID";
Blockly.FUNCTION_DEFINITION_BLOCK_TYPE = "function_definition";
Blockly.FUNCTION_DECLARATION_BLOCK_TYPE = "function_declaration";
Blockly.FUNCTION_CALL_BLOCK_TYPE = "function_call";
Blockly.Constants = {};
Blockly.Constants.Colour = {};
Blockly.Constants.Colour.HUE = 20;
Blockly.defineBlocksWithJsonArray([{
  type: "colour_picker",
  message0: "%1",
  args0: [{type: "field_colour", name: "COLOUR", colour: "#ff0000"}],
  output: "Colour",
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: Blockly.Colours.textField,
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_COLOUR_PICKER_HELPURL}",
  tooltip: "%{BKY_COLOUR_PICKER_TOOLTIP}",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "colour_random",
  message0: "%{BKY_COLOUR_RANDOM_TITLE}",
  output: "Colour",
  colour: "%{BKY_COLOUR_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_COLOUR_RANDOM_HELPURL}",
  tooltip: "%{BKY_COLOUR_RANDOM_TOOLTIP}"
}, {
  type: "colour_rgb",
  message0: "%{BKY_COLOUR_RGB_TITLE} %{BKY_COLOUR_RGB_RED} %1 %{BKY_COLOUR_RGB_GREEN} %2 %{BKY_COLOUR_RGB_BLUE} %3",
  args0: [{type: "input_value", name: "RED", check: "Number", align: "LEFT"}, {
    type: "input_value",
    name: "GREEN",
    check: "Number",
    align: "LEFT"
  }, {type: "input_value", name: "BLUE", check: "Number", align: "LEFT"}],
  output: "Colour",
  colour: "%{BKY_COLOUR_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_COLOUR_RGB_HELPURL}",
  tooltip: "%{BKY_COLOUR_RGB_TOOLTIP}"
}, {
  type: "colour_blend",
  message0: "%{BKY_COLOUR_BLEND_TITLE} %{BKY_COLOUR_BLEND_COLOUR1} %1 %{BKY_COLOUR_BLEND_COLOUR2} %2 %{BKY_COLOUR_BLEND_RATIO} %3",
  args0: [{type: "input_value", name: "COLOUR1", check: "Colour", align: "LEFT"}, {
    type: "input_value",
    name: "COLOUR2",
    check: "Colour",
    align: "LEFT"
  }, {type: "input_value", name: "RATIO", check: "Number", align: "LEFT"}],
  output: "Colour",
  colour: "%{BKY_COLOUR_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_COLOUR_BLEND_HELPURL}",
  tooltip: "%{BKY_COLOUR_BLEND_TOOLTIP}"
}]);/*

 PXT Blockly

 Copyright (c) Microsoft Corporation. All rights reserved.
 https://github.com/Microsoft/pxt-blockly

 See LICENSE file for details.
*/
Blockly.PXTBlockly = {};
Blockly.PXTBlockly.Extensions = {};
Blockly.PXTBlockly.Extensions.INLINE_SVGS = function () {
  this.ADD_IMAGE_DATAURI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0icmVwZWF0IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJhZGQuc3ZnIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+cmVwZWF0PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczEzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZjQ4MjEiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTY4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NjkiCiAgICAgaWQ9Im5hbWVkdmlldzExIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOS42NjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjEyLjkxNTI1NCIKICAgICBpbmtzY2FwZTpjeT0iMTYuMDY3Nzk2IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0icmVwZWF0IiAvPjxzdHlsZQogICAgIHR5cGU9InRleHQvY3NzIgogICAgIGlkPSJzdHlsZTMiPgoJLnN0MHtmaWxsOiNDRjhCMTc7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPjx0aXRsZQogICAgIGlkPSJ0aXRsZTUiPnJlcGVhdDwvdGl0bGU+PHJlY3QKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC4wNzg0MzEzNyIKICAgICBpZD0icmVjdDQxNDMiCiAgICAgd2lkdGg9IjQuMDUwMDAwMiIKICAgICBoZWlnaHQ9IjEyLjM5NzA1IgogICAgIHg9IjkuOTc1MDAwNCIKICAgICB5PSItMTguMTk4NTI2IgogICAgIHJ4PSIwLjgxIgogICAgIHJ5PSIwLjgxIgogICAgIHRyYW5zZm9ybT0ic2NhbGUoMSwtMSkiIC8+PHJlY3QKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC4wNzg0MzEzNyIKICAgICBpZD0icmVjdDQxNDMtMSIKICAgICB3aWR0aD0iNC4wNTAwMDAyIgogICAgIGhlaWdodD0iMTIuMzk3MTE5IgogICAgIHg9IjkuOTc1MDAwNCIKICAgICB5PSI1LjgwMTQ0MDciCiAgICAgcng9IjAuODEiCiAgICAgcnk9IjAuODEiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMCwxLDEsMCwwLDApIiAvPjxjaXJjbGUKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICBpZD0icGF0aDQxMzYiCiAgICAgY3g9IjEyIgogICAgIGN5PSIxMiIKICAgICByPSIxMC41MDMxOTEiIC8+PC9zdmc+";
  this.REMOVE_IMAGE_DATAURI =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0icmVwZWF0IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJyZW1vdmUuc3ZnIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+cmVwZWF0PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczEzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZjFhZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTY4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NTAiCiAgICAgaWQ9Im5hbWVkdmlldzExIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOS42NjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjAuMDUwODQ3NTIxIgogICAgIGlua3NjYXBlOmN5PSI5Ljk2NjEwMTciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJyZXBlYXQiIC8+PHN0eWxlCiAgICAgdHlwZT0idGV4dC9jc3MiCiAgICAgaWQ9InN0eWxlMyI+Cgkuc3Qwe2ZpbGw6I0NGOEIxNzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+PHRpdGxlCiAgICAgaWQ9InRpdGxlNSI+cmVwZWF0PC90aXRsZT48cmVjdAogICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOnNxdWFyZTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eTowLjA3ODQzMTM3IgogICAgIGlkPSJyZWN0NDE0My0xIgogICAgIHdpZHRoPSI0LjA1MDAwMDIiCiAgICAgaGVpZ2h0PSIxMi4zOTcxMTkiCiAgICAgeD0iOS45NzUwMDA0IgogICAgIHk9IjUuODAxNDQwNyIKICAgICByeD0iMC44MSIKICAgICByeT0iMC44MSIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLDEsMSwwLDAsMCkiIC8+PGNpcmNsZQogICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnNxdWFyZTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgIGlkPSJwYXRoNDEzNiIKICAgICBjeD0iMTIiCiAgICAgY3k9IjEyIgogICAgIHI9IjEwLjUwMzE5MSIgLz48L3N2Zz4="
};
Blockly.PXTBlockly.Extensions.FUNCTION_CONTEXTMENU_EDIT = {
  customContextMenu: function (a) {
    a.push(Blockly.Functions.makeEditOption(this));
    if (this.type == Blockly.FUNCTION_DEFINITION_BLOCK_TYPE) for (var b = 0, c; c = a[b]; b++) if (c.text == Blockly.Msg.DUPLICATE_BLOCK) {
      a.splice(b, 1);
      break
    }
  }
};
Blockly.PXTBlockly.Extensions.OUTPUT_NUMBER = function () {
  this.setInputsInline(!0);
  this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
  this.setOutput(!0, "Number")
};
Blockly.PXTBlockly.Extensions.OUTPUT_STRING = function () {
  this.setInputsInline(!0);
  this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
  this.setOutput(!0, "String")
};
Blockly.PXTBlockly.Extensions.OUTPUT_BOOLEAN = function () {
  this.setInputsInline(!0);
  this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
  this.setOutput(!0, "Boolean")
};
Blockly.PXTBlockly.Extensions.registerAll = function () {
  Blockly.Extensions.register("inline-svgs", this.INLINE_SVGS);
  Blockly.Extensions.registerMixin("function_contextmenu_edit", Blockly.PXTBlockly.Extensions.FUNCTION_CONTEXTMENU_EDIT);
  Blockly.Extensions.register("output_number", Blockly.PXTBlockly.Extensions.OUTPUT_NUMBER);
  Blockly.Extensions.register("output_string", Blockly.PXTBlockly.Extensions.OUTPUT_STRING);
  Blockly.Extensions.register("output_boolean", Blockly.PXTBlockly.Extensions.OUTPUT_BOOLEAN)
};
Blockly.PXTBlockly.Extensions.registerAll();
Blockly.Constants.Lists = {};
Blockly.Constants.Lists.HUE = 260;
Blockly.defineBlocksWithJsonArray([{
  type: "lists_create_empty",
  message0: "%{BKY_LISTS_CREATE_EMPTY_TITLE}",
  output: "Array",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_LISTS_HUE}",
  tooltip: "%{BKY_LISTS_CREATE_EMPTY_TOOLTIP}",
  helpUrl: "%{BKY_LISTS_CREATE_EMPTY_HELPURL}"
}, {
  type: "lists_repeat",
  message0: "%{BKY_LISTS_REPEAT_TITLE}",
  args0: [{type: "input_value", name: "ITEM"}, {type: "input_value", name: "NUM", check: "Number"}],
  output: "Array",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_LISTS_HUE}",
  tooltip: "%{BKY_LISTS_REPEAT_TOOLTIP}",
  helpUrl: "%{BKY_LISTS_REPEAT_HELPURL}"
}, {
  type: "lists_reverse",
  message0: "%{BKY_LISTS_REVERSE_MESSAGE0}",
  args0: [{type: "input_value", name: "LIST", check: "Array"}],
  output: "Array",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  inputsInline: !0,
  colour: "%{BKY_LISTS_HUE}",
  tooltip: "%{BKY_LISTS_REVERSE_TOOLTIP}",
  helpUrl: "%{BKY_LISTS_REVERSE_HELPURL}"
}, {
  type: "lists_isEmpty",
  message0: "%{BKY_LISTS_ISEMPTY_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: ["String", "Array"]}],
  output: "Boolean",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  colour: "%{BKY_LISTS_HUE}",
  tooltip: "%{BKY_LISTS_ISEMPTY_TOOLTIP}",
  helpUrl: "%{BKY_LISTS_ISEMPTY_HELPURL}"
}, {
  type: "lists_length",
  message0: "%{BKY_LISTS_LENGTH_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: ["String", "Array"]}],
  output: "Number",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_LISTS_HUE}",
  tooltip: "%{BKY_LISTS_LENGTH_TOOLTIP}",
  helpUrl: "%{BKY_LISTS_LENGTH_HELPURL}"
}]);
Blockly.Blocks.lists_create_with = {
  init: function () {
    Blockly.Extensions.apply("inline-svgs", this, !1);
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(!0, "Array");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setInputsInline(!0);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
  }, mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("items", this.itemCount_);
    return a
  },
  domToMutation: function (a) {
    this.itemCount_ = parseInt(a.getAttribute("items"), 10);
    this.updateShape_()
  }, storeConnections_: function () {
    this.valueConnections_ = [];
    for (var a = 0; a < this.itemCount_; a++) this.valueConnections_.push(this.getInput("ADD" + a).connection.targetConnection)
  }, restoreConnections_: function () {
    for (var a = 0; a < this.itemCount_; a++) Blockly.Mutator.reconnect(this.valueConnections_[a], this, "ADD" + a)
  }, addItem_: function () {
    this.storeConnections_();
    this.update_(function () {
      this.itemCount_++
    });
    this.restoreConnections_();
    if (1 < this.itemCount_) {
      var a = this.getInput("ADD0");
      if (a && a.connection.targetConnection) {
        var b = this.getInput("ADD" + (this.itemCount_ - 1)), c = a.connection.getShadowDom();
        c && (a = document.createElement("shadow"), c = c.getAttribute("type"), a.setAttribute("type", c), c = document.createElement("field"), c.setAttribute("name", "NUM"), a.appendChild(c), a && (a.setAttribute("id", Blockly.utils.genUid()), b.connection.setShadowDom(a), b.connection.respawnShadow_()))
      }
    }
  }, removeItem_: function () {
    this.storeConnections_();
    this.update_(function () {
      this.itemCount_--
    });
    this.restoreConnections_()
  }, update_: function (a) {
    Blockly.Events.setGroup(!0);
    var b = this, c = b.mutationToDom();
    c = c && Blockly.Xml.domToText(c);
    var d = b.rendered;
    b.rendered = !1;
    a && a.call(this);
    this.updateShape_();
    b.rendered = d;
    b.initSvg();
    var e = Blockly.Events.getGroup();
    a = (a = b.mutationToDom()) && Blockly.Xml.domToText(a);
    c != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(b, "mutation", null, c, a)), setTimeout(function () {
      Blockly.Events.setGroup(e);
      b.bumpNeighbours_();
      Blockly.Events.setGroup(!1)
    }, Blockly.BUMP_DELAY));
    b.rendered && b.render();
    Blockly.Events.setGroup(!1)
  }, updateShape_: function () {
    var a = this, b = function () {
      a.removeItem_()
    };
    this.itemCount_ ? (this.getInput("EMPTY") && this.removeInput("EMPTY"), this.getInput("TITLE") || this.appendDummyInput("TITLE").appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)) : (this.getInput("TITLE") && this.removeInput("TITLE"), this.getInput("EMPTY") || this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE));
    var c = 0;
    for (c = 0; c < this.itemCount_; c++) this.getInput("ADD" +
      c) || this.appendValueInput("ADD" + c);
    for (; this.getInput("ADD" + c);) this.removeInput("ADD" + c), c++;
    this.getInput("BUTTONS") && this.removeInput("BUTTONS");
    c = this.appendDummyInput("BUTTONS");
    0 < this.itemCount_ && c.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, 24, 24, !1, "*", b));
    c.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, 24, 24, !1, "*", function () {
      a.addItem_()
    }));
    b = 5 >= this.itemCount_;
    this.setInputsInline(b);
    this.setOutputShape(b ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE)
  }
};
Blockly.Blocks.lists_create_with_container = {
  init: function () {
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput("STACK");
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = !1
  }
};
Blockly.Blocks.lists_create_with_item = {
  init: function () {
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = !1
  }
};
Blockly.Blocks.lists_indexOf = {
  init: function () {
    var a = [[Blockly.Msg.LISTS_INDEX_OF_FIRST, "FIRST"], [Blockly.Msg.LISTS_INDEX_OF_LAST, "LAST"]];
    this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.setOutput(!0, "Number");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
    this.appendValueInput("FIND").appendField(new Blockly.FieldDropdown(a), "END");
    this.setInputsInline(!0);
    var b = this;
    this.setTooltip(function () {
      return Blockly.Msg.LISTS_INDEX_OF_TOOLTIP.replace("%1", b.workspace.options.oneBasedIndex ? "0" : "-1")
    })
  }
};
Blockly.Blocks.lists_getIndex = {
  init: function () {
    var a = [[Blockly.Msg.LISTS_GET_INDEX_GET, "GET"], [Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, "GET_REMOVE"], [Blockly.Msg.LISTS_GET_INDEX_REMOVE, "REMOVE"]];
    this.WHERE_OPTIONS = [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"], [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"], [Blockly.Msg.LISTS_GET_INDEX_FIRST, "FIRST"], [Blockly.Msg.LISTS_GET_INDEX_LAST, "LAST"], [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    a = new Blockly.FieldDropdown(a, function (a) {
      this.sourceBlock_.updateStatement_("REMOVE" == a)
    });
    this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
    this.appendDummyInput().appendField(a, "MODE").appendField("", "SPACE");
    this.appendDummyInput("AT");
    Blockly.Msg.LISTS_GET_INDEX_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
    this.setInputsInline(!0);
    this.setOutput(!0);
    this.updateAt_(!0);
    var b = this;
    this.setTooltip(function () {
      var a = b.getFieldValue("MODE"), d = b.getFieldValue("WHERE"), e = "";
      switch (a + " " + d) {
        case "GET FROM_START":
        case "GET FROM_END":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
          break;
        case "GET FIRST":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FIRST;
          break;
        case "GET LAST":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_LAST;
          break;
        case "GET RANDOM":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
          break;
        case "GET_REMOVE FROM_START":
        case "GET_REMOVE FROM_END":
          e =
            Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
          break;
        case "GET_REMOVE FIRST":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST;
          break;
        case "GET_REMOVE LAST":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST;
          break;
        case "GET_REMOVE RANDOM":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
          break;
        case "REMOVE FROM_START":
        case "REMOVE FROM_END":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM;
          break;
        case "REMOVE FIRST":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST;
          break;
        case "REMOVE LAST":
          e =
            Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST;
          break;
        case "REMOVE RANDOM":
          e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM
      }
      if ("FROM_START" == d || "FROM_END" == d) e += "  " + ("FROM_START" == d ? Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP : Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP).replace("%1", b.workspace.options.oneBasedIndex ? "#1" : "#0");
      return e
    })
  }, mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("statement", !this.outputConnection);
    var b = this.getInput("AT").type == Blockly.INPUT_VALUE;
    a.setAttribute("at", b);
    return a
  }, domToMutation: function (a) {
    var b = "true" == a.getAttribute("statement");
    this.updateStatement_(b);
    a = "false" != a.getAttribute("at");
    this.updateAt_(a)
  }, updateStatement_: function (a) {
    a != !this.outputConnection && (this.unplug(!0, !0), a ? (this.setOutput(!1), this.setPreviousStatement(!0), this.setNextStatement(!0)) : (this.setPreviousStatement(!1), this.setNextStatement(!1), this.setOutput(!0)))
  }, updateAt_: function (a) {
    this.removeInput("AT");
    this.removeInput("ORDINAL", !0);
    a ? (this.appendValueInput("AT").setCheck("Number"),
    Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
    var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (b) {
      var c = "FROM_START" == b || "FROM_END" == b;
      if (c != a) {
        var e = this.sourceBlock_;
        e.updateAt_(c);
        e.setFieldValue(b, "WHERE");
        return null
      }
    });
    this.getInput("AT").appendField(b, "WHERE");
    Blockly.Msg.LISTS_GET_INDEX_TAIL && this.moveInputBefore("TAIL", null)
  }
};
Blockly.Blocks.lists_setIndex = {
  init: function () {
    var a = [[Blockly.Msg.LISTS_SET_INDEX_SET, "SET"], [Blockly.Msg.LISTS_SET_INDEX_INSERT, "INSERT"]];
    this.WHERE_OPTIONS = [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"], [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"], [Blockly.Msg.LISTS_GET_INDEX_FIRST, "FIRST"], [Blockly.Msg.LISTS_GET_INDEX_LAST, "LAST"], [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]];
    this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown(a), "MODE").appendField("", "SPACE");
    this.appendDummyInput("AT");
    this.appendValueInput("TO").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
    this.updateAt_(!0);
    var b = this;
    this.setTooltip(function () {
      var a = b.getFieldValue("MODE"), d = b.getFieldValue("WHERE"), e = "";
      switch (a + " " + d) {
        case "SET FROM_START":
        case "SET FROM_END":
          e =
            Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FROM;
          break;
        case "SET FIRST":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FIRST;
          break;
        case "SET LAST":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_LAST;
          break;
        case "SET RANDOM":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_RANDOM;
          break;
        case "INSERT FROM_START":
        case "INSERT FROM_END":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FROM;
          break;
        case "INSERT FIRST":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST;
          break;
        case "INSERT LAST":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_LAST;
          break;
        case "INSERT RANDOM":
          e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM
      }
      if ("FROM_START" == d || "FROM_END" == d) e += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", b.workspace.options.oneBasedIndex ? "#1" : "#0");
      return e
    })
  }, mutationToDom: function () {
    var a = document.createElement("mutation"), b = this.getInput("AT").type == Blockly.INPUT_VALUE;
    a.setAttribute("at", b);
    return a
  }, domToMutation: function (a) {
    a = "false" != a.getAttribute("at");
    this.updateAt_(a)
  }, updateAt_: function (a) {
    this.removeInput("AT");
    this.removeInput("ORDINAL", !0);
    a ? (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
    var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (b) {
      var c = "FROM_START" == b || "FROM_END" == b;
      if (c != a) {
        var e = this.sourceBlock_;
        e.updateAt_(c);
        e.setFieldValue(b, "WHERE");
        return null
      }
    });
    this.moveInputBefore("AT", "TO");
    this.getInput("ORDINAL") && this.moveInputBefore("ORDINAL",
      "TO");
    this.getInput("AT").appendField(b, "WHERE")
  }
};
Blockly.Blocks.lists_getSublist = {
  init: function () {
    this.WHERE_OPTIONS_1 = [[Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, "FROM_START"], [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, "FROM_END"], [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, "FIRST"]];
    this.WHERE_OPTIONS_2 = [[Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, "FROM_START"], [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, "FROM_END"], [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, "LAST"]];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
    this.appendDummyInput("AT1");
    this.appendDummyInput("AT2");
    Blockly.Msg.LISTS_GET_SUBLIST_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
    this.setInputsInline(!0);
    this.setOutput(!0, "Array");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.updateAt_(1, !0);
    this.updateAt_(2, !0);
    this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP)
  }, mutationToDom: function () {
    var a =
      document.createElement("mutation"), b = this.getInput("AT1").type == Blockly.INPUT_VALUE;
    a.setAttribute("at1", b);
    b = this.getInput("AT2").type == Blockly.INPUT_VALUE;
    a.setAttribute("at2", b);
    return a
  }, domToMutation: function (a) {
    var b = "true" == a.getAttribute("at1");
    a = "true" == a.getAttribute("at2");
    this.updateAt_(1, b);
    this.updateAt_(2, a)
  }, updateAt_: function (a, b) {
    this.removeInput("AT" + a);
    this.removeInput("ORDINAL" + a, !0);
    b ? (this.appendValueInput("AT" + a).setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL" +
      a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT" + a);
    var c = new Blockly.FieldDropdown(this["WHERE_OPTIONS_" + a], function (c) {
      var d = "FROM_START" == c || "FROM_END" == c;
      if (d != b) {
        var f = this.sourceBlock_;
        f.updateAt_(a, d);
        f.setFieldValue(c, "WHERE" + a);
        return null
      }
    });
    this.getInput("AT" + a).appendField(c, "WHERE" + a);
    1 == a && (this.moveInputBefore("AT1", "AT2"), this.getInput("ORDINAL1") && this.moveInputBefore("ORDINAL1", "AT2"));
    Blockly.Msg.LISTS_GET_SUBLIST_TAIL && this.moveInputBefore("TAIL", null)
  }
};
Blockly.Blocks.lists_sort = {
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.LISTS_SORT_TITLE,
      args0: [{
        type: "field_dropdown",
        name: "TYPE",
        options: [[Blockly.Msg.LISTS_SORT_TYPE_NUMERIC, "NUMERIC"], [Blockly.Msg.LISTS_SORT_TYPE_TEXT, "TEXT"], [Blockly.Msg.LISTS_SORT_TYPE_IGNORECASE, "IGNORE_CASE"]]
      }, {
        type: "field_dropdown",
        name: "DIRECTION",
        options: [[Blockly.Msg.LISTS_SORT_ORDER_ASCENDING, "1"], [Blockly.Msg.LISTS_SORT_ORDER_DESCENDING, "-1"]]
      }, {type: "input_value", name: "LIST", check: "Array"}],
      output: "Array",
      outputShape: Blockly.OUTPUT_SHAPE_ROUND,
      colour: Blockly.Msg.LISTS_HUE,
      tooltip: Blockly.Msg.LISTS_SORT_TOOLTIP,
      helpUrl: Blockly.Msg.LISTS_SORT_HELPURL
    })
  }
};
Blockly.Blocks.lists_split = {
  init: function () {
    var a = this,
      b = new Blockly.FieldDropdown([[Blockly.Msg.LISTS_SPLIT_LIST_FROM_TEXT, "SPLIT"], [Blockly.Msg.LISTS_SPLIT_TEXT_FROM_LIST, "JOIN"]], function (b) {
        a.updateType_(b)
      });
    this.setHelpUrl(Blockly.Msg.LISTS_SPLIT_HELPURL);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.appendValueInput("INPUT").setCheck("String").appendField(b, "MODE");
    this.appendValueInput("DELIM").setCheck("String").appendField(Blockly.Msg.LISTS_SPLIT_WITH_DELIMITER);
    this.setInputsInline(!0);
    this.setOutput(!0,
      "Array");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setTooltip(function () {
      var b = a.getFieldValue("MODE");
      if ("SPLIT" == b) return Blockly.Msg.LISTS_SPLIT_TOOLTIP_SPLIT;
      if ("JOIN" == b) return Blockly.Msg.LISTS_SPLIT_TOOLTIP_JOIN;
      throw"Unknown mode: " + b;
    })
  }, updateType_: function (a) {
    "SPLIT" == a ? (this.outputConnection.setCheck("Array"), this.getInput("INPUT").setCheck("String")) : (this.outputConnection.setCheck("String"), this.getInput("INPUT").setCheck("Array"))
  }, mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("mode", this.getFieldValue("MODE"));
    return a
  }, domToMutation: function (a) {
    this.updateType_(a.getAttribute("mode"))
  }
};
Blockly.Constants.Logic = {};
Blockly.Constants.Logic.HUE = 210;
Blockly.Blocks.controls_if = {
  init: function () {
    Blockly.Extensions.apply("inline-svgs", this, !1);
    this.elseCount_ = this.elseifCount_ = 0;
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.appendValueInput("IF0").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendDummyInput("THEN0").appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendStatementInput("DO0");
    this.updateShape_();
    this.setInputsInline(!0);
    this.setColour(Blockly.Msg.LOGIC_HUE);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION.call(this)
  }, mutationToDom: function () {
    if (!this.elseifCount_ && !this.elseCount_) return null;
    var a = document.createElement("mutation");
    this.elseifCount_ && a.setAttribute("elseif", this.elseifCount_);
    this.elseCount_ && a.setAttribute("else", 1);
    return a
  }, domToMutation: function (a) {
    a && (this.elseifCount_ = parseInt(a.getAttribute("elseif"), 10) || 0, this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0, this.rebuildShape_())
  }, storeConnections_: function (a) {
    a || (a =
      0);
    this.valueConnections_ = [null];
    this.statementConnections_ = [null];
    this.elseStatementConnection_ = null;
    for (var b = 1; b <= this.elseifCount_; b++) a != b && (this.valueConnections_.push(this.getInput("IF" + b).connection.targetConnection), this.statementConnections_.push(this.getInput("DO" + b).connection.targetConnection));
    this.getInput("ELSE") && (this.elseStatementConnection_ = this.getInput("ELSE").connection.targetConnection)
  }, restoreConnections_: function () {
    for (var a = 1; a <= this.elseifCount_; a++) Blockly.Mutator.reconnect(this.valueConnections_[a],
      this, "IF" + a), Blockly.Mutator.reconnect(this.statementConnections_[a], this, "DO" + a);
    this.getInput("ELSE") && Blockly.Mutator.reconnect(this.elseStatementConnection_, this, "ELSE")
  }, addElse_: function () {
    this.storeConnections_();
    this.update_(function () {
      this.elseCount_++
    });
    this.restoreConnections_()
  }, removeElse_: function () {
    this.storeConnections_();
    this.update_(function () {
      this.elseCount_--
    });
    this.restoreConnections_()
  }, addElseIf_: function () {
    this.storeConnections_();
    this.update_(function () {
      this.elseifCount_++
    });
    this.restoreConnections_()
  }, removeElseIf_: function (a) {
    this.storeConnections_(a);
    this.update_(function () {
      this.elseifCount_--
    });
    this.restoreConnections_()
  }, update_: function (a) {
    Blockly.Events.setGroup(!0);
    var b = this, c = b.mutationToDom();
    c = c && Blockly.Xml.domToText(c);
    var d = b.rendered;
    b.rendered = !1;
    a && a.call(this);
    this.updateShape_();
    b.rendered = d;
    b.initSvg();
    var e = Blockly.Events.getGroup();
    a = (a = b.mutationToDom()) && Blockly.Xml.domToText(a);
    c != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(b, "mutation",
      null, c, a)), setTimeout(function () {
      Blockly.Events.setGroup(e);
      b.bumpNeighbours_();
      Blockly.Events.setGroup(!1)
    }, Blockly.BUMP_DELAY));
    b.rendered && b.render();
    Blockly.Events.setGroup(!1)
  }, updateShape_: function () {
    var a = this;
    this.getInput("ELSE") && (this.removeInput("ELSE"), this.removeInput("ELSETITLE"), this.removeInput("ELSEBUTTONS"));
    for (var b = 1; this.getInput("IF" + b);) this.removeInput("IF" + b), this.removeInput("IFTITLE" + b), this.removeInput("IFBUTTONS" + b), this.removeInput("DO" + b), b++;
    for (b = 1; b <= this.elseifCount_; b++) {
      var c =
        function (b) {
          return function () {
            a.removeElseIf_(b)
          }
        }(b);
      this.appendValueInput("IF" + b).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendDummyInput("IFTITLE" + b).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
      this.appendDummyInput("IFBUTTONS" + b).appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, 24, 24, !1, "*", c)).setAlign(Blockly.ALIGN_RIGHT);
      this.appendStatementInput("DO" + b)
    }
    this.elseCount_ && (this.appendDummyInput("ELSETITLE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE),
      this.appendDummyInput("ELSEBUTTONS").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, 24, 24, !1, "*", a.removeElse_.bind(a))), this.appendStatementInput("ELSE"));
    this.getInput("ADDBUTTON") && this.removeInput("ADDBUTTON");
    a = this;
    b = function () {
      return function () {
        0 == a.elseCount_ ? a.addElse_() : (a.elseifCount_ || (a.elseifCount_ = 0), a.addElseIf_())
      }
    }();
    this.appendDummyInput("ADDBUTTON").appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, 24, 24, !1, "*", b))
  }, rebuildShape_: function () {
    var a =
      [null], b = [null], c = null;
    this.getInput("ELSE") && (c = this.getInput("ELSE").connection.targetConnection);
    for (var d = 1; this.getInput("IF" + d);) {
      var e = this.getInput("IF" + d), f = this.getInput("DO" + d);
      a.push(e.connection.targetConnection);
      b.push(f.connection.targetConnection);
      d++
    }
    this.updateShape_();
    this.reconnectChildBlocks_(a, b, c)
  }, reconnectChildBlocks_: function (a, b, c) {
    for (var d = 1; d <= this.elseifCount_; d++) Blockly.Mutator.reconnect(a[d], this, "IF" + d), Blockly.Mutator.reconnect(b[d], this, "DO" + d);
    Blockly.Mutator.reconnect(c,
      this, "ELSE")
  }
};
Blockly.defineBlocksWithJsonArray([{
  type: "logic_boolean",
  message0: "%1",
  args0: [{
    type: "field_dropdown",
    name: "BOOL",
    options: [["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"], ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]]
  }],
  output: "Boolean",
  colour: "%{BKY_LOGIC_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  tooltip: "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
  helpUrl: "%{BKY_LOGIC_BOOLEAN_HELPURL}"
}, {
  type: "controls_ifelse",
  message0: "%{BKY_CONTROLS_IF_MSG_IF} %1 %{BKY_CONTROLS_IF_MSG_THEN}",
  args0: [{type: "input_value", name: "IF0", check: "Boolean"}],
  message1: "%1",
  args1: [{type: "input_statement", name: "DO0"}],
  message2: "%{BKY_CONTROLS_IF_MSG_ELSE}",
  message3: "%1",
  args3: [{type: "input_statement", name: "ELSE"}],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOGIC_HUE}",
  tooltip: "%{BKYCONTROLS_IF_TOOLTIP_2}",
  helpUrl: "%{BKY_CONTROLS_IF_HELPURL}",
  extensions: ["controls_if_tooltip"]
}, {
  type: "logic_compare",
  message0: "%1 %2 %3",
  args0: [{type: "input_value", name: "A"}, {
    type: "field_dropdown", name: "OP", options: [["=", "EQ"], ["\u2260", "NEQ"], ["<", "LT"], ["\u2264",
      "LTE"], [">", "GT"], ["\u2265", "GTE"]]
  }, {type: "input_value", name: "B"}],
  inputsInline: !0,
  output: "Boolean",
  colour: "%{BKY_LOGIC_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}",
  extensions: ["logic_compare", "logic_op_tooltip"]
}, {
  type: "logic_operation",
  message0: "%1 %2 %3",
  args0: [{type: "input_value", name: "A", check: "Boolean"}, {
    type: "field_dropdown",
    name: "OP",
    options: [["%{BKY_LOGIC_OPERATION_AND}", "AND"], ["%{BKY_LOGIC_OPERATION_OR}", "OR"]]
  }, {type: "input_value", name: "B", check: "Boolean"}],
  inputsInline: !0,
  output: "Boolean",
  colour: "%{BKY_LOGIC_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}",
  extensions: ["logic_op_tooltip"]
}, {
  type: "logic_negate",
  message0: "%{BKY_LOGIC_NEGATE_TITLE}",
  args0: [{type: "input_value", name: "BOOL", check: "Boolean"}],
  output: "Boolean",
  colour: "%{BKY_LOGIC_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  tooltip: "%{BKY_LOGIC_NEGATE_TOOLTIP}",
  helpUrl: "%{BKY_LOGIC_NEGATE_HELPURL}"
}, {
  type: "logic_null", message0: "%{BKY_LOGIC_NULL}",
  output: null, colour: "%{BKY_LOGIC_HUE}", tooltip: "%{BKY_LOGIC_NULL_TOOLTIP}", helpUrl: "%{BKY_LOGIC_NULL_HELPURL}"
}, {
  type: "logic_ternary",
  message0: "if %1",
  args0: [{type: "input_value", name: "IF", check: "Boolean"}],
  message1: "then %1",
  args1: [{type: "input_value", name: "THEN"}],
  message2: "else %1",
  args2: [{type: "input_value", name: "ELSE"}],
  output: null,
  colour: "%{BKY_LOGIC_HUE}",
  tooltip: "%{BKY_LOGIC_TERNARY_TOOLTIP}",
  helpUrl: "%{BKY_LOGIC_TERNARY_HELPURL}",
  extensions: ["logic_ternary"]
}]);
Blockly.defineBlocksWithJsonArray([{
  type: "controls_if_if",
  message0: "%{BKY_CONTROLS_IF_IF_TITLE_IF}",
  nextStatement: null,
  enableContextMenu: !1,
  colour: "%{BKY_LOGIC_HUE}",
  tooltip: "%{BKY_CONTROLS_IF_IF_TOOLTIP}"
}, {
  type: "controls_if_elseif",
  message0: "%{BKY_CONTROLS_IF_ELSEIF_TITLE_ELSEIF}",
  previousStatement: null,
  nextStatement: null,
  enableContextMenu: !1,
  colour: "%{BKY_LOGIC_HUE}",
  tooltip: "%{BKY_CONTROLS_IF_ELSEIF_TOOLTIP}"
}, {
  type: "controls_if_else", message0: "%{BKY_CONTROLS_IF_ELSE_TITLE_ELSE}", previousStatement: null,
  enableContextMenu: !1, colour: "%{BKY_LOGIC_HUE}", tooltip: "%{BKY_CONTROLS_IF_ELSE_TOOLTIP}"
}]);
Blockly.Constants.Logic.TOOLTIPS_BY_OP = {
  EQ: "%{BKY_LOGIC_COMPARE_TOOLTIP_EQ}",
  NEQ: "%{BKY_LOGIC_COMPARE_TOOLTIP_NEQ}",
  LT: "%{BKY_LOGIC_COMPARE_TOOLTIP_LT}",
  LTE: "%{BKY_LOGIC_COMPARE_TOOLTIP_LTE}",
  GT: "%{BKY_LOGIC_COMPARE_TOOLTIP_GT}",
  GTE: "%{BKY_LOGIC_COMPARE_TOOLTIP_GTE}",
  AND: "%{BKY_LOGIC_OPERATION_TOOLTIP_AND}",
  OR: "%{BKY_LOGIC_OPERATION_TOOLTIP_OR}"
};
Blockly.Extensions.register("logic_op_tooltip", Blockly.Extensions.buildTooltipForDropdown("OP", Blockly.Constants.Logic.TOOLTIPS_BY_OP));
Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN = {
  elseifCount_: 0, elseCount_: 0, mutationToDom: function () {
    if (!this.elseifCount_ && !this.elseCount_) return null;
    var a = document.createElement("mutation");
    this.elseifCount_ && a.setAttribute("elseif", this.elseifCount_);
    this.elseCount_ && a.setAttribute("else", 1);
    return a
  }, domToMutation: function (a) {
    this.elseifCount_ = parseInt(a.getAttribute("elseif"), 10) || 0;
    this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0;
    this.rebuildShape_()
  }, decompose: function (a) {
    var b =
      a.newBlock("controls_if_if");
    b.initSvg();
    for (var c = b.nextConnection, d = 1; d <= this.elseifCount_; d++) {
      var e = a.newBlock("controls_if_elseif");
      e.initSvg();
      c.connect(e.previousConnection);
      c = e.nextConnection
    }
    this.elseCount_ && (a = a.newBlock("controls_if_else"), a.initSvg(), c.connect(a.previousConnection));
    return b
  }, compose: function (a) {
    var b = a.nextConnection.targetBlock();
    this.elseCount_ = this.elseifCount_ = 0;
    a = [null];
    for (var c = [null], d = null; b;) {
      switch (b.type) {
        case "controls_if_elseif":
          this.elseifCount_++;
          a.push(b.valueConnection_);
          c.push(b.statementConnection_);
          break;
        case "controls_if_else":
          this.elseCount_++;
          d = b.statementConnection_;
          break;
        default:
          throw"Unknown block type.";
      }
      b = b.nextConnection && b.nextConnection.targetBlock()
    }
    this.updateShape_();
    for (b = 1; b <= this.elseifCount_; b++) Blockly.Mutator.reconnect(a[b], this, "IF" + b), Blockly.Mutator.reconnect(c[b], this, "DO" + b);
    Blockly.Mutator.reconnect(d, this, "ELSE")
  }, saveConnections: function (a) {
    a = a.nextConnection.targetBlock();
    for (var b = 1; a;) {
      switch (a.type) {
        case "controls_if_elseif":
          var c =
            this.getInput("IF" + b), d = this.getInput("DO" + b);
          a.valueConnection_ = c && c.connection.targetConnection;
          a.statementConnection_ = d && d.connection.targetConnection;
          b++;
          break;
        case "controls_if_else":
          d = this.getInput("ELSE");
          a.statementConnection_ = d && d.connection.targetConnection;
          break;
        default:
          throw"Unknown block type.";
      }
      a = a.nextConnection && a.nextConnection.targetBlock()
    }
  }, updateShape_: function () {
    this.getInput("ELSE") && this.removeInput("ELSE");
    for (var a = 1; this.getInput("IF" + a);) this.removeInput("IF" + a), this.removeInput("DO" +
      a), a++;
    for (a = 1; a <= this.elseifCount_; a++) this.appendValueInput("IF" + a).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF), this.appendStatementInput("DO" + a).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
  }
};
Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION = function () {
  this.setTooltip(function () {
    if (this.elseifCount_ || this.elseCount_) {
      if (!this.elseifCount_ && this.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      if (this.elseifCount_ && !this.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      if (this.elseifCount_ && this.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_4
    } else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
    return ""
  }.bind(this))
};
Blockly.Extensions.register("controls_if_tooltip", Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION);
Blockly.Constants.Logic.fixLogicCompareRtlOpLabels = function () {
  var a = {LT: "\u200f<\u200f", LTE: "\u200f\u2264\u200f", GT: "\u200f>\u200f", GTE: "\u200f\u2265\u200f"},
    b = this.getField("OP");
  if (b) {
    b = b.getOptions();
    for (var c = 0; c < b.length; ++c) {
      var d = b[c], e = a[d[1]];
      goog.isString(d[0]) && e && (d[0] = e)
    }
  }
};
Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN = {
  onchange: function (a) {
    this.prevBlocks_ || (this.prevBlocks_ = [null, null]);
    var b = this.getInputTargetBlock("A"), c = this.getInputTargetBlock("B");
    b && c && !b.outputConnection.checkType_(c.outputConnection) && (Blockly.Events.setGroup(a.group), a = this.prevBlocks_[0], a !== b && (b.unplug(), a && !a.isShadow() && this.getInput("A").connection.connect(a.outputConnection)), b = this.prevBlocks_[1], b !== c && (c.unplug(), b && !b.isShadow() && this.getInput("B").connection.connect(b.outputConnection)),
      this.bumpNeighbours_(), Blockly.Events.setGroup(!1));
    this.prevBlocks_[0] = this.getInputTargetBlock("A");
    this.prevBlocks_[1] = this.getInputTargetBlock("B")
  }
};
Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION = function () {
  this.RTL && Blockly.Constants.Logic.fixLogicCompareRtlOpLabels.apply(this);
  this.mixin(Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN)
};
Blockly.Extensions.register("logic_compare", Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION);
Blockly.Constants.Logic.LOGIC_TERNARY_ONCHANGE_MIXIN = {
  prevParentConnection_: null, onchange: function (a) {
    var b = this.getInputTargetBlock("THEN"), c = this.getInputTargetBlock("ELSE"),
      d = this.outputConnection.targetConnection;
    if ((b || c) && d) for (var e = 0; 2 > e; e++) {
      var f = 1 == e ? b : c;
      f && !f.outputConnection.checkType_(d) && (Blockly.Events.setGroup(a.group), d === this.prevParentConnection_ ? (this.unplug(), d.getSourceBlock().bumpNeighbours_()) : (f.unplug(), f.bumpNeighbours_()), Blockly.Events.setGroup(!1))
    }
    this.prevParentConnection_ =
      d
  }
};
Blockly.Extensions.registerMixin("logic_ternary", Blockly.Constants.Logic.LOGIC_TERNARY_ONCHANGE_MIXIN);
Blockly.Constants.Loops = {};
Blockly.Constants.Loops.HUE = 120;
Blockly.defineBlocksWithJsonArray([{
  type: "controls_repeat_ext",
  message0: "%{BKY_CONTROLS_REPEAT_TITLE}",
  args0: [{type: "input_value", name: "TIMES", check: "Number"}],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{type: "input_statement", name: "DO"}],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOOPS_HUE}",
  tooltip: "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
  helpUrl: "%{BKY_CONTROLS_REPEAT_HELPURL}"
}, {
  type: "controls_repeat",
  message0: "%{BKY_CONTROLS_REPEAT_TITLE}",
  args0: [{
    type: "field_number", name: "TIMES",
    value: 10, min: 0, precision: 1
  }],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{type: "input_statement", name: "DO"}],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOOPS_HUE}",
  tooltip: "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
  helpUrl: "%{BKY_CONTROLS_REPEAT_HELPURL}"
}, {
  type: "controls_whileUntil",
  message0: "%1 %2",
  args0: [{
    type: "field_dropdown",
    name: "MODE",
    options: [["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"], ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"]]
  }, {
    type: "input_value", name: "BOOL",
    check: "Boolean"
  }],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{type: "input_statement", name: "DO"}],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOOPS_HUE}",
  helpUrl: "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}",
  extensions: ["controls_whileUntil_tooltip"]
}, {
  type: "controls_for",
  message0: "%{BKY_CONTROLS_FOR_TITLE}",
  args0: [{type: "input_value", name: "VAR", check: "Variable"}, {
    type: "input_value",
    name: "FROM",
    check: "Number",
    align: "LEFT"
  }, {type: "input_value", name: "TO", check: "Number", align: "LEFT"}, {
    type: "input_value",
    name: "BY", check: "Number", align: "LEFT"
  }],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{type: "input_statement", name: "DO"}],
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOOPS_HUE}",
  helpUrl: "%{BKY_CONTROLS_FOR_HELPURL}",
  extensions: ["controls_for_tooltip"]
}, {
  type: "controls_forEach",
  message0: "%{BKY_CONTROLS_FOREACH_TITLE}",
  args0: [{type: "input_value", name: "VAR", check: "Variable"}, {type: "input_value", name: "LIST", check: "Array"}],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{type: "input_statement", name: "DO"}],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOOPS_HUE}",
  helpUrl: "%{BKY_CONTROLS_FOREACH_HELPURL}",
  extensions: ["controls_forEach_tooltip"]
}, {
  type: "controls_flow_statements",
  message0: "%1",
  args0: [{
    type: "field_dropdown",
    name: "FLOW",
    options: [["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}", "BREAK"], ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}", "CONTINUE"]]
  }],
  previousStatement: null,
  colour: "%{BKY_LOOPS_HUE}",
  helpUrl: "%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}",
  extensions: ["controls_flow_tooltip", "controls_flow_in_loop_check"]
}]);
Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS = {
  WHILE: "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE}",
  UNTIL: "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}"
};
Blockly.Extensions.register("controls_whileUntil_tooltip", Blockly.Extensions.buildTooltipForDropdown("MODE", Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS));
Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS = {
  BREAK: "%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK}",
  CONTINUE: "%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE}"
};
Blockly.Extensions.register("controls_flow_tooltip", Blockly.Extensions.buildTooltipForDropdown("FLOW", Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS));
Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN = {
  customContextMenu: function (a) {
    if (!this.isInFlyout) {
      var b = this.getField("VAR").getVariable(), c = b.name;
      if (!this.isCollapsed() && null != c) {
        var d = {enabled: !0};
        d.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c);
        b = Blockly.Variables.generateVariableFieldDom(b);
        b = goog.dom.createDom("block", null, b);
        b.setAttribute("type", "variables_get");
        d.callback = Blockly.ContextMenu.callbackFactory(this, b);
        a.push(d)
      }
    }
  }
};
Blockly.Extensions.registerMixin("contextMenu_newGetVariableBlock", Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN);
Blockly.Extensions.register("controls_for_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_CONTROLS_FOR_TOOLTIP}", "VAR"));
Blockly.Extensions.register("controls_forEach_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_CONTROLS_FOREACH_TOOLTIP}", "VAR"));
Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN = {
  LOOP_TYPES: ["controls_repeat", "controls_repeat_ext", "controls_forEach", "controls_for", "controls_whileUntil"],
  onchange: function () {
    if (this.workspace.isDragging && !this.workspace.isDragging()) {
      var a = !1, b = this;
      do {
        if (-1 != this.LOOP_TYPES.indexOf(b.type)) {
          a = !0;
          break
        }
        b = b.getSurroundParent()
      } while (b);
      a ? (this.setWarningText(null), this.isInFlyout || this.setDisabled(!1)) : (this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING), this.isInFlyout ||
      this.getInheritedDisabled() || this.setDisabled(!0))
    }
  }
};
Blockly.Extensions.registerMixin("controls_flow_in_loop_check", Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN);
Blockly.Constants.Math = {};
Blockly.Constants.Math.HUE = 230;
Blockly.defineBlocksWithJsonArray([{
  type: "math_number",
  message0: "%1",
  args0: [{type: "field_number", name: "NUM", value: 0}],
  output: "Number",
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
  tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "math_integer",
  message0: "%1",
  args0: [{type: "field_number", name: "NUM", precision: 1}],
  output: "Number",
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
  tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "math_whole_number",
  message0: "%1",
  args0: [{type: "field_number", name: "NUM", min: 0, precision: 1}],
  output: "Number",
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
  tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "math_positive_number",
  message0: "%1",
  args0: [{type: "field_number", name: "NUM", min: 0}],
  output: "Number",
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
  tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "math_number_minmax",
  message0: "%1",
  args0: [{type: "field_slider", name: "SLIDER", value: 0, step: 1, labelText: "Number"}],
  output: "Number",
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
  tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
  mutator: "math_number_minmax_mutator",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "math_arithmetic",
  message0: "%1 %2 %3",
  args0: [{type: "input_value", name: "A", check: "Number"},
    {
      type: "field_dropdown",
      name: "OP",
      options: [["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"], ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"], ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"], ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"], ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]]
    }, {type: "input_value", name: "B", check: "Number"}],
  inputsInline: !0,
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
  extensions: ["math_op_tooltip"]
}, {
  type: "math_single",
  message0: "%1 %2",
  args0: [{
    type: "field_dropdown",
    name: "OP",
    options: [["%{BKY_MATH_SINGLE_OP_ROOT}", "ROOT"], ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", "ABS"], ["-", "NEG"], ["ln", "LN"], ["log10", "LOG10"], ["e^", "EXP"], ["10^", "POW10"]]
  }, {type: "input_value", name: "NUM", check: "Number"}],
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_SINGLE_HELPURL}",
  extensions: ["math_op_tooltip"]
}, {
  type: "math_trig",
  message0: "%1 %2",
  args0: [{
    type: "field_dropdown", name: "OP", options: [["%{BKY_MATH_TRIG_SIN}",
      "SIN"], ["%{BKY_MATH_TRIG_COS}", "COS"], ["%{BKY_MATH_TRIG_TAN}", "TAN"], ["%{BKY_MATH_TRIG_ASIN}", "ASIN"], ["%{BKY_MATH_TRIG_ACOS}", "ACOS"], ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]]
  }, {type: "input_value", name: "NUM", check: "Number"}],
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_TRIG_HELPURL}",
  extensions: ["math_op_tooltip"]
}, {
  type: "math_constant",
  message0: "%1",
  args0: [{
    type: "field_dropdown", name: "CONSTANT", options: [["\u03c0", "PI"], ["e", "E"], ["\u03c6", "GOLDEN_RATIO"],
      ["sqrt(2)", "SQRT2"], ["sqrt(\u00bd)", "SQRT1_2"], ["\u221e", "INFINITY"]]
  }],
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  tooltip: "%{BKY_MATH_CONSTANT_TOOLTIP}",
  helpUrl: "%{BKY_MATH_CONSTANT_HELPURL}"
}, {
  type: "math_number_property",
  message0: "%1 %2",
  args0: [{type: "input_value", name: "NUMBER_TO_CHECK", check: "Number"}, {
    type: "field_dropdown",
    name: "PROPERTY",
    options: [["%{BKY_MATH_IS_EVEN}", "EVEN"], ["%{BKY_MATH_IS_ODD}", "ODD"], ["%{BKY_MATH_IS_PRIME}", "PRIME"], ["%{BKY_MATH_IS_WHOLE}",
      "WHOLE"], ["%{BKY_MATH_IS_POSITIVE}", "POSITIVE"], ["%{BKY_MATH_IS_NEGATIVE}", "NEGATIVE"], ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"]]
  }],
  inputsInline: !0,
  output: "Boolean",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  tooltip: "%{BKY_MATH_IS_TOOLTIP}",
  mutator: "math_is_divisibleby_mutator"
}, {
  type: "math_change",
  message0: "%{BKY_MATH_CHANGE_TITLE}",
  args0: [{type: "field_variable", name: "VAR", variable: "%{BKY_MATH_CHANGE_TITLE_ITEM}"}, {
    type: "input_value",
    name: "DELTA",
    check: "Number"
  }],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_VARIABLES_HUE}",
  helpUrl: "%{BKY_MATH_CHANGE_HELPURL}",
  extensions: ["math_change_tooltip"]
}, {
  type: "math_round",
  message0: "%1 %2",
  args0: [{
    type: "field_dropdown",
    name: "OP",
    options: [["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"], ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"], ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]]
  }, {type: "input_value", name: "NUM", check: "Number"}],
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_ROUND_HELPURL}",
  tooltip: "%{BKY_MATH_ROUND_TOOLTIP}"
}, {
  type: "math_on_list",
  message0: "%1 %2",
  args0: [{
    type: "field_dropdown",
    name: "OP",
    options: [["%{BKY_MATH_ONLIST_OPERATOR_SUM}", "SUM"], ["%{BKY_MATH_ONLIST_OPERATOR_MIN}", "MIN"], ["%{BKY_MATH_ONLIST_OPERATOR_MAX}", "MAX"], ["%{BKY_MATH_ONLIST_OPERATOR_AVERAGE}", "AVERAGE"], ["%{BKY_MATH_ONLIST_OPERATOR_MEDIAN}", "MEDIAN"], ["%{BKY_MATH_ONLIST_OPERATOR_MODE}", "MODE"], ["%{BKY_MATH_ONLIST_OPERATOR_STD_DEV}", "STD_DEV"], ["%{BKY_MATH_ONLIST_OPERATOR_RANDOM}", "RANDOM"]]
  }, {
    type: "input_value",
    name: "LIST", check: "Array"
  }],
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_MATH_ONLIST_HELPURL}",
  mutator: "math_modes_of_list_mutator",
  extensions: ["math_op_tooltip"]
}, {
  type: "math_modulo",
  message0: "%{BKY_MATH_MODULO_TITLE}",
  args0: [{type: "input_value", name: "DIVIDEND", check: "Number"}, {
    type: "input_value",
    name: "DIVISOR",
    check: "Number"
  }],
  inputsInline: !0,
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  tooltip: "%{BKY_MATH_MODULO_TOOLTIP}",
  helpUrl: "%{BKY_MATH_MODULO_HELPURL}"
}, {
  type: "math_constrain",
  message0: "%{BKY_MATH_CONSTRAIN_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: "Number"}, {
    type: "input_value",
    name: "LOW",
    check: "Number"
  }, {type: "input_value", name: "HIGH", check: "Number"}],
  inputsInline: !0,
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  tooltip: "%{BKY_MATH_CONSTRAIN_TOOLTIP}",
  helpUrl: "%{BKY_MATH_CONSTRAIN_HELPURL}"
}, {
  type: "math_random_int",
  message0: "%{BKY_MATH_RANDOM_INT_TITLE}",
  args0: [{
    type: "input_value",
    name: "FROM", check: "Number"
  }, {type: "input_value", name: "TO", check: "Number"}],
  inputsInline: !0,
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  tooltip: "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
  helpUrl: "%{BKY_MATH_RANDOM_INT_HELPURL}"
}, {
  type: "math_random_float",
  message0: "%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}",
  output: "Number",
  colour: "%{BKY_MATH_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  tooltip: "%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}",
  helpUrl: "%{BKY_MATH_RANDOM_FLOAT_HELPURL}"
}]);
Blockly.Constants.Math.TOOLTIPS_BY_OP = {
  ADD: "%{BKY_MATH_ARITHMETIC_TOOLTIP_ADD}",
  MINUS: "%{BKY_MATH_ARITHMETIC_TOOLTIP_MINUS}",
  MULTIPLY: "%{BKY_MATH_ARITHMETIC_TOOLTIP_MULTIPLY}",
  DIVIDE: "%{BKY_MATH_ARITHMETIC_TOOLTIP_DIVIDE}",
  POWER: "%{BKY_MATH_ARITHMETIC_TOOLTIP_POWER}",
  ROOT: "%{BKY_MATH_SINGLE_TOOLTIP_ROOT}",
  ABS: "%{BKY_MATH_SINGLE_TOOLTIP_ABS}",
  NEG: "%{BKY_MATH_SINGLE_TOOLTIP_NEG}",
  LN: "%{BKY_MATH_SINGLE_TOOLTIP_LN}",
  LOG10: "%{BKY_MATH_SINGLE_TOOLTIP_LOG10}",
  EXP: "%{BKY_MATH_SINGLE_TOOLTIP_EXP}",
  POW10: "%{BKY_MATH_SINGLE_TOOLTIP_POW10}",
  SIN: "%{BKY_MATH_TRIG_TOOLTIP_SIN}",
  COS: "%{BKY_MATH_TRIG_TOOLTIP_COS}",
  TAN: "%{BKY_MATH_TRIG_TOOLTIP_TAN}",
  ASIN: "%{BKY_MATH_TRIG_TOOLTIP_ASIN}",
  ACOS: "%{BKY_MATH_TRIG_TOOLTIP_ACOS}",
  ATAN: "%{BKY_MATH_TRIG_TOOLTIP_ATAN}",
  SUM: "%{BKY_MATH_ONLIST_TOOLTIP_SUM}",
  MIN: "%{BKY_MATH_ONLIST_TOOLTIP_MIN}",
  MAX: "%{BKY_MATH_ONLIST_TOOLTIP_MAX}",
  AVERAGE: "%{BKY_MATH_ONLIST_TOOLTIP_AVERAGE}",
  MEDIAN: "%{BKY_MATH_ONLIST_TOOLTIP_MEDIAN}",
  MODE: "%{BKY_MATH_ONLIST_TOOLTIP_MODE}",
  STD_DEV: "%{BKY_MATH_ONLIST_TOOLTIP_STD_DEV}",
  RANDOM: "%{BKY_MATH_ONLIST_TOOLTIP_RANDOM}"
};
Blockly.Extensions.register("math_op_tooltip", Blockly.Extensions.buildTooltipForDropdown("OP", Blockly.Constants.Math.TOOLTIPS_BY_OP));
Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN = {
  mutationToDom: function () {
    var a = document.createElement("mutation"), b = "DIVISIBLE_BY" == this.getFieldValue("PROPERTY");
    a.setAttribute("divisor_input", b);
    return a
  }, domToMutation: function (a) {
    a = "true" == a.getAttribute("divisor_input");
    this.updateShape_(a)
  }, updateShape_: function (a) {
    var b = this.getInput("DIVISOR");
    a ? b || this.appendValueInput("DIVISOR").setCheck("Number") : b && this.removeInput("DIVISOR")
  }
};
Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION = function () {
  this.getField("PROPERTY").setValidator(function (a) {
    this.sourceBlock_.updateShape_("DIVISIBLE_BY" == a)
  })
};
Blockly.Extensions.registerMutator("math_is_divisibleby_mutator", Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN, Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION);
Blockly.Extensions.register("math_change_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_MATH_CHANGE_TOOLTIP}", "VAR"));
Blockly.Constants.Math.LIST_MODES_MUTATOR_MIXIN = {
  updateType_: function (a) {
    "MODE" == a ? this.outputConnection.setCheck("Array") : this.outputConnection.setCheck("Number")
  }, mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("op", this.getFieldValue("OP"));
    return a
  }, domToMutation: function (a) {
    this.updateType_(a.getAttribute("op"))
  }
};
Blockly.Constants.Math.LIST_MODES_MUTATOR_EXTENSION = function () {
  this.getField("OP").setValidator(function (a) {
    this.updateType_(a)
  }.bind(this))
};
Blockly.Extensions.registerMutator("math_modes_of_list_mutator", Blockly.Constants.Math.LIST_MODES_MUTATOR_MIXIN, Blockly.Constants.Math.LIST_MODES_MUTATOR_EXTENSION);
Blockly.Constants.Math.MATH_NUMBER_MINMAX_MIXIN = {
  mutationToDom: function () {
    var a = document.createElement("mutation");
    void 0 != this.inputList[0].fieldRow[0].min_ && a.setAttribute("min", this.inputList[0].fieldRow[0].min_);
    void 0 != this.inputList[0].fieldRow[0].max_ && a.setAttribute("max", this.inputList[0].fieldRow[0].max_);
    void 0 != this.inputList[0].fieldRow[0].labelText_ && a.setAttribute("label", this.inputList[0].fieldRow[0].labelText_);
    void 0 != this.inputList[0].fieldRow[0].step_ && a.setAttribute("step", this.inputList[0].fieldRow[0].step_);
    void 0 != this.inputList[0].fieldRow[0].sliderColor_ && a.setAttribute("color", this.inputList[0].fieldRow[0].sliderColor_);
    void 0 != this.inputList[0].fieldRow[0].precision_ && a.setAttribute("precision", this.inputList[0].fieldRow[0].precision_);
    return a
  }, domToMutation: function (a) {
    var b = a.getAttribute("min"), c = a.getAttribute("max"), d = a.getAttribute("step"), e = a.getAttribute("label"),
      f = a.getAttribute("color");
    a = a.getAttribute("precision");
    this.inputList[0].fieldRow[0].setLabel(e);
    this.inputList[0].fieldRow[0].setOptions(b,
      c, d, a);
    this.inputList[0].fieldRow[0].setColor(f)
  }
};
Blockly.Extensions.registerMutator("math_number_minmax_mutator", Blockly.Constants.Math.MATH_NUMBER_MINMAX_MIXIN);
Blockly.Blocks.procedures_defnoreturn = {
  init: function () {
    var a = new Blockly.FieldTextInput("", Blockly.Procedures.rename);
    a.setSpellcheck(!1);
    this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
    this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
    (this.workspace.options.comments || this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT &&
    this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(!0);
    this.statementConnection_ = null
  }, setStatements_: function (a) {
    this.hasStatements_ !== a && (a ? (this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO), this.getInput("RETURN") && this.moveInputBefore("STACK",
      "RETURN")) : this.removeInput("STACK", !0), this.hasStatements_ = a)
  }, updateParams_: function () {
    for (var a = !1, b = {}, c = 0; c < this.arguments_.length; c++) {
      if (b["arg_" + this.arguments_[c].toLowerCase()]) {
        a = !0;
        break
      }
      b["arg_" + this.arguments_[c].toLowerCase()] = !0
    }
    a ? this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING) : this.setWarningText(null);
    a = "";
    this.arguments_.length && (a = Blockly.Msg.PROCEDURES_BEFORE_PARAMS + " " + this.arguments_.join(", "));
    Blockly.Events.disable();
    try {
      this.setFieldValue(a, "PARAMS")
    } finally {
      Blockly.Events.enable()
    }
  },
  mutationToDom: function (a) {
    var b = document.createElement("mutation");
    a && b.setAttribute("name", this.getFieldValue("NAME"));
    for (var c = 0; c < this.argumentVarModels_.length; c++) {
      var d = document.createElement("arg"), e = this.argumentVarModels_[c];
      d.setAttribute("name", e.name);
      d.setAttribute("varId", e.getId());
      a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
      b.appendChild(d)
    }
    this.hasStatements_ || b.setAttribute("statements", "false");
    return b
  }, domToMutation: function (a) {
    this.arguments_ = [];
    this.argumentVarModels_ =
      [];
    for (var b = 0, c; c = a.childNodes[b]; b++) if ("arg" == c.nodeName.toLowerCase()) {
      var d = c.getAttribute("name");
      c = c.getAttribute("varId");
      this.arguments_.push(d);
      d = Blockly.Variables.getOrCreateVariablePackage(this.workspace, c, d, "");
      this.argumentVarModels_.push(d)
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);
    this.setStatements_("false" !== a.getAttribute("statements"))
  }, decompose: function (a) {
    var b = a.newBlock("procedures_mutatorcontainer");
    b.initSvg();
    this.getInput("RETURN") ? b.setFieldValue(this.hasStatements_ ?
      "TRUE" : "FALSE", "STATEMENTS") : b.getInput("STATEMENT_INPUT").setVisible(!1);
    for (var c = b.getInput("STACK").connection, d = 0; d < this.arguments_.length; d++) {
      var e = a.newBlock("procedures_mutatorarg");
      e.initSvg();
      e.setFieldValue(this.arguments_[d], "NAME");
      e.oldLocation = d;
      c.connect(e.previousConnection);
      c = e.nextConnection
    }
    Blockly.Procedures.mutateCallers(this);
    return b
  }, compose: function (a) {
    this.arguments_ = [];
    this.paramIds_ = [];
    this.argumentVarModels_ = [];
    for (var b = a.getInputTargetBlock("STACK"); b;) {
      var c = b.getFieldValue("NAME");
      this.arguments_.push(c);
      c = this.workspace.getVariable(c, "");
      this.argumentVarModels_.push(c);
      this.paramIds_.push(b.id);
      b = b.nextConnection && b.nextConnection.targetBlock()
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);
    a = a.getFieldValue("STATEMENTS");
    if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) if (a) this.setStatements_(!0), Blockly.Mutator.reconnect(this.statementConnection_, this, "STACK"), this.statementConnection_ = null; else {
      a = this.getInput("STACK").connection;
      if (this.statementConnection_ =
        a.targetConnection) a = a.targetBlock(), a.unplug(), a.bumpNeighbours_();
      this.setStatements_(!1)
    }
  }, getProcedureDef: function () {
    return [this.getFieldValue("NAME"), this.arguments_, !1]
  }, getVars: function () {
    return this.arguments_
  }, getVarModels: function () {
    return this.argumentVarModels_
  }, renameVarById: function (a, b) {
    var c = this.workspace.getVariableById(a);
    if ("" == c.type) {
      c = c.name;
      for (var d = this.workspace.getVariableById(b), e = !1, f = 0; f < this.argumentVarModels_.length; f++) this.argumentVarModels_[f].getId() == a && (this.arguments_[f] =
        d.name, this.argumentVarModels_[f] = d, e = !0);
      e && this.displayRenamedVar_(c, d.name)
    }
  }, updateVarName: function (a) {
    for (var b = a.name, c = !1, d = 0; d < this.argumentVarModels_.length; d++) if (this.argumentVarModels_[d].getId() == a.getId()) {
      var e = this.arguments_[d];
      this.arguments_[d] = b;
      c = !0
    }
    c && this.displayRenamedVar_(e, b)
  }, displayRenamedVar_: function (a, b) {
    this.updateParams_();
    if (this.mutator.isVisible()) for (var c = this.mutator.workspace_.getAllBlocks(), d = 0, e; e = c[d]; d++) "procedures_mutatorarg" == e.type && Blockly.Names.equals(a,
      e.getFieldValue("NAME")) && e.setFieldValue(b, "NAME")
  }, customContextMenu: function (a) {
    if (!this.isInFlyout) {
      var b = {enabled: !0}, c = this.getFieldValue("NAME");
      b.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1", c);
      var d = goog.dom.createDom("mutation");
      d.setAttribute("name", c);
      for (var e = 0; e < this.arguments_.length; e++) c = goog.dom.createDom("arg"), c.setAttribute("name", this.arguments_[e]), d.appendChild(c);
      c = goog.dom.createDom("block", null, d);
      c.setAttribute("type", this.callType_);
      b.callback = Blockly.ContextMenu.callbackFactory(this,
        c);
      a.push(b);
      if (!this.isCollapsed()) for (e = 0; e < this.argumentVarModels_.length; e++) b = {enabled: !0}, d = this.argumentVarModels_[e], c = d.name, b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c), c = Blockly.Variables.generateVariableFieldDom(d), c = goog.dom.createDom("block", null, c), c.setAttribute("type", "variables_get"), b.callback = Blockly.ContextMenu.callbackFactory(this, c), a.push(b)
    }
  }, callType_: "procedures_callnoreturn"
};
Blockly.Blocks.procedures_defreturn = {
  init: function () {
    var a = new Blockly.FieldTextInput("", Blockly.Procedures.rename);
    a.setSpellcheck(!1);
    this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
    this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
    (this.workspace.options.comments || this.workspace.options.parentWorkspace &&
      this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT && this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(!0);
    this.statementConnection_ = null
  },
  setStatements_: Blockly.Blocks.procedures_defnoreturn.setStatements_,
  updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
  mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
  domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
  decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
  compose: Blockly.Blocks.procedures_defnoreturn.compose,
  getProcedureDef: function () {
    return [this.getFieldValue("NAME"), this.arguments_, !0]
  },
  getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
  getVarModels: Blockly.Blocks.procedures_defnoreturn.getVarModels,
  renameVarById: Blockly.Blocks.procedures_defnoreturn.renameVarById,
  updateVarName: Blockly.Blocks.procedures_defnoreturn.updateVarName,
  displayRenamedVar_: Blockly.Blocks.procedures_defnoreturn.displayRenamedVar_,
  customContextMenu: Blockly.Blocks.procedures_defnoreturn.customContextMenu,
  callType_: "procedures_callreturn"
};
Blockly.Blocks.procedures_mutatorcontainer = {
  init: function () {
    this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendStatementInput("STACK");
    this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"), "STATEMENTS");
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
    this.contextMenu = !1
  }
};
Blockly.Blocks.procedures_mutatorarg = {
  init: function () {
    var a = new Blockly.FieldTextInput("x", this.validator_);
    a.oldShowEditorFn_ = a.showEditor_;
    a.showEditor_ = function () {
      this.createdVariables_ = [];
      this.oldShowEditorFn_()
    };
    this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE).appendField(a, "NAME");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
    this.contextMenu = !1;
    a.onFinishEditing_ =
      this.deleteIntermediateVars_;
    a.createdVariables_ = [];
    a.onFinishEditing_("x")
  }, validator_: function (a) {
    var b = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
    a = a.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "");
    if (!a) return null;
    var c = b.getVariable(a, "");
    c && c.name != a && b.renameVarById(c.getId(), a);
    c || (c = b.createVariable(a, "")) && this.createdVariables_ && this.createdVariables_.push(c);
    return a
  }, deleteIntermediateVars_: function (a) {
    var b = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
    if (b) for (var c =
      0; c < this.createdVariables_.length; c++) {
      var d = this.createdVariables_[c];
      d.name != a && b.deleteVariableById(d.getId())
    }
  }
};
Blockly.Blocks.procedures_callnoreturn = {
  init: function () {
    this.appendDummyInput("TOPROW").appendField(this.id, "NAME");
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null
  }, getProcedureCall: function () {
    return this.getFieldValue("NAME")
  }, renameProcedure: function (a, b) {
    Blockly.Names.equals(a, this.getProcedureCall()) &&
    (this.setFieldValue(b, "NAME"), this.setTooltip((this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1", b)))
  }, setProcedureParameters_: function (a, b) {
    var c = Blockly.Procedures.getDefinition(this.getProcedureCall(), this.workspace),
      d = c && c.mutator && c.mutator.isVisible();
    d || (this.quarkConnections_ = {}, this.quarkIds_ = null);
    if (b) if (goog.array.equals(this.arguments_, a)) this.quarkIds_ = b; else {
      if (b.length != a.length) throw"Error: paramNames and paramIds must be the same length.";
      this.setCollapsed(!1);
      this.quarkIds_ || (this.quarkConnections_ = {}, a.join("\n") == this.arguments_.join("\n") ? this.quarkIds_ = b : this.quarkIds_ = []);
      c = this.rendered;
      this.rendered = !1;
      for (var e = 0; e < this.arguments_.length; e++) {
        var f = this.getInput("ARG" + e);
        f && (f = f.connection.targetConnection, this.quarkConnections_[this.quarkIds_[e]] = f, d && f && -1 == b.indexOf(this.quarkIds_[e]) && (f.disconnect(), f.getSourceBlock().bumpNeighbours_()))
      }
      this.arguments_ = [].concat(a);
      this.argumentVarModels_ = [];
      for (e = 0; e < this.arguments_.length; e++) d =
        Blockly.Variables.getOrCreateVariablePackage(this.workspace, null, this.arguments_[e], ""), this.argumentVarModels_.push(d);
      this.updateShape_();
      if (this.quarkIds_ = b) for (e = 0; e < this.arguments_.length; e++) d = this.quarkIds_[e], d in this.quarkConnections_ && (f = this.quarkConnections_[d], Blockly.Mutator.reconnect(f, this, "ARG" + e) || delete this.quarkConnections_[d]);
      (this.rendered = c) && this.render()
    }
  }, updateShape_: function () {
    for (var a = 0; a < this.arguments_.length; a++) {
      var b = this.getField("ARGNAME" + a);
      if (b) {
        Blockly.Events.disable();
        try {
          b.setValue(this.arguments_[a])
        } finally {
          Blockly.Events.enable()
        }
      } else b = new Blockly.FieldLabel(this.arguments_[a]), this.appendValueInput("ARG" + a).setAlign(Blockly.ALIGN_RIGHT).appendField(b, "ARGNAME" + a).init()
    }
    for (; this.getInput("ARG" + a);) this.removeInput("ARG" + a), a++;
    if (a = this.getInput("TOPROW")) this.arguments_.length ? this.getField("WITH") || (a.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, "WITH"), a.init()) : this.getField("WITH") && a.removeField("WITH")
  }, mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("name", this.getProcedureCall());
    for (var b = 0; b < this.arguments_.length; b++) {
      var c = document.createElement("arg");
      c.setAttribute("name", this.arguments_[b]);
      a.appendChild(c)
    }
    return a
  }, domToMutation: function (a) {
    var b = a.getAttribute("name");
    this.renameProcedure(this.getProcedureCall(), b);
    b = [];
    for (var c = [], d = 0, e; e = a.childNodes[d]; d++) "arg" == e.nodeName.toLowerCase() && (b.push(e.getAttribute("name")), c.push(e.getAttribute("paramId")));
    this.setProcedureParameters_(b, c)
  }, getVarModels: function () {
    return this.argumentVarModels_
  },
  onchange: function (a) {
    if (this.workspace && !this.workspace.isFlyout) if (a.type == Blockly.Events.BLOCK_CREATE && -1 != a.ids.indexOf(this.id)) {
      var b = this.getProcedureCall();
      b = Blockly.Procedures.getDefinition(b, this.workspace);
      !b || b.type == this.defType_ && JSON.stringify(b.arguments_) == JSON.stringify(this.arguments_) || (b = null);
      if (!b) {
        Blockly.Events.setGroup(a.group);
        a = goog.dom.createDom("xml");
        b = goog.dom.createDom("block");
        b.setAttribute("type", this.defType_);
        var c = this.getRelativeToSurfaceXY(), d = c.y + 2 * Blockly.SNAP_RADIUS;
        b.setAttribute("x", c.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1));
        b.setAttribute("y", d);
        c = this.mutationToDom();
        b.appendChild(c);
        c = goog.dom.createDom("field");
        c.setAttribute("name", "NAME");
        c.appendChild(document.createTextNode(this.getProcedureCall()));
        b.appendChild(c);
        a.appendChild(b);
        Blockly.Xml.domToWorkspace(a, this.workspace);
        Blockly.Events.setGroup(!1)
      }
    } else a.type == Blockly.Events.BLOCK_DELETE && (b = this.getProcedureCall(), b = Blockly.Procedures.getDefinition(b, this.workspace), b || (Blockly.Events.setGroup(a.group),
      this.dispose(!0, !1), Blockly.Events.setGroup(!1)))
  }, customContextMenu: function (a) {
    var b = {enabled: !0};
    b.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var c = this.getProcedureCall(), d = this.workspace;
    b.callback = function () {
      var a = Blockly.Procedures.getDefinition(c, d);
      a && (d.centerOnBlock(a.id), a.select())
    };
    a.push(b)
  }, defType_: "procedures_defnoreturn"
};
Blockly.Blocks.procedures_callreturn = {
  init: function () {
    this.appendDummyInput("TOPROW").appendField("", "NAME");
    this.setOutput(!0);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null
  },
  getProcedureCall: Blockly.Blocks.procedures_callnoreturn.getProcedureCall,
  renameProcedure: Blockly.Blocks.procedures_callnoreturn.renameProcedure,
  setProcedureParameters_: Blockly.Blocks.procedures_callnoreturn.setProcedureParameters_,
  updateShape_: Blockly.Blocks.procedures_callnoreturn.updateShape_,
  mutationToDom: Blockly.Blocks.procedures_callnoreturn.mutationToDom,
  domToMutation: Blockly.Blocks.procedures_callnoreturn.domToMutation,
  getVarModels: Blockly.Blocks.procedures_callnoreturn.getVarModels,
  onchange: Blockly.Blocks.procedures_callnoreturn.onchange,
  customContextMenu: Blockly.Blocks.procedures_callnoreturn.customContextMenu,
  defType_: "procedures_defreturn"
};
Blockly.Blocks.procedures_ifreturn = {
  init: function () {
    this.appendValueInput("CONDITION").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_IFRETURN_HELPURL);
    this.hasReturnValue_ = !0
  }, mutationToDom: function () {
    var a =
      document.createElement("mutation");
    a.setAttribute("value", Number(this.hasReturnValue_));
    return a
  }, domToMutation: function (a) {
    this.hasReturnValue_ = 1 == a.getAttribute("value");
    this.hasReturnValue_ || (this.removeInput("VALUE"), this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN))
  }, onchange: function () {
    if (this.workspace.isDragging && !this.workspace.isDragging()) {
      var a = !1, b = this;
      do {
        if (-1 != this.FUNCTION_TYPES.indexOf(b.type)) {
          a = !0;
          break
        }
        b = b.getSurroundParent()
      } while (b);
      a ? ("procedures_defnoreturn" ==
      b.type && this.hasReturnValue_ ? (this.removeInput("VALUE"), this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN), this.hasReturnValue_ = !1) : "procedures_defreturn" != b.type || this.hasReturnValue_ || (this.removeInput("VALUE"), this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN), this.hasReturnValue_ = !0), this.setWarningText(null), this.isInFlyout || this.setDisabled(!1)) : (this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING), this.isInFlyout || this.getInheritedDisabled() ||
      this.setDisabled(!0))
    }
  }, FUNCTION_TYPES: ["procedures_defnoreturn", "procedures_defreturn"]
};/*

 PXT Blockly fork

 The MIT License (MIT)

 Copyright (c) Microsoft Corporation

 All rights reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
Blockly.PXTBlockly.FunctionUtils = {};
Blockly.PXTBlockly.FunctionUtils.argumentIcons = {};
Blockly.PXTBlockly.FunctionUtils.argumentDefaultNames = {};
Blockly.PXTBlockly.FunctionUtils.getArgumentIcon = function (a) {
  return Blockly.PXTBlockly.FunctionUtils.argumentIcons && Blockly.PXTBlockly.FunctionUtils.argumentIcons[a] || void 0
};
Blockly.PXTBlockly.FunctionUtils.getArgumentDefaultName = function (a) {
  return Blockly.PXTBlockly.FunctionUtils.argumentDefaultNames && Blockly.PXTBlockly.FunctionUtils.argumentDefaultNames[a] || Blockly.Msg.FUNCTIONS_DEFAULT_CUSTOM_ARG_NAME
};
Blockly.PXTBlockly.FunctionUtils.mutationToDom = function () {
  this.ensureIds_();
  var a = document.createElement("mutation");
  a.setAttribute("name", this.name_);
  a.setAttribute("functionid", this.functionId_);
  this.arguments_.forEach(function (b) {
    var c = document.createElement("arg");
    c.setAttribute("name", b.name);
    c.setAttribute("id", b.id);
    c.setAttribute("type", b.type);
    a.appendChild(c)
  });
  return a
};
Blockly.PXTBlockly.FunctionUtils.domToMutation = function (a) {
  for (var b = [], c = 0; c < a.childNodes.length; ++c) {
    var d = a.childNodes[c];
    "arg" == d.nodeName.toLowerCase() && b.push({
      id: d.getAttribute("id"),
      name: d.getAttribute("name"),
      type: d.getAttribute("type")
    })
  }
  this.arguments_ = b;
  this.name_ = a.getAttribute("name");
  this.functionId_ = a.getAttribute("functionid");
  this.ensureIds_();
  this.updateDisplay_()
};
Blockly.PXTBlockly.FunctionUtils.ensureIds_ = function () {
  switch (this.type) {
    case Blockly.FUNCTION_DEFINITION_BLOCK_TYPE:
      this.functionId_ && "null" != this.functionId_ || (this.functionId_ = Blockly.utils.genUid());
      for (var a = 0; a < this.arguments_.length; ++a) this.arguments_[a].id || (this.arguments_[a].id = Blockly.utils.genUid());
      break;
    case Blockly.FUNCTION_CALL_BLOCK_TYPE:
      if (a = Blockly.Functions.getDefinition(this.name_, this.workspace)) {
        this.functionId_ = a.getFunctionId();
        var b = a.getArguments();
        for (a = 0; a < this.arguments_.length; ++a) for (var c =
          0; c < b.length; ++c) if (b[c].name == this.arguments_[a].name) {
          this.arguments_[a].id = b[c].id;
          break
        }
      }
  }
};
Blockly.PXTBlockly.FunctionUtils.getName = function () {
  return this.name_
};
Blockly.PXTBlockly.FunctionUtils.getFunctionId = function () {
  return this.functionId_
};
Blockly.PXTBlockly.FunctionUtils.getArguments = function () {
  return this.arguments_
};
Blockly.PXTBlockly.FunctionUtils.setStatements_ = function (a) {
  this.hasStatements_ !== a && (a ? this.appendStatementInput("STACK") : this.removeInput("STACK", !0), this.hasStatements_ = a)
};
Blockly.PXTBlockly.FunctionUtils.updateDisplay_ = function () {
  var a = this.rendered;
  this.rendered = !1;
  var b = this.disconnectOldBlocks_();
  this.removeValueInputs_();
  this.createAllInputs_(b);
  this.deleteShadows_(b);
  (this.rendered = a) && !this.isInsertionMarker() && this.initSvg && (this.initSvg(), this.render())
};
Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_ = function () {
  for (var a = {}, b = 0, c; c = this.inputList[b]; b++) if ("STACK" !== c.name && c.connection) {
    var d = c.connection.targetBlock(), e = {shadow: c.connection.getShadowDom(), block: d};
    a[c.name] = e;
    c.connection.setShadowDom(null);
    d && c.connection.disconnect()
  }
  return a
};
Blockly.PXTBlockly.FunctionUtils.removeValueInputs_ = function () {
  for (var a = [], b = 0, c; c = this.inputList[b]; b++) c.type == Blockly.INPUT_VALUE ? c.dispose() : a.push(c);
  this.inputList = a
};
Blockly.PXTBlockly.FunctionUtils.createAllInputs_ = function (a) {
  var b = !1, c = !1;
  this.inputList.forEach(function (a) {
    "function_title" == a.name ? b = !0 : "function_name" == a.name && (c = !0)
  });
  if (!b) {
    var d = "";
    switch (this.type) {
      case Blockly.FUNCTION_CALL_BLOCK_TYPE:
        d = Blockly.Msg.FUNCTIONS_CALL_TITLE;
        break;
      case Blockly.FUNCTION_DEFINITION_BLOCK_TYPE:
      case Blockly.FUNCTION_DECLARATION_BLOCK_TYPE:
        d = Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE
    }
    this.appendDummyInput("function_title").appendField(d, "function_title")
  }
  c ? this.updateFunctionLabel_(this.getName()) :
    this.addFunctionLabel_(this.getName());
  var e = this;
  this.arguments_.forEach(function (b) {
    var c = e.appendValueInput(b.id);
    Blockly.Functions.isCustomType(b.type) ? c.setCheck(b.type) : c.setCheck(b.type.charAt(0).toUpperCase() + b.type.slice(1));
    e.isInsertionMarker() || e.populateArgument_(b, a, c)
  });
  this.hasStatements_ && this.moveInputBefore("STACK", null)
};
Blockly.PXTBlockly.FunctionUtils.deleteShadows_ = function (a) {
  if (a) for (var b in a) {
    var c = a[b];
    c && (c = c.block) && c.isShadow() && (c.dispose(), delete a[b])
  }
};
Blockly.PXTBlockly.FunctionUtils.updateLabelEditor_ = function (a) {
  Blockly.Events.disable();
  this.getField("function_name").setText(a);
  Blockly.Events.enable()
};
Blockly.PXTBlockly.FunctionUtils.updateLabelField_ = function (a) {
  this.getField("function_name").setValue(a)
};
Blockly.PXTBlockly.FunctionUtils.addLabelEditor_ = function (a) {
  a = this.type === Blockly.FUNCTION_DEFINITION_BLOCK_TYPE ? new Blockly.FieldTextInput(a || "", Blockly.Functions.rename) : new Blockly.FieldTextInput(a || "");
  a.setSpellcheck(!1);
  a.setAutoCapitalize(!1);
  this.appendDummyInput("function_name").appendField(a, "function_name")
};
Blockly.PXTBlockly.FunctionUtils.addLabelField_ = function (a) {
  this.appendDummyInput("function_name").appendField(new Blockly.FieldLabel(a, "functionNameText"), "function_name")
};
Blockly.PXTBlockly.FunctionUtils.getShadowBlockInfoFromType_ = function (a, b) {
  switch (a) {
    case "boolean":
      var c = "logic_boolean";
      var d = "BOOL";
      var e = "TRUE";
      break;
    case "number":
      c = "math_number";
      d = "NUM";
      e = "1";
      break;
    case "string":
      c = "text";
      d = "TEXT";
      e = "abc";
      break;
    default:
      c = "variables_get", d = "VAR", e = Blockly.Variables.getOrCreateVariablePackage(b, null, Blockly.PXTBlockly.FunctionUtils.getArgumentDefaultName(a), "").getId()
  }
  return [c, d, e]
};
Blockly.PXTBlockly.FunctionUtils.buildShadowDom_ = function (a) {
  var b = goog.dom.createDom("shadow"),
    c = Blockly.PXTBlockly.FunctionUtils.getShadowBlockInfoFromType_(a, this.workspace);
  a = c[1];
  var d = c[2];
  b.setAttribute("type", c[0]);
  c = goog.dom.createDom("field", null, d);
  c.setAttribute("name", a);
  b.appendChild(c);
  return b
};
Blockly.PXTBlockly.FunctionUtils.attachShadow_ = function (a, b) {
  var c = Blockly.PXTBlockly.FunctionUtils.getShadowBlockInfoFromType_(b, this.workspace), d = c[0], e = c[1];
  c = c[2];
  Blockly.Events.disable();
  var f = null;
  try {
    f = this.workspace.newBlock(d), f.setFieldValue(c, e), f.setShadow(!0), !this.isInsertionMarker() && f.initSvg && (f.initSvg(), f.render(!1))
  } finally {
    Blockly.Events.enable()
  }
  f && f.outputConnection.connect(a.connection)
};
Blockly.PXTBlockly.FunctionUtils.createArgumentReporter_ = function (a) {
  switch (a.type) {
    case "boolean":
      var b = "argument_reporter_boolean";
      break;
    case "number":
      b = "argument_reporter_number";
      break;
    case "string":
      b = "argument_reporter_string";
      break;
    default:
      b = "argument_reporter_custom"
  }
  Blockly.Events.disable();
  try {
    var c = "argument_reporter_custom" == b ? Blockly.PXTBlockly.FunctionUtils.createCustomArgumentReporter(a.type, this.workspace) : this.workspace.newBlock(b);
    c.setShadow(!0);
    c.setFieldValue(a.name, "VALUE");
    !this.isInsertionMarker() &&
    c.initSvg && (c.initSvg(), c.render(!1))
  } finally {
    Blockly.Events.enable()
  }
  return c
};
Blockly.PXTBlockly.FunctionUtils.populateArgumentOnCaller_ = function (a, b, c) {
  var d = null, e = null;
  b && a.id in b && (e = b[a.id], d = e.block, e = e.shadow);
  b && d ? (b[c.name] = null, d.outputConnection.connect(c.connection), a = e || this.buildShadowDom_(a.type), c.connection.setShadowDom(a)) : this.attachShadow_(c, a.type)
};
Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDefinition_ = function (a, b, c) {
  var d = null;
  b && a.id in b && (d = b[a.id].block);
  b && d ? (d.setFieldValue(a.name, "VALUE"), b[c.name] = null) : d = this.createArgumentReporter_(a);
  c.connection.connect(d.outputConnection)
};
Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDeclaration_ = function (a, b, c) {
  a = this.createArgumentEditor_(a.type, a.name);
  c.connection.connect(a.outputConnection)
};
Blockly.PXTBlockly.FunctionUtils.createArgumentEditor_ = function (a, b) {
  Blockly.Events.disable();
  try {
    var c = "";
    switch (a) {
      case "boolean":
        c = "argument_editor_boolean";
        break;
      case "number":
        c = "argument_editor_number";
        break;
      case "string":
        c = "argument_editor_string";
        break;
      default:
        c = "argument_editor_custom"
    }
    var d = "argument_editor_custom" == c ? Blockly.PXTBlockly.FunctionUtils.createCustomArgumentEditor(a, this.workspace) : this.workspace.newBlock(c);
    d.setFieldValue(b, "TEXT");
    d.setShadow(!0);
    !this.isInsertionMarker() &&
    d.initSvg && (d.initSvg(), d.render(!1))
  } finally {
    Blockly.Events.enable()
  }
  return d
};
Blockly.PXTBlockly.FunctionUtils.updateDeclarationMutation_ = function () {
  this.arguments_ = [];
  for (var a = 1; a < this.inputList.length; a++) {
    var b = this.inputList[a];
    switch (b.type) {
      case Blockly.NEXT_STATEMENT:
        break;
      case Blockly.DUMMY_INPUT:
        this.name_ = b.fieldRow[0].getValue();
        break;
      case Blockly.INPUT_VALUE:
        var c = b.connection.targetBlock();
        this.arguments_.push({id: b.name, name: c.getFieldValue("TEXT"), type: c.getTypeName()});
        break;
      default:
        console.warn("Unexpected input type on a function mutator root: " + b.type)
    }
  }
};
Blockly.PXTBlockly.FunctionUtils.focusLastEditor_ = function () {
  if (0 < this.inputList.length) {
    var a = this.inputList[this.inputList.length - 2];
    a.type == Blockly.DUMMY_INPUT ? (this.workspace.centerOnBlock(this.id), a.fieldRow[0].showEditor_()) : a.type == Blockly.INPUT_VALUE && (a = a.connection.targetBlock(), a.workspace.centerOnBlock(a.id), a.getField("TEXT").showEditor_())
  }
};
Blockly.PXTBlockly.FunctionUtils.addParam_ = function (a, b) {
  Blockly.WidgetDiv.hide(!0);
  var c = Blockly.Functions.findUniqueParamName(b, this.arguments_.map(function (a) {
    return a.name
  }));
  this.arguments_.push({id: Blockly.utils.genUid(), name: c, type: a});
  this.updateDisplay_();
  this.focusLastEditor_()
};
Blockly.PXTBlockly.FunctionUtils.addBooleanExternal = function () {
  this.addParam_("boolean", Blockly.Msg.FUNCTIONS_DEFAULT_BOOLEAN_ARG_NAME)
};
Blockly.PXTBlockly.FunctionUtils.addStringExternal = function () {
  this.addParam_("string", Blockly.Msg.FUNCTIONS_DEFAULT_STRING_ARG_NAME)
};
Blockly.PXTBlockly.FunctionUtils.addNumberExternal = function () {
  this.addParam_("number", Blockly.Msg.FUNCTIONS_DEFAULT_NUMBER_ARG_NAME)
};
Blockly.PXTBlockly.FunctionUtils.addCustomExternal = function (a) {
  this.addParam_(a, Blockly.PXTBlockly.FunctionUtils.getArgumentDefaultName(a))
};
Blockly.PXTBlockly.FunctionUtils.removeFieldCallback = function (a) {
  for (var b = null, c = 0; c < this.inputList.length && !b; c++) {
    var d = this.inputList[c];
    if (d.connection) {
      var e = d.connection.targetBlock();
      e && e.getField(a.name) === a && (b = d.name)
    } else for (e = 0; e < d.fieldRow.length; e++) d.fieldRow[e] == a && (b = d.name)
  }
  b && (Blockly.WidgetDiv.hide(!0), this.removeInput(b), this.updateFunctionSignature(), this.updateDisplay_())
};
Blockly.PXTBlockly.FunctionUtils.removeArgumentCallback_ = function (a) {
  this.parentBlock_ && this.parentBlock_.removeFieldCallback && this.parentBlock_.removeFieldCallback(a)
};
Blockly.PXTBlockly.FunctionUtils.onCallerChange = function (a) {
  if (this.workspace && !this.workspace.isFlyout) if (a.type == Blockly.Events.BLOCK_CREATE && -1 != a.ids.indexOf(this.id)) {
    var b = this.getName();
    if (b = Blockly.Functions.getDefinition(b, this.workspace)) {
      a = b.getArguments().slice();
      var c = this.arguments_.slice();
      JSON.stringify(c) !== JSON.stringify(a) && Blockly.Functions.mutateCallersAndDefinition(b.getName(), this.workspace, b.mutationToDom());
      this.functionId_ = b.functionId_
    } else {
      Blockly.Events.setGroup(a.group);
      b = goog.dom.createDom("xml");
      a = goog.dom.createDom("block");
      a.setAttribute("type", Blockly.FUNCTION_DEFINITION_BLOCK_TYPE);
      c = this.getRelativeToSurfaceXY();
      var d = c.y + 2 * Blockly.SNAP_RADIUS;
      a.setAttribute("x", c.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1));
      a.setAttribute("y", d);
      c = this.mutationToDom();
      a.appendChild(c);
      b.appendChild(a);
      Blockly.Xml.domToWorkspace(b, this.workspace);
      Blockly.Events.setGroup(!1)
    }
  } else a.type == Blockly.Events.BLOCK_DELETE && (b = this.getName(), b = Blockly.Functions.getDefinition(b, this.workspace),
  b || (Blockly.Events.setGroup(a.group), this.dispose(!0, !1), Blockly.Events.setGroup(!1)))
};
Blockly.Blocks.function_declaration = {
  init: function () {
    this.name_ = "";
    this.arguments_ = [];
    this.functionId_ = "";
    this.createAllInputs_();
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setStatements_(!0);
    this.setDeletable(!1);
    this.setMovable(!1);
    this.contextMenu = !1;
    this.setStartHat(!0);
    this.statementConnection_ = null
  },
  mutationToDom: Blockly.PXTBlockly.FunctionUtils.mutationToDom,
  domToMutation: Blockly.PXTBlockly.FunctionUtils.domToMutation,
  getName: Blockly.PXTBlockly.FunctionUtils.getName,
  getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
  getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
  removeValueInputs_: Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
  disconnectOldBlocks_: Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
  deleteShadows_: Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
  createAllInputs_: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
  updateDisplay_: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
  setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
  ensureIds_: Blockly.PXTBlockly.FunctionUtils.ensureIds_,
  populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDeclaration_,
  addFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.addLabelEditor_,
  updateFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.updateLabelEditor_,
  createArgumentEditor_: Blockly.PXTBlockly.FunctionUtils.createArgumentEditor_,
  focusLastEditor_: Blockly.PXTBlockly.FunctionUtils.focusLastEditor_,
  removeFieldCallback: Blockly.PXTBlockly.FunctionUtils.removeFieldCallback,
  addParam_: Blockly.PXTBlockly.FunctionUtils.addParam_,
  addBooleanExternal: Blockly.PXTBlockly.FunctionUtils.addBooleanExternal,
  addStringExternal: Blockly.PXTBlockly.FunctionUtils.addStringExternal,
  addNumberExternal: Blockly.PXTBlockly.FunctionUtils.addNumberExternal,
  addCustomExternal: Blockly.PXTBlockly.FunctionUtils.addCustomExternal,
  updateFunctionSignature: Blockly.PXTBlockly.FunctionUtils.updateDeclarationMutation_
};
Blockly.Blocks.function_definition = {
  init: function () {
    this.jsonInit({extensions: ["function_contextmenu_edit"]});
    this.name_ = "";
    this.arguments_ = [];
    this.functionId_ = "";
    this.createAllInputs_();
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.setStatements_(!0);
    this.setStartHat(!0);
    this.statementConnection_ = null
  },
  mutationToDom: Blockly.PXTBlockly.FunctionUtils.mutationToDom,
  domToMutation: Blockly.PXTBlockly.FunctionUtils.domToMutation,
  getName: Blockly.PXTBlockly.FunctionUtils.getName,
  getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
  getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
  removeValueInputs_: Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
  disconnectOldBlocks_: Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
  deleteShadows_: Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
  createAllInputs_: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
  updateDisplay_: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
  setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
  ensureIds_: Blockly.PXTBlockly.FunctionUtils.ensureIds_,
  populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnDefinition_,
  addFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.addLabelEditor_,
  updateFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.updateLabelEditor_,
  createArgumentReporter_: Blockly.PXTBlockly.FunctionUtils.createArgumentReporter_
};
Blockly.Blocks.function_call = {
  init: function () {
    this.jsonInit({extensions: ["function_contextmenu_edit"]});
    this.name_ = "";
    this.arguments_ = [];
    this.functionId_ = "";
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setColour(Blockly.Msg.PROCEDURES_HUE);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.setTooltip(Blockly.Msg.FUNCTION_CALL_TOOLTIP)
  },
  mutationToDom: Blockly.PXTBlockly.FunctionUtils.mutationToDom,
  domToMutation: Blockly.PXTBlockly.FunctionUtils.domToMutation,
  getName: Blockly.PXTBlockly.FunctionUtils.getName,
  getFunctionId: Blockly.PXTBlockly.FunctionUtils.getFunctionId,
  getArguments: Blockly.PXTBlockly.FunctionUtils.getArguments,
  removeValueInputs_: Blockly.PXTBlockly.FunctionUtils.removeValueInputs_,
  disconnectOldBlocks_: Blockly.PXTBlockly.FunctionUtils.disconnectOldBlocks_,
  deleteShadows_: Blockly.PXTBlockly.FunctionUtils.deleteShadows_,
  createAllInputs_: Blockly.PXTBlockly.FunctionUtils.createAllInputs_,
  updateDisplay_: Blockly.PXTBlockly.FunctionUtils.updateDisplay_,
  setStatements_: Blockly.PXTBlockly.FunctionUtils.setStatements_,
  ensureIds_: Blockly.PXTBlockly.FunctionUtils.ensureIds_,
  populateArgument_: Blockly.PXTBlockly.FunctionUtils.populateArgumentOnCaller_,
  addFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.addLabelField_,
  updateFunctionLabel_: Blockly.PXTBlockly.FunctionUtils.updateLabelField_,
  attachShadow_: Blockly.PXTBlockly.FunctionUtils.attachShadow_,
  buildShadowDom_: Blockly.PXTBlockly.FunctionUtils.buildShadowDom_,
  onchange: Blockly.PXTBlockly.FunctionUtils.onCallerChange
};
Blockly.PXTBlockly.FunctionUtils.getTypeName = function () {
  return this.typeName_
};
Blockly.PXTBlockly.FunctionUtils.argumentMutationToDom = function () {
  var a = document.createElement("mutation");
  a.setAttribute("typename", this.typeName_);
  return a
};
Blockly.PXTBlockly.FunctionUtils.argumentDomToMutation = function (a) {
  this.typeName_ = a.getAttribute("typename");
  this.setOutput(!0, this.typeName_)
};
Blockly.PXTBlockly.FunctionUtils.createCustomArgumentBlock = function (a, b, c) {
  a = Blockly.Xml.textToDom('<xml><block type="' + a + '"><mutation typename="' + b + '"></mutation></block></xml>');
  return Blockly.Xml.domToBlock(a.firstChild, c)
};
Blockly.PXTBlockly.FunctionUtils.createCustomArgumentEditor = function (a, b) {
  return Blockly.PXTBlockly.FunctionUtils.createCustomArgumentBlock("argument_editor_custom", a, b)
};
Blockly.PXTBlockly.FunctionUtils.createCustomArgumentReporter = function (a, b) {
  return Blockly.PXTBlockly.FunctionUtils.createCustomArgumentBlock("argument_reporter_custom", a, b)
};
Blockly.PXTBlockly.FunctionUtils.onReporterChange = function (a) {
  if (this.workspace && !this.workspace.isFlyout) {
    var b = a.type === Blockly.Events.BLOCK_CREATE && -1 != a.ids.indexOf(this.id),
      c = a.type === Blockly.Events.END_DRAG && -1 != a.allNestedIds.indexOf(this.id);
    if (b || c) b = this.getRootBlock(), Blockly.Functions.isFunctionArgumentReporter(b) || null != b.previousConnection || Blockly.pxtBlocklyUtils.hasMatchingArgumentReporter(b, this) || (Blockly.Events.setGroup(a.group), this.dispose(), Blockly.Events.setGroup(!1))
  }
};
Blockly.Blocks.argument_editor_boolean = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_argument_editor", name: "TEXT", text: "bool"}],
      colour: Blockly.Colours.textField,
      colourSecondary: Blockly.Colours.textField,
      colourTertiary: Blockly.Colours.textField,
      extensions: ["output_boolean"]
    });
    this.typeName_ = "boolean"
  },
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName,
  removeFieldCallback: Blockly.PXTBlockly.FunctionUtils.removeArgumentCallback_
};
Blockly.Blocks.argument_editor_string = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_argument_editor", name: "TEXT", text: "text"}],
      colour: Blockly.Colours.textField,
      colourSecondary: Blockly.Colours.textField,
      colourTertiary: Blockly.Colours.textField,
      extensions: ["output_string"]
    });
    this.typeName_ = "string"
  },
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName,
  removeFieldCallback: Blockly.PXTBlockly.FunctionUtils.removeArgumentCallback_
};
Blockly.Blocks.argument_editor_number = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_argument_editor", name: "TEXT", text: "num"}],
      colour: Blockly.Colours.textField,
      colourSecondary: Blockly.Colours.textField,
      colourTertiary: Blockly.Colours.textField,
      extensions: ["output_number"]
    });
    this.typeName_ = "number"
  },
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName,
  removeFieldCallback: Blockly.PXTBlockly.FunctionUtils.removeArgumentCallback_
};
Blockly.Blocks.argument_editor_custom = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_argument_editor", name: "TEXT", text: "arg"}],
      colour: Blockly.Colours.textField,
      colourSecondary: Blockly.Colours.textField,
      colourTertiary: Blockly.Colours.textField,
      outputShape: Blockly.OUTPUT_SHAPE_ROUND
    });
    this.typeName_ = "any"
  },
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName,
  removeFieldCallback: Blockly.PXTBlockly.FunctionUtils.removeArgumentCallback_,
  mutationToDom: Blockly.PXTBlockly.FunctionUtils.argumentMutationToDom,
  domToMutation: Blockly.PXTBlockly.FunctionUtils.argumentDomToMutation
};
Blockly.Blocks.argument_reporter_boolean = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_label_hover", name: "VALUE", text: ""}],
      colour: Blockly.Msg.REPORTERS_HUE,
      extensions: ["output_boolean"]
    });
    this.typeName_ = "boolean"
  },
  onchange: Blockly.PXTBlockly.FunctionUtils.onReporterChange,
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName
};
Blockly.Blocks.argument_reporter_number = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_label_hover", name: "VALUE", text: ""}],
      colour: Blockly.Msg.REPORTERS_HUE,
      extensions: ["output_number"]
    });
    this.typeName_ = "number"
  },
  onchange: Blockly.PXTBlockly.FunctionUtils.onReporterChange,
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName
};
Blockly.Blocks.argument_reporter_string = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_label_hover", name: "VALUE", text: ""}],
      colour: Blockly.Msg.REPORTERS_HUE,
      extensions: ["output_string"]
    });
    this.typeName_ = "string"
  },
  onchange: Blockly.PXTBlockly.FunctionUtils.onReporterChange,
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName
};
Blockly.Blocks.argument_reporter_custom = {
  init: function () {
    this.jsonInit({
      message0: " %1",
      args0: [{type: "field_label_hover", name: "VALUE", text: ""}],
      colour: Blockly.Msg.REPORTERS_HUE,
      inputsInline: !0,
      outputShape: Blockly.OUTPUT_SHAPE_ROUND,
      output: null
    });
    this.typeName_ = ""
  },
  onchange: Blockly.PXTBlockly.FunctionUtils.onReporterChange,
  getTypeName: Blockly.PXTBlockly.FunctionUtils.getTypeName,
  mutationToDom: Blockly.PXTBlockly.FunctionUtils.argumentMutationToDom,
  domToMutation: Blockly.PXTBlockly.FunctionUtils.argumentDomToMutation
};
Blockly.Constants.Text = {};
Blockly.Constants.Text.HUE = 160;
Blockly.defineBlocksWithJsonArray([{
  type: "text",
  message0: "%1",
  args0: [{type: "field_string", name: "TEXT", text: ""}],
  output: "String",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: Blockly.Colours.textField,
  colourSecondary: Blockly.Colours.textField,
  colourTertiary: "%{BKY_TEXTS_HUE}",
  helpUrl: "%{BKY_TEXT_TEXT_HELPURL}",
  tooltip: "%{BKY_TEXT_TEXT_TOOLTIP}",
  extensions: ["parent_tooltip_when_inline"]
}, {
  type: "text_join",
  message0: "",
  output: "String",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_TEXTS_HUE}",
  helpUrl: "%{BKY_TEXT_JOIN_HELPURL}",
  tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}",
  mutator: "text_join_mutator"
}, {
  type: "text_create_join_container",
  message0: "%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2",
  args0: [{type: "input_dummy"}, {type: "input_statement", name: "STACK"}],
  colour: "%{BKY_TEXTS_HUE}",
  tooltip: "%{BKY_TEXT_CREATE_JOIN_TOOLTIP}",
  enableContextMenu: !1
}, {
  type: "text_create_join_item",
  message0: "%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_TEXTS_HUE}",
  tooltip: "%{BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}",
  enableContextMenu: !1
}, {
  type: "text_append",
  message0: "%{BKY_TEXT_APPEND_TITLE}",
  args0: [{type: "field_variable", name: "VAR", variable: "%{BKY_TEXT_APPEND_VARIABLE}"}, {
    type: "input_value",
    name: "TEXT"
  }],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_TEXTS_HUE}",
  extensions: ["text_append_tooltip"]
}, {
  type: "text_length",
  message0: "%{BKY_TEXT_LENGTH_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: ["String", "Array"]}],
  output: "Number",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_TEXTS_HUE}",
  tooltip: "%{BKY_TEXT_LENGTH_TOOLTIP}",
  helpUrl: "%{BKY_TEXT_LENGTH_HELPURL}"
}, {
  type: "text_isEmpty",
  message0: "%{BKY_TEXT_ISEMPTY_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: ["String", "Array"]}],
  output: "Boolean",
  outputShape: Blockly.OUTPUT_SHAPE_HEXAGONAL,
  colour: "%{BKY_TEXTS_HUE}",
  tooltip: "%{BKY_TEXT_ISEMPTY_TOOLTIP}",
  helpUrl: "%{BKY_TEXT_ISEMPTY_HELPURL}"
}, {
  type: "text_indexOf",
  message0: "%{BKY_TEXT_INDEXOF_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: "String"}, {
    type: "field_dropdown", name: "END",
    options: [["%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}", "FIRST"], ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"]]
  }, {type: "input_value", name: "FIND", check: "String"}],
  output: "Number",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_TEXTS_HUE}",
  helpUrl: "%{BKY_TEXT_INDEXOF_HELPURL}",
  inputsInline: !0,
  extensions: ["text_indexOf_tooltip"]
}, {
  type: "text_charAt",
  message0: "%{BKY_TEXT_CHARAT_TITLE}",
  args0: [{type: "input_value", name: "VALUE", check: "String"}, {
    type: "field_dropdown", name: "WHERE", options: [["%{BKY_TEXT_CHARAT_FROM_START}",
      "FROM_START"], ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"], ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"], ["%{BKY_TEXT_CHARAT_LAST}", "LAST"], ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]]
  }],
  output: "String",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  colour: "%{BKY_TEXTS_HUE}",
  helpUrl: "%{BKY_TEXT_CHARAT_HELPURL}",
  inputsInline: !0,
  mutator: "text_charAt_mutator"
}]);
Blockly.Blocks.text_getSubstring = {
  init: function () {
    this.WHERE_OPTIONS_1 = [[Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, "FROM_START"], [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, "FROM_END"], [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, "FIRST"]];
    this.WHERE_OPTIONS_2 = [[Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, "FROM_START"], [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, "FROM_END"], [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, "LAST"]];
    this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.appendValueInput("STRING").setCheck("String").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
    this.appendDummyInput("AT1");
    this.appendDummyInput("AT2");
    Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    this.setInputsInline(!0);
    this.setOutput(!0, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.updateAt_(1, !0);
    this.updateAt_(2, !0);
    this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP)
  }, mutationToDom: function () {
    var a =
      document.createElement("mutation"), b = this.getInput("AT1").type == Blockly.INPUT_VALUE;
    a.setAttribute("at1", b);
    b = this.getInput("AT2").type == Blockly.INPUT_VALUE;
    a.setAttribute("at2", b);
    return a
  }, domToMutation: function (a) {
    var b = "true" == a.getAttribute("at1");
    a = "true" == a.getAttribute("at2");
    this.updateAt_(1, b);
    this.updateAt_(2, a)
  }, updateAt_: function (a, b) {
    this.removeInput("AT" + a);
    this.removeInput("ORDINAL" + a, !0);
    b ? (this.appendValueInput("AT" + a).setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL" +
      a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT" + a);
    2 == a && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL));
    var c = new Blockly.FieldDropdown(this["WHERE_OPTIONS_" + a], function (c) {
      var d = "FROM_START" == c || "FROM_END" == c;
      if (d != b) {
        var f = this.sourceBlock_;
        f.updateAt_(a, d);
        f.setFieldValue(c, "WHERE" + a);
        return null
      }
    });
    this.getInput("AT" + a).appendField(c, "WHERE" + a);
    1 == a && (this.moveInputBefore("AT1",
      "AT2"), this.getInput("ORDINAL1") && this.moveInputBefore("ORDINAL1", "AT2"))
  }
};
Blockly.Blocks.text_changeCase = {
  init: function () {
    var a = [[Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, "UPPERCASE"], [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, "LOWERCASE"], [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, "TITLECASE"]];
    this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a), "CASE");
    this.setOutput(!0, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP)
  }
};
Blockly.Blocks.text_trim = {
  init: function () {
    var a = [[Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, "BOTH"], [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, "LEFT"], [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, "RIGHT"]];
    this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a), "MODE");
    this.setOutput(!0, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP)
  }
};
Blockly.Blocks.text_print = {
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.TEXT_PRINT_TITLE,
      args0: [{type: "input_value", name: "TEXT"}],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.TEXTS_HUE,
      tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
      helpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
    })
  }
};
Blockly.Blocks.text_prompt_ext = {
  init: function () {
    var a = [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"], [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]];
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    var b = this;
    a = new Blockly.FieldDropdown(a, function (a) {
      b.updateType_(a)
    });
    this.appendValueInput("TEXT").appendField(a, "TYPE");
    this.setOutput(!0, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setTooltip(function () {
      return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
        Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
    })
  }, updateType_: function (a) {
    this.outputConnection.setCheck("NUMBER" == a ? "Number" : "String")
  }, mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("type", this.getFieldValue("TYPE"));
    return a
  }, domToMutation: function (a) {
    this.updateType_(a.getAttribute("type"))
  }
};
Blockly.Blocks.text_prompt = {
  init: function () {
    this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
    var a = [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"], [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]], b = this;
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    a = new Blockly.FieldDropdown(a, function (a) {
      b.updateType_(a)
    });
    this.appendDummyInput().appendField(a, "TYPE").appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
    this.setOutput(!0, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setTooltip(function () {
      return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
    })
  },
  updateType_: Blockly.Blocks.text_prompt_ext.updateType_,
  mutationToDom: Blockly.Blocks.text_prompt_ext.mutationToDom,
  domToMutation: Blockly.Blocks.text_prompt_ext.domToMutation
};
Blockly.Blocks.text_count = {
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.TEXT_COUNT_MESSAGE0,
      args0: [{type: "input_value", name: "SUB", check: "String"}, {
        type: "input_value",
        name: "TEXT",
        check: "String"
      }],
      output: "Number",
      outputShape: Blockly.OUTPUT_SHAPE_ROUND,
      inputsInline: !0,
      colour: Blockly.Msg.TEXTS_HUE,
      tooltip: Blockly.Msg.TEXT_COUNT_TOOLTIP,
      helpUrl: Blockly.Msg.TEXT_COUNT_HELPURL
    })
  }
};
Blockly.Blocks.text_replace = {
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.TEXT_REPLACE_MESSAGE0,
      args0: [{type: "input_value", name: "FROM", check: "String"}, {
        type: "input_value",
        name: "TO",
        check: "String"
      }, {type: "input_value", name: "TEXT", check: "String"}],
      output: "String",
      outputShape: Blockly.OUTPUT_SHAPE_ROUND,
      inputsInline: !0,
      colour: Blockly.Msg.TEXTS_HUE,
      tooltip: Blockly.Msg.TEXT_REPLACE_TOOLTIP,
      helpUrl: Blockly.Msg.TEXT_REPLACE_HELPURL
    })
  }
};
Blockly.Blocks.text_reverse = {
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.TEXT_REVERSE_MESSAGE0,
      args0: [{type: "input_value", name: "TEXT", check: "String"}],
      output: "String",
      outputShape: Blockly.OUTPUT_SHAPE_ROUND,
      inputsInline: !0,
      colour: Blockly.Msg.TEXTS_HUE,
      tooltip: Blockly.Msg.TEXT_REVERSE_TOOLTIP,
      helpUrl: Blockly.Msg.TEXT_REVERSE_HELPURL
    })
  }
};
Blockly.Constants.Text.QUOTE_IMAGE_MIXIN = {
  QUOTE_IMAGE_LEFT_DATAURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
  QUOTE_IMAGE_RIGHT_DATAURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
  QUOTE_IMAGE_WIDTH: 12,
  QUOTE_IMAGE_HEIGHT: 12,
  quoteField_: function (a) {
    for (var b = 0, c; c = this.inputList[b]; b++) for (var d = 0, e; e = c.fieldRow[d]; d++) if (a == e.name) {
      c.insertFieldAt(d, this.newQuote_(!0));
      c.insertFieldAt(d + 2, this.newQuote_(!1));
      return
    }
    console.warn('field named "' + a + '" not found in ' + this.toDevString())
  },
  newQuote_: function (a) {
    a = this.RTL ? !a : a;
    return new Blockly.FieldImage(a ? this.QUOTE_IMAGE_LEFT_DATAURI : this.QUOTE_IMAGE_RIGHT_DATAURI, this.QUOTE_IMAGE_WIDTH, this.QUOTE_IMAGE_HEIGHT, a ? "\u201c" : "\u201d")
  }
};
Blockly.Constants.Text.TEXT_QUOTES_EXTENSION = function () {
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  this.quoteField_("TEXT")
};
Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN = {
  mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("items", this.itemCount_);
    return a
  }, domToMutation: function (a) {
    this.itemCount_ = parseInt(a.getAttribute("items"), 10);
    this.updateShape_()
  }, saveConnections: function (a) {
    a = a.getInputTargetBlock("STACK");
    for (var b = 0; a;) {
      var c = this.getInput("ADD" + b);
      a.valueConnection_ = c && c.connection.targetConnection;
      b++;
      a = a.nextConnection && a.nextConnection.targetBlock()
    }
  }, storeValueConnections_: function () {
    this.valueConnections_ =
      [];
    for (var a = 0; a < this.itemCount_; a++) this.valueConnections_.push(this.getInput("ADD" + a).connection.targetConnection)
  }, restoreValueConnections_: function () {
    for (var a = 0; a < this.itemCount_; a++) Blockly.Mutator.reconnect(this.valueConnections_[a], this, "ADD" + a)
  }, addItem_: function () {
    this.storeValueConnections_();
    this.update_(function () {
      this.itemCount_++
    });
    this.restoreValueConnections_();
    if (1 < this.itemCount_) {
      var a = this.getInput("ADD0");
      if (a && a.connection.targetConnection) {
        var b = this.getInput("ADD" + (this.itemCount_ -
          1)), c = a.connection.getShadowDom();
        c && (a = document.createElement("shadow"), c = c.getAttribute("type"), a.setAttribute("type", c), a && (a.setAttribute("id", Blockly.utils.genUid()), b.connection.setShadowDom(a), b.connection.respawnShadow_()))
      }
    }
  }, removeItem_: function () {
    this.storeValueConnections_();
    this.update_(function () {
      this.itemCount_--
    });
    this.restoreValueConnections_()
  }, update_: function (a) {
    Blockly.Events.setGroup(!0);
    var b = this, c = b.mutationToDom();
    c = c && Blockly.Xml.domToText(c);
    var d = b.rendered;
    b.rendered =
      !1;
    a && a.call(this);
    this.updateShape_();
    b.rendered = d;
    b.initSvg();
    var e = Blockly.Events.getGroup();
    a = (a = b.mutationToDom()) && Blockly.Xml.domToText(a);
    c != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(b, "mutation", null, c, a)), setTimeout(function () {
      Blockly.Events.setGroup(e);
      b.bumpNeighbours_();
      Blockly.Events.setGroup(!1)
    }, Blockly.BUMP_DELAY));
    b.rendered && b.render();
    Blockly.Events.setGroup(!1)
  }, updateShape_: function () {
    var a = this, b = function () {
      a.removeItem_()
    };
    this.getInput("EMPTY") && this.removeInput("EMPTY");
    this.getInput("TITLE") || this.appendDummyInput("TITLE").appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
    for (var c = 0; c < this.itemCount_; c++) this.getInput("ADD" + c) || this.appendValueInput("ADD" + c).setAlign(Blockly.ALIGN_LEFT);
    for (; this.getInput("ADD" + c);) this.removeInput("ADD" + c), c++;
    this.getInput("BUTTONS") && this.removeInput("BUTTONS");
    c = this.appendDummyInput("BUTTONS");
    1 < this.itemCount_ && c.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, 24, 24, !1, "*", b));
    c.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
      24, 24, !1, "*", function () {
        a.addItem_()
      }));
    b = 4 >= this.itemCount_;
    this.setInputsInline(b);
    this.setOutputShape(b ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE)
  }
};
Blockly.Constants.Text.TEXT_JOIN_EXTENSION = function () {
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  Blockly.Extensions.apply("inline-svgs", this, !1);
  this.itemCount_ = 2;
  this.updateShape_()
};
Blockly.Extensions.register("text_append_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_TEXT_APPEND_TOOLTIP}", "VAR"));
Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION = function () {
  var a = this;
  this.setTooltip(function () {
    return Blockly.Msg.TEXT_INDEXOF_TOOLTIP.replace("%1", a.workspace.options.oneBasedIndex ? "0" : "-1")
  })
};
Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN = {
  mutationToDom: function () {
    var a = document.createElement("mutation");
    a.setAttribute("at", !!this.isAt_);
    return a
  }, domToMutation: function (a) {
    a = "false" != a.getAttribute("at");
    this.updateAt_(a)
  }, updateAt_: function (a) {
    this.removeInput("AT", !0);
    this.removeInput("ORDINAL", !0);
    a && (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX));
    Blockly.Msg.TEXT_CHARAT_TAIL &&
    (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_CHARAT_TAIL));
    this.isAt_ = a
  }
};
Blockly.Constants.Text.TEXT_CHARAT_EXTENSION = function () {
  this.getField("WHERE").setValidator(function (a) {
    var b = "FROM_START" == a || "FROM_END" == a;
    if (b != this.isAt_) {
      var d = this.sourceBlock_;
      d.updateAt_(b);
      d.setFieldValue(a, "WHERE");
      return null
    }
  });
  this.updateAt_(!0);
  var a = this;
  this.setTooltip(function () {
    var b = a.getFieldValue("WHERE"), c = Blockly.Msg.TEXT_CHARAT_TOOLTIP;
    ("FROM_START" == b || "FROM_END" == b) && (b = "FROM_START" == b ? Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP : Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP) &&
    (c += "  " + b.replace("%1", a.workspace.options.oneBasedIndex ? "#1" : "#0"));
    return c
  })
};
Blockly.Extensions.register("text_indexOf_tooltip", Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION);
Blockly.Extensions.register("text_quotes", Blockly.Constants.Text.TEXT_QUOTES_EXTENSION);
Blockly.Extensions.registerMutator("text_join_mutator", Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN, Blockly.Constants.Text.TEXT_JOIN_EXTENSION);
Blockly.Extensions.registerMutator("text_charAt_mutator", Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN, Blockly.Constants.Text.TEXT_CHARAT_EXTENSION);
Blockly.Constants.Variables = {};
Blockly.Constants.Variables.HUE = 330;
Blockly.defineBlocksWithJsonArray([{
  type: "variables_get",
  message0: "%1",
  args0: [{type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}"}],
  output: null,
  colour: "%{BKY_VARIABLES_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
  tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
  extensions: ["contextMenu_variableSetterGetter"]
}, {
  type: "variables_get_reporter",
  message0: "%1",
  args0: [{type: "field_variable_getter", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}"}],
  output: null,
  colour: "%{BKY_VARIABLES_HUE}",
  outputShape: Blockly.OUTPUT_SHAPE_ROUND,
  helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
  tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
  extensions: ["contextMenu_variableReporter"]
}, {
  type: "variables_set",
  message0: "%{BKY_VARIABLES_SET}",
  args0: [{type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}"}, {
    type: "input_value",
    name: "VALUE"
  }],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_VARIABLES_HUE}",
  tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
  helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
  extensions: ["contextMenu_variableSetterGetter"]
}]);
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  customContextMenu: function (a) {
    if (!this.isCollapsed()) if (!this.isInFlyout) {
      if ("variables_get" == this.type || "variables_get_reporter" == this.type) var b = "variables_set",
        c = Blockly.Msg.VARIABLES_GET_CREATE_SET; else b = "variables_get", c = Blockly.Msg.VARIABLES_SET_CREATE_GET;
      var d = {enabled: 0 < this.workspace.remainingCapacity()}, e = this.getField("VAR").getText();
      d.text = c.replace("%1", e);
      e = goog.dom.createDom("field", null, e);
      e.setAttribute("name",
        "VAR");
      e = goog.dom.createDom("block", null, e);
      e.setAttribute("type", b);
      d.callback = Blockly.ContextMenu.callbackFactory(this, e);
      a.push(d)
    } else if ("variables_get" == this.type || "variables_get_reporter" == this.type) b = {
      text: Blockly.Msg.RENAME_VARIABLE,
      enabled: !0,
      callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
    }, e = this.getField("VAR").getText(), d = {
      text: Blockly.Msg.DELETE_VARIABLE.replace("%1", e),
      enabled: !0,
      callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
    }, a.unshift(b),
      a.unshift(d)
  }
};
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_REPORTER_MIXIN = {
  customContextMenu: function (a) {
    if (!this.isCollapsed()) {
      var b = {
        text: Blockly.Msg.RENAME_VARIABLE,
        enabled: !0,
        callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
      };
      a.unshift(b);
      if (!this.isInFlyout) {
        b = this.workspace.getVariablesOfType("");
        0 < b.length && a.unshift({separator: !0});
        for (var c = b.length - 1; 0 <= c; c--) {
          var d = {enabled: !0};
          d.text = b[c].name;
          d.callback = Blockly.Constants.Variables.VARIABLE_OPTION_CALLBACK_FACTORY(this, d.text,
            b[c].getId());
          a.unshift(d)
        }
      }
    }
  }
};
Blockly.Constants.Variables.VARIABLE_OPTION_CALLBACK_FACTORY = function (a, b, c) {
  return function () {
    var b = a.getField("VAR");
    b || console.log("Tried to get a variable field on the wrong type of block.");
    b.setValue(c)
  }
};
Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY = function (a) {
  return function () {
    var b = a.workspace, c = a.getField("VAR").getVariable();
    Blockly.Variables.renameVariable(b, c)
  }
};
Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY = function (a) {
  return function () {
    var b = a.workspace, c = a.getField("VAR").getVariable();
    b.deleteVariableById(c.getId());
    b.refreshToolboxSelection()
  }
};
Blockly.Extensions.registerMixin("contextMenu_variableSetterGetter", Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);
Blockly.Extensions.registerMixin("contextMenu_variableReporter", Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_REPORTER_MIXIN);
Blockly.Constants.VariablesDynamic = {};
Blockly.Constants.VariablesDynamic.HUE = 310;
Blockly.defineBlocksWithJsonArray([{
  type: "variables_get_dynamic",
  message0: "%1",
  args0: [{type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}"}],
  output: null,
  colour: "%{BKY_VARIABLES_DYNAMIC_HUE}",
  helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
  tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
  extensions: ["contextMenu_variableDynamicSetterGetter"]
}, {
  type: "variables_set_dynamic",
  message0: "%{BKY_VARIABLES_SET}",
  args0: [{type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}"}, {
    type: "input_value",
    name: "VALUE"
  }],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_VARIABLES_DYNAMIC_HUE}",
  tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
  helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
  extensions: ["contextMenu_variableDynamicSetterGetter"]
}]);
Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  customContextMenu: function (a) {
    if (!this.isInFlyout) {
      var b = this.getFieldValue("VAR");
      var c = this.workspace.getVariableById(b).type;
      if ("variables_get_dynamic" == this.type) {
        b = "variables_set_dynamic";
        var d = Blockly.Msg.VARIABLES_GET_CREATE_SET
      } else b = "variables_get_dynamic", d = Blockly.Msg.VARIABLES_SET_CREATE_GET;
      var e = {enabled: 0 < this.workspace.remainingCapacity()}, f = this.getField("VAR").getText();
      e.text = d.replace("%1", f);
      d = document.createElement("field");
      d.setAttribute("name", "VAR");
      d.setAttribute("variabletype", c);
      d.appendChild(document.createTextNode(f));
      f = document.createElement("block");
      f.setAttribute("type", b);
      f.appendChild(d);
      e.callback = Blockly.ContextMenu.callbackFactory(this, f);
      a.push(e)
    } else if ("variables_get_dynamic" == this.type || "variables_get_reporter_dynamic" == this.type) b = {
      text: Blockly.Msg.RENAME_VARIABLE,
      enabled: !0,
      callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
    }, f = this.getField("VAR").getText(),
      e = {
        text: Blockly.Msg.DELETE_VARIABLE.replace("%1", f),
        enabled: !0,
        callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
      }, a.unshift(b), a.unshift(e)
  }, onchange: function () {
    var a = this.getFieldValue("VAR");
    a = this.workspace.getVariableById(a);
    "variables_get_dynamic" == this.type ? this.outputConnection.setCheck(a.type) : this.getInput("VALUE").connection.setCheck(a.type)
  }
};
Blockly.Constants.VariablesDynamic.RENAME_OPTION_CALLBACK_FACTORY = function (a) {
  return function () {
    var b = a.workspace, c = a.getField("VAR").getVariable();
    Blockly.Variables.renameVariable(b, c)
  }
};
Blockly.Constants.VariablesDynamic.DELETE_OPTION_CALLBACK_FACTORY = function (a) {
  return function () {
    var b = a.workspace, c = a.getField("VAR").getVariable();
    b.deleteVariableById(c.getId());
    b.refreshToolboxSelection()
  }
};
Blockly.Extensions.registerMixin("contextMenu_variableDynamicSetterGetter", Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);