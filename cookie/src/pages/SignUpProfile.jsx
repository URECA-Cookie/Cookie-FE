import { useRef, useState } from "react";
import GlobalStyle from "../styles/global";
import styled from "styled-components";
import userDefaultImg from "../assets/images/signUp/user_img.svg";
import deleteBtn from "../assets/images/signUp/close_icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import serverBaseUrl from "../config/apiConfig";
import axios from "axios";
import axiosInstance from "../api/auth/axiosInstance";

const MainContainer = styled.div`
  background-color: white;
  height: 100vh;
  padding: 4.375rem 0 0 0;
`;
const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2.5rem;
  line-height: 0.5rem;

  h2 {
    margin: 0.8rem;
    color: var(--main);
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;

  .user__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    position: relative;
  }

  .user__profile--image {
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0.13rem 0.19rem 0.5rem rgba(3, 6, 59, 0.2);
    &:hover {
      border: 1px solid var(--ticket-bg);
    }
  }

  .user__profile--deleteBtn {
    background-color: transparent;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 5rem;
    top: 0.8rem;
  }

  p {
    margin: 1.5rem 0 0.5rem 0;
    color: var(--main);
  }

  .user__nickName {
    margin-top: 3.125rem;
    gap: 1rem;
  }
  .user__nickName div {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  .nickName__valid--text {
    color: var(--notice);
    padding: 0 5px;
    font-size: 1rem;
    margin: -5px 0 0 0;
  }
  .nickName__valid--btn {
    margin: 8px 0 0 0;
    background-color: ${(props) =>
      props.$isSelected ? "var(--sub-bg)" : "white"};
    color: ${(props) => (props.$isSelected ? "white" : "var(--main)")};
    border-radius: 0.75rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: var(--main);
      color: white;
    }
  }
  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 1rem;
    color: var(--main);
  }

  input {
    display: block;
    width: 22.6rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 3rem 4.38rem 12.5rem rgba(3, 6, 59, 0.5);
    font-size: 1.2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: white;
    color: var(--main);
  }
  input:focus {
    outline: 1px solid var(--main);
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14.5rem;

  button {
    background-color: var(--main);
    color: white;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 0.625rem 6.25rem rgba(3, 6, 59, 0.5);
    font-size: 1.2rem;
    outline: none;
    cursor: pointer;
  }
`;

function SignUpProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [userNickname, setUserNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const socialProvider = searchParams.get("socialProvider");
  const email = searchParams.get("email");
  const socialId = searchParams.get("socialId");
  const regex = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfileImage(fileUrl);
      console.log("파일 정보:", file);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
    fileInputRef.current.value = "";
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUserNickname(value);

    const isValid = value && regex.test(value);
    setNicknameValid(isValid);

    if (isValid) {
      setIsDuplicateNickname(null);
    }
  };

  const handleCheckNickname = async (e) => {
    e.preventDefault();

    if (!nicknameValid || !userNickname) {
      setIsDuplicateNickname(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/api/auth/check-nickname", {
        params: {
          nickname: userNickname,
        },
      });

      if (response.data.response === "SUCCESS") {
        setIsDuplicateNickname(true);
      } else if (response.data.response === "DUPLICATED_NICKNAME") {
        setIsDuplicateNickname(false);
      }
    } catch (error) {
      console.error("중복 확인 실패:", error);
      setIsDuplicateNickname(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userProfileData = {
      socialProvider,
      email,
      socialId,
      nickname: userNickname,
      profileImage,
    };
    navigate("/sign-up-genre", {
      state: userProfileData,
    });
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <MainTitle>
          <h2>회원 정보를</h2>
          <h2>입력해주세요</h2>
        </MainTitle>
        <form onSubmit={handleSubmit}>
          <UserInfo>
            <div className="user__profile">
              <img
                className="user__profile--image"
                src={profileImage || userDefaultImg}
                alt="user_img"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {profileImage && (
                <button
                  type="button"
                  className="user__profile--deleteBtn"
                  onClick={handleImageDelete}
                >
                  <img src={deleteBtn} alt="delete_button" />
                </button>
              )}
            </div>
            <p>프로필사진을 등록해주세요 😎</p>
            <div className="user__nickName">
              <label>
                닉네임
                <div>
                  <input
                    type="text"
                    placeholder="ex) 쿠키"
                    value={userNickname || ""}
                    onChange={handleNicknameChange}
                    maxLength={11}
                    required
                  />
                  <button
                    className="nickName__valid--btn"
                    onClick={handleCheckNickname}
                    type="button"
                    disabled={!nicknameValid}
                  >
                    중복확인
                  </button>
                </div>
              </label>
              {!nicknameValid && userNickname && (
                <p className="nickName__valid--text">
                  닉네임은 2~10자 사이의 숫자, 영어, 한글만 가능해요!
                </p>
              )}

              {nicknameValid && isDuplicateNickname === false && (
                <p className="nickName__valid--text">
                  이미 사용 중인 닉네임입니다.
                </p>
              )}

              {nicknameValid && isDuplicateNickname === true && (
                <p className="nickName__valid--text">
                  사용 가능한 닉네임입니다.
                </p>
              )}
            </div>
          </UserInfo>
          <SubmitBtn>
            <button
              type="submit"
              disabled={!nicknameValid || isDuplicateNickname === false}
            >
              다음
            </button>
          </SubmitBtn>
        </form>
      </MainContainer>
    </>
  );
}

export default SignUpProfile;
