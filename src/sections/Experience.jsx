import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "AI/ML Engineer Intern",
      company: "Coutloot & Flyads.ai",
      location: "Mumbai",
      period: "Aug 2024 - Aug 2025",
      achievements: [
        "Improved LLM response accuracy to 86% on evaluation benchmarks by fine-tuning LLaMA and Gemma with LoRA, powering prompt and script generation for the video pipeline",
        "Scaled the AI backend horizontally to 5,000+ concurrent requests by building Docker-based FastAPI microservices around LLM inference pipelines",
        "Reached 97% contextual retrieval precision by designing RAG pipelines with vector embeddings and semantic search",
        "Cut API latency by 38% by adding asynchronous processing, request batching, optimized caching, and better GPU utilization",
        "Improved system reliability by adding structured logging, centralized error handling, and real-time model monitoring dashboards",
        "Built the generation backend for an AI video marketing tool: async FastAPI job processing around Sora, with fine-tuned LLaMA models writing the prompts, scripts, and captions for on-demand seller videos",
        "Optimized Sora video generation with reinforcement learning, using seller engagement as the reward to tune presenter presets",
        "Connected LLM outputs to backend services through function calling, triggering Sora render jobs and returning finished videos to sellers"
      ]
    },
    {
      id: 2,
      title: "Software Tester Intern",
      company: "Coutloot",
      location: "Mumbai",
      period: "Apr 2024 - Jun 2024",
      achievements: [
        "Reached 88% defect detection coverage by designing automated and manual testing workflows for backend services",
        "Ensured 99.8% production stability at release by running regression testing and performance benchmarking",
        "Sped up developer fixes by documenting API behavior, edge cases, and failure scenarios with traceable test cases"
      ]
    },
    {
      id: 3,
      title: "Software & Cloud Engineer Intern",
      company: "Tata Communications",
      location: "Mumbai",
      period: "Sep 2023 - Mar 2024",
      achievements: [
        "Accelerated release cycles by 60% by implementing AWS-based infrastructure and service orchestration across EC2, S3, and Lambda",
        "Sustained 99.9% application uptime by supporting EC2, S3, IAM, and VPC based production systems",
        "Improved IoT-to-cloud pipeline performance by 63% by profiling and tuning bottlenecks across device ingestion and cloud processing",
        "Supported production incident resolution on live systems by analyzing logs and debugging network failures with cross-functional teams",
        "Deployed software releases across AWS environments, coordinating with developers to keep test and production setups consistent",
        "Streamlined onboarding by authoring deployment documentation and training materials"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle title="Experience" subtitle="Professional journey and achievements" />
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-spotify-grey rounded-lg p-6 md:p-8 relative"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="text-spotify-green" size={24} />
                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                  </div>
                  <p className="text-xl text-spotify-green font-semibold mb-3">{exp.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <ul className="mt-6 space-y-3">
                {exp.achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-spotify-green mt-1.5">▸</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

