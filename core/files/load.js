const fs = require('fs');
const path = require('path');

const { homePath } = require('./consts');

const loadFile = (filename, callback) => {
  const filePath = path.join(homePath, filename);

  if (!fs.existsSync(filePath)) {
    callback({ error: 'FILE_NOT_FOUND' });
    return;
  }

  fs.readFile(filePath, 'utf8', callback);
};

// loadFile('foo.xml', (err, data) => {
//   console.error(err);
//   console.log(data);
// });

module.exports = loadFile;
