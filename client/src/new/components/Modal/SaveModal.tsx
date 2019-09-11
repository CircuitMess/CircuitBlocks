import React from 'react';

import Modal, { Props } from './Modal';

interface SaveModalProps extends Props {
  filename: string;
  filenameError?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SaveModal: React.FC<SaveModalProps> = ({
  filename,
  filenameError,
  onChange,
  onSubmit,
  ...props
}) => {
  return (
    <Modal {...props}>
      <h4> Save sketch </h4>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Untitled Project"
          value={filename}
          onChange={onChange}
        ></input>
        <label>{filenameError}</label>
      </form>
    </Modal>
  );
};

export default SaveModal;
