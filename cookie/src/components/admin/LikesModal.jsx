import { useEffect, useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";
import styled from "styled-components";
import likeIcon from "../../assets/images/admin/like2.svg";

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const List = styled.ul`
  margin: 20px 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  color: #555;
`;

const Message = styled.p`
  font-size: 16px;
  color: #999;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

const LikesModal = ({ reviewId, onClose }) => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/reviews/detail/${reviewId}/likes`
        );
        if (response.status === 200) {
          setLikes(response.data.response);
          console.log("좋아요 목록 조회:", response.data.response);
        }
      } catch (error) {
        console.error("좋아요 목록 요청 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchLikes();
    }
  }, [reviewId]);

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>좋아요 목록</Title>
        {isLoading ? (
          <Message>로딩 중...</Message>
        ) : likes.length > 0 ? (
          <List>
            {likes.map((like) => (
              <ListItem key={like.likeId}>
                <p>{like.username}</p>
                <p>{like.createdAt}</p>
                <img src={like.userProfile} alt="User Profile" />
                <img src={likeIcon} alt="like" />
              </ListItem>
            ))}
          </List>
        ) : (
          <Message>좋아요를 누른 사용자가 없습니다.</Message>
        )}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LikesModal;
