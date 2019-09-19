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
serial.write('foo');

const code = `#include <MAKERphone.h>

  MAKERphone mp;
  
  void setup() {
    mp.begin(0);
  }
  
  void loop() {
    mp.popup("Foobar", 100);
    delay(1000);
  
  }`;

ArduinoCompiler.compile(code).then(
  (data) => {
    console.log(`Binary: ${data.binary}`);
    console.log(data.status.join('\n'));
    ArduinoCompiler.stopDaemon();

    ArduinoCompiler.identifyPort()
      .then((ports) => {
        console.log(ports);

        if (ports.length === 0) {
          console.log('No port found');
          return;
        }

        // ArduinoCompiler.upload(data.binary, ports[0].comName);
      })
      .catch((_reason) => {
        console.log('Upload failed');
      });
  },
  (error) => {
    console.log(error.message);
    console.log(error.error);
  }
);

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
