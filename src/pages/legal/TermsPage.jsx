import SEO from '../../seo/SEO';
import PageHero from '../../components/ui/PageHero';
import Button from '../../components/ui/Button';
import { COMPANY } from '../../constants/company';
import { IMAGES } from '../../constants/images';

export default function TermsPage() {
  return (
    <>
      <SEO title="Terms of Service" description={`Terms of Service for ${COMPANY.name}.`} path="/terms" />
      <PageHero
        title="Terms of Service"
        subtitle="Clear expectations for a trusted care partnership."
        image={IMAGES.legalHero}
        imageAlt={IMAGES.legalHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }]}
        height="sm"
      />
      <section className="section-padding pt-8">
        <div className="container-custom prose prose-lg mx-auto max-w-3xl text-deep-600">
          <p>Last updated: July 2026</p>
          <h2>Agreement</h2>
          <p>By using the {COMPANY.name} website and services, you agree to these terms. Our home healthcare services are subject to separate care agreements.</p>
          <h2>Services</h2>
          <p>We provide non-medical and home healthcare support as described in individual care plans. Services may vary based on assessment and availability.</p>
          <h2>Website Use</h2>
          <p>Website content is for informational purposes and does not constitute medical advice. Always consult qualified healthcare professionals for medical decisions.</p>
          <h2>Contact</h2>
          <p>Questions about these terms? Contact us at {COMPANY.email}.</p>
          <Button to="/contact" variant="primary" className="mt-8">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
