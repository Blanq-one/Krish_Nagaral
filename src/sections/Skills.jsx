import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import SkillCard from '../components/SkillCard';
import { skills } from '../data/skills';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages', skills: skills.languages },
    { title: 'ML/AI', skills: skills.mlAi },
    { title: 'Computer Vision', skills: skills.computerVision },
    { title: 'DevOps / Cloud', skills: skills.cloudDevOps },
    { title: 'MLOps & Deployment', skills: skills.mlops },
    { title: 'Databases', skills: skills.databases },
    { title: 'Tools', skills: skills.tools },
  ];

  // Number of "headline" skills shown with animated progress bars per category.
  const FEATURED_COUNT = 3;

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Skills" subtitle="Technologies I work with" />

        <div className="space-y-10">
          {skillCategories.map((category, categoryIndex) => {
            // Featured = the highest-proficiency skills (shown as bars)
            const featured = [...category.skills]
              .sort((a, b) => b.level - a.level)
              .slice(0, FEATURED_COUNT);
            const featuredNames = new Set(featured.map((s) => s.name));
            // Remaining skills are shown as compact chips
            const rest = category.skills.filter((s) => !featuredNames.has(s.name));

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-5">{category.title}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {featured.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>

                {rest.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {rest.map((skill) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 py-2 bg-spotify-grey text-sm text-gray-300 rounded-full hover:bg-spotify-green hover:text-black transition-colors cursor-default"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
