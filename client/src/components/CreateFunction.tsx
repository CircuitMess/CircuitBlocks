import * as React from "react";
import * as sui from "semantic-ui-react";
import {defaultIconForArgType} from "./BlocklyToolbox/toolbox";

export interface ISettingsProps {
    //parent: IProjectView;
    visible?: boolean;
    functionCreateCallback?: () => void;
}

interface FunctionEditorTypeInfo {
    typeName?: string; // The actual type that gets emitted to ts
    label?: string; // A user-friendly label for the type, e.g. "text" for the string type
    icon?: string; // The className of a semantic icon, e.g. "calculator", "text width", etc
    defaultName?: string; // The default argument name to use in the function declaration for this type
}

export interface CreateFunctionDialogState {
    visible?: boolean;
    functionEditorWorkspace?: Blockly.WorkspaceSvg;
    functionCallback?: any; // Blockly.Functions.ConfirmEditCallback
    initialMutation?: Element | null;
    functionBeingEdited?: any; // Blockly.FunctionDeclarationBlock
    mainWorkspace?: Blockly.Workspace;
}

export interface ModalButton {
    label: string;
    icon?: string; // defaults to "checkmark"
    className?: string; // defaults "positive"
    onclick?: () => (Promise<void> | void);
    resolveVal?: number;
    url?: string;
    fileName?: string;
    loading?: boolean;
    disabled?: boolean;
    approveButton?: boolean;
    labelPosition?: "left" | "right";
}

export class CreateFunctionDialog extends React.Component<ISettingsProps, CreateFunctionDialogState> {
    static cachedFunctionTypes: FunctionEditorTypeInfo[] | null = null;

    constructor(props: ISettingsProps) {
        super(props);
        this.state = {
            visible: false,
            functionEditorWorkspace: null,
            functionCallback: null,
            initialMutation: null,
            functionBeingEdited: null
        };

        this.hide = this.hide.bind(this);
        this.modalDidOpen = this.modalDidOpen.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    hide() {
        // TODO: pxt.BrowserUtils.removeClass(Blockly.WidgetDiv.DIV as HTMLElement, "functioneditor");
        const { functionEditorWorkspace, mainWorkspace } = this.state;
        functionEditorWorkspace.clear();
        functionEditorWorkspace.dispose();
        (mainWorkspace as any).refreshToolboxSelection();
        this.setState({
            visible: false,
            functionEditorWorkspace: null,
            functionCallback: null,
            initialMutation: null,
            functionBeingEdited: null
        });
    }

    show(initialMutation: Element, cb: any /*Blockly.Functions.ConfirmEditCallback*/, mainWorkspace: Blockly.Workspace) {
        this.setState({
            visible: true,
            functionCallback: cb,
            initialMutation,
            mainWorkspace
        });
    }

    modalDidOpen() {
        const workspaceDiv = document.getElementById('functionEditorWorkspace');
        let { functionEditorWorkspace, initialMutation } = this.state;

        if (!workspaceDiv) {
            return;
        }

        // Adjust the WidgetDiv classname so that it can show up above the dimmer
        // TODO: pxt.BrowserUtils.addClass(Blockly.WidgetDiv.DIV as HTMLElement, "functioneditor");

        // Create the function editor workspace
        functionEditorWorkspace = Blockly.inject(workspaceDiv, {
            trashcan: false,
            scrollbars: true
        }) as Blockly.WorkspaceSvg;
        (functionEditorWorkspace as any).showContextMenu_ = () => { }; // Disable the context menu
        functionEditorWorkspace.clear();

        const functionBeingEdited = functionEditorWorkspace.newBlock('function_declaration') as any /*Blockly.FunctionDeclarationBlock*/;
        (functionBeingEdited as any).domToMutation(initialMutation);
        functionBeingEdited.initSvg();
        functionBeingEdited.render(false);
        functionEditorWorkspace.centerOnBlock(functionBeingEdited.id);

        functionEditorWorkspace.addChangeListener(() => {
            const { functionBeingEdited } = this.state;
            if (functionBeingEdited) {
                functionBeingEdited.updateFunctionSignature();
            }
        });

        this.setState({
            functionEditorWorkspace,
            functionBeingEdited
        });
        Blockly.svgResize(functionEditorWorkspace);
    }

    cancel() {
        // TODO: pxt.tickEvent("createfunction.cancel", undefined, { interactiveConsent: true });
        this.hide();
    }

    confirm() {
        Blockly.hideChaff();
        const { functionBeingEdited, mainWorkspace, functionCallback } = this.state;
        const mutation = (functionBeingEdited as any).mutationToDom();
        if (Blockly.Functions.validateFunctionExternal(mutation, mainWorkspace)) {
            functionCallback(mutation);
            if(this.props.functionCreateCallback) this.props.functionCreateCallback();
            this.hide();
        }
    }

    addArgumentFactory(typeName: string) {
        return () => this.addArgument(typeName);
    }

    addArgument(typeName: string) {
        const { functionBeingEdited } = this.state;
        switch (typeName) {
            case "boolean":
                functionBeingEdited.addBooleanExternal();
                break;
            case "string":
                functionBeingEdited.addStringExternal();
                break;
            case "number":
                functionBeingEdited.addNumberExternal();
                break;
            default:
                functionBeingEdited.addCustomExternal(typeName);
                break;
        }
    }

    // TODO fix mobile confirm buttons (no text, but still space for text)

    componentDidUpdate(prevProps: Readonly<ISettingsProps>, prevState: Readonly<CreateFunctionDialogState>, snapshot?: any): void {
        if(prevState.visible == false && this.state.visible == true){
            this.modalDidOpen();
        }
    }

    render() {
        const { visible } = this.state;
        const actions: ModalButton[] = [
            {
                label: "Cancel",
                onclick: this.hide,
                icon: "cancel",
                className: "cancel lightgrey"
            },
            {
                label: "Done",
                onclick: this.confirm,
                icon: "check",
                className: "approve positive"
            }
        ];
        const types = this.getArgumentTypes().slice();

        return (
            <sui.Modal open={visible} className="createfunction" size="large"
                closeOnEscape={false} closeIcon={false} closeOnDimmerClick={false} closeOnDocumentClick={false}
                dimmer={true} buttons={actions}>
                <sui.Modal.Header>Edit Function</sui.Modal.Header>
                <sui.Modal.Content>
                    <div className="horizontal list">
                        <span className="ui text mobile hide paramlabel">Add a parameter</span>
                        {types.map(t =>
                            <sui.Button
                                key={t.typeName}
                                role="button"
                                className="icon"
                                icon={t.icon}
                                //textClass="mobile hide"
                                text={t.label || t.typeName}
                                aria-label={"Add " + t.label || t.typeName + " parameter"}
                                onClick={this.addArgumentFactory(t.typeName || "ERRUNDEFINED")}
                            />
                        )}
                    </div>
                </sui.Modal.Content>
                <div id="functionEditorWorkspace" style={{ height: "300px" }}></div>
                <sui.Modal.Actions>
                    {actions.map(action =>
                        <sui.Button className={action.className} onClick={action.onclick}>{action.label}</sui.Button>
                    )}
                </sui.Modal.Actions>
            </sui.Modal>
        )
    }

    private getArgumentTypes(): FunctionEditorTypeInfo[] {
        if (!CreateFunctionDialog.cachedFunctionTypes) {
            const types: FunctionEditorTypeInfo[] = [
                {
                    label: "Text",
                    typeName: "string",
                    icon: defaultIconForArgType("string")
                },
                {
                    label: "Boolean",
                    typeName: "boolean",
                    icon: defaultIconForArgType("boolean")
                },
                {
                    label: "Number",
                    typeName: "number",
                    icon: defaultIconForArgType("number")
                }
            ];

            /*if (pxt.appTarget.runtime &&
                pxt.appTarget.runtime.functionsOptions &&
                pxt.appTarget.runtime.functionsOptions.extraFunctionEditorTypes &&
                Array.isArray(pxt.appTarget.runtime.functionsOptions.extraFunctionEditorTypes)) {
                pxt.appTarget.runtime.functionsOptions.extraFunctionEditorTypes.forEach(t => {
                    types.push(t);
                });
            }*/

            types.forEach(t => {
                if (!t.icon) {
                    t.icon = defaultIconForArgType();
                }
            });

            CreateFunctionDialog.cachedFunctionTypes = types;
        }

        return CreateFunctionDialog.cachedFunctionTypes;
    }
}