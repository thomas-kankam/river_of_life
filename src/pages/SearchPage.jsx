import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SEO from '../seo/SEO';
import { SERVICES } from '../data/services';
import { BLOG_POSTS } from '../data/blogs';
import { FAQS } from '../data/faqs';
import { IMAGES } from '../constants/images';
import PageHero from '../components/ui/PageHero';

const PAGES = [
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Services', path: '/services' },
  { title: 'Blog', path: '/blog' },
  { title: 'FAQs', path: '/faq' },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return [
      ...SERVICES.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
        .map((s) => ({ title: s.title, path: `/services/${s.slug}`, type: 'Service', excerpt: s.description })),
      ...BLOG_POSTS.filter((b) => b.title.toLowerCase().includes(q))
        .map((b) => ({ title: b.title, path: `/blog/${b.slug}`, type: 'Blog', excerpt: b.excerpt })),
      ...FAQS.filter((f) => f.question.toLowerCase().includes(q))
        .map((f) => ({ title: f.question, path: '/faq', type: 'FAQ', excerpt: f.answer })),
      ...PAGES.filter((p) => p.title.toLowerCase().includes(q))
        .map((p) => ({ title: p.title, path: p.path, type: 'Page' })),
    ];
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <>
      <SEO title="Search" description="Search River of Life for services, blog articles, FAQs, and pages." path="/search" noindex />

      <PageHero
        eyebrow="Search"
        title="Find What You Need"
        subtitle="Search services, articles, FAQs, and pages — then connect with our care team."
        image={IMAGES.searchHero}
        imageAlt={IMAGES.searchHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Search', path: '/search' }]}
        height="sm"
      />

      <section className="section-padding pt-8">
        <div className="container-custom mx-auto max-w-3xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-deep-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, blog, FAQs..."
              className="w-full rounded-2xl border border-deep-200 py-4 pl-12 pr-4 text-lg focus:border-royal-500 focus:ring-2 focus:ring-royal-200"
              aria-label="Search"
            />
          </form>

          {query.trim() && (
            <div className="mt-8">
              <p className="mb-4 text-deep-500">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
              <ul className="space-y-3">
                {results.map((r) => (
                  <li key={`${r.type}-${r.path}-${r.title}`}>
                    <Link to={r.path} className="block rounded-xl border border-deep-100 p-4 transition-colors hover:border-royal-200 hover:bg-royal-50">
                      <span className="text-xs font-semibold text-royal-600">{r.type}</span>
                      <h3 className="font-semibold text-deep-900">{r.title}</h3>
                      {r.excerpt && <p className="mt-1 text-sm text-deep-500">{r.excerpt.slice(0, 120)}...</p>}
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length === 0 && <p className="py-8 text-center text-deep-500">No results found.</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
