import { Award, Target, Eye, Calendar } from 'lucide-react';
import SEO from '../seo/SEO';
import { getOrganizationSchema, getBreadcrumbSchema } from '../seo/schemas';
import { COMPANY, STATS } from '../constants/company';
import { IMAGES } from '../constants/images';
import { TEAM, CAREGIVERS, TIMELINE, VALUES, CERTIFICATIONS } from '../data/team';
import { TESTIMONIALS } from '../data/testimonials';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import LazyImage from '../components/ui/LazyImage';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { TestimonialCarousel } from '../components/ui/TestimonialCard';
import CTASection from '../components/ui/CTASection';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description={`Learn about ${COMPANY.name} — our mission, values, team, and commitment to premium compassionate home healthcare.`}
        path="/about"
        jsonLd={[
          getOrganizationSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About Us"
        title="Compassionate Care. Trusted Support."
        subtitle={`${COMPANY.slogan} Discover the story, values, and people behind ${COMPANY.shortName}.`}
        image={IMAGES.aboutHero}
        imageAlt={IMAGES.aboutHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
        cta={{ to: '/contact', label: 'Book Consultation', icon: Calendar }}
      />

      <section className="section-padding">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <LazyImage src={IMAGES.about} alt={IMAGES.aboutAlt} wrapperClassName="rounded-3xl shadow-card" className="aspect-[4/3]" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="font-heading text-3xl font-bold text-deep-900">Our Story</h2>
            <p className="mt-4 text-lg leading-relaxed text-deep-500">
              {COMPANY.name} was founded with a vision to redefine home healthcare — combining clinical excellence with the warmth of family. We believe every person deserves to age and heal with dignity in the comfort of home.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-deep-500">
              Today, we serve hundreds of families across the Philadelphia region with personalized care plans, certified caregivers, and unwavering commitment to quality.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-deep-900 text-white">
        <div className="container-custom grid gap-8 md:grid-cols-3">
          {[
            { icon: Target, title: 'Mission', text: 'To deliver premium, compassionate home healthcare that empowers clients and supports families with trust and dignity.' },
            { icon: Eye, title: 'Vision', text: 'To be the most trusted home healthcare agency — setting the standard for quality, safety, and heartfelt care.' },
            { icon: Award, title: 'Promise', text: COMPANY.closingStatement },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <Icon className="mb-4 h-10 w-10 text-royal-400" />
                  <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-white/75">{item.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Values" title="What Guides Everything We Do" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <h3 className="font-heading text-lg font-semibold text-royal-700">{value.title}</h3>
                  <p className="mt-2 text-deep-500">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-50">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Journey" title="A Timeline of Care" />
          <div className="mx-auto max-w-3xl space-y-8">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className="flex gap-6">
                  <span className="font-heading text-2xl font-bold text-royal-600">{item.year}</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-deep-900">{item.title}</h3>
                    <p className="mt-1 text-deep-500">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="Leadership" title="Meet Our Team" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <article className="card-premium overflow-hidden p-0 text-center">
                  <LazyImage src={member.image} alt={member.name} className="aspect-square" />
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-deep-900">{member.name}</h3>
                    <p className="text-sm text-royal-600">{member.role}</p>
                    <p className="mt-2 text-sm text-deep-500">{member.bio.slice(0, 100)}...</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {member.credentials.map((c) => (
                        <span key={c} className="rounded-full bg-royal-50 px-2 py-0.5 text-xs font-medium text-royal-700">{c}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="caregivers" className="section-padding bg-gradient-soft">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Caregivers" title="The Heart of Our Care" subtitle="Dedicated professionals selected for skill, compassion, and reliability." />
          <div className="grid gap-8 md:grid-cols-3">
            {CAREGIVERS.map((cg, i) => (
              <ScrollReveal key={cg.id} delay={i * 0.1}>
                <article className="card-premium overflow-hidden p-0">
                  <LazyImage src={cg.image} alt={cg.name} className="aspect-[4/3]" />
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-deep-900">{cg.name}</h3>
                    <p className="text-sm text-royal-600">{cg.specialty} · {cg.experience}</p>
                    <blockquote className="mt-3 text-sm italic text-deep-500">&ldquo;{cg.quote}&rdquo;</blockquote>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="Certifications" title="Credentials You Can Trust" />
          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert} className="rounded-full border border-royal-200 bg-royal-50 px-5 py-2 font-medium text-royal-800">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-deep-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((stat) => (
              <AnimatedCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-padding">
        <div className="container-custom">
          <SectionHeading eyebrow="Testimonials" title="Families Trust River of Life" />
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
