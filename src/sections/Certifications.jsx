import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const Certifications = () => {
  const certifications = [
    { id: 1, name: "AWS Solutions Architect – Associate", issuer: "Amazon Web Services" },
    { id: 2, name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services" },
    { id: 3, name: "AWS Machine Learning – Associate", issuer: "Amazon Web Services" },
    { id: 4, name: "Prompt Engineering", issuer: "DeepLearning.AI" },
    { id: 5, name: "Machine Learning", issuer: "DeepLearning.AI" },
    { id: 6, name: "Model Context Protocol (MCP)", issuer: "Hugging Face" },
    { id: 7, name: "Retrieval-Augmented Generation (RAG)", issuer: "NVIDIA" },
    { id: 8, name: "Cybersecurity", issuer: "IBM" }
  ];

  return (
    <section id="certifications" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle title="Certifications" subtitle="Credentials and professional training" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-spotify-grey rounded-lg p-6 flex items-center gap-4 group"
            >
              <div className="p-3 rounded-lg bg-spotify-dark group-hover:bg-spotify-green transition-colors flex-shrink-0">
                <Award size={24} className="text-spotify-green group-hover:text-black transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-spotify-green transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
