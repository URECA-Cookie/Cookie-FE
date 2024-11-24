import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../components/searchpage/SearchBar";
import SearchResults from "../components/searchpage/SearchResultsForReview";
import TopButton from "../components/searchpage/TopButton";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 70px 15px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto; /* 스크롤 가능 */
  background: #fffff;
  border-radius: 10px;

  padding: 20px;
  box-sizing: border-box;

  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const SearchForReview = () => {
  const movies = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `랜덤 영화 ${i + 1}`,
    year: 2000 + (i % 23),
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지"][i % 5],
    duration: `${90 + i}분`,
    director: `감독 ${i + 1}`,
    actors: [`배우 ${i + 1}`, `배우 ${i + 2}`],
    imageUrl: `https://via.placeholder.com/80x120?text=영화+${i + 1}`,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredDirectors, setFilteredDirectors] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);
  const [showTopButton, setShowTopButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setShowTopButton(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMovies([]);
      setFilteredDirectors([]);
      setFilteredActors([]);
      return;
    }

    const movieResults = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const directorResults = movies.filter((movie) =>
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const actorResults = movies.filter((movie) =>
      movie.actors.some((actor) =>
        actor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredMovies(movieResults);
    setFilteredDirectors(directorResults);
    setFilteredActors(actorResults);
  }, [searchTerm]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}/review`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <ContentWrapper>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {}}
        />
        <SearchResults
          filteredMovies={filteredMovies}
          filteredDirectors={filteredDirectors}
          filteredActors={filteredActors}
          onMovieClick={handleMovieClick}
        />
      </ContentWrapper>
      <TopButton visible={showTopButton} onClick={scrollToTop} />
    </Container>
  );
};

export default SearchForReview;
