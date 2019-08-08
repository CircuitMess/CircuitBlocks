import React, { useState } from 'react';

import Modal from './Modal';
import { useAppStateValue } from '../../contexts/AppContext';

const LoadModal = (props) => {
  const { load } = props;
  const [appState, appDispatch] = useAppStateValue();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const loadOnChange = (e) => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onloadend = (e) => {
      if (e.returnValue) {
        load(fr.result);
        appDispatch({ type: 'closeModal' });
      }
    };
    fr.readAsText(file);
  };

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;

  ipcRenderer.once('listFiles', (event, arg) => {
    if (arg.error) {
      setItems({ error: true });
    } else {
      setItems({ error: false, data: arg.data });
    }

    setLoading(false);
  });

  React.useEffect(() => {
    ipcRenderer.send('listFiles');
  }, []);

  ipcRenderer.once('load', (event, arg) => {
    if (arg.error) {
      alert('error');
    } else {
      console.log(arg.data);
      load(arg.data);
      appDispatch({ type: 'closeModal' });
    }
  });

  const open = (item) => {
    ipcRenderer.send('load', { filename: item });
  };

  const itemsJSX = items.error ? (
    <p>Error</p>
  ) : (
    <ul>
      {items.data &&
        items.data.map((item) => (
          <li key={item} onClick={() => open(item)} style={{ cursor: 'pointer' }}>
            {item}
          </li>
        ))}
    </ul>
  );

  return (
    <Modal>
      <form>
        <input type="file" accept=".xml" onChange={loadOnChange} />
      </form>
      {loading ? <p>Loading...</p> : itemsJSX}
    </Modal>
  );
};

export default LoadModal;
