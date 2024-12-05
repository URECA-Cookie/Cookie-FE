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
    align-items: center;
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
`;

function CookieMovies() {
  const userInfo = useUserStore((state) => state.getUserInfo());
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      if (userInfo?.userId) {
        try {
          const response = await axiosInstance.get(
            `${serverBaseUrl}/api/movies/${userInfo.userId}/recommendations`
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
