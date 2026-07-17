import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Play } from 'lucide-react';
import LazyImage from './LazyImage';
import { VIDEO, IMAGES } from '../../constants/images';
import ScrollReveal from './ScrollReveal';
import Button from './Button';

/**
 * Interactive video section — poster until click, then YouTube embed.
 */
export default function VideoSection({
  youtubeId = VIDEO.youtubeId,
  title = VIDEO.title,
  eyebrow = 'See the Difference',
  heading = 'Care That Feels Like Family',
  subtitle = 'Watch how River of Life transforms everyday moments into meaningful, dignified care experiences.',
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden bg-deep-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,114,206,0.25),_transparent_55%)]" />
      <div className="container-custom relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-teal-300">
              {eyebrow}
            </span>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{heading}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{subtitle}</p>
            <Button to="/contact" variant="white" className="mt-8" icon={Calendar}>
              Schedule a Visit
            </Button>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-glow aspect-video bg-deep-900">
              {!playing ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group relative block h-full w-full"
                  aria-label={`Play video: ${title}`}
                >
                  <LazyImage
                    src={IMAGES.videoThumb}
                    alt={IMAGES.videoThumbAlt}
                    priority
                    wrapperClassName="absolute inset-0 h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-deep-900/45 transition-colors group-hover:bg-deep-900/35" />
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-royal-700 shadow-card"
                  >
                    <Play className="ml-1 h-8 w-8" fill="currentColor" />
                  </motion.span>
                </button>
              ) : (
                <iframe
                  title={title}
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
