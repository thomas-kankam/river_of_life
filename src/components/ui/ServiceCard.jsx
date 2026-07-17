import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import LazyImage from './LazyImage';

export default function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-deep-100/80 bg-white shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-deep-200 hover:shadow-lift"
    >
      <Link
        to={`/services/${service.slug}`}
        className="flex h-full flex-col"
        aria-label={`Learn more about ${service.title}`}
      >
        <div className="relative h-52 overflow-hidden">
          <LazyImage
            src={service.image}
            alt={service.imageAlt || service.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-deep-900/10 to-transparent" />
          <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-royal-700 shadow-card backdrop-blur-sm transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-white">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-royal-700 opacity-0 shadow-card backdrop-blur-sm transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl font-semibold text-deep-900 transition-colors group-hover:text-royal-700">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 leading-relaxed text-deep-500">{service.description}</p>
          <span className="link-underline mt-5 self-start text-sm">
            Learn More
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
