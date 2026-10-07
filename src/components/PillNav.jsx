import { useEffect, useRef, useState } from 'react';
import { getPublicPath } from '../utils/publicPath';

// Same targets and order as the old sidebar. Links scroll in place
// (no hash or route change), exactly as the sidebar did.
const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const PillNav = () => {
  const [active, setActive] = useState('#hero');
  const linksRef = useRef(null);

  // Highlight the section crossing the middle of the viewport
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navItems.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // On phones the links scroll sideways; keep the active one in view.
  // Only the links strip scrolls here, never the page.
  useEffect(() => {
    const strip = linksRef.current;
    const link = strip?.querySelector('[aria-current="true"]');
    if (!strip || !link || strip.scrollWidth <= strip.clientWidth) return;
    const left = link.offsetLeft - (strip.clientWidth - link.offsetWidth) / 2;
    strip.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  const handleClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    window.open(getPublicPath('Krish Nagaral.pdf'), '_blank');
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[calc(env(safe-area-inset-top,0px)+14px)]">
      <nav aria-label="Primary" className="glass pointer-events-auto flex max-w-full items-center gap-1.5 rounded-full p-1.5">
        <img
          src={getPublicPath('pfp.png')}
          alt="Krish Nagaral"
          className="mr-1 h-[34px] w-[34px] flex-none rounded-full border border-[color:var(--stroke-hi)] object-cover"
        />
        <div
          ref={linksRef}
          className="relative flex gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleClick(item.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                  isActive ? 'bg-white/[0.12] text-text' : 'text-text-2 hover:bg-white/[0.06] hover:text-text'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleResumeClick}
          className="btn btn-primary ml-1 hidden flex-none px-4 py-2 text-[0.88rem] min-[861px]:inline-flex"
        >
          Resume
        </button>
      </nav>
    </div>
  );
};

export default PillNav;
