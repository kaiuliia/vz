"use client";

import Link from "next/link";
import Image from "next/image";
import full_heart from "../../public/full_heart.svg";
import empty_heart from "../../public/empty_heart.svg";
import { useLocalStore } from "@/store/useStore";
import { MovieInfo } from "@/types/movie";

interface CardProps {
  movie: MovieInfo;
}

export default function Card({ movie }: CardProps) {
  const { favoriteMovieList, setFavoriteMovieList } = useLocalStore();

  const isMovieFavorite = (imdbID: string): boolean => {
    return favoriteMovieList.some((movie) => movie.imdbID === imdbID);
  };

  const toggleMovieIsFavorite = (movieInfo: MovieInfo) => {
    if (isMovieFavorite(movieInfo.imdbID)) {
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
    <div className={"flex flex-row items-center justify-between"}>
      {movie?.Poster ? (
        <Image src={movie?.Poster} alt={"poster"} width={50} height={70} />
      ) : (
        <div>TODO</div>
      )}
      <Image
        src={isMovieFavorite(movie.imdbID) ? full_heart : empty_heart}
        width={20}
        height={20}
        alt={"favorite"}
        onClick={() => toggleMovieIsFavorite(movie)}
      />

      <Link
        href={`/${movie.imdbID}`}
        className="text-blue-700 items-center w-full flex flex-row gap-2 cursor-pointer hover:text-blue-900  focus:text-violet-900  font-medium text-sm  sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <h3>
          {movie.Title}, {movie.Year}
        </h3>
      </Link>
    </div>
  );
}
