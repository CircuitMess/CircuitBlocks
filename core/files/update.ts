import * as os from "os";
import {app, ipcMain} from "electron"
import logger from "./logger";
import messenger, {MessageType} from "./messenger";

const { autoUpdater } = require("electron-updater");

export default class Update {

    public constructor(){
        const plat = os.type();
        const arch = os.arch();
        const ver = app.getVersion();

        autoUpdater.autoInstallOnAppQuit = false;
        autoUpdater.autoDownload = false;
        autoUpdater.setFeedURL({
            url: `http://10.0.2.2:8080/update/${plat}/${arch}/${ver}/`,
            provider: "generic",
            serverType: "json"
        });

        autoUpdater.on("download-progress", (progress) => {
            let text = "kb/s";
            let speed = Math.round(progress.bytesPerSecond / 1024);
            if(speed > 1000){
                speed /= 1024;
                speed = Math.round(speed * 10) / 10;
                text = "mb/s";
            }

            messenger.report(MessageType.UPDATE,
                [ "" + (Math.round(progress.percent * 100) / 100) + "%, " + speed + " " + text,
                    "A new update is downloading.", "When finished, CircuitBlocks will restart." ],
                undefined, true);
        });
    }

    public check(){
        autoUpdater.checkForUpdates().then(result => {
            if(!result) return;

            if(os.type() == "Linux"){
                messenger.report(MessageType.UPDATE,
                    [ "Version " + result.updateInfo.version + " is available. You can download it at",
                        "[[" + result.updateInfo.path + "]]", "Compiling sketches might not work until you update." ],
                    [{ title: "Ok" }]);

                return;
            }

            messenger.report(MessageType.UPDATE,
                [ "A new update is downloading.", "When finished, CircuitBlocks will restart." ],
                undefined, true);

            autoUpdater.downloadUpdate(result.cancellationToken).then(dlResult => {
                autoUpdater.quitAndInstall(false, true);
            }).catch(dlError => {
                messenger.report(MessageType.ERROR,
                    [ "Update failed to download. You can download it manually at",
                        "[[" + result.updateInfo.path + "]]",
                        "Compiling sketches might not work until you update.",
                        "If this continues, please send an error report and contact our support." ],
                    [{ title: "Ok" }, { title: "Send error report", action: "report", secondary: true }]);

                logger.log("Update download error", dlError);
            });
        }).catch(error => {
            logger.log("Update check error", error);
        });
    }
}