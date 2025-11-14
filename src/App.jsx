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
      
      const scrollToHash = () => {
        const hash = window.location.hash;
        
        if (hash) {
          // If hash exists (e.g., #projects), scroll to it
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else if (!fromProjectDetail) {
          // If no hash and not from project detail, it's a refresh - go to homepage
          window.scrollTo(0, 0);
        }
        // If no hash and from project detail, browser preserves scroll position
      };

      scrollToHash();
      window.addEventListener('hashchange', scrollToHash);

      // Clear the flag after handling navigation
      if (fromProjectDetail) {
        sessionStorage.removeItem('fromProjectDetail');
      }

      return () => {
        window.removeEventListener('hashchange', scrollToHash);
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

