'use client';

import MovieList from '@/components/movieList';
import { useFavoritesStore } from '@/hooks/useStore';

export default function Favorites() {
  const { favoriteMovieList } = useFavoritesStore();

  return favoriteMovieList.length > 0 ? (
    <div className={'p-20'}>
      <MovieList movieList={favoriteMovieList}></MovieList>
    </div>
  ) : (
    <div className={'p-20'}>
      <h2>You don&#39;t have favorites movies yet</h2>
    </div>
  );
}
