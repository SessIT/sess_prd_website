import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
// Layout Components
import Header from './framework/Header';
import Footer from './framework/Footer';
// import Preloader from './framework/Preloader';

// Common Components
import EnquiryButtons from './framework/EnquiryButtons';
import ScrollToTop from './framework/ScrollToTop';
// import WhatsAppWidget from './framework/WhatsAppWidget';

// Page Components
import HomePage from './pages/Home';
import Contact from './pages/ContactUs';
import About from './pages/AboutUs';
// import AboutPage from './pages/AboutSection';
// import ProductsPage from './pages/ProductsSection';
// import ServicesPage from './pages/ServicesSection';
// import NewsPage from './pages/NewsSection';


function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {
        
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
          style={{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            transition: 'background-color 0.3s ease, color 0.3s ease'
          }}
        >
          
          <Header />
          <EnquiryButtons />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/products" element={<ProductsPage />} /> */}
            {/* <Route path="/services" element={<ServicesPage />} /> */}
            {/* <Route path="/gallery" element={<GalleryPage />} />
            
            <Route path="/career" element={<CareerPage />} /> */}
            {/* <Route path="/news" element={<NewsPage />} /> */}
          </Routes>
          <Footer />
          <ScrollToTop />
          {/* <WhatsAppWidget /> */}
        </motion.div>
      }
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
