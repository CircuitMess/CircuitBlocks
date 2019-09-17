import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../Button';

const AlertBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
`;

const AlertDiv = styled.div`
  z-index: 1200;
  position: absolute;
  top: 50%;
  left: 50%;
  min-height: 180px;
  min-width: 300px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  padding: 10px 50px;
  text-align: center;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-around;

  button,
  div {
    color: black;
  }
`;

interface Props {
  initValue: string;
  callback: (value: string) => void;
  closePrompt: () => void;
  promptText: string;
}

const Prompt: React.FC<Props> = (props) => {
  const { initValue, callback, closePrompt, promptText } = props;
  const [value, setValue] = useState(initValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(value);
    closePrompt();
  };

  const close = () => {
    callback(initValue);
    closePrompt();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <AlertBackdrop onClick={close} />
      <AlertDiv>
        <h2>{promptText}</h2>

        <form onSubmit={onSubmit}>
          <input type="text" value={value} onChange={handleChange} autoFocus />
          <Footer>
            <Button onClick={close} color="danger">
              Close
            </Button>
            <Button color="success" type="submit">
              Save
            </Button>
          </Footer>
        </form>
      </AlertDiv>
    </>
  );
};

export default Prompt;
