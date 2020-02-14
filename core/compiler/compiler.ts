import * as SerialPort from 'serialport';
import * as childProcess from 'child_process';
import * as grpc from 'grpc';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import Serial from './serial';
import { ArduinoCoreClient } from '../grpc/commands_grpc_pb';
import { CompileReq, CompileResp } from '../grpc/compile_pb';
import { Configuration, InitReq, VersionReq } from '../grpc/commands_pb';
import { Instance } from '../grpc/common_pb';
import { UploadReq, UploadResp } from '../grpc/upload_pb';
import { rejects } from 'assert';
import * as util from "./util";
import logger from "../files/logger";

export interface PortDescriptor {
  manufacturer: string;
  serialNumber: string;
  pnpId: string;
  locationId: string;
  vendorId: string;
  productId: string;
  comName: string;
}

export interface InstallInfo {
  arduino: string | null;
  cli: string | null;

  sketchbook: string | null;
  local: string | null;
}

export default class ArduinoCompiler {
  private static client = new ArduinoCoreClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
  private static process: childProcess.ChildProcess;
  private static instance: Instance;

  private static readonly CB_TMP: string = path.join(os.tmpdir(), 'circuitblocks' + (os.type() != "Windows_NT" ? "-proj-" + os.userInfo().username : ""));
  private static ARDUINO_INSTALL: string = '';
  private static ARDUINO_HOME: string = '';
  private static ARDUINO_LOCAL: string = '';

  private static serial: Serial;
  private static installInfo: InstallInfo;

  private static daemonConnecting: boolean = false;

  public static getInstallInfo(){
    return ArduinoCompiler.installInfo;
  }

  public static getDaemon(): { connected: boolean, connecting: boolean }{
    return {
      connecting: this.daemonConnecting,
      connected: this.instance != undefined
    };
  }

  public static getDirectories() {
    return {
      install: this.ARDUINO_INSTALL,
      home: this.ARDUINO_HOME,
      local: this.ARDUINO_LOCAL
    };
  }

  public static getSerial() {
    if (this.serial === undefined) {
      this.serial = new Serial();
    }

    return this.serial;
  }

  /**
   * Sets the relevant Arduino directories.
   * @param install Arduino install directory. Contains directories "hardware", "tools", "tools-builder", etc.
   * @param home Arduino home directory. Usually in the user's My Documents. Usually contains directories "libraries"
   * @param local Arduino local directory
   * and "sketches".
   */
  public static setup(install: string, home: string, local: string) {
    this.ARDUINO_INSTALL = install;
    this.ARDUINO_HOME = home;
    this.ARDUINO_LOCAL = local;
  }

  public static checkInstall(): InstallInfo | null {
    let home: string;
    if (os.type() === 'Windows_NT') {
      home = path.join(os.homedir(), 'AppData', 'Local');
    } else if (os.type() === 'Linux') {
      home = os.homedir();
    } else if (os.type() === 'Darwin') {
      home = os.homedir();
    } else {
      return null;
    }

    const installPath = path.join(home, os.type() == 'Windows_NT' ? 'ArduinoCLI' : '.arduino');
    let info: InstallInfo = { arduino: null, cli: null, sketchbook: null, local: null };

    if(os.type() == "Darwin"){
      let install = path.join("/Applications", "Arduino.app");

      if(fs.existsSync(install)){
        info.arduino = install;
      }
    } else if(os.type() == "Windows_NT"){
      let install = path.join("C:", "Program Files (x86)", "Arduino");

      if(fs.existsSync(path.join(install, "arduino.exe"))){
        info.arduino = install;
      }else{
        install = path.join("C:", "Program Files", "Arduino");

        if(fs.existsSync(path.join(install, "arduino.exe"))) {
          info.arduino = install;
        }
      }
    }

    let local: string;
    if (os.type() === 'Windows_NT') {
      local = path.join(os.homedir(), 'AppData', 'Local', 'Arduino15');

      if (!fs.existsSync(local)) {
        local = path.join(os.homedir(), 'AppData', 'Roaming', 'Arduino15');
      }
    } else if (os.type() === 'Linux') {
      local = path.join(os.homedir(), '.arduino15');
    } else if (os.type() === 'Darwin') {
      local = path.join(os.homedir(), 'Library', 'Arduino15');
    } else {
      return info;
    }

    if (!fs.existsSync(local)) {
      return info;
    }

    const prefPath = path.join(local, 'preferences.txt');
    const configPath = path.join(local, 'arduino-cli.yaml');

    if (fs.existsSync(prefPath)) {
      const preferences = this.parsePreferences(prefPath);

      if (preferences != null) {
        if(preferences.arduino && fs.existsSync(preferences.arduino)){
          info.arduino = preferences.arduino;
        }
        info.sketchbook = preferences.sketchbook;
      }
    }

    if (fs.existsSync(configPath)) {
      const config = yaml.safeLoad(fs.readFileSync(configPath));

      info.local = config.arduino_data;
      info.sketchbook = config.sketchbook_path;

      if(config.directories && config.directories.user){
        info.local = config.directories.data;
        info.sketchbook = config.directories.user;
      }
    }

    if (!fs.existsSync(installPath)) {
      return info;
    }

    const cliPath = path.join(
      installPath,
      'arduino-cli' + (os.type() == 'Windows_NT' ? '.exe' : '')
    );
    if (fs.existsSync(cliPath)) {
      info.cli = installPath;
    }

    if (info.arduino == null) {
      let install: { version: string; path: string } | null = null;

      fs.readdirSync(installPath).forEach((file) => {
        const arduinoPath = path.join(installPath, file);
        if (!fs.statSync(arduinoPath).isDirectory()) return;
        if (!file.startsWith('arduino-')) return;
        const version = file.substring(8);

        if (install == null || util.isNewer(version, install.version)) {
          install = { version, path: arduinoPath };
        }
      });

      if(install){
        info.arduino = install.path;
      }
    }

    this.installInfo = info;
    return info;
  }

  private static parsePreferences(prefPath): { arduino: string; sketchbook: string } | null {
    const preferences = fs
      .readFileSync(prefPath)
      .toString()
      .split(os.EOL);

    let home: string = '';
    const installs: any = {};
    preferences.forEach((line) => {
      const parts = line.split('=');
      const prop = parts[0];
      const val = parts[1];

      if (prop === 'sketchbook.path') {
        home = val;
      } else if (prop.startsWith('last.ide') && prop.endsWith('.hardwarepath')) {
        let version = prop.substring(9, prop.length - 13);
        const versionPath = val.substring(0, val.length - 9);

        if(fs.existsSync(versionPath)){
          installs[version] = versionPath;
        }
      }
    });

    if (installs === {}) return null;
    const versions = Object.keys(installs);
    let newest = versions[0];
    for (let i = 1; i < versions.length; i++) {
      if (util.isNewer(versions[i], newest)) newest = versions[i];
    }

    return { arduino: installs[newest], sketchbook: home };
  }

  /**
   * Starts the builder daemon. Rejects if the builder couldn't be found or paths haven't been set up.
   */
  public static startDaemon(): Promise<null> {
    return new Promise<null>((resolve, reject) => {
      if (this.installInfo == null || this.installInfo.cli == null) {
        reject(new Error('Paths not set up'));
        return;
      }

      this.daemonConnecting = true;

      let cliPath = path.join(
        this.installInfo.cli,
        'arduino-cli' + (os.type() == 'Windows_NT' ? '.exe' : '')
      );
      if (!fs.existsSync(cliPath)) {
        reject(new Error('CLI not found'));
        return;
      }

      this.process = childProcess.execFile(cliPath, ['daemon']);

      const req = new InitReq();
      req.setLibraryManagerOnly(false);
      const conf = new Configuration();
      conf.setBoardmanageradditionalurlsList([
        'https://raw.githubusercontent.com/CircuitMess/MAKERphone/boardArduino/package_CircuitMess_Ringo_index.json'
      ]);
      conf.setDatadir(this.installInfo.local);
      conf.setSketchbookdir(this.installInfo.sketchbook);
      req.setConfiguration(conf);

      const context = this;
      let tries = 0;
      let restarted = false;

      function connect(){
        if (tries > 2 && restarted) {
          context.daemonConnecting = false;
          reject(new Error('Unable to connect to CLI. Please restart the program.'));
          return;
        }

        tries++;
        logger.log("Connecting to daemon, try " + tries);
        console.log("Connecting to daemon, try " + tries);

        function onErr(){
          if(tries > 2 && !restarted){
            restarted = true;
            tries = 0;

            logger.log("Reached 6 tries, restarting daemon");

            context.stopDaemon();
            context.process = childProcess.execFile(cliPath, ['daemon']);
          }

          setTimeout(connect, 2000);
        }

        try {
          context.client
              .init(req)
              .on('data', (data) => {
                context.instance = new Instance();
                context.instance.setId(data.array[0][0]);
                context.daemonConnecting = false;
              })
              .on('error', error => {
                logger.log("Daemon race condition", error);
                console.log("race condition");
                onErr();
              })
              .on('end', (data) => resolve());
        }catch(e){
          onErr();
        }
      }

      connect();
    });
  }

  /**
   * Stops the builder daemon.
   */
  public static stopDaemon(toBeReconnected?: boolean) {
    if(this.process) this.process.kill();
    this.instance = undefined;

    if(toBeReconnected){
      this.daemonConnecting = true;
    }else{
      this.daemonConnecting = false;
    }
  }

  /**
   * Retrieves the possible MAKERphone ports.
   * @param thirdParty accept any usb to serial
   */
  public static identifyPort(thirdParty: boolean = false): Promise<PortDescriptor[]> {
    return new Promise<any>((resolve, _reject) => {
      SerialPort.list((err, ports) => {
        if(err){
          _reject(err);
          return;
        }

        resolve(
          ports.filter((port) =>
            thirdParty
              ? port.vendorId && port.productId
              : port.vendorId && port.productId && port.vendorId.toLowerCase() === '10c4' && port.productId.toLowerCase() === 'ea60'
          )
        );
      });
    });
  }

  /**
   * Compiles the specified Arduino C code. See {@link compileSketch} for details on returned promise
   * @see compileSketch
   * @param code Arduino C code
   * @param progressCallback callback for progress reporting. Takes a single argument which represents percentage (0-100)
   */
  public static compile(
    code: string,
    progressCallback?: (number) => void
  ): Promise<{ binary: string; stdout: string[]; stderr: string[] }> {
    const sketchDir = path.join(this.CB_TMP, 'sketch');
    const sketchPath = path.join(sketchDir, 'sketch.ino');
    if (!fs.existsSync(sketchDir)) fs.mkdirSync(sketchDir, { recursive: true });
    fs.writeFileSync(sketchPath, code);

    return this.compileSketch(sketchPath, progressCallback);
  }

  /**
   * Compiles the specified Arduino sketch.
   *
   * Returns a promise. On success, resolves with the following object:
   * { binary: path to the compiled binary, stdout: array of status strings returned by the compiler,
   *    stderr: array of error/warning messages returned by the compiler}
   *
   * On error rejects with an error object with an additional stderr array containing error/warning messages.
   *
   * @param sketchPath Absolute path to the sketch to be compiled.
   * @param progressCallback callback for progress reporting. Takes a single argument which represents percentage (0-100)
   */
  public static compileSketch(
    sketchPath: string,
    progressCallback?: (number) => void
  ): Promise<{ binary: string; stdout: string[]; stderr: string[] }> {
    const pathParsed = path.parse(sketchPath);
    const sketchName = pathParsed.name;
    const sketchDir = pathParsed.dir;

    const buildPath = path.join(this.CB_TMP, 'build', sketchName);
    const cachePath = path.join(this.CB_TMP, 'cache');
    const compiledPath: string = path.join(buildPath, sketchName + '.ino.bin');

    if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath, { recursive: true });
    if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });

    const time = 20; // approx. time to compile

    const promise: Promise<{ binary: string; stdout: string[]; stderr: string[] }> = new Promise((resolve, reject) => {
      if (this.instance == undefined) {
        reject(new Error('Daemon not started'));
        return;
      }

      let currentProgress = 0;
      let progPerTenthSec = 100 / (time * 10);
      let finished = false;
      let resolveObject = undefined;
      let stage = 1;
      function popProgress() {
        if (stage == 1 && currentProgress >= 80 && !finished) {
          progPerTenthSec /= 10;
          stage++;
        } else if (stage == 2 && currentProgress >= 90 && !finished) {
          progPerTenthSec /= 10;
          stage++;
        } else if (stage == 3 && currentProgress >= 95 && !finished) {
          progPerTenthSec /= 10;
          stage++;
        }

        if (currentProgress < 100) {
          currentProgress += progPerTenthSec;
          currentProgress = Math.min(currentProgress, 100);
        }
        progressCallback(currentProgress);

        if (currentProgress >= 100 && finished) {
          clearInterval(progInterval);
          resolve(resolveObject);
        }
      }

      let progInterval;
      if (progressCallback) {
        progInterval = setInterval(popProgress, 100);
      }

      const req = new CompileReq();
      req.setInstance(this.instance);
      req.setSketchpath(sketchDir);
      req.setBuildcachepath(cachePath);
      req.setBuildpath(buildPath);
      req.setFqbn('cm:esp32:ringo');
      req.setExportfile(path.join(buildPath, 'export'));
      req.setVerbose(true);

      const stream = this.client.compile(req);

      const stdout: string[] = [];
      const stderr: string[] = [];
      let fulfilled = false;
      let error: any;
      const decoder = new TextDecoder('utf-8');

      stream.on('error', (data) => {
        error = data;
      });

      stream.on('data', (data: CompileResp) => {
        function write(what: Uint8Array | string, where: string[]) {
          if (what instanceof Uint8Array) {
            what = decoder.decode(what);
          }

          where.push(what);
        }

        if (data.getOutStream().length != 0) {
          write(data.getOutStream(), stdout);
        } else {
          write(data.getErrStream(), stderr);
        }
      });

      stream.on('end', () => {
        if (fulfilled) return;
        fulfilled = true;

        error.stderr = stderr;
        error.stdout = stdout;
        if (progInterval) clearInterval(progInterval);
        reject(error);
      });

      stream.on('status', (data) => {
        fulfilled = true;

        if (data.code === 0) {
          resolveObject = { binary: compiledPath, stdout, stderr };

          if (progInterval) {
            finished = true;
            progPerTenthSec = 100 / (time * 10);

            clearInterval(progInterval);
            progInterval = setInterval(popProgress, 10);
          } else {
            resolve(resolveObject);
          }
        } else {
          error.stderr = stderr;
          error.stdout = stdout;
          if (progInterval) clearInterval(progInterval);
          reject(error);
        }
      });
    });

    promise.catch(err => {
      logger.log("CLI compile error", err);

      throw err;
    });

    return promise;
  }

  /**
   * Uploads the specified binary to the MAKERphone
   * @param binary Path to the binary
   * @param port MAKERphone port
   * @param progressCallback callback for progress reporting. Takes a single argument which represents percentage (0-100)
   */
  public static uploadBinary(
    binary: string,
    port: string,
    progressCallback?: (number) => void
  ): Promise<null> {
    const promise = new Promise<null>((resolve, reject) => {
      if (!fs.existsSync(binary)) {
        reject(new Error("Binary doesn't exist"));
        return;
      }

      const serial = this.getSerial();
      serial.stop();
      serial.setUploading(true);

      const req = new UploadReq();
      req.setInstance(this.instance);
      req.setFqbn('cm:esp32:ringo');
      req.setImportFile(binary);
      req.setSketchPath(binary);
      req.setPort(port);
      req.setVerify(true);

      const stream = this.client.upload(req);

      const stdout: string[] = [];
      const stderr: string[] = [];
      let fulfilled = false;
      let error: any;
      const decoder = new TextDecoder('utf-8');

      const progRegex = new RegExp('Writing at 0x([0-9a-f]{8})... \\((\\d+) %\\)');
      let progressStarted = false;

      stream.on('error', (data) => {
        error = data;
      });

      stream.on('data', (data: UploadResp) => {
        function write(what: Uint8Array | string, where: string[]) {
          if (what instanceof Uint8Array) {
            what = decoder.decode(what);
          }

          where.push(what);

          if (!progressCallback) return;

          const matches = progRegex.exec(what);

          if (matches) {
            if (matches[1] == '00010000') {
              progressStarted = true;
            } else if (matches[1] == '00008000') {
              progressStarted = false;
            }

            if (progressStarted) {
              const val = parseInt(matches[2]);
              progressCallback(val);

              if (val == 100) {
                progressStarted = false;
              }
            }
          }
        }

        if (data.getOutStream().length != 0) {
          write(data.getOutStream(), stdout);
        } else {
          write(data.getErrStream(), stderr);
        }
      });

      stream.on('end', () => {
        if (fulfilled) return;
        fulfilled = true;

        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
      });

      stream.on('status', (data) => {
        fulfilled = true;

        if (data.code === 0) {
          resolve();
        } else {
          error.stdout = stdout;
          error.stderr = stderr;
          reject(error);
        }
      });
    });

    promise.catch(err => {
      logger.log("CLI upload error", err);
      throw err;
    });

    promise.finally(() => { this.getSerial().setUploading(false); this.getSerial().start() });

    return promise;
  }
}
