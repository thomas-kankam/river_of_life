import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Shield, Heart, Users, Award, CheckCircle, Star, Phone } from 'lucide-react';
import SEO from '../seo/SEO';
import { getOrganizationSchema, getFAQSchema } from '../seo/schemas';
import { COMPANY, STATS } from '../constants/company';
import { IMAGES } from '../constants/images';
import { SERVICES } from '../data/services';
import { TESTIMONIALS } from '../data/testimonials';
import { BLOG_POSTS } from '../data/blogs';
import { FAQS } from '../data/faqs';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import LazyImage from '../components/ui/LazyImage';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ServiceCard from '../components/ui/ServiceCard';
import TestimonialSwiper from '../components/ui/TestimonialSwiper';
import FAQAccordion from '../components/ui/FAQAccordion';
import NewsletterForm from '../components/ui/NewsletterForm';
import CTASection from '../components/ui/CTASection';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal';
import InsuranceMarquee from '../components/ui/InsuranceMarquee';
import BentoGallery from '../components/ui/BentoGallery';
import VideoSection from '../components/ui/VideoSection';
import { useGsapParallax } from '../hooks/useGsap';
import { cn } from '../utils/cn';

const WHY_CHOOSE = [
  { icon: Shield, title: 'Licensed & Trusted', description: 'Rigorous screening, training, and supervision for every caregiver on our team.' },
  { icon: Heart, title: 'Compassionate Care', description: 'Person-centered support that honors dignity, preferences, and family values.' },
  { icon: Users, title: 'Family Partnership', description: 'Transparent communication and collaborative care planning every step of the way.' },
  { icon: Award, title: 'Premium Standards', description: 'Healthcare-grade quality with the warmth and comfort of home.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Free Consultation', description: 'Share your care needs with our coordination team — no obligation, no pressure.' },
  { step: '02', title: 'Personalized Care Plan', description: 'We design a tailored plan matched to health goals, schedule, and preferences.' },
  { step: '03', title: 'Care Begins at Home', description: 'Your matched caregiver delivers premium support with ongoing supervision.' },
];

export default function HomePage() {
  const heroImageRef = useRef(null);
  useGsapParallax(heroImageRef, { speed: 0.5 });

  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 6);
  const featuredBlog = BLOG_POSTS.find((b) => b.featured) || BLOG_POSTS[0];

  return (
    <>
      <SEO
        title="Premium Home Healthcare"
        description={`${COMPANY.tagline} ${COMPANY.slogan} Serving ${COMPANY.address} with personal care, companion care, and specialized home health services.`}
        path="/"
        jsonLd={[getOrganizationSchema(), getFAQSchema(FAQS.slice(0, 5))]}
        keywords="home healthcare, senior care, personal care, companion care, Philadelphia home care"
      />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-x-clip">
        <div className="absolute inset-0" ref={heroImageRef}>
          <LazyImage
            src={IMAGES.hero}
            alt={IMAGES.heroAlt}
            priority
            wrapperClassName="absolute inset-0 h-full w-full"
            className="h-full w-full scale-105 object-cover"
          />
          {/* Dark brand navy/blue overlay — heavier left for copy, softer right for panel */}
          <div className="hero-overlay-home" aria-hidden="true" />
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-dots opacity-[0.1] mask-fade-radial" />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-royal-400/30 blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10 pt-24 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-36">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Left — copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
              className="lg:col-span-6 xl:col-span-7"
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:px-4 sm:text-sm"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                </span>
                <span className="truncate">{COMPANY.tagline}</span>
              </motion.span>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="font-heading text-[2rem] font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
              >
                <span className="mb-2 block text-base font-semibold uppercase tracking-[0.18em] text-teal-300 sm:text-xl">
                  River of Life
                </span>
                <span className="block">{COMPANY.slogan}</span>
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-xl"
              >
                Premium home healthcare that blends clinical excellence with heartfelt compassion — because your family deserves the best care.
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <Button to="/contact" variant="white" icon={Calendar} className="w-full sm:w-auto">Book Consultation</Button>
                <Button to="/services" variant="outline" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">Explore Services</Button>
              </motion.div>
              <motion.ul
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/90 sm:mt-10 sm:gap-x-6 sm:gap-y-3"
              >
                {['Licensed & Insured', 'Available 24/7', '98% Satisfaction'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right — visual panel (fills blank space) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-6 lg:mx-0 lg:max-w-none xl:col-span-5"
            >
              <div className="relative px-1 sm:px-4 lg:px-0">
                {/* Soft glow behind the panel so it never looks empty */}
                <div
                  className="pointer-events-none absolute -inset-4 hidden rounded-[2.5rem] bg-gradient-to-br from-royal-400/35 via-teal-400/25 to-transparent blur-2xl sm:block"
                  aria-hidden="true"
                />

                {/* Main photo card — slightly shorter so it fits the first viewport */}
                <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-deep-900 shadow-[0_24px_64px_rgba(7,21,37,0.55)] ring-1 ring-white/20 sm:rounded-[2rem]">
                  <LazyImage
                    src={IMAGES.caregiver}
                    alt={IMAGES.caregiverAlt}
                    priority
                    wrapperClassName="aspect-[5/6] w-full max-h-[380px] sm:max-h-[520px]"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-950/80 via-deep-900/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">Featured Caregiver</p>
                    <p className="mt-1 font-heading text-base font-semibold text-white sm:text-lg">Compassionate. Certified. Trusted.</p>
                  </div>
                </div>

                {/* Floating badges — desktop/tablet only to avoid mobile overflow */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-2 top-8 z-10 hidden rounded-2xl border border-white/40 bg-white p-3.5 shadow-lift sm:block sm:-left-4 sm:top-10 sm:p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <Star className="h-5 w-5 fill-current" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-heading text-2xl font-bold leading-none text-deep-900">98%</p>
                      <p className="mt-0.5 text-xs font-medium text-deep-500">Family Satisfaction</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -right-2 z-10 hidden max-w-[270px] rounded-2xl border border-white/30 bg-deep-950/90 p-5 shadow-lift backdrop-blur-xl sm:block"
                >
                  <div className="mb-2 flex gap-0.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">
                    &ldquo;{TESTIMONIALS[0].quote.slice(0, 90)}…&rdquo;
                  </p>
                  <p className="mt-3 text-xs font-semibold text-teal-300">
                    — {TESTIMONIALS[0].name}, {TESTIMONIALS[0].role}
                  </p>
                </motion.div>

                <a
                  href={COMPANY.phoneLink}
                  className="absolute -top-3 right-2 z-10 hidden items-center gap-2 rounded-full border border-white/40 bg-white px-3.5 py-2 text-xs font-semibold text-royal-800 shadow-card transition-transform hover:-translate-y-0.5 sm:inline-flex sm:right-4"
                >
                  <Phone className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-white/80"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-10 pb-8 sm:-mt-16">
        <div className="container-custom">
          <div className="relative grid grid-cols-2 gap-3 overflow-hidden rounded-[1.5rem] border border-deep-100/80 bg-white/95 p-5 shadow-lift backdrop-blur-xl sm:gap-4 sm:rounded-[2rem] sm:p-8 md:grid-cols-4 md:gap-8">
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.04]" aria-hidden="true" />
            {STATS.map((stat, i) => (
              <div
                key={stat.id}
                className={cn(
                  'relative',
                  i > 0 && 'md:border-l md:border-deep-100',
                  (i === 2 || i === 3) && 'border-t border-deep-100 pt-3 sm:pt-4 md:border-t-0 md:pt-0'
                )}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <InsuranceMarquee />

      {/* About Preview */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div className="relative">
                <LazyImage src={IMAGES.about} alt={IMAGES.aboutAlt} wrapperClassName="rounded-3xl shadow-card" className="aspect-[4/3]" />
                <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-gradient-brand p-6 text-white shadow-glow md:block">
                  <p className="font-heading text-3xl font-bold">12+</p>
                  <p className="text-sm text-white/80">Years of Trusted Care</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <SectionHeading
                eyebrow="About River of Life"
                title="Premium Care Rooted in Compassion"
                subtitle={COMPANY.closingStatement}
                align="left"
                className="mb-0"
              />
              <p className="mt-6 text-lg leading-relaxed text-deep-500">
                {COMPANY.name} was founded on a simple belief: every person deserves dignified, professional care in the place they feel most safe — home. We combine healthcare expertise with genuine compassion.
              </p>
              <ul className="mt-6 space-y-3">
                {['Licensed & supervised caregivers', 'Personalized care plans', '24/7 care coordination'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-deep-700">
                    <CheckCircle className="h-5 w-5 text-royal-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button to="/about" variant="primary" className="mt-8" icon={ArrowRight} iconPosition="right">
                Learn About Us
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Families Choose Us"
            title="Healthcare Excellence Meets Heartfelt Support"
            subtitle="We don't just provide care — we build trust, safety, and peace of mind for the whole family."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="card-premium group h-full text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-royal-700 transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-deep-900">{item.title}</h3>
                    <p className="mt-3 text-deep-500">{item.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section-padding relative overflow-hidden bg-sand-100">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4] mask-fade-b" aria-hidden="true" />
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Home Care Services"
            subtitle="From daily living support to specialized memory care — delivered with premium quality and compassion."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/services" variant="primary" icon={ArrowRight} iconPosition="right">View All Services</Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="How It Works" title="Getting Started Is Simple" subtitle="Three easy steps to premium home care for your loved one." />
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <StaggerItem key={item.step}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-deep-100/80 bg-white p-8 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 ease-smooth group-hover:scale-x-100" />
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-brand bg-clip-text font-heading text-6xl font-bold text-transparent">{item.step}</span>
                    {i < HOW_IT_WORKS.length - 1 && (
                      <ArrowRight className="hidden h-6 w-6 text-deep-200 md:block" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-semibold text-deep-900">{item.title}</h3>
                  <p className="mt-3 text-deep-500">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BentoGallery />

      <VideoSection />

      {/* Testimonials */}
      <section id="testimonials" className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="Testimonials" title="Trusted by Families Across the Region" subtitle="Real stories from clients and families who've experienced the River of Life difference." />
          <TestimonialSwiper testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Caregiver Spotlight */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <LazyImage src={IMAGES.caregiver} alt={IMAGES.caregiverAlt} wrapperClassName="rounded-3xl shadow-card" className="aspect-[4/5]" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <SectionHeading eyebrow="Caregiver Spotlight" title="Meet the Hearts Behind Our Care" subtitle="Every River of Life caregiver is screened, trained, and selected for compassion as much as competence." align="left" className="mb-0" />
              <blockquote className="mt-6 border-l-4 border-royal-600 pl-6 text-lg italic text-deep-600">
                &ldquo;Every client deserves to feel seen, respected, and cared for like family.&rdquo;
              </blockquote>
              <p className="mt-4 font-semibold text-deep-900">— Sarah Johnson, Lead Caregiver</p>
              <Button to="/about#caregivers" variant="primary" className="mt-8">Meet Our Caregivers</Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-custom">
          <SectionHeading eyebrow="From Our Blog" title="Care Tips & Resources" subtitle="Expert insights to help your family navigate the home care journey." />
          <StaggerContainer className="grid auto-rows-[240px] gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-12">
            <StaggerItem className="min-h-[280px] lg:col-span-6 lg:row-span-2 lg:min-h-0">
              <Link to={`/blog/${featuredBlog.slug}`} className="group block h-full">
                <article className="relative h-full overflow-hidden rounded-3xl shadow-card">
                  <LazyImage
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    wrapperClassName="absolute inset-0 h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-950/85 via-deep-900/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                      {featuredBlog.category}
                    </span>
                    <h3 className="mt-3 max-w-xl font-heading text-2xl font-bold text-white md:text-3xl">{featuredBlog.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">{featuredBlog.excerpt}</p>
                    <p className="mt-4 text-sm font-semibold text-teal-200">{featuredBlog.readTime} min read</p>
                  </div>
                </article>
              </Link>
            </StaggerItem>

            {BLOG_POSTS.filter((b) => b.slug !== featuredBlog.slug).slice(0, 3).map((post, i) => (
              <StaggerItem key={post.slug} className={i === 0 ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-3'}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <article className="relative h-full overflow-hidden rounded-3xl shadow-soft">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      wrapperClassName="absolute inset-0 h-full w-full"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-950/80 via-deep-900/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">{post.category}</span>
                      <h3 className="mt-2 font-heading text-lg font-semibold leading-tight text-white">{post.title}</h3>
                      {i === 0 && <p className="mt-2 line-clamp-3 text-sm text-white/75">{post.excerpt}</p>}
                      <p className="mt-3 text-xs font-semibold text-white/70">{post.readTime} min read</p>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-10 text-center">
            <Button to="/blog" variant="secondary">View All Articles</Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding relative overflow-hidden bg-sand-100">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.5] mask-fade-b" aria-hidden="true" />
        <div className="container-custom relative">
          <SectionHeading eyebrow="FAQs" title="Common Questions" subtitle="Quick answers to help you understand our care services." />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={FAQS} limit={4} />
          </div>
          <div className="mt-8 text-center">
            <Button to="/faq" variant="primary">View All FAQs</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-8 text-center shadow-glow-royal md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
            <h2 className="relative font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">Stay Informed, Stay Supported</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">Join our newsletter for care tips, resources, and updates from the River of Life team.</p>
            <div className="relative mx-auto mt-8 max-w-md">
              <NewsletterForm light />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="pb-16">
        <div className="container-custom">
          <SectionHeading eyebrow="Community" title="Moments of Care" subtitle="Follow our journey on Instagram @riveroflifehhc" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {IMAGES.instagram.map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.06}>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl"
                >
                  <LazyImage
                    src={img}
                    alt={`Community care moment ${i + 1}`}
                    className="aspect-square transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-royal-900/0 transition-colors group-hover:bg-royal-900/20" />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
