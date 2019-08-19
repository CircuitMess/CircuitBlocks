const loadFile = (file, fullPath = undefined) => {
  const request = new XMLHttpRequest();
  request.open('GET', fullPath ? file : `xmls/${file}`, false);
  request.send();
  if (request.readyState === 4 && request.status === 200) {
    return new XMLSerializer().serializeToString(request.responseXML.documentElement);
  }
};

const toolbox = loadFile('pxt-toolbox.xml');

export default loadFile;
export { toolbox };
