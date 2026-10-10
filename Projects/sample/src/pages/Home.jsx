import React, { useEffect, lazy, Suspense } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Home Components
import HeroSlider from '../framework/HeroSlider';
import Header from '../framework/Header';

// Below-the-fold sections are code-split so the hero (the LCP element) can
// render without first downloading and running every section's code.
const AboutSection = lazy(() => import('../framework/AboutSection'));
const OtherDept = lazy(() => import('../framework/OtherDept'));
const ProductsSection = lazy(() => import('../framework/DemoProducts'));
const ServicesSection = lazy(() => import('../framework/ServicesSection'));
const CounterSection = lazy(() => import('../framework/CounterSection'));
const TestimonialsSection = lazy(() => import('../framework/TestimonialsSection'));
const ClientsSection = lazy(() => import('../framework/ClientsSection'));
const NewsSection = lazy(() => import('../framework/NewsSection'));
const Social = lazy(() => import('../framework/SocialMedia'));
const WhatsAppWidget = lazy(() => import('../framework/WhatsAppWidget'));
// import VideoTest from "../component/VideoTest"; // Video section hidden — re-enable here when needed

const HomePage = () => {
  // Scroll progress via framer-motion (no React re-render or layout read per scroll)
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

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
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 z-50 h-1 bg-gradient-to-r ${progressBarGradient}`}
        style={{
          width: '100%',
          scaleX: scrollYProgress,
          transformOrigin: 'left'
        }}
      />

      <Header />
      {/* Single page-level H1 for SEO; slider headings are H2s */}
      <h1 className="sr-only">
        Environmental Test Chamber Manufacturer in India – Sri Easwari Scientific Solution (SESS)
      </h1>
      <HeroSlider />
      {/* 100vh placeholder keeps the footer below the fold while sections load (no layout shift) */}
      <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
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
        {/* <VideoTest /> */}
        <WhatsAppWidget />
      </Suspense>
      {/* <CTASection /> */}
    </motion.div>
  );
};

export default HomePage;