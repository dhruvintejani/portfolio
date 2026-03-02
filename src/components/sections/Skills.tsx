import { motion } from 'framer-motion';
import { skillsData } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

interface SkillsProps {
  isDark: boolean;
}

function SkillBar({
  name,
  level,
  index,
  isDark,
  isInView,
}: {
  name: string;
  level: number;
  index: number;
  isDark: boolean;
  isInView: boolean;
}) {
  return (
    <motion.div
      className={`rounded-xl p-4 transition-all duration-300 ${
        isDark
          ? 'bg-white/[0.03] border border-white/[0.06] hover:border-primary-500/30'
          : 'bg-white border border-surface-200 hover:border-primary-300 shadow-sm'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-sm font-semibold ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}
        >
          {name}
        </span>
        <span
          className={`text-xs font-mono ${
            isDark ? 'text-primary-400' : 'text-primary-600'
          }`}
        >
          {level}%
        </span>
      </div>
      <div
        className={`h-2 rounded-full overflow-hidden ${
          isDark ? 'bg-white/5' : 'bg-surface-100'
        }`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export function Skills({ isDark }: SkillsProps) {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="skills" className="py-24 lg:py-32 relative" ref={ref}>
      <Container>
        <SectionHeading
          title="Skills & Tools"
          subtitle="Technologies I work with daily to build exceptional experiences"
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Frontend */}
          <div>
            <h3
              className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}
            >
              <span className="w-8 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
              Frontend
            </h3>
            <div className="grid gap-3">
              {skillsData.frontend.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                  isDark={isDark}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3
              className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}
            >
              <span className="w-8 h-[2px] bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
              Tools & Platforms
            </h3>
            <div className="grid gap-3">
              {skillsData.tools.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                  isDark={isDark}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
