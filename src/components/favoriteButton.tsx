'use client';

import { MovieInfo } from '@/types/movie';
import { useFavoritesStore } from '@/hooks/useStore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export function FavoriteButton({ movie }: { movie: MovieInfo }) {
  const { favoriteMovieList, setFavoriteMovieList } = useFavoritesStore();
  const isMovieFavorite = favoriteMovieList.some(
    (favorite) => favorite.imdbID === movie.imdbID,
  );

  const toggleMovieIsFavorite = (movieInfo: MovieInfo) => {
    if (isMovieFavorite) {
      const index = favoriteMovieList.findIndex(
        (movie) => movie.imdbID === movieInfo.imdbID,
      );

      if (index >= 0) {
        favoriteMovieList.splice(index, 1);
      }
    } else {
      favoriteMovieList.push(movieInfo);
    }

    setFavoriteMovieList([...favoriteMovieList]);
  };

  return isMovieFavorite ? (
    <AiFillHeart
      className='h-8 w-8 cursor-pointer text-red-500'
      aria-label='Filled heart icon'
      onClick={() => toggleMovieIsFavorite(movie)}
    />
  ) : (
    <AiOutlineHeart
      className='h-8 w-8 cursor-pointer text-red-500'
      aria-label='Outline heart icon'
      onClick={() => toggleMovieIsFavorite(movie)}
    />
  );
}
