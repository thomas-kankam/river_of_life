import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../seo/SEO';
import Button from '../components/ui/Button';
import LazyImage from '../components/ui/LazyImage';
import { IMAGES } from '../constants/images';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for could not be found." path="/404" noindex />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0">
          <LazyImage
            src={IMAGES.seniorCare}
            alt=""
            wrapperClassName="absolute inset-0 h-full w-full"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-deep-900/75" />
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <p className="font-heading text-8xl font-bold text-white/30">404</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white">Page Not Found</h1>
          <p className="mt-4 text-white/80">The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to care.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/" variant="white" icon={Home}>Back to Home</Button>
            <Link to="/services" className="btn-secondary border-white/40 bg-transparent text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
