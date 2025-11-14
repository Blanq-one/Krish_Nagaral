import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import SkillCard from '../components/SkillCard';
import { skills } from '../data/skills';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages', skills: skills.languages },
    { title: 'ML/AI', skills: skills.mlAi },
    { title: 'Computer Vision', skills: skills.computerVision },
    { title: 'Cloud / DevOps', skills: skills.cloudDevOps },
    { title: 'Databases', skills: skills.databases },
    { title: 'Tools', skills: skills.tools },
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Skills" subtitle="Technologies I work with" />
        
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

