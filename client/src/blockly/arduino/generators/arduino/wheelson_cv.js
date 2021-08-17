goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.WheelsonCV");

function whAddCamera(){
	Blockly.Arduino.addInclude("Wheelson_Camera", "#include <Camera.h>");
	Blockly.Arduino.addDeclaration("Wheelson_Camera", "Camera* cam;");
	Blockly.Arduino.addSetup("Wheelson_Camera", "cam = new Camera();");
}

function whAddMarkers(){
	Blockly.Arduino.addInclude("Wheelson_Markers", "#include <Markers.h>");
	Blockly.Arduino.addDeclaration("Wheelson_Aruco_Namespace", "using namespace Aruco;");

	Blockly.Arduino.addInclude("Wheelson_Marker_Map", "#include <unordered_map>");
	Blockly.Arduino.addDeclaration("Wheelson_Marker_Handlers", "std::unordered_map<int, void (*)(Marker&)> markerHandlers;");
}

Blockly.Arduino['wheelson_markers'] = function(block) {
	var MARKER = block.getFieldValue('MARKER');
	return [ MARKER, Blockly.Arduino.ORDER_ATOMIC ];
};

Blockly.Arduino['wheelson_cam_fetch'] = function(block) {
	whAddCamera();

	var code = "cam->releaseFrame();\ncam->loadFrame();\n";
	return code;
};

Blockly.Arduino['wheelson_draw_frame'] = function(block) {
	whAddCamera();

	var code = "sprite->drawIcon(cam->getRGB565(), 0, 4, 160, 120);\n";
	return code;
};

Blockly.Arduino['wheelson_markers_detect'] = function(block) {
	whAddCamera();
	whAddMarkers();

	const detectCode = "  auto markers = Markers::detect((uint8_t*) cam->getRGB565(), 160, 120);\n" +
		"  if(markers.empty()) return;\n" +
		"  for(Marker& marker : markers){\n" +
		"    marker.projected[0].x *= 2;\n" +
		"    marker.projected[0].y *= 2;\n" +
		"    auto handler = markerHandlers.find(marker.id);\n" +
		"    if(handler != markerHandlers.end()) handler->second(marker);\n" +
		"  }";
	const detectFuncName = `detectMarkers`;
	const detectFunc = `void ${detectFuncName}(){\n${detectCode}\n}`;
	Blockly.Arduino.addFunction(detectFuncName, detectFunc);

	var code = `${detectFuncName}();\n`;
	return code;
};

Blockly.Arduino['wheelson_marker_detected'] = function(block){
	whAddMarkers();

	const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);
	const ID = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC);

	const detectedFuncName = `markerDetected${ID}`;
	if(Blockly.Arduino.codeFunctions_[detectedFuncName] !== undefined){
		Blockly.Arduino.codeFunctions_[detectedFuncName] = undefined;
	}

	Blockly.Arduino.addFunction(detectedFuncName, `void ${detectedFuncName}(Marker& marker){\n${CODE}\n}`);
	Blockly.Arduino.addSetup("Marker_Handler_" + ID, `markerHandlers[${ID}] = ${detectedFuncName};`)
}