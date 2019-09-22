import * as SerialPort from 'serialport';
import * as childProcess from 'child_process';
import * as grpc from 'grpc';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as yaml from "js-yaml";

import Serial from './serial';
import {ArduinoCoreClient} from "../grpc/commands_grpc_pb";
import {CompileReq, CompileResp} from "../grpc/compile_pb";
import {Configuration, InitReq, VersionReq} from "../grpc/commands_pb";
import {Instance} from "../grpc/common_pb";
import {UploadReq, UploadResp} from "../grpc/upload_pb";

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
  arduino: string | null,
  cli: string | null,

  sketchbook: string | null,
  local: string | null
}

export default class ArduinoCompiler {
  private static client = new ArduinoCoreClient('localhost:50051', grpc.credentials.createInsecure());
  private static process: childProcess.ChildProcess;
  private static instance: Instance;

  private static readonly CB_TMP: string = path.join(os.tmpdir(), 'circuitblocks');
  private static ARDUINO_INSTALL: string = '';
  private static ARDUINO_HOME: string = '';
  private static ARDUINO_LOCAL: string = '';

  private static serial: Serial;
  private static installInfo: InstallInfo;

  public static getDirectories(){
    return {
      install: this.ARDUINO_INSTALL,
      home: this.ARDUINO_HOME,
      local: this.ARDUINO_LOCAL
    };
  }

  public static getSerial(){
    if(this.serial == undefined){
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
    let local: string;

    if(os.type() === "Windows_NT"){
      local = path.join(os.homedir(), "AppData", "Local", "Arduino15");

      if(!fs.existsSync(local)){
        local = path.join(os.homedir(), "AppData", "Roaming", "Arduino15");
      }
    }else if(os.type() === "Linux"){
      local = path.join(os.homedir(), ".arduino15");
    }else if(os.type() === "Darwin"){
      local = path.join(os.homedir(), "Library", "Arduino15");
    }else{
      return null;
    }

    if(!fs.existsSync(local)){
      return null;
    }

    let info: InstallInfo = { arduino: null, cli: null, sketchbook: null, local: local };

    const prefPath = path.join(local, "preferences.txt");
    const configPath = path.join(local, "arduino-cli.yaml");

    if(fs.existsSync(prefPath)){
      const preferences = this.parsePreferences(prefPath);

      if(preferences != null){
        info.arduino = preferences.arduino;
        info.sketchbook = preferences.sketchbook;
      }
    }

    if(fs.existsSync(configPath)){
      const config = yaml.safeLoad(fs.readFileSync(configPath));

      info.local = config.arduino_data;
      info.sketchbook = config.sketchbook_path;
    }

    const installPath = path.join(local, "..", os.type() == "Windows_NT" ? "Arduino" : ".arduino");

    if(!fs.existsSync(installPath)){
      return info;
    }

    const cliPath = path.join(installPath, "arduino-cli" + (os.type() == "Windows_NT" ? ".exe" : ""));
    if(fs.existsSync(cliPath)){
      info.cli = installPath;
    }

    if(info.arduino == null){
      let install: { version: string, path: string } | null = null;

      fs.readdirSync(installPath).forEach(file => {
        const arduinoPath = path.join(installPath, file);
        if(!fs.statSync(arduinoPath).isDirectory()) return;
        if(!file.startsWith("arduino-")) return;
        const version = file.substring(8);

        if(install == null || this.isNewer(version, install.version)){
          install = { version, path: arduinoPath };
        }
      });

      info.arduino = install.path;
    }

    this.installInfo = info;
    return info;
  }

  private static parsePreferences(prefPath): { arduino: string, sketchbook: string } | null {
    const preferences = fs.readFileSync(prefPath).toString().split(os.EOL);

    let home: string = "";
    const installs: any = {};
    preferences.forEach(line => {
      const parts = line.split("=");
      const prop = parts[0];
      const val = parts[1];

      if(prop === "sketchbook.path"){
        home = val;
      }else if(prop.startsWith("last.ide") && prop.endsWith(".hardwarepath")){
        let version = prop.substring(9, prop.length - 13);
        installs[version] = val.substring(0, val.length - 9);
      }
    });

    if(installs === {}) return null;
    const versions = Object.keys(installs);
    let newest = versions[0];
    for(let i = 1; i < versions.length; i++){
      if(this.isNewer(versions[i], newest)) newest = versions[i];
    }

    return { arduino: installs[newest], sketchbook: home };
  }

  private static isNewer(newer: string, older: string): boolean {
    const partsNewer = newer.split(".");
    const partsOlder = newer.split(".");

    for(let i = 0; i < partsNewer.length; i++){
      if(parseInt(partsNewer[i]) > parseInt(partsOlder[i])) return true;
    }

    return false;
  }

  /**
   * Starts the builder daemon. Rejects if the builder couldn't be found or paths haven't been set up.
   */
  public static startDaemon(): Promise<null> {
    return new Promise<null>((resolve, reject) => {
      if (this.installInfo.cli == null) {
        reject(new Error('Paths not set up'));
        return;
      }

      let cliPath = path.join(this.installInfo.cli, 'arduino-cli' + (os.type() == "Windows_NT" ? ".exe" : ""));
      if (!fs.existsSync(cliPath)) {
        reject(new Error('CLI not found'));
        return;
      }

      this.process = childProcess.execFile(cliPath, ['daemon']);

      const req = new InitReq();
      req.setLibraryManagerOnly(false);
      const conf = new Configuration();
      conf.setBoardmanageradditionalurlsList([ "https://raw.githubusercontent.com/CircuitMess/MAKERphone/boardArduino/package_CircuitMess_Ringo_index.json" ]);
      conf.setDatadir(this.installInfo.local);
      conf.setSketchbookdir(this.installInfo.sketchbook);
      req.setConfiguration(conf);

      this.client.init(req)
          .on("data", data => {
            this.instance = new Instance();
            this.instance.setId(data.array[0][0]);
          })
          .on("end", data => resolve());
    });
  }

  /**
   * Stops the builder daemon.
   */
  public static stopDaemon() {
    this.process.kill();
    this.instance = undefined;
  }

  /**
   * Retrieves the possible MAKERphone ports.
   * @param thirdParty accept any usb to serial
   */
  public static identifyPort(thirdParty: boolean = false): Promise<PortDescriptor[]> {
    return new Promise<any>((resolve, _reject) => {
      SerialPort.list((err, ports) => {
        resolve(
          ports.filter((port) =>
            thirdParty
              ? port.vendorId && port.productId
              : port.vendorId === '10c4' && port.productId === 'ea60'
          )
        );
      });
    });
  }

  /**
   * Compiles the specified Arduino C code. See {@link compileSketch} for details on returned promise
   * @see compileSketch
   * @param code Arduino C code
   */
  public static compile(code: string): Promise<{ binary: string; stdout: string[], stderr: string[] }> {
    const sketchDir = path.join(this.CB_TMP, 'sketch');
    const sketchPath = path.join(sketchDir, 'sketch.ino');
    if (!fs.existsSync(sketchDir)) fs.mkdirSync(sketchDir, { recursive: true });
    fs.writeFileSync(sketchPath, code);

    return this.compileSketch(sketchPath);
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
   */
  public static compileSketch(sketchPath: string): Promise<{ binary: string; stdout: string[], stderr: string[] }> {
    const pathParsed = path.parse(sketchPath);
    const sketchName = pathParsed.name;
    const sketchDir = pathParsed.dir;

    const buildPath = path.join(this.CB_TMP, "build", sketchName);
    const cachePath = path.join(this.CB_TMP, "cache");
    const compiledPath: string = path.join(buildPath, sketchName + ".ino.bin");

    if(!fs.existsSync(buildPath)) fs.mkdirSync(buildPath, { recursive: true });
    if(!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });

    return new Promise((resolve, reject) => {
      if(this.instance == undefined){
        reject(new Error("Daemon not started"));
        return;
      }


      const req = new CompileReq();
      req.setInstance(this.instance);
      req.setSketchpath(sketchDir);
      req.setBuildcachepath(cachePath);
      req.setBuildpath(buildPath);
      req.setFqbn("cm:esp32:ringo");
      req.setExportfile(path.join(buildPath, "export"));

      const stream = this.client.compile(req);

      const stdout: string[] = [];
      const stderr: string[] = [];
      let fulfilled = false;
      let error: any;
      const decoder = new TextDecoder("utf-8");

      stream.on('error', (data) => {
        error = data;
      });

      stream.on('data', (data: CompileResp) => {
        function write(what: Uint8Array | string, where: string[]){
          if(what instanceof Uint8Array){
            what = decoder.decode(what);
          }

          where.push(what);
        }

        if(data.getOutStream().length != 0){
          write(data.getOutStream(), stdout);
        }else{
          write(data.getErrStream(), stderr);
        }
      });

      stream.on('end', () => {
        if (fulfilled) return;
        fulfilled = true;

        error.stderr = stderr;
        reject(error);
      });

      stream.on('status', (data) => {
        fulfilled = true;

        if (data.code === 0) {
          resolve({ binary: compiledPath, stdout, stderr });
        } else {
          error.stderr = stderr;
          reject(error);
        }
      });
    });
  }

  public static uploadBinary(binary: string, port: string): Promise<null> {
    return new Promise<null>((resolve, reject) => {
      if(!fs.existsSync(binary)){
        reject(new Error("Binary doesn't exist"));
        return;
      }

      const req = new UploadReq();
      req.setInstance(this.instance);
      req.setFqbn("cm:esp32:ringo");
      req.setImportFile(binary);
      req.setSketchPath(binary);
      req.setPort(port);

      const stream = this.client.upload(req);

      const stdout: string[] = [];
      const stderr: string[] = [];
      let fulfilled = false;
      let error: any;
      const decoder = new TextDecoder("utf-8");

      stream.on('error', (data) => {
        error = data;
      });

      stream.on('data', (data: UploadResp) => {
        function write(what: Uint8Array | string, where: string[]){
          if(what instanceof Uint8Array){
            what = decoder.decode(what);
          }

          where.push(what);
        }

        if(data.getOutStream().length != 0){
          write(data.getOutStream(), stdout);
        }else{
          write(data.getErrStream(), stderr);
        }
      });

      stream.on('end', () => {
        if (fulfilled) return;
        fulfilled = true;

        error.stderr = stderr;
        reject(error);
      });

      stream.on('status', (data) => {
        fulfilled = true;

        if (data.code === 0) {
          resolve();
        } else {
          error.stderr = stderr;
          reject(error);
        }
      });
    });
  }
}
