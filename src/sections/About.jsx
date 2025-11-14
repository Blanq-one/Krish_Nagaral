import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle title="About Me" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-spotify-grey rounded-lg p-8 md:p-12"
        >
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            I am an AI/ML Engineer, Cloud Engineer, and published researcher with experience building production-grade AI systems, 
            fine-tuning large language models, and deploying scalable solutions on the cloud. My work focuses on LLM optimization, 
            RAG pipelines, real-time inference systems, and high-performance ML architectures.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            As an MSCS student at Northeastern University, I've gained hands-on industry experience through internships at 
            Coutloot and Flyads.ai, where I built AI automation tools that boosted workflow efficiency by 85% and fine-tuned 
            LLaMA/Gemma models to achieve a 92% performance improvement. I specialize in Computer Vision, NLP, Deep Learning, 
            and Cloud Computing (AWS-certified).
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            I also have a strong background in cloud infrastructure design, containerized deployments, and distributed systems, 
            and I am actively seeking roles as an AI/ML Engineer, Cloud Engineer, or Applied Scientist. My projects span 
            explainable AI for healthcare, legal document intelligence, multimodal emotion recognition, and vision-assistive 
            technologies—all focused on real-world impact and engineering excellence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-spotify-grey rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-spotify-green mb-2">91%+</h3>
            <p className="text-gray-400">ML Model Accuracy</p>
          </div>
          <div className="bg-spotify-grey rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-spotify-green mb-2">85%</h3>
            <p className="text-gray-400">Workflow Efficiency Gain</p>
          </div>
          <div className="bg-spotify-grey rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-spotify-green mb-2">9+</h3>
            <p className="text-gray-400">Production Projects</p>
          </div>
          <div className="bg-spotify-grey rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-spotify-green mb-2">AWS</h3>
            <p className="text-gray-400">Certified Professional</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

