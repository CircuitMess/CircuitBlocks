import ArduinoCompiler, {InstallInfo} from "./compiler";
import path from "path";
import * as os from "os";
import * as fs from "fs";

export default class InstallerDarwin {
	checkInstall(): InstallInfo {
		let info: InstallInfo = { arduino: null, cli: null, sketchbook: null, local: null, arduinoVersion: "" };

		const arduinoInstall = path.join("/Applications", "Arduino.app");
		if(fs.existsSync(arduinoInstall)){
			info.arduino = arduinoInstall;
		}

		const sketchbook = path.join(os.homedir(), "Documents", "Arduino");
		if(fs.existsSync(sketchbook)){
			info.sketchbook = sketchbook;
		}

		const arduinoLocal = path.join(os.homedir(), "Library", "Arduino15");
		if(fs.existsSync(arduinoLocal)){
			info.local = arduinoLocal;

			const prefPath = path.join(arduinoLocal, 'preferences.txt');
			if(fs.existsSync(prefPath)){
				const preferences = ArduinoCompiler.parsePreferences(prefPath);

				if(preferences.version){
					info.arduinoVersion = preferences.version;
				}

				if(preferences.sketchbook && fs.existsSync(preferences.sketchbook)){
					info.sketchbook = preferences.sketchbook;
				}
			}
		}

		const cliDir = path.join(os.homedir(), ".arduino");
		if(fs.existsSync(cliDir)){
			const cli = path.join(cliDir, "arduino-cli");
			if(fs.existsSync(cli)){
				info.cli = cliDir;
			}
		}

		return info;
	}
}
