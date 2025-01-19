import { useState } from "react";

interface PaginationProps {
  pages: number;
  page: number;
  onPageChanged: (page: number) => void;
}

export default function Pagination({
  pages,
  page,
  onPageChanged,
}: PaginationProps) {
  const onPreviousPage = () => {
    const newPage = page - 1;
    onPageChanged(newPage);
  };

  const onNextPage = () => {
    const newPage = page + 1;
    onPageChanged(newPage);
  };

  const isLastPage = page === pages;

  return (
    <div
      className={"flex flex-row gap-4 items-center justify-center w-[10rem]"}
    >
      {page !== 1 && (
        <button
          className="text-blue-700 items-center w-full flex flex-row gap-2 cursor-pointer hover:text-blue-900  focus:text-violet-900  font-medium text-sm  sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onPreviousPage}
        >
          Prev
        </button>
      )}
      {page}/{pages}
      {!isLastPage && (
        <button
          className="text-blue-700 items-center w-full flex flex-row gap-2 cursor-pointer hover:text-blue-900  focus:text-violet-900  font-medium text-sm  sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}
