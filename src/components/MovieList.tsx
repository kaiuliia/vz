'use client';

import { MovieInfo } from '@/types/movie';
import Card from '@/components/Card';

interface MovieListProps {
  movieList: MovieInfo[];
}

export default function MovieList({ movieList }: MovieListProps) {
  return (
    <div>
      <ul>
        <li>
          {movieList?.map((movie) => <Card key={movie.imdbID} movie={movie} />)}
        </li>
      </ul>
    </div>
  );
}
