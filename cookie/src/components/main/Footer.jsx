import { useState } from "react";
import styled from "styled-components";
import {
  FaChevronDown,
  FaChevronUp,
  FaInstagram,
  FaPhone,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1b1b1b;
  color: white;
  padding: 15px;
  font-size: 0.8rem;
  text-align: center;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .footer-links {
    display: flex;
    gap: 15px;

    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.8rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .toggle-icon {
    cursor: pointer;
    font-size: 1.2rem;
    color: white;

    &:hover {
      color: #f84b99;
    }
  }
`;

const FooterDetails = styled.div`
  margin-top: 10px;
  line-height: 1.4;
  border-top: 1px solid #555;
  padding-top: 10px;
  text-align: left;

  p {
    margin: 6px 0;
    font-size: 0.8rem;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 15px;

  .icon {
    font-size: 1.5rem;
    color: white;
    cursor: pointer;

    &:hover {
      color: #f84b99;
    }
  }
`;

const Footer = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <FooterContainer>
      <FooterTop>
        <div className="footer-links">
          <a href="/terms">이용약관</a>
          <a href="/privacy">개인정보처리방침</a>
        </div>
        <div
          className="toggle-icon"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </FooterTop>

      {showDetails && (
        <FooterDetails>
          <p>회사명: 쿠키</p>
          <p>주소: 서울특별시 강남구 쿠키로 123</p>
          <p>대표이사: 김정동,김의진,류금정,박건휘,임가인,정유진</p>
          <p>사업자등록번호: 123-45-67890</p>
          <p>통신판매신고: 제2024-서울-0000호</p>
          <p>이메일: cookie@cookie.com</p>
          <p>전화번호: 02-1234-5678</p>
        </FooterDetails>
      )}

      <FooterBottom>
        <a
          href="https://www.instagram.com/cook1e_ureka/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="icon" title="인스타그램" />
        </a>
        <a href="tel:0212345678">
          <FaPhone className="icon" title="전화 상담" />
        </a>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
