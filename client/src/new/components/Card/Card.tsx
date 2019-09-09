import styled from 'styled-components';

const Card = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 200px;
  background: #1045ba;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: white;
  overflow: hidden;
  cursor: pointer;

  :hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  * {
    transition-duration: 0.3s;
  }

  .image {
    width: calc(100% - 16px);
    height: calc(100% - 56px);
    background: #ffffff;
    background-image: url('resources/images/profile.png');
    background-size: contain;
    position: relative;
    top: 8px;
    left: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    opacity: 1;
  }
  :hover .image {
    top: -152px;
    opacity: 0;
  }

  .cover {
    position: absolute;
    padding: 4px 8px;
    width: calc(100% - 16px);
    height: 32px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    top: calc(100% - 40px);
    left: 8px;
    text-align: center;
    overflow: hidden;
  }
  :hover .cover {
    top: 0;
    left: 0;
    padding: 12px 16px;
    width: 100%;
    height: 100%;
  }

  .cover .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
  }

  .cover .author {
    opacity: 0;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 24px;
  }
  :hover .cover .author {
    opacity: 1;
  }

  .cover .description {
    opacity: 0;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 18px;
    margin-top: 40px;
  }
  :hover .cover .description {
    opacity: 1;
  }
`;

export default Card;
