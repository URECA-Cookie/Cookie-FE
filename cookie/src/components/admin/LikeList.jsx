import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/auth/axiosInstance";
import styled from "styled-components";
import { DefaultReviewContainer } from "./ReviewList";
import likeIcon from "../../assets/images/admin/like_heart.svg";
const MovieInfoContainer = styled.div`
  height: 800px;
  max-height: 1000px;
  padding: 0 10px;
  border-radius: 12px;
  gap: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.9;
  .movieInfo__card {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    background-color: #ffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-bottom: 20px;
  }

  .movieInfo__card--poster {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  h3 {
    margin-top: 10px;
    font-size: 20px;
  }

  div {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: 30px;
  }
`;
const LikeListContainer = styled.div`
  height: 800px;
  max-height: 1000px;
  padding: 0 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  flex: 1;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
`;

const LikeItem = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  div {
    font-size: 20px;
    margin-top: 7px;
  }
`;

export const UserProfile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const SelectFilter = styled.select`
  margin-bottom: 20px;
  padding: 5px;
  border: 2px solid #ccc;
  outline: none;
  border-radius: 12px;
  width: 120px;
  height: 40px;
  font-size: 20px;
  margin-left: 430px;

  &:focus {
    border-color: #aad6e7;
    box-shadow: 0 0 5px #83eef8(0, 123, 255, 0.5);
  }
`;

function LikeList({ movieId }) {
  const [likes, setLikes] = useState([]);
  const [dateOrder, setDateOrder] = useState("latest");
  const [movieInfo, setMovieInfo] = useState(null);
  const fetchLikes = async (movieId, dateOrder) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/likes/${movieId}?dateOrder=${dateOrder}`
      );
      const data = response.data.response;
      console.log("결과", response.data.response);
      setLikes(data.movieLikeUsers);
      setMovieInfo({
        title: data.title,
        posterPath: data.posterPath,
        likeAmount: data.likeAmount,
      });
    } catch (error) {
      console.error("좋아요 목록을 가져오는 데 실패했습니다.", error);
    }
  };
  const handleDateOrderChange = (event) => {
    setDateOrder(event.target.value);
  };

  useEffect(() => {
    fetchLikes(movieId, dateOrder);
  }, [movieId, dateOrder]);

  return (
    <DefaultReviewContainer>
      <MovieInfoContainer>
        <div className="movieInfo__card">
          <img
            className="movieInfo__card--poster"
            src={movieInfo ? movieInfo.posterPath : ""}
            alt="Movie Poster"
          />
          <h3>{movieInfo ? movieInfo.title : "영화 제목"}</h3>
          <div>
            <img src={likeIcon} style={{ height: "35px", width: "35px" }} />
            <p>{movieInfo ? movieInfo.likeAmount : ""}</p>
          </div>
        </div>
      </MovieInfoContainer>
      <LikeListContainer>
        <h2>좋아요 리스트</h2>
        <SelectFilter value={dateOrder} onChange={handleDateOrderChange}>
          <option value="latest">최신순</option>
          <option value="earliest">오래된순</option>
        </SelectFilter>

        {likes.length === 0 ? (
          <p>좋아요가 없습니다.</p>
        ) : (
          likes.map((like) => (
            <LikeItem key={like.likeId}>
              <UserProfile src={like.userProfile} alt={like.username} />
              <div>
                <div>{like.username}</div>
                <div>{like.createdAt}</div>
              </div>
              <img
                src={likeIcon}
                style={{ height: "31px", width: "31px", marginLeft: "150px" }}
              />
            </LikeItem>
          ))
        )}
      </LikeListContainer>
    </DefaultReviewContainer>
  );
}

export default LikeList;
