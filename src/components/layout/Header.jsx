import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, ChevronDown, Phone, Calendar, ArrowRight,
  BookOpen, Download, Briefcase, HeartHandshake, Users, Star,
  Info, FileText, HelpCircle,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useScrollPosition } from '../../hooks/useScroll';
import { COMPANY } from '../../constants/company';
import { SERVICES } from '../../data/services';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const RESOURCE_LINKS = [
  { title: 'About Us', description: 'Our mission, vision, and story', to: '/about', icon: Info },
  { title: 'Blog', description: 'Care tips and expert insights', to: '/blog', icon: FileText },
  { title: 'FAQs', description: 'Answers to common questions', to: '/faq', icon: HelpCircle },
  { title: 'Care Guides', description: 'Helpful resources for families', to: '/resources/care-guides', icon: BookOpen },
  { title: 'Downloads', description: 'Forms and printable guides', to: '/resources/downloads', icon: Download },
  { title: 'Meet Our Caregivers', description: 'Dedicated professionals you can trust', to: '/about#caregivers', icon: Users },
  { title: 'Testimonials', description: 'Stories from families we serve', to: '/about#testimonials', icon: Star },
  { title: 'Caregiver Careers', description: 'Join our care team', to: '/careers', icon: Briefcase },
  { title: 'Community Outreach', description: 'Partnerships and events', to: '/community', icon: HeartHandshake },
];

function MegaMenu({ title, children, isOpen, onOpen, onClose, wide = false }) {
  const closeTimer = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => onClose(), 180);
  };

  const handleOpen = () => {
    clearCloseTimer();
    onOpen();
  };

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(
          'relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors duration-200',
          isOpen ? 'text-royal-700' : 'text-deep-700 hover:text-royal-700'
        )}
        onClick={() => (isOpen ? onClose() : handleOpen())}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')} />
        <span
          className={cn(
            'pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-teal-500 transition-transform duration-300 ease-smooth',
            isOpen ? 'scale-x-100' : 'scale-x-0'
          )}
        />
      </button>

      {mounted
        && createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <div
                  className="fixed inset-x-0 bottom-0 top-20 z-[55] sm:top-[4.75rem]"
                  aria-hidden="true"
                  onClick={onClose}
                />
                <motion.div
                  initial={{ opacity: 0, y: 12, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 8, x: '-50%' }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'fixed left-1/2 top-[4.25rem] z-[60] sm:top-[4.75rem]',
                    wide
                      ? 'w-[min(860px,calc(100vw-2rem))]'
                      : 'w-[min(720px,calc(100vw-2rem))]'
                  )}
                  onMouseEnter={handleOpen}
                  onMouseLeave={scheduleClose}
                >
                  {/* Invisible bridge from nav to panel */}
                  <div className="h-3 w-full" aria-hidden="true" />
                  <div className="overflow-hidden rounded-3xl border border-deep-100/80 bg-white/95 shadow-lift backdrop-blur-xl">
                    {children}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default function Header({ onOpenSearch, onOpenConsultation }) {
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const closeServices = useCallback(() => setServicesOpen(false), []);
  const closeResources = useCallback(() => setResourcesOpen(false), []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinkClass = (path) => cn(
    'relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors duration-200',
    'after:pointer-events-none after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-teal-500 after:transition-transform after:duration-300 after:ease-smooth',
    pathname === path
      ? 'text-royal-700 after:scale-x-100'
      : 'text-deep-700 hover:text-royal-700 after:scale-x-0 hover:after:scale-x-100'
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
          scrolled
            ? 'glass border-b border-deep-100/60 py-2 shadow-soft sm:py-2.5'
            : 'border-b border-transparent bg-white/80 py-2.5 backdrop-blur-md sm:py-3.5'
        )}
      >
        <div className="container-custom relative flex items-center justify-between gap-4">
          <div className="relative z-10 min-w-0 shrink-0">
            <Logo variant="icon" wrapperClassName="sm:hidden" />
            <Logo variant="nav" wrapperClassName="hidden sm:inline-flex" />
          </div>

          <nav
            className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            <Link to="/" className={navLinkClass('/')}>Home</Link>

            <MegaMenu
              title="Services"
              wide
              isOpen={servicesOpen}
              onOpen={() => { setServicesOpen(true); setResourcesOpen(false); }}
              onClose={closeServices}
            >
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-deep-400">Our Care Services</p>
                    <p className="mt-0.5 text-xs text-deep-500">Choose support that matches your family’s needs</p>
                  </div>
                  <Link
                    to="/services"
                    className="hidden items-center gap-1 text-xs font-semibold text-royal-700 hover:text-royal-900 sm:inline-flex"
                    onClick={closeServices}
                  >
                    View all <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
                  {SERVICES.slice(0, 8).map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="group flex gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-royal-50"
                        onClick={closeServices}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal-100 text-royal-700">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight text-deep-900 group-hover:text-royal-700">{service.title}</p>
                          <p className="mt-0.5 line-clamp-1 text-xs leading-snug text-deep-500">{service.description.slice(0, 48)}...</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-deep-100 bg-deep-50/80 px-4 py-3">
                <p className="text-xs text-deep-500">{SERVICES.length} services · Personalized care plans</p>
                <Button to="/contact" variant="primary" className="px-4 py-2 text-xs" onClick={closeServices}>
                  Book Consultation
                </Button>
              </div>
            </MegaMenu>

            <MegaMenu
              title="Resources"
              wide
              isOpen={resourcesOpen}
              onOpen={() => { setResourcesOpen(true); setServicesOpen(false); }}
              onClose={closeResources}
            >
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-deep-400">Helpful Resources</p>
                  <p className="mt-0.5 text-xs text-deep-500">Guides, insights, and ways to connect</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {RESOURCE_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-royal-50"
                        onClick={closeResources}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight text-deep-900">{link.title}</p>
                          <p className="line-clamp-1 text-xs leading-snug text-deep-500">{link.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-deep-100 bg-deep-50/80 px-4 py-3">
                <p className="text-xs text-deep-500">{RESOURCE_LINKS.length} resources for families</p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-royal-700 hover:text-royal-900"
                  onClick={closeResources}
                >
                  About River of Life <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </MegaMenu>

            <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full text-deep-700 transition-all duration-200 hover:bg-royal-50 hover:text-royal-700 active:scale-95"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
            <a
              href={COMPANY.phoneLink}
              className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold text-royal-700 transition-colors hover:bg-royal-50 xl:flex"
              aria-label={`Call ${COMPANY.phone}`}
            >
              <Phone className="h-4 w-4" />
              <span>{COMPANY.phone}</span>
            </a>
            <Button
              onClick={onOpenConsultation}
              variant="primary"
              className="hidden px-4 py-2 text-sm lg:inline-flex"
              icon={Calendar}
            >
              Book Consultation
            </Button>
            <button
              type="button"
              className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-royal-50 text-royal-800 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-deep-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-[56] flex w-full max-w-sm flex-col bg-white shadow-card lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-deep-100 px-5 py-4">
                <Logo variant="icon" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-deep-50 text-deep-700"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile navigation">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/services', label: 'Services' },
                  { to: '/about', label: 'About' },
                  { to: '/blog', label: 'Blog' },
                  { to: '/faq', label: 'FAQs' },
                  { to: '/resources/care-guides', label: 'Care Guides' },
                  { to: '/resources/downloads', label: 'Downloads' },
                  { to: '/careers', label: 'Careers' },
                  { to: '/community', label: 'Community' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 font-semibold text-deep-900 hover:bg-royal-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-royal-600" />
                  </Link>
                ))}
              </nav>

              <div className="space-y-3 border-t border-deep-100 p-5">
                <Button to="/contact" variant="primary" className="w-full" icon={Calendar} onClick={() => setMobileOpen(false)}>
                  Book Consultation
                </Button>
                <Button href={COMPANY.phoneLink} variant="secondary" className="w-full" icon={Phone}>
                  Call {COMPANY.phone}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
