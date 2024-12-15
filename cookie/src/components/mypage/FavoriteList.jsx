import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const FavoriteSection = styled.div`
  margin-top: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const FavoriteTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-left: 5px;
  color: #f84b99;
  font-weight: bold;
`;

const FavoriteListContainer = styled.div`
  border: 2px solid transparent;
  border: 2px solid black;

  border-radius: 12px;
  overflow: hidden;
  background-color: #black;
`;

const FavoriteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f84b99;
    color: #fdf8fa;
  }
`;

const FavoriteText = styled.span`
  font-size: 1rem;
  color: black;
  font-weight: bold;
`;

const FavoriteIcon = styled.div`
  color: black;
  font-size: 1rem;
`;

const FavoriteList = ({ title, items }) => {
  const navigate = useNavigate();
  const isLogined = useAuthStore((state) => state.isLogined);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);

  const handleNavigate = (label) => {
    if (!isLogined()) {
      openLoginModal();
      return;
    }

    if (label === "좋아한 영화") {
      navigate("/likemovies");
    } else if (label === "좋아한 리뷰") {
      navigate("/likereviews");
    }
  };

  return (
    <FavoriteSection>
      <FavoriteTitle>{title}</FavoriteTitle>
      <FavoriteListContainer>
        {items.map((item, index) => (
          <FavoriteItem key={index} onClick={() => handleNavigate(item.label)}>
            <FavoriteText>{item.label}</FavoriteText>
            <FavoriteIcon>
              <FaChevronRight />
            </FavoriteIcon>
          </FavoriteItem>
        ))}
      </FavoriteListContainer>
    </FavoriteSection>
  );
};

export default FavoriteList;
