import ArduinoCompiler, {PortDescriptor} from './compiler';
import Installer from "./installer";

const installInfo = ArduinoCompiler.checkInstall();
if(installInfo == null || Object.values(installInfo).indexOf(null) != -1){
    new Installer()
        .install(installInfo,
            stage => console.log(stage),
            err => console.log(err));
}

ArduinoCompiler.startDaemon()
    .catch((error) => console.log(error))
    .then(() => {
    console.log("compiling");

    ArduinoCompiler.compileSketch("/home/cm/Arduino/sketches/test/test.ino").then(binary => {
        console.log(binary);
        ArduinoCompiler.identifyPort().then((ports: PortDescriptor[]) => {
            if(ports.length == 0){
                console.log("no ports");
                return;
            }

            console.log("uploading");

            ArduinoCompiler.uploadBinary(binary.binary, ports[0].comName).then(() => console.log("done"));
        });
    }).then(console.log);
});
