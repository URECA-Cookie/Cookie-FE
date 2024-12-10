import styled from "styled-components";
import { Button } from "./AddLinkStillCut";

const NumberBtn = styled.button`
  border: none;
  background: none;
  margin: 0 15px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: var(--sub);
  }
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <PaginationContainer>
      <Button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      {[...Array(totalPages)].map((_, index) => (
        <NumberBtn
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </NumberBtn>
      ))}
      <Button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
