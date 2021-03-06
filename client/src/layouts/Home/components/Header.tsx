import React from 'react';
import styled from 'styled-components';
import Section from '../../../components/Section';
import {Button} from "semantic-ui-react";

interface StyledHeaderProps {
  loggedIn: boolean;
}

export const Header = styled.div<StyledHeaderProps>`
  position: relative;
  color: white;
  transform: translateY(0%);
  transition-duration: 0.3s;

  .left {
    position: absolute;
    left: 0;
    top: 0;
    text-align: left;
  }

  .right {
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
  }

  .right-margin {
    position: absolute;
    right: 15%;
    top: 0;
    text-align: right;
  }

  .logo {
    height: 20px;
    margin-top: 19px;
  }
  
  .ui.button.cmred {
    background-color: #E3384D;
    color: #fff;
  }
  
  .ui.button.cmred:hover {
    background-color: #c72b3e;
  }
  
  .ui.button.cmred:active {
    background-color: #b11e30;
  }

  ${(props) => !props.loggedIn && { transform: 'translateY(-80px)', transitionDuration: '0.5s' }}
`;

interface HeaderSectionProps {
  openSpencerModal: () => void;
  loggedIn: boolean;
  restoreCallback: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ loggedIn, restoreCallback, openSpencerModal }) => {
  const username = 'Albert Gajsak';
  return (
    <Section className="bg-image" style={{ boxShadow: "0 0px 5px rgba(0, 0, 0, 0.5)" }}>
      <Header loggedIn={loggedIn}>
        <div className="left">
          <img className="logo" src={require('../../../assets/images/logo.png')} alt={username} />
        </div>
        {/* <div className="right">
          <Profile username={username} image_url={require('../../../assets/images/profile.png')} />
        </div> */}
        <div className="right">
          <Button style={ { marginRight: 20 } } onClick={() => restoreCallback()}>Restore firmware</Button>
          <Button className={"cmred"} onClick={() => openSpencerModal()}>Spencer settings</Button>
        </div>
      </Header>
    </Section>
  );
};

export const HeaderImage = styled.div<StyledHeaderProps>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${require('../../../assets/images/bg/bg-01.png')});
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: translate(50px, -50px);
  transition-duration: 0.3s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;

  &.shrink {
    height: 400px;
  }

  ${(props) =>
    props.loggedIn
      ? {
          transform: 'translate(0px, 0px)',
          opacity: 1,
          transitionDuration: '0.5s',
          transitionDelay: '0s',
          transitionTimingFunction: 'ease-in-out'
        }
      : {}}
`;
