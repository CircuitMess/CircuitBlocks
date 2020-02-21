import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Progressbar from './ProgressBar';

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

interface Props {
  home: () => void;
  title: string;
  load: () => void;
  save: () => void;
  toggle: () => void;
  run: () => void;
  isCodeOpen: boolean;
  running: boolean;
  runningStage?: string;
  runningPercentage?: number;
  connected: boolean;
  isSerialOpen: boolean;
  openSerial: () => void;
  exportBinary: () => void;
  codeButton: boolean;
  minimalCompile: boolean;
  toggleMinimal: () => void;
}

const EditorHeader: React.FC<Props> = (props) => {
  const {
    home,
    title,
    load,
    save,
    toggle,
    run,
    isCodeOpen,
    connected,
    running,
    runningStage,
    runningPercentage,
    isSerialOpen,
    openSerial,
    exportBinary,
    codeButton,
    minimalCompile,
    toggleMinimal
  } = props;

  const stage = runningStage == "UPLOAD" ? "Uploading" : "Compiling";

  return (
    <StyledHeader>
      {running && runningPercentage && <Progressbar percentage={runningPercentage} />}

      <div className="left">
        <Button className="icon" onClick={home}>
          <i className="material-icons"> arrow_back </i>
        </Button>
        <Button className="icon mr-1" onClick={save}>
          <i className="material-icons"> save </i>
        </Button>
        <div className="title">{title}</div>
      </div>

      <div className="center">
        <div className="row">
          <h3>Ringo {connected ? 'connected' : 'disconnected'}</h3>
          <div className={`circle ${connected ? 'green' : 'red'}`}></div>
        </div>
      </div>

      <div className="right">
        { null && <Button className="icon" onClick={load}>
          <i className="material-icons"> folder_open </i>
        </Button> }
        <Button className={`icon`} onClick={exportBinary}>
          <i className="material-icons"> save_alt </i>
        </Button>
        <Button className={`icon yellow mr-1 ${isSerialOpen ? 'active' : ''}`} onClick={openSerial}>
          <i className="material-icons"> call_to_action </i>
        </Button>
        { codeButton && <Button className={`icon-text mr-1 ${isCodeOpen ? 'active' : ''}`} onClick={toggle}>
          <div className="text"> {isCodeOpen ? 'Close' : 'Open'} Code </div>
          <i className="material-icons"> code </i>
        </Button> }
        <Button className={`icon yellow ${minimalCompile ? 'active' : ''}`} onClick={toggleMinimal}>
          <div className="text"> minimal </div>
          <i></i>
        </Button>
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
