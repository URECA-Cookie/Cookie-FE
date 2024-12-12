import React, { useEffect, useState } from "react";
import styled from "styled-components";
import matchUp from "../../assets/images/main/matchup_icon.svg";
import fight from "../../assets/images/main/fight_icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";
import axiosInstance from "../../api/auth/axiosInstance";
import mixpanel from "mixpanel-browser";

const MatchUpContainer = styled.div`
  position: relative;

  .matchUp__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .matchUp__movie {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    background-color: var(--ticket-bg);
    transition: background-color 0.3s ease;
    border: none;
    border-radius: 0.75rem;
    padding: 1rem;
    position: relative;
  }

  .matchUp__overlay {
    position: absolute;
    transition: background-color 0.3s ease;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 0.75rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .matchUp__overlay button {
    width: 14rem;
    background-color: var(--sub);
    color: var(--text);
    border: none;
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 0.75rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: visible;
    transition: opacity 0.3s ease;
    padding: 1rem;
  }

  .matchUp__overlay:hover button {
    opacity: 1;
    visibility: visible;
  }

  .matchUp__movie--title {
    background-color: var(--sub);
    border-radius: 12px;
    padding: 5px 10px;
  }
  .matchUp__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    gap: 2rem;
  }

  .matchUp__movie--container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
    margin-top: 1rem;
  }

  .matchUp__movie--list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
    flex-grow: 1;
  }

  .matchUp__movie--list p {
    text-align: center;
    padding: 0 0.1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    line-height: 1.1rem;
    height: 2.3rem;
    font-size: 0.9rem;
  }

  .matchUp__movie--poster {
    border-radius: 0.625rem;
    margin: 0 0 0.625rem 0;
    width: 83px;
    height: 118px;
  }
  .matchUp__movie--icon {
    position: absolute;
    top: 5.2rem;
    left: 5.8rem;
  }

  @media (max-width: 768px) {
    .matchUp__title {
      font-size: 0.8rem;
    }
    .matchUp__movie {
      width: 15rem;
      height: 11.25rem;
      padding: 0.625rem;
    }
    .matchUp__overlay button {
      width: 8rem;
      height: 3.125rem;
      padding: 0.8rem;
    }
    .matchUp__overlay button {
      font-size: 0.8rem;
    }
    .matchUp__movie--title {
      font-size: 0.8rem;
      border-radius: 0.75rem;
      padding: 0.19rem 0.5rem;
      margin-top: 0.3rem;
    }
    .matchUp__content {
      gap: 1rem;
    }
    .matchUp__movie--container {
      margin-top: 0.4rem;
    }
    .matchUp__movie--list {
      width: 3rem;
    }
    .matchUp__movie--list p {
      font-size: 0.62rem;
      line-height: 0.78rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      height: 1.6rem;
      text-align: start;
    }
    .matchUp__movie--poster {
      width: 4.3rem;
      height: 6rem;
    }
    .matchUp__movie--icon {
      position: absolute;
      top: 7vh;
      left: 17vw;
      width: 3rem;
      height: 3rem;
    }
  }

  @media (max-width: 390px) {
    .matchUp__movie--icon {
      top: 4.4rem;
      left: 4.1rem;
      width: 44px;
      height: 44px;
    }
    .matchUp__movie--list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 42px;
    }
    .matchUp__movie--list p {
      font-size: 0.7rem;
    }
  }
`;

const SkeletonContainer = styled.div`
  border-radius: 0.75rem;
  width: 260px;
  height: 242px;
  background-color: #e0e0e0;
  animation: shimmer 1.5s infinite;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400px 100%;

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
`;
function MatchUp() {
  const [matchUps, setMatchUps] = useState([]);
  const [access, setAccess] = useState(true);
  const [leftDays, setLeftDays] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/mainMatchUps`
        );
        const matchUpData = response.data.response.matchUps;
        console.log(matchUpData);
        if (matchUpData) {
          setMatchUps(matchUpData);

          const today = new Date();
          const dayOfWeek = today.getDay();

          if (dayOfWeek === 0) {
            setAccess(false);
          } else {
            setAccess(response.data.response.access);
          }
          const matchDate = new Date(matchUpData[0].endAt);
          const leftTime = matchDate - today;
          const leftDay = Math.ceil(leftTime / (1000 * 3600 * 24));
          setLeftDays(leftDay);
        }
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainPageMovies();
  }, []);

  // const getDisplayText = () => {
  //   if (leftDays === 0) {
  //     return "D-DAY";
  //   } else if (leftDays < 0) {
  //     return "..🤔";
  //   } else {
  //     return `D-${leftDays}`;
  //   }
  // };
  // {getDisplayText()}

  const handleVoteClick = (matchUpId, matchUpTitle) => {
    mixpanel.track("MatchUp Vote Click", {
      matchUpId,
      matchUpTitle,
      timestamp: new Date().toISOString(),
    });

    navigate(`/matchup/${matchUpId}`);
  };

  return (
    <MatchUpContainer>
      <div className="matchUp__title">
        <img src={matchUp} alt="matchUp_icon" />
        <h2> 이번주 영화 매치업! </h2>
      </div>
      <div className="matchUp__content">
        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <SkeletonContainer />
              </div>
            ))
          : matchUps.map((matchUp) => (
              <div className="matchUp__movie" key={matchUp.matchUpId}>
                <img
                  className="matchUp__movie--icon"
                  src={fight}
                  alt="fight_icon"
                />
                <div className="matchUp__overlay">
                  <button
                    onClick={() => navigate(`/matchup/${matchUp.matchUpId}`)}
                    disabled={!access}
                  >
                    {access
                      ? "투표하러 가기👀 "
                      : "오늘은 투표일이 아니에요🥲 내일 만나요"}
                  </button>
                </div>
                <p className="matchUp__movie--title">{matchUp.matchUpTitle}</p>
                <div className="matchUp__movie--container">
                  <div className="matchUp__movie--list">
                    <img
                      className="matchUp__movie--poster"
                      src={matchUp.movie1.moviePoster}
                      alt={matchUp.movie1.movieTitle}
                    />
                    <p>{matchUp.movie1.movieTitle}</p>
                  </div>
                  <div className="matchUp__movie--list">
                    <img
                      className="matchUp__movie--poster"
                      src={matchUp.movie2.moviePoster}
                      alt={matchUp.movie2.movieTitle}
                    />
                    <p>{matchUp.movie2.movieTitle}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </MatchUpContainer>
  );
}

export default MatchUp;
