import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import { IMAGES } from '../../constants/images';
import Button from './Button';
import { Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';

const BENTO_ITEMS = [
  {
    src: IMAGES.hands,
    alt: IMAGES.handsAlt,
    title: 'Dignity in every visit',
    className: 'md:col-span-2 md:row-span-2',
    aspect: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    src: IMAGES.seniorCare,
    alt: IMAGES.seniorCareAlt,
    title: 'Personal care',
    className: 'md:col-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    src: IMAGES.companionship,
    alt: IMAGES.companionshipAlt,
    title: 'Companionship',
    className: 'md:col-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    src: IMAGES.walking,
    alt: IMAGES.walkingAlt,
    title: 'Mobility & outings',
    className: 'md:col-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    src: IMAGES.celebration,
    alt: IMAGES.celebrationAlt,
    title: 'Family moments',
    className: 'md:col-span-2',
    aspect: 'aspect-[16/9] md:aspect-[21/9]',
  },
];

/**
 * Image-forward bento gallery — helps visitors connect emotionally.
 */
export default function BentoGallery({
  eyebrow = 'Real Moments',
  title = 'Care You Can See and Feel',
  subtitle = 'Every visit is built around dignity, connection, and peace of mind.',
}) {
  return (
    <section className="section-padding relative overflow-hidden bg-deep-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(69,162,158,0.2),_transparent_45%)]" />
      <div className="container-custom relative">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-teal-300">
            {eyebrow}
          </span>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/70">{subtitle}</p>
        </ScrollReveal>

        <StaggerContainer className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:auto-rows-[minmax(200px,240px)]">
          {BENTO_ITEMS.map((item) => (
            <StaggerItem
              key={item.title}
              className={cn(
                item.className,
                item.className.includes('row-span-2') && 'md:min-h-[420px]'
              )}
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.35 }}
                className="group relative h-full min-h-[200px] overflow-hidden rounded-2xl md:rounded-3xl"
              >
                <LazyImage
                  src={item.src}
                  alt={item.alt}
                  wrapperClassName="absolute inset-0 h-full w-full"
                  className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.aspect}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-950/80 via-deep-950/20 to-transparent" />
                <p className="absolute bottom-4 left-4 font-heading text-lg font-semibold text-white drop-shadow md:bottom-5 md:left-5 md:text-xl">
                  {item.title}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-10 text-center">
          <Button to="/contact" variant="white" icon={Calendar}>
            Book Your Free Consultation
          </Button>
          <p className="mt-3 text-sm text-white/50">
            Or explore our{' '}
            <Link to="/services" className="font-semibold text-teal-300 hover:text-teal-200">
              full care services
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
