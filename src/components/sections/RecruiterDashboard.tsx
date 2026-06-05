'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Layers,
  Award,
  BarChart3,
} from 'lucide-react';
import { Github } from '@/components/icons/BrandIcons';
import { fadeUp, staggerContainer } from '@/lib/animations';

import type { ElementType } from 'react';

// ─── Icon Mapping ───────────────────────────────────────────
const iconMap: Record<string, ElementType> = {
  FolderKanban,
  Layers,
  Award,
  Github,
  BarChart3,
};

// ─── Animated Counter Hook ──────────────────────────────────
function useAnimatedCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

// ─── Single Metric Card ─────────────────────────────────────
interface MetricCardProps {
  label: string;
  value: number;
  icon: string;
  suffix?: string;
}

function MetricCard({ label, value, icon, suffix }: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  }, []);

  const count = useAnimatedCounter(value, 2000, isVisible);
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="glass-card p-6 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="gradient-bg-subtle rounded-full w-12 h-12 flex items-center justify-center">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-accent-primary" />
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-4xl font-extrabold text-text-primary">
          {count}
        </span>
        {suffix && (
          <span className="text-4xl font-extrabold text-accent-secondary">
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-sm text-text-secondary mt-2">{label}</p>

      {/* Bottom accent line */}
      <div className="h-0.5 w-12 mx-auto mt-4 gradient-bg rounded" />
    </motion.div>
  );
}

import type { MetricItem } from '@/types';

// ─── Recruiter Dashboard Section ────────────────────────────
export default function RecruiterDashboard() {
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="dashboard" className="section-padding flex justify-center py-24">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="section-padding">
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
            Quick <span className="gradient-text">Overview</span>
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              suffix={metric.suffix}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
