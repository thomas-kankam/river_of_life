import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ContactForm from '../ui/ContactForm';
import { COMPANY } from '../../constants/company';

export default function ConsultationPopup({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9950] flex items-center justify-center bg-deep-900/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-card scrollbar-hide sm:p-8"
          >
            <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-soft hover:bg-deep-50" aria-label="Close consultation form">
              <X className="h-5 w-5" />
            </button>
            <h2 id="consultation-title" className="pr-10 font-heading text-2xl font-bold text-deep-900">Book a Free Consultation</h2>
            <p className="mt-2 text-deep-500">{COMPANY.slogan} — Tell us about your care needs.</p>
            <div className="mt-6">
              <ContactForm compact formType="consultation" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
