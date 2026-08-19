import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ScrollToTop = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: 'var(--space-8)',
            right: 'var(--space-8)',
            zIndex: 'var(--z-toast)',
            width: '44px',
            height: '44px',
            borderRadius: 'var(--border-radius-full)',
            background: isDark ? 'var(--color-primary-500)' : 'var(--color-primary-500)',
            color: 'var(--color-neutral-0)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-brand-md)',
            transition: 'var(--transition-base)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-primary-700)';
            e.currentTarget.style.boxShadow  = 'var(--shadow-brand-lg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--color-primary-500)';
            e.currentTarget.style.boxShadow  = 'var(--shadow-brand-md)';
          }}
        >
          <FaArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;