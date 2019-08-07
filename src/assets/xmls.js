const loadFile = (file, fullPath = undefined) => {
  const request = new XMLHttpRequest();
  request.open("GET", fullPath ? file : `xmls/${file}`, false);
  request.send();
  if (request.readyState === 4 && request.status === 200) {
    console.log(request);
    return new XMLSerializer().serializeToString(
      request.responseXML.documentElement
    );
  }
};

const toolbox = loadFile("toolbox.xml");

export default loadFile;
export { toolbox };
