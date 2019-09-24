// import ArduinoCompiler, { PortDescriptor } from './compiler';
// import Installer from './installer';

// const installInfo = ArduinoCompiler.checkInstall();
// if (installInfo == null || Object.values(installInfo).indexOf(null) !== -1) {
//   console.log('Installing');
//   new Installer().install(installInfo, (stage) => console.log(stage), (err) => console.log(err));
// } else {
//   console.log('All ok');
// }

// ArduinoCompiler.startDaemon()
//   .catch((error) => console.log(error))
//   .then(() => {
//     console.log('compiling');

//     ArduinoCompiler.compileSketch('/home/cm/Arduino/sketches/test/test.ino', (prog) =>
//       console.log('compile progress: ' + prog + ' %')
//     ).then((binary) => {
//       console.log(binary);
//       ArduinoCompiler.identifyPort().then((ports: PortDescriptor[]) => {
//         if (ports.length === 0) {
//           console.log('no ports');
//           return;
//         }

//         console.log('uploading');

//         ArduinoCompiler.uploadBinary(binary.binary, ports[0].comName, (prog) =>
//           console.log('upload progress: ' + prog + ' %')
//         ).then(() => console.log('done'));
//       });
//     });
//   });

import ArduinoCompiler from './compiler';

ArduinoCompiler.setup(
  '/home/fran/installs/arduino-1.8.9',
  '/home/fran/Arduino',
  '/home/fran/.arduino15'
);

ArduinoCompiler.startDaemon();

const serial = ArduinoCompiler.getSerial();
serial.start();

serial.registerListener((line) => console.log(line));

// setInterval(() => {
//   ArduinoCompiler.identifyPort()
//     .then((ports) => {
//       console.log(ports);

//       if (ports.length === 0) {
//         console.log('No port found');
//       }
//     })
//     .catch((_reason) => {
//       console.log('Upload failed');
//     });
// }, 1000);
