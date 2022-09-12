import {getToolbox as gcRingo} from "./Ringo"
import {getToolbox as gcNibble} from "./Nibble"
import {getToolbox as gcSpencer} from "./Spencer"
import {getToolbox as gcJayD} from "./JayD"
import {getToolbox as gcWheelson} from "./Wheelson"
import {getToolbox as gcByteBoi} from "./ByteBoi"
import {getToolbox as gcChatter} from "./Chatter"
import {getToolbox as gcSynthia} from "./Synthia"
import {getToolbox as gcCircuitPet} from "./CircuitPet"
import {ToolboxCategory} from "../../Toolbox";

const Toolboxes: { [name: string]: () => ToolboxCategory[] } = {
    "cm:esp32:ringo": gcRingo,
    "cm:esp8266:nibble": gcNibble,
    "cm:esp32:spencer": gcSpencer,
    "cm:esp32:jayd": gcJayD,
    "cm:esp32:wheelson": gcWheelson,
    "cm:esp32:byteboi": gcByteBoi,
    "cm:esp32:chatter": gcChatter,
    "cm:esp32:synthia": gcSynthia,
    "cm:esp32:circuitpet": gcCircuitPet,
}

export default Toolboxes;