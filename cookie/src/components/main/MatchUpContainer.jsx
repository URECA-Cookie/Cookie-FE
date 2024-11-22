import React from "react";
import styled from "styled-components";
import matchUp from "../../assets/images/main/matchup_icon.svg";
import fight from "../../assets/images/main/fight_icon.svg";
import { useNavigate } from "react-router-dom";

const MathUp = styled.div`
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
    justify-content: center;
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
    border-radius: 0.75rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .matchUp__overlay button {
    width: 16rem;
    height: 3.19rem;
    background-color: var(--sub);
    color: white;
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
  }

  .matchUp__overlay:hover button {
    opacity: 1;
    visibility: visible;
  }

  .matchUp__movie--title {
    background-color: white;
    border-radius: 12px;
    padding: 5px 10px;
    border: 1px solid var(--sub-btn);
  }

  .matchUp__movie--container {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 1rem;
  }

  .matchUp__movie--list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
  }

  .matchUp__movie--list p {
    text-align: center;
  }

  .matchUp__movie--poster {
    border-radius: 0.625rem;
    margin: 0 0 0.625rem 0;
  }

  .matchUp__movie--icon {
    position: absolute;
    top: 5.5rem;
    left: 15rem;
  }
`;

function MatchUpContainer({ matchDate, dummydata }) {
  const today = new Date();
  matchDate = new Date("2024-12-31");
  const leftTime = matchDate - today;
  const leftDay = Math.ceil(leftTime / (1000 * 3600 * 24));
  const navigate = useNavigate();

  return (
    <MathUp>
      <div className="matchUp__title">
        <img src={matchUp} alt="matchUp_icon" />
        <h2> 이번주 영화 매치업! D-{leftDay}</h2>
      </div>
      {dummydata.length > 0 && (
        <div className="matchUp__movie">
          <img className="matchUp__movie--icon" src={fight} alt="fight_icon" />
          <div className="matchUp__overlay">
            <button onClick={() => navigate("/matchup")}>
              투표하러 가기👀
            </button>
          </div>
          <p className="matchUp__movie--title">{dummydata[0].matchTitle}</p>
          {dummydata.map((group) => (
            <div key={group.matchTitle} className="matchUp__movie--container">
              {group.data.map((movie) => (
                <div key={movie.id} className="matchUp__movie--list">
                  <img
                    className="matchUp__movie--poster"
                    src={movie.poster}
                    alt={movie.movie}
                  />
                  <p>{movie.movie}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </MathUp>
  );
}

export default MatchUpContainer;