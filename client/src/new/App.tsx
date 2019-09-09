import React, { useState } from 'react';

import { Alert } from './components/Modal';
import { Home, Editor } from './layouts';

import './tmp.css';
import '../assets/material_icons.css';
import '../assets/poppins.css';
import '../assets/source_code_pro.css';

const App = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const monacoRef = React.createRef();
  // const blocklyRef = React.createRef();

  const openHome = () => {
    setIsEditorOpen(false);
  };

  const openEditor = () => {
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
      <Home isEditorOpen={isEditorOpen} openEditor={openEditor} />
      <Editor
        isEditorOpen={isEditorOpen}
        title={'Foobar'}
        openHome={openHome}
        monacoRef={monacoRef}
      />
    </>
  );
};

export default App;
