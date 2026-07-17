import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          role="status"
          aria-label="Loading"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6"
          >
            <Logo variant="loading" link={false} />
          </motion.div>
          <p className="mt-2 text-deep-500">Loading premium care experience...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
