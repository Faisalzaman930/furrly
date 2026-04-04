import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
      <Link
        href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-inset ring-gray-200 hover:ring-brand-start transition-all ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black transition-all ${
            p === currentPage
              ? "bg-brand-gradient text-white shadow-lg shadow-brand-start/20 ring-0"
              : "bg-white text-ebony ring-1 ring-inset ring-gray-200 hover:ring-brand-start"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-inset ring-gray-200 hover:ring-brand-start transition-all ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </Link>
    </nav>
  );
};

export default Pagination;
