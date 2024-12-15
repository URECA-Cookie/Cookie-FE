import styled from "styled-components";
import NotificationIcon from "/assets/images/notification.svg";
import useNotificationStore from "../../stores/notificationStore";

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  img {
    height: 30px;
    cursor: pointer;
    transition: height 0.2s ease;

    @media (max-width: 768px) {
      height: 25px;
    }

    @media (max-width: 480px) {
      height: 20px;
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #6a91b1;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <NotificationContainer>
      <img src={NotificationIcon} alt="알림 아이콘" />
      {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
    </NotificationContainer>
  );
};

export default Notification;
