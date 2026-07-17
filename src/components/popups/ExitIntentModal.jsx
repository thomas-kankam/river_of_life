import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useExitIntent, useLocalStorage } from '../../hooks/useScroll';
import Button from '../ui/Button';
import { COMPANY } from '../../constants/company';

export default function ExitIntentModal({ onBook }) {
  const [shown, setShown] = useLocalStorage('rol_exit_intent_shown', false);
  const [visible, setVisible] = useState(false);

  const handleExit = useCallback(() => {
    if (!shown) {
      setVisible(true);
      setShown(true);
    }
  }, [shown, setShown]);

  useExitIntent(handleExit, !shown);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9970] flex items-center justify-center bg-deep-900/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-md rounded-3xl bg-white p-8 shadow-card"
          >
            <button type="button" onClick={() => setVisible(false)} className="absolute right-4 top-4 rounded-full p-2 hover:bg-deep-50" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-heading text-2xl font-bold text-deep-900">Before You Go...</h2>
            <p className="mt-3 text-deep-500">
              Schedule a free consultation and discover how {COMPANY.shortName} can support your family with premium home care.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="primary" onClick={() => { setVisible(false); onBook(); }}>Book Free Consultation</Button>
              <Button variant="ghost" onClick={() => setVisible(false)}>Maybe Later</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
