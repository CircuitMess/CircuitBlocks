import styled from "styled-components";

const colors = {
  primary: {
    main: "#ddd",
    pressed: "#ccc"
  },
  secondary: {
    main: "#aaa",
    pressed: "#999"
  },
  success: {
    main: "#6d6",
    pressed: "#2c2"
  },
  danger: {
    main: "#d66",
    pressed: "#c22"
  }
};

const Button = styled.div`
  border-radius: 4px;
  min-width: 40px;
  width: 100px;
  padding: 4px;
  cursor: pointer;
  text-align: center;

  font-size: 12px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: ${(props) =>
    (colors[props.color] && colors[props.color].main) || colors.primary.main};

  :hover {
    background-color: ${(props) =>
      (colors[props.color] && colors[props.color].pressed) ||
      colors.primary.pressed};
  }
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  min-width: 40px;
  width: 100px;
  padding: 4px;
  cursor: pointer;
  text-align: center;

  font-size: 12px;

  border: none;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: ${(props) =>
    (colors[props.color] && colors[props.color].main) || colors.primary.main};

  :hover {
    background-color: ${(props) =>
      (colors[props.color] && colors[props.color].pressed) ||
      colors.primary.pressed};
  }
`;

export default Button;
export { SubmitButton };
