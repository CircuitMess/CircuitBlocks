import React from "react";
import { SectionItemWrapper } from "./SectionItem";

const NewProject = (props) => {
  const { onClick } = props;

  return (
    <SectionItemWrapper first onClick={onClick}>
      <h1>New project</h1>
    </SectionItemWrapper>
  );
};

export default NewProject;
