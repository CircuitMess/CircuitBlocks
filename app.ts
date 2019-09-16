// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';

import { load, save, listFiles } from './core/files';
import ArduinoCompiler from './core/compiler/compiler';

const reactUrl = (process.env.ELECTRON_ENV === "development") ? 'http://localhost:3000' : null;

let win: BrowserWindow;

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
  win.webContents.openDevTools();

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

// TODO: Add env variables
const username = process.env.USER;

ArduinoCompiler.setup(
  `/home/${username}/installs/arduino-1.8.9`,
  `/home/${username}/Arduino`,
  `/home/${username}/.arduino15`
);

ArduinoCompiler.startDaemon();

let port: any;

ipcMain.on('ports', (event, _args) => {
  ArduinoCompiler.identifyPort(true)
    .then((data) => {
      if (data.length === 0) {
        const res = { error: { type: 'NO_DEVICES' } };

        console.log(res);
        event.reply('ports', res);
      } else {
        const res = { error: null, data };
        port = data[0].comName;

        console.log(res.data.map((item) => item.comName));
        event.reply('ports', res);
      }
    })
    .catch((error) => {
      console.error(error);
      event.reply('ports', { error });
    });
});

ipcMain.on('upload', (event, args) => {
  const { code } = args;

  console.log('Compiling code');

  ArduinoCompiler.compile(code)
    .then(({ binary }) => {
      console.log(`Uploading to ${port}`);
      try {
        ArduinoCompiler.upload(binary, port);
        event.reply('upload', { error: null, data: { type: 'DONE' } });
      } catch (error) {
        console.error(error);
        event.reply({ error });
      }
    })
    .catch((error) => console.error(error));
});
