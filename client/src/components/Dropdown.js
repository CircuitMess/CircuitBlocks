import styled from 'styled-components';

const Dropdown = styled.div`
  position: absolute;
  padding: 8px;
  box-sizing: border-box;
  background: #fafafa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  opacity: 1;
  transition-duration: 0.1s;
  display: none;

  & ::before {
    content: '';
    position: absolute;
    right: 8px;
    bottom: calc(100%);
    width: 16px;
    height: 12px;
    background-image: url('/resources/SVG/Arrow.svg');
  }

  & .item {
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

  & .item:not(:last-child) {
    margin-bottom: 4px;
  }

  & .item:hover {
    background: rgba(16, 69, 186, 0.1);
    color: #1045ba;
  }
`;

export default Dropdown;
