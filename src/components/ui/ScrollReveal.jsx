import { motion } from 'framer-motion';

const offsets = {
  up: { y: 56, x: 0 },
  down: { y: -56, x: 0 },
  left: { x: 56, y: 0 },
  right: { x: -56, y: 0 },
};

/**
 * Strong scroll reveal — fires when ~20% visible, with scale for presence.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}) {
  const offset = offsets[direction] || offsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
