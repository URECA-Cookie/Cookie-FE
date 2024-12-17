import { useEffect, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";
import useAuthStore from "../../stores/useAuthStore";
import { SkeletonOverlay } from "./AdminRecommend";
// import likeHeart from "../../assets/images/main/like-heart2.svg";
// import reivew from "../../assets/images/main/reviews.svg";
import likeHeart from "/assets/images/main/like-heart2.svg";
import reivew from "/assets/images/main/reviews.svg";

function CookieMovies() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const userInfo = useUserStore((state) => state.getUserInfo());
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!userInfo?.nickname) {
    return null;
  }

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/api/movies/recommendations`);
        const movies = response.data.response || [];
        setRecommendedMovies(movies);
      } catch (error) {
        console.error("영화 추천 목록을 가져오는 데 실패했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, [isLoggedIn]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const calculateSlidePercentage = (totalMovies) => {
    const moviesPerPage = 4;
    return (
      (100 / Math.max(moviesPerPage, totalMovies)) *
      Math.min(moviesPerPage, totalMovies)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex < Math.ceil(recommendedMovies.length / 4)
        ? newIndex
        : prevIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex >= 0 ? newIndex : prevIndex;
    });
  };

  return (
    <>
      <CookieMovieList>
        <Title>
          <span>{userInfo.nickname}</span>님의 맞춤 영화
        </Title>
        <div className="cookie__movie--wrapper">
          <button
            className="prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <div
            className="cookie__movie"
            style={{
              transform: `translateX(-${currentIndex * calculateSlidePercentage(recommendedMovies.length)}%)`,
            }}
          >
            {recommendedMovies.map((movie, index) => (
              <div key={index} className="cookie__movie--list">
                <div
                  onClick={() => handleMovieClick(movie.id)}
                  style={{ cursor: "pointer" }}
                >
                  {isLoading ? (
                    <SkeletonOverlay />
                  ) : (
                    <Poster src={movie.poster} alt={movie.title} />
                  )}
                  <MovieInfo>
                    <Like>
                      <LikeIcon alt="Review Icon" />
                      <Count>{movie.likes}</Count>
                    </Like>
                    <Review>
                      <ReviewIcon alt="Review Icon" />
                      <Count>{movie.reviews}</Count>
                    </Review>
                  </MovieInfo>
                </div>
              </div>
            ))}
          </div>
          <button
            className="next"
            onClick={handleNext}
            disabled={
              currentIndex >= Math.ceil(recommendedMovies.length / 4) - 1
            }
          >
            &gt;
          </button>
        </div>
      </CookieMovieList>
    </>
  );
}

export default CookieMovies;

const CookieMovieList = styled.div`
  position: relative;
  .cookie__movie--wrapper {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .cookie__movie {
    display: flex;
    flex-direction: row;
    align-items: start;
    transition: transform 1s ease;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
  }

  .prev {
    left: -15px;
  }

  .next {
    right: -15px;
  }

  .prev:disabled,
  .next:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  color: var(--text-wh);
  padding: 2rem 0 0 0.375rem;
  span {
    color: #f84b99;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const ReviewIcon = styled.svg`
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: no-repeat center/cover url(${reivew});
`;

const Count = styled.p`
  font-size: 0.8rem;
  color: #ffffff;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const LikeIcon = styled.svg`
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: no-repeat center/cover url(${likeHeart});
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Poster = styled.img`
  transition: transform 0.3s ease;
  border-radius: 0.65rem;
  width: 8.75rem;
  height: 12.0625rem;
  padding: 0.4rem 0.375rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.3rem;
    width: 7rem;
    height: 10rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    width: 6.2rem;
    height: 9.3rem;
  }
  @media (max-width: 393px) {
    padding: 0.4rem 0.3rem;
    width: 5.6rem;
    height: 8.7rem;
  }
  @media (max-width: 390px) {
    padding: 0.4rem 0.3rem;
    width: 5.6rem;
    height: 8.7rem;
  }
`;
