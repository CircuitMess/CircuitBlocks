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

  const errors: any = {
    EMPTY: "You can't save a sketch with no name.",
    EXISTS: "A sketch with that name already exists."
  };

  return (
    <Modal {...props} title={"Save sketch"}>
      <form onSubmit={onSubmit}>
        <input
            autoFocus
          type="text"
          value={filename}
          onChange={onChange}
          className={ filenameError ? "error" : undefined }
        ></input>
        <p style={{ paddingTop: 5, color: "#a00" }}>{ filenameError && errors[filenameError] }</p>
      </form>
    </Modal>
  );
};

export default SaveModal;
