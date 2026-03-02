import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from 'lucide-react';
import { heroData, socialLinks } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  isDark: boolean;
}

export function Hero({ isDark }: HeroProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950'
              : 'bg-gradient-to-br from-surface-50 via-white to-primary-50'
          }`}
        />
        <motion.div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Floating glass card accent */}
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
              isDark
                ? 'bg-white/5 border border-white/10 text-surface-300'
                : 'bg-surface-100 border border-surface-200 text-surface-600'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for freelance work
          </motion.div>

          {/* Name */}
          <motion.h2
            variants={itemVariants}
            className={`text-lg sm:text-xl font-medium mb-4 ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}
          >
            Dhruvin Tejani
          </motion.h2>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 ${
              isDark ? 'text-white' : 'text-surface-900'
            }`}
          >
            I build{' '}
            <span className="text-gradient">modern, fast,</span>
            <br />
            responsive web experiences.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className={`text-lg sm:text-xl font-mono mb-10 ${
              isDark ? 'text-surface-400' : 'text-surface-500'
            }`}
          >
            {heroData.subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button variant="primary" size="lg" href="#projects" icon={<ExternalLink className="w-4 h-4" />}>
              View Projects
            </Button>
            <Button variant="secondary" size="lg" href="#contact">
              Download Resume
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: socialLinks.github, label: 'GitHub' },
              { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: socialLinks.email, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`p-3 rounded-xl transition-all ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-surface-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    : 'bg-surface-100 border border-surface-200 text-surface-500 hover:text-surface-900 hover:bg-surface-200'
                }`}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className={`w-5 h-5 ${isDark ? 'text-surface-600' : 'text-surface-400'}`} />
      </motion.div>
    </section>
  );
}
