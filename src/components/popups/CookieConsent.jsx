import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useScroll';

export default function CookieConsent() {
  const [accepted, setAccepted] = useLocalStorage('rol_cookies_accepted', false);
  const [visible, setVisible] = useState(!accepted);

  const accept = () => {
    setAccepted(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9980] border-t border-deep-100 bg-white p-4 shadow-card md:p-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="container-custom flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-deep-600 md:text-base">
              We use cookies to improve your experience, analyze site traffic, and support our care services.
              By continuing, you agree to our use of cookies.
            </p>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={accept} className="btn-primary px-5 py-2 text-sm">
                Accept
              </button>
              <button type="button" onClick={() => setVisible(false)} className="btn-secondary px-5 py-2 text-sm">
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
