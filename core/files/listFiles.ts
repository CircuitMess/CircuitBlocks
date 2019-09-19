import { existsSync, mkdirSync, readdir, readdirSync } from 'fs';
import * as path from 'path';

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

const listExamples = (callback, examplesPath) => {
  if (!existsSync(examplesPath)) {
    callback('NO_EXAMPLES');
    return;
  }

  readdir(examplesPath, (readError, items) => {
    if (readError === null) {
      const examplesAll = {};

      items.forEach((item) => {
        const examples = readdirSync(path.join(examplesPath, item));
        if (examples.length > 0) {
          examplesAll[item] = examples;
        }
      });

      callback(null, examplesAll);
      return;
    }

    callback(readError);
  });
};

// listFiles((err, data) => {
//   console.error(err);
//   console.log(data);
// });

// listExamples((err, data) => {
//   console.error(err);
//   console.log(data);
// }, '../../examples');

export { listFiles, listExamples };
