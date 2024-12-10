import styled from "styled-components";
import {
  SitllCut,
  StillCutContainer,
  YoutubeAndStillCutContainer,
  YoutubeLink,
} from "./AddLinkStillCut";
import {
  ActorItem,
  MovieContainer,
  MovieDetail,
  MovieInfo,
  MovieInfoSection,
  MovieRow,
  MovieTitle,
  SubmitBtn,
} from "./SearchMovieDetail";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";
import serverBaseUrl from "../../config/apiConfig";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(16, 16, 16, 0.57);
  z-index: 999;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 1650px;
  height: 800px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(35, 35, 35, 0.1);
  overflow: scroll;
  padding: 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 2%;
  transform: translateX(-50%);
`;

const MovieInfoModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/movie/${movieId}/detail`
        );
        console.log(response);
        setMovie(response.data.response);
      } catch (error) {
        console.error("영화 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (!movie) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <MovieDetail>
          <MovieContainer key={movie.movieId}>
            <MovieRow>
              <img
                className="movie__poster"
                src={movie.posterPath}
                alt={movie.title}
              />
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>

                {[
                  { label: "러닝타임", value: `${movie.runtime}분` },
                  { label: "개봉일", value: movie.releaseDate },
                  { label: "연령", value: movie.certification },
                  { label: "국가", value: movie.country },
                  { label: "줄거리", value: movie.plot },
                  {
                    label: "카테고리",
                    value: Array.isArray(movie.categories)
                      ? movie.categories.join(", ")
                      : "카테고리 정보 없음",
                  },
                ].map((section, index) => (
                  <MovieInfoSection key={index} label={section.label}>
                    {section.value}
                  </MovieInfoSection>
                ))}

                <MovieInfoSection label="감독">
                  <ActorItem actor={movie.director || "감독 정보 없음"} />
                </MovieInfoSection>

                <MovieInfoSection label="배우">
                  {Array.isArray(movie.actors) && movie.actors.length > 0 ? (
                    movie.actors.map((actor, index) => (
                      <ActorItem key={index} actor={actor} />
                    ))
                  ) : (
                    <p>배우 정보 없음</p>
                  )}
                </MovieInfoSection>
              </MovieInfo>
            </MovieRow>
            <YoutubeAndStillCutContainer>
              <MovieInfoSection label="유튜브">
                {movie.youtube &&
                  movie.youtube.split(", ").map((link, index) => (
                    <div key={index}>
                      📎
                      <YoutubeLink
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link}
                      </YoutubeLink>
                    </div>
                  ))}
              </MovieInfoSection>

              <MovieInfoSection label="스틸컷">
                {Array.isArray(movie.stillCuts) &&
                movie.stillCuts.length > 0 ? (
                  movie.stillCuts.map((image, index) => (
                    <StillCutContainer
                      key={index}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "80%",
                      }}
                    >
                      <SitllCut src={image} alt={`Still cut ${index + 1}`} />
                    </StillCutContainer>
                  ))
                ) : (
                  <p>스틸컷 정보 없음</p>
                )}
              </MovieInfoSection>
            </YoutubeAndStillCutContainer>
            <ButtonContainer>
              <SubmitBtn onClick={onClose}>X</SubmitBtn>
            </ButtonContainer>
          </MovieContainer>
        </MovieDetail>
      </ModalContainer>
    </>
  );
};

export default MovieInfoModal;
