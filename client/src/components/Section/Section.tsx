import styled from 'styled-components';

const Section = styled.div`
  position: relative;
  width: 100vw;
  padding: 0 40px;
  box-sizing: border-box;
  background-color: #fafafa;
  padding-top: 48px;
  opacity: 1;
  transition-duration: 0.6s;

  &.bg-image {
    background-color: #19191900;
    padding-top: 16px;
    height: 400px;
  }

  &:last-child {
    padding-bottom: 32px;
  }
`;

export default Section;
