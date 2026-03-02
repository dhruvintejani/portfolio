import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Check } from 'lucide-react';
import { projectsData } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectsProps {
  isDark: boolean;
}

function ProjectCard({
  project,
  index,
  isDark,
}: {
  project: (typeof projectsData)[0];
  index: number;
  isDark: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
        isDark
          ? 'bg-white/[0.03] border border-white/[0.06]'
          : 'bg-white border border-surface-200 shadow-sm'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        boxShadow: isHovered
          ? isDark
            ? '0 20px 60px -15px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
            : '0 20px 60px -15px rgba(59, 130, 246, 0.2)'
          : 'none',
      }}
    >
      {/* Header with emoji */}
      <div
        className={`relative p-8 pb-0 ${
          isDark ? 'bg-gradient-to-br from-primary-500/5 to-accent-500/5' : 'bg-gradient-to-br from-primary-50 to-accent-50'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{project.emoji}</span>
          <div className="flex gap-2">
            {project.liveUrl !== '#' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white text-surface-700 hover:bg-surface-100 shadow-sm'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white text-surface-700 hover:bg-surface-100 shadow-sm'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
        <h3
          className={`text-xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-sm leading-relaxed mb-6 ${
            isDark ? 'text-surface-400' : 'text-surface-600'
          }`}
        >
          {project.description}
        </p>
      </div>

      {/* Content */}
      <div className="p-8 pt-6">
        {/* Highlights */}
        <div className="mb-6">
          <h4
            className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
              isDark ? 'text-surface-500' : 'text-surface-400'
            }`}
          >
            Highlights
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className={`flex items-center gap-2 text-sm ${
                  isDark ? 'text-surface-300' : 'text-surface-600'
                }`}
              >
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <Badge key={t} isDark={isDark}>
              {t}
            </Badge>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {project.liveUrl !== '#' && (
            <Button
              variant="primary"
              size="sm"
              href={project.liveUrl}
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Live Demo
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            href={project.githubUrl}
            icon={<Github className="w-4 h-4" />}
          >
            GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects({ isDark }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="Real projects built with modern technologies"
          isDark={isDark}
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsData.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isDark={isDark}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
