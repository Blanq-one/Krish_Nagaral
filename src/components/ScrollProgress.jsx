import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

// Thin page progress bar fixed to the top of the viewport. The spring only
// smooths the bar's movement; with reduced motion it tracks scroll directly.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-green to-green-hi"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
    />
  );
};

export default ScrollProgress;
