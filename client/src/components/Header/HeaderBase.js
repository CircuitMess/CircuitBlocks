import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  height: 64px;
  width: 100%;
  background-color: #1045ba;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 20px;

  .logo {
    height: 64px;
  }
`;

const HeaderaBase = (props) => {
  const { onPressLogo, children } = props;

  return (
    <HeaderDiv>
      <img
        className="logo"
        src={require('../../assets/images/logo.png')}
        alt="logo"
        onClick={onPressLogo}
      />
      {children}
    </HeaderDiv>
  );
};

export default HeaderaBase;
