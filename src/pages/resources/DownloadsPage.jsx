import { Download, FileText, Calendar } from 'lucide-react';
import SEO from '../../seo/SEO';
import PageHero from '../../components/ui/PageHero';
import CTASection from '../../components/ui/CTASection';
import LazyImage from '../../components/ui/LazyImage';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { IMAGES } from '../../constants/images';

const DOWNLOADS = [
  {
    title: 'Home Care Assessment Checklist',
    type: 'PDF',
    size: '245 KB',
    image: IMAGES.planning,
  },
  {
    title: 'Medication Tracker Template',
    type: 'PDF',
    size: '180 KB',
    image: IMAGES.medication,
  },
  {
    title: 'Care Plan Overview Guide',
    type: 'PDF',
    size: '320 KB',
    image: IMAGES.hands,
  },
  {
    title: 'Emergency Contact Sheet',
    type: 'PDF',
    size: '95 KB',
    image: IMAGES.familySupport,
  },
];

export default function DownloadsPage() {
  return (
    <>
      <SEO title="Downloads" description="Downloadable care guides, forms, and resources from River of Life." path="/resources/downloads" />
      <PageHero
        eyebrow="Resources"
        title="Downloads"
        subtitle="Printable guides and forms for families and caregivers."
        image={IMAGES.downloadsHero}
        imageAlt={IMAGES.downloadsHeroAlt}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Downloads', path: '/resources/downloads' }]}
        cta={{ to: '/contact', label: 'Request a Care Packet', icon: Calendar }}
      />
      <section className="section-padding pt-8">
        <div className="container-custom grid gap-6 sm:grid-cols-2">
          {DOWNLOADS.map((file, i) => (
            <ScrollReveal key={file.title} delay={i * 0.08}>
              <article className="card-premium flex h-full flex-col overflow-hidden p-0 sm:flex-row">
                <LazyImage src={file.image} alt={file.title} wrapperClassName="sm:w-40 shrink-0" className="aspect-video sm:aspect-square sm:h-full" />
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-teal-600">
                      <FileText className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{file.type}</span>
                    </div>
                    <h2 className="font-heading font-semibold text-deep-900">{file.title}</h2>
                    <p className="mt-1 text-sm text-deep-500">{file.size}</p>
                  </div>
                  <button type="button" className="btn-secondary mt-4 w-fit px-4 py-2 text-sm" aria-label={`Download ${file.title}`}>
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
