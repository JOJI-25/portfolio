'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations';

import type { Variants } from 'framer-motion';

const earnedBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: [1.0, 1.08, 1.0],
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

import type { Achievement } from '@/types';

export default function AchievementBadges() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            Milestones and badges earned along my data science journey.
          </p>
        </motion.div>

        {/* Badge Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-16 text-text-secondary">
            <Lock className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-40" />
            <p>No achievements added yet.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {achievements.map((badge) => {
              const isEarned = badge.status === 'earned';
              const isInProgress = badge.status === 'in-progress';
              const isLocked = badge.status === 'locked';

              // Progress ring calculation
              const circumference = 2 * Math.PI * 28; // radius 28
              const progressOffset = isInProgress && badge.progress
                ? circumference - (badge.progress / 100) * circumference
                : circumference;

              return (
                <motion.article
                  key={badge.id}
                  variants={isEarned ? earnedBounce : scaleIn}
                  className={`glass-card p-5 text-center flex flex-col items-center ${
                    isLocked ? 'opacity-50' : ''
                  }`}
                >
                  {/* Badge Icon Circle */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl ${
                        isEarned
                          ? 'gradient-border'
                          : isInProgress
                          ? 'border-2 border-warning'
                          : 'border-2 border-locked/30'
                      }`}
                    >
                      <span
                        className={
                          isLocked ? 'grayscale opacity-40' : ''
                        }
                      >
                        {badge.icon}
                      </span>
                    </div>

                    {/* SVG Progress Ring for in-progress */}
                    {isInProgress && (
                      <svg
                        className="absolute inset-0 -rotate-90"
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="rgba(245, 158, 11, 0.2)"
                          strokeWidth="3"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={progressOffset}
                          className="transition-all duration-1000"
                        />
                      </svg>
                    )}

                    {/* Lock overlay for locked badges */}
                    {isLocked && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-bg-card flex items-center justify-center border border-border">
                        <Lock className="w-3 h-3 text-locked" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-sm text-text-primary mt-3">
                    {badge.title}
                  </h3>

                  {/* Star Rating */}
                  <div className="flex gap-0.5 mt-1.5" aria-label={`${badge.level} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < badge.level
                            ? 'text-warning text-sm'
                            : 'text-locked/30 text-sm'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Status Text */}
                  <span
                    className={`text-xs mt-1 font-medium ${
                      isEarned
                        ? 'text-success'
                        : isInProgress
                        ? 'text-warning'
                        : 'text-locked'
                    }`}
                  >
                    {isEarned
                      ? 'EARNED'
                      : isInProgress
                      ? 'IN PROGRESS'
                      : 'LOCKED'}
                  </span>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
