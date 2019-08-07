import React from "react";

import HeaderBase from "./HeaderBase";
import HeaderItem from "./HeaderItem";

const HomeHeader = (props) => {
  const { closeHome } = props;

  return (
    <HeaderBase onPressLogo={closeHome}>
      <HeaderItem center disabled>
        <p>Home</p>
      </HeaderItem>
      <HeaderItem right>
        <p>Login</p>
      </HeaderItem>
    </HeaderBase>
  );
};

export default HomeHeader;
