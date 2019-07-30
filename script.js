const demoWorkspace = Blockly.inject("blocklyDiv", {
  media: "./blockly/media",
  toolbox: document.getElementById("toolbox")
});

const setConsole = data => {
  document.querySelector("#codeDiv p").innerHTML = data;
};

demoWorkspace.addChangeListener(e => {
  const code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  setConsole(code);
});
