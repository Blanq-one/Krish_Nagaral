import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { publications } from '../data/publications';

const Publications = () => {
  return (
    <section id="publications" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle title="Publications" subtitle="Research papers and contributions" />
        
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-spotify-grey rounded-lg p-6 md:p-8 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-spotify-green transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{pub.authors}</p>
                  <p className="text-gray-500 text-sm">
                    {pub.venue} • {pub.year}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">{pub.description}</p>
              
              <div className="flex gap-4">
                <a
                  href={pub.pdf || pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                  <span className="text-sm">View Paper</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;

