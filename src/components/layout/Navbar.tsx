'use client';

import { useState, useEffect, useCallback } from 'react';
import { FileDown, Menu, X } from 'lucide-react';
import { navItems } from '@/lib/data';
import { useProfile } from '@/hooks/useProfile';
import MobileNav from './MobileNav';

export default function Navbar() {
  const { profile: personalInfo } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // ── Glassmorphism on scroll ────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scroll-spy with IntersectionObserver ───────────────────
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // ── Scroll to top ─────────────────────────────────────────
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Lock body scroll when mobile nav is open ──────────────
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-200 ${
          scrolled
            ? 'glass-strong shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ── Logo / Name ─────────────────────────────────── */}
          <button
            id="nav-logo"
            onClick={scrollToTop}
            className="gradient-text text-xl font-bold tracking-tight cursor-pointer select-none"
          >
            {personalInfo.name}
          </button>

          {/* ── Desktop Nav Links ───────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    id={`nav-link-${item.label.toLowerCase()}`}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-gray-300'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {item.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 rounded-full bg-accent-primary" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right actions ───────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Resume button */}
            <a
              id="nav-resume-btn"
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost hidden sm:inline-flex !py-2 !px-4 !text-xs"
            >
              <FileDown size={16} />
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors"
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Nav Overlay ──────────────────────────────── */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}
