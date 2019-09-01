import React from 'react';
import styled from 'styled-components';

import Dropdown from './Dropdown';

const ProfileWrapper = styled.div`
  .name {
    display: block;
    position: absolute;
    right: 64px;
    top: 50%;
    transform: translateY(-50%);
    width: 50vw;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
  }
  .picture {
    display: inline-block;
    height: 42px;
    width: 42px;
    border-radius: 21px;
    margin: 8px;
  }

  .dropdown {
    position: absolute;
    padding: 8px;
    box-sizing: border-box;
    background: #fafafa;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    opacity: 1;
    transition-duration: 0.1s;
    display: none;
    min-width: 100px;
  }

  .dropdown .item {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    padding: 6px 8px;
    background: rgba(16, 69, 186, 0);
    border-radius: 4px;
    text-align: left;
    line-break: strict;
    color: #595959;
    cursor: pointer;
    white-space: nowrap;
  }
  .dropdown .item:not(:last-child) {
    margin-bottom: 4px;
  }
  .dropdown .item:hover {
    background: rgba(16, 69, 186, 0.1);
    color: #1045ba;
  }

  & > .dropdown {
    top: 100%;
    right: 12px;
  }
  &:hover > .dropdown {
    display: block;
  }
`;

const Profile = (props) => {
  const { username, image_url } = props;

  return (
    <ProfileWrapper>
      <div className="name">{username}</div>
      <img className="picture" src={image_url} alt={username} />

      <div className="dropdown">
        <div className="item">
          <div className="text">Help</div>
        </div>
        <div className="item">
          <div className="text">Logout</div>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
