import React from "react";
import styled from "styled-components";
import SideBar from "../../components/admin/SideBar";
import CookieLogo from "../../assets/images/admin/CookieAdmin.svg";
import CookieImg from "../../assets/images/admin/cookie_img.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";

const Viewport = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const FormContanier = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
  justify-content: center;
  align-items: center;

  label {
    font-size: 1rem;
    color: #ffff;
  }

  input {
    display: block;
    border: 1px solid #a7a7a7;
    border-radius: 0.5rem;
    height: 3rem;
    width: 21.7rem;
    margin-top: 0.5rem;
    padding: 0.2rem 0.5rem;
    font-size: 1.25rem;
    color: var(--text);
  }

  button {
    font-weight: bold;
    font-size: 1.25rem;
    background-color: white;
    border: 1px solid var(--sub);
    color: var(--text);
    border-radius: 0.5rem;
    width: 11.7rem;
    height: 3rem;
    margin-top: 1rem;
    cursor: pointer;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
  }
  button:hover {
    box-shadow: 0 0.375rem 1.25rem rgba(130, 236, 255, 0.333);
  }
`;

function AdminLogin() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/api/auth/admin`, {
        id: adminId,
        password: password,
      });

      const { accessToken, refreshToken } = response.data.response;
      console.log(response);
      if (accessToken && refreshToken) {
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log(accessToken);
        console.log(refreshToken);

        alert("로그인 되었어요!");
        navigate("/admin/movie");
      } else {
        throw new Error("토큰 발급 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.response) {
        const { message } = error.response.data;
        toast.error(
          message || "로그인 실패: 아이디 또는 비밀번호를 확인하세요"
        );
      }
    }
  };
  return (
    <>
      <SideBar />
      <Viewport>
        <div>
          <img src={CookieLogo} />
          <img src={CookieImg} />
        </div>
        <form action="/submit" method="POST" onSubmit={handleLoginClick}>
          <FormContanier>
            <label htmlFor="adminId">
              아이디
              <input
                type="text"
                id="adminId"
                name="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                placeholder="아이디를 입력하세요"
              />
            </label>

            <label htmlFor="password">
              비밀번호
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
              />
            </label>

            <button type="submit" onSubmit={handleLoginClick}>
              Login
            </button>
          </FormContanier>
        </form>
      </Viewport>
    </>
  );
}

export default AdminLogin;
