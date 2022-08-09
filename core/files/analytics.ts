import {JSONStorage} from "node-localstorage";
import {app} from "electron";
import {v4} from "uuid";
import ua from "universal-analytics";

class Analytics {
	private readonly storage = new JSONStorage(app.getPath("userData"));
	private readonly uid: string;
	private readonly ua: ua.Visitor;

	constructor(){
		this.uid = this.storage.getItem("UserID") || v4();
		this.storage.setItem("UserID", this.uid);

		this.ua = ua("", this.uid);
		this.ua.set("appName", "CircuitBlocks");
		this.ua.set("dimension1", app.getVersion());
		this.ua.set("appVersion", app.getVersion());
		this.ua.set("app_version", app.getVersion());
		console.log("version", app.getVersion());
	}

	public init(){
		this.ua.event({ ec: "System", ea: "Init" }).send();
	}
}

const analytics = new Analytics();
export default analytics;