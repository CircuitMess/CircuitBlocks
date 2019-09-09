import { existsSync, readFile } from 'fs';
import { join } from 'path';

import homePath from './consts';

const loadFile = (filename, callback) => {
  const filePath = join(homePath, filename);

  if (!existsSync(filePath)) {
    callback({ error: 'FILE_NOT_FOUND' });
    return;
  }

  readFile(filePath, 'utf8', callback);
};

// loadFile('foo.xml', (err, data) => {
//   console.error(err);
//   console.log(data);
// });

export default loadFile;
