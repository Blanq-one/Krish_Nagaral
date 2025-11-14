import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Blanq-one', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/krish-nagaral-7b9188238/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:nagaralkrish@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-spotify-dark border-t border-gray-800 py-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Krish Nagaral. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

