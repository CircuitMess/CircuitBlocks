# CircuitBlocks

<img src="https://old.circuitmess.com/wp-content/uploads/CB-Cover-e1572298172355.png">

A graphical programming interface that helps newbies get into embedded programming. Based on Microsoft's [MakeCode](https://github.com/microsoft/pxt), [PXT-Blockly](https://github.com/microsoft/pxt-blockly) (Google Blockly fork), and carlosperate's [Ardublockly](https://github.com/carlosperate/ardublockly).

CircuitBlocks downloads and executables can be found [here](https://github.com/CircuitMess/CircuitBlocks/releases/).

When first started, the app will try to identify an already existing Arduino installation. If one isn't found it will download and install the Arduino IDE along with all the required drivers and libraries required for the CircuitMess Ringo board.


________________________________________________________________________________________________________________________________________

**NOTE: You can skip these steps if you just want to use CircuitBlocks. Find the installation guide and the tutorial [here](https://www.circuitmess.com/circuitblocks-tutorial/).**

## Running a dev environtment

To build the electron native modules, you will need some build tools. More info at the [nodejs/node-gyp](https://github.com/nodejs/node-gyp#installation) github repo.

Clone the repository, install all core and client dependencies, build electron native modules:

```shell script
git clone https://github.com/CircuitMess/CircuitBlocks.git
cd CircuitBlocks/client
yarn
cd ..
yarn
yarn electron-rebuild
```

And then run with ```yarn dev``` in the root directory of the repository.

The frontend server and electron backend can also be started separately. To start the server run ```yarn dev``` in the client directory, and to start the electron backend, run ```yarn electron-start``` in the root directory of the repository.

## Building

The app is packaged using electron-builder. To package it, you first need to build the frontend and electron backend with ```yarn build```. Then you can package it with ```yarn dist```:

```shell script
cd client
yarn build
cd ..
yarn build
yarn dist
```

This will produce the binaries for your platform in the dist directory.

## Issues

### ```yarn electron-rebuild``` fails

If ```electron-rebuild``` fails, you can try compiling using an older compiler version or another compiler altogether. Specifying which gcc and g++ binaries yarn should use to compile native dependencies can be done by setting the **CC** and **CXX** env variables, or by modifying the ```rebuild-electron``` script in package.json like this:

```json
"scripts": {
  "rebuild-electron": "CC=/usr/bin/gcc-7 CXX=/usr/bin/g++-7 yarn electron-rebuild",
  ...
}
```
And then using ```yarn rebuild-electron``` instead of ```electron-rebuild```.

## Meta


<img src="https://www.circuitmess.com/wp-content/uploads/CM-Meta-BlackHQ2.png">


**CircuitMess** - https://www.circuitmess.com/ - @circuitmess.com

**Facebook** - https://www.facebook.com/makerbuino/

**Instagram** - https://www.instagram.com/thecircuitmess/

**Twitter** - https://twitter.com/circuitmess 

**YouTube** - https://www.youtube.com/channel/UCVUvt1CeoZpCSnwg3oBMsOQ

Copyright © 2021 CircuitMess

Licensed under the MIT license (See LICENSE.md)

