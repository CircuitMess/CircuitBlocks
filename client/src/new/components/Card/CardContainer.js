import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 20px;
`;

export default CardContainer;
