import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import CoverImage from './CoverImage';
import { featuredProjects, getProjectById } from '../data/projects';

// Top-charts style shelf: three ranked picks. Each card is one link to the
// project detail page, so the play button is decorative (aria-hidden, not a button).
const FeaturedShelf = () => {
  const reduceMotion = useReducedMotion();
  const items = featuredProjects
    .map((f) => ({ ...f, project: getProjectById(f.id) }))
    .filter((f) => f.project);

  // Same as ProjectTile: remember scroll so "Back to Projects" lands here
  const handleClick = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  };

  return (
    <motion.ul
      role="list"
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.6 }}
      aria-label="Featured projects"
      className="-mx-6 mb-16 flex snap-x snap-mandatory scroll-pl-6 gap-[18px] overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
    >
      {items.map(({ id, title, blurb, badge, project }, i) => (
        <li key={id} className="w-[76%] shrink-0 snap-start md:w-auto">
          <Link
            to={`/project/${id}`}
            onClick={handleClick}
            className="group block h-full rounded-ui-md border border-[color:var(--stroke)] bg-surface p-[14px] transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-hi motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-square overflow-hidden rounded-ui-sm bg-[#141416]">
              <CoverImage src={project.image} />
              <span className="absolute left-3 top-3 z-[1] rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[0.78rem] font-bold text-text backdrop-blur-sm">
                #{i + 1}
              </span>
              {badge && (
                <span className="absolute right-3 top-3 z-[1] rounded-full border border-blue/40 bg-blue/15 px-2.5 py-0.5 text-[0.72rem] font-semibold text-blue backdrop-blur-sm">
                  {badge}
                </span>
              )}
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 z-[2] grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-green-hi text-[#04130a] opacity-0 shadow-[0_10px_22px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
              >
                <Play size={20} fill="currentColor" className="ml-0.5" />
              </span>
            </div>
            <h3 className="mb-1 mt-4 text-[1.125rem] font-bold leading-tight text-text transition-colors group-hover:text-green-hi motion-reduce:transition-none">
              {title}
            </h3>
            <p className="line-clamp-2 text-[0.9rem] leading-snug text-text-2">{blurb}</p>
          </Link>
        </li>
      ))}
    </motion.ul>
  );
};

export default FeaturedShelf;
