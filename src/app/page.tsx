'use client';

import { useEffect, useState } from 'react';
import MovieList from '@/components/MovieList';
import { useLocalStore } from '@/store/useStore';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { fetchMovieList } from '@/store/omdb';
import { SearchQuery } from '@/types/movie';

const MOVIES_PER_PAGE = 10;

export default function Home() {
  const { movieList, setMovieList, page, setPage, searchQuery } =
    useLocalStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const pages = Math.ceil(totalResults / MOVIES_PER_PAGE);

  const onSearch = async (query: SearchQuery) => {
    setIsLoading(true);
    setError('');
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
      throw new Error('invalid state');
    }

    setIsLoading(true);
    setError('');
    setPage(page);

    try {
      const { movieList } = await fetchMovieList(searchQuery, page);
      setMovieList(movieList);
    } catch (error: unknown) {
      setError(`Failed to load movie list page: ${error}`);
    }

    setIsLoading(false);
  };

  return (
    <div className='flex flex-col gap-8 p-8 lg:p-20'>
      <div className={'flex flex-col gap-4 lg:flex-row'}>
        <h1>Find a movie</h1>
        <Search onSearch={onSearch} />
      </div>
      <div>
        <div className={'h-[45rem]'}>
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
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        2025
      </footer>
    </div>
  );
}
