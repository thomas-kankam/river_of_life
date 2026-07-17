import SEO from '../../seo/SEO';
import PageHero from '../../components/ui/PageHero';
import ContactForm from '../../components/ui/ContactForm';
import CTASection from '../../components/ui/CTASection';
import LazyImage from '../../components/ui/LazyImage';
import { COMPANY } from '../../constants/company';
import { IMAGES } from '../../constants/images';
import { CheckCircle, Calendar } from 'lucide-react';

const BENEFITS = [
  'Competitive compensation and flexible scheduling',
  'Ongoing training and professional development',
  'Supportive team culture focused on compassion',
  'Meaningful work that changes lives every day',
];

export default function CareersPage() {
  return (
    <>
      <SEO title="Caregiver Careers" description={`Join ${COMPANY.shortName} as a certified caregiver. Make a difference in families' lives.`} path="/careers" />
      <PageHero
        eyebrow="Careers"
        title="Join Our Care Team"
        subtitle="Build a meaningful career delivering premium home healthcare."
        image={IMAGES.careersHero}
        imageAlt={IMAGES.careersHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }]}
        cta={{ to: '/contact', label: 'Apply Today', icon: Calendar }}
      />
      <section className="section-padding pt-8">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-8 overflow-hidden rounded-3xl shadow-card">
              <LazyImage src={IMAGES.caregiver} alt="Caregiver careers at River of Life" className="aspect-[4/3]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-deep-900">Why Work With Us</h2>
            <ul className="mt-6 space-y-4">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-deep-600">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-deep-100 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-xl font-bold text-deep-900">Apply Now</h2>
            <p className="mt-2 text-deep-500">Tell us about your experience and interest in joining {COMPANY.shortName}.</p>
            <div className="mt-6 overflow-hidden">
              <ContactForm compact formType="careers" />
            </div>
          </div>
        </div>
      </section>
      <CTASection title="Questions About Careers?" />
    </>
  );
}
