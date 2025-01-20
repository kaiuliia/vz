import { MovieInfo, WholeMovieInfo } from '@/types/movie';
import Image from 'next/image';
import { fetchMovie } from '@/actions/omdb';
import { FavoriteButton } from '@/components/favoriteButton';

const extractMovieInfo = (movieData: WholeMovieInfo): MovieInfo => ({
  imdbID: movieData.imdbID,
  Title: movieData.Title,
  Type: movieData.Type,
  Year: movieData.Year,
  Poster: movieData.Poster,
});

export async function MovieDetails({ imdbID }: { imdbID: string }) {
  const movie = await fetchMovie(imdbID);

  const getMovieRecord = (
    movieData: WholeMovieInfo,
  ): Record<string, string> => {
    const excludedKeys = [
      'Title',
      'Poster',
      'Plot',
      'Ratings',
      'Response',
      'imdbID',
    ];

    const ratings = movieData?.Ratings.map(
      (rating) => `${rating.Value} (${rating.Source})`,
    ).join(', ');

    const entries: [string, string][] = Object.entries(movieData)
      .filter(([key]) => !excludedKeys.includes(key))
      .map(([key, value]) => [key, value]);

    entries.push(['Ratings', ratings]);

    return Object.fromEntries(entries);
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-row items-start gap-4 lg:items-center'}>
        <FavoriteButton movie={extractMovieInfo(movie)}></FavoriteButton>
        <h2 className={'font-bold'}>{movie.Title}</h2>
      </div>

      <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'}>
        {movie.Poster !== 'N/A' ? (
          <Image
            src={movie.Poster}
            width={300}
            height={400}
            className={'h-auto lg:w-full'}
            alt={'no poster'}
          />
        ) : (
          <div
            className={
              'flex h-[20rem] w-[15rem] items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-200 text-gray-400 lg:h-1/2'
            }
          >
            <p>No poster</p>
          </div>
        )}
        <table>
          <tbody>
            {Object.entries(getMovieRecord(movie)).map(([key, value]) => (
              <tr key={key}>
                <td className='p-2 text-gray-600 dark:text-white'>{key}</td>
                <td className='p-2 dark:text-white'>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>About movie</h2>
        <p>{movie.Plot}</p>
      </div>
    </div>
  );
}
