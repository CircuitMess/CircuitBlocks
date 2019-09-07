import {ArduinoCompiler} from "./compiler";

ArduinoCompiler.setup("/home/cm/Downloads/arduino-1.8.9", "/home/cm/Arduino");


ArduinoCompiler.compile("test.ino").then(data => {
    console.log("Binary: " + data.binary);
    console.log(data.status.join("\n"));
}, error => {
    console.log(error.message);
    console.log(error.error);
});