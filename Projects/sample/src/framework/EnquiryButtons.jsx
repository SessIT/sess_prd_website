import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import EnquiryModal from './EnquiryModal';

const EnquiryButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const baseStyle = {
    writingMode: 'sideways-lr',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '12px',
    paddingBottom: '12px',
    borderRadius: 'var(--border-radius-lg) 0 0 var(--border-radius-lg)',
    fontSize: 'var(--text-xs)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-neutral-0)',
    boxShadow: 'var(--shadow-lg)',
    transition: 'var(--transition-base)',
    display: 'block',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    letterSpacing: 'var(--tracking-wide)',
  };

  return (
    <>
      <div className="fixed right-0 top-1/2 -translate-y-1/3 z-40 flex flex-col" style={{ gap: 'var(--space-4)' }}>

        {/* Enquiry Button */}
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 1, type: 'spring' }}
          onClick={() => setIsModalOpen(true)}
          style={{ ...baseStyle, background: 'var(--color-primary-500)', height:'150px' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-700)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary-500)'}
        >
          Enquiry Now
        </motion.button>

        {/* Download Brochure Button */}
        {/* Download Brochure Button */}
<motion.a
  initial={{ x: 100 }}
  animate={{ x: 0 }}
  transition={{ delay: 1.2, type: 'spring' }}
  href="/#/brochure"
  style={{
    ...baseStyle,
    height: '190px',
    textAlign: 'center',
    background: isDark ? 'var(--color-neutral-700)' : 'var(--color-neutral-800)',
  }}
  onMouseEnter={e =>
    (e.currentTarget.style.background = isDark
      ? 'var(--color-neutral-600)'
      : 'var(--color-neutral-900)')
  }
  onMouseLeave={e =>
    (e.currentTarget.style.background = isDark
      ? 'var(--color-neutral-700)'
      : 'var(--color-neutral-800)')
  }
>
  Download Brochure
</motion.a>

      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default EnquiryButtons;