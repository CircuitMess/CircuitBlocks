import React from 'react';

import HeaderBase from './HeaderBase';
import HeaderItem from './HeaderItem';

import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/profile.png';

const HomeHeader = (props) => {
  const { closeHome } = props;

  return (
    <div class="section bg-image">
      <div class="header">
        <div class="left">
          <img class="logo" src={logo} />
        </div>
        <div class="right">
          <div class="profile">
            <div class="name">Albert Gajsak</div>
            <img class="picture" src={profile} />

            <div class="dropdown">
              <div class="item">
                <div class="text">Change Variable name</div>
              </div>
              <div class="item">
                <div class="text">Collapse Block</div>
              </div>
              <div class="item">
                <div class="text">Duplicate</div>
              </div>
              <div class="item">
                <div class="text">Add Comment</div>
              </div>
              <div class="item">
                <div class="text">Disable Block</div>
              </div>
              <div class="item">
                <div class="text">Remove Block</div>
              </div>
              <div class="item">
                <div class="text">Help</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
