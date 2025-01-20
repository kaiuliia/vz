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
      <div className={'flex flex-row gap-6'}>
        <div className={'flex flex-row items-center gap-1'}>
          <AiOutlineSearch className={'text-gray-800 dark:text-white'} />
          <Link
            href='/'
            className={`${pathname === '/' && 'underline'} cursor-pointer border-gray-100 py-2 font-bold text-black hover:underline dark:text-white`}
          >
            Search
          </Link>
        </div>
        <div className={'flex flex-row items-center gap-1'}>
          <AiOutlineHeart className={'text-gray-800 dark:text-white'} />
          <Link
            href='/favorites'
            className={`${pathname === '/favorites' && 'underline'} cursor-pointer border-gray-100 py-2 font-bold text-black hover:underline dark:text-white`}
          >
            Favorites
          </Link>
        </div>
      </div>
      <DarkModeToggle />
    </header>
  );
}
