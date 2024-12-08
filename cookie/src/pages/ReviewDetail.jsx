import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/auth/axiosInstance";
import DetailHeader from "../components/mypage/DetailHeader";
import ReviewContentSection from "../components/searchpage/ReviewContentSection";
import ReviewTextSection from "../components/searchpage/ReviewTextSection";
import { FaHeart, FaComment } from "react-icons/fa";
import useUserStore from "../stores/useUserStore";

const Container = styled.div`
  padding: 20px;
  width: 95%;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FooterSectionStyled = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: center;

  .icon-container {
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: fill 0.2s ease;
    }

    .liked {
      fill: red;
    }

    span {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;

const CommentsSectionContainer = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .comment-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 1rem;
      outline: none;
      margin-right: 10px;
      height: 40px;
    }

    button {
      background-color: #c99d66;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .comment-left {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .comment-content {
        background-color: #f8f8f8;
        border-radius: 8px;
        padding: 10px;
        font-size: 0.9rem;

        .nickname {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .text {
          color: #333;
        }

        .date {
          font-size: 0.8rem;
          color: #666;
          margin-top: 5px;
        }
      }
    }

    .comment-actions {
      display: flex;
      gap: 10px;

      button {
        background: none;
        border: none;
        color: #c99d66;
        cursor: pointer;

        &:hover {
          color: #9b7a4c;
        }
      }
    }
  }
`;

const ReviewDetail = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likedByUser, setLikedByUser] = useState(false);

  const currentUserId = useUserStore((state) => state.userInfo.userId);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleLike = () => {
    setLikedByUser((prev) => !prev);
    setReviewData((prevData) => ({
      ...prevData,
      reviewLike: likedByUser
        ? prevData.reviewLike - 1
        : prevData.reviewLike + 1,
    }));
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axiosInstance.get(`/api/reviews/${reviewId}`);
        setReviewData(response.data.response);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
        toast.error("리뷰 데이터를 가져오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("댓글 내용을 입력하세요.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/api/reviews/${reviewId}/comments`,
        {
          userId: currentUserId,
          comment: newComment,
        }
      );

      const updatedComment = response?.data?.response;
      if (!updatedComment) throw new Error("댓글 추가에 실패했습니다.");

      setReviewData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, updatedComment],
      }));

      toast.success("댓글이 작성되었습니다!");
      setNewComment(""); // 초기화
    } catch (error) {
      console.error("Error during comment submission:", error);
      toast.error("댓글 작성에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (!reviewData) {
    return <Container>No review found.</Container>;
  }

  return (
    <Container>
      <DetailHeader onBack={() => navigate(-1)} />
      <ReviewContentSection
        posterSrc={reviewData.movie.poster}
        profileSrc={reviewData.user.profileImage}
        name={reviewData.user.nickname}
        date={new Date(reviewData.createdAt).toLocaleDateString()}
        movieTitle={reviewData.movie.title}
        cookieScoreCount={reviewData.movieScore}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        reviewId={reviewId}
        userId={reviewData.user.userId}
      />
      <ReviewTextSection reviewText={reviewData.content} />
      <FooterSectionStyled>
        <div className="icon-container">
          <FaHeart
            onClick={toggleLike}
            className={likedByUser ? "liked" : ""}
          />
          <span>{reviewData.reviewLike}</span>
        </div>
        <div className="icon-container">
          <FaComment />
          <span>{reviewData.comments?.length || 0}</span>
        </div>
      </FooterSectionStyled>

      <CommentsSectionContainer>
        <h3>Comment</h3>
        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />
          <button onClick={handleAddComment}>↑</button>
        </div>

        {reviewData.comments?.map((comment) => (
          <div className="comment" key={comment.commentId}>
            <div className="comment-left">
              <img
                src={comment.user.profileImage}
                alt={`${comment.user.nickname} 프로필`}
              />
              <div className="comment-content">
                <div className="nickname">{comment.user.nickname}</div>
                <div className="text">{comment.comment}</div>
                <div className="date">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            {comment.user.userId === currentUserId && (
              <div className="comment-actions">
                <button
                  onClick={() => {
                    setEditingCommentId(comment.commentId);
                    setEditingCommentText(comment.comment);
                  }}
                >
                  수정
                </button>
                <button onClick={() => handleDeleteComment(comment.commentId)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </CommentsSectionContainer>
    </Container>
  );
};

export default ReviewDetail;
