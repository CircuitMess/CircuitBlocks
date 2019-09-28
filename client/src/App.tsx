import React, { useState } from 'react';

import { Alert } from './components/Modal';
import { Home, Editor } from './layouts';

import './tmp.css';
import './assets/material_icons.css';
import './assets/poppins.css';
import './assets/source_code_pro.css';
import InstallInfo from "./components/InstallInfo";

const App = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [filename, setFilename] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const monacoRef = React.createRef();
  const blocklyRef = React.createRef<Editor>();

  const openHome = () => {
    (blocklyRef.current as any).cleanup();
    setIsEditorOpen(false);
  };

  const openEditor = (data: string, filename?: string) => {
    (blocklyRef.current as any).load(data);
    setFilename(filename || '');
    setIsEditorOpen(true);
  };

  const closeAlert = () => {
    console.log('No :(');
    setIsAlertOpen(false);
  };

  const okAlert = () => {
    console.log('Ok');
    setIsAlertOpen(false);
  };

  return (
    <>
      {isAlertOpen && (
        <Alert title="Foobar" body="Something......" close={closeAlert} yes={okAlert} />
      )}
      <InstallInfo />
      <Home isEditorOpen={isEditorOpen} openEditor={openEditor} />
      <Editor
        isEditorOpen={isEditorOpen}
        title={filename}
        setFilename={setFilename}
        openHome={openHome}
        monacoRef={monacoRef}
        ref={blocklyRef}
      />
    </>
  );
};

export default App;
