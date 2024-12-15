import styled from "styled-components";
import deleteBtn from "../../assets/images/signUp/close_icon.svg";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const BottomModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${($isOpen) => ($isOpen ? "flex" : "none")};
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
  position: relative;

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
    color: var(--text);
    font-size: 1.5rem;
    text-align: center;
  }

  .modal__loginBtn {
    background-color: #f84b99;
    width: 100%;
    height: 4rem;
    font-size: 1rem;
    border: none;
    border-radius: 16px;
    color: white;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
      background-color: #ff0777;
    }
  }

  .modalBtn__container {
    display: flex;
    justify-content: flex-end;
  }

  .modal__closeBtn {
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
    }
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

  @media (max-width: 768px) {
    width: 90%;
    height: 14rem;
    padding: 1rem;

    .modal__infoContainer {
      font-size: 0.9rem;
      height: auto;
      gap: 0.6rem;
    }

    .modal__title {
      font-size: 1.3rem;
    }

    .modal__loginBtn {
      height: 3.5rem;
      font-size: 1rem;
    }

    .modal__closeBtn img {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 95%;
    height: 12rem;
    padding: 0.8rem;

    .modal__infoContainer {
      font-size: 0.8rem;
      gap: 0.5rem;
    }

    .modal__title {
      font-size: 1.1rem;
    }

    .modal__loginBtn {
      height: 3rem;
      font-size: 0.9rem;
    }

    .modal__closeBtn img {
      width: 16px;
      height: 16px;
    }
  }
`;

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore();
  const navigate = useNavigate();
  if (!isLoginModalOpen) return null;

  const handleModalLogin = () => {
    closeLoginModal();
    navigate("/login");
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
    }
  };

  return (
    <BottomModalContainer
      $isOpen={isLoginModalOpen}
      onClick={handleContainerClick}
    >
      <ModalContent>
        <div className="modal">
          <div className="modalBtn__container">
            <button className="modal__closeBtn" onClick={closeLoginModal}>
              <img src={deleteBtn} alt="닫기" />
            </button>
          </div>
          <div className="modal__infoContainer">
            <h2 className="modal__title">로그인이 필요해요 🍪</h2>
            <p>로그인 한번 하카롱? 🍭</p>
          </div>
          <button className="modal__loginBtn bold" onClick={handleModalLogin}>
            로그인 하기
          </button>
        </div>
      </ModalContent>
    </BottomModalContainer>
  );
};

export default LoginModal;
