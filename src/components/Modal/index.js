import React from "react";

import SaveModal from "./SaveModal";
import LoadModal from "./LoadModal";

const Modal = props => {
  const { isModalOpen, modalType, xmlText, load, closeModal } = props;

  if (!isModalOpen) {
    return null;
  }

  switch (modalType) {
    case "save":
      return <SaveModal close={closeModal} xmlText={xmlText} />;
    case "load":
      return <LoadModal close={closeModal} load={load} />;
    default:
      return null;
  }
};

export default Modal;
