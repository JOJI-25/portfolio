'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { Github } from '@/components/icons/BrandIcons';
import { getLanguageColor } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/lib/animations';

import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

interface GitHubRepo {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
}

interface GitHubLang {
  name: string;
  percentage: number;
}

interface GitHubData {
  repos: GitHubRepo[];
  languageDistribution: GitHubLang[];
  username: string | null;
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData>({ repos: [], languageDistribution: [], username: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data.username) {
    return (
      <section id="github" className="section-padding flex justify-center py-24">
        {loading ? (
          <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <div className="text-text-secondary">Please add your GitHub URL in the Admin Panel to display your GitHub Activity!</div>
        )}
      </section>
    );
  }
  return (
    <section id="github" className="section-padding">
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
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            A snapshot of my open-source contributions and coding activity.
          </p>
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Github className="w-5 h-5 text-text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">
              Contribution Graph
            </h3>
          </div>

          <div className="overflow-x-auto pb-2 flex justify-center w-full">
            <GitHubCalendar 
              username={data.username} 
              colorScheme="dark"
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#ff6b6b', '#fa5252', '#f03e3e', '#e03131'],
              }}
            />
          </div>
        </motion.div>

        {/* Recent Repositories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {data.repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="glass-card p-4 group block"
            >
              {/* Repo Name */}
              <h4 className="font-semibold text-accent-primary group-hover:underline flex items-center gap-1.5">
                {repo.name}
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>

              {/* Description */}
              <p className="text-sm text-text-secondary line-clamp-2 mt-1.5">
                {repo.description}
              </p>

              {/* Bottom: Language + Stars + Updated */}
              <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
                <span>
                  Updated{' '}
                  {new Date(repo.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Language Distribution
          </h3>

          {/* Stacked Bar */}
          <div className="flex h-4 rounded-full overflow-hidden">
            {data.languageDistribution.map((lang) => (
              <div
                key={lang.name}
                className="transition-all duration-700"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: getLanguageColor(lang.name),
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Labels */}
          <div className="flex flex-wrap gap-4 mt-4">
            {data.languageDistribution.map((lang) => (
              <span key={lang.name} className="flex items-center gap-1.5 text-sm text-text-secondary">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: getLanguageColor(lang.name) }}
                />
                {lang.name}{' '}
                <span className="text-text-muted">{lang.percentage}%</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
