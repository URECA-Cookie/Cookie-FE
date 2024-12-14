import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";

function SpecialMovie({ categorydata }) {
  const filteredCategoryData = categorydata.filter(
    (item) => item.id >= 21 && item.id <= 40
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState("시즌");
  const [selectedSubCategory, setSelectedSubCategory] = useState("설레는봄");
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const moviesPerSlide = 4;
  const navigate = useNavigate();

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(null);
  };
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const fetchMoviesByCategory = async (mainCategory, subCategory) => {
    if (!mainCategory || !subCategory) return;
    const cacheKey = `${mainCategory}_${subCategory}`;
    const cachedMovies = localStorage.getItem(cacheKey);
    setIsLoading(true);
    if (cachedMovies) {
      setMovies(JSON.parse(cachedMovies));
    } else {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/categoryMovies`,
          {
            params: {
              mainCategory: mainCategory,
              subCategory: subCategory,
              page: currentPage - 1,
              size: 12,
            },
          }
        );

        setMovies(response.data.movies);
        localStorage.setItem(cacheKey, JSON.stringify(response.data.movies));
      } catch (error) {
        console.error("영화 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const mainCategories = Array.from(
    new Set(filteredCategoryData.map((item) => item.mainCategory))
  );

  const getSubCategories = (mainCategory) => {
    return filteredCategoryData
      .filter((item) => item.mainCategory === mainCategory)
      .map((item) => item.subCategory);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    if (selectedMainCategory) {
      let firstSubCategory = getSubCategories(selectedMainCategory)[0];
      if (selectedSubCategory === "설레는봄" || !selectedSubCategory) {
        setSelectedSubCategory(firstSubCategory);
      }
    }
  }, [selectedMainCategory]);

  useEffect(() => {
    if (
      selectedMainCategory &&
      selectedSubCategory &&
      selectedSubCategory !== "설레는봄"
    ) {
      fetchMoviesByCategory(selectedMainCategory, selectedSubCategory);
    }
  }, [selectedMainCategory, selectedSubCategory]);

  const handleMoreView = (mainCategory, subCategory) => {
    navigate("/category/movies", { state: { mainCategory, subCategory } });
  };

  const slides = Array.from(
    { length: Math.ceil(movies.length / moviesPerSlide) },
    (_, i) => movies.slice(i * moviesPerSlide, (i + 1) * moviesPerSlide)
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <SpecialMovieList>
        <Title>영화 선택 시간을 덜어드려요</Title>

        <div>
          {mainCategories.map((mainCategory, index) => (
            <ThemeBtn
              key={index}
              onClick={() => handleMainCategoryClick(mainCategory)}
              $isSelected={selectedMainCategory === mainCategory}
            >
              {mainCategory}
            </ThemeBtn>
          ))}
        </div>

        {selectedMainCategory && (
          <div className="movie__category">
            {getSubCategories(selectedMainCategory).map(
              (subCategory, index) => (
                <CategoryBtn
                  key={index}
                  onClick={() => handleSubCategoryClick(subCategory)}
                  $isSelected={selectedSubCategory === subCategory}
                >
                  {subCategory}
                </CategoryBtn>
              )
            )}
          </div>
        )}
        <MoreViewText
          onClick={() =>
            handleMoreView(selectedMainCategory, selectedSubCategory)
          }
        >
          {selectedSubCategory} 더보기 {">"}
        </MoreViewText>

        <div className="specialMovie__movie--wrapper">
          <button
            className="prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <div
            className="specialMovie__list"
            style={{
              transform: `translateX(-${currentIndex * 57}%)`,
            }}
          >
            {movies &&
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="specialMovie__list--info"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <Poster src={movie.poster} alt={movie.title} />

                  <MovieInfo>
                    <Review>
                      <ReviewIcon alt="Review Icon" />
                      <Count>{movie.reviews}</Count>
                    </Review>
                    <Like>
                      <LikeIcon alt="Review Icon" />
                      <Count>{movie.likes}</Count>
                    </Like>
                  </MovieInfo>
                </div>
              ))}
          </div>
          <button
            className="next"
            onClick={handleNext}
            disabled={currentIndex === slides.length - 1}
          >
            &gt;
          </button>
        </div>
      </SpecialMovieList>
    </>
  );
}

export default SpecialMovie;

const SpecialMovieList = styled.div`
  position: relative;
  .movie__category {
    display: flex;
    gap: 0.4rem;
    margin: 0.5rem 0 0 0;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 0 0 0.375rem;
  }

  .specialMovie__movie--wrapper {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .specialMovie__list {
    display: flex;
    transition: transform 1s ease;
    align-items: start;
  }

  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
  }

  .prev {
    left: -15px;
  }

  .next {
    right: -15px;
  }

  .prev:disabled,
  .next:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ThemeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.8rem 0 0;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "#82DCFF" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  padding: 0 0 0 0.375rem;

  @media (max-width: 768px) {
    margin: 0 0.7rem 0.5rem 0;
    font-size: 0.9rem;
  }
`;

const CategoryBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "var(--sub)" : "white")};
  color: ${(props) => (props.$isSelected ? "var(--text)" : "var(--text)")};
  font-size: 13px;
  font-weight: ${(props) => (props.$isSelected ? "bold" : "500")};
  border-radius: 0.3rem;
  border: 1px solid var(--sub);
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--sub);
    color: var(--text);
  }
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0.4rem 0.8rem;
  }
`;

const Title = styled.h2`
  color: var(--text-wh);
  padding: 2rem 0 0.7rem 0.375rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const ReviewIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url("/assets/images/main/review.svg");
  padding-right: 0.4rem;
`;

const Count = styled.p`
  font-size: 0.8rem;
  color: #ffffff;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const LikeIcon = styled.svg`
  width: 14px;
  height: 14px;
  margin: 0;
  background: no-repeat center/cover url("/assets/images/main/like.svg");
`;

const MovieInfo = styled.div`
  display: flex;
`;

const Poster = styled.img`
  transition: transform 0.3s ease;
  border-radius: 0.65rem;
  width: 8.75rem;
  height: 12.0625rem;
  padding: 0.4rem 0.375rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.3rem;
    width: 7rem;
    height: 10rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    width: 6.2rem;
    height: 9.3rem;
  }
  @media (max-width: 390px) {
    padding: 0.4rem 0.3rem;
    width: 5.6rem;
    height: 8.7rem;
  }
`;

const MoreViewText = styled.p`
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 0.8rem;
`;
