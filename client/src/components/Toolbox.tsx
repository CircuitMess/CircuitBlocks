import * as React from "react"
import * as ReactDOM from "react-dom"

import * as tconf from './BlocklyToolbox/toolbox'
import {getCategories, ToolboxCategorySpecial} from "./BlocklyToolbox/categories";

import 'semantic-ui-css/semantic.min.css'
import './BlocklyToolbox/toolbox.less'
import {CreateFunctionDialog} from "./CreateFunction";


// this is a supertype of pxtc.SymbolInfo (see partitionBlocks)
export interface BlockDefinition {
    name: string;
    xml: string;
    group?: string;
    description?: string;
}

export interface ToolboxProps {
    editorname: string;
    blockly: any;
    //parent: editor.ToolboxEditor;
}

export interface SearchInfo {
    id: string;
    name: string;
    qName?: string;
    block?: string;
    namespace?: string;
    jsdoc?: string;
    field?: [string, string];
    localizedCategory?: string;
    builtinBlock?: boolean;
}

export interface ToolboxState {
    showAdvanced?: boolean;

    selectedItem: number;
    expandedItem?: number;
    height?: number;

    showSearchBox?: boolean;

    hasSearch?: boolean;
    focusSearch?: boolean;
    searchBlocks?: SearchInfo[]; // block ids

    hasError?: boolean;
}

export class Toolbox extends React.Component<ToolboxProps, ToolboxState> {
    private selectedItem: CategoryItem | undefined;
    private selectedIndex: number;
    private items: ToolboxCategory[];

    private rootElement: HTMLElement | undefined;

    private categories: ToolboxCategory[];
    private Blockly: any;
    private workspace: any;

    private variablesCat: ToolboxCategory | undefined;
    private functionsCat: ToolboxCategory | undefined;

    private functionsDialog: CreateFunctionDialog | null = null;

    constructor(props: ToolboxProps) {
        super(props);
        this.state = {
            showAdvanced: false,
            selectedItem: -1
        };

        this.setSelection = this.setSelection.bind(this);
        this.advancedClicked = this.advancedClicked.bind(this);
        this.recipesClicked = this.recipesClicked.bind(this);
        this.recoverToolbox = this.recoverToolbox.bind(this);

        this.selectedIndex = -1;
        this.items = [];

        this.Blockly = props.blockly;
        this.workspace = this.Blockly.getMainWorkspace();
        this.categories = getCategories();

        this.categories.forEach(cat => this.buildCategoryFlyout(cat, this));

        this.Blockly.addChangeListener((e: any) => {
            if(e.type == "var_create"){
                this.rebuildVariablesFlyout();
            }
        });

        this.Blockly.Functions.editFunctionExternalHandler = (mutation: Element, cb: any /*Blockly.Functions.ConfirmEditCallback*/) => {
            Promise.resolve()
                //.delay(10)
                .then(() => {
                    if (!this.functionsDialog) {
                        const wrapper = document.body.appendChild(document.createElement('div'));
                        this.functionsDialog = ReactDOM.render(React.createElement(CreateFunctionDialog, { functionCreateCallback: () => this.rebuildFunctionsFlyout() }), wrapper) as CreateFunctionDialog;
                    }
                    this.functionsDialog.show(mutation, cb, this.workspace);
                });
        }
    }

    rebuildVariablesFlyout(){
        if(!this.variablesCat) return;

        this.variablesCat.flyout = this.buildFlyout(this.variablesCat, this, undefined, true);
    }

    rebuildFunctionsFlyout(){
        if(!this.functionsCat) return;

        this.functionsCat.flyout = this.buildFlyout(this.functionsCat, this, undefined, true);
    }

    buildCategoryFlyout(category: ToolboxCategory, toolbox: Toolbox, parent?: ToolboxCategory){
        if(category.special == ToolboxCategorySpecial.VARIABLES){
            this.variablesCat = category;
        }else if(category.special == ToolboxCategorySpecial.FUNCTIONS){
            this.functionsCat = category;
        }

        category.flyout = toolbox.buildFlyout(category, toolbox, parent);
        category.subcategories.forEach(cat => toolbox.buildCategoryFlyout(cat, toolbox, category));
    }

    constructLabel(text: string){
        return this.createFlyoutGroupLabel(text);
    }

    createFlyoutGroupLabel(name: string, icon?: string, labelLineWidth?: string, helpCallback?: string) {
        const groupLabel = this.createFlyoutLabel(name, undefined, icon);
        groupLabel.setAttribute('web-class', 'blocklyFlyoutGroup');
        groupLabel.setAttribute('web-line', '1.5');
        if (labelLineWidth) groupLabel.setAttribute('web-line-width', labelLineWidth);
        if (helpCallback) {
            groupLabel.setAttribute('web-help-button', 'true');
            groupLabel.setAttribute('callbackkey', helpCallback);
        }
        return groupLabel;
    }

    createFlyoutHeadingLabel(name: string, color: string, icon?: string, iconClass?: string) {
        const headingLabel = this.createFlyoutLabel(name, tconf.convertColor(color), icon, iconClass);
        headingLabel.setAttribute('web-class', 'blocklyFlyoutHeading');
        return headingLabel;
    }

    showFlyoutHeadingLabel(name: string, icon: string, color: string) {
        const categoryName = name;
        const iconClass = `blocklyTreeIcon${icon ? name.toLowerCase() : 'Default'}`.replace(/\s/g, '');
        let headingLabel = this.createFlyoutHeadingLabel(categoryName, color, icon, iconClass);
        return headingLabel;
    }

    createFlyoutLabel(name: string, color?: string, icon?: string, iconClass?: string): HTMLElement {
        // Add the Heading label
        let headingLabel = document.createElement("label") as HTMLElement;
        headingLabel.setAttribute('text', name);
        if (color) {
            headingLabel.setAttribute('web-icon-color', tconf.convertColor(color));
        }
        if (icon) {
            if (icon.length === 1) {
                headingLabel.setAttribute('web-icon', icon);
                if (iconClass) headingLabel.setAttribute('web-icon-class', iconClass);
            }
            else {
                headingLabel.setAttribute('web-icon-class', `blocklyFlyoutIcon${name}`);
            }
        }
        return headingLabel;
    }

    buildFlyout(category: ToolboxCategory, toolbox: Toolbox, parent?: ToolboxCategory, visible?: boolean){
        let workspace: any = toolbox.workspace;
        let flyout: any =  category.flyout ? category.flyout : toolbox.Blockly.Functions.createFlyout(workspace, workspace.toolbox_.flyout_.svgGroup_);
        flyout.setVisible(false);

        if(!category.blocks) return flyout;

        let blocks: any[] = [];

        let color: string = (category.color == "more" && parent) ? parent.color : category.color;

        blocks.push(toolbox.showFlyoutHeadingLabel(category.name, category.icon, color));

        if(category.special == ToolboxCategorySpecial.VARIABLES) {
            toolbox.Blockly.Variables.flyoutCategory(toolbox.workspace).forEach((item: any) => blocks.push(item));
        }else if(category.special == ToolboxCategorySpecial.FUNCTIONS){
            toolbox.Blockly.Functions.flyoutCategory(toolbox.workspace).forEach((item: any) => blocks.push(item));
        }else{
            let currentLabel: string = "";
            category.blocks.forEach(block => {
                let label = block.group;
                if(label && label != currentLabel){
                    currentLabel = label;
                    blocks.push(toolbox.constructLabel(label));
                }

                blocks.push(toolbox.Blockly.Xml.textToDom(block.xml));
            });
        }

        flyout.show(blocks);
        flyout.setVisible(!!visible);

        return flyout;
    }

    setSelectedItem(item: CategoryItem) {
        this.selectedItem = item;
    }

    setPreviousItem() {
        if (this.selectedIndex > 0) {
            const newIndex = --this.selectedIndex;
            // Check if the previous item has a subcategory
            let previousItem = this.items[newIndex];
            this.setSelection(previousItem, newIndex);
        } else if (this.state.showSearchBox) {
            // Focus the search box if it exists
            const searchBox = this.refs.searchbox as ToolboxSearch;
            if (searchBox) searchBox.focus();
        }
    }

    setNextItem() {
        if (this.items.length - 1 > this.selectedIndex) {
            const newIndex = ++this.selectedIndex;
            this.setSelection(this.items[newIndex], newIndex);
        }
    }

    setSearch() {
        // Focus the search box if it exists
        const searchBox = this.refs.searchbox as ToolboxSearch;
        if (searchBox) searchBox.focus();
    }

    clear() {
        this.clearSelection();
        this.selectedIndex = 0;
        this.selectedTreeRow = undefined;
    }

    clearSelection() {
        this.setState({ selectedItem: -1, expandedItem: undefined, focusSearch: false })
    }

    clearSearch() {
        this.setState({ hasSearch: false, searchBlocks: undefined, focusSearch: false });
    }

    setSelection(category: ToolboxCategory, index: number) {

        if (this.state.selectedItem == index) {
            this.clearSelection();
            this.closeFlyout();
        } else {
            /*if (customClick) {
                handled = customClick(parent);
                if (handled) return;
            }*/

            // TODO: custom click. ako je handlan, niš dalje

            this.setState({ selectedItem: index, expandedItem: index, focusSearch: false });

            this.selectedIndex = index;
            this.selectedTreeRow = category;
            if (category.advanced && !this.state.showAdvanced) this.showAdvanced();

            if (true /*!customClick*/) {
                // Show flyout
                this.showFlyout(category);
            }
        }
    }

    selectFirstItem() {
        if (this.items[0]) {
            this.setSelection(this.items[0], 0);
        }
    }

    moveFocusToFlyout() {
        /*const { parent } = this.props;
        parent.moveFocusToFlyout();*/
    }

    componentDidUpdate(prevProps: ToolboxProps, prevState: ToolboxState) {
        if (prevState.showAdvanced != this.state.showAdvanced
            || this.state.expandedItem != prevState.expandedItem) {

            //this.props.parent.resize();
        }
        if (this.state.hasSearch && this.state.searchBlocks != prevState.searchBlocks) {
            // Referesh search items
            this.refreshSearchItem();
        } else if (prevState.hasSearch && !this.state.hasSearch && this.state.selectedItem == 0) {
            // No more search
            this.closeFlyout();
        }
    }

    componentDidCatch(error: any, info: any) {
        // Log what happened
        const { editorname } = this.props;

        // Update error state
        this.setState({ hasError: true });
    }

    recoverToolbox() {
        // Recover from above error state
        this.setState({ hasError: false });
    }

    advancedClicked() {
        const { editorname } = this.props;
        this.showAdvanced();
    }

    recipesClicked() {
        const { editorname } = this.props;
        //this.props.parent.parent.showRecipesDialog();
    }

    showAdvanced() {
        //const { parent } = this.props;
        if (this.selectedItem && this.selectedItem.props.treeRow
            && this.selectedItem.props.treeRow.advanced) {
            this.clear();
            this.closeFlyout();
        }
        this.setState({ showAdvanced: !this.state.showAdvanced });
    }

/*    getSearchBlocks(): BlockDefinition[] {
        const { parent } = this.props;
        const { searchBlocks } = this.state;
        return searchBlocks.map(searchResult => {
            return {
                name: searchResult.qName,
                attributes: {
                    blockId: searchResult.id
                },
                builtinBlock: searchResult.builtinBlock,
                builtinField: searchResult.field
            }
        });
    }*/

    refreshSelection() {
        //const { parent } = this.props;
        if (!this.state.selectedItem || !this.selectedTreeRow) return;
        if (false /*this.selectedTreeRow.customClick*/) {
            //this.selectedTreeRow.customClick(parent);
        } else {
            this.showFlyout(this.selectedTreeRow);
        }
    }

    refreshSearchItem() {
        /*const searchTreeRow = ToolboxSearch.getSearchTreeRow();
        this.showFlyout(searchTreeRow);*/
    }

    private selectedTreeRow: ToolboxCategory | undefined;
    private showFlyout(treeRow: ToolboxCategory) {
        this.closeFlyout();

        this.workspace.toolbox_.flyout_ = treeRow.flyout;
        this.workspace.toolbox_.flyout_.setVisible(true);
    }

    closeFlyout() {
        this.workspace.toolbox_.flyout_.setVisible(false);
    }

    handleRootElementRef = (c: HTMLDivElement) => {
        this.rootElement = c;
    };

    render() {
        const { editorname/*, parent*/ } = this.props;
        const { showAdvanced, selectedItem, expandedItem, hasError } = this.state;
        let visible = true;
        let hasSearch = true;
        let loading = false;
        if (!visible) return <div style={{ display: 'none' }} />
        let showSearchBox = true;

        const theme = "default"; //pxt.appTarget.appTheme;
        //const hasTopBlocks = !!theme.topBlocks && !inTutorial;

        if (loading || hasError) return <div>
            <div className="blocklyTreeRoot">
                <div className="blocklyTreeRow" style={{ opacity: 0 }} />
            </div>`
            {loading ? <div className="ui active dimmer">
                <div className="ui loader indeterminate" />
            </div> : undefined}
            {hasError ? <div className="ui">
                { "Toolbox crashed.." }
            </div> : undefined}
        </div>;

        const hasAdvanced = false;

        const normalCategories: ToolboxCategory[] = this.categories;
        const advancedCategories: ToolboxCategory[] = [];

        let index = 0;
        return <div ref={this.handleRootElementRef} className={ "pxtToolbox" } id={`${editorname}EditorToolbox`}>
            <ToolboxStyle categories={normalCategories} />
            <ToolboxSearch ref="searchbox"  toolbox={this} editorname={editorname} />
            <div className="blocklyTreeRoot">
                <div role="tree">
                    {normalCategories.map((treeRow) => { let i = index++;
                        return <CategoryItem toolbox={this} key={ "catitem_" + i } index={i} treeRow={treeRow}
                                      onCategoryClick={this.setSelection}>
                            {treeRow.subcategories.map((subTreeRow) => {
                                let j = index++;
                                return <CategoryItem key={"catitem_" + j} index={j} toolbox={this} treeRow={subTreeRow}
                                                     parentTreeRow={treeRow} onCategoryClick={this.setSelection}/>
                            })}
                        </CategoryItem>
                    })}
                    {hasAdvanced ? <TreeSeparator key="advancedseparator" /> : undefined}
                    {hasAdvanced ? <CategoryItem index={ -1 } toolbox={this} treeRow={{ subcategories: [], name: tconf.advancedTitle(), color: tconf.getNamespaceColor('advanced'), icon: tconf.getNamespaceIcon(showAdvanced ? 'advancedexpanded' : 'advancedcollapsed') }} onCategoryClick={this.advancedClicked} /> : undefined}
                    {showAdvanced ? advancedCategories.map((treeRow) => (
                        <CategoryItem toolbox={this} index={index++} treeRow={treeRow} onCategoryClick={this.setSelection}>
                            {treeRow.subcategories ? treeRow.subcategories.map((subTreeRow) => (
                                <CategoryItem toolbox={this} index={index++} treeRow={subTreeRow} onCategoryClick={this.setSelection} />
                            )) : undefined}
                        </CategoryItem>
                    )) : undefined}
                </div>
            </div>
        </div>
    }
}

export interface CategoryItemProps extends TreeRowProps {
    toolbox: Toolbox;
    onCategoryClick?: (treeRow: ToolboxCategory, index: number) => void;
    index: number;
}

export interface CategoryItemState {
    selected?: boolean;
}

export class CategoryItem extends React.Component<CategoryItemProps, CategoryItemState> {
    private treeRowElement: TreeRow | undefined;

    constructor(props: CategoryItemProps) {
        super(props);

        this.state = {
            selected: props.selected
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    getTreeRow() {
        return this.treeRowElement;
    }

    componentWillReceiveProps(nextProps: CategoryItemProps) {
        const newState: CategoryItemState = {};
        if (nextProps.selected != undefined) {
            newState.selected = nextProps.selected;
        }
        if (Object.keys(newState).length > 0) this.setState(newState)
    }

    componentDidUpdate(prevProps: CategoryItemProps, prevState: CategoryItemState) {
        const { toolbox } = this.props;
        if (this.state.selected) {
            this.props.toolbox.setSelectedItem(this);
            if (!toolbox.state.focusSearch) this.focusElement();
        }
    }

    focusElement() {
        this.treeRowElement && this.treeRowElement.focus();
    }

    handleClick(e: React.MouseEvent<any>) {
        const { treeRow, onCategoryClick, index } = this.props;
        if(onCategoryClick) onCategoryClick(treeRow, index);

        e.preventDefault();
        e.stopPropagation();
    }

    TAB_KEY = 9;
    ESC_KEY = 27;
    ENTER_KEY = 13;
    SPACE_KEY = 32;


    keyCodeFromEvent(e: any) {
        return (typeof e.which == "number") ? e.which : e.keyCode;
    }

    handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        const { toolbox } = this.props;
        const isRtl = false;

        const charCode = this.keyCodeFromEvent(e);
        if (charCode == 40) { //  DOWN
            this.nextItem();
        } else if (charCode == 38) { // UP
            this.previousItem();
        } else if ((charCode == 39 && !isRtl) || (charCode == 37 && isRtl)) { // (LEFT & LTR) || (RIGHT & RTL)
            // Focus inside flyout
            toolbox.moveFocusToFlyout();
        } else if (charCode == 27) { // ESCAPE
            // Close the flyout
            toolbox.closeFlyout();
        } else if (charCode == this.ENTER_KEY || charCode == this.SPACE_KEY) {
            //sui.fireClickOnEnter.call(this, e);
        } else if (charCode == this.TAB_KEY
            || charCode == 37 /* Left arrow key */
            || charCode == 39 /* Left arrow key */
            || charCode == 17 /* Ctrl Key */
            || charCode == 16 /* Shift Key */
            || charCode == 91 /* Cmd Key */) {
            // Escape tab and shift key
        } else {
            toolbox.setSearch();
        }
    }

    previousItem() {
        const { toolbox } = this.props;

        toolbox.setPreviousItem();
    }

    nextItem() {
        const { toolbox } = this.props;

        toolbox.setNextItem();
    }

    handleTreeRowRef = (c: TreeRow) => {
        this.treeRowElement = c;
    }

    render() {
        let selectedIndex: number =  this.props.toolbox.state.selectedItem;

        let selected: boolean = selectedIndex == this.props.index;
        let childSelected: boolean = selectedIndex > this.props.index && selectedIndex <= this.props.index + this.props.treeRow.subcategories.length;

        return <TreeItem>
            <TreeRow ref={this.handleTreeRowRef} isRtl={ false } {...this.props} selected={ selected }
                onClick={this.handleClick} onKeyDown={this.handleKeyDown} index={this.props.index} />
            <TreeGroup visible={ selected || childSelected }>
                {this.props.children}
            </TreeGroup>
        </TreeItem>
    }
}

export interface ToolboxCategory {
    name: string;
    color: string;
    icon: string;

    blocks?: BlockDefinition[];
    subcategories: ToolboxCategory[];

    customClick?: () => boolean;
    advanced?: boolean;

    flyout?: any;
    special?: ToolboxCategorySpecial;
}

export interface TreeRowProps {
    treeRow: ToolboxCategory;
    parentTreeRow?: ToolboxCategory;
    onClick?: (e: React.MouseEvent<any>) => void;
    onKeyDown?: (e: React.KeyboardEvent<any>) => void;
    selected?: boolean;
    isRtl?: boolean;
    index: number;
}

export class TreeRow extends React.Component<TreeRowProps, {}> {

    private treeRow: HTMLElement | undefined;

    constructor(props: TreeRowProps) {
        super(props);
        this.state = {
        }

        this.onmouseenter = this.onmouseenter.bind(this);
        this.onmouseleave = this.onmouseleave.bind(this);
    }

    focus() {
        if (this.treeRow) this.treeRow.focus();
    }

    getProperties() {
        const { treeRow } = this.props;
        return treeRow;
    }

    onmouseenter() {
        const appTheme = "default"; //pxt.appTarget.appTheme;
        const metaColor = this.getMetaColor();
        const invertedMultipler = /*appTheme.blocklyOptions
            && appTheme.blocklyOptions.toolboxOptions
            && appTheme.blocklyOptions.toolboxOptions.invertedMultiplier || */ 0.3;

        //if (appTheme.invertedToolbox) {
        if (false) {
            //this.treeRow.style.backgroundColor = "#333"; /*pxt.toolbox.fadeColor(metaColor || '#ddd', invertedMultipler, false);*/
        }
    }

    onmouseleave() {
        const appTheme = "default"; //pxt.appTarget.appTheme;
        const metaColor = this.getMetaColor();
        //if (appTheme.invertedToolbox) {
        if (false) {
            //this.treeRow.style.backgroundColor = (metaColor || '#ddd');
        }
    }

    getMetaColor() {
        let color = (this.props.treeRow.color == "more" && this.props.parentTreeRow) ? this.props.parentTreeRow.color : this.props.treeRow.color;
        return tconf.convertColor(color ? color : "black") || tconf.getNamespaceColor('default');
    }

    handleTreeRowRef = (c: HTMLDivElement) => {
        this.treeRow = c;
    }

    render() {
        const { selected, onClick, onKeyDown, isRtl, index } = this.props;
        const { name, icon } = this.props.treeRow;
        const metaColor = this.getMetaColor();

        const invertedMultipler = /*appTheme.blocklyOptions
            && appTheme.blocklyOptions.toolboxOptions
            && appTheme.blocklyOptions.toolboxOptions.invertedMultiplier ||*/ 0.3;

        let treeRowStyle: React.CSSProperties = {
            paddingLeft: '0px',
            borderLeft: `8px solid ${metaColor}`
        };

        let treeRowClass = 'blocklyTreeRow';

        // Selected
        if (selected) {
            treeRowClass += ' blocklyTreeSelected';
            treeRowStyle.backgroundColor = (metaColor || '#ddd');
            treeRowStyle.color = '#fff';
        }

        // Icon
        const iconClass = `blocklyTreeIcon${name == "More" ? 'more' : icon }`.replace(/\s/g, '');
        let iconContent = name == "More" ? tconf.getNamespaceIcon('more') : icon || tconf.getNamespaceIcon('default');
        let iconImageStyle: JSX.Element = <style></style>;
        if (iconContent.length > 1) {
            // It's probably an image icon, and not an icon code
            iconImageStyle = <style>
                {`.blocklyTreeIcon.${iconClass} {
                    background-image: url("${ "" /* pxt.webConfig.commitCdnUrl + "/" + encodeURI(icon) */ }")!important;
                    width: 30px;
                    height: 100%;
                    background-size: 20px !important;
                    background-repeat: no-repeat !important;
                    background-position: 50% 50% !important;
                }`}
            </style>;
            iconContent = ""; // undefined;
        }

        return <div role="button" ref={this.handleTreeRowRef} className={treeRowClass}
            style={treeRowStyle} tabIndex={0}
            onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave}
            onClick={onClick} onContextMenu={onClick} onKeyDown={onKeyDown /*? onKeyDown : sui.fireClickOnEnter*/}>
            <span className="blocklyTreeIcon" role="presentation"></span>
            {iconImageStyle}
            <span style={{ display: 'inline-block' }} className={`blocklyTreeIcon ${iconClass}`} role="presentation">{iconContent}</span>
            <span className="blocklyTreeLabel">{name}</span>
        </div>
    }
}

export class TreeSeparator extends React.Component<{}, {}> {
    render() {
        return <TreeItem>
            <div className="blocklyTreeSeparator">
                <span style={{ display: 'inline-block' }} role="presentation"></span>
            </div>
        </TreeItem>
    }
}

export interface TreeItemProps {
    selected?: boolean;
    children?: any;
}

export class TreeItem extends React.Component<TreeItemProps, {}> {
    render() {
        const { selected } = this.props;
        return <div role="treeitem" aria-selected={selected}>
            {this.props.children}
        </div>
    }
}

export interface TreeGroupProps {
    visible?: boolean;
    children?: any;
}

export class TreeGroup extends React.Component<TreeGroupProps, {}> {
    render() {
        const { visible } = this.props;

        return <div role="group" style={{ backgroundPosition: '0px 0px', 'display': visible ? 'block' : 'none' }}>
            {this.props.children}
        </div>
    }
}


export interface ToolboxSearchProps {
    //parent: editor.ToolboxEditor;
    editorname: string;
    toolbox: Toolbox;
}

export interface ToolboxSearchState {
    searchAccessibilityLabel?: string;
}

export class ToolboxSearch extends React.Component<ToolboxSearchProps, ToolboxSearchState> {

    constructor(props: ToolboxSearchProps) {
        super(props);
        this.state = {
        }

        this.searchImmediate = this.searchImmediate.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    private search = () => setTimeout(() => this.searchImmediate(), 300);

    handleChange() {
        this.search();
    }

    handleKeyDown(e: React.KeyboardEvent<any>) {
        const { toolbox } = this.props;
        let charCode = (typeof e.which == "number") ? e.which : e.keyCode
        if (charCode === 40 /* Down Key */) {
            // Select first item in the toolbox
            toolbox.selectFirstItem();
        }
    }

    focus() {
        (this.refs.searchInput as HTMLInputElement).focus();
    }

    searchImmediate() {
        const { /*parent,*/ toolbox, editorname } = this.props;
        const searchTerm = (this.refs.searchInput as HTMLInputElement).value;

        let searchAccessibilityLabel = '';
        let hasSearch = false;



        // Execute search
        /*parent.searchAsync(searchTerm)
            .done((blocks) => {
                if (blocks.length == 0) {
                    searchAccessibilityLabel = lf("No search results...");
                } else {
                    searchAccessibilityLabel = lf("{0} result matching '{1}'", blocks.length, searchTerm.toLowerCase());
                }
                hasSearch = searchTerm != '';

                const newState: ToolboxState = {};
                newState.hasSearch = hasSearch;
                newState.searchBlocks = blocks;
                newState.focusSearch = true;
                if (hasSearch) newState.selectedItem = 'search';
                toolbox.setState(newState);

                this.setState({ searchAccessibilityLabel: searchAccessibilityLabel });
            });*/
    }

    render() {
        const { searchAccessibilityLabel } = this.state;
        return <div id="blocklySearchArea">
            <div id="blocklySearchInput" className="ui fluid icon input" role="search">
                <input ref="searchInput" type="text" placeholder={ "Search..." }
                    onFocus={this.searchImmediate} onKeyDown={this.handleKeyDown} onChange={this.handleChange}
                    id="blocklySearchInputField" className="blocklySearchInputField"
                    aria-label={ "Search" }
                    autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} />
                <i className="search icon" role="presentation" aria-hidden="true"></i>
                <div className="accessible-hidden" id="blocklySearchLabel" aria-live="polite"> {searchAccessibilityLabel} </div>
            </div>
        </div>
    }
}

export class ToolboxTrashIcon extends React.Component<{}, {}> {

    render() {
        return <div id="blocklyTrashIcon" style={{ opacity: 0, display: 'none' }}>
            <i className="trash icon" aria-hidden="true"></i>
        </div>
    }
}

interface ToolboxStyleProps {
    categories: ToolboxCategory[];
}

export class ToolboxStyle extends React.Component<ToolboxStyleProps, {}> {

    addCategoryStyle(category: ToolboxCategory, parent?: ToolboxCategory){
        let color: string = (category.color == "more" && parent) ? parent.color : category.color;

        this.style +=
            `span.docs.inlineblock.cat_${this.index} {
                    background-color: ${color};
                    border-color: ${tconf.fadeColor(color, 0.1, false)};
                }\n`;

        this.index++;

        category.subcategories.forEach(subcat => this.addCategoryStyle(subcat, category));
    }

    private index: number = 0;
    private style: string = "";

    render() {
        const { categories } = this.props;

        let styles: string = "";

        this.index = 0;
        this.style = "";

        categories.forEach(category => this.addCategoryStyle(category));

        return <style>
            {this.style}
        </style>
    }
}

export default Toolbox;