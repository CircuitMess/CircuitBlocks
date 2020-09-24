import ArduinoCompiler, {InstallInfo} from "./compiler";
import * as os from "os";
import * as child_process from "child_process";

export class CLI {

	public static run(args?: string[], info?: InstallInfo | string){
		let path: string;

		if(info == undefined){
			info = ArduinoCompiler.checkInstall();
			if(info == null) return;
		}else if(typeof info == "string"){
			path = info;
		}else{
			path = info.cli;
		}

		const command = os.type() == "Windows_NT"
			? "arduino-cli.exe"
			: "./arduino-cli";

		return child_process.execFileSync(command, args, { encoding: "utf8", cwd: path });
	}
}