import { create } from "zustand";
import { MovieInfo, SearchQuery } from "@/types/movie";

export interface useLocalState {
  searchQuery?: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  page: number;
  setPage: (page: number) => void;
  movieList: MovieInfo[];
  setMovieList: (movieList: MovieInfo[]) => void;
  favoriteMovieList: MovieInfo[];
  setFavoriteMovieList: (favoriteMovieList: MovieInfo[]) => void;
  totalResults: number;
  setTotalResults: (totalResults: number) => void;
}

export const useLocalStore = create<useLocalState>((set, get) => ({
  searchQuery: undefined,
  setSearchQuery: (query: SearchQuery) => set({ searchQuery: query }),
  page: 0,
  setPage: (newPage: number) => set({ page: newPage }),
  movieList: [],
  setMovieList: (newMovieList: MovieInfo[]) => set({ movieList: newMovieList }),
  favoriteMovieList: [],
  setFavoriteMovieList: (newFavoriteMovieList: MovieInfo[]) =>
    set({ favoriteMovieList: newFavoriteMovieList }),
  totalResults: 0,
  setTotalResults: (newTotalResults: number) =>
    set({ totalResults: newTotalResults }),
}));
