import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Publications from './sections/Publications';
import Contact from './sections/Contact';
import ProjectDetail from './pages/ProjectDetail';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Handle smooth scrolling for anchor links (only on home page)
    if (location.pathname === '/' || location.pathname === '/portfolio/') {
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

  // Don't show sidebar/navbar on project detail pages
  const isProjectDetail = location.pathname.includes('/project/');

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      {!isProjectDetail && (
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
      <div className={!isProjectDetail ? "md:ml-64" : ""}>
        {!isProjectDetail && (
          <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <main className="pt-16">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Publications />
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
  const basename = import.meta.env.PROD ? '/portfolio' : '/';
  
  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

