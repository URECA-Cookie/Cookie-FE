import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";
// import { symbol } from "prop-types";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  padding-left: 40px;
  padding-right: 40px;
  min-height: 100vh;

  @media (max-width: 480px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const SearchInfoText = styled.p`
  color: #f84b99;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  width: 100%;
  max-width: 600px;
  margin-bottom: 10px;
  line-height: 1.5;
  padding-left: 0rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding-left: 0px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding-left: 0px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  padding-left: 0rem;

  button {
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #000000;
      color: #f84b99;
    }

    &.inactive {
      background-color: #000000;
      color: #ffffff;
    }
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem;
`;

const ReviewTicket = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #fdf8fa;
  border-radius: 8px;
  margin: 0.4rem 0;
  padding: 0.8rem;
  height: auto;

  @media (max-width: 768px) {
    padding: 0.6rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

const ReviewLeft = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 100%; /* 부모 컨테이너에 맞춤 */
    max-width: 120px; /* 데스크톱 최대 크기 */
    height: auto; /* 비율 유지 */
    object-fit: contain; /* 원본 비율 유지 */
    border-radius: 5px;

    @media (max-width: 768px) {
      max-width: 90px; /* 태블릿에서는 이미지 크기 축소 */
    }

    @media (max-width: 480px) {
      max-width: 70px; /* 모바일에서는 이미지 크기 축소 */
    }
  }
`;

const ReviewInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ReviewInfoFirst = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ReviewCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 1.2rem; /* 왼쪽 여백 줄이기 */
  width: 19rem;
  height: 100%;

  @media (max-width: 768px) {
    width: 14rem; /* 태블릿에서는 너비를 더 줄임 */
  }

  @media (max-width: 480px) {
    width: 13rem; /* 모바일에서는 너비를 더욱 줄임 */
  }

  .profile {
    display: flex;
    align-items: center;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 8px;

      @media (max-width: 480px) {
        width: 30px;
        height: 30px;
      }
    }

    .user-info {
      .name {
        font-size: 0.9rem;

        @media (max-width: 480px) {
          font-size: 0.7rem;
        }
      }
      .date {
        font-size: 0.8rem;
        color: #888;

        @media (max-width: 480px) {
          font-size: 0.6rem;
        }
      }
    }
  }

  .comment {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    line-height: 1.5;

    @media (max-width: 480px) {
      font-size: 0.6rem;
      margin-top: 0.3rem;
    }
  }

  .movie-title {
    font-size: 0.8rem;
    margin-top: 0.3rem;
    color: #f84b99;

    @media (max-width: 480px) {
      font-size: 0.5rem;
    }
  }
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  .score img {
    width: 16px;
    height: 16px;
    margin-top: 0.5rem;
    margin-right: 0.1rem;

    @media (max-width: 480px) {
      width: 10px;
      height: 10px;
    }
  }

  .score-text {
    font-size: 0.8rem;
    color: #888;
    margin-right: 0.5rem;
  }
`;

const ReviewInfoSecond = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LikeIcon = styled.svg`
  width: 14px;
  height: 14px;
  margin-right: 0.3rem;
  background: no-repeat center/cover
    url("/assets/images/review/heart-review-feed.svg");

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

const ReviewLike = styled.p`
  font-size: 0.9rem;
  font-weight: normal;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const CommentIcon = styled.svg`
  margin-left: 0.5rem;
  width: 14px;
  height: 14px;
  margin-right: 0.3rem;
  background: no-repeat center/cover
    url("/assets/images/review/comment-review-feed.svg");

  @media (max-width: 480px) {
    margin-left: 0.3rem;
    width: 10px;
    height: 10px;
  }
`;

const ReviewComment = styled.p`
  font-size: 0.9rem;
  font-weight: normal;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const ReviewFeed = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [showSpoilerOnly, setShowSpoilerOnly] = useState(false);
  const [page, setPage] = useState(0); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 로딩 가능 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [initialLoad, setInitialLoad] = useState(true); // 초기 로딩 여부

  // 초기 데이터 로드 및 페이지네이션
  const fetchReviews = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true); // 로딩 시작
      const endpoint = showSpoilerOnly
        ? "/api/reviews/spoiler"
        : "/api/reviews";

      console.log(`Fetching page ${page}…`);

      const response = await axiosInstance.get(endpoint, {
        params: { page, size: 10 },
      });

      const newReviews = response.data.response.reviews;

      setReviews((prevReviews) =>
        page === 0 ? newReviews : [...prevReviews, ...newReviews]
      ); // 초기 페이지일 경우 덮어쓰기, 아닐 경우 추가

      // 더 이상 데이터가 없는지 확인
      if (
        newReviews.length < 10 ||
        page + 1 === response.data.response.totalReviewPages
      ) {
        setHasMore(false); // 더 이상 로딩하지 않음
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }, [page, showSpoilerOnly, isLoading, hasMore]);

  // 초기 로드
  useEffect(() => {
    if (initialLoad) {
      fetchReviews();
      setInitialLoad(false); // 초기 로딩 완료
    }
  }, [initialLoad, fetchReviews]);

  // 페이지 변경 시 추가 로드
  useEffect(() => {
    if (!initialLoad) {
      fetchReviews();
    }
  }, [page]);

  // 리뷰 클릭 시 상세 페이지로 이동
  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, {
      state: { fromReviewFeed: true },
    });
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !isLoading) {
        console.log("Triggering next page load…");
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, isLoading]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // 필터링 핸들러
  const filterReviews = (showSpoilers) => {
    setShowSpoilerOnly(showSpoilers); // 스포일러 필터 설정
    setPage(0); // 페이지 초기화
    setReviews([]); // 기존 데이터 초기화
    setHasMore(true); // 추가 로딩 가능
    setInitialLoad(true); // 초기 로드 트리거
  };

  return (
    <ReviewFeedWrapper>
      <SearchInfoText>
        영화 리뷰
        <br />
        한눈에 보기
      </SearchInfoText>
      <FilterButtons>
        <button
          className={!showSpoilerOnly ? "active" : "inactive"}
          onClick={() => filterReviews(false)}
        >
          전체 리뷰
        </button>
        <button
          className={showSpoilerOnly ? "active" : "inactive"}
          onClick={() => filterReviews(true)}
        >
          스포일러 리뷰
        </button>
      </FilterButtons>

      <ReviewContainer>
        {reviews.map((review, index) => (
          <ReviewTicket
            key={`${review.reviewId}-${index}`} // 고유 키 생성
            onClick={() => handleReviewClick(review.reviewId)}
          >
            <ReviewLeft>
              <img src={review.movie.poster} alt={review.movie.title} />
            </ReviewLeft>
            <ReviewInfoSection>
              <ReviewInfoFirst>
                <ReviewCenter>
                  <div className="profile">
                    <img
                      src={review.user.profileImage}
                      alt={review.user.nickname}
                    />
                    <div className="user-info">
                      <div className="name">{review.user.nickname}</div>
                      <div className="date">
                        {new Date(review.createdAt)
                          .toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\./g, "-")
                          .replace(/-$/, "")
                          .replace(/-\s/g, "-")}{" "}
                        {new Date(review.createdAt).toLocaleTimeString(
                          "ko-KR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="movie-title">{review.movie.title}</p>
                  <div
                    className={`comment ${
                      !showSpoilerOnly && review.spoiler ? "blurred" : ""
                    }`}
                  >
                    {review.content.length > 90
                      ? `${review.content.slice(0, 92)}…`
                      : review.content}
                  </div>
                </ReviewCenter>

                <ReviewRight>
                  <div className="score">
                    {Array.from({ length: Math.round(review.movieScore) }).map(
                      (_, i) => (
                        <img
                          key={`${review.reviewId}-score-${i}`}
                          src="/assets/images/review/score-macarong.png"
                          alt="score"
                        />
                      )
                    )}
                  </div>
                </ReviewRight>
              </ReviewInfoFirst>

              <ReviewInfoSecond>
                <LikeIcon />
                <ReviewLike>{review.reviewLike}</ReviewLike>
                <CommentIcon />
                <ReviewComment>{review.comments}</ReviewComment>
              </ReviewInfoSecond>
            </ReviewInfoSection>
          </ReviewTicket>
        ))}
      </ReviewContainer>
    </ReviewFeedWrapper>
  );
};

export default ReviewFeed;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           