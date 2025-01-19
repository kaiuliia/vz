'use client';

import { useTheme } from 'next-themes';
import { AiFillSun, AiFillMoon } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return false;
  }

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' ? (
        <AiFillMoon className='h-6 w-6 text-gray-800' />
      ) : (
        <AiFillSun className='h-6 w-6 text-white' />
      )}
    </button>
  );
}
