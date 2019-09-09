import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin: 8px 0 32px 0;
  }

  .icons {
    position: absolute;
    right: 24px;
    top: 29px;
  }

  .icons i {
    margin-left: 12px;
    cursor: pointer;
  }
`;

interface Props {
  closeCode: () => void;
  fullScreenToggle: () => void;
  toggleTheme: () => void;
  theme: string;
}

const CodeHeader: React.FC<Props> = (props) => {
  const { closeCode, fullScreenToggle, toggleTheme } = props;

  return (
    <Wrapper>
      <div className="title"> Code </div>
      <div className="icons">
        <i className="material-icons" onClick={toggleTheme}>
          lightbulb
        </i>
        <i className="material-icons" onClick={fullScreenToggle}>
          fullscreen
        </i>
        <i className="material-icons" onClick={closeCode}>
          close
        </i>
      </div>
    </Wrapper>
  );
};

export default CodeHeader;
