import React from "react";
import styled from "styled-components";
import { SearchBarContainer, SearchIconButton, SearchInput } from "./Addmovie";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Like from "../../assets/images/admin/like.svg";
import Edit from "../../assets/images/admin/Edit.svg";
import More from "../../assets/images/admin/more.svg";
import MovieInfoModal from "./MovieInfoModal";
import EditCategory from "./EditCategory";
import axiosInstance from "../../api/auth/axiosInstance";

const AddMovieContainer = styled.div`
  width: 1239px;
  height: 840px;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 50px;
  background-color: white;
  box-shadow:
    -1px 6px 10px rgba(0, 0, 0, 0.1),
    1px -6px 10px rgba(0, 0, 0, 0.1),
    -3px 4px 8px rgba(0, 0, 0, 0.06),
    3px -4px 8px rgba(0, 0, 0, 0.06);
`;
export const TableTitle = styled.div`
  width: 1175px;
  height: 32px;
  border: none;
  background-color: var(--sub);
  color: var(--text);
  border-radius: 12px;
  margin: 0.5rem 1rem 0 1rem;
  padding: 0 1.4rem;
  display: grid;
  grid-template-columns: 0.5fr 1.77fr 0.5fr 1fr 2fr 3fr 0.8fr;
  gap: 20px;
  justify-content: center;

  p {
    font-size: 20px;
    font-weight: 700;
    text-align: start;
    display: flex;
    align-items: center;
  }
`;

export const MovieListContainer = styled.div`
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: 0.1fr 2fr 0.5fr 1fr 1.5fr 3fr 0.8fr;
  grid-template-rows: repeat(10, 1fr);
  gap: 14px;
  min-height: 600px;
  align-items: start;

  .grid-item {
    display: flex;
    align-items: start;
    justify-content: start;
  }

  p {
    height: 38px;
    overflow: hidden;
    color: var(--text);
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
export const UnderlinedButton = styled.button`
  padding: 3px 33px;
  background: none;
  color: var(--text);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  position: relative;

  &:hover {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 30px;
      width: 40%;
      height: 1px;
      background-color: var(--text);
    }
  }
`;
const DeleteCheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 12px;
`;
const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 1240px;
`;
const RecommendTitle = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
`;
const AdminRecomendList = styled.div`
  background-color: var(--ticket-bg);
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  height: 680px;
  width: 1240px;
  padding: 30px 30px;
  border-radius: 12px;
  gap: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px 0;

  .movieInfo__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 180px;
    position: relative;
  }
  img {
    border-radius: 10px;
    width: 177px;
    height: 245px;
  }
`;
const CookieMovieList = () => {
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [totalPages, setTotalPages] = useState(5); // 총 페이지
  const [loading, setLoading] = useState(true); //로딩 상태
  const [selectedMovieId, setSelectedMovieId] = useState([]); //선택된 영화 Id
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // EditCategory 페이지
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화
  const [registeredMovies, setRegisteredMovies] = useState([]); // 등록된 영화 목록 상태 추가
  const [recommendList, setRecommendList] = useState([]);
  const [addMovieIds, setAddMovieIds] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!searchKeyword.trim()) {
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/api/admin/movies/${searchKeyword}/1`
      );
      console.log("검색된영화", response.data.response.results);
      setRegisteredMovies(response.data.response.results);
    } catch (error) {
      console.error("영화 검색 실패", error);
    }
  };

  //등록된 영화목록
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/admin/movies/${currentPage}`
        );
        console.log(response);
        setTotalPages(response.data.response.totalPages);
        setRegisteredMovies(response.data.response.results);
      } catch (error) {
        console.error("영화 목록을 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handleCheckboxChange = (movieId) => {
    setSelectedMovieId((prevSelectedIds) =>
      prevSelectedIds.includes(movieId)
        ? prevSelectedIds.filter((id) => id !== movieId)
        : [...prevSelectedIds, movieId]
    );
  };
  const fetchRecommendList = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/recommend");
      console.log("추천영화리스트", response.data.response);
      setRecommendList(response.data.response);
    } catch (error) {
      console.error("추천 리스트를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    console.log("useEffect 호출");
    fetchRecommendList();
  }, []);

  const createIconAction = (type, movie) => {
    return (e) => {
      e.stopPropagation();
      switch (type) {
        case "like":
          handleLikeClick(movie.movieId);
          break;
        case "edit":
          setSelectedMovie(movie);
          setIsEditOpen(true);
          setIsModalOpen(false);
          break;
        case "more":
          setSelectedMovie(movie);
          setIsEditOpen(false);
          openModal(movie);
          break;
        default:
          break;
      }
    };
  };

  const Icon = [
    { src: Like, type: "like" },
    { src: Edit, type: "edit" },
    { src: More, type: "more" },
  ];

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovieId([]);
    setIsModalOpen(false);
  };

  const handleLikeClick = (movieId) => {
    console.log("선택한 MovieId:", movieId);

    setAddMovieIds((prevIds) => {
      if (prevIds.includes(movieId)) {
        return prevIds.filter((id) => id !== movieId);
      } else {
        return [...prevIds, movieId];
      }
    });
  };

  const handleDelete = async () => {
    if (selectedMovieId.length > 0) {
      const isConfirmed = window.confirm("선택한 영화를 삭제할까요?");
      if (isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/api/admin/movies`, {
            data: selectedMovieId,
          });
          console.log("삭제 완료:", response.data);

          setRegisteredMovies((prevMovies) =>
            prevMovies.filter(
              (movie) => !selectedMovieId.includes(movie.movieId)
            )
          );
          setSelectedMovieId([]);
          alert("선택한 영화가 삭제되었습니다.");
        } catch (error) {
          console.error("영화를 삭제하는 데 실패했습니다.", error);
          alert("영화 삭제에 실패했습니다.");
        }
      }
    }
  };

  /*관리자 추천 영화 삭제*/
  const handlRecommendDeleteAll = async () => {
    const movieIds = recommendList.map((movie) => movie.movieId);
    if (movieIds.length === 0) {
      alert("삭제할 항목이 없습니다.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/api/admin/recommend`,
        movieIds
      );
      console.log("삭제 성공", response);

      setRecommendList([]);
    } catch (error) {
      console.error("추천 리스트 삭제 실패", error);
    }
  };
  const handleAddRecommendMovie = async () => {
    if (addMovieIds.length === 0) {
      alert("추가할 영화가 선택되지 않았습니다.");
      return;
    }
    console.log("Sending movie IDs:", addMovieIds);

    try {
      const response = await axiosInstance.post(
        `/api/admin/recommend`,
        addMovieIds
      );
      console.log("추천 영화 추가 성공", response);
      setRecommendList((prevList) => [...prevList, ...addMovieIds]);
      setAddMovieIds([]);
    } catch (error) {
      console.error("추천 영화 추가 실패", error);
    }
  };

  useEffect(() => {
    fetchRecommendList();
  }, []);

  return (
    <>
      <AddMovieContainer>
        <SearchBarContainer>
          <SearchInput
            placeholder="영화 제목을 입력하세요"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <SearchIconButton
            type="button"
            aria-label="검색"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </SearchIconButton>
        </SearchBarContainer>
        <UnderlinedButton onClick={handleDelete}>선택 삭제</UnderlinedButton>
        <TableTitle>
          <p>삭제</p>
          <p>영화제목</p>
          <p>개봉일</p>
          <p>감독</p>
          <p>배우</p>
          <p>줄거리</p>
          <p>관리</p>
        </TableTitle>
        <MovieListContainer>
          {loading ? (
            <p></p>
          ) : Array.isArray(registeredMovies) && registeredMovies.length > 0 ? (
            registeredMovies.map((movie) => (
              <React.Fragment key={movie.movieId}>
                <DeleteCheckBox
                  type="checkbox"
                  checked={selectedMovieId.includes(movie.movieId)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleCheckboxChange(movie.movieId)}
                ></DeleteCheckBox>

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
                  {Icon.map((icon, index) => (
                    <IconButton
                      key={index}
                      onClick={(event) => {
                        event.stopPropagation();
                        createIconAction(icon.type, movie)(event);
                      }}
                    >
                      <img src={icon.src} alt={`icon-${index}`} />
                    </IconButton>
                  ))}
                </IconContainer>
              </React.Fragment>
            ))
          ) : (
            <p></p>
          )}
        </MovieListContainer>

        {isModalOpen && selectedMovie && (
          <MovieInfoModal
            movieId={selectedMovie.movieId}
            onClose={closeModal}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </AddMovieContainer>
      {isEditOpen && selectedMovie && (
        <EditCategory
          movie={selectedMovie}
          closeModal={() => setIsEditOpen(false)}
        />
      )}
      <TitleSection>
        <RecommendTitle>
          <img src={Like} />
          <h1>추천리스트 10</h1>
        </RecommendTitle>

        {recommendList.length > 0 ? (
          <UnderlinedButton onClick={handlRecommendDeleteAll}>
            삭제
          </UnderlinedButton>
        ) : (
          <UnderlinedButton onClick={handleAddRecommendMovie}>
            추가
          </UnderlinedButton>
        )}
      </TitleSection>
      <AdminRecomendList>
        {recommendList.length > 0 ? (
          recommendList.map((movie, index) => (
            <div className="movieInfo__list" key={index}>
              <img src={movie.posterPath} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>추천 리스트가 없습니다.</p>
        )}
      </AdminRecomendList>
    </>
  );
};

export default CookieMovieList;
