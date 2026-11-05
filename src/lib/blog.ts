// Blog posts live at src/content/data/blog/*.md
// The airo-content plugin reads them as a directory-backed collection and
// exposes them as `blog` (bare alias for `data.blog`) from virtual:content.
// Each item has: slug (from filename), content (markdown body), plus all
// frontmatter fields (title, excerpt, author, publishedAt, category, tags,
// featuredImage, seoTitle, seoDescription, published).

import { blog as blogCollection } from 'virtual:content';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author?: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
  content: string;
  /** @deprecated use content */
  body?: string;
  id?: string;
}

function getRawPosts(): BlogPost[] {
  if (!Array.isArray(blogCollection)) return [];
  return blogCollection as BlogPost[];
}

export function getBlogPosts(): BlogPost[] {
  const now = new Date();
  return getRawPosts()
    .filter((p) => p.published && new Date(p.publishedAt) <= now)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getRawPosts().find((p) => p.slug === slug);
}
