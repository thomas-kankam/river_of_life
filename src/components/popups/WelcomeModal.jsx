import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import LazyImage from '../ui/LazyImage';
import { COMPANY } from '../../constants/company';
import { IMAGES } from '../../constants/images';

export default function WelcomeModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] flex items-center justify-center bg-deep-900/60 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 16 }}
          className="relative max-w-lg overflow-hidden rounded-3xl bg-white shadow-card"
        >
          <div className="relative h-40 overflow-hidden sm:h-48">
            <LazyImage
              src={IMAGES.family}
              alt={IMAGES.familyAlt}
              wrapperClassName="absolute inset-0 h-full w-full"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-deep-900/20 to-deep-900/40" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-deep-700 shadow-soft hover:bg-white"
              aria-label="Close welcome message"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative -mt-10 px-8 pb-8 text-center">
            <div className="mx-auto mb-4 inline-flex rounded-2xl bg-white p-3 shadow-card ring-1 ring-deep-100">
              <Logo variant="icon" link={false} />
            </div>
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600">
              <Heart className="h-4 w-4 fill-current" />
              {COMPANY.tagline}
            </p>
            <h2 id="welcome-title" className="mt-2 font-heading text-2xl font-bold text-deep-900">
              Welcome to {COMPANY.shortName}
            </h2>
            <p className="mt-3 leading-relaxed text-deep-500">
              {COMPANY.taglineSecondary} We&apos;re honored to support your family with premium, compassionate home healthcare.
            </p>
            <p className="mt-2 font-semibold text-royal-700">{COMPANY.slogan}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button to="/contact" variant="primary" onClick={onClose}>Book Free Consultation</Button>
              <Button variant="secondary" onClick={onClose}>Explore Site</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
