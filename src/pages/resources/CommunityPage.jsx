import { Calendar } from 'lucide-react';
import SEO from '../../seo/SEO';
import PageHero from '../../components/ui/PageHero';
import CTASection from '../../components/ui/CTASection';
import Button from '../../components/ui/Button';
import LazyImage from '../../components/ui/LazyImage';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { IMAGES } from '../../constants/images';

const INITIATIVES = [
  {
    title: 'Senior Wellness Workshops',
    description: 'Free community workshops on aging safely, nutrition, and wellness at home.',
    image: IMAGES.walking,
  },
  {
    title: 'Caregiver Appreciation Events',
    description: 'Celebrating the dedicated professionals who deliver compassionate care daily.',
    image: IMAGES.careersHero,
  },
  {
    title: 'Healthcare Provider Partnerships',
    description: 'Collaborating with physicians, hospitals, and community organizations.',
    image: IMAGES.about,
  },
  {
    title: 'Family Education Seminars',
    description: 'Helping families navigate care decisions with expert guidance and resources.',
    image: IMAGES.familySupport,
  },
];

export default function CommunityPage() {
  return (
    <>
      <SEO title="Community Outreach" description="River of Life community outreach, partnerships, and wellness initiatives." path="/community" />
      <PageHero
        eyebrow="Community"
        title="Outreach & Partnerships"
        subtitle="Giving back to the communities we serve — workshops, partnerships, and family education."
        image={IMAGES.communityHero}
        imageAlt={IMAGES.communityHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Community Outreach', path: '/community' }]}
        cta={{ to: '/contact', label: 'Partner With Us', icon: Calendar }}
      />
      <section className="section-padding pt-8">
        <div className="container-custom grid gap-6 sm:grid-cols-2">
          {INITIATIVES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <article className="card-premium h-full overflow-hidden p-0">
                <LazyImage src={item.image} alt={item.title} className="aspect-[16/10]" />
                <div className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-deep-900">{item.title}</h2>
                  <p className="mt-3 text-deep-500">{item.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/contact" variant="primary">Partner With Us</Button>
        </div>
      </section>
      <CTASection />
    </>
  );
}
