import React from 'react';
import styled from 'styled-components';

export const NotificationWrapper = styled.div`
  position: absolute;
  top: 76px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
`;

const NotificationStyle = styled.div`
  position: relative;
  margin-bottom: 8px;
  border-radius: 8px;
  background: rgba(25, 25, 25, 0.8);
  padding: 8px 12px;
  width: 100%;
  color: white;
  opacity: 1;
  transform: translateY(0px);
  animation: notification-appear 0.3s ease;
  @keyframes notification-appear {
    0% {
      opacity: 0;
      transform: translateY(-16px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  i.material-icons {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  .text {
    margin-left: 12px;
    vertical-align: middle;
    line-height: 0px;
    font-size: 10px;
    font-weight: normal;
    font-style: normal;
  }

  .icon.white {
    filter: invert(1);
  }

  .close {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }
`;

interface NotificationProps {
  close: () => void;
  message: string;
  icon?: string;
}

const Notification: React.FC<NotificationProps> = ({ close, message, icon = 'warning' }) => (
  <NotificationStyle>
    <i className="material-icons">{icon}</i>
    <div className="text">{message}</div>
    <i className="material-icons close" onClick={close}>
      {' '}
      close{' '}
    </i>
  </NotificationStyle>
);

export default Notification;
