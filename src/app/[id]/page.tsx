import { Suspense } from 'react';
import Spinner from '@/components/spinner';
import { MovieDetails } from '@/components/movieDetails';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Movie({ params }: Props) {
  const { id } = await params;

  return (
    <div className={'gap- flex flex-col p-8 lg:p-20'}>
      <Suspense fallback={<Spinner />}>
        <MovieDetails imdbID={id}></MovieDetails>
      </Suspense>
    </div>
  );
}
