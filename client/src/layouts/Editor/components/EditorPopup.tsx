import styled from 'styled-components';

const EditorPopup = styled.div<{ theme: 'vs-dark' | 'vs-light' }>`
  z-index: 200;
  position: absolute;
  right: 16px;
  bottom: 16px;
  top: 76px;
  left: 50%;
  background-color: ${(props) => (props.theme === 'vs-dark' ? '#1e1e1e' : '#fff')};
  color: ${(props) => (props.theme === 'vs-dark' ? '#fff' : '#222')};
  border-radius: 8px;
  padding: 32px 24px;
  transition-duration: 0.3s;

  &.fullscreen {
    left: 16px;
    transition-duration: 0.3s;
  }
`;

export default EditorPopup;
