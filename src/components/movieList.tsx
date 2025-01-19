'use client';

import { MovieInfo } from '@/types/movie';
import Card from '@/components/card';

interface MovieListProps {
  movieList: MovieInfo[];
}

export default function MovieList({ movieList }: MovieListProps) {
  return (
    <div>
      <ul>
        <li className={'divide-y-[1px]'}>
          {movieList?.map((movie) => <Card key={movie.imdbID} movie={movie} />)}
        </li>
      </ul>
    </div>
  );
}
