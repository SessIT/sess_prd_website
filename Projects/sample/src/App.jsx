import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Header from './framework/HeaderDefault';
import Footer from './framework/Footer';
// import Preloader from './framework/Preloader';

// Common Components
import EnquiryButtons from './framework/EnquiryButtons';
import ScrollToTop from './framework/ScrollToTop';

// Page Components
import HomePage from './pages/Home';
import Contact from './pages/ContactUs';
import About from './pages/AboutUs';
import FlipBook from './pages/Pdfflipbook';
// import AboutPage from './pages/AboutSection';
import Gallery from './pages/Gallery';
import ServicesPage from './pages/Services';
import Career from './pages/Career';
import Product from './pages/Product';
import NewsBlogs from './pages/NewsBlogs';
import Design from './pages/DesignTeam';
import IT from './pages/IT';
import LabviewPage from './pages/Labview';
import PopupManager from './framework/Popmng';
import ProductDetail from './pages/ProductDetail';


function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
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
          
          {location.pathname !== '/' && <Header />}
          <EnquiryButtons />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path='/brochure' element={<FlipBook />} />
            <Route path="/products" element={<Product />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/design" element={<Design />} />
            <Route path='/it' element={<IT />} />
            <Route path="/career" element={<Career />} /> 
            <Route path="/news" element={<NewsBlogs />} />
            <Route path="/labview-plc" element={<LabviewPage />} />
            <Route path="/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
          <ScrollToTop />
          <PopupManager />
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
