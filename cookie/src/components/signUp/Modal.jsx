import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  width: 30rem;

  @media (max-width: 768px) {
    width: 22rem;
    height: auto;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  h2 {
    margin: 0;
    color: #f84b99;
    font-size: 1.8rem;
    text-align: center;
  }

  h3 {
    margin: 0;
    color: #f84b99;
    font-size: 1.2rem;
    text-align: center;
  }

  p {
    color: #707070;
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
`;

const GifImage = styled.img`
  width: 300px;
  height: auto;
  margin-top: -1rem;

  @media (max-width: 768px) {
    width: 220px;
  }
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: 1.8rem;
  color: #707070;
  cursor: pointer;

  &:hover {
    color: #f84b99;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ModalButton = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#aad6e7" : "white")};
  color: ${(props) => (props.$isSelected ? "#724b2e" : "#724b2e")};
  border-radius: 5rem;
  padding: 0.8rem 1.5rem;
  border: 1px solid #f84b99;
  cursor: pointer;
  font-size: 1rem;
  width: 10rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background-color: #f84b99;
    color: #fdf8fa;
  }

  @media (max-width: 768px) {
    width: 9rem;
    height: 3.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 8rem;
    height: 3rem;
    font-size: 0.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #a7a7a7;
  text-decoration: underline;
  text-underline-offset: 0.375rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    text-underline-offset: 0.25rem;
  }
`;

const Modal = ({ onClose, onPushNotification, onNoNotification }) => {
  const handlePushNotification = () => {
    const isSupportedBrowser =
      (/Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor)) ||
      /Edg/.test(navigator.userAgent);

    if (!isSupportedBrowser) {
      alert("푸시 알림은 크롬 및 엣지 브라우저에서만 지원됩니다.");
      return;
    }

    onPushNotification();
  };
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose} />
        <h2>알림 수신 동의(선택)</h2>
        <h3>
          좋아하는 장르에 새로운 리뷰가 <br /> 등록될 때 알려드릴까요?
        </h3>
        <p>새로 온 리뷰가 등록되면 빠르게 알려드릴게요!</p>

        <GifImage
          src="/assets/gif/accessnotification.gif"
          alt="알림 수신 안내"
        />
        <ButtonContainer>
          <ModalButton onClick={handlePushNotification}>
            🔔 푸쉬알림
          </ModalButton>
        </ButtonContainer>
        <CloseBtn onClick={onNoNotification}>알림을 원하지 않습니다</CloseBtn>
        <p>
          쿠키의 푸시알림은 크롬,Edge 브라우저에서만 <br></br> 지원합니다.
        </p>
        <p style={{ fontSize: "0.75rem", color: "#888" }}>
          • Chrome (iOS) 지원 안 함 (iOS 제한) <br />• Edge (모바일 앱 지원 안
          함)
        </p>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
