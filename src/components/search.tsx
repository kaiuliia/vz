import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStore } from '@/hooks/useStore';
import { SearchQuery } from '@/types/movie';

interface SearchProps {
  onSearch: (query: SearchQuery) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const { searchQuery, setSearchQuery } = useLocalStore();

  const {
    register: find,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchQuery>({
    defaultValues: searchQuery,
  });

  const onSubmit: SubmitHandler<SearchQuery> = (data) => {
    setSearchQuery(data);
    onSearch(data);
  };

  return (
    <>
      <form
        className='flex flex-col gap-4 lg:flex-row'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={'flex flex-col items-start gap-2'}>
          <input
            placeholder={'movie title'}
            {...find('title', { required: true })}
            className='block h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
          />
          {errors.title?.type === 'required' && (
            <p className='text-sm text-red-700' role='alert'>
              Please, enter a movie title
            </p>
          )}
        </div>
        <select
          {...find('type')}
          className='select block h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
        >
          <option value='movie'>movie</option>
          <option value='episode'>episode</option>
          <option value='series'>series</option>
        </select>

        <div className={'flex flex-col items-start gap-2'}>
          <input
            placeholder={'year'}
            {...find('year', {
              maxLength: 4,
            })}
            className='block h-[2.5rem] w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
          />
          {errors.year && (
            <p className='text-sm text-red-700' role='alert'>
              Year can consist only 4 digits
            </p>
          )}
        </div>
        <button
          type='submit'
          className='h-[2.5rem] w-full rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-800 sm:w-auto lg:w-[12rem]'
        >
          Submit
        </button>
      </form>
    </>
  );
}
