import React, { useState } from 'react';
import styled from 'styled-components';

import { HomeHeader } from '../../components/Header';
import Section from './components/Section';

import home from '../../assets/images/home.png';

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
`;

const BackgroundImage = styled.div`
  background: url(${home}) no-repeat center center;
  background-size: 100%;
  height: 400px;
`;

const Home = (props) => {
  const { closeHome, open } = props;

  const examples = [
    {
      title: 'Tutorial 1',
      lastEdited: '10 min ago',
      image: 'foobar',
      filename: 'Tutorial_1/asd.xml'
    },
    {
      title: 'Tutorial 2',
      lastEdited: '10 min ago',
      image: 'foobar',
      filename: 'Tutorial_1/foo.xml'
    },
    {
      title: 'Tutorial 3',
      lastEdited: '10 min ago',
      image: 'foobar',
      filename: 'Tutorial_1/foobar.xml'
    },
    {
      title: 'Tutorial 4',
      lastEdited: '10 min ago',
      image: 'foobar',
      filename: 'Tutorial_2/gfhj.xml'
    },
    {
      title: 'Tutorial 5',
      lastEdited: '10 min ago',
      image: 'foobar',
      filename: 'Tutorial_2/nesto.xml'
    }
  ];

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;

  ipcRenderer.once('save', (event, arg) => {
    // setText(arg);
    if (arg.error) {
      console.error(arg.error);
    } else {
      console.log('Saved');
    }
  });
  const save = () => {
    ipcRenderer.send('save', { filename: 'albert1.xml', data: 'nestooooooooo' });
  };

  ipcRenderer.on('load', (event, arg) => {
    // setText(arg);
    if (arg.error) {
      console.error(arg.error);
    } else {
      console.log(arg.data);
    }
  });
  const load = () => {
    ipcRenderer.send('load', { filename: 'albert1.xml' });
  };

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  console.log('foobar');

  ipcRenderer.on('listFiles', (event, arg) => {
    // setText(arg);
    if (arg.error) {
      console.error(arg.error);
    } else {
      console.log(arg.data);
      setProjects(arg.data);
      setLoading(false);
    }
  });
  const listFiles = () => {
    ipcRenderer.send('listFiles');
  };

  React.useEffect(() => {
    ipcRenderer.send('listFiles');
    document.querySelector('body').classList.add('logged-in');
  }, []);

  return (
    <>
      {/* <Wrapper> */}
      {/* <BackgroundImage /> */}
      <div class="bg-cover shrink"></div>
      <HomeHeader onPressLogo={closeHome} />
      {/* <button type="button" onClick={load}>
        Load file
      </button>
      <button type="button" onClick={save}>
        Save file
      </button>
      <button type="button" onClick={listFiles}>
        List files
      </button> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Section title="My Projects" items={projects} open={open} closeHome={closeHome} project />
          <Section title="Examples" items={examples} open={open} closeHome={closeHome} />
        </>
      )}
      {/* </Wrapper> */}
    </>
  );
};

export default Home;
