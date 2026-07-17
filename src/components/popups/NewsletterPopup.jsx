import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useScroll';
import NewsletterForm from '../ui/NewsletterForm';

export default function NewsletterPopup() {
  const [dismissed, setDismissed] = useLocalStorage('rol_newsletter_dismissed', false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed) return undefined;

    const timer = setTimeout(() => setVisible(true), 45000);
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 60) setVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed]);

  const close = () => {
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9960] flex items-center justify-center bg-deep-900/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-card"
          >
            <button type="button" onClick={close} className="absolute right-4 top-4 rounded-full p-2 hover:bg-deep-50" aria-label="Close newsletter popup">
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-heading text-2xl font-bold text-deep-900">Care Tips for Families</h2>
            <p className="mt-2 text-deep-500">Subscribe for helpful guides, resources, and updates from our care team.</p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
