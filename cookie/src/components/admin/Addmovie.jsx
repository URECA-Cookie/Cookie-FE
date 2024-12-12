import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import SearchMovieDetail from "./SearchMovieDetail";
import axiosInstance from "../../api/auth/axiosInstance";
import serverBaseUrl from "../../config/apiConfig";

export const DefalutContainer = styled.div`
  width: 1239px;
  height: 1030px;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  background-color: white;

  box-shadow:
    -1px 6px 10px rgba(0, 0, 0, 0.1),
    1px -6px 10px rgba(0, 0, 0, 0.1),
    -3px 4px 8px rgba(0, 0, 0, 0.06),
    3px -4px 8px rgba(0, 0, 0, 0.06);
`;
export const SearchBarContainer = styled.div`
  position: relative;
  left: 70%;
  margin: 0.625rem 0 1.875rem 0;
  height: 2.5rem;
  width: 100%;
  max-width: 37.5rem;
`;

export const SearchInput = styled.input`
  width: 50%;
  height: 100%;
  padding: 0.625rem 3.125rem 0.625rem 1.25rem;
  font-size: 1.125rem;
  border: 1px solid #ddd;
  border-radius: 1.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.15);
  }
`;

export const SearchIconButton = styled.button`
  position: absolute;
  top: 20px;
  left: 255px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const SearchTitle = styled.div`
  width: 1175px;
  height: 32px;
  border: none;
  background-color: var(--sub);
  color: var(--text);
  border-radius: 12px;
  margin: 3rem 1rem 0 1rem;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  gap: 100px;

  p {
    font-size: 20px;
    font-weight: 700;
  }
`;

const SearchedMovie = styled.div`
  margin-top: 16px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  margin: 0 3rem;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 790px;

  .movie__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 170px;
    min-height: 230px;
    margin-bottom: 10px;
  }

  .movie__info {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 125px;
  }

  h3 {
    margin: 8px 0 0 0;
    color: var(--text);
  }
  img {
    border-radius: 10px;
    width: 124px;
    height: 177px;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--text);
    grid-column: 5 / 6;
    justify-self: end;
    padding: 0 1rem;
  }
  button:hover {
    text-decoration: underline;
  }
`;
function AddMovie() {
  const [movies, setMovies] = useState([]); // 검색된 영화 목록 상태
  // const [visibleCount, setVisibleCount] = useState(10); // 보이는 영화 개수
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (isSearching || searchTerm.trim() === "") return;

    setIsSearching(true);
    axiosInstance
      .get(`/api/admin/movie/tmdb/${encodeURIComponent(searchTerm)}`)
      .then((response) => {
        console.log("API응답:", response);
        const movieData = Array.isArray(response.data.response)
          ? response.data.response
          : [];
        setMovies(movieData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMovieClick = (movieId) => {
    axiosInstance
      .get(`/api/admin/movie/tmdb/choice/${movieId}`, movieId)
      .then((response) => {
        console.log(response.data.response);
        const movieDetails = response.data.response;
        setSelectedMovie(movieDetails);
      })

      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const handleGoBack = () => {
    setSelectedMovie(null);
    setIsSelected(false);
  };

  // const onShowMore = () => {
  //   setVisibleCount((prevCount) => prevCount + 10);
  // };
  // const visibleMovies = movies.slice(0, visibleCount);

  return (
    <DefalutContainer>
      {selectedMovie ? (
        <SearchMovieDetail
          selectedMovie={selectedMovie}
          handleGoBack={handleGoBack}
        />
      ) : (
        <>
          <SearchBarContainer>
            <SearchInput
              placeholder="영화 제목을 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <SearchIconButton
              type="button"
              aria-label="검색"
              onClick={handleSearch}
            >
              <SearchIcon />
            </SearchIconButton>
          </SearchBarContainer>

          <SearchTitle>
            <p>검색된 영화</p>
          </SearchTitle>

          <SearchedMovie>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.movieId} className="movie__container">
                  <div
                    className="movie__info"
                    onClick={() => handleMovieClick(movie.movieId)}
                  >
                    <img src={movie.posterPath} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    {/* <p>
                      {movie.releaseDate} | {movie.country}
                    </p> */}
                  </div>
                </div>
              ))
            ) : (
              <p>검색한 영화가 없어요</p>
            )}
          </SearchedMovie>

          {/* {movies.length > visibleCount && (
            <button onClick={onShowMore} className="show-more-button">
              더 보기
            </button>
          )} */}
        </>
      )}
    </DefalutContainer>
  );
}

export default AddMovie;
