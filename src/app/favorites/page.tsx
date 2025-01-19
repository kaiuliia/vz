'use client';

import MovieList from '@/components/MovieList';
import { useLocalStore } from '@/store/useStore';

export default function Favorites() {
  const { favoriteMovieList } = useLocalStore();

  return <MovieList movieList={favoriteMovieList}></MovieList>;
}
