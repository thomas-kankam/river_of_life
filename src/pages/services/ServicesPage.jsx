import { useState } from 'react';
import SEO from '../../seo/SEO';
import { getBreadcrumbSchema } from '../../seo/schemas';
import { SERVICES, SERVICE_CATEGORIES } from '../../data/services';
import { FAQS } from '../../data/faqs';
import { IMAGES } from '../../constants/images';
import PageHero from '../../components/ui/PageHero';
import SectionHeading from '../../components/ui/SectionHeading';
import ServiceCard from '../../components/ui/ServiceCard';
import FAQAccordion from '../../components/ui/FAQAccordion';
import CTASection from '../../components/ui/CTASection';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';
import { Calendar } from 'lucide-react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      <SEO
        title="Home Care Services"
        description="Explore premium home healthcare services including personal care, companion care, medication reminders, specialized memory care, and more."
        path="/services"
        jsonLd={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />

      <PageHero
        eyebrow="Our Services"
        title="Premium Home Care Services"
        subtitle="Comprehensive, compassionate care tailored to your loved one's unique needs."
        image={IMAGES.servicesHero}
        imageAlt={IMAGES.servicesHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        cta={{ to: '/contact', label: 'Book Consultation', icon: Calendar }}
      />

      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-deep-100 bg-white p-6 shadow-soft">
                <h2 className="font-heading text-lg font-semibold text-deep-900">Filter Services</h2>
                <nav className="mt-4 space-y-1" aria-label="Service categories">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        'block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors',
                        activeCategory === cat.id
                          ? 'bg-royal-600 text-white'
                          : 'text-deep-600 hover:bg-royal-50 hover:text-royal-700'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-8 rounded-xl bg-royal-50 p-4">
                  <p className="text-sm font-semibold text-royal-800">Need guidance?</p>
                  <p className="mt-1 text-sm text-royal-600">Our team can help you choose the right services.</p>
                  <Button to="/contact" variant="primary" className="mt-4 w-full px-4 py-2 text-sm">Book Consultation</Button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((service, i) => (
                  <ServiceCard key={service.slug} service={service} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-12 text-center text-deep-500">No services found in this category.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-50">
        <div className="container-custom">
          <SectionHeading eyebrow="FAQs" title="Service Questions" subtitle="Common questions about our home care services." />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={FAQS.filter((f) => f.category === 'Services')} />
          </div>
        </div>
      </section>

      <CTASection title="Find the Right Care for Your Family" />
    </>
  );
}
