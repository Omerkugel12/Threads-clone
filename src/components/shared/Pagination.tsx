import { useRouter } from "next/navigation";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  searchParams: URLSearchParams;
  pageNumber: number;
  totalPages: number | undefined;
}

function Pagination({ searchParams, pageNumber, totalPages }: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  // Generate a range of pages to display based on the current page and total pages
  const generatePageRange = (currentPage: number, totalPages: number) => {
    let startPage = 1;
    let endPage = 5;
    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginationRange = generatePageRange(pageNumber, totalPages as number);

  return (
    <div className="mt-10 flex justify-center items-center gap-4">
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-primary-500 font-semibold transition-all duration-300 ease-in-out hover:bg-primary-100`}
        disabled={pageNumber === 1}
      >
        <ChevronLeft />
      </button>

      {/* Show pagination range */}
      {paginationRange[0] > 1 && (
        <span className="text-white font-semibold text-lg">...</span>
      )}

      {paginationRange.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`flex items-center justify-center  text-white font-semibold transition-all duration-300 ease-in-out ${
            pageNumber === page
              ? "disabled:text-primary-500 disabled:font-bold"
              : ""
          } `}
          disabled={pageNumber === page}
        >
          {page}
        </button>
      ))}

      {paginationRange[paginationRange.length - 1] <
        Number(totalPages || 0) && (
        <span className="text-white font-semibold text-lg">...</span>
      )}

      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-primary-500 font-semibold transition-all duration-300 ease-in-out hover:bg-primary-100`}
        disabled={pageNumber === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
