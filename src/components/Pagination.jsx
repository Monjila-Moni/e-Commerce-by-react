import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate page numbers with dots
  const getPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages); // Always show last page
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-6 gap-2 md:p-0">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded disabled:opacity-50 bg-red-500 text-white text-sm md:text-lg"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-sm md:text-lg">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded text-sm md:text-lg ${
              currentPage === page
                ? "text-red-500 font-bold"
                : "hover:text-red-500"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded disabled:opacity-50 bg-red-500 text-white text-sm md:text-lg"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
