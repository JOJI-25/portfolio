'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/lib/animations';

// Unique gradient per cert index
const cardGradients = [
  'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.15))',
  'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.15))',
  'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(34,197,94,0.15))',
  'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(239,68,68,0.15))',
  'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(139,92,246,0.15))',
];

import type { Variants } from 'framer-motion';

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

import type { Certification } from '@/types';

export default function Certifications() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/certifications')
      .then((res) => res.json())
      .then(data => { if (data && data.error) throw new Error('API Error'); if (!Array.isArray(data)) data = [];
        setCertifications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -340 : 340;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="certifications" className="section-padding">
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
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            Professional certifications validating my expertise in data analytics and technology.
          </p>
        </motion.div>

        {/* Scroll Container Wrapper */}
        <div className="relative">
          {/* Left Arrow — desktop only */}
          <button
            id="cert-scroll-left"
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full glass border border-border cursor-pointer hover:border-accent-primary transition-colors"
            aria-label="Scroll certifications left"
          >
            <ChevronLeft className="w-5 h-5 text-text-primary" />
          </button>

          {/* Right Arrow — desktop only */}
          <button
            id="cert-scroll-right"
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full glass border border-border cursor-pointer hover:border-accent-primary transition-colors"
            aria-label="Scroll certifications right"
          >
            <ChevronRight className="w-5 h-5 text-text-primary" />
          </button>

          {/* Scrollable Row (desktop) / Vertical Stack (mobile) */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-16 text-text-secondary">
              <Award className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-40" />
              <p>No certifications added yet.</p>
            </div>
          ) : (
            <motion.div
              ref={scrollRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="flex flex-col md:flex-row md:overflow-x-auto gap-6 pb-4"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
              }}
            >
              {certifications.map((cert, index) => (
                <motion.article
                  key={cert.id}
                  variants={slideFromRight}
                  className="glass-card min-w-[300px] md:min-w-[320px] max-w-[340px] flex-shrink-0 p-5"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Certificate Image Placeholder */}
                  <div
                    className="aspect-[4/3] bg-bg-elevated rounded-lg flex flex-col items-center justify-center gap-2"
                    style={{ background: cardGradients[index % cardGradients.length] }}
                  >
                    <Award className="w-10 h-10 text-text-primary opacity-80" />
                    <span className="text-sm text-text-secondary font-medium">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-text-primary text-base mt-3 line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm text-accent-secondary">{cert.issuer}</p>

                  {/* Date */}
                  <p className="text-xs text-text-muted mt-1">{formatDate(cert.date)}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cert.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 bg-bg-elevated text-text-secondary rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Verify Link */}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent-primary hover:underline mt-3"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify Certificate
                    </a>
                  )}
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
