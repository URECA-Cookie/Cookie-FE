import styled, { keyframes } from "styled-components";
import SpinnerImage from "/assets/images/mypage/lv3.svg";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const SpinnerIcon = styled.img`
  width: 100px;
  height: 100px;
  animation: ${spinAnimation} 1.5s linear infinite;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerIcon src={SpinnerImage} alt="Loading..." />
    </SpinnerContainer>
  );
};

export default Spinner;
