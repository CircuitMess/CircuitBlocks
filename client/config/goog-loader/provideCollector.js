const path = require("path");
const walker = require("walk");
const fs = require('fs');
const os = require('os');

class ProvideCollector {

  constructor(roots){
    if(Array.isArray(roots)){
      this.roots = roots;
    }else{
      this.roots = [ roots ];
    }

    this.regex = new RegExp("goog\\.provide\\(\\s*[\"'](.*)[\"']\\s*\\)", "g");

    let context = this;

    this.walkOptions = {
      followLinks: false,
      mask: "*.js",

      listeners: {
        file: (root, fileStats, next) => {
          let extension = path.extname(fileStats.name).toLowerCase();
          if(extension !== ".js") next();

          context.checkFile(path.join(root, fileStats.name), () => next());
        }
      }
    };
  }

  checkFile(filepath, callback){
    let regex = this.regex;
    let map = this.provides;

    let data = fs.readFileSync(filepath, { encoding: "UTF-8" });
    data.split(os.EOL).forEach(line => {
      let match = regex.exec(line);
      while(match !== null){
        let provide = match[1];
        map[provide] = filepath.replace(/\\/g, "\\\\");
        match = regex.exec(line);
      }
    });

    callback();
  }

  collect(){
    this.provides = {};

    this.roots.forEach(root => walker.walkSync(root, this.walkOptions));

    return this.provides;
  }
}

module.exports = ProvideCollector;
