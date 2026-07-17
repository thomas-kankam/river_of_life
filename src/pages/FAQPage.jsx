import { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import SEO from '../seo/SEO';
import { getFAQSchema, getBreadcrumbSchema } from '../seo/schemas';
import { FAQS, FAQ_CATEGORIES } from '../data/faqs';
import { COMPANY } from '../constants/company';
import { IMAGES } from '../constants/images';
import PageHero from '../components/ui/PageHero';
import FAQAccordion from '../components/ui/FAQAccordion';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

export default function FAQPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter((faq) => {
    const matchCat = category === 'All' || faq.category === category;
    const matchSearch = !search
      || faq.question.toLowerCase().includes(search.toLowerCase())
      || faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description={`Find answers about ${COMPANY.shortName} home care services, pricing, caregivers, scheduling, and getting started.`}
        path="/faq"
        jsonLd={[
          getFAQSchema(FAQS),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQs', path: '/faq' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="FAQs"
        title="How Can We Help?"
        subtitle="Search our knowledge base or browse by category — real answers for real care decisions."
        image={IMAGES.faqHero}
        imageAlt={IMAGES.faqHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faq' }]}
        cta={{ to: '/contact', label: 'Talk to Us', icon: Calendar }}
      />

      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-deep-400" />
              <input
                type="search"
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-deep-200 py-4 pl-12 pr-4 text-lg focus:border-royal-500 focus:ring-2 focus:ring-royal-200"
                aria-label="Search FAQs"
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    category === cat ? 'bg-royal-600 text-white' : 'bg-deep-100 text-deep-600 hover:bg-royal-50'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <FAQAccordion faqs={filtered} />

            {filtered.length === 0 && (
              <p className="py-12 text-center text-deep-500">No FAQs match your search.</p>
            )}
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-gradient-brand p-8 text-center text-white md:p-12">
            <h2 className="font-heading text-2xl font-bold">Still Need Help?</h2>
            <p className="mt-3 text-white/85">Our care coordination team is happy to answer your questions personally.</p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Button to="/contact" variant="white">Contact Us</Button>
              <Button href={COMPANY.phoneLink} variant="outline">Call {COMPANY.phone}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
