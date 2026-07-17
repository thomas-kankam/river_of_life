import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScroll';

export default function ScrollToTopButton() {
  const scrolled = useScrollPosition(400);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const sync = () => setChatOpen(document.body.dataset.chatOpen === 'true');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-chat-open'] });
    return () => observer.disconnect();
  }, []);

  if (!scrolled || chatOpen) return null;

  return createPortal(
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fab-scroll fixed z-[65] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white shadow-card transition-transform hover:-translate-y-1"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>,
    document.body
  );
}
