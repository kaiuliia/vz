export enum ContentType {
  Episode = 'episode',
  Movie = 'movie',
  Series = 'series',
}

export interface SearchQuery {
  title: string;
  type: ContentType;
  year?: number;
}

export interface MovieInfo {
  imdbID: string;
  Title: string;
  Type: ContentType;
  Year: string;
  Poster?: string;
}

export interface WholeMovieInfo {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: ContentType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
