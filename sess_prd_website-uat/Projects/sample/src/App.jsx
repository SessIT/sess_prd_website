import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import VideoTest from "./component/VideoTest";

// Layout Components
import Header from './framework/Header';
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
import ClimaticTestChambers from './pages/products/Climatic-test-chambers';
import SaltSprayChamber from './pages/products/Salt-spray-test-chambers';
import RainTestChamber from './pages/products/Rain-test-chamber';
import ThermalCyclicChamber from './pages/products/Thermal-cyclic-chamber';
import VibrationTestChamber from './pages/products/Vibration-test-chamber';
import BatteryChamber from './pages/products/Battery-chamber';
import FlameProofHotAirOven from './pages/products/FlameProof-HotAir-Oven';
import ThermalShock from './pages/products/ThermalShockChamber';
import TabletopTestChamber from './pages/products/Tabletopchamber';
import WalkInChamber from './pages/products/WalkInChamber';
import DustChamber from './pages/products/DustChamber';
import TensileChamber from './pages/products/TensileChamber';

// import ProductVariantDetail from './pages/products/related/Productvariantdetail';


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
            <Route path="/climatic-test-chamber" element={<ClimaticTestChambers />} />
            <Route path="/salt-spray-test-chamber" element={<SaltSprayChamber />} />
            <Route path="/rain-test-chamber" element={<RainTestChamber />} />
            <Route path="/thermal-cyclic-chamber" element={<ThermalCyclicChamber />} /> 
            <Route path="/vibration-test-chamber" element={<VibrationTestChamber />} />
            <Route path="/battery-test-chamber" element={<BatteryChamber />} />
            <Route path="/flame-proof-hot-air-oven" element={<FlameProofHotAirOven />} />
            <Route path="/thermal-shock-chamber" element={<ThermalShock />} />
            <Route path="/tabletop-test-chamber" element={<TabletopTestChamber />} />
            <Route path="/walk-in-chamber" element={<WalkInChamber />} />
            <Route path="/dust-chamber" element={<DustChamber />} />
            <Route path="/tensile-chamber" element={<TensileChamber />} />
          

           

            {/* Product detail pages — one component, data by id */}
            {/* <Route
              path="/climatic-test-chamber/:id"
              element={<ProductVariantDetail category="climatic-test-chamber" />}
            />
            <Route
              path="/salt-spray-test-chamber/:id"
              element={<ProductVariantDetail category="salt-spray-test-chamber" />}
            />
            <Route
              path="/rain-test-chamber/:id"
              element={<ProductVariantDetail category="rain-test-chamber" />}
            /> */}
          </Routes>
          <VideoTest />
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
