import {getToolbox as gcRingo} from "./Ringo"
import {getToolbox as gcNibble} from "./Nibble"
import {getToolbox as gcSpencer} from "./Spencer"
import {getToolbox as gcJayD} from "./JayD"
import {getToolbox as gcWheelson} from "./Wheelson"
import {ToolboxCategory} from "../../Toolbox";

const Toolboxes: { [name: string]: () => ToolboxCategory[] } = {
    "cm:esp32:ringo": gcRingo,
    "cm:esp8266:nibble": gcNibble,
    "cm:esp32:spencer": gcSpencer,
    "cm:esp32:jayd": gcJayD,
    "cm:esp32:wheelson": gcWheelson,
}

export default Toolboxes;