import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ReviewWrapper = styled.div`
  margin-top: 30px;

  h2 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;

    .review-count {
      font-size: 14px;
      color: #666;
      margin-left: 10px;
    }

    .write-review-button {
      margin-left: auto; /* 버튼을 오른쪽으로 밀기 */
      font-size: 14px;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .review-item {
      position: relative;
      background-image: url("/assets/images/mypage/reviewticket.svg"); // 리뷰 티켓 이미지 경로
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 120px;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;

      .review-user {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }

      .review-comment {
        font-size: 12px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .review-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .likes {
          font-size: 12px;
          color: #cc5283;
        }
      }
    }
  }

  .more-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    button {
      font-size: 14px;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const ReviewSection = ({ reviews, reviewCount }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate("/reviews"); // 더보기 클릭 시 리뷰 페이지로 이동
  };

  const handleWriteReviewClick = () => {
    navigate("/reviews/write"); // 리뷰 작성하기 클릭 시 리뷰 작성 페이지로 이동
  };

  return (
    <ReviewWrapper>
      <h2>
        리뷰
        <span className="review-count">{reviewCount}</span>
        <button className="write-review-button" onClick={handleWriteReviewClick}>
          리뷰 작성하기
        </button>
      </h2>
      <div className="review-grid">
        {reviews.slice(0, 4).map((review, index) => (
          <div className="review-item" key={index}>
            <div className="review-user">{review.userName}</div>
            <div className="review-comment">{review.comment}</div>
            <div className="review-footer">
              <div className="likes">❤️ {review.likes}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="more-button">
        <button onClick={handleMoreClick}>더보기</button>
      </div>
    </ReviewWrapper>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    })
  ).isRequired,
  reviewCount: PropTypes.number.isRequired,
};

export default ReviewSection;