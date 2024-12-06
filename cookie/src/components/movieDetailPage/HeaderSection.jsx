import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import ArrowButton from "./ArrowButton";

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }

  .info-overlay {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.6);
    padding: 10px;
    border-radius: 8px;

    h1 {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }

    p {
      font-size: 14px;
      margin: 5px 0 0 0;
    }
  }
`;

const HeaderSection = ({
  title,
  releasedAt,
  country,
  runtime,
  certification,
  mainImage
}) => {
  console.log(title);
  console.log(runtime);
  console.log(country);
  // const [currentIndex, setCurrentIndex] = useState(0);


  // const nextImage = () => {
  //   setCurrentIndex((prev) => (prev + 1) % stillCuts.length);
  // };

  // const prevImage = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? stillCuts.length - 1 : prev - 1));
  // };

  return (
    <HeaderWrapper>
      <img src={mainImage} alt="스틸컷" />
      {/* <ArrowButton className="left" onClick={prevImage}>
        ◀
      </ArrowButton>
      <ArrowButton className="right" onClick={nextImage}>
        ▶
      </ArrowButton> */}
      <div className="info-overlay">
        <h1>{title}</h1>
        <p>{`${releasedAt} · ${country} · ${runtime} · ${certification}`}</p>
      </div>
    </HeaderWrapper>
  );
};

// PropTypes 정의
HeaderSection.propTypes = {
  title: PropTypes.string.isRequired, // title은 필수 string 타입
  releasedAt: PropTypes.string.isRequired, // year은 필수 string 타입
  country: PropTypes.string.isRequired, // country은 필수 string 타입
  runtime: PropTypes.string.isRequired, // duration은 필수 string 타입
  certification: PropTypes.string.isRequired, // rating은 필수 string 타입
  mainImage: PropTypes.string.isRequired
  // stillCuts: PropTypes.arrayOf(PropTypes.string).isRequired, // stillCuts는 string 배열의 필수 props
};

export default HeaderSection;
