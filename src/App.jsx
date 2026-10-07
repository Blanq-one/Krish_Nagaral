import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import PillNav from './components/PillNav';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Publications from './sections/Publications';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import ProjectDetail from './pages/ProjectDetail';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle smooth scrolling for anchor links (only on home page)
    if (location.pathname === '/' || location.pathname === '/Krish_Nagaral/') {
      // Check if we're navigating back from project detail
      const fromProjectDetail = sessionStorage.getItem('fromProjectDetail');
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      
      // If coming back from project detail, restore the scroll position
      if (fromProjectDetail && savedScrollPosition) {
        setTimeout(() => {
          // Remove hash if exists to prevent scrolling to it
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          // Restore saved scroll position
          window.scrollTo({
            top: parseInt(savedScrollPosition),
            behavior: 'smooth'
          });
          // Clear the flags
          sessionStorage.removeItem('scrollPosition');
          sessionStorage.removeItem('fromProjectDetail');
        }, 50);
      } else {
        // This is a refresh or initial load - always go to homepage
        // Clear any hash from URL
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        window.scrollTo(0, 0);
        // Clear any leftover flags
        sessionStorage.removeItem('scrollPosition');
        sessionStorage.removeItem('fromProjectDetail');
      }
      
      // Handle hash changes for sidebar navigation (only if not from project detail)
      const handleHashChange = () => {
        if (!fromProjectDetail) {
          const hash = window.location.hash;
          if (hash) {
            setTimeout(() => {
              const element = document.querySelector(hash);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }
      };
      
      window.addEventListener('hashchange', handleHashChange);
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [location]);

  // Don't show the nav on project detail pages
  const isProjectDetail = location.pathname.includes('/project/');

  // No background on the wrapper so the body crosshatch texture shows through
  return (
    <div className="min-h-screen text-white">
      <ScrollProgress />
      {!isProjectDetail && <PillNav />}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Publications />
                <Certifications />
                <Contact />
                <Footer />
              </main>
            }
          />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const basename = import.meta.env.PROD ? '/Krish_Nagaral' : '/';
  
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={basename}>
        <AppContent />
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;

