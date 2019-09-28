import styled from 'styled-components';

interface Props {
  percentage: number;
}

const ProgressBar = styled.div<Props>`
  position: absolute;
  top: 56px;
  left: 0;
  height: 4px;
  width: ${(props) => `${props.percentage}%`};
  background-color: green;
  transition-duration: 0.2s;
`;

export default ProgressBar;
