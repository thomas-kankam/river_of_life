import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Calendar, X, Headphones } from 'lucide-react';
import { COMPANY } from '../../constants/company';
import { cn } from '../../utils/cn';

export default function FloatingCTA({ onBookConsultation }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const actions = [
    {
      id: 'call',
      label: 'Call Now',
      sub: COMPANY.phone,
      icon: Phone,
      href: COMPANY.phoneLink,
      className: 'bg-royal-700 hover:bg-royal-800',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      sub: 'Chat with us',
      icon: MessageCircle,
      href: `https://wa.me/1${COMPANY.phoneRaw}`,
      external: true,
      className: 'bg-emerald-500 hover:bg-emerald-600',
    },
    {
      id: 'consult',
      label: 'Free Consultation',
      sub: 'Book a visit',
      icon: Calendar,
      onClick: () => {
        setOpen(false);
        onBookConsultation();
      },
      className: 'bg-gradient-brand',
    },
  ];

  return (
    <div ref={panelRef} className="fab-safe-left fixed z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="mb-3 w-56 overflow-hidden rounded-2xl border border-deep-100 bg-white shadow-card"
          >
            <p className="border-b border-deep-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-deep-400">
              Get in touch
            </p>
            <div className="p-2">
              {actions.map((action) => {
                const Icon = action.icon;
                const inner = (
                  <>
                    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white', action.className)}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-sm font-semibold text-deep-900">{action.label}</span>
                      <span className="block truncate text-xs text-deep-500">{action.sub}</span>
                    </span>
                  </>
                );

                if (action.href) {
                  return (
                    <a
                      key={action.id}
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-deep-50"
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={action.onClick}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-deep-50"
                  >
                    {inner}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow transition-colors',
          open ? 'bg-deep-800' : 'bg-gradient-brand'
        )}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
