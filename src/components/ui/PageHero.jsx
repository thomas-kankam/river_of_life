import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';
import LazyImage from './LazyImage';
import Button from './Button';
import { cn } from '../../utils/cn';

/**
 * Full-bleed image hero for inner pages — brand-forward, conversion-ready.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = '',
  breadcrumbs = [],
  cta,
  secondaryCta,
  align = 'left',
  height = 'md',
  className,
}) {
  const heights = {
    sm: 'min-h-[300px] md:min-h-[400px]',
    md: 'min-h-[360px] md:min-h-[500px]',
    lg: 'min-h-[420px] md:min-h-[580px]',
  };

  return (
    <section className={cn('relative flex items-end overflow-hidden pt-28', heights[height], className)}>
      <div className="absolute inset-0">
        <LazyImage
          src={image}
          alt={imageAlt}
          priority
          wrapperClassName="absolute inset-0 h-full w-full"
          className="h-full w-full scale-105 object-cover"
        />
        {/* Brand navy/blue overlay — keeps white text readable across all pages */}
        <div className="hero-overlay-strong" aria-hidden="true" />
      </div>

      {/* Decorative ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-dots opacity-[0.12] mask-fade-radial" />
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-16 top-16 h-64 w-64 rounded-full bg-teal-400/25 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-10 bottom-10 h-72 w-72 rounded-full bg-royal-400/30 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10 pb-14 md:pb-20">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} light />}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn('flex max-w-3xl flex-col', align === 'center' && 'mx-auto items-center text-center')}
        >
          {eyebrow && (
            <span className="eyebrow mb-4 text-teal-300">
              <span className="h-px w-6 bg-teal-300/60" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading text-[1.85rem] font-bold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-[3.5rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
              {subtitle}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className={cn('mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap', align === 'center' && 'sm:justify-center')}>
              {cta && (
                <Button to={cta.to} variant="white" icon={cta.icon} className="w-full sm:w-auto">
                  {cta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button to={secondaryCta.to} variant="outline" icon={secondaryCta.icon} iconPosition="right" className="w-full sm:w-auto">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
