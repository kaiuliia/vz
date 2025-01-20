import { fetchMovie, fetchMovieList } from './omdb';
import { ContentType, MovieInfo, SearchQuery } from '@/types/movie';
import { normalizeURL } from '../../test/url';
import { mockWholeMovieInfo } from '../../test/movie'; // Replace with the actual file path

const OMDB_API_URL = 'https://www.omdbapi.com/';

describe('fetchMovieList', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('composes the URL correctly with all query parameters', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'True',
        Search: [],
        totalResults: '0',
      }),
    });

    await fetchMovieList(
      {
        title: 'Inception',
        year: 2010,
        type: ContentType.Movie,
      },
      2,
    );

    const expectedURL = `${OMDB_API_URL}?s=Inception&apikey=test-key&y=2010&type=movie&page=2`;
    const receivedURL = (fetch as jest.Mock).mock.calls[0][0];
    expect(normalizeURL(receivedURL)).toStrictEqual(normalizeURL(expectedURL));
  });

  it('handles missing optional parameters correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'True',
        Search: [],
        totalResults: '0',
      }),
    });

    const queryWithoutOptionalParams: SearchQuery = {
      title: 'Inception',
      type: ContentType.Episode,
    };
    await fetchMovieList(queryWithoutOptionalParams);

    const expectedURL = `${OMDB_API_URL}?s=Inception&apikey=test-key&type=episode`;
    const receivedURL = (fetch as jest.Mock).mock.calls[0][0];
    expect(normalizeURL(receivedURL)).toStrictEqual(normalizeURL(expectedURL));
  });

  it('parses the successful response correctly', async () => {
    const mockSearchResults: MovieInfo[] = [
      {
        imdbID: '1',
        Title: "Harry Potter and the Philosopher's Stone",
        Type: ContentType.Movie,
        Year: '2001',
      },
      {
        imdbID: '2',
        Title: 'Harry Potter and the Prisoner of Azkaban',
        Type: ContentType.Movie,
        Year: '2004',
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'True',
        Search: mockSearchResults,
        totalResults: '2',
      }),
    });

    const query: SearchQuery = {
      title: 'Harry Potter',
      type: ContentType.Movie,
    };

    const { movieList, totalResults } = await fetchMovieList(query);

    expect(totalResults).toStrictEqual(2);
    expect(movieList).toStrictEqual(mockSearchResults);
  });

  it('throws if the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const query: SearchQuery = {
      title: 'Harry Potter',
      type: ContentType.Movie,
    };

    await expect(fetchMovieList(query)).rejects.toStrictEqual(
      new Error(`Response finished with status 500`),
    );
  });

  it('throws if the response contains an error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'False',
        Error: 'No movies found',
      }),
    });

    const query: SearchQuery = {
      title: '123',
      type: ContentType.Movie,
    };

    await expect(fetchMovieList(query)).rejects.toStrictEqual(
      new Error(`No movies found`),
    );
  });
});

describe('fetchMovie', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('composes the URL correctly with all query parameters', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'True',
      }),
    });

    await fetchMovie('1');

    const expectedURL = `${OMDB_API_URL}?i=1&apikey=test-key&plot=full`;
    const receivedURL = (fetch as jest.Mock).mock.calls[0][0];
    expect(normalizeURL(receivedURL)).toStrictEqual(normalizeURL(expectedURL));
  });

  it('parses the successful response correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWholeMovieInfo,
    });

    const movie = await fetchMovie('1');
    expect(movie).toStrictEqual(mockWholeMovieInfo);
  });

  it('throws if the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchMovie('1')).rejects.toStrictEqual(
      new Error(`Response finished with status 500`),
    );
  });

  it('throws if the response contains an error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: 'False',
        Error: 'Movie not found',
      }),
    });

    await expect(fetchMovie('1')).rejects.toStrictEqual(
      new Error('Movie not found'),
    );
  });
});
