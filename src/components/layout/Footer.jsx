import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube,
} from 'react-icons/fa';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { COMPANY } from '../../constants/company';
import { SERVICES } from '../../data/services';
import NewsletterForm from '../ui/NewsletterForm';
import Logo from '../ui/Logo';

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  youtube: FaYoutube,
};

const linkClass = 'text-sm text-white/65 transition-colors hover:text-teal-300';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep-950 text-white" role="contentinfo">
      {/* Ambient brand glow + dot texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-dots opacity-[0.04]" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-royal-500/20 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl" />
      </div>

      {/* Slim top strip — not competing with page CTAs */}
      <div className="relative border-b border-white/10 bg-white/[0.03]">
        <div className="container-custom flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">{COMPANY.slogan}</span>
            <span className="mx-2 text-white/30">·</span>
            {COMPANY.taglineSecondary}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={COMPANY.phoneLink}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-royal-800 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-royal-50"
            >
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom relative pt-12 pb-6 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Premium, compassionate home healthcare with a focus on dignity, safety, and family partnership.
            </p>
            <div className="mt-5 flex gap-2">
              {Object.entries(COMPANY.social).map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/50 hover:bg-teal-500 hover:text-white"
                    aria-label={`Follow us on ${key}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300/90">Company</h3>
              <ul className="space-y-2">
                {[
                  { to: '/about', label: 'About Us' },
                  { to: '/services', label: 'Services' },
                  { to: '/blog', label: 'Blog' },
                  { to: '/faq', label: 'FAQs' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300/90">Services</h3>
              <ul className="space-y-2">
                {SERVICES.slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`} className={linkClass}>
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/services" className="text-sm font-medium text-teal-400 hover:text-teal-300">View all →</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300/90">Resources</h3>
              <ul className="space-y-2">
                {[
                  { to: '/resources/care-guides', label: 'Care Guides' },
                  { to: '/resources/downloads', label: 'Downloads' },
                  { to: '/careers', label: 'Careers' },
                  { to: '/community', label: 'Community' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300/90">Get in Touch</h3>
            <ul className="mb-5 space-y-2.5 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a href={COMPANY.phoneLink} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-teal-400" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={COMPANY.emailLink} className="flex items-center gap-2.5 break-all transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-teal-400" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span className="text-sm">{COMPANY.hours.weekdays}</span>
              </li>
            </ul>

            <p className="mb-2.5 text-xs font-medium text-white/50">Care tips in your inbox</p>
            <NewsletterForm light />
          </div>
        </div>

        {/* Legal row ABOVE the bottom edge — clear of sticky FABs */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 pb-20 sm:flex-row sm:items-center sm:justify-between sm:pb-6 md:pb-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45">
            <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
          </div>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
