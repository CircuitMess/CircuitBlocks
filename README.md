# CircuitBlocks

<img src="https://www.circuitmess.com/wp-content/uploads/CB-Cover-e1572298172355.png">

A graphical programming interface that helps newbies get into embedded programming. Based on Microsoft's [MakeCode](https://github.com/microsoft/pxt), [PXT-Blockly](https://github.com/microsoft/pxt-blockly) (Google Blockly fork), and carlosperate's [Ardublockly](https://github.com/carlosperate/ardublockly).

When first started, the app will try to identify an already existing Arduino installation. If one isn't found it will download and install the Arduino IDE along with all the required drivers and libraries required for the CircuitMess Ringo board.

## Running a dev environtment

Clone the repository, install all core and client dependencies and run with yarn:

```shell script
git clone https://github.com/CircuitMess/CircuitBlocks.git
cd CircuitBlocks/client
yarn
cd ..
yarn
yarn dev
```

It is recommended to compile native dependencies using gcc version 7 as we were unable to compile them using newer versions. Specifying which gcc and g++ binaries yarn should use to compile native dependencies can be done by modifying the ```rebuild-electron``` script in package.json like this:

```json
"scripts": {
  "rebuild-electron": "CC=/usr/bin/gcc-7 CXX=/usr/bin/g++-7 yarn electron-rebuild",
  ...
}
```
Remove the CC and CXX variables to use the system default binaries.

The frontend client and electron backend can also be started separately. To start the client run ```yarn dev``` in the client directory, and to start the electron server, run ```yarn electron-start``` in the root directory of the repository.

## Building

The app is packaged using electron-builder. To package it, you first need to build the frontend and electron backend with ```yarn build```. Then you can package it with ```yarn dist```:

```shell script
cd client
yarn build
cd ..
yarn build
yarn dist
```

This will produce the binaries for your platform in the dist directroy.

## Meta


<img src="https://www.circuitmess.com/wp-content/uploads/CM-Meta-BlackHQ2.png">


**CircuitMess** - https://www.circuitmess.com/ - @circuitmess.com

**Facebook** - https://www.facebook.com/makerbuino/

**Instagram** - https://www.instagram.com/thecircuitmess/

**Twitter** - https://twitter.com/circuitmess 

**YouTube** - https://www.youtube.com/channel/UCVUvt1CeoZpCSnwg3oBMsOQ

Copyright © 2019 CircuitMess

Licensed under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)

