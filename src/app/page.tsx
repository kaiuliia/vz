"use client";

import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import { useLocalStore } from "@/store/useStore";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { fetchMovieList } from "@/store/omdb";
import { SearchQuery } from "@/types/movie";

const MOVIES_PER_PAGE = 10;

export default function Home() {
  const { movieList, setMovieList, page, setPage, searchQuery } =
    useLocalStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const pages = Math.ceil(totalResults / MOVIES_PER_PAGE);

  const onSearch = async (query: SearchQuery) => {
    setIsLoading(true);
    setError("");
    setPage(1);

    try {
      const { movieList, totalResults } = await fetchMovieList(query);
      setMovieList(movieList);
      setTotalResults(totalResults);
    } catch (error: unknown) {
      setError(`Failed to load movie list: ${error}`);
    }

    setIsLoading(false);
  };

  const onPageChanged = async (page: number) => {
    if (!searchQuery) {
      throw new Error("invalid state");
    }

    setIsLoading(true);
    setError("");
    setPage(page);

    try {
      const { movieList } = await fetchMovieList(searchQuery, page);
      setMovieList(movieList);
    } catch (error: unknown) {
      setError(`Failed to load movie list page: ${error}`);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // window.scrollTo({
    //   top: 100,
    //   behavior: "smooth",
    // });
  }, [movieList]);

  return (
    <div className="lg:p-20 p-8 flex flex-col gap-8">
      <div className={"flex lg:flex-row gap-4 flex-col"}>
        <h1>Find a movie</h1>
        <Search onSearch={onSearch} />
      </div>
      <div>
        <div className={"h-[45rem]"}>
          {isLoading ? (
            <Spinner />
          ) : (
            movieList.length > 0 && <MovieList movieList={movieList} />
          )}
        </div>
        {error && <p>{error}</p>}
        {totalResults !== 0 && (
          <Pagination pages={pages} page={page} onPageChanged={onPageChanged} />
        )}
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        2025
      </footer>
    </div>
  );
}
