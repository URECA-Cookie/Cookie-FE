import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h2`
  margin-top: 50px;
`

const VideoWrapper = styled.div`
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
  }

  .video-grid {
    display: flex;
    gap: 15px;

    .video-item {
      flex: 1;
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
        border-radius: 8px;
        object-fit: cover;
      }

      .play-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        &::before {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 0 10px 15px;
          border-color: transparent transparent transparent white;
        }
      }

      .video-title {
        text-align: center;
        margin-top: 8px;
        font-size: 14px;
        color: #333;
      }
    }
  }
`;

const VideoSection = ({ videoUrl }) => {
  if (!videoUrl) return null;

  const videoId = videoUrl.includes("v=") ? videoUrl.split("v=")[1] : null;

  return (
    <VideoWrapper>
      <Title>동영상</Title>

      <div className="video-grid">
        <div className="video-item" onClick={() => window.open(videoUrl, "_blank")}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="Video Thumbnail"
          />
          <div className="play-icon"></div>
        </div>
      </div>
    </VideoWrapper>
  );
};

// PropTypes로 유효성 검사 추가
VideoSection.propTypes = {
  videoUrl: PropTypes.string.isRequired, // YouTube URL
};

export default VideoSection;

