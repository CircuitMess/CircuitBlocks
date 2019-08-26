import React from 'react';
import styled from 'styled-components';

import SectionItem from './SectionItem';
import NewProject from './NewProject';

const Title = styled.h2`
  padding: 0;
  margin: 0;
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const SectionHeader = styled.div`
  margin: 40px 80px 20px 80px;
`;

const SectionContainer = styled.div`
  width: 100%;
  height: 155px;
  display: flex;
  flex-direction: row;
  overflow-x: hidden; /* scroll */
  overflow-y: hidden;
`;

const Section = (props) => {
  const { title, items, open, closeHome, project } = props;

  const openNew = () => {
    open();
    closeHome();
  };

  const openFile = (filename) => {
    open(filename);
    closeHome();
  };

  return (
    <div class="section">
      <h2>{title}</h2>
      <div class="card-container">
        {/* {project && <NewProject onClick={openNew} />} */}
        {items &&
          items.map((item, index) => (
            <SectionItem
              key={`SectionItem${item.title || item}|${title}`}
              {...(project ? { title: item } : { ...item })}
              onClick={() => openFile(item.filename)}
              first={!project && index === 0}
            />
          ))}
      </div>
    </div>
  );
};

export default Section;
