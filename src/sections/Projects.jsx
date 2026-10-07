import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProjectTile from '../components/ProjectTile';
import { projects, projectCategories, getAllProjects } from '../data/projects';

const filters = [{ key: 'all', title: 'All' }, ...projectCategories];

// Cover tilt only for a real mouse or trackpad
const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [finePointer] = useState(hasFinePointer);
  const reduceMotion = useReducedMotion();
  const shelfRef = useRef(null);

  const visible = filter === 'all' ? getAllProjects() : projects[filter] ?? [];
  const canTilt = finePointer && !reduceMotion;

  const handleFilter = (key) => {
    setFilter(key);
    if (shelfRef.current) shelfRef.current.scrollLeft = 0;
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-x-4">
          <SectionTitle title="Projects" subtitle="Featured work and research" />
          <div
            role="group"
            aria-label="Filter projects"
            className="mb-8 inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-[color:var(--stroke)] bg-surface p-[3px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filters.map(({ key, title }) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => handleFilter(key)}
                className="whitespace-nowrap rounded-full px-3.5 py-[7px] text-[0.88rem] font-semibold text-text-2 transition-colors hover:text-text aria-pressed:bg-white/[0.12] aria-pressed:text-text"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ul
            ref={shelfRef}
            role="list"
            className="-mx-1.5 grid snap-x snap-proximity auto-cols-[clamp(212px,23vw,268px)] grid-flow-col gap-2.5 overflow-x-auto px-1.5 pb-[30px] pt-1.5 [mask-image:linear-gradient(90deg,#000_90%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((project) => (
              <li key={project.id} className="snap-start">
                <ProjectTile project={project} canTilt={canTilt} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
