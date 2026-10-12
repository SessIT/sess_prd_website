import React, { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Home Components
import HeroSlider from '../framework/HeroSlider';
import Header from '../framework/Header';

// Below-the-fold sections are code-split so the hero (the LCP element) can
// render without first downloading and running every section's code.
const sectionLoaders = {
  AboutSection: () => import('../framework/AboutSection'),
  OtherDept: () => import('../framework/OtherDept'),
  ProductsSection: () => import('../framework/DemoProducts'),
  ServicesSection: () => import('../framework/ServicesSection'),
  CounterSection: () => import('../framework/CounterSection'),
  TestimonialsSection: () => import('../framework/TestimonialsSection'),
  ClientsSection: () => import('../framework/ClientsSection'),
  NewsSection: () => import('../framework/NewsSection'),
  Social: () => import('../framework/SocialMedia'),
  WhatsAppWidget: () => import('../framework/WhatsAppWidget'),
};
const AboutSection = lazy(sectionLoaders.AboutSection);
const OtherDept = lazy(sectionLoaders.OtherDept);
const ProductsSection = lazy(sectionLoaders.ProductsSection);
const ServicesSection = lazy(sectionLoaders.ServicesSection);
const CounterSection = lazy(sectionLoaders.CounterSection);
const TestimonialsSection = lazy(sectionLoaders.TestimonialsSection);
const ClientsSection = lazy(sectionLoaders.ClientsSection);
const NewsSection = lazy(sectionLoaders.NewsSection);
const Social = lazy(sectionLoaders.Social);
const WhatsAppWidget = lazy(sectionLoaders.WhatsAppWidget);
// import VideoTest from "../component/VideoTest"; // Video section hidden — re-enable here when needed

const HomePage = () => {
  const { theme } = useTheme();

  // React suspends on the first lazy section and only then requests the next,
  // which chained ~10 requests one after another on slow mobile networks.
  // Start every section download in parallel once the hero has painted
  // (the browser's module map dedupes import(), so nothing is fetched twice).
  useEffect(() => {
    Object.values(sectionLoaders).forEach((load) => load());
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
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Scroll Progress Bar */}
      {/* Pure CSS scroll-driven animation (.scroll-progress in index.css) —
          no JS scroll listener or layout reads; hidden where unsupported. */}
      <div className={`scroll-progress fixed top-0 left-0 z-50 h-1 w-full bg-gradient-to-r ${progressBarGradient}`} />

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