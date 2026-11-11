import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
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
  // Wait for window load + an idle slot so this parse/compile work doesn't land
  // in the page's loading window (it counted toward Total Blocking Time).
  // A first scroll/tap mounts the sections and fetches them right away anyway.
  useEffect(() => {
    let idleId;
    let timer;
    const preload = () => Object.values(sectionLoaders).forEach((load) => load());
    const schedule = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(preload, { timeout: 3000 });
      else timer = setTimeout(preload, 1500);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (idleId) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
    };
  }, []);

  // Below-the-fold sections mount on the visitor's first scroll/tap/key, or as
  // soon as their placeholder comes near the viewport (tall screens, crawlers
  // that render with a tall viewport). Mounting all ten at load was 0.5–1s of
  // main-thread work while the page was still becoming interactive.
  const [showSections, setShowSections] = useState(false);
  const sectionsRef = useRef(null);
  useEffect(() => {
    if (showSections) return;
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
    const show = () => setShowSections(true);
    events.forEach((e) => window.addEventListener(e, show, { once: true, passive: true }));
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && show(),
      { rootMargin: '0px' }
    );
    if (sectionsRef.current) io.observe(sectionsRef.current);
    return () => {
      events.forEach((e) => window.removeEventListener(e, show));
      io.disconnect();
    };
  }, [showSections]);

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
    <div className="bg-white">
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
      {/* 100vh placeholder keeps the footer below the fold until the sections
          mount and load (no layout shift). One Suspense boundary per section, so
          each mounts in its own small commit as its chunk arrives. */}
      {showSections ? (
        <>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
            <AboutSection />
          </Suspense>
          {[OtherDept, ProductsSection, ServicesSection, CounterSection, TestimonialsSection,
            ClientsSection, NewsSection, Social].map((Section, i) => (
            <Suspense key={i} fallback={null}>
              <Section />
            </Suspense>
          ))}
        </>
      ) : (
        <div ref={sectionsRef} style={{ minHeight: '100vh' }} aria-busy="true" />
      )}
      <Suspense fallback={null}>
        <WhatsAppWidget />
      </Suspense>
      {/* <VideoTest /> — video section hidden; re-enable above when needed */}
      {/* <CTASection /> */}
    </div>
  );
};

export default HomePage;