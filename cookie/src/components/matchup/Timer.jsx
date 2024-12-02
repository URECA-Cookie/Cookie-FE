import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "react-modal";

const TimerContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const TimerBox = styled.div`
  background-color: #c4ffef;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
  width: 73px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 60px;
    height: 65px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 50px;
    height: 55px;
  }
`;

const Colon = styled.span`
  font-size: 2.5rem;
  margin-top: 15px;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const EndedMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const CloseButton = styled.button`
  background-color: #1ee5b0;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #17c397;
  }
`;

Modal.setAppElement("#root");

const Timer = ({ endAt, onVoteEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // 배경 위치 저장

  useEffect(() => {
    const targetDate = new Date(endAt);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsEnded(true);
        openModal();
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        onVoteEnd();
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt, onVoteEnd]);

  const splitDigits = (value) => value.toString().padStart(2, "0").split("");

  const [h1, h2] = splitDigits(timeLeft.hours);
  const [m1, m2] = splitDigits(timeLeft.minutes);
  const [s1, s2] = splitDigits(timeLeft.seconds);

  const openModal = () => {
    setScrollPosition(window.scrollY); // 현재 스크롤 위치 저장
    document.body.style.position = "fixed"; // 배경 고정
    document.body.style.top = `-${window.scrollY}px`; // 현재 위치 유지
    document.body.style.width = "100%"; // 화면 크기 유지
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.position = ""; // 고정 해제
    document.body.style.top = ""; // 초기화
    document.body.style.width = ""; // 초기화
    window.scrollTo(0, scrollPosition); // 스크롤 위치 복원
    setIsModalOpen(false);
  };

  return (
    <>
      {!isEnded ? (
        <TimerContainer>
          <TimerBox>{h1}</TimerBox>
          <TimerBox>{h2}</TimerBox>
          <Colon>:</Colon>
          <TimerBox>{m1}</TimerBox>
          <TimerBox>{m2}</TimerBox>
          <Colon>:</Colon>
          <TimerBox>{s1}</TimerBox>
          <TimerBox>{s2}</TimerBox>
        </TimerContainer>
      ) : (
        <EndedMessage>투표가 종료되었습니다.</EndedMessage>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "400px",
            maxHeight: "20vh",
            margin: "auto",
            textAlign: "center",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "auto",
          },
        }}
        ariaHideApp={false}
      >
        <ModalContent>
          투표가 종료되었습니다.
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContent>
      </Modal>
    </>
  );
};

Timer.propTypes = {
  endAt: PropTypes.string.isRequired,
  onVoteEnd: PropTypes.func.isRequired,
};

export default Timer;
