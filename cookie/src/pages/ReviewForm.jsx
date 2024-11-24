import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormWrapper = styled.div`
  width: 90%;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 16px;
  background-color: #ffffff;
  height: 100vh;
`;

const MovieTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #d67a00;
  margin-bottom: 20px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }

  .rating-icons {
    display: flex;
    gap: 5px;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .inactive {
      filter: grayscale(100%);
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 500px;
  min-height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 20px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SpoilerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
    cursor: pointer;
  }

  label {
    font-size: 14px;
    color: #d67a00;
  }

  .description {
    font-size: 12px;
    color: #666;
    margin-left: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 48%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.cancel {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      color: #666;

      &:hover {
        background-color: #ddd;
      }
    }

    &.submit {
      background-color: #04012d;
      color: #fff;
      border: none;

      &:hover {
        background-color: #000;
      }
    }
  }
`;

const ReviewForm = ({ movieTitle }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [containsSpoiler, setContainsSpoiler] = useState(false);
  const navigate = useNavigate();

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleSubmit = () => {
    console.log({
      movieTitle,
      rating,
      review,
      containsSpoiler,
    });
    alert("리뷰가 제출되었습니다.");
    navigate("/reviews"); // 리뷰 리스트 페이지로 이동
  };

  return (
    <FormWrapper>
      <MovieTitle>{movieTitle} 리뷰 남기기</MovieTitle>
      <RatingWrapper>
        <span>평점</span>
        <div className="rating-icons">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <img
                key={index}
                src={
                  index < rating
                    ? "/assets/images/mypage/cookiescore.svg"
                    : "/assets/images/mypage/cookieinactive.svg"
                }
                alt="Cookie"
                className={index >= rating ? "inactive" : ""}
                onClick={() => handleRatingClick(index)}
              />
            ))}
        </div>
      </RatingWrapper>
      <TextArea
        placeholder="리뷰를 작성해주세요..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <SpoilerWrapper>
        <input
          type="checkbox"
          id="spoiler"
          checked={containsSpoiler}
          onChange={(e) => setContainsSpoiler(e.target.checked)}
        />
        <label htmlFor="spoiler">스포일러가 포함된 리뷰</label>
        <span className="description">
          스포일러가 포함된 리뷰는 따로 표시됩니다.
        </span>
      </SpoilerWrapper>
      <ButtonWrapper>
        <button className="cancel" onClick={handleCancel}>
          취소
        </button>
        <button className="submit" onClick={handleSubmit}>
          등록
        </button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default ReviewForm;