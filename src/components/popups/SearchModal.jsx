import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { BLOG_POSTS } from '../../data/blogs';
import { FAQS } from '../../data/faqs';
import { useLocalStorage } from '../../hooks/useScroll';

const STATIC_PAGES = [
  { title: 'About Us', path: '/about', type: 'Page' },
  { title: 'Contact', path: '/contact', type: 'Page' },
  { title: 'Services', path: '/services', type: 'Page' },
  { title: 'Blog', path: '/blog', type: 'Page' },
  { title: 'FAQs', path: '/faq', type: 'Page' },
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage('rol_recent_searches', []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const serviceResults = SERVICES.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    ).map((s) => ({ title: s.title, path: `/services/${s.slug}`, type: 'Service', excerpt: s.description.slice(0, 100) }));

    const blogResults = BLOG_POSTS.filter(
      (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
    ).map((b) => ({ title: b.title, path: `/blog/${b.slug}`, type: 'Blog', excerpt: b.excerpt }));

    const faqResults = FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    ).map((f) => ({ title: f.question, path: '/faq', type: 'FAQ', excerpt: f.answer.slice(0, 100) }));

    const pageResults = STATIC_PAGES.filter((p) => p.title.toLowerCase().includes(q));

    return [...serviceResults, ...blogResults, ...faqResults, ...pageResults].slice(0, 12);
  }, [query]);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim() && !recentSearches.includes(value.trim())) {
      setRecentSearches([value.trim(), ...recentSearches].slice(0, 5));
    }
  };

  const handleSelect = () => {
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9940] bg-deep-900/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="container-custom pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-card">
              <div className="flex items-center gap-3 border-b border-deep-100 px-4 py-4">
                <Search className="h-5 w-5 text-deep-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search services, blog, FAQs..."
                  className="flex-1 text-lg outline-none"
                  autoFocus
                  aria-label="Search site"
                />
                <button type="button" onClick={onClose} aria-label="Close search">
                  <X className="h-5 w-5 text-deep-500" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-4">
                {query.trim() === '' && recentSearches.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-deep-500">
                      <Clock className="h-4 w-4" /> Recent Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="rounded-full bg-deep-50 px-3 py-1 text-sm text-deep-700 hover:bg-royal-50"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 && (
                  <ul className="space-y-2">
                    {results.map((result) => (
                      <li key={`${result.type}-${result.path}-${result.title}`}>
                        <Link
                          to={result.path}
                          onClick={handleSelect}
                          className="group flex items-start justify-between rounded-xl p-3 transition-colors hover:bg-royal-50"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-royal-100 px-2 py-0.5 text-xs font-medium text-royal-700">{result.type}</span>
                              <span className="font-semibold text-deep-900 group-hover:text-royal-700">{result.title}</span>
                            </div>
                            {result.excerpt && <p className="mt-1 text-sm text-deep-500">{result.excerpt}...</p>}
                          </div>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-royal-600 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {query.trim() && results.length === 0 && (
                  <p className="py-8 text-center text-deep-500">No results found for &ldquo;{query}&rdquo;</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
