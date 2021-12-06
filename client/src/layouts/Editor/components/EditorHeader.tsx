import React, {useState} from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Progressbar from './ProgressBar';
import {Devices} from "../../Home";
import {AllElectron, IpcRenderer} from "electron";
import ReactTooltip from 'react-tooltip';


const StyledHeader = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background: #191919;
  padding: 12px;
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .left {
    display: inline-block;
    position: absolute;
    top: 12px;
    left: 12px;
    text-align: left;
  }

  .right {
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 12px;
    text-align: right;
  }

  .title {
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
    line-height: 0px;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .row h3 {
    margin: 0;
  }

  .circle {
    margin-left: 12px;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .circle.red {
    background-color: red;
  }

  .circle.green {
    background-color: green;
  }
`;

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface Props {
  home: () => void;
  title: string;
  load: () => void;
  save: () => void;
  toggle: () => void;
  run: () => void;
  isSpriteOpen: boolean;
  isCodeOpen: boolean;
  connected: boolean;
  isSerialOpen: boolean;
  openSpriteEditor: () => void;
  openSerial: () => void;
  exportBinary: () => void;
  codeButton: boolean;
  minimalCompile: boolean;
  toggleMinimal: () => void;
  device: string;
  spriteEditorButton: boolean;
}

const EditorHeader: React.FC<Props> = (props) => {
  const {
    home,
    title,
    load,
    save,
    toggle,
    run,
    isSpriteOpen,
    isCodeOpen,
    connected,
    isSerialOpen,
    openSerial,
    exportBinary,
    codeButton,
    minimalCompile,
    toggleMinimal,
    device,
    openSpriteEditor,
    spriteEditorButton
  } = props;

  const [ runningPercentage, setRunningPercentage ] = useState(0);
  const [ runningStage, setRunningStage ] = useState("DONE");
  const [ running, setRunning ] = useState(false);

  const stage = runningStage == "UPLOAD" ? "Uploading" : "Compiling";

  ipcRenderer.on("runprogress", (event: any, args: any) => {
    if(args.stage == "DONE" || args.cancel){
      setRunning(false);
      setRunningStage("DONE");
      setRunningPercentage(0);
      return;
    }

    let progress = args.stage == "UPLOAD" ? 50 : 0;
    progress += args.progress / 2;

    if(args.stage == "EXPORT"){
      progress *= 2;
    }

    if(progress == 0) progress = 0.1;
    if(progress == 0.5) progress = 0.56;

    setRunningPercentage(progress);
    setRunningStage(args.stage);
    setRunning(true);
  });

  return (
    <StyledHeader>
      {running && runningPercentage && <Progressbar percentage={runningPercentage} />}

      <div className="left">
        <Button className="icon" onClick={home}>
          <i className="material-icons" data-tip="Home" data-for="goBack" data-iscapture="true"> arrow_back </i>
        </Button>
        <ReactTooltip
            id="goBack"
            place="bottom"
            type="dark"
        />
        <Button className="icon mr-1" onClick={save}>
          <i className="material-icons" data-tip="Save sketch" data-for="saveButton" data-iscapture="true"> save </i>
        </Button>
        <ReactTooltip
            id="saveButton"
            place="bottom"
            type="dark"
        />
        <div className="title">{title}</div>
      </div>

      <div className="center">
        <div className="row">
          <h3>{ Devices[device].name } {connected ? 'connected' : 'disconnected'}</h3>
          <div className={`circle ${connected ? 'green' : 'red'}`}></div>
        </div>
      </div>

      <div className="right">
        { null && <Button className="icon" onClick={load}>
          <i className="material-icons"> folder_open </i>
        </Button> }
        { spriteEditorButton && <Button className={`icon red ${isSpriteOpen ? 'active' : ''}`} onClick={openSpriteEditor} >
          <i className="material-icons" data-tip="Sprite editor" data-for="openFolder" data-iscapture="true"> brush </i>
        </Button> }
        <Button className={`icon`} onClick={exportBinary} >
          <i className="material-icons" data-tip="Export binary" data-for="openFolder" data-iscapture="true"> save_alt </i>
        </Button>
        <ReactTooltip
            id="openFolder"
            place="bottom"
            type="dark"
        />
        <Button className={`icon yellow mr-1 ${isSerialOpen ? 'active' : ''}`} onClick={openSerial}  data-tip="Serial monitor" data-for="serialMonitor" data-iscapture="true">
          <i className="material-icons"> call_to_action </i>
        </Button>
        <ReactTooltip
            id="serialMonitor"
            place="bottom"
            type="dark"
        />
        { codeButton && <Button className={`icon-text mr-1 ${isCodeOpen ? 'active' : ''}`} onClick={toggle}>
          <div className="text"> {isCodeOpen ? 'Close' : 'Open'} Code </div>
          <i className="material-icons"> code </i>
        </Button> }
        { device == "cm:esp32:ringo" && <Button className={`icon yellow ${minimalCompile ? 'active' : ''}`} onClick={toggleMinimal}>
          <div className="text"> minimal </div>
          <i></i>
        </Button> }
        <Button
          className={`icon-text ${running ? 'running' : ''} ${!connected ? 'disabled' : ''}`}
          color="red"
          onClick={run}
          disabled={!connected}
        >
          <div className="text">{running ? stage : 'Run'}</div>
          <i className={`material-icons ${running ? 'rotating' : ''}`}> play_arrow </i>
        </Button>
      </div>
    </StyledHeader>
  );
};

export default EditorHeader;
