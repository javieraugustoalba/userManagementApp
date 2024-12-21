import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          style={{ fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
