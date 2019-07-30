const loadFile = file => {
  const request = new XMLHttpRequest();
  request.open("GET", `xmls/${file}`, false);
  request.send();
  if (request.readyState === 4 && request.status === 200) {
    return new XMLSerializer().serializeToString(
      request.responseXML.documentElement
    );
  }
};

const toolbox = loadFile("toolbox.xml");

export { toolbox };
