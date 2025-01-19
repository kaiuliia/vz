import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import { MovieDetails } from '@/components/MovieDetails';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Movie({ params }: Props) {
  const { id } = await params;

  return (
    <div className={'flex flex-col gap-4 p-8 lg:p-20'}>
      <Suspense fallback={<Spinner />}>
        <MovieDetails imdbID={id}></MovieDetails>
      </Suspense>
    </div>
  );
}
