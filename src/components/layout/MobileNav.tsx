'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { navItems } from '@/lib/data';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const handleLinkClick = (href: string) => {
    onClose();
    // Small delay so the overlay starts closing before scroll
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-50 glass-strong flex flex-col items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ── Close button ─────────────────────────────────── */}
          <motion.button
            id="mobile-nav-close"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors"
            aria-label="Close menu"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
          >
            <X size={28} />
          </motion.button>

          {/* ── Nav items ────────────────────────────────────── */}
          <motion.ul
            className="flex flex-col items-center gap-6"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navItems.map((item) => (
              <motion.li key={item.href} variants={itemVariants}>
                <button
                  id={`mobile-nav-${item.label.toLowerCase()}`}
                  onClick={() => handleLinkClick(item.href)}
                  className="text-2xl font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
