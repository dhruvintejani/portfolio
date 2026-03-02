interface BadgeProps {
  children: React.ReactNode;
  isDark: boolean;
}

import React from 'react';

export function Badge({ children, isDark }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        isDark
          ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
          : 'bg-primary-50 text-primary-700 border border-primary-200'
      }`}
    >
      {children}
    </span>
  );
}
