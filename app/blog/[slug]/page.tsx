import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../Header';
import { DockDemo } from '../../Footer2';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-12 text-left min-h-screen pb-28">
        <Link
          href="/blog"
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mb-8 inline-block"
        >
          ← back to blog
        </Link>

        <article>
          <h1 className="text-4xl font-bold text-gray-700 dark:text-white italic mb-2">
            {post.title}
          </h1>
          {post.date && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-10">
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}

          <div className="blog-post text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-gray-800 dark:[&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-gray-800 dark:[&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-gray-500 dark:[&_a]:text-gray-400 [&_a]:underline hover:[&_a]:text-gray-700 dark:hover:[&_a]:text-gray-200 [&_pre]:bg-gray-100 dark:[&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:text-sm [&_code]:bg-gray-100 dark:[&_code]:bg-gray-800 [&_code]:px-1 [&_code]:rounded">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
      <DockDemo />
    </>
  );
}
