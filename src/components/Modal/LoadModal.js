import React from "react";
import Modal from "./Modal";

const LoadModal = props => {
  const { close, load } = props;

  const loadOnChange = e => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onloadend = e => {
      if (e.returnValue) {
        load(fr.result);
        close();
      }
    };
    fr.readAsText(file);
  };

  return (
    <Modal close={close}>
      <h1>Load Modal</h1>
      <form>
        <input type="file" accept=".xml" onChange={loadOnChange} />
      </form>
    </Modal>
  );
};

export default LoadModal;
