import styled from "styled-components";
import GlobalStyle from "../styles/global";
import MatchUpContainer from "../components/main/MatchUpContainer";
import RankMovie from "../components/main/RankMovie";
import CookieMovies from "../components/main/CookieMovies";
import SpecialMovie from "../components/main/SpecialMovie";
import GenreMovie from "../components/main/GenreMovie";
import TopButton from "../components/searchpage/TopButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  margin-bottom: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 2rem;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const HeaderWrapper = styled(CommonContainer)`
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: #04012d;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

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
  bottom: 80px;
  right: 20px;
  background-color: #cc5283;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #b44d78;
  }
`;

const Main = () => {
  const dummyMovies = [
    {
      matchTitle: "박찬욱 감독의 복수 3부작 빅매치",
      data: [
        {
          id: 1,
          poster: "https://via.placeholder.com/83x118",
          movie: "올드보이",
          matchDate: "2024-12-31",
        },
        {
          id: 2,
          poster: "https://via.placeholder.com/83x118",
          movie: "복수는나의 것",
          matchDate: "2024-12-31",
        },
      ],
    },
  ];
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate(); 
  
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
      <GlobalStyle />
      <HeaderWrapper></HeaderWrapper>
      <MainContainer>
        <img src={"https://via.placeholder.com/600x250"} alt="배너" />
        <Content>
          <MatchUpContainer dummydata={dummyMovies} />
          <RankMovie />
          <CookieMovies />
          <SpecialMovie />
          <GenreMovie />
        </Content>
        <WriteReviewButton onClick={() => navigate("/searchmov")}>
          리뷰 작성하기
        </WriteReviewButton>
        <TopButton visible={showTopButton} onClick={scrollToTop} />
      </MainContainer>
      <NavbarWrapper></NavbarWrapper>
    </>
  );
};

export default Main;
