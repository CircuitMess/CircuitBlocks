import styled from 'styled-components';

const EditorPopup = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  top: 76px;
  left: 50%;
  background-color: #1e1e1e;
  color: white;
  border-radius: 8px;
  padding: 32px 24px;
  transition-duration: 0.3s;

  &.fullscreen {
    left: 16px;
    transition-duration: 0.3s;
  }
`;

export default EditorPopup;
