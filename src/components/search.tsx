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
    <form
      className='flex flex-col gap-4 lg:flex-row'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'flex flex-col items-start gap-2'}>
        <input
          placeholder={'movie title'}
          {...find('title', { required: true })}
          className='block h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        />
        {errors.title?.type === 'required' && (
          <p className='text-sm text-red-900' role='alert'>
            Please, enter a movie title
          </p>
        )}
      </div>
      <select
        {...find('type')}
        className='block h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      >
        <option value='movie'>movie</option>
        <option value='episode'>episode</option>
        <option value='series'>series</option>
      </select>

      <input
        placeholder={'year'}
        {...find('year')}
        className='block h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      />

      <button
        type='submit'
        className='h-[2.5rem] w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto lg:w-[12rem] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Submit
      </button>
    </form>
  );
}
