import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ value, suffix = '', label }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-bold text-royal-700 sm:text-5xl">
        {inView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-deep-500">{label}</p>
    </div>
  );
}
