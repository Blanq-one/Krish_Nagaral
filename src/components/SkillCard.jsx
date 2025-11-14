import { motion } from 'framer-motion';

const SkillCard = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-spotify-grey rounded-lg p-5 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
        <span className="text-sm text-gray-400">{skill.level}%</span>
      </div>
      <div className="relative w-full bg-spotify-dark rounded-full h-2 overflow-visible">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-full bg-spotify-green group-hover:bg-spotify-green-hover transition-colors rounded-full"
        >
          {/* Circular handle at the end of green progress bar */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="absolute right-0 w-3 h-3 bg-white rounded-full shadow-md border border-gray-200 z-10"
            style={{ 
              top: '50%',
              transform: 'translateY(-50%) translateX(50%)'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillCard;

