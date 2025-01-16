"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import MovieList from "@/Components/page";

enum TypeEnum {
  episode = "episode",
  movie = "movie",
  series = "series",
}
interface MovieInput {
  title: string;
  type: TypeEnum;
  year?: number;
}

export interface MovieInfo {
  imdbID: string;
  Title: string;
  Type: TypeEnum;
  Year: string;
  Poster?: string;
}

/*
{
"Title": "Harry Potter and the Sorcerer's Stone",
"Year": "2001",
"imdbID": "tt0241527",
"Type": "movie",
"Poster": "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_SX300.jpg"
},
* */

const MOVIES_PER_PAGE = 10;

export default function Home() {
  const {
    register: find,
    formState: { errors },
    handleSubmit,
  } = useForm<MovieInput>();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<TypeEnum>(TypeEnum.movie);
  const [year, setYear] = useState("");
  const [movieList, setMovieList] = useState<MovieInfo[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const fetchData = async (
    title: string,
    type?: TypeEnum,
    year?: string,
    page?: number,
  ) => {
    const url = `http://www.omdbapi.com/?apikey=21c5d86f&s=${encodeURIComponent(title)}${
      year ? `&y=${year}` : ""
    }${page ? `&page=${page}` : ""}&type=${type}`;
    // const API_KEY =
    // `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}&t=${"Harry Potter"}&y=${}&plot=${}`
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

        const movieList = responseData.Search;
        setIsLastPage(movieList.length < MOVIES_PER_PAGE);
        // const totalResults =
        setTotalResults(Number(responseData?.totalResults));
        setMovieList(movieList);
        setError("");
      }
    } catch (error) {
      setError(`Failed to load movies: ${error}`);
      console.log(`Error ${error}`);
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("total", totalResults);
  const onSubmit: SubmitHandler<MovieInput> = (data) => {
    setTitle(data.title);
    setType(data.type);
    data.year && setYear(data.year.toString());

    fetchData(data.title, data.type, data.year?.toString());
  };

  const onNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    fetchData(title, type, year, nextPage);
  };

  const onPrevPage = () => {
    const prevPage = page - 1;
    setPage(prevPage);

    fetchData(title, type, year, prevPage);
  };
  console.log("mov", movieList);

  return (
    <div>
      <main className="grid lg:grid-cols-2 items-start justify-items-center lg:justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <form
          className="flex flex-col gap-4  items-center sm:items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            {isLoading && <p>LOADING</p>}
            {error}
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Movie title
            </label>
            <input
              {...find("title", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.title?.type === "required" && (
              <p className="text-red-900 text-sm" role="alert">
                Please, enter a movie title
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>

            <select
              {...find("type")}
              className="bg-gray-50 border w-[12rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="movie">movie</option>
              <option value="episode">episode</option>
              <option value="series">series</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="Year"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Year
            </label>
            <input
              type="number"
              {...find("year", { maxLength: 4 })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white w-full  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <MovieList
          totalResults={totalResults}
          movieList={movieList}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          page={page}
          isLastPage={isLastPage}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        2025
      </footer>
    </div>
  );
}
