import fs from 'fs';
import path from 'path';

import homePath from './consts';

const saveFile = (data, filename, callback) => {
  const filePath = path.join(homePath, filename);

  if (!fs.existsSync(homePath)) {
    fs.mkdirSync(homePath);
  }

  fs.writeFile(filePath, data, callback);
};

// saveFile('lksadflk sjfsjadlf jasdfl ', 'foo.xml', (error) => console.log(error));

module.exports = saveFile;
export default saveFile;
