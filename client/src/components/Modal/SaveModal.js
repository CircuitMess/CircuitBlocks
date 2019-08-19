import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import Modal from './Modal';
import { useAppStateValue } from '../../contexts/AppContext';

const sanitizeName = (name) => name.replace(/ /g, '_').replace(/\./g, '');

const SaveModal = (props) => {
  const [name, setName] = useState('');
  const [appState, appDispatch] = useAppStateValue();
  const { saveXml } = appState;

  const onSubmit = (e) => {
    e.preventDefault();
    const sanitizedName = sanitizeName(name);

    if (sanitizedName.length > 0) {
      const blob = new Blob([saveXml], {
        type: 'application/xml;charset=utf-8'
      });
      saveAs(blob, `${sanitizedName}.xml`);
      appDispatch({ type: 'closeModal' });
    }
  };

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;

  ipcRenderer.once('save', (event, arg) => {
    if (arg.error) {
      alert(arg.error);
    } else {
      appDispatch({ type: 'closeModal' });
    }
  });

  const save = () => {
    ipcRenderer.send('save', { filename: `${sanitizeName(name)}.xml`, data: saveXml });
  };

  console.log('Foobar');

  return (
    <Modal>
      <p>Save as</p>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="button" onClick={save}>
          Save
        </button>
        <button type="submit">Save as</button>
      </form>
    </Modal>
  );
};

export default SaveModal;
