'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons/BrandIcons';
import { useProfile } from '@/hooks/useProfile';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];


export default function Footer() {
  const { profile: personalInfo } = useProfile();

  const ensureHttps = (url: string) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  const socials = [
    {
      label: 'GitHub',
      href: ensureHttps(personalInfo.github),
      icon: Github,
    },
    {
      label: 'LinkedIn',
      href: ensureHttps(personalInfo.linkedin),
      icon: Linkedin,
    },
    {
      label: 'Email',
      href: personalInfo.email ? `mailto:${personalInfo.email}` : undefined,
      icon: Mail,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Three-column grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Left — Name & tagline */}
          <div className="flex flex-col gap-2">
            <span className="gradient-text text-xl font-bold">
              {personalInfo.name}
            </span>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              {personalInfo.title}
            </p>
          </div>

          {/* Middle — Quick links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-text-primary text-sm font-semibold uppercase tracking-wider mb-1">
              Quick Links
            </h4>
            {quickLinks.map((link) => (
              <a
                key={link.href}
                id={`footer-link-${link.label.toLowerCase()}`}
                href={link.href}
                className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — Social icons */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="text-text-primary text-sm font-semibold uppercase tracking-wider mb-1">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                if (!s.href) return null; // hide if user hasn't added social link
                return (
                  <a
                    key={s.label}
                    id={`footer-social-${s.label.toLowerCase()}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors duration-200"
                    aria-label={s.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>

          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer group"
          >
            Back to Top
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
