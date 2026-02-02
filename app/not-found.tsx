import Link from 'next/link';
import Header from './Header';
import { DockDemo } from './Footer2';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-12 text-left min-h-[60vh] flex flex-col justify-center">
        <h1 className="text-6xl font-bold text-gray-700 dark:text-white italic mb-4">
          not found
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          this page doesn't exist.
        </p>
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors"
        >
          ← back home
        </Link>
      </div>
      <DockDemo />
    </>
  );
}
