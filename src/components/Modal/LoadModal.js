import React from "react";
import Modal from "./Modal";
import { useAppStateValue } from "../../contexts/AppContext";

const LoadModal = props => {
  const { load } = props;
  const [appState, appDispatch] = useAppStateValue();

  const loadOnChange = e => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onloadend = e => {
      if (e.returnValue) {
        load(fr.result);
        appDispatch({ type: "closeModal" });
      }
    };
    fr.readAsText(file);
  };

  return (
    <Modal>
      <h1>Load Modal</h1>
      <form>
        <input type="file" accept=".xml" onChange={loadOnChange} />
      </form>
    </Modal>
  );
};

export default LoadModal;
