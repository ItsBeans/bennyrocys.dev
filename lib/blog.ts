import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const posts = files
    .map((filename) => {
      const slug = getSlugFromFilename(filename);
      const filePath = path.join(POSTS_DIR, filename);
      const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? '',
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? '',
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => getSlugFromFilename(f));
}
