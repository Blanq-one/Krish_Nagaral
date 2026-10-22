import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import CoverImage from './CoverImage';

// Shelf tile: square cover over a blurred copy of the same image, title and a
// 2-line description. The whole tile links to the project detail page.
// When canTilt is set, the cover tilts toward the cursor with a soft highlight.
// In the carousel, a click on a tile that is not focused only moves it to the focus slot.
const ProjectTile = ({ project, canTilt, focused = true, onCenter, onOpen }) => {
  const coverRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handleClick = (e) => {
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (!focused && !modified) {
      e.preventDefault();
      onCenter?.();
      return;
    }
    // Save current scroll position before navigating
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    onOpen?.(project.id);
  };

  const handlePointerMove = (e) => {
    const cover = coverRef.current;
    if (!canTilt || !cover) return;
    const rect = cover.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      cover.dataset.live = 'true';
      cover.style.setProperty('--ry', (x - 0.5).toFixed(3));
      cover.style.setProperty('--rx', (y - 0.5).toFixed(3));
      cover.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      cover.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    });
  };

  const handlePointerLeave = () => {
    const cover = coverRef.current;
    if (!canTilt || !cover) return;
    cancelAnimationFrame(frameRef.current);
    delete cover.dataset.live;
    cover.style.setProperty('--rx', '0');
    cover.style.setProperty('--ry', '0');
  };

  return (
    <Link
      to={`/project/${project.id}`}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group block rounded-ui-lg"
    >
      {/* Carousel depth goes on this wrapper so the snapped element stays untransformed */}
      <div
        data-depth
        className="rounded-ui-lg p-2.5 pb-4 [transform-origin:50%_55%] transition-colors duration-200 will-change-[transform,opacity] group-hover:bg-surface-2 group-focus-visible:bg-surface-2"
      >
        <div
          ref={coverRef}
          className="relative aspect-square overflow-hidden rounded-ui-sm bg-[#141416] shadow-[0_14px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform data-[live=true]:duration-[80ms] data-[live=true]:ease-linear"
          style={{
            transform:
              'perspective(800px) rotateX(calc(var(--rx, 0) * -6deg)) rotateY(calc(var(--ry, 0) * 6deg))',
          }}
        >
          <CoverImage src={project.image} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.18),transparent_55%)]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 z-[2] grid h-[46px] w-[46px] translate-y-2.5 place-items-center rounded-full bg-green-hi text-[#04130a] opacity-0 shadow-[0_10px_22px_rgba(0,0,0,0.45)] transition-[opacity,transform,background-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[#3be477] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
          >
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </span>
        </div>
        <h3 className="mx-1 mb-1 mt-4 text-[1.06rem] font-bold leading-tight tracking-[-0.012em] text-text">
          {project.title}
        </h3>
        <p className="mx-1 line-clamp-2 text-[0.9rem] leading-snug text-text-2">{project.description}</p>
      </div>
    </Link>
  );
};

export default ProjectTile;
