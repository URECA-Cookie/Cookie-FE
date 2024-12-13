import styled from "styled-components";
// import MatchUp from "../components/main/MatchUp";
import MatchUpSection from "../components/main/MatchUpSection";
import AdminRecommend from "../components/main/AdminRecommend";
import CookieMovies from "../components/main/CookieMovies";
import SpecialMovie from "../components/main/SpecialMovie";
import GenreMovie from "../components/main/GenreMovie";
import TopButton from "../components/searchpage/TopButton";
import { useEffect, useState } from "react";
import LoginModal from "../components/common/LoginModal";
import useAuthStore from "../stores/useAuthStore";
import Question from "../components/main/Question";

const Main = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const { isLogined } = useAuthStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setShowTopButton(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* <HeaderWrapper></HeaderWrapper> */}
      <MainContainer>
        <Content>
          <MatchUpSection />
          <AdminRecommend />
          <CookieMovies />
          <SpecialMovie categorydata={categoryData} />
          <GenreMovie categorydata={categoryData} />
          <Question />
        </Content>
        <LoginModal />
        <WriteReviewButton onClick={() => isLogined("/searchmov")}>
          리뷰 작성하기
        </WriteReviewButton>
        <TopButton visible={showTopButton} onClick={scrollToTop} />
      </MainContainer>
      <NavbarWrapper></NavbarWrapper>
    </>
  );
};

export default Main;

const CommonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const MainContainer = styled(CommonContainer)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  background-color: black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

// const HeaderWrapper = styled(CommonContainer)`
//   position: fixed;
//   top: 0;
//   z-index: 100;
//   background-color: #04012d;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

//   @media (max-width: 600px) {
//     padding: 0 10px;
//   }
// `;

const NavbarWrapper = styled(CommonContainer)`
  position: fixed;
  bottom: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

const WriteReviewButton = styled.button`
  position: fixed;
  bottom: 9.375rem;
  right: calc(50% - 20.88rem);
  transform: translateX(-50%);
  background-color: #aad6e7;
  color: var(--text);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.625rem 1.25rem;
  border-radius: 50px;
  border: none;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #82dcff;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.5rem 0.6875rem;
    right: calc(50% - 15.4rem);
    bottom: 8rem;
  }
  @media (max-width: 390px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.6875rem;
    right: calc(50% - 13.9rem);
    bottom: 7rem;
  }
`;

const categoryData = [
  { id: 1, mainCategory: "장르", subCategory: "로맨스" },
  { id: 2, mainCategory: "장르", subCategory: "공포" },
  { id: 3, mainCategory: "장르", subCategory: "코미디" },
  { id: 4, mainCategory: "장르", subCategory: "액션" },
  { id: 5, mainCategory: "장르", subCategory: "판타지" },
  { id: 6, mainCategory: "장르", subCategory: "애니메이션" },
  { id: 7, mainCategory: "장르", subCategory: "범죄" },
  { id: 8, mainCategory: "장르", subCategory: "SF" },
  { id: 9, mainCategory: "장르", subCategory: "음악" },
  { id: 10, mainCategory: "장르", subCategory: "스릴러" },
  { id: 11, mainCategory: "장르", subCategory: "전쟁" },
  { id: 12, mainCategory: "장르", subCategory: "다큐멘터리" },
  { id: 13, mainCategory: "장르", subCategory: "드라마" },
  { id: 14, mainCategory: "장르", subCategory: "가족" },
  { id: 15, mainCategory: "장르", subCategory: "역사" },
  { id: 16, mainCategory: "장르", subCategory: "미스터리" },
  { id: 17, mainCategory: "장르", subCategory: "TV 영화" },
  { id: 18, mainCategory: "장르", subCategory: "서부극" },
  { id: 19, mainCategory: "장르", subCategory: "모험" },
  { id: 20, mainCategory: "장르", subCategory: "N/A" },
  { id: 21, mainCategory: "시즌", subCategory: "설레는 봄" },
  { id: 22, mainCategory: "시즌", subCategory: "청량한 여름" },
  { id: 23, mainCategory: "시즌", subCategory: "포근한 가을" },
  { id: 24, mainCategory: "시즌", subCategory: "눈 오는 겨울" },
  { id: 25, mainCategory: "시즌", subCategory: "어린이날" },
  { id: 27, mainCategory: "시즌", subCategory: "새해" },
  { id: 26, mainCategory: "시즌", subCategory: "크리스마스" },
  { id: 28, mainCategory: "시즌", subCategory: "명절" },
  { id: 29, mainCategory: "테마", subCategory: "실화를 소재로 한" },
  { id: 30, mainCategory: "테마", subCategory: "가족과 함께" },
  { id: 31, mainCategory: "테마", subCategory: "연인과 함께" },
  { id: 32, mainCategory: "테마", subCategory: "열린결말" },
  { id: 33, mainCategory: "테마", subCategory: "비 오는 날" },
  { id: 34, mainCategory: "테마", subCategory: "킬링타임" },
  { id: 35, mainCategory: "테마", subCategory: "디즈니" },
  { id: 36, mainCategory: "연령대", subCategory: "10대" },
  { id: 37, mainCategory: "연령대", subCategory: "20대" },
  { id: 38, mainCategory: "연령대", subCategory: "30대" },
  { id: 39, mainCategory: "연령대", subCategory: "40대" },
  { id: 40, mainCategory: "연령대", subCategory: "50대" },
];
