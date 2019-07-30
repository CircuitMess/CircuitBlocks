import React, { useState } from "react";
import { saveAs } from "file-saver";

import Modal from "./Modal";

const sanitizeName = name => name.replace(/ /g, "_").replace(/\./g, "");

const SaveModal = props => {
  const { close, xmlText } = props;
  const [name, setName] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const sanitizedName = sanitizeName(name);

    if (sanitizedName.length > 0) {
      const blob = new Blob([xmlText], {
        type: "application/xml;charset=utf-8"
      });
      saveAs(blob, `${sanitizedName}.xml`);
      close();
    }
  };

  return (
    <Modal close={close}>
      <h1>Save Modal</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default SaveModal;
