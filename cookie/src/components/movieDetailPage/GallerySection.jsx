import styled from "styled-components";
import PropTypes from "prop-types"; // PropTypes를 import
import { useState } from "react";

const Title = styled.h2`
  margin-top: 50px;
`;

const GalleryWrapper = styled.div`
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;

    img {
      width: 100%;
      object-fit: cover;
      cursor: pointer;
      border-radius: 8px;

      &:hover {
        transform: scale(1.05);
        transition: transform 0.2s;
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const GallerySection = ({ images = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <GalleryWrapper>
      <Title>갤러리</Title>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`갤러리 이미지 ${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalImage src={selectedImage} alt="Selected" />
        </ModalOverlay>
      )}
    </GalleryWrapper>
  );
};

// PropTypes로 유효성 검사 추가
GallerySection.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // 이미지 배열 (필수)
};

export default GallerySection;
