import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  position: fixed;
  bottom: 90px;
  right: calc(50% - 30px);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1000;

  &::after {
    content: "↑";
    font-size: 18px;
    color: black;
    font-weight: bold;
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background-color: #ffe6f2;
  }

  @media (max-width: 768px) {
    right: 14rem;
    bottom: 70px;
    width: 45px;
    height: 45px;

    &::after {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    right: 12rem;
    bottom: 60px;
    width: 40px;
    height: 40px;

    &::after {
      font-size: 14px;
    }
  }
`;
const TopButton = ({ visible, onClick }) => {
  return <StyledButton visible={visible} onClick={onClick} />;
};

TopButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TopButton;
