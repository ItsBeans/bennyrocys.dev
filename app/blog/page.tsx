import Link from 'next/link';
import Header from '../Header';
import { DockDemo } from '../Footer2';
import { getPosts } from '@/lib/blog';

export default function BlogListPage() {
  const posts = getPosts();

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-12 text-left min-h-screen pb-28">
        <h1 className="text-6xl font-bold text-gray-700 dark:text-white italic mb-4">
          blog
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
          occasional writing.
        </p>

        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">
            nothing here yet.
          </p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group border-l border-gray-200 dark:border-gray-800 pl-6 py-2 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                >
                  <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                  {post.date && (
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <DockDemo />
    </>
  );
}
