import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/auth/axiosInstance";
import useUserStore from "../../stores/useUserStore";

const ReviewContentContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: relative;

  .poster {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;

    .profile {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-info {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 0.9rem;
          font-weight: bold;
        }

        .date {
          font-size: 0.8rem;
          color: #666;
        }
      }
    }

    .movie-info {
      margin-bottom: 10px;

      .movie-title {
        font-size: 1rem;
        font-weight: bold;
        color: #04012d;
      }
    }

    .cookie-score {
      display: flex;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      img.selected {
        border: 2px solid gold;
        border-radius: 50%;
        transform: scale(1.2);
      }
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      textarea {
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 0.9rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: none;
      }

      button {
        padding: 10px 15px;
        margin-top: 20px;
        background-color: #c99d66;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #a67c4b;
        }
      }
    }

    .content {
      margin-top: 10px;
      font-size: 0.9rem;
      color: #333;
    }
  }

  .options {
    position: relative;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  white-space: nowrap;

  div {
    padding: 12px 20px;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;

    &:hover {
      background: #f9f9f9;
    }
  }
`;

const ReviewContentSection = ({
  posterSrc,
  profileSrc,
  name,
  date,
  movieTitle,
  cookieScoreCount,
  isMenuOpen,
  toggleMenu,
  reviewId,
  content,
  userId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newScore, setNewScore] = useState(cookieScoreCount || 1);
  const [isSpoiler, setIsSpoiler] = useState(false);

  const navigate = useNavigate();
  const currentUserId = useUserStore((state) => state.userInfo.userId);

  const handleEditToggle = () => {
    setNewContent(content);
    setNewScore(cookieScoreCount);
    setIsEditing((prev) => !prev);
  };

  const handleScoreChange = (score) => {
    setNewScore(score);
  };

  const handleSave = async () => {
    try {
      if (newScore <= 0 || newScore > 5) {
        toast.error("별점은 1에서 5 사이여야 합니다.");
        return;
      }
      await axiosInstance.put(`/api/reviews/${reviewId}`, {
        content: newContent,
        score: newScore,
        isSpoiler,
      });
      toast.success("리뷰가 수정되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("수정 실패:", error);
      toast.error("리뷰 수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axiosInstance.delete(`/api/reviews/${reviewId}`);
      toast.success("게시물이 삭제되었습니다.");
      navigate("/myAllReviewList");
    } catch (error) {
      console.error("삭제 실패:", error);
      toast.error("게시물 삭제에 실패했습니다.");
    }
  };

  console.log("유저아이디, 현재로그인한 아이디", userId, currentUserId);

  return (
    <ReviewContentContainer>
      <img className="poster" src={posterSrc} alt="Movie Poster" />

      <div className="details">
        <div className="profile">
          <img src={profileSrc} alt="Profile Picture" />
          <div className="user-info">
            <span className="name">{name}</span>
            <span className="date">{date}</span>
          </div>
        </div>

        <div className="movie-info">
          <span className="movie-title">{movieTitle}</span>
        </div>

        {!isEditing ? (
          <div className="content">
            <p>{content}</p>
            <div className="cookie-score">
              {[1, 2, 3, 4, 5].map((score) => (
                <img
                  key={score}
                  src="/images/cookiescore.svg"
                  alt={`Score ${score}`}
                  className={cookieScoreCount >= score ? "selected" : ""}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="edit-form">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="cookie-score">
              {[1, 2, 3, 4, 5].map((score) => (
                <img
                  key={score}
                  src="/images/cookiescore.svg"
                  alt={`Score ${score}`}
                  className={newScore >= score ? "selected" : ""}
                  onClick={() => handleScoreChange(score)}
                />
              ))}
            </div>
            <button onClick={handleSave}>저장</button>
          </div>
        )}
      </div>

      {userId === currentUserId && (
        <div className="options" onClick={toggleMenu}>
          <img src="/assets/images/mypage/More.svg" alt="More Options" />
          {isMenuOpen && (
            <DropdownMenu>
              <div onClick={handleEditToggle}>
                {isEditing ? "취소" : "수정하기"}
              </div>
              <div onClick={handleDelete}>삭제하기</div>
            </DropdownMenu>
          )}
        </div>
      )}
    </ReviewContentContainer>
  );
};

ReviewContentSection.propTypes = {
  posterSrc: PropTypes.string.isRequired,
  profileSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  cookieScoreCount: PropTypes.number.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  reviewId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ReviewContentSection;
