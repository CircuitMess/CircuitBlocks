import styled from 'styled-components';

const Section = styled.div`
  position: relative;
  width: 100vw;
  padding: 10px 40px;
  box-sizing: border-box;
  background-color: #fafafa;
  opacity: 1;
  transition-duration: 0.6s;
  padding-bottom: 40px;

  &.bg-image {
    background-color: #19191900;
    padding-top: 16px;
    height: 400px;
  }

  &:last-child {
    padding-bottom: 0;
  }
  
  h2 {
    text-transform: capitalize;
    font-size: 24px;
  }
`;

export default Section;
