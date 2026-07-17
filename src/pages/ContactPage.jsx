import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import SEO from '../seo/SEO';
import { getOrganizationSchema, getBreadcrumbSchema } from '../seo/schemas';
import { COMPANY } from '../constants/company';
import { IMAGES } from '../constants/images';
import { FAQS } from '../data/faqs';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import ContactForm from '../components/ui/ContactForm';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/ui/CTASection';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description={`Contact ${COMPANY.shortName} for a free home care consultation. Call ${COMPANY.phone} or email ${COMPANY.email}.`}
        path="/contact"
        jsonLd={[
          getOrganizationSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact Us"
        title="Let's Start Your Care Journey"
        subtitle="Schedule a free consultation — our care coordination team is ready to help."
        image={IMAGES.contactHero}
        imageAlt={IMAGES.contactHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
      />

      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: Phone, title: 'Phone', content: COMPANY.phone, href: COMPANY.phoneLink },
                { icon: Mail, title: 'Email', content: COMPANY.email, href: COMPANY.emailLink },
                { icon: MapPin, title: 'Service Area', content: COMPANY.address },
                { icon: Clock, title: 'Office Hours', content: `${COMPANY.hours.weekdays}\n${COMPANY.hours.saturday}\n${COMPANY.hours.sunday}` },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card-premium flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-900">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block text-royal-700 hover:text-royal-900">{item.content}</a>
                      ) : (
                        <p className="mt-1 whitespace-pre-line text-deep-500">{item.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 shrink-0 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Emergency Contacts</h3>
                    <p className="mt-1 text-sm text-amber-800">For medical emergencies, dial 911. For urgent care coordination, call {COMPANY.phone} — {COMPANY.hours.emergency}.</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-deep-100 bg-deep-100 shadow-soft">
                <div className="flex aspect-video items-center justify-center bg-deep-200 text-deep-500">
                  <MapPin className="mr-2 h-6 w-6" />
                  Map — Philadelphia Metro Area
                </div>
              </div>
            </div>

            <div className="lg:col-span-3" id="consultation-form">
              <div className="rounded-3xl border border-deep-100 bg-white p-5 shadow-card sm:p-6 md:p-10">
                <h2 className="font-heading text-2xl font-bold text-deep-900">Send Us a Message</h2>
                <p className="mt-2 text-deep-500">{COMPANY.slogan}</p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-50">
        <div className="container-custom">
          <SectionHeading eyebrow="FAQs" title="Before You Reach Out" subtitle="Quick answers to common questions." />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={FAQS.slice(0, 5)} />
          </div>
        </div>
      </section>

      <CTASection title="We're Here When You Need Us" />
    </>
  );
}
