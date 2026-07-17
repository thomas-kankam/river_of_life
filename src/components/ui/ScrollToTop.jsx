import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function forceScrollTop() {
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;

  // Bypass global CSS `scroll-behavior: smooth` so navigation jumps instantly
  html.style.scrollBehavior = 'auto';
  body.style.scrollBehavior = 'auto';

  window.scrollTo(0, 0);
  html.scrollTop = 0;
  body.scrollTop = 0;

  html.style.scrollBehavior = prevHtml;
  body.style.scrollBehavior = prevBody;
}

/**
 * Always-mounted scroll reset for SPA navigation.
 * Handles pathname changes, lazy page loads, and optional hash targets.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const apply = () => {
      if (hash) {
        const id = decodeURIComponent(hash.replace('#', ''));
        const el = document.getElementById(id);
        if (el) {
          const html = document.documentElement;
          const prev = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          html.style.scrollBehavior = prev;
          return;
        }
      }
      forceScrollTop();
    };

    apply();

    const raf = requestAnimationFrame(apply);
    const t1 = setTimeout(apply, 0);
    const t2 = setTimeout(apply, 100);
    const t3 = setTimeout(apply, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, search, hash]);

  return null;
}
