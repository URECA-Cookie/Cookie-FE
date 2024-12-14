import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchBarContainer, SearchIconButton, SearchInput } from "./Addmovie";
import { MovieListContainer, TableTitle } from "./CookieMovieList";
import Pagination from "./Pagination";
import SearchIcon from "@mui/icons-material/Search";
import Edit from "../../assets/images/admin/Edit.svg";
import axiosInstance from "../../api/auth/axiosInstance";
import LikeList from "./LikeList";

export const DefalutContainer = styled.div`
  width: 1239px;
  min-height: 820px;
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
const IconContainer = styled.div``;
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
function Likes() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [registeredMovies, setRegisteredMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSearchSubmit = async () => {
    if (!searchKeyword.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/admin/movies/${searchKeyword}/${currentPage}`
      );
      console.log("검색된 영화", response.data.response);
      setRegisteredMovies(response.data.response.results);
      setTotalPages(response.data.response.totalPages);
    } catch (error) {
      console.error("검색 에러:", error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      handleSearchSubmit();
    }
  };
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    handleSearchSubmit();
  }, [currentPage]);

  const handleIconClick = (movieId) => {
    setSelectedMovieId(movieId);
  };
  return (
    <>
      <DefalutContainer>
        <SearchBarContainer>
          <SearchInput
            placeholder="영화 제목을 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIconButton
            type="button"
            aria-label="검색"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </SearchIconButton>
        </SearchBarContainer>
        <TableTitle>
          <p></p>
          <p>영화제목</p>
          <p>개봉일</p>
          <p>감독</p>
          <p>배우</p>
          <p>줄거리</p>
          <p style={{ width: "40px" }}>관리</p>
        </TableTitle>
        <MovieListContainer>
          {Array.isArray(registeredMovies) && registeredMovies.length > 0 ? (
            registeredMovies.map((movie) => (
              <React.Fragment key={movie.movieId}>
                <p></p>
                <p className="grid-item">{movie.title}</p>
                <p className="grid-item">
                  {new Date(movie.releaseDate).getFullYear()}
                </p>

                <p className="grid-item">
                  {movie.director ? movie.director : "No director available"}
                </p>
                <p className="grid-item">
                  {movie.actors && movie.actors.length > 0
                    ? movie.actors.map((actor) => actor).join(", ")
                    : "No actors available"}
                </p>
                <p className="grid-item">{movie.plot}</p>

                <IconContainer className="grid-item">
                  <IconButton
                    style={{ width: "70px" }}
                    onClick={() => handleIconClick(movie.movieId)}
                  >
                    <img src={Edit} alt={`edit`} />
                  </IconButton>
                </IconContainer>
              </React.Fragment>
            ))
          ) : (
            <p style={{ width: "200px" }}>검색된 영화가 없어요</p>
          )}
        </MovieListContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </DefalutContainer>

      {selectedMovieId && <LikeList movieId={selectedMovieId} />}
    </>
  );
}

export default Likes;
