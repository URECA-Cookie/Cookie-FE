import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;
  height: 700px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  background: #4a4a4a;
  padding: 10px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CommentsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const CommentItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

function CommentsModal({ comments, closeModal, reviewId }) {
  const [updatedComments, setUpdatedComments] = useState(comments);

  const fetchComments = async (reviewId) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/reviews/detail/${reviewId}/comments`
      );
      console.log("댓글목록", response.data.response);
      setUpdatedComments(response.data.response);
    } catch (err) {
      console.error("댓글을 가져오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    if (reviewId) {
      fetchComments(reviewId);
    }
  }, [reviewId]);

  const deleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(
        `/api/admin/reviews/detail/${reviewId}/comments/${commentId}`
      );
      console.log("댓글 삭제 성공");
      fetchComments(reviewId);
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h3>Comments</h3>
        <CloseButton onClick={closeModal}>닫기닫기닫기</CloseButton>
        <CommentsList>
          {updatedComments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            updatedComments.map((comment, index) => (
              <CommentItem key={index}>
                <div>{comment.username}</div>
                <div>{comment.content}</div>
                <div>{comment.createdAt}</div>
                <img src={comment.userProfile} />
                <button onClick={() => deleteComment(comment.commentId)}>
                  삭제
                </button>
              </CommentItem>
            ))
          )}
        </CommentsList>
      </ModalContent>
    </ModalContainer>
  );
}

export default CommentsModal;
