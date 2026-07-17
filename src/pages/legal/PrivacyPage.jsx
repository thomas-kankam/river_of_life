import SEO from '../../seo/SEO';
import PageHero from '../../components/ui/PageHero';
import Button from '../../components/ui/Button';
import { COMPANY } from '../../constants/company';
import { IMAGES } from '../../constants/images';

export default function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" description={`Privacy Policy for ${COMPANY.name}.`} path="/privacy" />
      <PageHero
        title="Privacy Policy"
        subtitle="How we protect your information with care and transparency."
        image={IMAGES.legalHero}
        imageAlt={IMAGES.legalHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }]}
        height="sm"
      />
      <section className="section-padding pt-8">
        <div className="container-custom prose prose-lg mx-auto max-w-3xl text-deep-600">
          <p>Last updated: July 2026</p>
          <h2>Information We Collect</h2>
          <p>{COMPANY.name} collects information you provide through contact forms, consultations, and website interactions to deliver and improve our home healthcare services.</p>
          <h2>How We Use Information</h2>
          <p>We use your information to respond to inquiries, coordinate care, improve our services, and communicate relevant updates. We do not sell personal information.</p>
          <h2>HIPAA Compliance</h2>
          <p>Protected health information is handled in accordance with applicable HIPAA regulations and our internal privacy policies.</p>
          <h2>Contact</h2>
          <p>Questions? Email <a href={COMPANY.emailLink} className="text-royal-700">{COMPANY.email}</a>.</p>
          <Button to="/contact" variant="primary" className="mt-8">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
