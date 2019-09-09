import { existsSync, mkdirSync, readdir } from 'fs';

import homePath from './consts';

const listFiles = (callback) => {
  if (!existsSync(homePath)) {
    mkdirSync(homePath);
  }

  readdir(homePath, (readError, items) => {
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

export default listFiles;
