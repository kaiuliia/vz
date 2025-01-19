import { fireEvent, render, screen } from '@testing-library/react';
import { FavoriteButton } from './favoriteButton';
import { ContentType, MovieInfo } from '@/types/movie';
import * as hooks from '@/hooks/useStore';

const mockSetFavoriteMovieList = jest.fn();

describe('FavoriteButton', () => {
  const mockMovie: MovieInfo = {
    imdbID: 'tt1234567',
    Title: 'Sample Movie',
    Year: '2023',
    Poster: 'N/A',
    Type: ContentType.Movie,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the outline heart icon when the movie is not a favorite', () => {
    jest.spyOn(hooks, 'useLocalStore').mockReturnValue({
      favoriteMovieList: [],
      setFavoriteMovieList: mockSetFavoriteMovieList,
    });

    render(<FavoriteButton movie={mockMovie} />);

    expect(screen.getByLabelText('Outline heart icon')).toBeInTheDocument();
  });

  it('renders the filled heart icon when the movie is a favorite', () => {
    jest.spyOn(hooks, 'useLocalStore').mockReturnValue({
      favoriteMovieList: [mockMovie],
      setFavoriteMovieList: mockSetFavoriteMovieList,
    });

    render(<FavoriteButton movie={mockMovie} />);

    expect(screen.getByLabelText('Filled heart icon')).toBeInTheDocument();
  });

  it('adds the movie to the favorite list when clicking the outline heart icon', () => {
    jest.spyOn(hooks, 'useLocalStore').mockReturnValue({
      favoriteMovieList: [],
      setFavoriteMovieList: mockSetFavoriteMovieList,
    });

    render(<FavoriteButton movie={mockMovie} />);

    const outlineHeartIcon = screen.getByLabelText('Outline heart icon');
    fireEvent.click(outlineHeartIcon);

    expect(mockSetFavoriteMovieList).toHaveBeenCalledWith([mockMovie]);
  });

  it('removes the movie from the favorite list when clicking the filled heart icon', () => {
    jest.spyOn(hooks, 'useLocalStore').mockReturnValue({
      favoriteMovieList: [mockMovie],
      setFavoriteMovieList: mockSetFavoriteMovieList,
    });

    render(<FavoriteButton movie={mockMovie} />);

    const filledHeartIcon = screen.getByLabelText('Filled heart icon');
    fireEvent.click(filledHeartIcon);

    expect(mockSetFavoriteMovieList).toHaveBeenCalledWith([]);
  });
});
