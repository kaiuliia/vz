import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Movie Search',
  description: 'Simple movie search tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <div className={'h-fix px-4 pb-4 pt-[4rem]'}>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
