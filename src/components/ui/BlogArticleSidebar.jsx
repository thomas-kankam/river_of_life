import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Share2, X, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { cn } from '../../utils/cn';

export default function BlogArticleSidebar({ sections, title }) {
  const [open, setOpen] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (y > lastScrollY + 12 && y > 200) {
      setHiddenByScroll(true);
      setOpen(false);
    } else if (y < lastScrollY - 12) {
      setHiddenByScroll(false);
    }
    setLastScrollY(y);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedTitle = encodeURIComponent(title || '');
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: FaTwitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];

  return (
    <>
      {/* Desktop sticky collapsed panel */}
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <AnimatePresence>
            {!hiddenByScroll && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="overflow-hidden rounded-2xl border border-deep-100 bg-white shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-royal-50"
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-2 font-heading text-sm font-semibold text-deep-900">
                    <List className="h-4 w-4 text-royal-600" />
                    Contents & Share
                  </span>
                  <ChevronDown className={cn('h-4 w-4 text-deep-400 transition-transform', open && 'rotate-180')} />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-deep-100 px-5 pb-5 pt-3">
                        <nav className="space-y-1" aria-label="Table of contents">
                          {sections.map((section) => {
                            const titleText = section.startsWith('#')
                              ? section.replace(/^#+\s*/, '').split('\n')[0]
                              : section.split('\n')[0];
                            const id = titleText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            return (
                              <a
                                key={id}
                                href={`#${id}`}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-2 py-2 text-sm text-deep-500 transition-colors hover:bg-royal-50 hover:text-royal-700"
                              >
                                {titleText}
                              </a>
                            );
                          })}
                        </nav>

                        <div className="mt-4 border-t border-deep-100 pt-4">
                          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-deep-400">
                            <Share2 className="h-3.5 w-3.5" />
                            Share
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {shareLinks.map((s) => {
                              const Icon = s.icon;
                              return (
                                <a
                                  key={s.name}
                                  href={s.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-50 text-deep-600 transition-colors hover:bg-royal-100 hover:text-royal-700"
                                  aria-label={`Share on ${s.name}`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Mobile floating TOC */}
      <div className="fixed bottom-28 left-4 z-30 lg:hidden">
        <AnimatePresence>
          {!hiddenByScroll && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              {!open ? (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-royal-700 px-4 py-3 text-sm font-semibold text-white shadow-card"
                >
                  <List className="h-4 w-4" />
                  Contents
                </button>
              ) : (
                <div className="max-h-[50vh] w-72 overflow-y-auto rounded-2xl border border-deep-100 bg-white p-4 shadow-card scrollbar-hide">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold">Contents & Share</p>
                    <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {sections.map((section) => {
                      const titleText = section.startsWith('#')
                        ? section.replace(/^#+\s*/, '').split('\n')[0]
                        : section.split('\n')[0];
                      const id = titleText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return (
                        <a
                          key={id}
                          href={`#${id}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-2 py-2 text-sm text-deep-600 hover:bg-royal-50"
                        >
                          {titleText}
                        </a>
                      );
                    })}
                  </nav>
                  <div className="mt-3 flex gap-2 border-t border-deep-100 pt-3">
                    {shareLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-50 text-deep-600"
                          aria-label={`Share on ${s.name}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
