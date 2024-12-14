import styled from "styled-components";
import deleteBtn from "../../assets/images/signUp/close_icon.svg";
import { useEffect, useState } from "react";
import { useRef } from "react";
export const YoutubeAndStillCutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 11.2rem;
`;

export const YoutubeLink = styled.a`
  color: #0066cc;
  text-decoration: none;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
`;
const InfoTitle = styled.p`
  font-weight: 700;
  min-height: 16px;
  width: 100px;
  font-size: 18px;
  margin-right: 1rem;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 850px;
`;
const YoutubeUrl = styled.input`
  width: 20rem;
  height: 2rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  padding: 0 16px;
  font-size: 18px;
`;

export const StillCutContainer = styled.div`
  display: inline-block;
  flex-direction: row;
  gap: 1rem;
  position: relative;
  margin-right: 1rem;

  button {
    background: none;
    border: none;
    position: absolute;
    right: -0.9rem;
    bottom: 7rem;
    cursor: pointer;
  }
`;

export const SitllCut = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: var(--sub);
  color: var(--text);
  border-radius: 18px;
  padding: 0.5rem 1rem;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  position: relative;
  top: 0.4rem;
  cursor: pointer;
`;
const MovieInfoSection = ({ label, children }) => {
  return (
    <InfoContainer>
      <InfoTitle>{label}</InfoTitle>
      <InfoContent>
        <div>{children}</div>
      </InfoContent>
    </InfoContainer>
  );
};

function AddLinkStillCut({ selectedMovie, stillCuts, onUpdateStillCuts }) {
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  // const [stillCuts, setStillCuts] = useState([]);
  const [additionalCuts, setAdditionalCuts] = useState([]); //스틸컷 추가

  const movie = selectedMovie;

  if (!movie) {
    return <p>영화 정보를 불러오는 중입니다...</p>;
  }

  const displayedStillCuts = stillCuts;
  const allStillCuts = [...displayedStillCuts, ...additionalCuts];

  /*유튜브 링크 추가*/
  // const handleAddLink = () => {
  //   if (!inputValue.trim()) return;

  //   const updatedLinks = movie.youtube
  //     ? [...new Set([...movie.youtube.split(", "), inputValue.trim()])]
  //     : [inputValue.trim()];

  //   setYoutubeLink(updatedLinks.join(", "));
  //   setInputValue("");
  // };

  /*유튜브 링크 삭제*/
  const handleDeleteYoutubeLink = (link) => {
    const updatedLinks = movie.youtube
      .split(", ")
      .filter((existingLink) => existingLink !== link);

    setYoutubeLink(updatedLinks.join(", "));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (allStillCuts.length + files.length > 12) {
      alert("최대 12개까지 업로드 가능합니다.");
      return;
    }
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setAdditionalCuts([...additionalCuts, ...fileURLs]);
  };

  const handleDeleteThumbnail = (index) => {
    const updatedFiles = additionalCuts.filter((_, idx) => idx !== index);
    setAdditionalCuts(updatedFiles);
  };

  //상위 컴포넌트로 전달
  useEffect(() => {
    onUpdateStillCuts(additionalCuts);
  }, [additionalCuts, onUpdateStillCuts]);

  return (
    <YoutubeAndStillCutContainer>
      <MovieInfoSection label="유튜브">
        {/* <YoutubeUrl
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ex) http://www.youtube.com"
        />
        <Button onClick={handleAddLink}>링크 추가</Button> */}

        {movie.youtube &&
          movie.youtube.split(", ").map((link, index) => (
            <div key={index}>
              📎
              <YoutubeLink
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </YoutubeLink>
              {/* <DeleteBtn onClick={() => handleDeleteYoutubeLink(link)}>
                <img src={deleteBtn} alt="delete_button" />
              </DeleteBtn> */}
            </div>
          ))}
      </MovieInfoSection>

      <MovieInfoSection label="스틸컷">
        {stillCuts.length > 0 &&
          stillCuts.map((image, index) => (
            <StillCutContainer key={index}>
              <SitllCut src={image} alt={`Still cut ${index + 1}`} />
            </StillCutContainer>
          ))}

        {/* 추가 업로드된 스틸컷 5개 렌더링 */}
        {additionalCuts.length > 0 &&
          additionalCuts.map((image, index) => (
            <StillCutContainer key={index}>
              <SitllCut src={image} alt={`Uploaded cut ${index + 1}`} />
              <button onClick={() => handleDeleteThumbnail(index)}>
                <img src={deleteBtn} alt="delete_button" />
              </button>
            </StillCutContainer>
          ))}

        {/* 최대 5개 업로드 가능 */}
        {additionalCuts.length < 5 && (
          <Button onClick={() => fileInputRef.current.click()}>
            파일 업로드
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/svg+xml"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </MovieInfoSection>
    </YoutubeAndStillCutContainer>
  );
}

export default AddLinkStillCut;
