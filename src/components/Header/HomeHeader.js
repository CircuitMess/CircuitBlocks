import React from "react";

import HeaderaBase from "./HeaderBase";
import HeaderItem from "./HeaderItem";

const HomeHeader = props => {
  const { closeHome } = props;

  return (
    <HeaderaBase onPressLogo={closeHome}>
      <HeaderItem>
        <p>Run</p>
      </HeaderItem>
      <HeaderItem className="right">
        <p>Login</p>
      </HeaderItem>
    </HeaderaBase>
  );
};

export default HomeHeader;
