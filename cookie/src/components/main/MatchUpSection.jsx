import { useState, useEffect } from "react";
import styled from "styled-components";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MatchUpSection = () => {
  const navigate = useNavigate();

  const [matchUps, setMatchUps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoading = matchUps.length === 0;

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/mainMatchUps`
        );
        const matchUpData = response.data.response.matchUps;
        if (matchUpData) {
          setMatchUps(matchUpData);
        }
      } catch (error) {
        console.error("Error fetching matchUp data", error);
      }
    };

    fetchMainPageMovies();
  }, []);

  // const handleNext = () => {
  //   if (currentIndex < matchUps.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  const handleMatchUpVotePage = (matchUpId) => {
    navigate(`/matchup/${matchUpId}`); // 페이지 이동
  };
  return (
    <Wrapper>
      {isLoading ? (
        <SkeletonOverlay />
      ) : (
        <>
          <Title>이번주 쿠키의 매치업</Title>
          <MatchUpContainer>
            <Overlay>
              <MatchUpInfo>
                <VsImage></VsImage>
                <VoteButton
                  onClick={() =>
                    handleMatchUpVotePage(matchUps[currentIndex].matchUpId)
                  }
                >
                  {matchUps[currentIndex].matchUpTitle}
                </VoteButton>
                <MatchUpDescription>
                  쿠키에서 여운을 더 즐겨보세요!
                </MatchUpDescription>
                <MatchUpDescription>
                  좋아하는 영화에 투표하고 이야기 나누는 중
                </MatchUpDescription>
              </MatchUpInfo>
            </Overlay>
            <Movie>
              <Image
                src={matchUps[currentIndex].movie1.moviePoster}
                alt={matchUps[currentIndex].movie1.movieTitle}
              />
            </Movie>
            <Movie>
              <Image
                src={matchUps[currentIndex].movie2.moviePoster}
                alt={matchUps[currentIndex].movie2.movieTitle}
              />
            </Movie>
          </MatchUpContainer>
        </>
      )}
    </Wrapper>
  );
};

export default MatchUpSection;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  color: #f84b99;
  padding: 2rem 0 0.4rem 0.375rem;
  display: flex;
`;

const MatchUpContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Movie = styled.div`
  flex: 1;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
  }
`;

// const PrevButton = styled(Button)`
//   left: 5px;
// `;

// const NextButton = styled(Button)`
//   right: 5px;
// `;

const VoteButton = styled.button`
  width: 300px;
  height: 42px;
  border-radius: 0.32rem;
  border: none;
  background-color: #f84b99;
  cursor: pointer;
  margin-bottom: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: #ff0777;
  }
`;

const MatchUpInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MatchUpDescription = styled.p`
  margin: 0;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
`;

const VsImage = styled.div`
  background: no-repeat center/cover url("/assets/images/main/christmas-vs.png");
  width: 100px;
  height: 100px;
`;
const SkeletonOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 404px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.9);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.07) 25%,
    rgba(255, 255, 255, 0.159) 50%,
    rgba(255, 255, 255, 0.07) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
