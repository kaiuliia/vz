import Link from 'next/link';
import Image from 'next/image';
import { MovieInfo } from '@/types/movie';
import { FavoriteButton } from '@/components/favoriteButton';

interface CardProps {
  movie: MovieInfo;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className={'divide-y-2'}>
      <div
        className={
          'flex-col-2 flex items-start justify-start rounded-lg p-2 dark:bg-gray-800'
        }
      >
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <Image src={movie.Poster} alt={'poster'} width={60} height={70} />
        ) : (
          <div
            className={
              'flex h-[4.375rem] w-[3.75rem] items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-200 text-gray-400 lg:h-1/2'
            }
          >
            <p className={'text-center text-xs'}>No poster</p>
          </div>
        )}
        <div
          className={'flex w-full flex-row items-start justify-between gap-4'}
        >
          <Link
            href={`/${movie.imdbID}`}
            className='flex w-full cursor-pointer flex-col gap-2 px-5 text-sm font-medium text-blue-700 underline hover:text-blue-900 focus:text-violet-900 sm:w-auto dark:text-white'
          >
            <h3>{movie.Title}</h3>
            <p className={'text-black'}>{movie.Year}</p>
          </Link>
          <FavoriteButton movie={movie}></FavoriteButton>
        </div>
      </div>
    </div>
  );
}
