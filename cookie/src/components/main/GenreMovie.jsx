import React, { useState } from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import { useNavigate, useParams } from "react-router-dom";

const GenreMovieList = styled.div`
  position: relative;

  .genre__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .genreBtn__contianer {
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }
  .genre__movie {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.9rem;
    flex-wrap: wrap;
    padding: 0.625rem;
  }

  .genre__movie--list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .genre__movie--list img {
    border-radius: 0.75rem;
  }
  .genre__movie--list p {
    text-align: start;
  }

  .genre__info--sub {
    color: #afafaf;
    font-size: 13px;
  }
`;

const GenreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.8rem 0.3rem 0;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "var(--main)" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
`;

function GenreMovie() {
  const MovieGenre = [
    {
      id: 1,
      genre: "로맨스",
    },
    {
      id: 2,
      genre: "공포",
    },
    {
      id: 3,
      genre: "코미디",
    },
    {
      id: 4,
      genre: "액션",
    },
    {
      id: 5,
      genre: "판타지",
    },
    {
      id: 6,
      genre: "애니메이션",
    },
    {
      id: 7,
      genre: "범죄",
    },
    {
      id: 8,
      genre: "SF",
    },
    {
      id: 9,
      genre: "음악",
    },
    {
      id: 10,
      genre: "스릴러",
    },
    {
      id: 11,
      genre: "전쟁",
    },
    {
      id: 12,
      genre: "다큐멘터리",
    },
    {
      id: 13,
      genre: "드라마",
    },
    {
      id: 14,
      genre: "가족",
    },
    {
      id: 15,
      genre: "역사",
    },
    {
      id: 16,
      genre: "미스터리",
    },
    {
      id: 17,
      genre: "TV영화",
    },
    {
      id: 18,
      genre: "서부극",
    },
    {
      id: 19,
      genre: "모험",
    },
  ];
  // 더미데이터
  const GenreMovies = Array.from({ length: 60 }, (_, i) => ({
    movieId: i + 1,
    title: `영화 ${i + 1}`,
    poster: `https://via.placeholder.com/124x177`,
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다.`,
    nation: ["미국", "한국", "대만", "중국", "캐나다", "프랑스"][i % 6],
    released: `20${10 + (i % 20)}`,
    runtime: `${120 + i}분`,
    score: Math.floor(Math.random() * 5) + 1,
    rating: i + 1 <= 10 ? "teenager" : "adult",
    genre: [
      "스릴러",
      "액션",
      "코미디",
      "드라마",
      "판타지",
      "로맨스",
      "미스터리",
    ][i % 7],

    //서비스내 자체 추가 부분
    reviews: Math.floor(Math.random() * 1901) + 100,
    likes: Math.floor(Math.random() * 1701) + 300,
  }));
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGenreClick = (genre) => {
    if (genre !== selectedGenre) {
      setSelectedGenre(genre);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };
  const filteredMovies = selectedGenre
    ? GenreMovies.filter((movie) => movie.genre === selectedGenre)
    : GenreMovies;

  return (
    <>
      <GenreMovieList>
        <div className="genre__title">
          <img src={videoIcon} alt="video_icon" />
          <h2>장르별 영화</h2>
        </div>
        <div className="genreBtn__contianer">
          {MovieGenre.map((genre) => (
            <GenreBtn
              key={genre.id}
              $isSelected={selectedGenre === genre.genre}
              onClick={() => handleGenreClick(genre.genre)}
            >
              {genre.genre}
            </GenreBtn>
          ))}
        </div>
        <div className="genre__movie">
          {filteredMovies.length > 0 ? (
            filteredMovies.slice(0, 12).map((movie, index) => (
              <div
                key={index}
                className="genre__movie--list"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <p>
                    <strong>{movie.title}</strong>
                  </p>
                  <p>
                    {movie.released}﹒{movie.nation}
                  </p>
                  <p>{movie.genre}</p>
                  <p className="genre__info--sub">리뷰 : {movie.reviews}개</p>
                  <p className="genre__info--sub">좋아요 : {movie.likes}개</p>
                </div>
              </div>
            ))
          ) : (
            <p>해당하는 장르 영화가 없어요🥲</p>
          )}
        </div>
      </GenreMovieList>
    </>
  );
}

export default GenreMovie;
