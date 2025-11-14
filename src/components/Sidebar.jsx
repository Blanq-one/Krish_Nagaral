import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, FolderOpen, BookOpen, Mail, X, Briefcase } from 'lucide-react';
import { useEffect } from 'react';

const sidebarItems = [
  { icon: Home, label: 'Home', href: '#hero' },
  { icon: User, label: 'About', href: '#about' },
  { icon: Code, label: 'Skills', href: '#skills' },
  { icon: Briefcase, label: 'Experience', href: '#experience' },
  { icon: FolderOpen, label: 'Projects', href: '#projects' },
  { icon: BookOpen, label: 'Publications', href: '#publications' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const handleClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose?.(); // Close mobile menu after navigation
  };

  useEffect(() => {
    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose?.();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 top-0 h-full w-64 bg-spotify-dark border-r border-gray-800 z-40 hidden md:flex flex-col"
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white">Krish Nagaral</h1>
          <p className="text-sm text-gray-400 mt-1">AI/ML Engineer | MSCS Student</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleClick(item.href)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-spotify-grey transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            © 2024 Krish Nagaral
          </p>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="fixed left-0 top-0 h-full w-64 bg-spotify-dark border-r border-gray-800 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Krish Nagaral</h1>
                  <p className="text-sm text-gray-400 mt-1">AI/ML Engineer | MSCS Student</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-spotify-grey text-gray-300 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleClick(item.href)}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-spotify-grey transition-colors group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 text-center">
                  © 2024 Krish Nagaral
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

