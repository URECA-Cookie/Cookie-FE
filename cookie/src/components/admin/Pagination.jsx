import styled from "styled-components";
import { Button } from "./AddLinkStillCut";
import { useEffect, useState } from "react";

const NumberBtn = styled.button`
  border: none;
  background: none;
  margin: 0 15px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: var(--sub);
  }
  &.active {
    color: var(--sub);
    font-weight: bold;
  }
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pages, setPages] = useState([]);

  const calculatePages = () => {
    const start = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const end = Math.min(start + 9, totalPages);
    const newPages = [];
    for (let i = start; i <= end; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  };

  useEffect(() => {
    calculatePages();
  }, [currentPage, totalPages]);

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

      {pages.map((page) => (
        <NumberBtn
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
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
