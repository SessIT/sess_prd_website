import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import EnquiryModal from './EnquiryModal';
import BrochureModal from './BrochureModal';
import SearchOverlay from './SearchOverlay';
import { OPEN_ENQUIRY_EVENT, OPEN_SEARCH_EVENT, OPEN_BROCHURE_EVENT } from './openEnquiry';
import { getBrochureForPath, getBrochureForProduct } from '../data/productBrochures';
import suppot from '../assets/Website_Gallery_img/chatbot.png';
import download from '../assets/Website_Gallery_img/file.png';

const EnquiryButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [prefillProduct, setPrefillProduct] = useState('');
  const [brochureOverride, setBrochureOverride] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { pathname } = useLocation();

  // The floating button serves the brochure of whichever product page the
  // visitor is on; every other route gets the company profile. A product page
  // can also request a specific brochure via openBrochure('Product name').
  const routeBrochure = useMemo(() => getBrochureForPath(pathname), [pathname]);
  const activeBrochure = brochureOverride || routeBrochure;

  // Any component (Header CTA, product hero, carousels) can open the enquiry
  // modal via openEnquiry('Product name') or the search via openSearch() —
  // see openEnquiry.js. Ctrl+K / Cmd+K also opens the search.
  useEffect(() => {
    const enquiryHandler = (e) => {
      setPrefillProduct(e.detail?.product || '');
      setIsModalOpen(true);
    };
    const searchHandler = () => setIsSearchOpen(true);
    const brochureHandler = (e) => {
      setBrochureOverride(getBrochureForProduct(e.detail?.product || ''));
      setIsBrochureOpen(true);
    };
    const keyHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener(OPEN_ENQUIRY_EVENT, enquiryHandler);
    window.addEventListener(OPEN_SEARCH_EVENT, searchHandler);
    window.addEventListener(OPEN_BROCHURE_EVENT, brochureHandler);
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener(OPEN_ENQUIRY_EVENT, enquiryHandler);
      window.removeEventListener(OPEN_SEARCH_EVENT, searchHandler);
      window.removeEventListener(OPEN_BROCHURE_EVENT, brochureHandler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  // Button variants for animation
  const buttonVariants = {
    initial: { x: 100, opacity: 0, scale: 0 },
    animate: { x: 0, opacity: 1, scale: 1 },
    hover: { scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
  };

  // Tooltip variants
  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 15,
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  // Pulse animation for buttons
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 0 0 rgba(139, 92, 246, 0.7)',
        '0 0 0 10px rgba(139, 92, 246, 0)',
        '0 0 0 0 rgba(139, 92, 246, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className="fixed z-50 flex flex-col -translate-y-1/2 right-2 top-72" style={{ gap: '20px' }}>
        
        {/* Enquiry Button */}
        <div className="relative flex items-center justify-end">
          <AnimatePresence mode="wait">
            {hoveredBtn === 'enquiry' && (
              <motion.div
                key="enquiry-tooltip"
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: 'absolute',
                  right: '100%',
                  marginRight: '16px',
                  whiteSpace: 'nowrap',
                  background: isDark ? '#fff' : '#1e293b',
                  color: isDark ? '#0f172a' : '#f1f5f9',
                  padding: '8px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
                  border: isDark ? '1px solid #e2e8f0' : '1px solid #334155',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <span style={{ fontSize: '18px' }}>✨</span> */}
                  Enquiry Now
                  {/* <span style={{ fontSize: '18px' }}>✨</span> */}
                </span>
                {/* Tooltip arrow */}
                <div
                  style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: `8px solid ${isDark ? '#fff' : '#1e293b'}`,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredBtn('enquiry')}
            onHoverEnd={() => setHoveredBtn(null)}
            onClick={() => setIsModalOpen(true)}
            style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              border: isDark ? '2px solid #00b3b3' : '1px solid #00b3b3',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #00b3b3 0%, #00b3b3 100%)',
              boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 8px 10px -6px rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: hoveredBtn === 'enquiry' ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: '24px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
              }}
            >
              <motion.img src={suppot} alt="" />
            </motion.div>

            {/* Ripple effect on click */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                pointerEvents: 'none',
              }}
              whileTap={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shine effect on hover */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                borderRadius: '50%',
              }}
              animate={{
                left: hoveredBtn === 'enquiry' ? '100%' : '-100%',
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>

        {/* Download Brochure Button */}
        <div className="relative flex items-center justify-end">
          <AnimatePresence mode="wait">
            {hoveredBtn === 'brochure' && (
              <motion.div
                key="brochure-tooltip"
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: 'absolute',
                  right: '100%',
                  marginRight: '16px',
                  whiteSpace: 'nowrap',
                  // background: isDark ? '#1e293b' : '#ffffff',
                  // color: isDark ? '#f1f5f9' : '#0f172a',
                  background: isDark ? '#fff' : '#1e293b',
                  color: isDark ? '#0f172a' : '#f1f5f9',
                  padding: '8px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
                  // border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                  border: isDark ? '1px solid #e2e8f0' : '1px solid #334155',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center'}}>
                  {activeBrochure.key === 'company' ? 'Download Brochure' : `${activeBrochure.product} Brochure`}
                </span>
                {/* Tooltip arrow */}
                <div
                  style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: `8px solid ${isDark ? '#fff' : '#1e293b'}`,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredBtn('brochure')}
            onHoverEnd={() => setHoveredBtn(null)}
            onClick={() => { setBrochureOverride(null); setIsBrochureOpen(true); }}
            style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              border: isDark ? '2px solid #00b3b3' : '1px solid #00b3b3',
              cursor: 'pointer',
              background: isDark 
                ? 'linear-gradient(135deg, #00b3b3 0%, #00b3b3 100%)'
                : 'linear-gradient(135deg, #00b3b3 0%, #00b3b3 100%)',
              boxShadow: isDark
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
                : '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              padding: '4px',
            }}
          >
            {/* Icon */}
            <motion.div
              animate={{ 
                y: hoveredBtn === 'brochure' ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 0.5, repeat: hoveredBtn === 'brochure' ? Infinity : 0 }}
              style={{
                fontSize: '24px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <motion.img src={download} alt="" style={{color:'#00b3b3'}} />
            </motion.div>

            {/* Pulse effect on brochure button */}
            {hoveredBtn === 'brochure' && (
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Shine effect on hover */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                borderRadius: '50%',
              }}
              animate={{
                left: hoveredBtn === 'brochure' ? '100%' : '-100%',
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setPrefillProduct(''); }}
        prefillProduct={prefillProduct}
      />
      <BrochureModal
        isOpen={isBrochureOpen}
        brochure={activeBrochure}
        onClose={() => { setIsBrochureOpen(false); setBrochureOverride(null); }}
      />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default EnquiryButtons;