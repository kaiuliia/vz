import { create } from 'zustand';
import { MovieInfo, SearchQuery } from '@/types/movie';
import { persist } from 'zustand/middleware';

export interface useLocalState {
  searchQuery?: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  page: number;
  setPage: (page: number) => void;
  movieList: MovieInfo[];
  setMovieList: (movieList: MovieInfo[]) => void;
  totalResults: number;
  setTotalResults: (totalResults: number) => void;
}

export interface useFavoriteState {
  favoriteMovieList: MovieInfo[];
  setFavoriteMovieList: (favoriteMovieList: MovieInfo[]) => void;
}

export const useLocalStore = create<useLocalState>((set) => ({
  searchQuery: undefined,
  setSearchQuery: (query: SearchQuery) => set({ searchQuery: query }),
  page: 0,
  setPage: (newPage: number) => set({ page: newPage }),
  movieList: [],
  setMovieList: (newMovieList: MovieInfo[]) => set({ movieList: newMovieList }),
  totalResults: 0,
  setTotalResults: (newTotalResults: number) =>
    set({ totalResults: newTotalResults }),
}));

export const useFavoritesStore = create<useFavoriteState>()(
  persist(
    (set) => ({
      favoriteMovieList: [],
      setFavoriteMovieList: (newFavoriteMovieList: MovieInfo[]) => {
        set({ favoriteMovieList: newFavoriteMovieList });
      },
    }),
    {
      name: 'favoriteMovieList',
    },
  ),
);
