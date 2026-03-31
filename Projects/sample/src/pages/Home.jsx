import React from 'react';
import { motion } from 'framer-motion';

// Home Components
import HeroSlider from '../framework/HeroSlider';
import AboutSection from '../framework/AboutSection';
import ProductsSection from '../framework/ProductsSection';
import ServicesSection from '../framework/ServicesSection';
import CounterSection from '../framework/CounterSection';
import TestimonialsSection from '../framework/TestimonialsSection';
import ClientsSection from '../framework/ClientsSection';
import NewsSection from '../framework/NewsSection';
import CTASection from './CTASection';
import OtherDept from '../framework/OtherDept';

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
      <div className="my-8">
        <div class="fb-page" data-href="https://www.facebook.com/sesschennai" data-tabs="timeline" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/sesschennai" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/sesschennai">Sri Easwari Scientific Solution</a></blockquote></div>
        </div>
      {/* <CTASection /> */}
    </motion.div>
  );
};

export default HomePage;