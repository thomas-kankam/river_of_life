import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const PREVIEW_LENGTH = 160;

export default function TestimonialCard({ testimonial, index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = testimonial.quote.length > PREVIEW_LENGTH;
  const preview = needsTruncate
    ? `${testimonial.quote.slice(0, PREVIEW_LENGTH).trim()}…`
    : testimonial.quote;

  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium flex h-full flex-col"
    >
      <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={expanded ? 'full' : 'preview'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex-1 text-lg leading-relaxed text-deep-700"
        >
          &ldquo;{expanded || !needsTruncate ? testimonial.quote : preview}&rdquo;
        </motion.p>
      </AnimatePresence>

      {needsTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold text-royal-700 transition-colors hover:text-royal-900"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
          <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
        </button>
      )}

      <footer className="mt-6 flex items-center gap-4 border-t border-deep-100 pt-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand font-heading text-sm font-bold text-white">
          {testimonial.avatar}
        </div>
        <div>
          <cite className="not-italic font-semibold text-deep-900">{testimonial.name}</cite>
          <p className="text-sm text-deep-500">{testimonial.role} · {testimonial.location}</p>
        </div>
      </footer>
    </motion.blockquote>
  );
}

export function TestimonialCarousel({ testimonials }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <TestimonialCard key={t.id} testimonial={t} index={i} />
      ))}
    </div>
  );
}
