import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import SEO from '../../seo/SEO';
import PageHero from '../../components/ui/PageHero';
import CTASection from '../../components/ui/CTASection';
import LazyImage from '../../components/ui/LazyImage';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { COMPANY } from '../../constants/company';
import { IMAGES } from '../../constants/images';

const GUIDES = [
  {
    title: 'Getting Started with Home Care',
    description: 'A step-by-step guide for families considering home healthcare.',
    image: IMAGES.seniorCare,
    to: '/blog/signs-your-loved-one-may-need-home-care',
  },
  {
    title: 'Safety Checklist for Aging at Home',
    description: 'Practical tips to reduce fall risks and improve home safety.',
    image: IMAGES.planning,
    to: '/blog/how-to-choose-a-home-healthcare-agency',
  },
  {
    title: 'Understanding Care Plan Options',
    description: 'Learn about personal care, companion care, and specialized services.',
    image: IMAGES.caregiver,
    to: '/services',
  },
  {
    title: 'Supporting a Loved One with Dementia',
    description: 'Compassionate strategies for memory care at home.',
    image: IMAGES.dementiaCare,
    to: '/services/dementia-care',
  },
];

export default function CareGuidesPage() {
  return (
    <>
      <SEO title="Care Guides" description="Helpful care guides and resources for families from River of Life." path="/resources/care-guides" />
      <PageHero
        eyebrow="Resources"
        title="Care Guides"
        subtitle="Expert resources to help your family make informed care decisions."
        image={IMAGES.guidesHero}
        imageAlt={IMAGES.guidesHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Care Guides', path: '/resources/care-guides' }]}
        cta={{ to: '/contact', label: 'Get Guidance', icon: Calendar }}
      />
      <section className="section-padding pt-8">
        <div className="container-custom grid gap-6 sm:grid-cols-2">
          {GUIDES.map((guide, i) => (
            <ScrollReveal key={guide.title} delay={i * 0.08}>
              <Link to={guide.to} className="group card-premium block h-full overflow-hidden p-0">
                <LazyImage src={guide.image} alt={guide.title} className="aspect-[16/10] transition-transform duration-500 group-hover:scale-105" />
                <div className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-deep-900 group-hover:text-royal-700">{guide.title}</h2>
                  <p className="mt-3 text-deep-500">{guide.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-royal-700">
                    Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <CTASection title="Need Personalized Guidance?" subtitle={COMPANY.closingStatement} />
    </>
  );
}
