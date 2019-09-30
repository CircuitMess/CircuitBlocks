import React from 'react';
import styled from 'styled-components';
import Button from "../../../components/Button";
import {IpcRenderer, AllElectron} from 'electron';

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

const SerialWrapper = styled.div<{ theme: 'vs-dark' | 'vs-light' }>`
    z-index: 250;
    position: absolute;
    right: 10px;
    left: 10px;
    bottom: 10px;
    top: 60%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    padding: 20px;
    transition-duration: 0.3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    
    &.fullscreen {
        left: 16px;
        transition-duration: 0.3s;
    }
`;

const SerialContent = styled.div`
    flex-grow: 1;
    margin-bottom: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5) inset;
    padding: 10px;
    overflow: auto;
    
    p {
        font-family: "monospaced";
        white-space: pre;
        font-size: 16px;
        margin-bottom: 5px;
        
        &.input {
            padding: 5px 0;
            color: #a00;
        }
    }
`;

interface SerialProps {
    isOpen: boolean;
    connected: boolean;
}

interface SerialState {
    content: (string|JSX.Element)[];
    input: string;
}

export default class Serial extends React.Component<SerialProps, SerialState> {

    private input: HTMLInputElement | null = null;
    private content: HTMLDivElement | null = null;
    private contentEnd: HTMLElement | null = null;

    constructor(props: SerialProps) {
        super(props);

        this.state = {
            content: [],
            input: ""
        };

        ipcRenderer.on("serial", (event, args) => {
            this.state.content.push(args.content);
            this.setState({ content: this.state.content });
        });
    }

    private send(){
        const { input } = this.state;
        const { connected } = this.props;

        if(!connected) return;

        const line: JSX.Element = <p className={"input"}>{input}</p>;
        this.state.content.push(line);

        ipcRenderer.send("serial", { input });
        this.setState({ input: "", content: this.state.content });
    }

    public componentDidMount(): void {
        if(this.input) this.input.focus();
        if(this.content && this.contentEnd) this.contentEnd.scrollIntoView({ behaviour: "smooth" } as ScrollIntoViewOptions);
    }

    public componentDidUpdate(prevProps: Readonly<SerialProps>, prevState: Readonly<SerialState>, snapshot?: any): void {
        if(this.input) this.input.focus();
        if(this.content && this.contentEnd) this.contentEnd.scrollIntoView({ behaviour: "smooth" } as ScrollIntoViewOptions);
    }

    public render() {
        const { content, input } = this.state;
        const { isOpen, connected } = this.props;

        const serialContent = content.map(e => {
            if(e instanceof Element) return e;
            return <p>{e}</p>
        });
        serialContent.push(<p ref={(element) => this.contentEnd = element }></p>);

        return <SerialWrapper className={isOpen ? "" : "d-none"}>
            <h2>Serial monitor</h2>
            <SerialContent ref={(element) => { this.content = element; }}>{ serialContent }</SerialContent>
            <form onSubmit={(e) => { e.preventDefault(); this.send(); return false; }} style={{ flexShrink: 0, display: "flex", flexDirection: "row" }}>
                <input disabled={!connected} style={{ flexGrow: 1, marginRight: 10, fontFamily: "monospaced", fontSize: 16 }} ref={(element) => { this.input = element; }}
                       value={ input } onChange={(e) => { this.setState({ input: e.target.value }) }} />
                <Button disabled={!connected} style={{ flexShrink: 0, background: connected ? undefined : "rgba(0, 0, 0, 0.25)" }} className={"icon " + (connected ? "active" : "disabled")} type={"submit"}>
                    <i className="material-icons"> keyboard_return </i>
                </Button>
            </form>
        </SerialWrapper>
    }
}
