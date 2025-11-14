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
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 md:pt-0 overflow-hidden">
      {/* Faint neural net pattern background - 20% more visible */}
      <div className="absolute inset-0 opacity-[0.036] pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="75" cy="75" r="1.5" fill="#1db954" opacity="0.4" />
              <circle cx="25" cy="25" r="1" fill="#1db954" opacity="0.3" />
              <circle cx="125" cy="25" r="1" fill="#1db954" opacity="0.3" />
              <circle cx="25" cy="125" r="1" fill="#1db954" opacity="0.3" />
              <circle cx="125" cy="125" r="1" fill="#1db954" opacity="0.3" />
              <line x1="75" y1="75" x2="25" y2="25" stroke="#1db954" strokeWidth="0.3" opacity="0.2" />
              <line x1="75" y1="75" x2="125" y2="25" stroke="#1db954" strokeWidth="0.3" opacity="0.2" />
              <line x1="75" y1="75" x2="25" y2="125" stroke="#1db954" strokeWidth="0.3" opacity="0.2" />
              <line x1="75" y1="75" x2="125" y2="125" stroke="#1db954" strokeWidth="0.3" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      {/* Grid of projects fading in/out background - 20% more visible, 30% faster */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none overflow-hidden">
        <div className="grid grid-cols-3 gap-8 p-8 blur-sm">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.36, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5.6,
                repeat: Infinity,
                delay: i * 0.63,
                ease: "easeInOut",
              }}
              className="aspect-square bg-spotify-green rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: 0.14 }}
            className="mb-8 relative"
          >
            {/* Rotating glow animation behind avatar - 20% more visible, 30% faster */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.12, 1],
              }}
              transition={{
                rotate: {
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-spotify-green/24 via-spotify-green/12 to-transparent blur-2xl pointer-events-none"
            />
            
            {/* Glowing green border around photo */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(29,185,84,0.6), 0 0 40px rgba(29,185,84,0.4), 0 0 60px rgba(29,185,84,0.2)',
                  '0 0 30px rgba(29,185,84,0.8), 0 0 50px rgba(29,185,84,0.6), 0 0 70px rgba(29,185,84,0.4)',
                  '0 0 20px rgba(29,185,84,0.6), 0 0 40px rgba(29,185,84,0.4), 0 0 60px rgba(29,185,84,0.2)',
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-hover mx-auto mb-6 overflow-hidden border-4 border-spotify-green z-10"
            >
              <img
                src={getPublicPath("pfp.png")}
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
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, delay: 0.28 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Krish Nagaral
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.42 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            AI/ML Engineer | Published Researcher | Cloud Computing Specialist
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.56 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Developing production-ready AI systems, fine-tuning LLMs, and building scalable ML solutions. 
            Expertise in LLM optimization, RAG pipelines, and real-time AI applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.7 }}
            className="flex justify-center gap-6 mb-12"
          >
            <motion.a
              href="https://github.com/Blanq-one"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -2.4, 0] }}
              transition={{
                y: {
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.1, y: -5 }}
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
              animate={{ y: [0, -2.4, 0] }}
              transition={{
                y: {
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.14,
                },
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-spotify-grey hover:bg-spotify-green hover:text-black transition-colors text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:nagaralkrish@gmail.com"
              animate={{ y: [0, -2.4, 0] }}
              transition={{
                y: {
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.28,
                },
              }}
              whileHover={{ scale: 1.1, y: -5 }}
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
            transition={{ duration: 0.42, delay: 0.84 }}
            onClick={scrollToNext}
            whileHover={{ scale: 1.1, y: 5 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to About"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [0.72, 1, 0.72],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

