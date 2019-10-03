import path from 'path';
import * as os from 'os';
import * as fs from "fs";

let home;
if(os.type() == "Windows_NT"){
    home = path.join(os.homedir(), "Documents");
}else{
    home = path.join(os.homedir());
}

const homePath =  path.join(home, 'CircuitBlocks');

if(!fs.existsSync(homePath)){
    fs.mkdirSync(homePath);
}

export default homePath;
