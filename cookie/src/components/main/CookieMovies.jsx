import { useEffect, useState } from "react";
import styled from "styled-components";
import cookieMovie from "../../assets/images/main/cookie_icon.svg";
import useUserStore from "../../stores/useUserStore";
import axiosInstance from "../../api/auth/axiosInstance";
import serverBaseUrl from "../../config/apiConfig";

const CookieMovieList = styled.div`
  position: relative;

  .cookieMovie__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .cookieMovie__title span {
    color: var(--text);
  }

  .cookie__movie {
    display: flex;
    flex-direction: row;
    align-items: start;
    overflow-x: auto;
    padding: 0.625rem;
    cursor: pointer;
    gap: 1rem;
    &:hover {
      overflow-x: scroll;
    }
  }

  .cookie__movie--list {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }
  .cookie__movie--list img {
    border-radius: 0.75rem;
    width: 124px;
    height: 177px;
  }
  .cookie__movie--list p {
    text-align: start;
  }

  .movie__info--sub {
    color: #afafaf;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    .cookieMovie__title {
      font-size: 0.8rem;
    }
    .cookie__movie {
      gap: 0.5rem;
      padding: 0.625rem 0;
    }
    .cookie__movie--list img {
      border-radius: 0.75rem;
      width: 5.875rem;
      height: 9.1875rem;
    }

    .cookie__movie--list p {
      text-align: start;
      font-size: 0.7rem;
    }
  }
  @media (max-width: 390px) {
    .cookie__movie {
      gap: 0.3rem;
      padding: 0.625rem 0;
    }
    .cookie__movie--list img {
      border-radius: 0.75rem;
      width: 5.375rem;
      height: 8.6875rem;
    }

    .cookie__movie--list p {
      font-size: 0.65rem;
    }
  }
`;

function CookieMovies() {
  const userInfo = useUserStore((state) => state.getUserInfo());
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  if (!userInfo.userId) {
    return null;
  }

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      if (userInfo?.userId) {
        try {
          const response = await axiosInstance.get(
            `${serverBaseUrl}/api/movies/recommendations`
          );
          const movies = response.data.response || [];
          setRecommendedMovies(movies);
        } catch (error) {
          console.error("영화 추천 목록을 가져오는 데 실패했습니다.", error);
        }
      }
    };
    fetchRecommendedMovies();
  }, []);

  return (
    <>
      <CookieMovieList>
        <div className="cookieMovie__title">
          <img src={cookieMovie} alt="cookie_icon" />
          <h2>
            <span>{userInfo.nickname}</span>님의 <span>쿠키</span>리즘
          </h2>
        </div>
        <div className="cookie__movie">
          {recommendedMovies.map((movie, index) => (
            <div key={index} className="cookie__movie--list">
              <img src={movie.poster} alt={movie.title} />
              <div>
                <p>
                  <strong>{movie.title}</strong>
                </p>
                <p>
                  {new Date(movie.releasedAt).getFullYear()}﹒{movie.country}
                </p>

                <p className="movie__info--sub">리뷰 : {movie.reviews}개</p>
                <p className="movie__info--sub">좋아요 : {movie.likes}개</p>
              </div>
            </div>
          ))}
        </div>
      </CookieMovieList>
    </>
  );
}

export default CookieMovies;
