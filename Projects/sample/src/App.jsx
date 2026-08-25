import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
// import VideoTest from "./component/VideoTest";

// Layout Components
import Header from './framework/Header';
import Footer from './framework/Footer';
// import Preloader from './framework/Preloader';

// Common Components
import EnquiryButtons from './framework/EnquiryButtons';
import ScrollToTop from './framework/ScrollToTop';
import PopupManager from './framework/Popmng';

// Page Components (lazy-loaded for route-level code splitting)
const HomePage = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/ContactUs'));
const About = lazy(() => import('./pages/AboutUs'));
const FlipBook = lazy(() => import('./pages/Pdfflipbook'));
// import AboutPage from './pages/AboutSection';
const Gallery = lazy(() => import('./pages/Gallery'));
const ServicesPage = lazy(() => import('./pages/Services'));
const Career = lazy(() => import('./pages/Career'));
const Product = lazy(() => import('./pages/Product'));
const NewsBlogs = lazy(() => import('./pages/NewsBlogs'));
const Design = lazy(() => import('./pages/DesignTeam'));
const IT = lazy(() => import('./pages/IT'));
const LabviewPage = lazy(() => import('./pages/Labview'));
const ClimaticTestChambers = lazy(() => import('./pages/products/Climatic-test-chambers'));
const SaltSprayChamber = lazy(() => import('./pages/products/Salt-spray-test-chambers'));
const RainTestChamber = lazy(() => import('./pages/products/Rain-test-chamber'));
const ThermalCyclicChamber = lazy(() => import('./pages/products/Thermal-cyclic-chamber'));
const VibrationTestChamber = lazy(() => import('./pages/products/Vibration-test-chamber'));
const BatteryChamber = lazy(() => import('./pages/products/Battery-chamber'));
const FlameProofHotAirOven = lazy(() => import('./pages/products/FlameProof-HotAir-Oven'));
const ThermalShock = lazy(() => import('./pages/products/ThermalShockChamber'));
const TabletopTestChamber = lazy(() => import('./pages/products/Tabletopchamber'));
const WalkInChamber = lazy(() => import('./pages/products/WalkInChamber'));
const DustChamber = lazy(() => import('./pages/products/DustChamber'));
const TensileChamber = lazy(() => import('./pages/products/TensileChamber'));
const SitemapPage = lazy(() => import('./pages/Sitemap'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));

// import ProductVariantDetail from './pages/products/related/Productvariantdetail';


const RouteFallback = () => (
  <div style={{ minHeight: '70vh' }} aria-busy="true" />
);

function AppContent() {
  const location = useLocation();

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
          <Suspense fallback={<RouteFallback />}>
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
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
          

           

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
          </Suspense>
          {/* <VideoTest /> */}
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
