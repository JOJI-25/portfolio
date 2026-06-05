'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations';
import { CheckCircle2, RefreshCw, Lock, ChevronDown } from 'lucide-react';
import type { Skill } from '@/types';
import { skills as defaultSkills } from '@/lib/data';

// ─── Status Helpers ─────────────────────────────────────────
const statusBorder: Record<Skill['status'], string> = {
  completed: 'border-l-success',
  learning: 'border-l-warning',
  upcoming: 'border-l-locked',
};

const statusConnector: Record<Skill['status'], string> = {
  completed: 'bg-success',
  learning: 'bg-warning border-l border-dashed border-warning',
  upcoming: 'bg-locked/30',
};

function StatusBadge({ status, progress }: { status: Skill['status']; progress?: number }) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
          Completed ✓
        </span>
      );
    case 'learning':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-medium text-warning">
          Learning {progress ?? 0}%
        </span>
      );
    case 'upcoming':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-locked/10 px-2 py-0.5 text-[11px] font-medium text-locked">
          Locked 🔒
        </span>
      );
  }
}

function StatusIcon({ status }: { status: Skill['status'] }) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-3.5 w-3.5 text-success" />;
    case 'learning':
      return (
        <RefreshCw
          className="h-3.5 w-3.5 text-warning animate-spin"
          style={{ animationDuration: '3s' }}
        />
      );
    case 'upcoming':
      return <Lock className="h-3.5 w-3.5 text-locked" />;
  }
}

// ─── Connector ──────────────────────────────────────────────
function Connector({ status }: { status: Skill['status'] }) {
  return (
    <div
      className={`mx-auto h-8 w-0.5 ${statusConnector[status]}`}
    />
  );
}

// ─── Skill Node Card ────────────────────────────────────────
function SkillNode({
  skill,
  isSelected,
  onToggle,
  index,
}: {
  skill: Skill;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}) {
  const isLocked = skill.status === 'upcoming';

  return (
    <motion.div
      variants={scaleIn}
      transition={{ delay: index * 0.2 }}
      className="w-48 mx-auto"
    >
      {/* Main Card */}
      <button
        id={`skill-node-${skill.id}`}
        type="button"
        onClick={onToggle}
        className={`glass-card w-full border-l-[3px] p-4 text-left transition-all ${statusBorder[skill.status]} ${
          isLocked ? 'opacity-50' : ''
        } ${isSelected ? 'ring-1 ring-accent-primary/30' : ''}`}
        aria-expanded={isSelected}
        aria-controls={`skill-detail-${skill.id}`}
      >
        {/* Icon + Name Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              {skill.icon}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {skill.name}
            </span>
          </div>
          <ChevronDown
            className={`h-3.5 w-3.5 text-text-muted transition-transform duration-200 ${
              isSelected ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Status Badge */}
        <div className="mt-2">
          <StatusBadge status={skill.status} progress={skill.progress} />
        </div>

        {/* Progress Bar (learning only) */}
        {skill.status === 'learning' && skill.progress != null && (
          <div className="progress-bar mt-2">
            <div
              className="progress-bar-fill"
              style={{ width: `${skill.progress}%` }}
            />
          </div>
        )}
      </button>

      {/* Expandable Detail Panel */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            id={`skill-detail-${skill.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="glass-card mt-2 p-4">
              {/* Description */}
              <p className="text-sm leading-relaxed text-text-secondary">
                {skill.description}
              </p>

              {/* Related Projects */}
              {skill.relatedProjects.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Related Projects
                  </h4>
                  <ul className="mt-1 flex flex-wrap gap-1">
                    {skill.relatedProjects.map((projId) => (
                      <li key={projId}>
                        <span className="inline-block rounded bg-accent-primary/10 px-2 py-0.5 text-[11px] text-accent-primary">
                          {projId}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notes */}
              {skill.notes && (
                <div className="mt-3 flex items-start gap-1.5">
                  <StatusIcon status={skill.status} />
                  <p className="text-xs leading-relaxed text-text-muted">
                    {skill.notes}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Tree Layout Definition ─────────────────────────────────
// We define the visual tree structure explicitly so we can
// render branching (Python → Statistics + Data Viz) correctly.
interface TreeRow {
  type: 'single' | 'branch';
  skillIds: string[]; // 1 for single, 2+ for branch
  connectorStatus: Skill['status']; // color for the connector ABOVE this row
}

function buildTreeLayout(): TreeRow[] {
  // Linear sequence with strategic branching points
  return [
    { type: 'single', skillIds: ['s-excel'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-linux-python'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-sql'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-numpy-pandas'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-stats'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-dataviz'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-ml'], connectorStatus: 'upcoming' },
    { type: 'branch', skillIds: ['s-supervised', 's-unsupervised'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-dl'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-tensorflow'], connectorStatus: 'upcoming' },
    { type: 'branch', skillIds: ['s-capstone', 's-business'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-genai'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-powerbi'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-git'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-mlops'], connectorStatus: 'upcoming' },
    { type: 'single', skillIds: ['s-cloud'], connectorStatus: 'upcoming' },
  ];
}

// ─── Main Component ─────────────────────────────────────────
export default function SkillsRoadmap() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const treeLayout = buildTreeLayout();
  
  useEffect(() => {
    fetch('/api/skills', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => { if (data && data.error) throw new Error('API Error'); if (!Array.isArray(data)) data = []; if (!Array.isArray(data)) { throw new Error('API returned non-array'); }
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch skills:', err);
        setLoading(false);
      });
  }, []);

  const skillMap = new Map(skills.map((s) => [s.id, s]));

  function handleToggle(id: string) {
    setSelectedSkill((prev) => (prev === id ? null : id));
  }

  let nodeIndex = 0;

  return (
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section Heading ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Skills <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            An interactive skill tree showing my progression from foundational
            tools to advanced AI — click any node to explore.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full gradient-bg" />
        </motion.div>

        {/* ─── Skill Tree ─────────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center gap-12 animate-pulse py-8">
            <div className="w-48 h-16 bg-bg-elevated rounded-xl border border-border/40" />
            <div className="w-0.5 h-8 bg-border/40" />
            <div className="w-48 h-16 bg-bg-elevated rounded-xl border border-border/40" />
            <div className="w-0.5 h-8 bg-border/40" />
            <div className="w-48 h-16 bg-bg-elevated rounded-xl border border-border/40" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="flex flex-col"
          >
          {treeLayout.map((row, rowIndex) => {
            const rowSkills = row.skillIds
              .map((id) => {
                let skill = skillMap.get(id);
                if (!skill) {
                  const expectedName = defaultSkills.find(s => s.id === id)?.name;
                  if (expectedName) {
                    skill = skills.find(s => s.name.toLowerCase() === expectedName.toLowerCase());
                  }
                }
                return skill;
              })
              .filter(Boolean) as Skill[];

            if (rowSkills.length === 0) return null;

            return (
              <div key={row.skillIds.join('-')}>
                {/* Connector above (skip first row) */}
                {rowIndex > 0 && (
                  <div>
                    {row.type === 'branch' ? (
                      /* Branch connector: single line splits into two */
                      <div className="flex flex-col items-center">
                        <Connector status={row.connectorStatus} />
                        {/* Horizontal branch line — hidden on mobile */}
                        <div className="hidden sm:relative sm:flex w-full max-w-xs items-center justify-center">
                          <div
                            className={`h-0.5 w-full ${statusConnector[row.connectorStatus]}`}
                          />
                          {/* Down stubs at each end */}
                          <div
                            className={`absolute left-0 top-0 h-4 w-0.5 ${statusConnector[row.connectorStatus]}`}
                          />
                          <div
                            className={`absolute right-0 top-0 h-4 w-0.5 ${statusConnector[row.connectorStatus]}`}
                          />
                        </div>
                        {/* Vertical stub on mobile to connect stacked items */}
                        <div className="sm:hidden">
                          <Connector status={row.connectorStatus} />
                        </div>
                      </div>
                    ) : (
                      <Connector status={row.connectorStatus} />
                    )}
                  </div>
                )}

                {/* Node(s) */}
                {row.type === 'single' ? (
                  rowSkills.map((skill) => {
                    const idx = nodeIndex++;
                    return (
                      <SkillNode
                        key={skill.id}
                        skill={skill}
                        isSelected={selectedSkill === skill.id}
                        onToggle={() => handleToggle(skill.id)}
                        index={idx}
                      />
                    );
                  })
                ) : (
                  /* Branch: side-by-side nodes */
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10">
                    {rowSkills.map((skill) => {
                      const idx = nodeIndex++;
                      return (
                        <SkillNode
                          key={skill.id}
                          skill={skill}
                          isSelected={selectedSkill === skill.id}
                          onToggle={() => handleToggle(skill.id)}
                          index={idx}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      )}
      </div>
    </section>
  );
}
