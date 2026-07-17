import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import SEO from '../../seo/SEO';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema } from '../../seo/schemas';
import { getServiceBySlug, getRelatedServices } from '../../data/services';
import { FAQS } from '../../data/faqs';
import { IMAGES } from '../../constants/images';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LazyImage from '../../components/ui/LazyImage';
import FAQAccordion from '../../components/ui/FAQAccordion';
import CTASection from '../../components/ui/CTASection';
import Button from '../../components/ui/Button';
import ServiceCard from '../../components/ui/ServiceCard';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../components/ui/ScrollReveal';

/** Secondary gallery images that differ from each service hero */
const DETAIL_ACCENTS = {
  'personal-care': IMAGES.hands,
  'companion-care': IMAGES.celebration,
  'medication-reminders': IMAGES.planning,
  'meal-preparation': IMAGES.hands,
  'light-housekeeping': IMAGES.planning,
  transportation: IMAGES.walking,
  errands: IMAGES.walking,
  'alzheimer-care': IMAGES.hands,
  'dementia-care': IMAGES.celebration,
  'post-hospital-care': IMAGES.planning,
  'respite-care': IMAGES.family,
  'live-in-care': IMAGES.hands,
  'family-support': IMAGES.celebration,
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/404" replace />;

  const Icon = service.icon;
  const related = getRelatedServices(slug);
  const serviceFaqs = FAQS.filter((f) => f.category === 'Services').slice(0, 4);
  const accent = DETAIL_ACCENTS[service.slug] || IMAGES.hands;

  return (
    <>
      <SEO
        title={service.title}
        description={service.description}
        path={`/services/${service.slug}`}
        image={service.image}
        jsonLd={[
          getServiceSchema(service),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          getFAQSchema(serviceFaqs),
        ]}
      />

      <section className="relative min-h-[400px] overflow-hidden pt-28 pb-16 md:min-h-[520px] md:pt-32 md:pb-20">
        <div className="absolute inset-0">
          <LazyImage
            src={service.image}
            alt={service.imageAlt || service.title}
            priority
            wrapperClassName="absolute inset-0 h-full w-full"
            className="h-full w-full scale-105 object-cover"
          />
          <div className="hero-overlay-strong" aria-hidden="true" />
        </div>
        <div className="container-custom relative z-10">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white drop-shadow-sm sm:text-5xl">{service.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{service.description}</p>
            <Button to="/contact" variant="white" className="mt-8 w-full sm:w-auto" icon={Calendar}>Book Free Consultation</Button>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div className="overflow-hidden rounded-3xl shadow-card">
                <LazyImage src={accent} alt={service.imageAlt || service.title} className="aspect-[4/3]" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <h2 className="font-heading text-3xl font-bold text-deep-900">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-deep-500">{service.description}</p>
              <h3 className="mt-8 font-heading text-xl font-semibold text-deep-900">Who Is It For?</h3>
              <p className="mt-3 text-deep-500">{service.whoIsItFor}</p>
              <div className="mt-8 overflow-hidden rounded-2xl">
                <LazyImage src={service.image} alt={service.imageAlt || service.title} className="aspect-[16/10]" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-50">
        <div className="container-custom">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-deep-900">Benefits & Process</h2>
            <p className="mx-auto mt-3 max-w-2xl text-deep-500">
              Clear outcomes and a simple path from consultation to care at home.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 lg:grid-cols-2">
            <ScrollReveal>
              <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft">
                <h3 className="font-heading text-xl font-semibold text-deep-900">Key Benefits</h3>
                <ul className="mt-6 flex-1 space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                      <span className="text-deep-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {service.process.map((step, i) => (
                <StaggerItem key={step}>
                  <div className="card-premium h-full bg-gradient-to-br from-white to-royal-50/40">
                    <span className="font-heading text-2xl font-bold text-royal-200">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-2 font-semibold text-deep-900">{step}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-deep-900">Transparent Pricing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-deep-500">
              Every care plan is unique. Contact us for a free consultation and personalized pricing based on your specific needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button to="/contact" variant="primary">Get a Free Quote</Button>
              <Button to="/faq" variant="secondary">Pricing FAQs</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-deep-50">
        <div className="container-custom">
          <h2 className="text-center font-heading text-3xl font-bold text-deep-900">Frequently Asked Questions</h2>
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion faqs={serviceFaqs} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-bold text-deep-900">Related Services</h2>
              <Link to="/services" className="flex items-center gap-2 font-semibold text-royal-700 hover:text-royal-900">
                All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title={`Ready for ${service.title}?`} />
    </>
  );
}
