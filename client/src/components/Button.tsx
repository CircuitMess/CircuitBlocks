import styled from 'styled-components';

interface Colors {
  [name: string]: {
    backgroundColor: string;
    color: string;
    boxShadow?: string;
  };
}

const colors: Colors = {
  red: {
    backgroundColor: '#E3384D',
    color: 'white'
  },
  blue: {
    backgroundColor: '#1045BA',
    color: 'white'
  },
  teal: {
    backgroundColor: '#00BED6',
    color: 'white'
  },
  white: {
    backgroundColor: '#ffffff',
    color: '#595959'
  },
  noFill: {
    backgroundColor: ' none',
    boxShadow: 'none',
    color: '#595959'
  }
};

const Button = styled.button`
  border: none;
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
  color: white;

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
    cursor: no-drop;
  }

  &:last-child {
    margin-right: 0px !important;
  }

  i.material-icons,
  .text {
    color: ${(props) =>
      props && props.color ? colors[props.color] && colors[props.color].color : 'white'};
    display: inline-block;
    line-height: 24px;
    vertical-align: middle;
  }

  .text {
    color: ${(props) =>
      props && props.color ? colors[props.color] && colors[props.color].color : 'white'};
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

export default Button;
