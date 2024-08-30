import React from "react";

export default function Pagination(props) {
  const { page, onPreviousPage, onNextPage } = props;

  return (
    <footer>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={onPreviousPage}
          disabled={page === 0}
        >
          Previous
        </button>
        <button className="pagination-button" onClick={onNextPage}>
          Next
        </button>
      </div>
    </footer>
  );
}
