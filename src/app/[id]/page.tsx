"use client";

import full_heart from "../../../public/full_heart.svg";
import empty_heart from "../../../public/empty_heart.svg";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useLocalStore } from "@/store/useStore";
import { MovieInfo, WholeMovieInfo } from "@/types/movie";
import { fetchMovie } from "@/store/omdb";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function Movie({ params }: Props) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [posterSrc, setPosterSrc] = useState("");
  const [movieData, setMovieData] = useState<WholeMovieInfo | undefined>(
    undefined,
  );
  const { favoriteMovieList, setFavoriteMovieList } = useLocalStore();
  const isMovieFavorite = favoriteMovieList.some(
    (movie) => movie.imdbID === id,
  );

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setError("");

    try {
      const movie = await fetchMovie(id);
      setMovieData(movie);
    } catch (error: unknown) {
      setError(`Failed to load movie: ${error}`);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const getMovieRecord = (
    movieData: WholeMovieInfo,
  ): Record<string, string> => {
    const excludedKeys = [
      "Title",
      "Poster",
      "Plot",
      "Ratings",
      "Response",
      "imdbID",
    ];

    const ratings = movieData?.Ratings.map(
      (rating) => `${rating.Value} (${rating.Source})`,
    ).join(", ");

    let entries: [string, string][] = Object.entries(movieData)
      .filter(([key]) => !excludedKeys.includes(key))
      .map(([key, value]) => [key, value.toString()]);

    entries.push(["Ratings", ratings]);

    return Object.fromEntries(entries);
  };

  const extractMovieInfo = (movieData: WholeMovieInfo): MovieInfo => ({
    imdbID: movieData.imdbID,
    Title: movieData.Title,
    Type: movieData.Type,
    Year: movieData.Year,
    Poster: movieData.Poster,
  });

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
    <div className={"lg:p-20 p-8 flex flex-col gap-4"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {movieData && (
            <div className={"flex flex-col gap-4"}>
              <div
                className={"flex flex-row gap-4 items-start lg:items-center"}
              >
                <Image
                  className={"cursor-pointer"}
                  onClick={() =>
                    toggleMovieIsFavorite(extractMovieInfo(movieData))
                  }
                  src={isMovieFavorite ? full_heart : empty_heart}
                  width={30}
                  height={30}
                  alt={"star"}
                />
                <h2 className={"font-bold"}>{movieData.Title}</h2>
              </div>
              <div
                className={"grid lg:grid-cols-2 grid-cols-1 gap-4  lg:gap-8"}
              >
                <Image
                  src={movieData.Poster}
                  width={300}
                  height={400}
                  className={"lg:w-full h-auto"}
                  alt={"no poster"}
                />
                <table>
                  <tbody>
                    {Object.entries(getMovieRecord(movieData)).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="p-1 text-gray-600">{key}</td>
                          <td className="p-1">{value}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      <div>
        <h2>About movie</h2>
        <p>{movieData?.Plot}</p>
      </div>
    </div>
  );
}
