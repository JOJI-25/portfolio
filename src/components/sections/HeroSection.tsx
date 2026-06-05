'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, FileDown, ChevronDown } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { fadeUp, staggerContainer } from '@/lib/animations';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to prevent SSR issues and reduce initial payload
const Hero3DScene = dynamic(() => import('@/components/3d/Hero3DScene'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin" />
    </div>
  )
});



// ── Typing animation hook ─────────────────────────────────────
function useTypingAnimation(phrases: string[]) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
    }
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return displayText;
}

// ── Component ─────────────────────────────────────────────────
export default function HeroSection() {
  const { profile: personalInfo, loading } = useProfile();
  const typedText = useTypingAnimation(personalInfo.typingPhrases);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background Full-Screen 3D Video Layer ──────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Hero3DScene />
        {/* Very subtle dark gradient overlay so the 3D scene shines through */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-24 pt-28">
        {/* ── Main content wrapper ──────────────────────────────────── */}
        <motion.div
          className="w-full max-w-2xl flex flex-col gap-5 bg-black/60 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-[0_8px_30px_rgb(229,9,20,0.15)]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-lg"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="gradient-text text-4xl sm:text-5xl md:text-[4rem] font-extrabold leading-tight"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Typing title */}
          <motion.p
            variants={fadeUp}
            className="text-accent-primary text-xl font-medium h-8"
            aria-live="polite"
          >
            <span className="typing-cursor">{typedText}</span>
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-text-secondary max-w-lg leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-2">
            <a
              id="hero-cta-projects"
              href="#projects"
              className="btn-primary"
              aria-label="Scroll to featured projects"
            >
              <FolderKanban size={18} />
              View Projects
            </a>
            <a
              id="hero-cta-resume"
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="Download resume PDF"
            >
              <FileDown size={18} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown
          size={22}
          className="text-text-muted animate-bounce-gentle"
        />
      </motion.div>
    </section>
  );
}
