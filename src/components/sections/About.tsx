import { motion } from 'framer-motion';
import { Code2, Zap, Award } from 'lucide-react';
import { aboutData } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface AboutProps {
  isDark: boolean;
}

const statIcons = [Award, Code2, Zap];

export function About({ isDark }: AboutProps) {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <Container>
        <SectionHeading
          title="About Me"
          subtitle="Passionate about crafting exceptional digital experiences"
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Bio */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className={`rounded-2xl p-8 ${
                isDark
                  ? 'bg-white/[0.03] border border-white/[0.06]'
                  : 'bg-white border border-surface-200 shadow-sm'
              }`}
            >
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? 'text-surface-300' : 'text-surface-600'
                }`}
              >
                {aboutData.bio}
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-2 grid gap-4">
            {aboutData.stats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={stat.label}
                  className={`rounded-2xl p-6 flex items-center gap-4 ${
                    isDark
                      ? 'bg-white/[0.03] border border-white/[0.06] hover:border-primary-500/30'
                      : 'bg-white border border-surface-200 hover:border-primary-300 shadow-sm'
                  } transition-all duration-300`}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -2 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'bg-primary-50 text-primary-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div
                      className={`text-xl font-bold ${
                        isDark ? 'text-white' : 'text-surface-900'
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm ${
                        isDark ? 'text-surface-400' : 'text-surface-500'
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
