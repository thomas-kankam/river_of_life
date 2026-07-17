import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { INSURANCE_LOGOS } from '../../constants/images';

/**
 * GSAP infinite horizontal marquee for trusted insurance partners.
 */
export default function InsuranceMarquee({
  title = 'Trusted Insurance Partners',
  speed = 45,
}) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const setup = () => {
      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });
      const distance = track.scrollWidth / 2;
      if (!distance) return;
      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration: distance / speed,
        ease: 'none',
        repeat: -1,
      });
    };

    setup();

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', resume);
    window.addEventListener('resize', setup);

    return () => {
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('focusin', pause);
      track.removeEventListener('focusout', resume);
      window.removeEventListener('resize', setup);
      tweenRef.current?.kill();
    };
  }, [speed]);

  const logos = [...INSURANCE_LOGOS, ...INSURANCE_LOGOS];

  return (
    <section className="overflow-hidden border-y border-deep-100 bg-white py-12" aria-label={title}>
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-deep-400">
        {title}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max items-center gap-6 will-change-transform"
            role="list"
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                role="listitem"
                className="flex h-14 shrink-0 items-center justify-center rounded-2xl border border-deep-100 bg-gradient-to-br from-deep-50 to-white px-8 shadow-soft transition-shadow hover:shadow-card"
              >
                <span className="whitespace-nowrap font-heading text-base font-semibold tracking-wide text-deep-700 sm:text-lg">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
