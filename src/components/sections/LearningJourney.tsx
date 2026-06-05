'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight } from '@/lib/animations';
import { CheckCircle2, RefreshCw, Lock } from 'lucide-react';
import type { JourneyItem } from '@/types';

// ─── Status Config ──────────────────────────────────────────
const statusConfig = {
  completed: {
    ringClasses: 'bg-success/20 border-success',
    Icon: CheckCircle2,
    iconClasses: 'text-success',
    extraClasses: '',
  },
  learning: {
    ringClasses: 'bg-warning/20 border-warning animate-pulse-glow',
    Icon: RefreshCw,
    iconClasses: 'text-warning animate-spin',
    extraClasses: '',
  },
  upcoming: {
    ringClasses: 'bg-locked/20 border-locked',
    Icon: Lock,
    iconClasses: 'text-locked',
    extraClasses: 'opacity-60',
  },
} as const;

// ─── Timeline Node ──────────────────────────────────────────
function TimelineNode({ item }: { item: JourneyItem }) {
  const cfg = statusConfig[item.status];
  const NodeIcon = cfg.Icon;

  return (
    <div
      className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 ${cfg.ringClasses}`}
    >
      <NodeIcon
        className={`h-4 w-4 ${cfg.iconClasses}`}
        style={
          item.status === 'learning'
            ? { animationDuration: '3s' }
            : undefined
        }
      />
    </div>
  );
}

// ─── Timeline Card ──────────────────────────────────────────
function TimelineCard({ item }: { item: JourneyItem }) {
  const cfg = statusConfig[item.status];

  return (
    <div className={`glass-card p-5 ${cfg.extraClasses}`}>
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {item.icon}
          </span>
          <h3 className="text-lg font-semibold text-text-primary">
            {item.skill}
          </h3>
        </div>
        {item.date && (
          <span className="flex-shrink-0 text-xs text-text-muted">
            {item.date}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {item.description}
      </p>

      {/* Progress Bar (learning items) */}
      {item.status === 'learning' && item.progress != null && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-warning">
              In Progress
            </span>
            <span className="text-xs font-semibold text-warning">
              {item.progress}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Project Count (completed items) */}
      {item.status === 'completed' && item.projectCount != null && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
            {item.projectCount} project{item.projectCount !== 1 ? 's' : ''} completed
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────
export default function LearningJourney() {
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/journey', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => { if (data && data.error) throw new Error('API Error'); if (!Array.isArray(data)) data = []; if (!Array.isArray(data)) { throw new Error('API returned non-array'); }
        setJourneyItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch journey items:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="journey" className="section-padding">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section Heading ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            My <span className="gradient-text">Learning Journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            From spreadsheets to deep learning — tracking every milestone on the
            path to becoming a Data Scientist.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full gradient-bg" />
        </motion.div>

        {/* ─── Timeline ───────────────────────────────────── */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute top-0 bottom-0 left-6 w-0.5 lg:left-1/2 lg:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, var(--success), var(--warning) 50%, var(--locked))',
            }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="relative animate-pulse">
                    {/* Mobile Layout */}
                    <div className="flex items-start gap-4 lg:hidden">
                      <div className="h-10 w-10 rounded-full bg-bg-elevated border border-border/40 flex-shrink-0" />
                      <div className="h-28 bg-bg-elevated rounded-xl border border-border/40 flex-1 min-w-0" />
                    </div>
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-8">
                      {isEven ? (
                        <div className="flex justify-end w-full">
                          <div className="w-full max-w-md h-28 bg-bg-elevated rounded-xl border border-border/40" />
                        </div>
                      ) : (
                        <div />
                      )}
                      <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full bg-bg-elevated border border-border/40" />
                      </div>
                      {!isEven ? (
                        <div className="flex justify-start w-full">
                          <div className="w-full max-w-md h-28 bg-bg-elevated rounded-xl border border-border/40" />
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              journeyItems.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    id={`journey-${item.id}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={fadeUp}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* ── Mobile Layout (always right of line) ── */}
                    <div className="flex items-start gap-4 lg:hidden">
                      {/* Node */}
                      <div className="flex-shrink-0">
                        <TimelineNode item={item} />
                      </div>
                      {/* Card */}
                      <div className="min-w-0 flex-1">
                        <TimelineCard item={item} />
                      </div>
                    </div>

                    {/* ── Desktop Layout (alternating) ───────── */}
                    <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-8">
                      {/* Left Side */}
                      {isEven ? (
                        <motion.div
                          variants={slideLeft}
                          className="flex justify-end"
                        >
                          <div className="w-full max-w-md">
                            <TimelineCard item={item} />
                          </div>
                        </motion.div>
                      ) : (
                        <div /> /* empty spacer */
                      )}

                      {/* Center Node */}
                      <div className="flex justify-center">
                        <TimelineNode item={item} />
                      </div>

                      {/* Right Side */}
                      {!isEven ? (
                        <motion.div
                          variants={slideRight}
                          className="flex justify-start"
                        >
                          <div className="w-full max-w-md">
                            <TimelineCard item={item} />
                          </div>
                        </motion.div>
                      ) : (
                        <div /> /* empty spacer */
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
