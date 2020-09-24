import ArduinoCompiler, {InstallInfo} from "./compiler";
import * as os from "os";
import * as child_process from "child_process";

export class CLI {

	public static run(args?: string[], info?: InstallInfo){
		if(info == undefined){
			info = ArduinoCompiler.checkInstall();
			if(info == null) return;
		}

		const command = os.type() == "Windows_NT"
			? "arduino-cli.exe"
			: "./arduino-cli";

		return child_process.execFileSync(command, args, { encoding: "utf8", cwd: info.cli });
	}
}