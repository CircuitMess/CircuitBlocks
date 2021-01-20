goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.wifi');

Blockly.Arduino['wifi_set_info'] = function(block) {
	var ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
	var pass = Blockly.Arduino.valueToCode(block, 'PASS', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Net.set(${ssid}, ${pass});\n`;
	return code;
};

Blockly.Arduino['wifi_state_changed'] = function(block) {
	if(!Blockly.Device) return;

	const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

	const funcName = `WiFi_Changed`;
	const generated = `void ${funcName}(wl_status_t state){\n${CODE}\n}`;
	Blockly.Arduino.addFunction(funcName, generated);

	const setupCode = `Net.addStateCallback(${funcName});`;
	Blockly.Arduino.addSetup(`Net_Changed`, setupCode, false);
};

Blockly.Arduino['wifi_is_connected'] = function(block) {
	var order = Blockly.Arduino.ORDER_EQUALITY;
	var code = 'Net.getState() == WL_CONNECTED';
	return [code, order];
};

Blockly.Arduino['wifi_connect'] = function(block) {
	var code = `Net.connect();\n`;
	return code;
};

Blockly.Arduino['wifi_connect_callback'] = function(block) {
	const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

	var code = `Net.connect([](wl_status_t state){\n${CODE}\n});\n`;
	return code;
};