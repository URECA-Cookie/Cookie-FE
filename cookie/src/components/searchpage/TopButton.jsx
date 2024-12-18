import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  position: fixed;
  bottom: 95px;
  right: calc(50% - 34px);
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 0.5px solid #ff73b2;
  background-color: #ffe6f2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 40px;
  padding: 8px 12px;

  height: 30px;
  cursor: pointer;
  z-index: 1000;

  &::after {
    content: "맨위로↑";
    font-size: 14px;
    color: var(--text);
    font-weight: 400;
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background-color: #ffe6f2;
  }

  @media (max-width: 768px) {
    right: 26rem;
    bottom: 95px;
    height: 30px;

    &::after {
      font-size: 16px;
    }
  }
  @media (max-width: 620px) {
    right: 15.3rem;
    bottom: 95px;
    height: 30px;

    &::after {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    right: 11rem;
    bottom: 92px;
    width: 80px;
    height: 40px;

    &::after {
      font-size: 14px;
    }
  }
  @media (max-width: 393px) {
    right: 9.8rem;
    bottom: 82px;
    width: 90px;
    height: 35px;

    &::after {
      font-size: 14px;
    }
  }
  @media (max-width: 390px) {
    right: 9.8rem;
    bottom: 80px;
    width: 90px;
    height: 35px;

    &::after {
      font-size: 16px;
    }
  }
`;
const TopButton = ({ visible, onClick }) => {
  return <StyledButton $visible={visible} onClick={onClick} />;
};

TopButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TopButton;
