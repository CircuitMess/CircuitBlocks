const path = require('path');
const homedir = require('os').homedir();

const homePath = path.join(homedir, 'CircuitBlocks');

module.exports = {
  homePath
};
