import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  isDark: boolean;
}

export function SectionHeading({ title, subtitle, isDark }: SectionHeadingProps) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-surface-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-surface-400' : 'text-surface-600'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
    </motion.div>
  );
}
