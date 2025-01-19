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
      className={'flex w-[10rem] flex-row items-center justify-center gap-4'}
    >
      {page !== 1 && (
        <button
          className='flex w-full cursor-pointer flex-row items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-700 hover:text-blue-900 focus:text-violet-900 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={onPreviousPage}
        >
          Prev
        </button>
      )}
      {page}/{pages}
      {!isLastPage && (
        <button
          className='flex w-full cursor-pointer flex-row items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-700 hover:text-blue-900 focus:text-violet-900 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={onNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}
