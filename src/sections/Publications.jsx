import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { publications } from '../data/publications';

// Newest year first; within a year, in-progress before published; then the
// original array order. Entries without a year go last. Sorts a copy.
const sortedPublications = publications
  .map((pub, index) => ({ pub, index }))
  .sort((a, b) => {
    const yearA = Number(a.pub.year);
    const yearB = Number(b.pub.year);
    const hasA = a.pub.year != null && a.pub.year !== '' && !Number.isNaN(yearA);
    const hasB = b.pub.year != null && b.pub.year !== '' && !Number.isNaN(yearB);
    if (hasA !== hasB) return hasA ? -1 : 1;
    if (hasA && yearA !== yearB) return yearB - yearA;
    const progressA = a.pub.status === 'in-progress' ? 0 : 1;
    const progressB = b.pub.status === 'in-progress' ? 0 : 1;
    if (progressA !== progressB) return progressA - progressB;
    return a.index - b.index;
  })
  .map(({ pub }) => pub);

const Publications = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="publications" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle title="Publications" subtitle="Research papers and contributions" />

        <div className="grid gap-grid">
          {sortedPublications.map((pub, index) => {
            const inProgress = pub.status === 'in-progress';
            const meta = [pub.authors, pub.venue, pub.year].filter(Boolean).join(', ');
            return (
              <motion.article
                key={pub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className="surface grid items-center gap-x-7 gap-y-4 rounded-ui-md px-7 py-6 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                    <h3 className="m-0 text-[clamp(1.1rem,2vw,1.3rem)] font-bold leading-[1.3] tracking-[-0.018em] text-text">
                      {pub.title}
                    </h3>
                    {inProgress && (
                      <span className="inline-flex items-center whitespace-nowrap rounded-full border border-green/[0.32] bg-green/[0.15] px-[11px] py-[3px] text-[0.78rem] font-semibold text-green-hi">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[0.9rem] text-text-3">{meta}</p>
                  <p className="mt-3 leading-relaxed text-text-2">{pub.description}</p>
                </div>

                {inProgress ? (
                  <span className="inline-flex cursor-default select-none items-center gap-[9px] justify-self-start whitespace-nowrap rounded-full border border-[color:var(--stroke-hi)] px-4 py-[9px] text-[0.9rem] font-medium text-text-2">
                    <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-green-hi" />
                    In Progress
                  </span>
                ) : (
                  pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-glass glass gap-2.5 justify-self-start whitespace-nowrap py-1.5 pl-1.5 pr-[18px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 flex-none place-items-center rounded-full bg-green-hi text-[#04130a]"
                      >
                        <ArrowUpRight size={16} />
                      </span>
                      <span>View Paper</span>
                    </a>
                  )
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Publications;
