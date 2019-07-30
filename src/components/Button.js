import styled from "styled-components";

const colors = {
  primary: {
    main: "#ddd",
    pressed: "#ccc"
  },
  secondary: {
    main: "#aaa",
    pressed: "#999"
  }
};

const Button = styled.div`
  border-radius: 4px;
  min-width: 40px;
  width: 100px;
  padding: 4px;
  cursor: pointer;
  text-align: center;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: ${props =>
    (colors[props.color] && colors[props.color].main) || colors.primary.main};

  :hover {
    background-color: ${props =>
      (colors[props.color] && colors[props.color].pressed) ||
      colors.primary.pressed};
  }
`;

export default Button;
