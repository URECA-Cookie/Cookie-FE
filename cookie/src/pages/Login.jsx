import GlobalStyle from "../styles/global";
import CookieImg from "../assets/images/login/cookie_img.svg";
import CookieLogo from "../assets/images/login/cookie_lg.svg";
import styled from "styled-components";
import { OAuth_LOGIN_PROVIDER } from "../config/OAuthConfig";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import axiosInstance from "../api/auth/axiosInstance";

export const LoginContainer = styled.div`
  background-color: #fff4b9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h2 {
    color: #724b2e;
  }

  .login__img {
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
    .login__img {
      margin: 0.3rem 0;
      width: 15rem;
      height: 15rem;
    }
    .logo {
      width: 10rem;
      height: 6rem;
      padding: 0;
    }
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  button {
    background: none;
    border: none;
  }
  img {
    margin: 0.5rem 0;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    button img {
      width: 20rem;
      height: 4rem;
      margin: 0;
    }
  }
`;

const GuestLink = styled.div`
  position: absolute;
  top: 5rem;
  right: 1rem;
  font-size: 1rem;
  color: #724b2e;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #a8673a;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    top: 2rem;
  }
`;

function Login() {
  const navigate = useNavigate();

  const handleLoginClick = async (url) => {
    window.location.href = url;
    try {
      // 로그인 요청 후 유저 정보 받아오기
      const response = await axiosInstance.get(`/api/users/info`, {
        withCredentials: true, // 쿠키 인증 정보 포함
      });
      const user = response.data; // 유저 정보

      // Mixpanel에 로그인 성공 정보 등록
      onLoginSuccess(user);

      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleGuestAccess = () => {
    navigate("/");
  };

  const onLoginSuccess = (user) => {
    mixpanel.identify(user.id); // Mixpanel에 사용자 고유 ID 설정
    mixpanel.people.set({
      $email: user.email, // 사용자 이메일
      $name: user.nickname, // 사용자 이름
      $created: user.createdAt, // 가입 날짜
      favorite_genre: user.genreId, // 선호 장르
    });

    mixpanel.track("User Logged In", {
      userId: user.id,
      loginMethod: user.socialProvider, // 로그인 제공자 정보
    });

    console.log("Mixpanel 로그인 추적 완료");
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <GuestLink onClick={handleGuestAccess}>비회원으로 이용하기</GuestLink>
        <h2 className="regular">“영화 리뷰와 투표, 영화 vs 영화 토론까지!</h2>
        <h2 className="regular">영화 팬들을 위한 종합 커뮤니티”</h2>
        <img className="login__img logo" src={CookieLogo} alt="logo" />
        <img className="login__img" src={CookieImg} alt="logoImg" />
        <LoginBtn>
          {Object.entries(OAuth_LOGIN_PROVIDER).map(([key, { img, url }]) => (
            <button key={key} onClick={() => handleLoginClick(url)}>
              <img src={img} alt={`${key}Login`} />
            </button>
          ))}
        </LoginBtn>
      </LoginContainer>
    </>
  );
}

export default Login;
