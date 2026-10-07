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
  
  // Formspree endpoint for contact form
  // Form ID: mjkjgvkq
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID 
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
    : 'https://formspree.io/f/mjkjgvkq';
  
  const isFormConfigured = true; // Form is now configured

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

  // Email is the primary button, LinkedIn and GitHub are glass buttons
  const buttonLabels = {
    Email: 'nagaralkrish@gmail.com',
    LinkedIn: 'LinkedIn',
    GitHub: 'GitHub',
  };

  const inputClass =
    'w-full px-4 py-3 bg-white/[0.04] border border-[color:var(--stroke)] rounded-ui-sm text-white focus:outline-none focus:border-green-hi transition-colors';

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-ui-xl p-[clamp(34px,6vw,64px)] text-center"
        >
          {/* Soft green glow behind the heading */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-180px] h-[360px] w-[520px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(29,185,84,0.16),transparent)]"
          />

          <div className="relative">
            <SectionTitle title="Get In Touch" subtitle="Let's collaborate on something amazing" />

            <h3 className="sr-only">Contact Information</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const isEmail = link.href.startsWith('mailto:');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isEmail ? '_self' : '_blank'}
                    rel={isEmail ? '' : 'noopener noreferrer'}
                    title={link.text}
                    className={isEmail ? 'btn btn-primary' : 'btn btn-glass glass'}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{buttonLabels[link.label]}</span>
                  </a>
                );
              })}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 max-w-xl space-y-6 border-t border-[color:var(--stroke)] pt-10 text-left"
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
                  className="bg-green-500/20 border border-green-500/50 rounded-ui-sm p-4 mb-4"
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
                  className="bg-red-500/20 border border-red-500/50 rounded-ui-sm p-4 mb-4"
                >
                  <p className="text-sm text-red-300">
                    ✗ Failed to send message. Please try again or contact me directly at{' '}
                    <a href="mailto:nagaralkrish@gmail.com" className="underline">nagaralkrish@gmail.com</a>
                  </p>
                </motion.div>
              )}

              <div>
                <label htmlFor="name" className="block text-text-2 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-text-2 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-text-2 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormConfigured}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                <span>
                  {isSubmitting
                    ? 'Sending...'
                    : !isFormConfigured
                      ? 'Form Not Configured'
                      : 'Send Message'}
                </span>
              </button>

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
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
