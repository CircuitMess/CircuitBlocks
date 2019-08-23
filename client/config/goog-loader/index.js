const path = require("path");
const paths = require("../paths");
const ProvideCollector = require("./provideCollector");

const sources = [
  path.join(paths.appSrc, "blockly")
];

let provideMap = [];
(function collectProvides(){
  let collector = new ProvideCollector(sources);
  provideMap = collector.collect();
})();

const googRegex = new RegExp("\\s*goog\\.(provide|require)\\(\\s*[\"'](.*)[\"']\\s*\\)");
const googLibRegex = new RegExp(".*goog\\..*", "g");
const dotRegex = new RegExp("\\.", "g");
const strictRegex = new RegExp("\\s*[\"']use strict[\"'].*", "g");

let output = "";
function appendLine(line){
  output += line + "\n";
}
function append(code){
  if(Array.isArray(code)){
    code.forEach(appendLine);
  }else{
    appendLine(code);
  }
}

const googs = { provide: gProvide, require: gRequire };

let libIncluded = false;

function processLine(line){
  if(line.match(strictRegex) !== null) return;

  let result = line.match(googRegex);

  if(line.startsWith("//") || result === null){
    append(line);
    return;
  }

  let goog = result[1];
  let module = result[2];

  if(googs.hasOwnProperty(goog)){
    googs[goog](module); // Yay for overcomplicating things ;)
  }else{
    append(line);
  }
}

let provides = [];
function gProvide(module){
  provides.push(module);
  buildup(module).forEach(object => append(optionalObject(object)));
  append(optionalObject(module));
}

function gRequire(module){
  let basename = module.split(".")[0];
  if(basename === "goog") return;

  let file = (typeof provideMap[module] === "undefined") ? module : provideMap[module];
  let imp = "require('" + file + "')";
  append("var " + basename + " = typeof " + basename + " === 'undefined' ? " + imp + " : Object.assign(" + basename + ", " + imp + ");");
}

function printProvides(){
  if(provides.length === 0) return;

  let mapped = [];

  provides.forEach(provide => {
    let renamed = rename(provide);
    mapped.push(renamed + ": " + provide);
  });

  //append("module.exports = { " + mapped.join(", ") + " }");
  append("module.exports = " + provides[0].split(".")[0] + ";");
}

function rename(module){
  return module.replace(dotRegex, "___");
}

function optionalObject(object){
  let addVar = object.split(".").length === 1;

  return (addVar ? "var " : "") + object + " = typeof " + object + " === 'undefined' ? {} : " + object + ";";
}

function buildup(namespace){
  let objects = [];

  let parts = namespace.split(".");

  for(let i = 0; i < parts.length-1; i++){
    let upTo = parts.slice(0, i+1);
    objects.push(upTo.join("."));
  }

  return objects;
}

function init(){
  output = "";
  provides = [];
  libIncluded = false;
}

module.exports = function(content, map, meta) {

  return function(source){
    init();

    source.split("\n").forEach(processLine);
    printProvides();

    return output;
  }(content);
};
