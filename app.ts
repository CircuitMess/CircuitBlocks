// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';

import arduinoInstall from "./core/files/arduinoInstall";
import {ArduinoSerial} from "./core/files/arduinoSerial";
import Sketches from "./core/files/sketches";
import ArduinoCompile from "./core/files/arduinoCompile";
import ErrorReport from "./core/files/errorReport";
import messenger, {MessageType} from "./core/files/messenger";

const DEV = process.env.ELECTRON_ENV === 'development';

const reactUrl = DEV ? 'http://localhost:3000' : null;

let win: BrowserWindow;


const arduinoSetup = new arduinoInstall();
const arduinoSerial = new ArduinoSerial();
const arduinoCompile = new ArduinoCompile(arduinoSerial);
const sketches = new Sketches();
const report = new ErrorReport();

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

  win.maximize();

  if(!DEV){
    win.setMenu(null);
    win.removeMenu();
    win.setMenuBarVisibility(false);
  }

  arduinoSetup.setWindow(win);
  arduinoSerial.setWindow(win);
  arduinoCompile.setWindow(win);
  report.setWindow(win);
  messenger.setWindow(win);

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
  if (DEV) {
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
