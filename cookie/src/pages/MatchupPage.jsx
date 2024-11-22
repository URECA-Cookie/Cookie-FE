import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TitleSection from "../components/matchup/TitleSection";
import Timer from "../components/matchup/Timer";
import PosterList from "../components/matchup/PosterList";
import ProgressBar from "../components/matchup/ProgressBar";
import ChartSection from "../components/matchup/ChartSection";
import { useParams, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #04012d;
  color: #ffffff;
  font-family: "Arial", sans-serif;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const sampleData = {
  matchUpTitle: "테스트 빅매치",
  startAt: "2024-11-23T17:21:03",
  entAt: "2024-11-28T17:21:01",
  movie1: {
    movieTitle: "테스트 영화 1",
    moviePoster: null,
    movieLike: 10,
    charmPoint: {
      ost: 20,
      direction: 18,
      story: 15,
      dialogue: 25,
      visual: 30,
      acting: 35,
      specialEffect: 15,
    },
    emotionPoint: {
      touching: 25,
      angry: 5,
      joy: 35,
      immersion: 30,
      excited: 20,
      empathy: 15,
      tension: 10,
    },
  },
  movie2: {
    movieTitle: "테스트 영화 2",
    moviePoster: null,
    movieLike: 5,
    charmPoint: {
      ost: 15,
      direction: 25,
      story: 20,
      dialogue: 18,
      visual: 28,
      acting: 20,
      specialEffect: 25,
    },
    emotionPoint: {
      touching: 20,
      angry: 10,
      joy: 30,
      immersion: 25,
      excited: 15,
      empathy: 10,
      tension: 15,
    },
  },
};

const MatchupPage = () => {
  const { matchUpId } = useParams();
  const location = useLocation();
  const [matchUpData, setMatchUpData] = useState(null);

  const fetchMatchUpData = async () => {
    try {
      const endpoint = matchUpId
        ? `http://localhost:8080/api/matchups/${matchUpId}/history`
        : `http://localhost:8080/api/matchups/current`;

      const response = await axios.get(endpoint);
      setMatchUpData(response.data.response || sampleData);
    } catch (error) {
      console.error("API 요청 실패:", error);
      setMatchUpData(sampleData);
    }
  };

  useEffect(() => {
    fetchMatchUpData();
  }, [matchUpId, location.pathname]);

  if (!matchUpData) {
    return <Container>로딩 중...</Container>;
  }

  return (
    <Container>
      <TitleSection
        matchUpTitle={matchUpData.matchUpTitle}
        endAt={matchUpData.entAt}
      />
      <Timer startAt={matchUpData.startAt} endAt={matchUpData.entAt} />
      <PosterList
        posters={[
          {
            src:
              matchUpData.movie1.moviePoster ||
              "/src/assets/images/matchup/sampleimage1.svg",
            title: matchUpData.movie1.movieTitle,
          },
          {
            src:
              matchUpData.movie2.moviePoster ||
              "/src/assets/images/matchup/sampleimage2.svg",
            title: matchUpData.movie2.movieTitle,
          },
        ]}
      />
      <ProgressBar
        movie1Likes={matchUpData.movie1.movieLike}
        movie2Likes={matchUpData.movie2.movieLike}
      />
      <ChartSection movie1={matchUpData.movie1} movie2={matchUpData.movie2} />
    </Container>
  );
};

export default MatchupPage;
