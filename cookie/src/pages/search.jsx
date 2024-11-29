import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SearchBar from "../components/searchpage/SearchBar";
import SearchResults from "../components/searchpage/SearchResults";
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
  overflow-y: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #04012d;
      color: #fff;
    }

    &.inactive {
      background-color: #f0f0f0;
      color: #666;
    }

    &:hover {
      background-color: #ddd;
    }
  }
`;

const Search = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("movie");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  // 디바운스 타이머를 저장할 변수
  const [debounceTimer, setDebounceTimer] = useState(null);

  // 스크롤 상태 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setShowTopButton(scrollTop > 200);

      if (
        window.innerHeight + scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // 검색 API 호출
  const fetchSearchResults = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/search`,
        {
          params: { type: activeTab, keyword: searchTerm, page },
        }
      );

      const newResults = response.data.content;
      setResults((prevResults) =>
        page === 0 ? newResults : [...prevResults, ...newResults]
      );
      setHasMore(!response.data.last);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]); // 에러 발생 시 결과 초기화
      setHasMore(false);
    }
  };

  // 검색어와 탭 변경 시 API 호출 (디바운스 적용)
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setPage(0); // 페이지 초기화
      setHasMore(true);
      fetchSearchResults();
    }, 100); // 디바운스 딜레이 100ms

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [searchTerm, activeTab]);

  // 페이지 변경 시 추가 데이터 로드
  useEffect(() => {
    if (page > 0) {
      fetchSearchResults();
    }
  }, [page]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
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
        <Tabs>
          <button
            className={activeTab === "movie" ? "active" : "inactive"}
            onClick={() => handleTabClick("movie")}
          >
            영화명
          </button>
          <button
            className={activeTab === "actor" ? "active" : "inactive"}
            onClick={() => handleTabClick("actor")}
          >
            배우명
          </button>
          <button
            className={activeTab === "director" ? "active" : "inactive"}
            onClick={() => handleTabClick("director")}
          >
            감독명
          </button>
        </Tabs>
        <SearchResults
          results={results}
          activeTab={activeTab}
          onMovieClick={handleMovieClick}
        />
      </ContentWrapper>
      {showTopButton && <TopButton onClick={scrollToTop} />}
    </Container>
  );
};

export default Search;