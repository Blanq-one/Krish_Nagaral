import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

// Bento layout: story tile on the left, stats filling the right, every cell used.
// 1 column on phones, 2 on tablets, 4 on desktop.
const gridAreas =
  "[grid-template-areas:'story'_'highlight'_'accuracy'_'projects'_'certs'] " +
  "sm:grid-cols-2 sm:[grid-template-areas:'story_story'_'highlight_highlight'_'accuracy_projects'_'certs_certs'] " +
  "lg:grid-cols-4 lg:[grid-template-areas:'story_story_highlight_highlight'_'story_story_accuracy_projects'_'story_story_certs_certs']";

const tile = 'surface relative overflow-hidden rounded-ui-md flex flex-col justify-center';
const statNumber = 'text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-3';

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
          className={`grid grid-cols-1 gap-grid ${gridAreas}`}
        >
          <div className={`${tile} [grid-area:story] p-7 sm:p-9`}>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              I am an AI/ML Engineer and published researcher based in Boston, MA, with experience building production-grade AI
              systems, fine-tuning large language models, and deploying scalable solutions on the cloud. My work spans agentic
              AI and multi-agent systems, RAG pipelines, reinforcement learning, LLM optimization, and the MLOps tooling
              (MLflow, Prometheus, Grafana, gRPC) that takes models from notebook to reliable, observable production services.
            </p>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              I'm currently an MS in Computer Science student at Northeastern University (AI &amp; ML specialization, 2025–2027),
              building on my BTech in Computer Science from Vellore Institute of Technology. Through internships at Coutloot and
              Flyads.ai, I fine-tuned LLaMA/Gemma models with LoRA, improving LLM response accuracy to 86% on evaluation
              benchmarks, and deployed Docker-based FastAPI
              inference services handling 5,000+ concurrent requests. I'm AWS-certified (Solutions Architect, AI Practitioner,
              and Machine Learning Associate) and specialize in Computer Vision, NLP, Deep Learning, and Cloud Computing.
            </p>
            <p className="text-gray-200 text-lg leading-relaxed">
              I have a strong background in cloud infrastructure design, containerized deployments, and distributed systems, and
              I'm actively seeking roles as an AI/ML Engineer, Cloud Engineer, or Applied Scientist. My projects span agentic
              codebase assistants, reinforcement learning for race strategy, RAG document intelligence, explainable AI for
              healthcare, and vision-assistive technologies—all focused on real-world impact and engineering excellence.
            </p>
          </div>

          {/* The one loud tile */}
          <div
            className={`${tile} [grid-area:highlight] p-6 sm:p-7 border-transparent bg-[linear-gradient(145deg,#0b5f2c_0%,#18a34a_52%,#1ed760_100%)] text-[#03130a]`}
          >
            <h3 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-3">5K+</h3>
            <p className="text-[rgba(3,19,10,0.82)] text-lg font-medium">Concurrent Requests Served</p>
          </div>
          <div className={`${tile} [grid-area:accuracy] p-6 sm:p-7`}>
            <h3 className={`${statNumber} text-text`}>91%+</h3>
            <p className="text-text-2">ML Model Accuracy</p>
          </div>
          <div className={`${tile} [grid-area:projects] p-6 sm:p-7`}>
            <h3 className={`${statNumber} text-text`}>20+</h3>
            <p className="text-text-2">Projects Built</p>
          </div>
          <div className={`${tile} [grid-area:certs] p-6 sm:p-7`}>
            <h3 className={`${statNumber} text-text`}>8x</h3>
            <p className="text-text-2">Certifications (AWS &amp; AI)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
