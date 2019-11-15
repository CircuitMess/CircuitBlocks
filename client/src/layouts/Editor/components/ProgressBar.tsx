import styled from 'styled-components';

interface Props {
  percentage: number;
}

const ProgressBar = styled.div<Props>`
  position: absolute;
  top: 54px;
  left: 0;
  height: 6px;
  width: ${(props) => `${props.percentage}%`};
  background-color: #ffc52d;
  transition-duration: 0.2s;
`;

export default ProgressBar;
