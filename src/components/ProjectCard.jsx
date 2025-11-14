import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Save current scroll position before navigating
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="bg-spotify-grey rounded-lg overflow-hidden group cursor-pointer min-w-[300px] md:min-w-[350px]"
    >
      <div className="relative h-48 overflow-hidden bg-spotify-dark">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            console.error(`Failed to load image: ${project.image}`);
            const fullUrl = project.image.startsWith('http') 
              ? project.image 
              : `${window.location.origin}${project.image}`;
            console.error(`Trying to load from: ${fullUrl}`);
            e.target.style.display = 'none';
            if (!e.target.parentElement.querySelector('.error-message')) {
              const errorDiv = document.createElement('div');
              errorDiv.className = 'error-message w-full h-full flex items-center justify-center text-white text-sm';
              errorDiv.textContent = 'Image not found';
              e.target.parentElement.appendChild(errorDiv);
            }
          }}
          onLoad={() => {
            console.log(`Successfully loaded image: ${project.image}`);
          }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-spotify-dark text-xs text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={18} />
            <span className="text-sm">Code</span>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
              <span className="text-sm">Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

