import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import img1 from '../assets/Website_Gallery_img/popup.jpeg';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;
const MotionButton = motion.button;

// Configuration: Define which routes should show the popup
const POPUP_CONFIG = {
  enabled: true,
  showOnce: true, // Show only once per session
  delay: 1000, // Show after 1 second
  routes: ['/', '/about', '/contact'], // Specific routes or ['*'] for all routes
  excludeRoutes: [], // Routes where popup shouldn't show
  cookieExpiry: 1, // Days to remember if shown (for showOnce)
};

const shouldShowOnRoute = (currentPath) => {
  // Check exclude routes first
  if (POPUP_CONFIG.excludeRoutes.includes(currentPath)) {
    return false;
  }

  // If routes array includes '*', show on all routes
  if (POPUP_CONFIG.routes.includes('*')) {
    return true;
  }

  // Check if current route is in the allowed routes
  return POPUP_CONFIG.routes.includes(currentPath);
};

const hasPopupBeenShown = () => {
  if (!POPUP_CONFIG.showOnce) return false;

  const popupShown = localStorage.getItem('popupShown');
  const popupShownTime = localStorage.getItem('popupShownTime');

  if (popupShown && popupShownTime) {
    const daysPassed = (Date.now() - parseInt(popupShownTime, 10)) / (1000 * 60 * 60 * 24);
    return daysPassed < POPUP_CONFIG.cookieExpiry;
  }

  return false;
};

const markPopupAsShown = () => {
  if (POPUP_CONFIG.showOnce) {
    localStorage.setItem('popupShown', 'true');
    localStorage.setItem('popupShownTime', Date.now().toString());
  }
};

const PopupManager = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  // Handle popup display
  useEffect(() => {
    if (!POPUP_CONFIG.enabled) return;
    if (!shouldShowOnRoute(location.pathname)) return;
    if (hasPopupBeenShown()) return;

    // Show popup after delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, POPUP_CONFIG.delay);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-run when route changes

  const handleClose = () => {
    setShowPopup(false);
    markPopupAsShown();
  };

  // You can customize popup content based on route
  const getPopupContent = () => {
    const currentPath = location.pathname;
    
    const popupData = {
      '/': {
        title: 'Welcome to Our Website! 🎉',
        content: 'Thank you for visiting! Get 20% off on your first purchase. Use code: WELCOME20',
        image: img1,
        buttonText: 'Shop Now'
       },
      // '/about': {
      //   title: 'Learn More About Us',
      //   content: 'Discover our story, mission, and values. Join our community today!',
      //   image: img1,
      //   buttonText: 'Explore'
      // },
      // '/contact': {
      //   title: 'Let\'s Connect!',
      //   content: 'Subscribe to our newsletter for exclusive updates and offers.',
      //   image: img1,
      //   buttonText: 'Subscribe Now'
      // }
    };
    
    return popupData[currentPath] || popupData['/'];
  };

  const currentContent = getPopupContent();

  return (
    <PopupImg
      isOpen={showPopup}
      onClose={handleClose}
      title={currentContent.title}
      content={currentContent.content}
      image={currentContent.image}
      buttonText={currentContent.buttonText}
    />
  );
};

export default PopupManager;

const PopupImg = ({ 
  isOpen, 
  onClose, 
  title, 
  // content, 
  image, 
  // buttonText = "Get Offer",
  // onButtonClick,
  // showDelay = 1000, // milliseconds
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            style={{ backdropFilter: 'blur(6px)' }}
          >
            {/* Popup Container */}
            <MotionDiv
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: 'spring', damping: 28, stiffness: 200 }}
              className="relative w-auto max-w-2xl overflow-hidden bg-white shadow-2xl rounded-3xl"
            >
              {/* Title Bar with Close Button */}
              <div className="flex items-center justify-between gap-10 px-8 py-5 shadow-md bg-gradient-to-r from-cyan-500 to-blue-600">
                <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
                
                {/* Close Button */}
                <MotionButton
                  type="button"
                  onClick={onClose}
                  className="flex-shrink-0 p-2 transition-all duration-200 rounded-full hover:bg-white/20 group"
                  aria-label="Close popup"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-white group-hover:text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </MotionButton>
              </div>

              {/* Popup Content Wrapper - Full Width Image */}
              <div className='flex items-center justify-center w-full'>
                
                {/* Image Section - Centered Full Visual */}
                {image && !imageError && (
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: imageLoaded ? 1 : 0.5, scale: imageLoaded ? 1 : 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center w-full p-5"
                  >
                    <div className="relative flex items-center justify-center w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200">
                      {!imageLoaded && (
                        <MotionDiv
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
                        className={`w-full h-full radius-3xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </MotionDiv>
                )}
              </div>
            </MotionDiv>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
};
 
