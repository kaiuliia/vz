'use client';

import { MovieInfo } from '@/types/movie';
import { useLocalStore } from '@/store/useStore';
import full_heart from '../../public/full_heart.svg';
import empty_heart from '../../public/empty_heart.svg';
import Image from 'next/image';

export function FavoriteButton({ movie }: { movie: MovieInfo }) {
  const { favoriteMovieList, setFavoriteMovieList } = useLocalStore();
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

  return (
    <Image
      className={'cursor-pointer'}
      onClick={() => toggleMovieIsFavorite(movie)}
      src={isMovieFavorite ? full_heart : empty_heart}
      width={30}
      height={30}
      alt={'star'}
    />
  );
}
