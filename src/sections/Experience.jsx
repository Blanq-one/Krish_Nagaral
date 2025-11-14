import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "AI Research & Tool Developer Intern",
      company: "Coutloot & Flyads.ai",
      location: "Mumbai",
      period: "May 2025 - Aug 2025",
      achievements: [
        "Built AI automation tools increasing workflow efficiency by 85%, fine-tuned LLaMA/Gemma models using LoRA, achieving 92% performance improvement",
        "Developed RAG pipelines using LangChain for context-aware automation with 97% accuracy",
        "Researched, trained, and deployed AI cloning models for human avatar generation, integrated into ad creation pipelines"
      ]
    },
    {
      id: 2,
      title: "Software Tester Intern",
      company: "Coutloot",
      location: "Mumbai",
      period: "Apr 2024 - Jun 2024",
      achievements: [
        "Designed testing frameworks, improving application stability by 88% with 99.8% product reliability before deployment",
        "Recorded and reported test cases, ensuring traceability and actionable insights for developers",
        "Improved application performance by systematically identifying and resolving bugs"
      ]
    },
    {
      id: 3,
      title: "Cloud Engineer Intern",
      company: "Tata Communications",
      location: "Mumbai",
      period: "Sep 2023 - Mar 2024",
      achievements: [
        "Contributed to team efforts in authoring deployment documentation and training materials to enhance onboarding efficiency",
        "Supported live systems by troubleshooting incidents and collaborating with cross-functional teams",
        "Applied best practices in AWS EC2, S3, and Lambda to deliver resilient cloud solutions"
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

