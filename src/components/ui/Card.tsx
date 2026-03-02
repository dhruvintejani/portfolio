import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', isDark, hover = true }: CardProps) {
  return (
    <motion.div
      className={`rounded-2xl p-6 transition-all duration-300 ${
        isDark
          ? 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]'
          : 'bg-white border border-surface-200 hover:border-surface-300 shadow-sm hover:shadow-md'
      } ${className}`}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : {}}
    >
      {children}
    </motion.div>
  );
}
