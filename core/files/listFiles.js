const fs = require('fs');

const { homePath } = require('./consts');

const listFiles = (callback) => {
  if (!fs.existsSync(homePath)) {
    fs.mkdirSync(homePath);
  }

  fs.readdir(homePath, (readError, items) => {
    if (readError === null) {
      callback(null, items.filter((item) => item.indexOf('.json') === -1));
      return;
    }

    callback(readError);
  });
};

// listFiles((err, data) => {
//   console.error(err);
//   console.log(data);
// });

module.exports = listFiles;
