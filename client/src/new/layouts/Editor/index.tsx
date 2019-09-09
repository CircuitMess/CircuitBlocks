import React, { useState } from 'react';

import EditorHeader from '../../components/EditorHeader';
import * as Modal from '../../components/Modal';

interface EditorProps {
  isEditorOpen: boolean;
  openHome: () => void;
  title: string;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { isEditorOpen, openHome, title } = props;
  const [isModalOpen, setIsModalOpen] = useState(true);

  const run = () => {
    console.log('RUN');
  };

  const load = () => {
    console.log('Load');
  };

  const save = () => {
    console.log('Save');
  };

  const toggle = () => {
    console.log('Toggle');
  };

  const saveExternal = () => {
    console.log('save external');
  };

  const close = () => {
    console.log('close');
  };

  const footer = {
    left: [{ text: 'Save externally', onClick: saveExternal }],
    right: [
      { text: 'Cancel', onClick: close },
      { text: 'Save', onClick: save, color: 'blue' },
      { text: 'Save', onClick: save, color: 'blue', disabled: true }
    ]
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={isEditorOpen ? '' : 'd-none'}>
      {isModalOpen && (
        <Modal.Modal footer={footer} title="Modal title" close={closeModal}>
          <h1>Foobar</h1>
          <h1>Foobar</h1>
        </Modal.Modal>
      )}
      <EditorHeader
        home={openHome}
        load={load}
        run={run}
        title={title}
        save={save}
        toggle={toggle}
      />
    </div>
  );
};

export default Editor;
