"use client";

import Link from "next/link";
import { MovieInfo } from "@/app/page";
import { useState } from "react";

interface MovieListProps {
  movieList?: MovieInfo[];
  page?: number;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  isLastPage?: boolean;
  totalResults: number;
}

export default function MovieList({
  movieList,
  page,
  onPrevPage,
  onNextPage,
  isLastPage,
  totalResults,
}: MovieListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div>
      {/*{movieList&& movieList.Error && <p className={'text-red-900 cursor-pointer'}>Sorry, movie wasn't found</p>}*/}
      {movieList !== undefined && movieList.length > 0 && (
        <>
          <h1 className={"font-bold"}>
            We've founded {`${totalResults}`} movies for you on total pages{" "}
            {`${Math.ceil(totalResults / 10)}`}:
          </h1>
          {/*<h2 className={"text-cyan-900"}>*/}
          {/*  Click on the movie's title to know more*/}
          {/*</h2>*/}
          <div className="flex flex-col gap-4 items-center">
            {movieList?.map((movie) => (
              <div key={movie.imdbID}>
                <h3>{movie.Title}</h3>

                <Link
                  href={`/${movie.imdbID}`}
                  // onClick={fetchChosenMovieData(movie.imdbID)}
                  className="text-white w-full  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  About
                </Link>
              </div>
            ))}
          </div>
          <div className={"flex flex-row gap-4 justify-center"}>
            {page !== 1 && (
              <button
                className={"bg-cyan-700 w-10 text-white cursor-pointer h10"}
                onClick={onPrevPage}
              >
                Prev
              </button>
            )}
            {page}
            {!isLastPage && (
              <button
                className={"bg-cyan-700 text-white cursor-pointer w-10 h10"}
                onClick={onNextPage}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
