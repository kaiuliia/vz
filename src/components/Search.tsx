import { SubmitHandler, useForm } from "react-hook-form";
import { useLocalStore } from "@/store/useStore";
import { SearchQuery } from "@/types/movie";

interface SearchProps {
  onSearch: (query: SearchQuery) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const { searchQuery, setSearchQuery } = useLocalStore();

  const {
    register: find,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchQuery>({
    defaultValues: searchQuery,
  });

  const onSubmit: SubmitHandler<SearchQuery> = (data) => {
    setSearchQuery(data);
    onSearch(data);
  };

  return (
    <form
      className="flex lg:flex-row gap-4 flex-col lg:items-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder={"movie title"}
        {...find("title", { required: true })}
        className="bg-gray-50 border lg:w-[12rem] w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {errors.title?.type === "required" && (
        <p className="text-red-900 text-sm" role="alert">
          Please, enter a movie title
        </p>
      )}

      <select
        {...find("type")}
        className="bg-gray-50 border lg:w-[12rem] w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="movie">movie</option>
        <option value="episode">episode</option>
        <option value="series">series</option>
      </select>

      <input
        placeholder={"year"}
        {...find("year")}
        className="bg-gray-50 border lg:w-[12rem] w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <button
        type="submit"
        className="text-white lg:w-[12rem] w-full  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
