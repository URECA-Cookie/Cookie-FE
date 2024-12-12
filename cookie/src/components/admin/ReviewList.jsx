import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/auth/axiosInstance";
import badge from "../../assets/images/admin/recookie.svg";
import like from "../../assets/images/admin/like2.svg";

import comment from "../../assets/images/admin/comment.svg";
const ReviewTicket = styled.div`
  width: 540px;
  height: 150px;
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid var(--sub-text);
`;

const TiketContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  .user__profile {
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;
    gap: 10px;
  }
  .user__control {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 50%;
    gap: 65px;
  }
  .control__container {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .user__control--toggle {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .icon__container {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
  }
`;

const LikeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

const CommentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

const ToggleContainer = styled.div`
  width: 55px;
  height: 30px;
  background-color: ${(props) => (props.isOn ? "#4caf50" : "#ccc")};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOn ? "flex-end" : "flex-start")};
  padding: 5px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`;

const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
`;

const ToggleLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
  color: white;
  pointer-events: none;
  text-transform: uppercase;
`;
function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [dateOrder, setDateOrder] = useState("latest");
  const [likesOrder, setLikesOrder] = useState("asc");
  const [movieScoreFilter, setMovieScoreFilter] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const movieId = 4;
      try {
        const response = await axiosInstance.get(
          `/api/admin/reviews/${movieId}`,
          {
            params: {
              dateOrder: dateOrder,
              likesOrder: likesOrder,
              movieScoreFilter: movieScoreFilter,
            },
          }
        );
        console.log(response.data.response);
        setReviews(response.data.response);
      } catch (err) {
        setError("영화 리뷰를 불러오는 데 실패했습니다.");
        console.error(err);
      }
    };

    fetchReviews();
  }, [movieId, dateOrder, likesOrder, movieScoreFilter]);
  return (
    <div>
      <div>
        {reviews.length === 0 ? (
          <div>리뷰가 없습니다.</div>
        ) : (
          reviews.map((review) => (
            <ReviewTicket key={review.reviewId}>
              <TiketContainer>
                <div>
                  <div className="user__profile">
                    <img
                      src={review.userProfile}
                      alt={`${review.username}의 프로필`}
                      style={{ width: "50px", borderRadius: "50%" }}
                    />
                    <div> {review.username}</div>
                  </div>
                  <div>{review.createdAt}</div>
                </div>
                <div className="user__control">
                  <p>{review.content}</p>
                  <div className="control__container">
                    <div className="user__control--toggle">
                      <span>숨김</span>
                      <ToggleContainer onClick={toggleHandler} isOn={isOn}>
                        <ToggleCircle isOn={isOn} />
                        <ToggleLabel>{isOn ? "ON" : "OFF"}</ToggleLabel>
                      </ToggleContainer>
                    </div>
                    <div className="user__control--toggle">
                      <span>스포일러</span>
                      <ToggleContainer onClick={toggleHandler} isOn={isOn}>
                        <ToggleCircle isOn={isOn} />
                        <ToggleLabel>{isOn ? "ON" : "OFF"}</ToggleLabel>
                      </ToggleContainer>
                    </div>
                  </div>
                </div>

                <div className="icon__container">
                  <div>
                    {Array(review.score)
                      .fill(null)
                      .map((_, index) => (
                        <img
                          key={index}
                          src={badge}
                          alt="star"
                          style={{
                            width: "26px",
                            height: "26px",
                            marginRight: "3px",
                          }}
                        />
                      ))}
                  </div>
                  <LikeIcon>
                    <img src={like} style={{ width: "31px", height: "31px" }} />
                    <p>{review.reviewLike}</p>
                  </LikeIcon>
                  <CommentIcon>
                    <img
                      src={comment}
                      style={{ width: "30px", height: "30px" }}
                    />
                    <p>{review.commentCount}</p>
                  </CommentIcon>
                </div>
              </TiketContainer>
            </ReviewTicket>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewList;
