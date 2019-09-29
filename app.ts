// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';

import { load, save, listFiles, listExamples } from './core/files';
import ArduinoCompiler, { PortDescriptor } from './core/compiler/compiler';
import Installer from './core/compiler/installer';
import arduinoInstall from "./core/files/arduinoInstall";
import {ArduinoSerial} from "./core/files/arduinoSerial";

const reactUrl = process.env.ELECTRON_ENV === 'development' ? 'http://localhost:3000' : null;
const EXAMPLES_PATH = './examples';

let win: BrowserWindow;

const arduinoSetup = new arduinoInstall();
arduinoSetup.setup();

const arduinoSerial = new ArduinoSerial();

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  arduinoSetup.setWindow(win);
  arduinoSerial.setWindow(win);

  // and load the index.html of the app.
  const startUrl =
    reactUrl ||
    url.format({
      pathname: path.join(__dirname, '../client/build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  win.loadURL(startUrl);

  // Open the DevTools.
  if (process.env.ELECTRON_ENV === 'development') {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const callback = (type, event) => {
  return (error, data) => {
    if (error === null) {
      event.reply(type, { error: null, data });
      // win.webContents.send(type, { error: null, data });
    } else {
      event.reply(type, { error });
      // win.webContents.send(type, { error });
    }
  };
};

ipcMain.on('load', (event, args) => {
  console.count('load');
  const { filename } = args;
  load(filename, callback('load', event));
});

ipcMain.on('save', (event, args) => {
  console.count('save');
  const { filename, data } = args;
  save(data, filename, callback('save', event));
});

ipcMain.on('listFiles', (event, _args) => {
  console.count('listFiles');
  listFiles(callback('listFiles', event));
});

ipcMain.on('listExamples', (event, _args) => {
  listExamples(callback('listExamples', event), EXAMPLES_PATH);
});

ipcMain.on('run', (event, args) => {
  const { code } = args;

  win.webContents.send('runprogress', { error: null, stage: 'COMPILE', progress: 0 });

  ArduinoCompiler.compile(code, progress => {
    win.webContents.send('runprogress', { error: null, stage: 'COMPILE', progress: progress });
  })
    .then(({ binary }) => {
      win.webContents.send('runprogress', { error: null, stage: 'UPLOAD', progress: 0 });
      try {
        ArduinoCompiler.uploadBinary(binary, arduinoSerial.getPort().comName, progress => {
          win.webContents.send('runprogress', { error: null, stage: 'UPLOAD', progress: progress });
        }).then(() => {
          win.webContents.send('runprogress', { error: null, stage: 'DONE' });
        });
      } catch (error) {
        console.error(error);
        win.webContents.send('runprogress', { error: "Upload error. Check your Ringo then try again.", stage: 'DONE' });
      }
    })
    .catch((error) =>{
      win.webContents.send('runprogress', { error: "Compile error. Check your code then try again.", stage: 'DONE' });

      console.error(error);
      console.log(error.stdout);
      console.log(error.stderr);
    });
});
