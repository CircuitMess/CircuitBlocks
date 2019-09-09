
import {BuilderClient} from "../proto/builder_grpc_pb";
import * as grpc from "grpc";
import {BuildParams} from "../proto/builder_pb";
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as child_process from 'child_process';

export class ArduinoCompiler {

    private static client = new BuilderClient('localhost:12345', grpc.credentials.createInsecure());
    private static process: child_process.ChildProcess;

    private static readonly CB_TMP: string = path.join(os.tmpdir(), "circuitblocks");
    private static ARDUINO_INSTALL: string = "";
    private static ARDUINO_HOME: string = "";
    private static ARDUINO_LOCAL: string = "";

    /**
     * Sets the relevant Arduino directories.
     * @param install Arduino install directory. Contains directories "hardware", "tools", "tools-builder", etc.
     * @param home Arduino home directory. Usually in the user's My Documents. Usually contains directories "libraries"
     * and "sketches".
     */
    public static setup(install: string, home: string, local: string){
        this.ARDUINO_INSTALL = install;
        this.ARDUINO_HOME = home;
        this.ARDUINO_LOCAL = local;
    }

    public static startDaemon(){
        this.process = child_process.execFile(path.join(this.ARDUINO_INSTALL, "arduino-builder"), ["--daemon"]);
    }

    public static stopDaemon(){
        this.process.kill();
    }

    /**
     * Compiles the specified Arduino C code. See {@link compileSketch} for details on returned promise
     * @see compileSketch
     * @param code Arduino C code
     */
    public static compile(code: string){
        let sketchDir = path.join(this.CB_TMP, "sketch");
        let sketchPath = path.join(sketchDir, "sketch.ino");
        fs.mkdirSync(sketchDir, { recursive: true });
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
     * @param sketchPath Absolute path to the sketch to be compiled.
     */
    public static compileSketch(sketchPath: string): Promise<{ binary: string, status: string[] }> {
        const sketchName = path.parse(sketchPath).base;
        const compiledPath: string = path.join(this.CB_TMP, "build", sketchName + ".elf");

        return new Promise((resolve, reject) => {
            if(this.ARDUINO_INSTALL == "" || this.ARDUINO_HOME == "") throw new Error("Arduino directories not set up. Run the setup method first");

            let stream = this.client.build(this.buildParams(sketchPath), function(err, response){
                if(err) reject({ error: err });
            });

            let fulfilled = false;
            let status: string[] = [];
            let error: any;

            stream.on("error", data => {
                error = data;
            });

            stream.on("data", data => {
                status.push(data.array);
            });

            stream.on("end",  () => {
                if(fulfilled) return;
                fulfilled = true;

                reject(error);
            });

            stream.on("status", data => {
                fulfilled = true;

                if(data.code == 0){
                    resolve({ binary: compiledPath, status: status });
                }else{
                    reject({ message: data.details, error: error });
                }
            });
        });
    }

    private static buildParams(sketchPath: string,): BuildParams {
        const buildParams: BuildParams = new BuildParams();

        const CM_LOCAL: string = path.join(this.ARDUINO_LOCAL, "packages", "cm");

        buildParams.setSketchlocation(sketchPath);
        buildParams.setFqbn("esp32:1.0.0:ringo");
        buildParams.setBuildpath(path.join(this.CB_TMP, "build"));

        buildParams.setHardwarefolders([ path.join(this.ARDUINO_INSTALL, "hardware"), path.join(CM_LOCAL, "hardware") ].join(","));
        buildParams.setToolsfolders([ path.join(this.ARDUINO_INSTALL, "hardware", "tools"), path.join(this.ARDUINO_INSTALL, "tools"), path.join(CM_LOCAL, "tools") ].join(","));
        buildParams.setCustombuildproperties("runtime.tools.ctags.path=" + path.join(this.ARDUINO_INSTALL, "tools-builder", "ctags", "5.8-arduino11"));

        buildParams.setBuildcachepath(path.join(this.CB_TMP, "cache"));
        buildParams.setBuiltinlibrariesfolders(path.join(this.ARDUINO_INSTALL, "libraries"));
        buildParams.setOtherlibrariesfolders(path.join(this.ARDUINO_HOME, "libraries"));

        return buildParams;
    }
}