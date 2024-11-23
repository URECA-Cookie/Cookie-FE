import styled from "styled-components";
import Poster from "./Poster";

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin-top: 30px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 1000px;
`;

const PosterList = ({ posters }) => (
  <PosterContainer>
    {posters.map((poster, index) => (
      <Poster key={index} src={poster.src} alt={`Poster ${index + 1}`} />
    ))}
  </PosterContainer>
);

export default PosterList;