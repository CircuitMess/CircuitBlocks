import React from "react";

import Alert from "./Alert";
import Modal from "./Modal";
import { useAppStateValue } from "../contexts/AppContext";

const Popups = props => {
  const [appState, appDispatch] = useAppStateValue();

  const { isAlertOpen } = appState;
  const { load } = props;

  return (
    <>
      {isAlertOpen && <Alert />}
      <Modal load={load} />
    </>
  );
};

export default Popups;
