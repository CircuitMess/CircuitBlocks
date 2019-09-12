import styled from 'styled-components';

export const Login = styled.div`
  width: 400px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition-duration: 0.3s;
  opacity: 1;

  &.log-in {
    transform: translate(-50%, -65%);
    transition-duration: 0.3s;
    opacity: 0;
  }
`;
