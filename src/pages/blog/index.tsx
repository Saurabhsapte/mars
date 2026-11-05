import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { getBlogPosts } from '@/lib/blog';
import { Calendar, Tag } from 'lucide-react';
import { blog_list } from 'virtual:content';

export default function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Helmet>
        <title>Blog — Mars Cafe</title>
        <meta name="description" content="Stories, news, and cosmic updates from Mars Cafe — your retro space-diner coffee destination." />
        <link rel="canonical" href="https://r39fidi9w4.c38.airoapp.ai/blog" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="py-16 px-6 text-center" style={{ background: 'hsl(var(--secondary))' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {blog_list.hero.headline}
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            {blog_list.hero.subheadline}
          </p>
        </section>

        {/* Posts */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🛸</div>
                <p className="text-muted-foreground text-lg">{blog_list.emptyState}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article key={post.slug} className="rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow">
                    {post.featuredImage && (
                      <Link to={`/blog/${post.slug}`}>
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                          width={600}
                          height={300}
                        />
                      </Link>
                    )}
                    <div className="p-6">
                      {post.category && (
                        <div className="flex items-center gap-1 text-xs font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>
                          <Tag size={12} />
                          <span>{post.category}</span>
                        </div>
                      )}
                      <h2 className="text-xl font-bold mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--secondary))' }}>
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-xs font-bold transition-colors hover:opacity-80"
                          style={{ color: 'hsl(var(--primary))' }}
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
