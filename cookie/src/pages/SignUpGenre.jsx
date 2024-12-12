import { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../components/signUp/Modal";
import { requestNotificationPermission } from "../firebase/firebaseMessaging";
import useUserStore from "../stores/useUserStore";
import axios from "axios";
import useAuthStore from "../stores/useAuthStore";
import Spinner from "../components/common/Spinner";
import goBack from "../assets/images/admin/goBack_br.svg";
import mixpanel from "mixpanel-browser";

const MainContainer = styled.div`
  background-color: #fff4b9;
  height: 100vh;
  padding: 2rem 0 0 0;
  margin: 0 auto;
`;
const GoBackBtn = styled.button`
  padding: 0 2rem;
  background: none;
  border: none;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2.5rem;
  line-height: 0.5rem;

  h2 {
    margin: 0.8rem;
    color: #724b2e;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 1.4rem;
    }
  }
`;

const SubTitle = styled.div`
  margin: 2.5rem 3.3rem;

  h3 {
    color: #724b2e;
    margin: 0;
  }

  p {
    color: #235b97;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const GenreContainer = styled.div`
  margin: 2.5rem 3.3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  width: 75%;
`;

const GenreBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#aad6e7" : "white")};
  color: ${(props) => (props.$isSelected ? "#724b2e" : "#724b2e")};
  border-radius: 12px;
  padding: 0.8rem 1rem;
  border: 1px solid #aad6e7;
  cursor: pointer;
  &:hover {
    background-color: #aad6e7;
    color: #724b2e;
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15rem;
  @media (max-width: 768px) {
    margin-top: 10rem;
  }
  button {
    background-color: #aad6e7;
    color: #724b2e;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0.5rem 0.625rem 12rem 3rem #ffeb7d;
    font-size: 1.2rem;
    font-weight: 700;
    outline: none;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    button {
      width: 20rem;
      height: 3.5rem;
    }
  }
`;

function SignUpGenre() {
  const MovieGenre = [
    { id: 1, genre: "로맨스" },
    { id: 2, genre: "공포" },
    { id: 3, genre: "코미디" },
    { id: 4, genre: "액션" },
    { id: 5, genre: "판타지" },
    { id: 6, genre: "애니메이션" },
    { id: 7, genre: "범죄" },
    { id: 8, genre: "SF" },
    { id: 9, genre: "음악" },
    { id: 10, genre: "스릴러" },
    { id: 11, genre: "전쟁" },
    { id: 12, genre: "다큐멘터리" },
    { id: 13, genre: "드라마" },
    { id: 14, genre: "가족" },
    { id: 15, genre: "역사" },
    { id: 16, genre: "미스터리" },
    { id: 17, genre: "TV영화" },
    { id: 18, genre: "서부극" },
    { id: 19, genre: "모험" },
  ];

  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pushEnabled, setPushEnabled] = useState("false");
  const [emailEnabled, setEmailEnabled] = useState("false");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userProfileData = location.state;
  const logIn = useAuthStore((state) => state.logIn);

  const handleButtonClick = (id) => {
    setSelectedGenreId(id);
  };

  // Mixpanel 사용자 등록 함수
  const onSignupSuccess = (newUser) => {
    mixpanel.identify(newUser.userId); // Mixpanel에 사용자 ID 설정
    mixpanel.people.set({
      $email: newUser.email, // 사용자 이메일
      $name: newUser.nickname, // 사용자 이름
      $created: new Date(), // 현재 시각 (가입 시각)
      $genre: newUser.genreId, // 선호 장르 ID
    });

    mixpanel.track("User Signed Up", {
      genreId: newUser.genreId, // 선호 장르
    });

    console.log("회원가입 사용자 Mixpanel 등록 완료");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGenreId) {
      alert("장르를 선택해주세요.");
      return;
    }
    setShowModal(true);
  };

  const handleFormDataSubmission = async (pushValue, emailValue) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowSpinner(true);

    try {
      const fcmToken = await requestNotificationPermission();
      if (!fcmToken) {
        toast.error("FCM 토큰을 가져올 수 없습니다.");
        setShowSpinner(false);
        return;
      }

      const formData = new FormData();
      formData.append("socialProvider", userProfileData.socialProvider);
      formData.append("socialId", userProfileData.socialId);
      formData.append("email", userProfileData.email);
      formData.append("nickname", userProfileData.nickname);
      formData.append("pushEnabled", pushValue);
      formData.append("emailEnabled", emailValue);
      formData.append("genreId", selectedGenreId.toString());
      formData.append("profileImage", userProfileData.profileImage);
      formData.append("fcmToken", fcmToken);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("회원등록이 완료되었어요! 메인으로 이동할게요");
        sessionStorage.setItem(
          "accessToken",
          response.data.response.token.accessToken
        );
        const userResponse = response.data.response.user;

        // Mixpanel 사용자 등록 함수 호출
        onSignupSuccess(userResponse);

        const setUserInfo = useUserStore.getState().setUserInfo;
        const userInfo = {
          userId: userResponse.userId,
          nickname: userResponse.nickname,
          profileImage: userResponse.profileImage,
          genreId: userResponse.genreId,
        };
        setUserInfo(userInfo);
        console.log("저장된 유저 정보:", userInfo);

        logIn();
        navigate("/");
      }
    } catch (error) {
      toast.error(`가입 실패: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setShowSpinner(false);
    }
  };

  return (
    <>
      {showSpinner && <Spinner />}
      <MainContainer>
        <GoBackBtn onClick={() => navigate(-1)}>
          <img src={goBack} />
        </GoBackBtn>
        <MainTitle>
          <h2>선호하는 장르를</h2>
          <h2>알려주세요</h2>
        </MainTitle>
        <SubTitle>
          <h3>어떤 장르를 좋아하나요?👀</h3>
          <p>좋아하는 장르 1개를 골라주세요</p>
        </SubTitle>
        <GenreContainer>
          {MovieGenre.map((item) => (
            <GenreBtn
              key={item.id}
              $isSelected={selectedGenreId === item.id}
              onClick={() => handleButtonClick(item.id)}
            >
              {item.genre}
            </GenreBtn>
          ))}
        </GenreContainer>
        <SubmitBtn>
          <button type="button" onClick={handleSubmit}>
            완료
          </button>
        </SubmitBtn>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onPushNotification={() => handleFormDataSubmission("true", "false")}
            onEmailNotification={() =>
              handleFormDataSubmission("false", "true")
            }
            onNoNotification={() => handleFormDataSubmission("false", "false")}
          />
        )}
      </MainContainer>
    </>
  );
}

export default SignUpGenre;
