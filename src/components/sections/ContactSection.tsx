'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons/BrandIcons';
import { useProfile } from '@/hooks/useProfile';
import { slideLeft, slideRight } from '@/lib/animations';
import type { ContactFormData } from '@/types';

export default function ContactSection() {
  const { profile: personalInfo } = useProfile();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto-clear success message after 3 seconds
  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (error) setError('');
    },
    [error]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ensureHttps = (url: string) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  const socialLinks = [
    {
      id: 'social-linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      url: ensureHttps(personalInfo.linkedin),
      display: personalInfo.linkedin.replace(/^https?:\/\//, ''),
    },
    {
      id: 'social-github',
      icon: Github,
      label: 'GitHub',
      url: ensureHttps(personalInfo.github),
      display: personalInfo.github.replace(/^https?:\/\//, ''),
    },
    {
      id: 'social-email',
      icon: Mail,
      label: 'Email',
      url: `mailto:${personalInfo.email}`,
      display: personalInfo.email,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideLeft}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Get <span className="gradient-text">In Touch</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            Have a question or want to work together? Drop me a message!
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── Left: Contact Form ─────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={slideLeft}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8 space-y-5"
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-text-secondary mb-2 block"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-text-secondary mb-2 block"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-text-secondary mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  required
                  rows={5}
                  className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 outline-none transition resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-success text-sm"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Message sent successfully!
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                id="contact-submit"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full mt-4 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* ─── Right: Contact Info ────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={slideRight}
            className="flex flex-col gap-6"
          >
            {/* Intro */}
            <div>
              <p className="text-text-secondary text-lg leading-relaxed">
                I&apos;m actively seeking opportunities in Data Science and AI. Let&apos;s connect!
              </p>

              {/* Availability Indicator */}
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-sm text-text-secondary">
                  Available for opportunities
                </span>
              </div>
            </div>

            {/* Social Link Cards */}
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.id}
                    id={link.id}
                    href={link.url}
                    target={link.label !== 'Email' ? '_blank' : undefined}
                    rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="glass-card p-4 flex items-center gap-4 hover:border-accent-primary transition group"
                    style={{ borderColor: 'rgba(148, 163, 184, 0.08)' }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                      <IconComponent className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        {link.label}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        {link.display}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
