"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};
export default function Movie({ params: { id } }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [posterSrc, setPosterSrc] = useState("");
  const fetchChosenMovieData = async (id: string) => {
    const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=21c5d86f`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response finished with status ${response.status}`);
      } else {
        const responseData = await response.json();

        if (responseData.Response === "False") {
          throw new Error(responseData.Response.Error);
        }

        const movieData = responseData;
        setTitle(movieData.Title);
        setPlot(movieData.Plot);
        setPosterSrc(movieData.Poster);
        // setIsLastPage(movieList.length < MOVIES_PER_PAGE);
        // // const totalResults =
        // setTotalResults(Number(responseData?.totalResults));
        // setMovieList(movieList);
        // setError("");
      }
    } catch (error) {
      setError(`Failed to load movies: ${error}`);
      console.log(`Error ${error}`);
      // setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchMovie = async () => {
      await fetchChosenMovieData(id);
    };
    fetchMovie();
  }, []);
  console.log("poster", posterSrc);
  return (
    <div>
      {isLoading && <p>IS LOADING!</p>}
      {title}
      {plot}

      <Image src={posterSrc} width={300} height={450} alt={"no poster"} />
      <Link
        href="/"
        className="text-white w-full  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Back
      </Link>
    </div>
  );
}
