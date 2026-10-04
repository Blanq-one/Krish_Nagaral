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
            I am an AI/ML Engineer and published researcher based in Boston, MA, with experience building production-grade AI
            systems, fine-tuning large language models, and deploying scalable solutions on the cloud. My work spans agentic
            AI and multi-agent systems, RAG pipelines, reinforcement learning, LLM optimization, and the MLOps tooling
            (MLflow, Prometheus, Grafana, gRPC) that takes models from notebook to reliable, observable production services.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            I'm currently an MS in Computer Science student at Northeastern University (AI &amp; ML specialization, 2025–2027),
            building on my BTech in Computer Science from Vellore Institute of Technology. Through internships at Coutloot and
            Flyads.ai, I fine-tuned LLaMA/Gemma models for a 92% accuracy improvement and deployed Docker-based FastAPI
            inference services handling 5,000+ concurrent requests. I'm AWS-certified (Solutions Architect, AI Practitioner,
            and Machine Learning Associate) and specialize in Computer Vision, NLP, Deep Learning, and Cloud Computing.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            I have a strong background in cloud infrastructure design, containerized deployments, and distributed systems, and
            I'm actively seeking roles as an AI/ML Engineer, Cloud Engineer, or Applied Scientist. My projects span agentic
            codebase assistants, reinforcement learning for race strategy, RAG document intelligence, explainable AI for
            healthcare, and vision-assistive technologies—all focused on real-world impact and engineering excellence.
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
            <h3 className="text-3xl font-bold text-spotify-green mb-2">20+</h3>
            <p className="text-gray-400">Projects Built</p>
          </div>
          <div className="bg-spotify-grey rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-spotify-green mb-2">5K+</h3>
            <p className="text-gray-400">Concurrent Requests Served</p>
          </div>
          <div className="bg-spotify-grey rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-spotify-green mb-2">8x</h3>
            <p className="text-gray-400">Certifications (AWS &amp; AI)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

