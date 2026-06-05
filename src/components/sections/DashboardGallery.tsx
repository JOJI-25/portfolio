'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, BarChart3 } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

// ─── Filter Options ─────────────────────────────────────────
type ToolFilter = 'all' | 'Power BI' | 'Excel' | 'Analytics';

const filterOptions: { key: ToolFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Power BI', label: 'Power BI' },
  { key: 'Excel', label: 'Excel' },
  { key: 'Analytics', label: 'Analytics' },
];

// ─── Tool-specific gradient mapping ─────────────────────────
const toolGradients: Record<string, string> = {
  'Power BI': 'from-amber-500/25 via-yellow-500/15 to-orange-500/25',
  Excel: 'from-emerald-500/25 via-green-500/15 to-teal-500/25',
  Analytics: 'from-blue-500/25 via-indigo-500/15 to-purple-500/25',
};

// ─── Dashboard Card ─────────────────────────────────────────
interface DashboardCardProps {
  id: string;
  title: string;
  tool: string;
  description: string;
}

function DashboardCard({ id, title, tool }: DashboardCardProps) {
  const gradient = toolGradients[tool] ?? 'from-slate-600/25 to-slate-500/25';

  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="glass-card overflow-hidden group"
    >
      {/* Preview area */}
      <div className="relative">
        <div
          className={`aspect-[16/10] bg-bg-elevated bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <BarChart3 className="w-16 h-16 text-text-muted opacity-40" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <h4 className="text-xl font-semibold text-white mb-1">{title}</h4>
          <p className="text-accent-secondary text-sm mb-3">{tool}</p>
          <button
            type="button"
            id={`dashboard-view-${id}`}
            className="btn-ghost text-xs py-2 px-3 w-fit"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Details
          </button>
        </div>
      </div>

      {/* Card info — always visible below the image */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <span className="inline-block text-xs px-2.5 py-1 rounded-md bg-bg-elevated text-accent-secondary">
          {tool}
        </span>
      </div>
    </motion.article>
  );
}

import type { DashboardItem } from '@/types';

// ─── Dashboard Gallery Section ──────────────────────────────
export default function DashboardGallery() {
  const [activeFilter, setActiveFilter] = useState<ToolFilter>('all');
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboards')
      .then((res) => res.json())
      .then(data => { if (data && data.error) throw new Error('API Error'); if (!Array.isArray(data)) data = [];
        setDashboards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDashboards = useMemo(() => {
    if (activeFilter === 'all') return dashboards;
    return dashboards.filter((d) => d.tool === activeFilter);
  }, [dashboards, activeFilter]);

  return (
    <section id="dashboards" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Dashboard <span className="gradient-text">Gallery</span>
          </h2>
        </motion.div>

        {/* Tab Filters */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              id={`dashboard-filter-${opt.key}`}
              type="button"
              onClick={() => setActiveFilter(opt.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer border ${
                activeFilter === opt.key
                  ? 'border-accent-primary text-accent-primary bg-accent-primary/10'
                  : 'border-white/10 text-text-muted hover:text-text-secondary hover:border-white/20 bg-transparent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        {/* Dashboard Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredDashboards.map((dash) => (
                <DashboardCard
                  key={dash.id}
                  id={dash.id}
                  title={dash.title}
                  tool={dash.tool}
                  description={dash.description}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredDashboards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BarChart3 className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">
              No dashboards found for this filter.
            </p>
            <button
              type="button"
              id="clear-dashboard-filter-btn"
              onClick={() => setActiveFilter('all')}
              className="mt-4 text-accent-primary hover:text-accent-secondary transition-colors text-sm underline underline-offset-4 cursor-pointer"
            >
              Show all dashboards
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
