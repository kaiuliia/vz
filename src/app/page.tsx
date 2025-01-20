'use client';

import { useState } from 'react';
import MovieList from '@/components/movieList';
import { useLocalStore } from '@/hooks/useStore';
import Spinner from '@/components/spinner';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { fetchMovieList } from '@/actions/omdb';
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
        <h2>Find a movie</h2>
        <Search onSearch={onSearch} />
      </div>
      <div>
        <div className={'h-auto'}>
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
    </div>
  );
}
