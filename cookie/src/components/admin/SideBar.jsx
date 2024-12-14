import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import cookieLogo from "../../assets/images/admin/cookieLogo.svg";
import logout from "../../assets/images/admin/logout.svg";
import setting from "../../assets/images/admin/setting.svg";
import movie from "../../assets/images/admin/movie.svg";
import award from "../../assets/images/admin/award.svg";
import cookie from "../../assets/images/admin/cookie.svg";
import GlobalStyle from "../../styles/global";

const PageNav = styled.div`
  width: 409px;
  background-color: var(--sub);
  height: 100vh;
  margin-right: 2rem;
  padding: 1.5rem;
  color: white;
  font-size: 22px;
`;

const SideBarTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .title__logo {
    margin-right: auto;
  }

  span {
    margin-right: 0.8rem;
    font-weight: bold;
    color: var(--text);
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-top: 5px;
  }
`;

const SideBarContainer = styled.div`
  margin: 5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .sidebar__menu {
    background-color: white;
    width: 320px;
    border-radius: 12px;
    padding: 0.5rem;
    color: #a7a7a7;
    font-weight: bold;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: start;
    transition: color 0.3s ease;
    cursor: pointer;
  }
  .sidebar__menu:hover {
    color: var(--text);
  }
  img {
    margin-right: 0.5rem;
    width: 40px;
  }
  .active {
    color: var(--text);
  }
  .inactive {
    color: var(--sub-text);
  }
`;

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const sideMenu = [
    {
      image: movie,
      title: "Movie",
      link: "/admin/movie",
    },
    {
      image: setting,
      title: "Review / Like",
      link: "/admin/reviews-likes",
    },
    {
      image: award,
      title: "Match Up",
      link: "/admin/matchUp",
    },
    {
      image: cookie,
      title: "Badge",
      link: "/admin/badge",
    },
  ];

  const handleClick = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    navigate("/admin");
    alert("로그아웃 되었어요!");
  };

  return (
    <PageNav>
      <GlobalStyle />
      <SideBarTitle>
        <img src={cookieLogo} className="title__logo" alt="logo_icon" />
        <span> Admin</span>
        <button onClick={handleLogout} type="button">
          <img src={logout} />
        </button>
      </SideBarTitle>
      <SideBarContainer>
        {sideMenu.map((menuItem, index) => (
          <div
            key={index}
            className={`sidebar__menu ${location.pathname === menuItem.link ? "active" : "inactive"}`}
            onClick={() => handleClick(menuItem.link)}
          >
            <img src={menuItem.image} alt={`${menuItem.title}_icon`} />
            <p>{menuItem.title}</p>
          </div>
        ))}
      </SideBarContainer>
    </PageNav>
  );
}

export default SideBar;
