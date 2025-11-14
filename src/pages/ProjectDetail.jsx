import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { projectDetails } from '../data/projectDetails';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find the project from all categories
  const allProjects = [
    ...projects.aiMl,
    ...projects.computerVision,
    ...projects.cloudDevOps,
    ...projects.research
  ];
  const project = allProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-spotify-green hover:bg-spotify-green-hover text-black font-semibold rounded-lg transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white pt-16">
      <div className="container mx-auto max-w-5xl px-6 py-12">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => {
                    // Mark that we're navigating from project detail (scroll position already saved)
                    sessionStorage.setItem('fromProjectDetail', 'true');
                    navigate('/');
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Projects</span>
                </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <img
                src={project.detailImage || project.image}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                onError={(e) => {
                  // Fallback to regular image if detailImage fails
                  if (project.detailImage && project.detailImage !== project.image) {
                    e.target.src = project.image;
                  } else {
                    e.target.style.display = 'none';
                  }
                }}
              />
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-spotify-grey text-sm text-gray-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex gap-4 mb-8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-spotify-grey hover:bg-spotify-green hover:text-black transition-colors rounded-lg font-semibold"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-spotify-green hover:bg-spotify-green-hover text-black transition-colors rounded-lg font-semibold"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              {/* Detailed Description */}
              {projectDetails[project.id] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-spotify-grey rounded-lg p-8 md:p-12 mt-8"
                >
                  {projectDetails[project.id].overview && (
                    <div className="mb-6">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {projectDetails[project.id].overview}
                      </p>
                    </div>
                  )}
                  
                  {projectDetails[project.id].features && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
                        {projectDetails[project.id].features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {projectDetails[project.id].technologies && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Technologies & Implementation</h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {projectDetails[project.id].technologies}
                      </p>
                    </div>
                  )}
                  
                  {projectDetails[project.id].challenges && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Challenges & Solutions</h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {projectDetails[project.id].challenges}
                      </p>
                    </div>
                  )}
                  
                  {projectDetails[project.id].results && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Results & Impact</h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {projectDetails[project.id].results}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

