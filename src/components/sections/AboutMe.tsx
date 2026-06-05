'use client';

import { motion } from 'framer-motion';
import { useProfile, defaultProfile } from '@/hooks/useProfile';
import { slideLeft, slideRight, staggerContainer, fadeUp } from '@/lib/animations';

// ─── Extract Initials ───────────────────────────────────────
function getInitials(name: string): string {
  if (!name) return "YN";
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function AboutMe() {
  const { profile: personalInfo, loading } = useProfile();
  const initials = getInitials(personalInfo.name);

  // ─── Info Card Data ─────────────────────────────────────────
  const infoCards = [
    {
      id: 'about-education',
      emoji: '🎓',
      title: 'Education',
      content: `${personalInfo.education} — ${personalInfo.university}`,
    },
    {
      id: 'about-career',
      emoji: '🎯',
      title: 'Career Objective',
      content: personalInfo.careerObjective,
    },
    {
      id: 'about-learning',
      emoji: '📚',
      title: 'Currently Learning',
      content: personalInfo.currentFocus,
    },
    {
      id: 'about-interests',
      emoji: '💡',
      title: 'Interests',
      content: personalInfo.interests.join(' • '),
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section Heading ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full gradient-bg" />
        </motion.div>

        {/* ─── Two-Column Layout ──────────────────────────── */}
        <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr]">
          {/* ── Left Column: Avatar ──────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={slideLeft}
            className="flex flex-col items-center"
          >
            {/* Gradient Border Ring */}
            <div className="gradient-bg rounded-full p-[3px] shadow-lg shadow-accent-primary/10">
              {/* Inner Circle */}
              <div
                className="flex h-48 w-48 items-center justify-center rounded-full bg-bg-elevated"
              >
                <span className="text-4xl font-bold gradient-text select-none">
                  {initials}
                </span>
              </div>
            </div>

            {/* Subtle glow */}
            <div className="mt-4 h-2 w-32 rounded-full bg-accent-primary/10 blur-xl" />

            {/* Name + Title */}
            <h3 className="mt-6 text-xl font-semibold text-text-primary">
              {personalInfo.name}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              {personalInfo.title}
            </p>
          </motion.div>

          {/* ── Right Column: Bio + Info Cards ───────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            {/* Bio */}
            <motion.p
              variants={slideRight}
              className="text-text-secondary leading-relaxed text-base"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {infoCards.map((card) => (
                <motion.div
                  key={card.id}
                  id={card.id}
                  variants={slideRight}
                  className="glass-card flex gap-3 p-4"
                >
                  {/* Emoji Icon */}
                  <span className="flex-shrink-0 text-2xl" aria-hidden="true">
                    {card.emoji}
                  </span>

                  {/* Text Content */}
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-text-primary">
                      {card.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-text-secondary leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
