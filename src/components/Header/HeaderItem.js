import styled from "styled-components";

const Item = styled.div`
  height: 64px;
  padding: 0px 20px;
  text-align: center;
  align-items: center;
  color: white;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.right
      ? {
          position: "absolute",
          right: 0
        }
      : null}
`;

export default Item;
