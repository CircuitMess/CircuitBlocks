import React from 'react';

import SaveModal from './SaveModal';
import LoadModal from './LoadModal';
import { useAppStateValue } from '../../contexts/AppContext';

const Modal = (props) => {
  const { load } = props;
  const [appState, appDispatch] = useAppStateValue();
  const { isModalOpen, modalType } = appState;

  if (!isModalOpen) {
    return null;
  }

  switch (modalType) {
    case 'save':
      return <SaveModal />;
    case 'load':
      return <LoadModal load={load} />;
    default:
      return null;
  }
};

export default Modal;
