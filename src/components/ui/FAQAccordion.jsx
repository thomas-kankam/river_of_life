import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FAQAccordion({ faqs, limit }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="space-y-3">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="overflow-hidden rounded-2xl border border-deep-100 bg-white shadow-soft">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
            >
              <span className="font-heading text-lg font-semibold text-deep-900">{faq.question}</span>
              <ChevronDown
                className={cn('h-5 w-5 shrink-0 text-royal-600 transition-transform duration-300', isOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-deep-100 px-6 pb-5 pt-2 text-deep-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
