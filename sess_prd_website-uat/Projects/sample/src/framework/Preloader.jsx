import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/sess_logo_png.png';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20"
        >
          <img src={Logo} alt="SESS" className="w-full h-full object-contain" />
        </motion.div>
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-deep-pink font-medium whitespace-nowrap"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;