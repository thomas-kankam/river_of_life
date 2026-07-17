import { motion } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';
import Button from './Button';
import { COMPANY } from '../../constants/company';

/**
 * Conversion CTA — visually distinct from the dark footer.
 */
export default function CTASection({
  title = 'Ready for Premium Home Care?',
  subtitle = COMPANY.closingStatement,
}) {
  return (
    <section className="relative bg-gradient-to-b from-sand-50 via-white to-sand-100 py-16 md:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand bg-[length:200%_auto] p-8 text-center shadow-glow-royal md:p-16 lg:p-20"
        >
          {/* Ambient light + dot texture */}
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-teal-300/30 blur-3xl" aria-hidden="true" />

          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            Get Started Today
          </span>
          <h2 className="relative mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button to="/contact" variant="white" icon={Calendar}>
              Book Free Consultation
            </Button>
            <Button href={COMPANY.phoneLink} variant="outline" icon={Phone}>
              Call {COMPANY.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
