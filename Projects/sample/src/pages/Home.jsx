import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Home Components
import HeroSlider from '../framework/HeroSlider';
import AboutSection from '../framework/AboutSection';
import ProductsSection from '../framework/ProductsSection';
import ServicesSection from '../framework/ServicesSection';
import CounterSection from '../framework/CounterSection';
import TestimonialsSection from '../framework/TestimonialsSection';
import ClientsSection from '../framework/ClientsSection';
import NewsSection from '../framework/NewsSection';
// import CTASection from './CTASection';
import OtherDept from '../framework/OtherDept';
import Social from '../framework/SocialMedia';
import WhatsAppWidget from '../framework/WhatsAppWidget';
import Header from '../framework/Header';

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reinitialize Facebook SDK after component renders
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  // Progress bar gradient based on theme
  const progressBarGradient = theme === 'dark'
    ? 'from-cyan-500 via-blue-500 to-cyan-500'
    : 'from-blue-600 via-cyan-600 to-blue-600';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 z-50 h-1 bg-gradient-to-r ${progressBarGradient}`}
        style={{ 
          width: '100%',
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      <Header />
      <HeroSlider />
      <AboutSection />
      <OtherDept />
      {/*dept section*/}
      <ProductsSection />
      <ServicesSection />
      <CounterSection />
      <TestimonialsSection />
      <ClientsSection />      
      <NewsSection /> 
      <Social />
      <WhatsAppWidget />
      {/* <CTASection /> */}
    </motion.div>
  );
};

export default HomePage;