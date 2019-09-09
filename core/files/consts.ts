import path from 'path';
import { homedir } from 'os';

const homePath = path.join(homedir(), 'CircuitBlocks');

export default homePath;
