import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, AlertCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  
  // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
  // Get it from: https://formspree.io/ (free service)
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID 
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
    : 'https://formspree.io/f/YOUR_FORM_ID';
  
  const isFormConfigured = !FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent submission if form is not configured
    if (!isFormConfigured) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.name}`
        }),
      });
      
      if (response.ok) {
        // Success
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        // Handle Formspree errors
        const data = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        console.error('Form submission error:', data);
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              {!isFormConfigured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-lg"
                >
                  <AlertCircle size={16} className="text-yellow-500" />
                  <span className="text-xs text-yellow-400">Not configured</span>
                </motion.div>
              )}
            </div>
            
            {!isFormConfigured && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-300 mb-2">
                  <strong>Form not configured:</strong> To enable the contact form, set up Formspree (free).
                </p>
                <p className="text-xs text-yellow-400">
                  Instructions: Go to <a href="https://formspree.io/" target="_blank" rel="noopener noreferrer" className="underline">formspree.io</a>, create a form, and add your Form ID to the code.
                </p>
              </div>
            )}
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4"
              >
                <p className="text-sm text-green-300">
                  ✓ Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4"
              >
                <p className="text-sm text-red-300">
                  ✗ Failed to send message. Please try again or contact me directly at{' '}
                  <a href="mailto:nagaralkrish@gmail.com" className="underline">nagaralkrish@gmail.com</a>
                </p>
              </motion.div>
            )}
            
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
              disabled={isSubmitting || !isFormConfigured}
              whileHover={isFormConfigured ? { scale: 1.05 } : {}}
              whileTap={isFormConfigured ? { scale: 0.95 } : {}}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-spotify-green hover:bg-spotify-green-hover text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              <span>
                {isSubmitting 
                  ? 'Sending...' 
                  : !isFormConfigured 
                    ? 'Form Not Configured' 
                    : 'Send Message'}
              </span>
            </motion.button>
            
            {!isFormConfigured && (
              <p className="text-xs text-gray-500 text-center">
                For now, please contact me directly via{' '}
                <a href="mailto:nagaralkrish@gmail.com" className="text-spotify-green hover:underline">
                  email
                </a>
                {' '}or{' '}
                <a href="https://linkedin.com/in/krish-nagaral-7b9188238/" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline">
                  LinkedIn
                </a>
                .
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

