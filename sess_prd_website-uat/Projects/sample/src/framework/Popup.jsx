import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  image, 
  buttonText = "Get Offer",
  onButtonClick,
  // showDelay = 1000, // milliseconds
  closeOnOutsideClick = true,
  closeOnEsc = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={handleOutsideClick}
            style={{ backdropFilter: 'blur(6px)' }}
          >
            {/* Popup Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: 'spring', damping: 28, stiffness: 200 }}
              className="relative w-auto max-w-2xl overflow-hidden bg-white shadow-2xl rounded-3xl"
            >
              {/* Title Bar with Close Button */}
              <div className="flex items-center justify-between px-8 py-5 shadow-md bg-gradient-to-r from-cyan-500 to-blue-600">
                <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
                
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 transition-all duration-200 rounded-full hover:bg-white/20 group"
                  aria-label="Close popup"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-white group-hover:text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Popup Content Wrapper */}
              <div className="flex flex-col md:flex-row">
                
                {/* Image Section */}
                {image && !imageError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative flex items-center justify-center w-full h-64 overflow-hidden md:h-80 bg-gradient-to-br from-slate-100 to-slate-200">
                      {!imageLoaded && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-8 h-8 rounded-full border-3 border-cyan-200 border-t-cyan-500"
                        />
                      )}
                      <img 
                        src={image} 
                        alt={title}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Content Section */}
                <div className={`${image && !imageError ? 'md:w-1/2' : 'w-full'} p-8 md:p-10 flex flex-col justify-between`}>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="mb-6"
                    >
                      {typeof content === 'string' ? (
                        <p className="text-base leading-relaxed text-gray-700">{content}</p>
                      ) : (
                        content
                      )}
                    </motion.div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={onButtonClick || onClose}
                    className="flex items-center justify-center w-full gap-2 px-6 py-4 font-bold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-2xl hover:shadow-xl group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {buttonText}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>

                  {/* Secondary Close Option */}
                  <motion.button
                    onClick={onClose}
                    className="w-full py-2 mt-3 font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                    whileHover={{ scale: 1.02 }}
                  >
                    Not interested
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Popup;   