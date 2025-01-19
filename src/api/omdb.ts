import { MovieInfo, SearchQuery, WholeMovieInfo } from '@/types/movie';

const OMDB_API_URL = 'http://www.omdbapi.com/';
const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY ?? '';

interface MovieListResponse {
  movieList: MovieInfo[];
  totalResults: number;
}

export const fetchMovieList = async (
  query: SearchQuery,
  page?: number,
): Promise<MovieListResponse> => {
  const queryParams: Record<string, string> = {
    s: query.title,
    apikey: OMDB_API_KEY,
  };

  if (query.year) {
    queryParams.y = query.year.toString();
  }

  if (query.type) {
    queryParams.type = query.type;
  }

  if (page) {
    queryParams.page = page.toString();
  }

  const response = await fetch(
    `${OMDB_API_URL}?` + new URLSearchParams(queryParams).toString(),
  );

  if (!response.ok) {
    throw new Error(`Response finished with status ${response.status}`);
  }

  const responseData = await response.json();

  if (responseData.Response === 'False') {
    throw new Error(responseData.Error);
  }

  const { Search: movieList, totalResults } = responseData;

  return { movieList, totalResults: Number.parseInt(totalResults) };
};

export const fetchMovie = async (imdbID: string): Promise<WholeMovieInfo> => {
  const queryParams: Record<string, string> = {
    i: imdbID,
    apikey: OMDB_API_KEY,
    plot: 'full',
  };

  const response = await fetch(
    `${OMDB_API_URL}?` + new URLSearchParams(queryParams).toString(),
  );

  if (!response.ok) {
    throw new Error(`Response finished with status ${response.status}`);
  }

  const responseData = await response.json();

  if (responseData.Response === 'False') {
    throw new Error(responseData.Error);
  }

  return responseData;
};
