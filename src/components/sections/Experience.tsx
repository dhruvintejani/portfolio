import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { experienceData } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ExperienceProps {
  isDark: boolean;
}

export function Experience({ isDark }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      <Container>
        <SectionHeading
          title="Experience"
          subtitle="My professional journey in frontend development"
          isDark={isDark}
        />

        <div className="max-w-3xl mx-auto">
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.title}
              className={`relative rounded-2xl p-8 ${
                isDark
                  ? 'bg-white/[0.03] border border-white/[0.06]'
                  : 'bg-white border border-surface-200 shadow-sm'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'bg-primary-50 text-primary-600'
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-surface-900'
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`}
                    >
                      {exp.type}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1.5 text-sm ${
                    isDark ? 'text-surface-400' : 'text-surface-500'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {exp.items.map((item, j) => (
                  <motion.li
                    key={j}
                    className={`flex items-start gap-3 text-sm ${
                      isDark ? 'text-surface-300' : 'text-surface-600'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: j * 0.1 }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isDark ? 'text-primary-400' : 'text-primary-500'
                      }`}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
