'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    // <header>
    //   <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    //     <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    //       <a href="https://flowbite.com" className="flex items-center">
    //         <img
    //           src="https://flowbite.com/docs/images/logo.svg"
    //           className="mr-3 h-6 sm:h-9"
    //           alt="Flowbite Logo"
    //         />
    //         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
    //           Flowbite
    //         </span>
    //       </a>
    //       <div className="flex items-center lg:order-2">
    //         <Link
    //           href="/favorites"
    //           className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${
    //             pathname === "/favorites" ? "text-red-500" : "text-blue-500"
    //           }`}
    //         >
    //           Favorites
    //         </Link>
    //       </div>
    //     </div>
    //   </nav>
    // </header>

    <header>
      <Link
        href='/'
        className={pathname === '/' ? 'text-red-500' : 'text-blue-500'}
      >
        Search
      </Link>
      <Link
        href='/favorites'
        className={
          'lg:hover:text-primary-700 block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white' +
            pathname ===
          '/favorites'
            ? 'text-red-500'
            : 'text-blue-500'
        }
      >
        Favorites
      </Link>
    </header>
  );
}
