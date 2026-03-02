import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { socialLinks } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';

interface FooterProps {
  isDark: boolean;
}

export function Footer({ isDark }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-12 border-t ${
        isDark ? 'border-white/[0.06]' : 'border-surface-200'
      }`}
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-gradient">DT</span>
            <p
              className={`text-sm flex items-center gap-1 ${
                isDark ? 'text-surface-500' : 'text-surface-400'
              }`}
            >
              © {currentYear} Dhruvin Tejani. Built with{' '}
              <Heart className="w-3 h-3 text-red-400 fill-red-400" /> and React.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: socialLinks.github },
              { icon: Linkedin, href: socialLinks.linkedin },
              { icon: Mail, href: socialLinks.email },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`p-2.5 rounded-xl transition-colors ${
                  isDark
                    ? 'text-surface-500 hover:text-white hover:bg-white/5'
                    : 'text-surface-400 hover:text-surface-900 hover:bg-surface-100'
                }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
