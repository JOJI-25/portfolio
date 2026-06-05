'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ExternalLink,
  FolderKanban,
  Brain,
  BarChart3,
  Bot,
} from 'lucide-react';
import { Github } from '@/components/icons/BrandIcons';
import type { LucideIcon } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

// ─── Category Configuration ─────────────────────────────────
type FilterCategory = 'all' | 'analytics' | 'ml' | 'ai' | 'dashboard';

interface CategoryConfig {
  label: string;
  icon: LucideIcon;
  gradient: string;
}

const categoryConfig: Record<string, CategoryConfig> = {
  analytics: {
    label: 'Analytics',
    icon: BarChart3,
    gradient: 'from-blue-600/30 via-cyan-500/20 to-teal-500/30',
  },
  ml: {
    label: 'ML',
    icon: Bot,
    gradient: 'from-purple-600/30 via-pink-500/20 to-rose-500/30',
  },
  ai: {
    label: 'AI',
    icon: Brain,
    gradient: 'from-amber-500/30 via-orange-500/20 to-red-500/30',
  },
  dashboard: {
    label: 'Dashboards',
    icon: FolderKanban,
    gradient: 'from-emerald-600/30 via-green-500/20 to-lime-500/30',
  },
};

const filterOptions: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'ml', label: 'ML' },
  { key: 'ai', label: 'AI' },
  { key: 'dashboard', label: 'Dashboards' },
];

// ─── Project Card ────────────────────────────────────────────
interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl: string;
}

function ProjectCard({
  id,
  title,
  description,
  technologies,
  category,
  githubUrl,
}: ProjectCardProps) {
  const config = categoryConfig[category];
  const CategoryIcon = config?.icon ?? FolderKanban;

  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="glass-card overflow-hidden"
    >
      {/* Thumbnail placeholder */}
      <div
        className={`aspect-video bg-bg-elevated rounded-t-xl flex items-center justify-center bg-gradient-to-br ${config?.gradient ?? 'from-slate-700/30 to-slate-600/30'}`}
      >
        <CategoryIcon className="w-12 h-12 text-text-muted opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${id}`}
            className="btn-ghost text-xs py-2 px-3"
            aria-label={`View GitHub repository for ${title}`}
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <button
            type="button"
            id={`project-casestudy-${id}`}
            className="btn-ghost text-xs py-2 px-3"
            aria-label={`View case study for ${title}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Case Study
          </button>
        </div>
      </div>
    </motion.article>
  );
}

import type { Project } from '@/types';

// ─── Featured Projects Section ──────────────────────────────
export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Prisma database
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        // Format technologies back to array from comma-separated string
        const formatted = data.map((p: Project & { technologies?: string }) => ({
          ...p,
          technologies: p.technologies ? p.technologies.split(',').map((t: string) => t.trim()) : []
        }));
        setProjects(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeFilter === 'all' || project.category === activeFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <section id="projects" className="section-padding">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10"
        >
          {/* Search Input */}
          <div className="relative w-full sm:w-auto sm:min-w-[280px]">
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="project-search"
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-border rounded-lg text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                id={`filter-${opt.key}`}
                type="button"
                aria-pressed={activeFilter === opt.key}
                aria-label={`Filter projects by ${opt.label}`}
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
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                category={project.category}
                githubUrl={project.githubUrl}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">
              No projects match your criteria.
            </p>
            <button
              type="button"
              id="clear-filters-btn"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 text-accent-primary hover:text-accent-secondary transition-colors text-sm underline underline-offset-4 cursor-pointer"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
