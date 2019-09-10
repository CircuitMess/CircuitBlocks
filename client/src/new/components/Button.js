import styled from 'styled-components';

const Button = styled.div`
  -moz-user-select: none;
  user-select: none;
  display: inline-block;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  margin-right: 12px;
  cursor: pointer;
  padding: 6px;
  transition-duration: 0.3s;

  &.long {
    width: 100%;
    box-sizing: border-box;
  }
  &.mid {
    min-width: 50%;
  }

  &:hover {
    opacity: 0.8;
    transition-duration: 0.1s;
  }
  &:active,
  &.selected {
    opacity: 0.5;
    transition-duration: 0.1s;
  }

  &:active:not(.disabled) {
    transform: translateY(2px);
  }

  &.disabled {
    opacity: 0.25;
  }

  &:last-child {
    margin-right: 0px !important;
  }

  i.material-icons,
  .text {
    display: inline-block;
    line-height: 24px;
    vertical-align: middle;
  }

  .text {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    height: 24px;
    margin-right: 4px;
    margin-left: 4px;
  }

  &.active {
    background-color: #2f2fb5;
  }

  &.running {
    background-color: #e3384d80;
  }

  ${(props) => props.color && colors[props.color]}
`;

const colors = {
  red: {
    background: '#E3384D',
    color: 'white'
  },
  blue: {
    background: '#1045BA',
    color: 'white'
  },
  teal: {
    background: '#00BED6',
    color: 'white'
  },
  white: {
    background: '#ffffff',
    color: '#595959'
  },
  noFill: {
    backgroundColor: ' none',
    boxShadow: 'none'
  }
};

export default Button;
