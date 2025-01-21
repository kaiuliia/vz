import Link from 'next/link';
import Image from 'next/image';
import { MovieInfo } from '@/types/movie';
import { FavoriteButton } from '@/components/favoriteButton';

interface CardProps {
  movie: MovieInfo;
}

export default function Card({ movie }: CardProps) {
  return (
    <div
      className={
        'flex-col-2 flex items-start justify-start rounded-lg bg-gray-50 p-2 dark:bg-gray-800'
      }
    >
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <Image src={movie.Poster} alt={'poster'} width={60} height={70} />
      ) : (
        <div
          className={
            'flex h-[4.375rem] w-[3.75rem] items-center justify-center border-2 border-gray-300 bg-gray-200 text-gray-400 dark:border-gray-800 dark:bg-gray-900'
          }
        >
          <p className={'text-center text-xs'}>No poster</p>
        </div>
      )}
      <div className={'flex w-full flex-row items-start justify-between gap-4'}>
        <Link
          href={`/${movie.imdbID}`}
          className='flex w-full cursor-pointer flex-col gap-2 px-5'
        >
          <h3
            className={
              'text-cyan-950 underline hover:text-cyan-700 dark:text-white'
            }
          >
            {movie.Title}
          </h3>
          <p className={'text-orange-700'}>{movie.Year}</p>
        </Link>
        <FavoriteButton movie={movie}></FavoriteButton>
      </div>
    </div>
  );
}
