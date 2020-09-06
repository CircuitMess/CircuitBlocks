import {getToolbox as gcRingo} from "./Ringo"
import {getToolbox as gcNibble} from "./Nibble"
import {ToolboxCategory} from "../../Toolbox";

const Toolboxes: { [name: string]: () => ToolboxCategory[] } = {
    "cm:esp32:ringo": gcRingo,
    "cm:esp8266:nibble": gcNibble
}

export default Toolboxes;