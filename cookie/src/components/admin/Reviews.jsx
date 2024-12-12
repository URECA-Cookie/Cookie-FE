import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
  DefalutContainer,
  SearchBarContainer,
  SearchIconButton,
  SearchInput,
} from "./Addmovie";
import { TableTitle, MovieListContainer } from "./CookieMovieList";
import useMovieStore from "../../stores/useMovieStore";
import Pagination from "./Pagination";
import Edit from "../../assets/images/admin/Edit.svg";
import axiosInstance from "../../api/auth/axiosInstance";
import toast from "react-hot-toast";
import ReviewList from "./ReviewList";

const IconContainer = styled.div``;
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

function Reviews() {
  //   const {
  //     registeredMovies,
  //     totalPages,
  //     loading,
  //     currentPage,
  //     fetchMovies,
  //     setCurrentPage,
  //   } = useMovieStore((state) => state);

  //   useEffect(() => {
  //     fetchMovies(currentPage);
  //   }, [currentPage, fetchMovies]);

  //   const handlePageChange = (page) => {
  //     setCurrentPage(page);
  //   };
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [registeredMovies, setRegisteredMovies] = useState([]);

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
      toast.error("검색결과가 없어요", error);
      if (error.response.data === "검색 결과가 없습니다.") {
        toast.error(error.response.data);
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

  useEffect(() => {
    if (searchKeyword.trim()) {
      setSearchKeyword(searchKeyword);
    }
  }, [searchKeyword, currentPage]);

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
                  <IconButton style={{ width: "70px" }}>
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

      <ReviewList />
    </>
  );
}

export default Reviews;
