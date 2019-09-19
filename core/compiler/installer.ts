import ArduinoCompiler from "./compiler";
import * as util from "./util";
import * as fs from "fs-extra";
import * as os from "os";
import * as path from "path";
import * as child_process from "child_process";
import * as sudo_prompt from "sudo-prompt";

export default class Installer {
    private readonly PLATFORM: string;

    private readonly downloads = {
        arduino: {
            Windows_NT: "https://downloads.arduino.cc/arduino-1.8.10-windows.exe",
            Linux_x32: "https://downloads.arduino.cc/arduino-1.8.10-linux32.tar.xz",
            Linux_x64: "https://downloads.arduino.cc/arduino-1.8.10-linux64.tar.xz"
        },

        arduino_cli: {
            Linux_x32: "https://github.com/arduino/arduino-cli/releases/download/0.5.0-showports/arduino-cli_0.5.0-showports_Linux_32bit.tar.gz",
            Linux_x64: "https://github.com/arduino/arduino-cli/releases/download/0.5.0-showports/arduino-cli_0.5.0-showports_Linux_64bit.tar.gz"
        },

        ringo: {
            manager: "https://raw.githubusercontent.com/CircuitMess/MAKERphone/boardArduino/package_CircuitMess_Ringo_index.json",
            fqbn: "cm:esp32"
        }
    };

    constructor(){
        this.PLATFORM = os.type();
        if(this.PLATFORM == "Linux") this.PLATFORM += "_" + os.arch();
    }

    private checkArduino(): boolean {
        if(!ArduinoCompiler.identifyDirectories()) return false;
        const dirs = ArduinoCompiler.getDirectories();

        if(dirs.install === undefined || !fs.existsSync(dirs.install)) return false;
    }

    private checkArduinoCli(): boolean {
        return false;
    }

    private downloadArduino(callback: (string, error) => void){
        const dlDir = util.tmpdir("cb-ard-dl");
        let url: string = this.downloads.arduino[this.PLATFORM];

        util.download(url, dlDir).then(file => {
            callback(file, null);
        }).catch(err => {
           callback(null, err);
        });
    }

    private downloadCli(callback: (string, error) => void){
        const dlDir = util.tmpdir("cb-cli-dl");
        let url: string = this.downloads.arduino_cli[this.PLATFORM];

        util.download(url, dlDir).then(file => {
            callback(file, null);
        }).catch(err => {
            callback(null, err);
        });
    }

    private installCliWindows(file, callback: (err) => void){
        const tmp = util.tmpdir("cb-cli-inst");
        const dest = path.join(os.homedir(), "AppData", "Local", "ArduinoCLI");
        if(!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

        util.extract(file, tmp).then(() => {
            const file = "arduino-cli.exe";
            const install = path.join(dest, file);

            fs.copySync(path.join(tmp, file), install);

            child_process.execSync([ install, "config", "init" ].join(" "));
            child_process.execSync([ install, "core", "update-index" ].join(" "));
            child_process.execSync([ install, "lib", "update-index" ].join(" "));

            callback(null);
        }).catch(err => {
            callback(err);
        });
    }

    private installCliLinux(file, callback: (err) => void){
        const tmp = util.tmpdir("cb-cli-inst");
        const dest = path.join(os.homedir(), ".arduino");
        if(!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

        util.extract(file, tmp).then(() => {
            const file = "arduino-cli";
            const install = path.join(dest, file);

            fs.copySync(path.join(tmp, file), install);

            fs.chmodSync(install, "755");

            child_process.execSync([ install, "config", "init" ].join(" "));
            child_process.execSync([ install, "core", "update-index" ].join(" "));
            child_process.execSync([ install, "lib", "update-index" ].join(" "));

            callback(null);
        }).catch(err => {
            callback(err);
        });
    }

    private installCli(file, callback: (err) => void){
        if(this.PLATFORM == "Windows_NT"){
            this.installCliWindows(file, callback);
        }else if(this.PLATFORM.startsWith("Linux")){
            this.installCliLinux(file, callback);
        }
    }

    private installArduinoWindows(file, callback: (err) => void){

    }

    private installArduinoLinux(file, callback: (err) => void){
        const tmp = util.tmpdir("cb-ard-inst");
        const dest = path.join(os.homedir(), ".arduino");
        if(!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

        util.extract(file, tmp).then(() => {
            const files = fs.readdirSync(tmp);
            if(files.length == 0){
                callback(new Error("Extract failed"));
                return;
            }

            const name = files[0];
            const installPath = path.join(dest, name);

            fs.copySync(path.join(tmp, name), installPath);

            fs.chmodSync(path.join(installPath, "arduino"), "755");
            fs.chmodSync(path.join(installPath, "arduino-linux-setup.sh"), "755");

            const user = os.userInfo().username;
            const rules = util.tmpdir("cm-ard-rules");
            const setup: string[] = [
                `groupadd -f plugdev`,
                `groupadd -f dialout`,
                `usermod -a -G tty ${user}`,
                `usermod -a -G dialout ${user}`,
                `usermod -a -G uucp ${user}`,
                `usermod -a -G plugdev ${user}`,
                `usermod -a -G plugdev ${user}`,

                `mkdir -p ${rules}`,

                `echo 'KERNEL=="ttyUSB[0-9]*", TAG+="udev-acl", TAG+="uaccess", OWNER="${user}"' >> ${rules}/90-extraacl.rules`,
                `echo 'KERNEL=="ttyACM[0-9]*", TAG+="udev-acl", TAG+="uaccess", OWNER="${user}"' >> ${rules}/90-extraacl.rules`,

                `echo 'SUBSYSTEM=="tty", ENV{ID_REVISION}=="8087", ENV{ID_MODEL_ID}=="0ab6", MODE="0666", ENV{ID_MM_DEVICE_IGNORE}="1", ENV{ID_MM_CANDIDATE}="0"' >> ${rules}/99-arduino-101.rules`,
                `echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="8087", ATTR{idProduct}=="0aba", MODE="0666", ENV{ID_MM_DEVICE_IGNORE}="1"' >> ${rules}/99-arduino-101.rules`,

                `mv ${rules}/*.rules /etc/udev/rules.d/`,

                `udevadm control --reload-rules`,
                `udevadm trigger`,

                `if [ -d /lib/systemd/ ]; then systemctl restart systemd-udevd; else service udev restart; fi`
            ];

            sudo_prompt.exec(setup.join(" && "),
                { name: "Arduino installer", stdio: "inherit" },
                (error, stderr, stdout) => {
                    console.log(stderr);
                    console.log(stdout);
                    if(error){
                        callback(error);
                        return;
                    }

                    callback(null);
                });
        }).catch(err => {
            callback(err);
        });
    }

    private installArduino(file, callback: (err) => void){
        if(this.PLATFORM == "Windows_NT"){
            this.installArduinoWindows(file, callback);
        }else if(this.PLATFORM.startsWith("Linux")){
            this.installArduinoLinux(file, callback);
        }
    }

    private installRingo(callback: () => void){
        const cli = this.PLATFORM == "Windows_NT"
            ? path.join(os.homedir(), "AppData", "Local", "ArduinoCLI", "arduino-cli.exe")
            : path.join(os.homedir(), ".arduino", "arduino-cli");

        child_process.execSync([ cli, "--additional-urls", this.downloads.ringo.manager, "core", "update-index" ].join(" "));
        child_process.execSync([ cli, "--additional-urls", this.downloads.ringo.manager, "lib   ", "update-index" ].join(" "));
        child_process.execSync([ cli, "--additional-urls", this.downloads.ringo.manager, "core", "install", this.downloads.ringo.fqbn ].join(" "));

        callback();
    }

    private arduino(callback: (err) => void){
        this.downloadArduino((file, err) => {
            if(err){
                callback(err);
                return;
            }

            this.installArduino(file, (error) => {
                callback(error);
            });
        });
    }

    private cli(callback: (err) => void){
        this.downloadCli((file, err) => {
            if(err){
                callback(err);
                return;
            }

            this.installCli(file, (error) => {
                callback(error);
            });
        });
    }

    public install(stage: (string) => void, error: (err) => void){
        stage("ARDUINO");
        this.arduino((err) => {
            if(err){
                error(err);
                return;
            }

            stage("CLI");
            this.cli((err2) => {
                if(err2){
                    error(err2);
                    return;
                }

                stage("RINGO");
                this.installRingo(() => {
                    stage("DONE");
                });
            });
        })
    }
}