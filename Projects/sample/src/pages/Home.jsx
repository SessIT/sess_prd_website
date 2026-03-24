import React from 'react';
import { motion } from 'framer-motion';

// Home Components
import HeroSlider from '../framework/HeroSlider';
import AboutSection from './AboutSection';
import ProductsSection from './ProductsSection';
import ServicesSection from './ServicesSection';
import CounterSection from './CounterSection';
import TestimonialsSection from './TestimonialsSection';
import ClientsSection from './ClientsSection';
import NewsSection from './NewsSection';
import CTASection from './CTASection';
import OtherDept from './OtherDept';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
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
      {/* <CTASection /> */}
    </motion.div>
  );
};

export default HomePage;