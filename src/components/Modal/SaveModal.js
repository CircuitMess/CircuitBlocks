import React, { useState } from "react";
import { saveAs } from "file-saver";

import Modal from "./Modal";
import { useAppStateValue } from "../../contexts/AppContext";

const sanitizeName = name => name.replace(/ /g, "_").replace(/\./g, "");

const SaveModal = props => {
  const [name, setName] = useState("");
  const [appState, appDispatch] = useAppStateValue();
  const { saveXml } = appState;

  const onSubmit = e => {
    e.preventDefault();
    const sanitizedName = sanitizeName(name);

    if (sanitizedName.length > 0) {
      const blob = new Blob([saveXml], {
        type: "application/xml;charset=utf-8"
      });
      saveAs(blob, `${sanitizedName}.xml`);
      appDispatch({ type: "closeModal" });
    }
  };

  return (
    <Modal>
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
