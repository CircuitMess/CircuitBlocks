import {ArduinoCompiler} from "./compiler";

ArduinoCompiler.setup("/home/cm/Downloads/arduino-1.8.9", "/home/cm/Arduino", "/home/cm/.arduino15");

ArduinoCompiler.startDaemon();

const code = "#include <MAKERphone.h>\n\nvoid setup(){}\nvoid loop(){}";

ArduinoCompiler.compile(code).then(data => {
    console.log("Binary: " + data.binary);
    console.log(data.status.join("\n"));
    ArduinoCompiler.stopDaemon();
}, error => {
    console.log(error.message);
    console.log(error.error);
});