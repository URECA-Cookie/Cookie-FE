import React, { useState } from "react";
import styled from "styled-components";
import deleteBtn from "../assets/images/signUp/close_icon.svg";
import { useNavigate } from "react-router-dom";

const BottomModalContainer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: flex-end;
  z-index: 9998;
`;

const ModalContent = styled.div`
  border: none;
  padding: 1rem 2rem 2rem 2rem;
  margin: calc(100vh - 280px) auto 0 auto;
  animation: modal-show 0.5s;
  border-radius: 1rem 1rem 0 0;
  background-color: var(--ticket-bg);
  width: 37.5rem;
  height: 16rem;

  .modal__infoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    border-radius: 16px;
    font-size: 1rem;
    height: 6.3rem;
    padding: 0 1.4rem;
    margin-bottom: 0.5rem;
    background-color: var(--ticket-bg);
  }

  .modal__title {
    color: var(--main);
  }

  .modal__loginBtn {
    background-color: var(--main);
    width: 100%;
    height: 4rem;
    font-size: 1rem;
    border: none;
    border-radius: 16px;
    color: white;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0 0 1rem 0;

    &:hover {
      background-color: #0b0849;
    }
  }

  .modalBtn__container {
    display: flex;
    justify-content: end;
  }

  .modal__closeBtn {
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  @keyframes modal-show {
    from {
      opacity: 0.95;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleModalOpen}>로그인 바텀업</button>
      <BottomModalContainer isOpen={isModalOpen}>
        <ModalContent>
          <div className="modal">
            <div className="modalBtn__container">
              <button className="modal__closeBtn" onClick={handleModalClose}>
                <img src={deleteBtn} />
              </button>
            </div>
            <div className="modal__infoContainer">
              <h2 className="modal__title">로그인이 필요해요 🍪</h2>
              <p>로그인 후 쿠키를 이용해주세요!</p>
            </div>
            <button className="modal__loginBtn bold" onClick={handleModalLogin}>
              로그인 하기
            </button>
          </div>
        </ModalContent>
      </BottomModalContainer>
    </div>
  );
};

export default LoginModal;
