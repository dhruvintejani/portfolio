import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Sun, Moon, Menu, X } from 'lucide-react';
import { navLinks, socialLinks } from '@/data/portfolio';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Container } from '@/components/ui/Container';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 50;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? isDark
              ? 'bg-surface-950/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/20'
              : 'bg-white/70 backdrop-blur-2xl border-b border-surface-200 shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === 'down' && scrollY > 300 ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl lg:text-2xl font-bold">
                <span className="text-gradient">DT</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? 'text-surface-400 hover:text-white hover:bg-white/5'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'text-surface-400 hover:text-white hover:bg-white/5' : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>

              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'text-surface-400 hover:text-white hover:bg-white/5' : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.a
                href="#contact"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.a>
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg cursor-pointer ${isDark ? 'text-surface-400' : 'text-surface-600'}`}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-lg cursor-pointer ${isDark ? 'text-surface-400' : 'text-surface-600'}`}
                whileTap={{ scale: 0.9 }}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={`fixed inset-0 z-40 pt-20 ${
              isDark ? 'bg-surface-950/95 backdrop-blur-2xl' : 'bg-white/95 backdrop-blur-2xl'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`w-full text-center py-4 text-lg font-medium rounded-xl transition-colors ${
                    isDark ? 'text-surface-300 hover:text-white hover:bg-white/5' : 'text-surface-700 hover:text-surface-900 hover:bg-surface-100'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center mt-4 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
