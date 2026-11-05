import { Helmet } from '@dr.pogodin/react-helmet';
import { Link, useParams } from 'react-router';
import { getPostBySlug } from '@/lib/blog';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { blog_post } from 'virtual:content';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">🛸</div>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--secondary))' }}>
            {blog_post.notFound.headline}
          </h1>
          <p className="text-muted-foreground mb-6">{blog_post.notFound.message}</p>
          <Link to="/blog" className="inline-flex items-center gap-2 font-bold transition-colors hover:opacity-80" style={{ color: 'hsl(var(--primary))' }}>
            <ArrowLeft size={16} /> {blog_post.notFound.backLabel}
          </Link>
        </div>
      </main>
    );
  }

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;

  return (
    <>
      <Helmet>
        <title>{title} — Mars Cafe</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://r39fidi9w4.c38.airoapp.ai/blog/${post.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {post.featuredImage && <meta property="og:image" content={post.featuredImage} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* Hero */}
        {post.featuredImage && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1200}
              height={630}
            />
          </div>
        )}

        <article className="max-w-3xl mx-auto px-6 py-12">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-80" style={{ color: 'hsl(var(--primary))' }}>
            <ArrowLeft size={14} /> {blog_post.backLabel}
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.category && (
              <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'hsl(var(--accent)/0.2)', color: 'hsl(var(--primary))' }}>
                <Tag size={11} />
                <span>{post.category}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            {post.author && (
              <span className="text-xs text-muted-foreground">by {post.author}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--secondary))' }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground mb-8 border-l-4 pl-4 italic" style={{ borderColor: 'hsl(var(--primary))' }}>
            {post.excerpt}
          </p>

          {/* Body */}
          <div
            className="prose prose-lg max-w-none"
            style={{
              '--tw-prose-headings': 'hsl(var(--secondary))',
              '--tw-prose-links': 'hsl(var(--primary))',
              '--tw-prose-bold': 'hsl(var(--foreground))',
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: post.content ?? post.body ?? '' }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'hsl(var(--secondary))' }}
            >
              <ArrowLeft size={16} /> {blog_post.moreLabel}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
