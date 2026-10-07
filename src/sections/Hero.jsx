import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

// Staggered rise on load: each hero row fades up 90ms after the previous one
const rise = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: i * 0.09, ease: [0.2, 0.8, 0.2, 1] },
});

// Soft aurora blobs that drift slowly back and forth
const blobs = [
  { className: 'left-[12%] top-[-8%] h-[560px] w-[560px] bg-[rgba(29,185,84,0.22)]', to: { x: 90, y: 70, scale: 1.12 }, duration: 26 },
  { className: 'right-[6%] top-[8%] h-[480px] w-[480px] bg-[rgba(14,165,164,0.13)]', to: { x: -80, y: 60, scale: 1.08 }, duration: 32 },
  { className: 'left-[42%] top-[32%] h-[420px] w-[420px] bg-[rgba(59,130,246,0.10)]', to: { x: -60, y: -50, scale: 1.15 }, duration: 38 },
];

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center px-6 pt-[120px] pb-24 overflow-hidden">
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

      {/* Aurora, fading out toward the bottom of the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(180deg,#000_55%,transparent_100%)]"
      >
        {blobs.map((blob) => (
          <motion.i
            key={blob.duration}
            animate={blob.to}
            transition={{ duration: blob.duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            className={`absolute rounded-full blur-[90px] opacity-90 will-change-transform ${blob.className}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full text-center">
        <motion.h1
          {...rise(0)}
          className="m-0 pb-[0.12em] text-[clamp(3.3rem,10.5vw,8.6rem)] font-extrabold leading-[0.94] tracking-[-0.055em] bg-[linear-gradient(180deg,#fff_35%,#8d8d93_130%)] bg-clip-text text-transparent"
        >
          Krish Nagaral
        </motion.h1>

        <motion.p
          {...rise(1)}
          className="mx-auto mt-7 max-w-[34ch] text-[clamp(1.15rem,2.2vw,1.55rem)] font-medium leading-[1.35] tracking-[-0.015em] text-[#d2d2d7]"
        >
          AI/ML Engineer | Published Researcher | Cloud Computing Specialist
        </motion.p>

        <motion.p
          {...rise(2)}
          className="mx-auto mt-3.5 max-w-2xl text-text-2"
        >
          Developing production-ready AI systems, fine-tuning LLMs, and building scalable ML solutions. 
          Expertise in LLM optimization, RAG pipelines, and real-time AI applications.
        </motion.p>

        <motion.div {...rise(3)} className="mt-[34px] flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/Blanq-one"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            aria-label="GitHub"
          >
            <Github size={18} aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/krish-nagaral-7b9188238/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass glass"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:nagaralkrish@gmail.com"
            className="btn btn-glass glass"
            aria-label="Email"
          >
            <Mail size={18} aria-hidden="true" />
            <span>Email</span>
          </a>
        </motion.div>

        <motion.div {...rise(4)} className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={scrollToNext}
            className="rounded-full p-2 text-text-2 transition-colors hover:text-text"
            aria-label="Scroll to About"
          >
            <ChevronDown size={32} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
