import styled from 'styled-components';

const ModalBase = styled.div`
  position: absolute;
  width: 50%;
  max-height: 70%;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: #fafafa;
  color: #595959;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10000;

  &.small {
    height: auto;
    width: 28%;
  }

  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 32px;
  }

  .icons {
    position: absolute;
    right: 24px;
    top: 20px;
  }

  .icons i {
    margin-left: 12px;
    cursor: pointer;
  }

  .buttons {
    margin-top: 26px;
  }

  .buttons.left {
    float: left;
  }
  .buttons.right {
    float: right;
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  content: '';
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9000;
`;

export { ModalBase, Backdrop };
