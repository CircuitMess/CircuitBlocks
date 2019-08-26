import React from 'react';
import styled from 'styled-components';

const SectionItemWrapper = styled.div`
  display: inline-block;
  width: 240px;
  height: 140px;
  margin: 0 6px;
  flex-shrink: 0;

  cursor: pointer;

  margin-left: ${(props) => (props.first ? '80px' : '6px')};
  background-color: #fff;
`;

const SectionItem = (props) => {
  const { first, onClick, title, lastEdited, image } = props;

  return (
    <div class="card" onClick={onClick}>
      <div class="image"></div>
      <div class="cover">
        <div class="title">{title}</div>
        <div class="author">{lastEdited}</div>
        <div class="description">{image}</div>
      </div>
    </div>
  );
};

export default SectionItem;
export { SectionItemWrapper };
