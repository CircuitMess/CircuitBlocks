import styled from 'styled-components';

const position = (props) => {
  if (props.right) {
    return {
      position: 'absolute',
      right: 0
    };
  }
  if (props.center) {
    return {
      position: 'relative',
      margin: '0 auto'
    };
  }
};

const Item = styled.div`
  height: 64px;
  padding: 0px 20px;
  text-align: center;
  align-items: center;
  color: white;
  ${(props) => !props.disabled && { cursor: 'pointer' }}

  :hover {
    ${(props) => (props.disabled ? null : { backgroundColor: 'rgba(0, 0, 0, 0.1)' })}
  }

  ${position}
`;

export default Item;
