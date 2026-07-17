import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../seo/SEO';
import { getBreadcrumbSchema } from '../../seo/schemas';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../data/blogs';
import { IMAGES } from '../../constants/images';
import PageHero from '../../components/ui/PageHero';
import LazyImage from '../../components/ui/LazyImage';
import NewsletterForm from '../../components/ui/NewsletterForm';
import { cn } from '../../utils/cn';

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filtered = BLOG_POSTS.filter((post) => {
    const matchCat = category === 'All' || post.category === category;
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <SEO
        title="Blog & Care Resources"
        description="Expert home care tips, guides, and resources for families from the River of Life care team."
        path="/blog"
        jsonLd={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <PageHero
        eyebrow="Blog"
        title="Care Tips & Expert Insights"
        subtitle="Resources to help your family navigate the home care journey with confidence."
        image={IMAGES.blogHero}
        imageAlt={IMAGES.blogHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]}
      />

      <section className="section-padding pt-8">
        <div className="container-custom">
          <Link to={`/blog/${featured.slug}`} className="group mb-12 block">
            <article className="grid overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-2">
              <LazyImage src={featured.image} alt={featured.title} className="aspect-video md:aspect-auto md:min-h-[320px]" />
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-sm font-semibold text-royal-600">Featured Article</span>
                <h2 className="mt-2 font-heading text-2xl font-bold text-deep-900 group-hover:text-royal-700 md:text-3xl">{featured.title}</h2>
                <p className="mt-4 text-deep-500">{featured.excerpt}</p>
                <p className="mt-4 text-sm text-deep-400">{featured.author} · {featured.readTime} min read</p>
              </div>
            </article>
          </Link>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    category === cat ? 'bg-royal-600 text-white' : 'bg-deep-100 text-deep-600 hover:bg-royal-50'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full border border-deep-200 px-5 py-2.5 focus:border-royal-500 focus:ring-2 focus:ring-royal-200"
              aria-label="Search blog articles"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                <article className="card-premium h-full overflow-hidden p-0">
                  <LazyImage src={post.image} alt={post.title} className="aspect-video" />
                  <div className="p-6">
                    <span className="text-sm font-semibold text-royal-600">{post.category}</span>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-deep-900 group-hover:text-royal-700">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-deep-500">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-deep-400">{post.date} · {post.readTime} min read</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-deep-900 p-8 text-center md:p-12">
            <h2 className="font-heading text-2xl font-bold text-white">Get Care Tips in Your Inbox</h2>
            <p className="mt-2 text-white/70">Subscribe for the latest articles and family resources.</p>
            <div className="mx-auto mt-6 max-w-md">
              <NewsletterForm light />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
