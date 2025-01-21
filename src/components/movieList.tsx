'use client';

import { MovieInfo } from '@/types/movie';
import Card from '@/components/card';

interface MovieListProps {
  movieList: MovieInfo[];
}

export default function MovieList({ movieList }: MovieListProps) {
  return (
    <div className={'flex flex-col gap-1'}>
      {movieList?.map((movie) => <Card key={movie.imdbID} movie={movie} />)}
    </div>
  );
}
