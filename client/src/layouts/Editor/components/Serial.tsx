import React from 'react';
import styled from 'styled-components';

const SerialWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-200px) translateY(-200px);
  height: 400px;
  width: 400px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 100000;
`;

const Serial = ({ serial }: { serial: string }) => {
  return <SerialWrapper>{serial}</SerialWrapper>;
};

export default Serial;
