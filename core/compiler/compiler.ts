import * as SerialPort from 'serialport';
import * as childProcess from 'child_process';
import * as grpc from 'grpc';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

import { BuilderClient } from '../proto/builder_grpc_pb';
import { BuildParams } from '../proto/builder_pb';
import Serial from './serial';

export interface PortDescriptor {
  manufacturer: string;
  serialNumber: string;
  pnpId: string;
  locationId: string;
  vendorId: string;
  productId: string;
  comName: string;
}

export default class ArduinoCompiler {
  private static client = new BuilderClient('localhost:12345', grpc.credentials.createInsecure());
  private static process: childProcess.ChildProcess;

  private static readonly CB_TMP: string = path.join(os.tmpdir(), 'circuitblocks');
  private static ARDUINO_INSTALL: string = '';
  private static ARDUINO_HOME: string = '';
  private static ARDUINO_LOCAL: string = '';

  private static serial: Serial | undefined;
  private static uploading: boolean = false;

  public static getSerial(): Serial {
    if (this.serial === undefined) {
      this.serial = new Serial();
    }

    return this.serial;
  }

  public static canSerialCom(): boolean {
    return !this.uploading;
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

  /**
   * Starts the builder daemon. Rejects if the builder couldn't be found or paths haven't been set up.
   */
  public static startDaemon(): Promise<null> {
    return new Promise<null>((resolve, reject) => {
      if (this.ARDUINO_LOCAL === '') {
        reject(new Error('Pahts not set up'));
        return;
      }

      const builderPath = path.join(this.ARDUINO_INSTALL, 'arduino-builder');

      if (!fs.existsSync(builderPath)) {
        reject(new Error('Builder not found'));
        return;
      }

      this.process = childProcess.execFile(builderPath, ['--daemon']);

      resolve();
    });
  }

  /**
   * Stops the builder daemon.
   */
  public static stopDaemon() {
    this.process.kill();
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
   * Uploads the specified binary to the MAKERphone
   * @param binary Path to the binary
   * @param port MAKERphone port
   */
  public static upload(binary: string, port: string) {
    if (this.serial) this.serial.stop();
    this.uploading = true;

    const CM_LOCAL: string = path.join(this.ARDUINO_LOCAL, 'packages', 'cm');

    const win = os.type() === 'Windows_NT';
    const TOOL = path.join(
      CM_LOCAL,
      'tools',
      'esptool_py',
      '2.6.1',
      'esptool.' + (win ? 'exe' : 'py')
    );

    const binaryPath = path.parse(binary);

    const options: string[] = [
      TOOL,
      '--chip esp32',
      '--port ' + port,
      '--baud 921600',
      '--before default_reset',
      '--after hard_reset',
      'write_flash',
      '-z',
      '--flash_mode dio',
      '--flash_freq 80m',
      '--flash_size detect',
      '0xe000 ' +
        path.join(CM_LOCAL, 'hardware', 'esp32', '1.0.0', 'tools', 'partitions', 'boot_app0.bin'),
      '0x1000 ' +
        path.join(
          CM_LOCAL,
          'hardware',
          'esp32',
          '1.0.0',
          'tools',
          'sdk',
          'bin',
          'bootloader_dio_80m.bin'
        ),
      '0x10000 ' + binary,
      '0x8000 ' + path.join(binaryPath.dir, binaryPath.name + '.partitions.bin')
    ];

    if (!win) options.unshift('python');
    childProcess.execSync(options.join(' '));

    this.uploading = false;
    if (this.serial) this.serial.start();
  }

  /**
   * Compiles the specified Arduino C code. See {@link compileSketch} for details on returned promise
   * @see compileSketch
   * @param code Arduino C code
   */
  public static compile(code: string): Promise<{ binary: string; status: string[] }> {
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
   * { binary: path to the compiled binary, status: array of status strings returned by the compiler }
   *
   * On error rejects with the following object:
   * { message: a short error message, error: the error object returned by the compiler }
   *
   * On compilation error, the rejected object will have code 2. On resolution and rejection due to compiler errors,
   * the returned object will have the property 'output' which is an array of strings outputted by the copiler.
   *
   * @param sketchPath Absolute path to the sketch to be compiled.
   */
  public static compileSketch(
    sketchPath: string
  ): Promise<{ binary: string; status: string[]; output: string[] }> {
    const sketchName = path.parse(sketchPath).base;
    const compiledPath: string = path.join(this.CB_TMP, 'build', sketchName + '.bin');

    return new Promise((resolve, reject) => {
      if (this.ARDUINO_LOCAL === '')
        reject(new Error('Arduino directories not set up. Run the setup method first'));

      const stream = this.client.build(this.buildParams(sketchPath), (err, _response) => {
        if (err) reject(err);
      });

      const status: string[] = [];
      const output: string[] = [];
      let fulfilled = false;
      let error: any;

      this.process.stderr.on('data', (data) => {
        output.push(data);
      });

      stream.on('error', (data) => {
        error = data;
      });

      stream.on('data', (data) => {
        status.push(data.array);
      });

      stream.on('end', () => {
        if (fulfilled) return;
        fulfilled = true;

        error.output = output;
        reject(error);
      });

      stream.on('status', (data) => {
        fulfilled = true;

        if (data.code === 0) {
          resolve({ binary: compiledPath, status, output });
        } else {
          error.output = output;
          reject(error);
        }
      });
    });
  }

  private static buildParams(sketchPath: string): BuildParams {
    const buildParams: BuildParams = new BuildParams();

    const CM_LOCAL: string = path.join(this.ARDUINO_LOCAL, 'packages', 'cm');

    buildParams.setSketchlocation(sketchPath);
    buildParams.setBuildpath(path.join(this.CB_TMP, 'build'));
    buildParams.setBuildcachepath(path.join(this.CB_TMP, 'cache'));

    buildParams.setHardwarefolders(
      [path.join(this.ARDUINO_INSTALL, 'hardware'), path.join(this.ARDUINO_LOCAL, 'packages')].join(
        ','
      )
    );

    buildParams.setToolsfolders(
      [
        path.join(this.ARDUINO_INSTALL, 'tools-builder'),
        path.join(this.ARDUINO_INSTALL, 'hardware', 'tools', 'avr'),
        path.join(this.ARDUINO_LOCAL, 'packages')
      ].join(',')
    );

    buildParams.setBuiltinlibrariesfolders(path.join(this.ARDUINO_INSTALL, 'libraries'));
    buildParams.setOtherlibrariesfolders(path.join(this.ARDUINO_HOME, 'libraries'));

    buildParams.setCustombuildproperties(
      [
        'runtime.tools.mkspiffs.path=' + path.join(CM_LOCAL, 'tools', 'mkdpiffs', '0.2.3'),
        'runtime.tools.mkspiffs-0.2.3.path=' + path.join(CM_LOCAL, 'tools', 'mkdpiffs', '0.2.3'),
        'runtime.tools.xtensa-esp32-elf-gcc.path=' +
          path.join(CM_LOCAL, 'tools', 'xtensa-esp32-elf-gcc', '1.22.0-80-g6c4433a-5.2.0'),
        'runtime.tools.xtensa-esp32-elf-gcc-1.22.0-80-g6c4433a-5.2.0.path=' +
          path.join(CM_LOCAL, 'tools', 'xtensa-esp32-elf-gcc', '1.22.0-80-g6c4433a-5.2.0'),
        'runtime.tools.esptool_py.path=' + path.join(CM_LOCAL, 'tools', 'esptool_py', '2.6.1'),
        'runtime.tools.esptool_py-2.6.1.path=' + path.join(CM_LOCAL, 'tools', 'esptool_py', '2.6.1')
      ].join(',')
    );
    buildParams.setArduinoapiversion('10809');
    buildParams.setFqbn(
      'cm:esp32:ringo:PartitionScheme=min_spiffs,FlashFreq=80,UploadSpeed=921600,DebugLevel=none'
    );

    return buildParams;
  }
}
