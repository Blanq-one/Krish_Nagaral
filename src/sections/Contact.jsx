import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Placeholder for Formspree integration
    // Replace with your Formspree endpoint
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
    
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:nagaralkrish@gmail.com', text: 'nagaralkrish@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/krish-nagaral-7b9188238/', text: 'linkedin.com/in/krish-nagaral-7b9188238' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/Blanq-one', text: 'github.com/Blanq-one' },
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle title="Get In Touch" subtitle="Let's collaborate on something amazing" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-spotify-grey rounded-lg p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-spotify-dark group-hover:bg-spotify-green transition-colors">
                      <Icon size={20} className="group-hover:text-black" />
                    </div>
                    <div>
                      <p className="font-semibold">{link.label}</p>
                      <p className="text-sm text-gray-500">{link.text}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-spotify-grey rounded-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-spotify-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-spotify-green transition-colors"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-spotify-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-spotify-green transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-spotify-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-spotify-green transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-spotify-green hover:bg-spotify-green-hover text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

