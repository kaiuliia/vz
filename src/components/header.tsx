'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from '@/components/darkModeToggle';
import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className={
        'fixed flex h-[4rem] w-full flex-row items-center justify-between gap-8 bg-gray-100 px-10 shadow dark:bg-gray-800'
      }
    >
      <div className={'flex flex-row gap-4'}>
        <AiOutlineSearch className={'text-gray-800 dark:text-white'} />
        <Link
          href='/'
          className={`${pathname === '/' ? 'text-blue-700 dark:text-blue-400' : 'text-black'} cursor-pointer border-gray-100 py-2 pl-3 pr-4 font-bold hover:text-blue-800 lg:border-0 lg:p-0 lg:hover:bg-transparent dark:text-gray-400 dark:hover:text-blue-300 lg:dark:hover:bg-transparent lg:dark:hover:text-white`}
        >
          Search
        </Link>

        <AiOutlineHeart className={'text-gray-800 dark:text-white'} />
        <Link
          href='/favorites'
          className={`${pathname === '/favorites' ? 'text-blue-700 dark:text-blue-400' : 'text-black'} cursor-pointer border-gray-100 py-2 pl-3 pr-4 font-bold hover:text-blue-800 lg:border-0 lg:p-0 lg:hover:bg-transparent dark:text-gray-400 dark:hover:text-blue-300 lg:dark:hover:bg-transparent lg:dark:hover:text-white`}
        >
          Favorites
        </Link>
      </div>
      <DarkModeToggle />
    </header>
  );
}
