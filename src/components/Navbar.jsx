import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const Navbar = ({ onMenuToggle, isMenuOpen }) => {
  const handleMenuClick = () => {
    onMenuToggle?.();
  };

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 md:left-64 bg-spotify-dark/95 backdrop-blur-md border-b border-gray-800 z-50"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleMenuClick}
            className="md:hidden text-gray-300 hover:text-white transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-xl font-bold text-white hidden sm:block">Portfolio</h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResumeClick}
          className="flex items-center gap-2 px-4 py-2 bg-spotify-green hover:bg-spotify-green-hover text-black font-semibold rounded-full transition-colors"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Resume</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;

