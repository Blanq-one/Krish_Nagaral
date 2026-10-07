import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProjectTile from '../components/ProjectTile';
import { projects, projectCategories, getAllProjects } from '../data/projects';

const filters = [{ key: 'all', title: 'All' }, ...projectCategories];

// Project opened from the carousel, so "Back to Projects" can return to it
const RETURN_KEY = 'projectsCarouselId';

// Read once on mount: only when coming back through "Back to Projects",
// which sets the existing fromProjectDetail flag
const readReturnId = () => {
  if (typeof window === 'undefined') return null;
  const id = sessionStorage.getItem(RETURN_KEY);
  return id && sessionStorage.getItem('fromProjectDetail') ? Number(id) : null;
};

const Chevron = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);

// Cover tilt only for a real mouse or trackpad
const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Cover Flow depth for a tile at normalized distance d (-1 to 1) from the focus slot
const depthStyle = (d) => ({
  transform: `perspective(1000px) rotateY(${(-d * 30).toFixed(2)}deg) scale(${(1 - Math.abs(d) * 0.12).toFixed(3)})`,
  opacity: (1 - Math.abs(d) * 0.4).toFixed(3),
});

// Inset of the focus slot from the shelf's left edge, matching the shelf padding
const SLOT = 6;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [finePointer] = useState(hasFinePointer);
  const [focusIndex, setFocusIndex] = useState(0);
  const [returnId] = useState(readReturnId);
  const returnRef = useRef(returnId);
  const shuffleRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const shelfRef = useRef(null);
  const focusRef = useRef(0);
  const frameRef = useRef(0);
  const calmRef = useRef(reduceMotion);
  calmRef.current = reduceMotion;
  // Cached geometry so scroll frames never read layout
  const geometryRef = useRef({ lefts: [], inners: [], half: 0, slot: 0, range: 1, lastD: [] });

  const visible = useMemo(
    () => (filter === 'all' ? getAllProjects() : projects[filter] ?? []),
    [filter]
  );
  const canTilt = finePointer && !reduceMotion;

  // One pass per frame: find the tile nearest the left slot and update depth on
  // tiles whose depth changed. Far tiles stay clamped at +/-1 and are skipped.
  const updateDepth = () => {
    frameRef.current = 0;
    const shelf = shelfRef.current;
    const geo = geometryRef.current;
    if (!shelf || !geo.lefts.length) return;
    const focusX = shelf.scrollLeft + geo.slot;
    let best = 0;
    let bestDist = Infinity;
    geo.lefts.forEach((left, i) => {
      const dist = left + geo.half - focusX;
      if (Math.abs(dist) < bestDist) {
        bestDist = Math.abs(dist);
        best = i;
      }
      if (calmRef.current) return;
      const d = Math.round(Math.max(-1, Math.min(1, dist / geo.range)) * 1000) / 1000;
      if (geo.lastD[i] === d || !geo.inners[i]) return;
      geo.lastD[i] = d;
      Object.assign(geo.inners[i].style, depthStyle(d));
    });
    if (best !== focusRef.current) {
      focusRef.current = best;
      setFocusIndex(best);
    }
  };

  const scheduleDepth = () => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(updateDepth);
  };

  // Fade both edges once the shelf has scrolled away from the start
  const updateFade = () => {
    const shelf = shelfRef.current;
    if (shelf) shelf.classList.toggle('is-scrolled', shelf.scrollLeft > 2);
  };

  const handleScroll = () => {
    updateFade();
    scheduleDepth();
  };

  // Scroll so project i sits in the left slot
  const goTo = (i, instant = false) => {
    const shelf = shelfRef.current;
    const geo = geometryRef.current;
    if (!shelf || !geo.lefts.length) return;
    const index = Math.max(0, Math.min(geo.lefts.length - 1, i));
    shelf.scrollTo({
      left: Math.max(0, geo.lefts[index] - SLOT),
      behavior: instant || calmRef.current ? 'instant' : 'smooth',
    });
  };

  const shuffle = () => {
    const count = geometryRef.current.lefts.length;
    if (count < 2) return;
    let next = focusRef.current;
    while (next === focusRef.current) next = Math.floor(Math.random() * count);
    const button = shuffleRef.current;
    if (button && !calmRef.current) {
      button.classList.remove('spin');
      void button.offsetWidth;
      button.classList.add('spin');
    }
    goTo(next);
  };

  const handleKeyDown = (e) => {
    const count = geometryRef.current.lefts.length;
    const moves = { ArrowRight: focusRef.current + 1, ArrowLeft: focusRef.current - 1, Home: 0, End: count - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    goTo(moves[e.key]);
  };

  const handleFilter = (key) => {
    returnRef.current = null;
    setFilter(key);
  };

  // Right padding so the last tile can reach the left slot, then re-cache tile
  // offsets and repaint depth
  const layoutShelf = () => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    const geo = geometryRef.current;
    const items = [...shelf.children];
    if (!items.length) {
      geo.lefts = [];
      geo.inners = [];
      return;
    }
    const tileWidth = items[0].offsetWidth;
    shelf.style.paddingRight = `${Math.max(SLOT, shelf.clientWidth - tileWidth - SLOT)}px`;
    geo.half = tileWidth / 2;
    geo.slot = SLOT + tileWidth / 2;
    geo.range = shelf.clientWidth * 0.6 || 1;
    // Left padding is fixed, so offsets do not depend on the padding write above
    geo.lefts = items.map((el) => el.offsetLeft);
    geo.inners = items.map((el) => el.querySelector('[data-depth]'));
    geo.lastD = [];
    if (calmRef.current) {
      geo.inners.forEach((el) => {
        if (!el) return;
        el.style.transform = '';
        el.style.opacity = '';
      });
    }
    updateFade();
    updateDepth();
    // Snapping may settle a frame later; check again then
    scheduleDepth();
  };

  // Listeners go on before the first layout so the browser's re-snap after the
  // padding change is never missed
  useLayoutEffect(() => {
    const shelf = shelfRef.current;
    shelf.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', layoutShelf);
    window.addEventListener('load', layoutShelf);
    return () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      shelf.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', layoutShelf);
      window.removeEventListener('load', layoutShelf);
    };
  }, []);

  // New list (filter change): lay out and start on the first project, or on the
  // project that was opened when coming back from its detail page
  useLayoutEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    shelf.scrollLeft = 0;
    focusRef.current = 0;
    setFocusIndex(0);
    layoutShelf();
    const restoreIndex = visible.findIndex((p) => p.id === returnRef.current);
    if (restoreIndex > 0) {
      // Next frame, once the new padding has settled
      requestAnimationFrame(() => goTo(restoreIndex, true));
    }
  }, [visible]);

  useEffect(() => {
    sessionStorage.removeItem(RETURN_KEY);
  }, []);

  // Reduced motion toggled: flatten or restore depth
  useEffect(() => {
    layoutShelf();
  }, [reduceMotion]);

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
          <div className="shelf-wrap relative [--tile-w:clamp(212px,23vw,268px)]">
            <button
              type="button"
              className="edge edge-l"
              onClick={() => goTo(focusIndex - 1)}
              disabled={focusIndex <= 0}
              aria-label="Previous project"
            >
              <Chevron d="M15 5l-7 7 7 7" />
            </button>
            <button
              type="button"
              className="edge edge-r"
              onClick={() => goTo(focusIndex + 1)}
              disabled={focusIndex >= visible.length - 1}
              aria-label="Next project"
            >
              <Chevron d="M9 5l7 7-7 7" />
            </button>
            <ul
              ref={shelfRef}
              role="list"
              tabIndex={0}
              aria-label="Projects carousel"
              onKeyDown={handleKeyDown}
              className="shelf relative -mx-1.5 grid snap-x snap-mandatory scroll-pl-1.5 auto-cols-[var(--tile-w)] grid-flow-col gap-2.5 overflow-x-auto pb-[34px] pl-1.5 pt-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {visible.map((project, i) => (
                <li
                  key={project.id}
                  className={`snap-start [scroll-snap-stop:always] ${
                    i === focusIndex ? 'is-focus' : ''
                  }`}
                >
                  <ProjectTile
                    project={project}
                    canTilt={canTilt}
                    focused={i === focusIndex}
                    onCenter={() => goTo(i)}
                    onOpen={(id) => sessionStorage.setItem(RETURN_KEY, String(id))}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="pager">
            <button
              ref={shuffleRef}
              type="button"
              className="pg-b"
              onClick={shuffle}
              onAnimationEnd={(e) => e.currentTarget.classList.remove('spin')}
              disabled={visible.length < 2}
              aria-label="Shuffle projects"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 3h5v5" />
                <path d="M4 20L21 3" />
                <path d="M21 16v5h-5" />
                <path d="M15 15l6 6" />
                <path d="M4 4l5 5" />
              </svg>
            </button>
            <span>
              {visible.length ? focusIndex + 1 : 0} of {visible.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
