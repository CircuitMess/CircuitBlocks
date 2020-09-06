import {ToolboxCategory} from "../../Toolbox";

export enum ToolboxCategorySpecial {
    VARIABLES, FUNCTIONS
}

export const moreCategory: ToolboxCategory = {
    name: "More",
    color: "more",
    icon: "\uf005",
    subcategories: []
};