import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ReadingProgress from '../components/ui/ReadingProgress';
import ScrollToTop from '../components/ui/ScrollToTop';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import LoadingScreen from '../components/ui/LoadingScreen';
import Chatbot from '../components/chatbot/Chatbot';
import FloatingCTA from '../components/popups/FloatingCTA';
import WelcomeModal from '../components/popups/WelcomeModal';
import CookieConsent from '../components/popups/CookieConsent';
import ExitIntentModal from '../components/popups/ExitIntentModal';
import NewsletterPopup from '../components/popups/NewsletterPopup';
import ConsultationPopup from '../components/popups/ConsultationPopup';
import SearchModal from '../components/popups/SearchModal';
import PageTransition from '../components/ui/PageTransition';
import { useLocalStorage } from '../hooks/useScroll';

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [welcomeSeen, setWelcomeSeen] = useLocalStorage('rol_welcome_seen', false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      <LoadingScreen isLoading={isLoading} />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ReadingProgress />
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />
      <main id="main-content">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTopButton />
      <FloatingCTA onBookConsultation={() => setConsultationOpen(true)} />
      <Chatbot />
      {!welcomeSeen && !isLoading && <WelcomeModal onClose={() => setWelcomeSeen(true)} />}
      <CookieConsent />
      <ExitIntentModal onBook={() => setConsultationOpen(true)} />
      <NewsletterPopup />
      <ConsultationPopup open={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  );
}
