import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import CarouselRow from '../components/CarouselRow';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <SectionTitle title="Projects" subtitle="Featured work and research" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <CarouselRow title="AI/ML Projects" projects={projects.aiMl} />
          <CarouselRow title="Cloud / DevOps" projects={projects.cloudDevOps} />
          <CarouselRow title="Computer Vision" projects={projects.computerVision} />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

