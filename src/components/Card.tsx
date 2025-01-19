import Link from 'next/link';
import Image from 'next/image';
import { MovieInfo } from '@/types/movie';
import { FavoriteButton } from '@/components/FavoriteButton';

interface CardProps {
  movie: MovieInfo;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className={'flex flex-row items-center justify-between'}>
      {movie.Poster ? (
        <Image src={movie?.Poster} alt={'poster'} width={50} height={70} />
      ) : (
        <div>TODO</div>
      )}
      <FavoriteButton movie={movie}></FavoriteButton>
      <Link
        href={`/${movie.imdbID}`}
        className='flex w-full cursor-pointer flex-row items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-700 hover:text-blue-900 focus:text-violet-900 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        <h3>
          {movie.Title}, {movie.Year}
        </h3>
      </Link>
    </div>
  );
}
