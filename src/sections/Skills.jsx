import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { skills } from '../data/skills';

// Accent dot and chip hover tint per group. Only three accents are used;
// everything else stays neutral.
const accents = {
  neutral: { dot: 'bg-text', chip: 'hover:bg-text/10 hover:border-text/30' },
  green: { dot: 'bg-green-hi', chip: 'hover:bg-green-hi/15 hover:border-green-hi/45' },
  blue: { dot: 'bg-blue', chip: 'hover:bg-blue/15 hover:border-blue/45' },
  cyan: { dot: 'bg-cyan', chip: 'hover:bg-cyan/15 hover:border-cyan/45' },
};

// Listed in desktop order on a 6-column grid: 2+4, 4+2, 2+2+2.
// On tablets (2 columns) the order classes pair the small groups so no cell is empty:
// Languages | Computer Vision, ML/AI, DevOps / Cloud, MLOps & Deployment, Databases | Tools.
// Phones fall back to this list order in a single column.
const skillCategories = [
  { title: 'Languages', skills: skills.languages, accent: 'neutral', layout: 'sm:order-1 lg:col-span-2' },
  { title: 'ML/AI', skills: skills.mlAi, accent: 'green', layout: 'sm:order-3 sm:col-span-2 lg:col-span-4' },
  { title: 'DevOps / Cloud', skills: skills.cloudDevOps, accent: 'blue', layout: 'sm:order-4 sm:col-span-2 lg:col-span-4' },
  { title: 'Computer Vision', skills: skills.computerVision, accent: 'neutral', layout: 'sm:order-2 lg:col-span-2' },
  { title: 'MLOps & Deployment', skills: skills.mlops, accent: 'neutral', layout: 'sm:order-5 sm:col-span-2 lg:col-span-2' },
  { title: 'Databases', skills: skills.databases, accent: 'cyan', layout: 'sm:order-6 lg:col-span-2' },
  { title: 'Tools', skills: skills.tools, accent: 'neutral', layout: 'sm:order-7 lg:col-span-2' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Skills" subtitle="Technologies I work with" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-grid">
          {skillCategories.map((category, categoryIndex) => {
            const accent = accents[category.accent];

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className={`surface rounded-ui-md p-6 sm:px-7 lg:order-none ${category.layout}`}
              >
                <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-text mb-4">
                  <span className={`h-2 w-2 flex-none rounded-full ${accent.dot}`} aria-hidden="true" />
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className={`px-3.5 py-1.5 rounded-full bg-white/5 border border-[color:var(--stroke)] text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-default ${accent.chip}`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
