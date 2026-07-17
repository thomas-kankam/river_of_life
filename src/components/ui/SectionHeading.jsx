import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}) {
  const alignClass = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right ml-auto items-end',
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-12 flex max-w-3xl flex-col', alignClass, className)}
    >
      {eyebrow && (
        <span className={cn('eyebrow mb-4', light && 'text-teal-300')}>
          <span className={cn('h-px w-6', light ? 'bg-teal-300/60' : 'bg-teal-500/50')} />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          light ? 'text-white' : 'text-deep-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-lg leading-relaxed',
            light ? 'text-white/80' : 'text-deep-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
