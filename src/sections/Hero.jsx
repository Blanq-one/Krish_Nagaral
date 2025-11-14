import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

// Helper function to get correct path for public assets
const getPublicPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl + cleanPath;
};

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 md:pt-0">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-hover mx-auto mb-6 overflow-hidden border-4 border-gray-800">
              <img
                src="/pfp.png"
                alt="Krish Nagaral"
                className="w-full h-full object-cover"
                onLoad={() => {
                  console.log("Profile picture loaded successfully from: /pfp.png");
                }}
                onError={(e) => {
                  console.error("Failed to load profile picture from: /pfp.png");
                  console.error("Trying full URL:", window.location.origin + "/pfp.png");
                  e.target.style.display = 'none';
                  if (!e.target.parentElement.querySelector('.pfp-fallback')) {
                    e.target.parentElement.innerHTML = '<div class="pfp-fallback w-full h-full flex items-center justify-center text-4xl font-bold text-black">KN</div>';
                  }
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Krish Nagaral
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-8"
          >
            AI/ML Engineer | Published Researcher | Cloud Computing Specialist
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto mb-12"
          >
            Developing production-ready AI systems, fine-tuning LLMs, and building scalable ML solutions. 
            Expertise in LLM optimization, RAG pipelines, and real-time AI applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center gap-6 mb-12"
          >
            <motion.a
              href="https://github.com/Blanq-one"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-spotify-grey hover:bg-spotify-green hover:text-black transition-colors text-white"
              aria-label="GitHub"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/krish-nagaral-7b9188238/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-spotify-grey hover:bg-spotify-green hover:text-black transition-colors text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:nagaralkrish@gmail.com"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-spotify-grey hover:bg-spotify-green hover:text-black transition-colors text-white"
              aria-label="Email"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={scrollToNext}
            whileHover={{ scale: 1.1, y: 5 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to About"
          >
            <ChevronDown size={32} className="animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

