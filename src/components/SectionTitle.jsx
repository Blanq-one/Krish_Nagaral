import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionTitle;

