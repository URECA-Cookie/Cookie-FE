import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Notification from "../common/Notification";
import useUserStore from "../../stores/useUserStore";
import CookieLogo from "/assets/images/cookie-logo.png";

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 150px;
    height: 120px;
    object-fit: cover;
  }

  span {
    font-size: 24px;
    font-weight: bold;
    color: inherit;
    margin-left: 10px;
  }
`;

const HeaderContainer = styled.header`
  width: 100vw;
  display: flex;
  max-width: 600px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.isWhiteHeader ? "#ffffff" : "black")};
  color: ${(props) => (props.isWhiteHeader ? "#000000" : "#ffffff")};
  padding: 15px 20px;
  height: 70px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 100;

  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-right button {
    cursor: pointer;
    border-radius: 0.7rem;
    padding: 0.4rem 1rem;
    border: none;
    background-color: ${(props) => (props.isWhiteHeader ? "#f5f5f5" : "#333")};
    color: ${(props) => (props.isWhiteHeader ? "#000" : "#fff")};
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useUserStore((state) => state.getUserInfo());

  const isReviewDetailPage = location.pathname.match(/^\/reviews\/\d+$/);

  const isWhiteHeader =
    location.pathname === "/mypage" ||
    location.pathname === "/myAllReviewList" ||
    location.pathname === "/point-history" ||
    location.pathname === "/notifications" ||
    location.pathname === "/likemovies" ||
    location.pathname === "/likereviews" ||
    location.pathname === "/manageprofile" ||
    location.pathname === "/reviews/write" ||
    isReviewDetailPage;

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  return (
    <HeaderContainer isWhiteHeader={isWhiteHeader}>
      <Logo onClick={handleLogoClick}>
        <img src={CookieLogo} alt="로고 이미지" />
      </Logo>
      <div className="header-right">
        {userInfo.nickname ? (
          <div onClick={handleNotificationClick}>
            <Notification />
          </div>
        ) : (
          <button>로그인</button>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
