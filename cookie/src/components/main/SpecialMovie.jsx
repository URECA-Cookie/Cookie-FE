import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";
// import likeHeart from "../../assets/images/main/like-heart2.svg";
// import reivew from "../../assets/images/main/reviews.svg";
import likeHeart from "/assets/images/main/like-heart2.svg";
import reivew from "/assets/images/main/reviews.svg";

function SpecialMovie({ categorydata }) {
  const filteredCategoryData = categorydata.filter(
    (item) => item.id >= 21 && item.id <= 40
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState("시즌");
  const [selectedSubCategory, setSelectedSubCategory] = useState("설레는봄");
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [startX, setStartX] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const navigate = useNavigate();

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(null);
    setCurrentIndex(0);
  };
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setCurrentIndex(0);
  };

  const fetchMoviesByCategory = async (mainCategory, subCategory) => {
    if (!mainCategory || !subCategory) return;

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
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
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

  const handleNext = () => {
    if (currentIndex < Math.ceil(movies.length / 4) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // useEffect(() => {
  //   const totalPages = Math.ceil(movies.length / 4);
  // }, [currentIndex, movies]);

  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    setStartX(touchStart);
    setIsTouching(true);
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    if (!isTouching) return;
    const touchMove = e.touches[0].clientX;
    const delta = touchMove - startX;
    const percentage = (delta / window.innerWidth) * 100;
    const currentPercentage =
      (currentIndex * 100) / Math.ceil(movies.length / 4);
    e.currentTarget.style.transform = `translateX(-${currentPercentage - percentage}%)`;
    e.stopPropagation();
  };

  const handleTouchEnd = (e) => {
    setIsTouching(false);
    const deltaX = startX - e.changedTouches[0].clientX;
    const moveThreshold = 50;
    const maxIndex = Math.ceil(movies.length / 4) - 1;

    const slider = e.currentTarget;

    if (deltaX > moveThreshold && currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    } else if (deltaX < -moveThreshold && currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }

    slider.style.transform = `translateX(-${(currentIndex * 100) / Math.ceil(movies.length / 4)}%)`;
    e.stopPropagation();
  };

  return (
    <>
      <SpecialMovieList>
        <Title>어떤 영화를 골라볼까요?</Title>

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
          {movies.length === 0 ? (
            <p style={{ color: "#ffffff", paddingLeft: "7px" }}>
              해당 영화가 없어요
            </p>
          ) : (
            <>
              <button
                className="prev"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <div
                className="specialMovie__list"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  touchAction: "none",
                  transform: `translateX(-${(currentIndex * 100) / Math.ceil(movies.length / 4)}%)`,
                }}
              >
                {movies.map((movie, index) => (
                  <div
                    key={index}
                    className="specialMovie__list--info"
                    onClick={() => handleMovieClick(movie.id)}
                    style={{
                      cursor: "pointer",
                      pointerEvents: isTouching ? "none" : "auto",
                    }}
                  >
                    <Poster src={movie.poster} alt={movie.title} />

                    <MovieInfo>
                      <Like>
                        <LikeIcon alt="Like Icon" />
                        <Count>{movie.likes}</Count>
                      </Like>
                      <Review>
                        <ReviewIcon alt="Review Icon" />
                        <Count>{movie.reviews}</Count>
                      </Review>
                    </MovieInfo>
                  </div>
                ))}
              </div>
              <button
                className="next"
                onClick={handleNext}
                disabled={currentIndex >= Math.ceil(movies.length / 4) - 1}
              >
                &gt;
              </button>
            </>
          )}
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
  color: ${(props) => (props.$isSelected ? "#FF92BC " : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  padding: 0 0 0 0.375rem;
  &:hover {
    color: #ffff;
  }
  @media (max-width: 768px) {
    margin: 0 0.7rem 0.5rem 0;
    font-size: 1rem;
  }
  @media (max-width: 393px) {
    margin: 0 0.3rem 0.5rem 0;
    font-size: 1rem;
  }
`;

const CategoryBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#FF92BC" : "white")};
  color: ${(props) => (props.$isSelected ? "var(--text)" : "var(--text)")};
  font-size: 13px;
  font-weight: ${(props) => (props.$isSelected ? "bold" : "500")};
  border-radius: 0.3rem;
  border: 0.1px solid #ff92bc;
  padding: 0.5rem 1rem;
  cursor: pointer;
  /* &:hover {
    background-color: #ff0777;
    color: black;
  } */
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0.4rem 0.8rem;
  }
  @media (max-width: 393px) {
    margin-bottom: 5px;
  }
`;

const Title = styled.h2`
  color: #f84b99;
  padding: 2rem 0 0.7rem 0.375rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const ReviewIcon = styled.svg`
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: no-repeat center/cover url(${reivew});
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
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: no-repeat center/cover url(${likeHeart});
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
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
    width: 6.8rem;
    height: 10rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    width: 6.2rem;
    height: 9.3rem;
  }
  @media (max-width: 393px) {
    padding: 0.4rem 0.3rem;
    width: 5.6rem;
    height: 8.7rem;
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
  margin-bottom: 5px;
`;
