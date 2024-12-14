import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/auth/axiosInstance";
import badge from "../../assets/images/admin/recookie.svg";
import like from "../../assets/images/admin/like_heart.svg";
import comment from "../../assets/images/admin/comment.svg";
import CommentsModal from "./CommentModal";
import LikesModal from "./LikesModal";

export const DefaultReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 700px;
  width: 1239px;
  border-radius: 12px;
  margin: 30px 0;
  background-color: #ffff;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  gap: 20px;
  padding: 20px 10px;
`;
const ReviewContainer = styled.div`
  height: 800px;
  max-height: 1000px;
  padding: 0 10px;
  border-radius: 12px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  flex: 1.1;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
  gap: 20px;
  justify-content: space-between;
  label {
    font-size: 22px;
    margin-right: 5px;
  }
  select {
    border: 1px solid #aad6e7;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    outline: none;
    border-radius: 12px;
    height: 33px;
    font-size: 20px;
  }
  select:focus {
    outline: none;
    border-color: #aad6e7;
    box-shadow: 0 0 5px rgba(131, 238, 248, 0.5);
  }
`;
const DateFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const LikeFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ScoreFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ReviewTicket = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 2px solid #aad6e7;
  border-radius: 8px;
  box-sizing: border-box;
  width: 570px;
  height: 168px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TiketContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  .user__profile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .user__profile--info {
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
    width: 57%;
    gap: 40px;
    margin-top: 7px;
  }

  .control__container {
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
  }
  .user__control--content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 18px;
  }
  .user__control--toggle {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .icon__container {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
  }
`;

const LikeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  button {
    background: none;
    border: none;
  }
`;

const CommentIcon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;

  button {
    background: none;
    border: none;
  }
`;

const ToggleContainer = styled.div`
  width: 55px;
  height: 30px;
  background-color: ${(props) => (props.isOn ? "#50bdeb" : "#ccc")};
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
const DetailContainer = styled.div`
  display: flex;
  flex: 0.9;
  margin-bottom: 20px;
  flex-direction: column;

  .user__riview {
    display: flex;
    flex-direction: row;
  }
  .review-content {
    border: none;
    overflow-y: auto;
    margin: 10px 0;
    border-radius: 12px;
    font-size: 20px;
    min-height: 550px;
  }
  .poster {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
    cursor: pointer;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;

    .profile {
      display: flex;
      align-items: start;
      margin-bottom: 10px;
      .deleteBtn {
        background: none;
        border: none;
        color: var(--text);
        flex: 1;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 0 10px;
      }
      .deleteBtn:hover {
        color: black;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        gap: 5px;

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
      margin-top: 10px;

      .cookie {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
        }

        &.selected {
          filter: brightness(1.2);
        }
      }
    }
  }
  .reviewDetail__icon {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-end;
    padding: 0 10px;
  }
`;
function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [dateOrder, setDateOrder] = useState("latest");
  const [likesOrder, setLikesOrder] = useState("asc");
  const [movieScoreFilter, setMovieScoreFilter] = useState(null);
  const [isOn, setIsOn] = useState({});
  const [isSpoilerOn, setSpoilerOn] = useState({});
  const [reviewDetail, setReviewDetail] = useState(null);
  const [comments, setComments] = useState([]); //댓글
  const [isModalOpen, setIsModalOpen] = useState(false); // 댓글 모달
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
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
        console.log({
          dateOrder: dateOrder,
          likesOrder: likesOrder,
          movieScoreFilter: movieScoreFilter,
        });
        console.log(response.data.response);
        setReviews(response.data.response);

        const hideStates = response.data.response.reduce((acc, review) => {
          acc[review.reviewId] = review.hide;
          return acc;
        }, {});

        const spoilerStates = response.data.response.reduce((acc, review) => {
          acc[review.reviewId] = review.isSpoiler;
          return acc;
        }, {});

        setIsOn(hideStates);
        setSpoilerOn(spoilerStates);
      } catch (err) {
        console.error("영화 리뷰를 불러오는 데 실패했습니다.", err);
      }
    };

    fetchReviews();
  }, [movieId, dateOrder, likesOrder, movieScoreFilter]);

  const fetchReviewDetail = async (reviewId) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/reviews/detail/${reviewId}`
      );
      console.log("리뷰 상세 정보:", response.data.response);
      setReviewDetail(response.data.response);
      return response.data.response;
    } catch (err) {
      console.error("리뷰 상세 정보를 가져오는 데 실패했습니다.", err);
    }
  };

  const openModal = (reviewId) => {
    console.log("Open Modal with Review ID: ", reviewId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("해당 리뷰를 삭제할까요?")) {
      try {
        await axiosInstance.delete(`/api/admin/reviews/detail/${reviewId}`);
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.reviewId !== reviewId)
        );
        setReviewDetail(null);
        alert("해당 리뷰가 삭제되었어요.");
      } catch (error) {
        console.error("리뷰 삭제 실패:", error);
        alert("리뷰 삭제되지 않았어요.");
      }
    } else {
      alert("삭제가 취소되었어요.");
    }
  };

  const toggleHideReview = async (reviewId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axiosInstance.post(
        `/api/admin/reviews/hide/${reviewId}`,
        newStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewId === reviewId
            ? { ...review, isHidden: newStatus }
            : review
        )
      );
      setIsOn((prevState) => {
        const updatedState = { ...prevState, [reviewId]: newStatus };
        console.log("Hide review updated:", updatedState);
        return updatedState;
      });

      alert(newStatus ? "리뷰를 숨겼어요." : "리뷰가 표시되었어요.");
    } catch (err) {
      console.error("리뷰 숨김 상태를 업데이트하는 데 실패했습니다.", err);
      alert("리뷰 숨김 상태 업데이트 실패");
    }
  };

  const toggleSpoilerReview = async (reviewId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axiosInstance.post(
        `/api/admin/reviews/spoiler/${reviewId}`,
        newStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewId === reviewId
            ? { ...review, isSpoiler: newStatus }
            : review
        )
      );

      setSpoilerOn((prevState) => {
        const updatedState = { ...prevState, [reviewId]: newStatus };
        console.log("Spoiler review updated:", updatedState); 
        return updatedState;
      });
      alert(
        newStatus ? "스포일러가 활성화되었어요." : "스포일러가 비활성되었어요."
      );
    } catch (err) {
      console.error("스포일러 상태를 업데이트하는 데 실패했습니다.", err);
      alert("스포일러 상태 업데이트 실패");
    }
  };

  const openLikesModal = () => {
    setIsLikesModalOpen(true);
  };

  const closeLikesModal = () => {
    setIsLikesModalOpen(false);
  };

  return (
    <DefaultReviewContainer>
      <ReviewContainer>
        <h2> 리뷰 리스트</h2>
        <FilterContainer>
          <DateFilter>
            <label htmlFor="dateOrder">날짜 :</label>
            <select
              id="dateOrder"
              value={dateOrder}
              onChange={(e) => setDateOrder(e.target.value)}
            >
              <option value="latest">최신순</option>
              <option value="earliest">오래된순</option>
            </select>
          </DateFilter>

          <LikeFilter>
            <label htmlFor="likesOrder">좋아요 : </label>
            <select
              id="likesOrder"
              value={likesOrder}
              onChange={(e) => setLikesOrder(e.target.value)}
            >
              <option value="desc">좋아요 많은 순</option>
              <option value="asc">좋아요 적은 순</option>
            </select>
          </LikeFilter>

          <ScoreFilter>
            <label htmlFor="movieScoreFilter">영화점수 : </label>
            <select
              id="movieScoreFilter"
              value={movieScoreFilter || ""}
              onChange={(e) =>
                setMovieScoreFilter(
                  e.target.value === "" ? null : e.target.value
                )
              }
            >
              <option value="">전체</option>
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>
          </ScoreFilter>
        </FilterContainer>
        <div>
          {reviews.length === 0 ? (
            <div>해당리뷰가 없어요.</div>
          ) : (
            reviews.map((review) => (
              <ReviewTicket key={review.reviewId}>
                <TiketContainer
                  onClick={() => fetchReviewDetail(review.reviewId)}
                >
                  <div className="user__profile">
                    <div className="user__profile--info">
                      <img
                        src={review.userProfile}
                        alt={`${review.username}의 프로필`}
                        style={{ width: "35px", borderRadius: "50%" }}
                      />
                      <div>{review.username}</div>
                    </div>

                    <div>{review.createdAt}</div>
                  </div>

                  <div className="user__control">
                    <p className="user__control--content">{review.content}</p>
                    <div className="control__container">
                      <div className="user__control--toggle">
                        <span>숨김</span>
                        <ToggleContainer
                          onClick={() =>
                            toggleHideReview(review.reviewId, review.isHidden)
                          }
                          isOn={isOn[review.reviewId] || false}
                        >
                          <ToggleCircle isOn={isOn[review.reviewId] || false} />
                          <ToggleLabel>
                            {review.isHidden ? "ON" : "OFF"}
                          </ToggleLabel>
                        </ToggleContainer>
                      </div>
                      <div className="user__control--toggle">
                        <span>스포일러</span>
                        <ToggleContainer
                          onClick={() =>
                            toggleSpoilerReview(
                              review.reviewId,
                              review.isSpoiler
                            )
                          }
                          isOn={isSpoilerOn[review.reviewId] || false}
                        >
                          <ToggleCircle
                            isOn={isSpoilerOn[review.reviewId] || false}
                          />
                          <ToggleLabel>
                            {review.isSpoiler ? "ON" : "OFF"}
                          </ToggleLabel>
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
                      <img
                        src={like}
                        style={{ width: "31px", height: "31px" }}
                      />
                      <p>{review.reviewLike}</p>
                    </LikeIcon>
                    <CommentIcon>
                      <button>
                        <img
                          src={comment}
                          style={{ width: "30px", height: "30px" }}
                        />
                      </button>
                      <p>{review.commentCount}</p>
                    </CommentIcon>
                  </div>
                </TiketContainer>
              </ReviewTicket>
            ))
          )}
        </div>
      </ReviewContainer>
      <DetailContainer>
        {reviewDetail ? (
          <>
            <div className="user__riview">
              <img
                className="poster"
                src={reviewDetail.posterPath}
                alt="Movie Poster"
              />

              <div className="details">
                <div className="profile">
                  <img src={reviewDetail.userProfile} alt="Profile" />
                  <div className="user-info">
                    <span className="name">{reviewDetail.username}</span>
                    <span className="date">{reviewDetail.createdAt}</span>
                  </div>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteReview(reviewDetail.reviewId)}
                  >
                    삭제하기
                  </button>
                </div>

                <div className="movie-info">
                  <span className="movie-title">{reviewDetail.title}</span>
                </div>

                <div className="cookie-score">
                  {Array(reviewDetail.score)
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
              </div>
            </div>
            <div className="review-content">{reviewDetail.content}</div>
            <div className="reviewDetail__icon">
              <LikeIcon>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => openLikesModal(reviewDetail.reviewId)}
                >
                  <img src={like} style={{ width: "31px", height: "31px" }} />
                </button>
                <p>{reviewDetail.reviewLike}</p>
              </LikeIcon>
              <CommentIcon>
                <button
                  onClick={() => openModal(reviewDetail.reviewId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={comment}
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
                <p>{reviewDetail.commentCount}</p>
              </CommentIcon>
            </div>
          </>
        ) : (
          <div style={{ margin: "10px 0" }}>선택한 리뷰가 없어요.</div>
        )}
      </DetailContainer>
      {isLikesModalOpen && (
        <LikesModal
          reviewId={reviewDetail.reviewId}
          onClose={closeLikesModal}
        />
      )}
      {isModalOpen && (
        <CommentsModal
          comments={comments}
          closeModal={closeModal}
          reviewId={reviewDetail.reviewId}
        />
      )}
    </DefaultReviewContainer>
  );
}

export default ReviewList;
