import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const HomePage = lazy(() => import('../pages/HomePage'));
const ServicesPage = lazy(() => import('../pages/services/ServicesPage'));
const ServiceDetailPage = lazy(() => import('../pages/services/ServiceDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const BlogPage = lazy(() => import('../pages/blog/BlogPage'));
const BlogDetailPage = lazy(() => import('../pages/blog/BlogDetailPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const PrivacyPage = lazy(() => import('../pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/legal/TermsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const CareGuidesPage = lazy(() => import('../pages/resources/CareGuidesPage'));
const DownloadsPage = lazy(() => import('../pages/resources/DownloadsPage'));
const CareersPage = lazy(() => import('../pages/resources/CareersPage'));
const CommunityPage = lazy(() => import('../pages/resources/CommunityPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-royal-200 border-t-royal-600" role="status" aria-label="Loading page" />
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'services', element: withSuspense(ServicesPage) },
      { path: 'services/:slug', element: withSuspense(ServiceDetailPage) },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'blog', element: withSuspense(BlogPage) },
      { path: 'blog/:slug', element: withSuspense(BlogDetailPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: 'faq', element: withSuspense(FAQPage) },
      { path: 'search', element: withSuspense(SearchPage) },
      { path: 'privacy', element: withSuspense(PrivacyPage) },
      { path: 'terms', element: withSuspense(TermsPage) },
      { path: 'resources/care-guides', element: withSuspense(CareGuidesPage) },
      { path: 'resources/downloads', element: withSuspense(DownloadsPage) },
      { path: 'careers', element: withSuspense(CareersPage) },
      { path: 'community', element: withSuspense(CommunityPage) },
      { path: '404', element: withSuspense(NotFoundPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
]);
