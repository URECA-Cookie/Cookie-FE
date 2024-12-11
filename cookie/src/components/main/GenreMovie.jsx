import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";

const GenreMovieList = styled.div`
  .genreBtn__contianer {
    margin-bottom: 0.8rem;
  }
  .genre__movie {
    display: flex;
    flex-direction: row;
    gap: 0.9rem;
    flex-wrap: wrap;
    align-items: start;
    padding: 0.625rem;
  }

  .genre__movie--list {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
    cursor: pointer;
  }

  .genre__movie--list img {
    border-radius: 0.75rem;
    width: 7.75rem;
    height: 11.07rem;
  }
  .genre__movie--list p {
    text-align: start;
    width: 7.75rem;
  }

  .genre__info--sub {
    color: #afafaf;
    font-size: 0.82rem;
  }

  @media (max-width: 768px) {
    .genre__movie {
      gap: 0.625rem;
      padding: 0.625rem 0;
    }
    .genre__movie p {
      font-size: 0.7rem;
    }
    .genre__movie--list {
      width: 5.7rem;
      gap: 0.5rem;
    }
    .genre__movie--list img {
      border-radius: 0.75rem;
      width: 5.875rem;
      height: 9.1875rem;
    }
    .genre__movie--list p {
      text-align: start;
      font-size: 0.7rem;
      width: auto;
    }
    .genre__info--sub {
      font-size: 0.7rem;
    }
  }
  @media (max-width: 390px) {
    .genre__movie {
      gap: 0.3rem;
    }
    .genre__movie--list {
      width: 5.35rem;
    }
    .genre__movie--list img {
      border-radius: 0.75rem;
      width: 5.375rem;
      height: 8.6875rem;
    }
    .genre__movie--list p {
      font-size: 0.65rem;
    }
  }
`;


function GenreMovie({ categorydata }) {
  const [selectedMainCategory] = useState("장르");
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const [genreMovies, setGenreMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await axiosInstance.get("/api/movies/categoryMovies", {
        params: {
          mainCategory: "장르",
          subCategory: genre,
        },
      });
      console.log(response.data);
      setGenreMovies(response.data.movies);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    }
  };
  useEffect(() => {
    const genreList = categorydata
      .filter((category) => category.mainCategory === "장르")
      .map((category) => category.subCategory);
    setGenres(genreList);
  }, [categorydata]);

  useEffect(() => {
    fetchMoviesByGenre(selectedGenre);
  }, [selectedGenre]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleMoreView = (mainCategory, subCategory) => {
    navigate("/special/category/movies", { state: { mainCategory, subCategory } });
  };

  return (
    <>
      <GenreMovieList>
        <Title>장르로 영화 찾기</Title>
        <div className="genreBtn__contianer">
          {genres
            .filter((genre) => genre !== "N/A")
            .map((genre, index) => (
              <GenreBtn
                key={index}
                $isSelected={selectedGenre === genre}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </GenreBtn>
            ))}
        </div>

        <MoreViewText onClick = {() => handleMoreView(selectedMainCategory, selectedGenre)}>{selectedGenre} 더보기 {'>'}</MoreViewText>

        <div className="genre__movie">
          {genreMovies.length > 0 ? (
            genreMovies.slice(0, 12).map((movie, index) => (
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
                    {new Date(movie.releasedAt).getFullYear()}﹒{movie.country}
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



const Title  = styled.h2`
  color: var(--text-wh);
  padding: 2rem 0 0.7rem 0.375rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const GenreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.4rem 0.3rem 0;
  padding: 0 0 0 0.375rem;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "#82DCFF" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  
  @media (max-width: 768px) {
    margin: 0 0.7rem 0.5rem 0;
    font-size: 0.9rem;
  }
`;

const MoreViewText = styled.p`
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 0.8rem;
`