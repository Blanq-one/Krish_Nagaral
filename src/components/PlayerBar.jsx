import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { playerStore, prefersReducedMotion, usePlayerState } from './playerStore';

// Label and icon per section id. Unknown ids fall back to their id and a dot.
const META = {
  hero: ['Home', <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></>],
  about: ['About', <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>],
  skills: ['Skills', <><path d="M8 8l-5 4 5 4" /><path d="M16 8l5 4-5 4" /></>],
  experience: ['Experience', <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></>],
  projects: ['Projects', <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>],
  publications: ['Publications', <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /><path d="M4 19.5V21h16" /></>],
  certifications: ['Certifications', <><circle cx="12" cy="9" r="6" /><path d="M8.5 14.5L7 21l5-3 5 3-1.5-6.5" /></>],
  contact: ['Contact', <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 7l9 6 9-6" /></>],
};
const GRADIENTS = [
  ['#0f7a3a', '#1db954'], ['#0b6b5c', '#22c7a0'], ['#0b5f7a', '#2fb1e8'], ['#1f4fc4', '#4da3ff'],
  ['#0f7a3a', '#1ed760'], ['#0b6b5c', '#2dd4bf'], ['#1f4fc4', '#5eb0ff'], ['#0b5f7a', '#64d2ff'],
];
const SPEEDS = [0.5, 1, 1.5, 2];
const TOUR_SPEED = 220; // px per second at 1x
const ANCHOR_OFFSET = 96; // heading sits this far below the top
const SNAP_DISTANCE = 0.012;

const SHORTCUTS = [
  ['Space', 'Play or pause the tour'],
  ['← →', 'Previous or next'],
  ['Q', 'Queue'],
  ['M', 'Skip mode'],
  ['Esc', 'Close'],
];

// Keys that belong to a control with its own handling
const isTypingTarget = (t) =>
  t instanceof Element && !!t.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]');

const PlayerBar = () => {
  const barRef = useRef(null);
  const rangeRef = useRef(null);
  const ticksRef = useRef(null);
  const tipRef = useRef(null);
  const playRef = useRef(null);
  const speedIndexRef = useRef(1);
  const apiRef = useRef({});
  const queueBtnRef = useRef(null);
  const keysBtnRef = useRef(null);
  const popRef = useRef(null);
  const popStateRef = useRef(null);

  const [sections, setSections] = useState([]);
  const [fractions, setFractions] = useState([]);
  const [cur, setCur] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [pop, setPop] = useState(null); // 'queue' | 'keys' | null
  const reduceMotion = useReducedMotion();
  const projectNow = usePlayerState((s) => s.projects);
  const skipMode = usePlayerState((s) => s.skipMode);
  const touring = usePlayerState((s) => s.touring);

  useEffect(() => {
    const bar = barRef.current;
    const range = rangeRef.current;
    const scrub = range.parentNode;

    const secs = [...document.querySelectorAll('main section[id]')].map((el, i) => {
      const [label, icon] = META[el.id] ?? [el.id, <circle cx="12" cy="12" r="3" />];
      return { el, id: el.id, label, icon, grad: GRADIENTS[i % GRADIENTS.length] };
    });
    setSections(secs.map(({ id, label, icon, grad }) => ({ id, label, icon, grad })));

    let H = 1;
    let anchors = [];
    let fr = [];
    let curIdx = -1;
    let dragging = false;
    let pointerScrub = false;
    let touring = false;
    let tourY = 0;
    let tourRaf = 0;
    let tourLast = 0;
    let scrollTick = false;

    const measure = () => {
      H = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      anchors = secs.map((s, i) => {
        if (i === 0) return 0;
        const top = s.el.getBoundingClientRect().top + window.scrollY;
        const pad = parseFloat(getComputedStyle(s.el).paddingTop) || 0;
        return Math.max(0, Math.round(top + pad - ANCHOR_OFFSET));
      });
      fr = anchors.map((a) => Math.min(1, a / H));
      setFractions((prev) => (prev.join() === fr.join() ? prev : fr));
    };

    // Current section: the last one whose anchor is within 35% of the viewport ahead
    const indexFor = (f) => {
      if (f * H >= H - 4) return secs.length - 1;
      const lookAhead = (window.innerHeight * 0.35) / H;
      let idx = 0;
      fr.forEach((a, i) => {
        if (a <= f + lookAhead) idx = i;
      });
      return idx;
    };

    const render = () => {
      if (!secs.length) return;
      const y = window.scrollY;
      const f = Math.max(0, Math.min(1, y / H));
      const i = indexFor(f);
      if (i !== curIdx) {
        curIdx = i;
        setCur(i);
      }
      if (!dragging) range.value = Math.round(f * 1000);
      range.style.setProperty('--pf', f.toFixed(4));
      [...(ticksRef.current?.children ?? [])].forEach((tick, k) => {
        tick.classList.toggle('done', fr[k] <= f + 0.0005);
      });
      bar.classList.toggle('is-on', y > 120 || playerStore.get().born);
    };

    const stopTour = () => {
      if (!touring) return;
      touring = false;
      cancelAnimationFrame(tourRaf);
      bar.classList.remove('is-playing');
      playRef.current.setAttribute('aria-label', 'Play page tour');
      playerStore.set({ touring: false });
    };

    const stepTour = (ts) => {
      if (!touring) return;
      const dt = Math.min(0.1, (ts - tourLast) / 1000);
      tourLast = ts;
      tourY = Math.min(H, tourY + TOUR_SPEED * SPEEDS[speedIndexRef.current] * dt);
      window.scrollTo({ top: tourY, behavior: 'instant' });
      render();
      if (tourY >= H - 1) {
        stopTour();
        return;
      }
      tourRaf = requestAnimationFrame(stepTour);
    };

    const startTour = () => {
      if (prefersReducedMotion() || touring) return;
      if (window.scrollY >= H - 4) window.scrollTo({ top: 0, behavior: 'instant' });
      tourY = window.scrollY;
      touring = true;
      bar.classList.add('is-playing');
      playRef.current.setAttribute('aria-label', 'Pause tour');
      playerStore.set({ touring: true });
      tourLast = performance.now();
      tourRaf = requestAnimationFrame(stepTour);
    };

    const goTo = (i) => {
      stopTour();
      const target = anchors[Math.max(0, Math.min(secs.length - 1, i))];
      window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
    };

    // The bar appears in place (no slide) at the end of the hero morph
    const arrive = () => {
      playerStore.set({ born: true });
      bar.style.transition = 'none';
      bar.classList.add('is-on');
      void bar.offsetWidth;
      bar.style.transition = '';
      bar.classList.add('arrive');
      setTimeout(() => bar.classList.remove('arrive'), 700);
    };

    // In Projects with skip mode "project", prev/next step the carousel and
    // fall through to the neighboring section at either end
    const projectStep = (dir) => {
      const { projects, skipMode: mode } = playerStore.get();
      if (secs[curIdx]?.id !== 'projects' || mode !== 'project' || !projects) return false;
      const target = projects.index + dir;
      if (target < 0 || target >= projects.count) return false;
      stopTour();
      projects.goTo(target);
      return true;
    };

    apiRef.current = {
      prev: () => {
        if (projectStep(-1)) return;
        const inProjects = secs[curIdx]?.id === 'projects' && playerStore.get().skipMode === 'project';
        goTo(!inProjects && window.scrollY > anchors[curIdx] + 80 ? curIdx : curIdx - 1);
      },
      next: () => {
        if (projectStep(1)) return;
        if (curIdx < secs.length - 1) goTo(curIdx + 1);
      },
      toggle: () => (touring ? stopTour() : startTour()),
      jump: goTo,
    };
    playerStore.controller = {
      isOn: () => bar.classList.contains('is-on'),
      currentId: () => secs[curIdx]?.id,
      getBar: () => bar,
      arrive,
      startTour,
      refresh: render,
    };

    // Scrubber
    const showTip = (clientX, label) => {
      const r = scrub.getBoundingClientRect();
      const x = Math.max(16, Math.min(r.width - 16, clientX - r.left));
      tipRef.current.textContent = label;
      tipRef.current.style.left = `${x}px`;
      tipRef.current.classList.add('show');
    };
    const hideTip = () => tipRef.current.classList.remove('show');
    const onRangePointerDown = () => {
      pointerScrub = true;
      dragging = true;
    };
    const onPointerUp = () => {
      dragging = false;
      setTimeout(() => {
        pointerScrub = false;
      }, 80);
    };
    const onPointerCancel = () => {
      dragging = false;
    };
    const onRangeInput = () => {
      stopTour();
      window.scrollTo({ top: (range.value / 1000) * H, behavior: 'instant' });
      render();
    };
    // Snap to a nearby chapter tick on pointer release only, never for keyboard
    const onRangeChange = () => {
      if (!pointerScrub) return;
      const v = range.value / 1000;
      let best = -1;
      let d = SNAP_DISTANCE;
      fr.forEach((a, i) => {
        if (Math.abs(a - v) < d) {
          d = Math.abs(a - v);
          best = i;
        }
      });
      if (best > -1) goTo(best);
    };
    const onRangePointerMove = (e) => {
      if (e.pointerType === 'touch' || !secs.length) return;
      const r = range.getBoundingClientRect();
      const f = Math.max(0, Math.min(1, (e.clientX - r.left - 6) / (r.width - 12)));
      showTip(e.clientX, secs[indexFor(f)].label);
    };

    // Any wheel stops the tour; pointer presses, touch or keys only when outside the bar.
    // A press always lands before its click, so a click that starts the tour
    // (the hero pill) runs after this stop and is never cancelled by it.
    const onWheel = () => stopTour();
    const onOutside = (e) => {
      if (touring && !bar.contains(e.target)) stopTour();
    };
    const onScroll = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        scrollTick = false;
        render();
      });
    };
    const remeasure = () => {
      measure();
      curIdx = -1;
      render();
    };

    range.addEventListener('pointerdown', onRangePointerDown);
    range.addEventListener('input', onRangeInput);
    range.addEventListener('change', onRangeChange);
    range.addEventListener('pointermove', onRangePointerMove);
    range.addEventListener('pointerleave', hideTip);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('pointerdown', onOutside, { passive: true });
    window.addEventListener('touchstart', onOutside, { passive: true });
    window.addEventListener('keydown', onOutside);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure);
    window.addEventListener('load', remeasure);
    let alive = true;
    document.fonts?.ready.then(() => alive && remeasure());
    const main = document.querySelector('main');
    const observer = 'ResizeObserver' in window && main ? new ResizeObserver(remeasure) : null;
    observer?.observe(main);
    remeasure();

    return () => {
      alive = false;
      stopTour();
      playerStore.controller = null;
      observer?.disconnect();
      range.removeEventListener('pointerdown', onRangePointerDown);
      range.removeEventListener('input', onRangeInput);
      range.removeEventListener('change', onRangeChange);
      range.removeEventListener('pointermove', onRangePointerMove);
      range.removeEventListener('pointerleave', hideTip);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointerdown', onOutside);
      window.removeEventListener('touchstart', onOutside);
      window.removeEventListener('keydown', onOutside);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('load', remeasure);
    };
  }, []);

  // Ticks are re-rendered after a remeasure; repaint their done state
  useEffect(() => {
    playerStore.controller?.refresh();
  }, [fractions]);

  popStateRef.current = pop;

  const closePop = (returnFocus = false) => {
    const open = popStateRef.current;
    setPop(null);
    if (returnFocus && open) (open === 'queue' ? queueBtnRef : keysBtnRef).current?.focus();
  };

  const togglePop = (name) => setPop((p) => (p === name ? null : name));

  // Move focus into a popover when it opens: the current queue item, or the popover itself
  useEffect(() => {
    if (!pop) return;
    const el = popRef.current;
    (el?.querySelector('[aria-current="true"]') ?? el)?.focus({ preventScroll: true });
  }, [pop]);

  // Click or tap outside closes the open popover
  useEffect(() => {
    if (!pop) return undefined;
    const onDown = (e) => {
      const t = e.target;
      if (popRef.current?.contains(t) || queueBtnRef.current?.contains(t) || keysBtnRef.current?.contains(t)) return;
      setPop(null);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [pop]);

  // Shortcuts. Ignored while typing, with modifiers, inside the carousel or a
  // Swiper (they handle their own arrows), or while the bar is hidden.
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.shiftKey && e.key !== '?') return;
      const t = e.target;
      if (isTypingTarget(t)) return;
      if (t instanceof Element && t.closest('[aria-label="Projects carousel"], .swiper')) return;
      if (!playerStore.controller?.isOn()) return;
      const api = apiRef.current;
      const key = e.key;
      if (key === 'Escape') {
        if (popStateRef.current) {
          e.preventDefault();
          closePop(true);
        }
        return;
      }
      if (key === ' ' || key === 'Spacebar') {
        if (t instanceof Element && t.closest('button, a, [role="button"]')) return;
        if (prefersReducedMotion()) return;
        e.preventDefault();
        // The window-level "key outside the bar stops the tour" listener must not undo this
        e.stopPropagation();
        api.toggle?.();
      } else if (key === 'ArrowRight') {
        e.preventDefault();
        api.next?.();
      } else if (key === 'ArrowLeft') {
        e.preventDefault();
        api.prev?.();
      } else if (key === 'q' || key === 'Q') {
        setPop((p) => (p === 'queue' ? null : 'queue'));
      } else if (key === 'm' || key === 'M') {
        const { projects, skipMode: mode } = playerStore.get();
        const onProjects = playerStore.controller?.currentId?.() === 'projects';
        if (onProjects && projects) playerStore.set({ skipMode: mode === 'project' ? 'section' : 'project' });
      } else if (key === '?') {
        setPop((p) => (p === 'keys' ? null : 'keys'));
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const cycleSpeed = () => {
    const next = (speedIndexRef.current + 1) % SPEEDS.length;
    speedIndexRef.current = next;
    setSpeedIndex(next);
  };

  const section = sections[cur];
  const count = sections.length;
  const speedLabel = `${SPEEDS[speedIndex]}x`;
  const onProjects = section?.id === 'projects' && !!projectNow;
  const projectMode = onProjects && skipMode === 'project';
  const title = projectMode ? projectNow.title : section?.label;
  const subline = projectMode
    ? `Project ${projectNow.index + 1} of ${projectNow.count} \u00b7 ${projectNow.filterLabel}`
    : count
      ? `Section ${cur + 1} of ${count}`
      : '';
  const toggleMode = () => playerStore.set({ skipMode: projectMode ? 'section' : 'project' });

  return (
    <div ref={barRef} className="mp" role="group" aria-label="Page player">
      <div className="mp-row">
        <div
          className="mp-cover"
          aria-hidden="true"
          style={section ? { background: `linear-gradient(145deg, ${section.grad[0]}, ${section.grad[1]})` } : undefined}
        >
          <svg viewBox="0 0 24 24">{section?.icon}</svg>
        </div>
        <div className="mp-text">
          <strong>{title}</strong>
          <span>{subline}</span>
        </div>
        <i className="mp-eq" aria-hidden="true">
          <b /><b /><b /><b />
        </i>
        {onProjects && (
          <button
            type="button"
            className="mp-mode"
            onClick={toggleMode}
            aria-label={`Skip mode: ${projectMode ? 'by project' : 'by section'}. Switch`}
          >
            <span className="mp-long">{projectMode ? 'By project' : 'By section'}</span>
            <span className="mp-short" aria-hidden="true">{projectMode ? 'Proj' : 'Sect'}</span>
          </button>
        )}
        <button
          type="button"
          className="mp-speed"
          onClick={cycleSpeed}
          disabled={reduceMotion}
          aria-label={`Playback speed ${speedLabel}. Change speed`}
        >
          {speedLabel}
        </button>
        <div className="mp-ctrls">
          <button
            type="button"
            className="mp-b"
            onClick={() => apiRef.current.prev?.()}
            disabled={cur <= 0}
            aria-label={projectMode ? 'Previous project' : 'Previous section'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5l-9 7 9 7zM11 5l-9 7 9 7z" /></svg>
          </button>
          <button
            ref={playRef}
            type="button"
            className="mp-b mp-play"
            onClick={() => apiRef.current.toggle?.()}
            disabled={reduceMotion}
            title={reduceMotion ? 'Autoplay is off because reduced motion is on' : undefined}
            aria-label="Play page tour"
          >
            <svg className="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
            <svg className="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          </button>
          <button
            type="button"
            className="mp-b"
            onClick={() => apiRef.current.next?.()}
            disabled={count === 0 || cur >= count - 1}
            aria-label={projectMode ? 'Next project' : 'Next section'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l9 7-9 7zM13 5l9 7-9 7z" /></svg>
          </button>
          <button
            ref={queueBtnRef}
            type="button"
            className="mp-b mp-queue"
            onClick={() => togglePop('queue')}
            aria-expanded={pop === 'queue'}
            aria-controls="mp-queue"
            aria-label="Queue"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path className="mp-line" d="M3 6h13M3 12h13M3 18h8" />
              <path d="M17 13l5 3.5-5 3.5z" />
            </svg>
          </button>
          <button
            ref={keysBtnRef}
            type="button"
            className="mp-b mp-keys"
            onClick={() => togglePop('keys')}
            aria-expanded={pop === 'keys'}
            aria-controls="mp-keys"
            aria-label="Keyboard shortcuts"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect className="mp-line" x="2.5" y="6" width="19" height="12" rx="2.5" />
              <path className="mp-line" d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M7 14h10" />
            </svg>
          </button>
        </div>
      </div>
      {pop && (
        <div
          ref={popRef}
          id={pop === 'queue' ? 'mp-queue' : 'mp-keys'}
          className="mp-pop"
          role="dialog"
          aria-label={pop === 'queue' ? 'Queue' : 'Shortcuts'}
          tabIndex={-1}
        >
          {pop === 'queue' ? (
            <ol className="mp-qlist">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={i === cur ? 'is-cur' : ''}
                    aria-current={i === cur ? 'true' : undefined}
                    onClick={() => {
                      apiRef.current.jump?.(i);
                      closePop(true);
                    }}
                  >
                    <em>{i + 1}</em>
                    <span>{s.label}</span>
                    {i === cur && <small>Now playing</small>}
                    {i === cur + 1 && <small className="is-next">Next up</small>}
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <>
              <h3>Shortcuts</h3>
              <dl className="mp-klist">
                {SHORTCUTS.map(([k, d]) => (
                  <div key={k}>
                    <dt><kbd>{k}</kbd></dt>
                    <dd>{d}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      )}
      <div className="mp-scrub">
        <input
          ref={rangeRef}
          className="mp-range"
          type="range"
          min="0"
          max="1000"
          step="1"
          defaultValue="0"
          aria-label="Scroll through the page"
          aria-valuetext={section ? `${section.label}, section ${cur + 1} of ${count}` : undefined}
        />
        <i ref={ticksRef} className="mp-ticks" aria-hidden="true">
          {fractions.map((f, i) => (
            <b key={i} style={{ '--f': f.toFixed(4) }} />
          ))}
        </i>
        <span ref={tipRef} className="mp-tip" aria-hidden="true" />
      </div>
    </div>
  );
};

export default PlayerBar;
