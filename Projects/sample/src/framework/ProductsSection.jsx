import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

import Product1  from '../assets/product1.jpeg';
import Product2  from '../assets/product2.jpeg';
import Product3  from '../assets/product3.jpeg';
import Product4  from '../assets/prd2.jpeg';
import Product5 from '../assets/prd3.jpeg';
import prd6 from '../assets/prd1.jpeg';

const products = [
  { id: 1,  name: 'Climatic Test Chamber',      category: 'industry', image: Product1, link: '/environmental_test_chamber',  description: 'Precision climate control for reliable testing',   specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 2,  name: 'Salt Spray Test Chamber',     category: 'pharma',   image: Product3, link: '/salt_spray_test_chamber',     description: 'Corrosion resistance testing made easy',           specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 3,  name: 'Rain Test Chamber',           category: 'medical',  image: Product2, link: '/rain_test_chamber',           description: 'IPX1 to IPX6 water ingress testing',              specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 4,  name: 'Vibration Test Chamber',      category: 'trading',  image: Product4, link: '#',                            description: 'Simulate real-world vibration conditions',         specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 5,  name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber',    description: 'Accelerated thermal stress testing',              specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 6,  name: 'Climatic Test Chamber',       category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing',   specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 7,  name: 'Salt Spray Test Chamber',     category: 'pharma',   image: Product3, link: '/salt_spray_test_chamber',    description: 'Corrosion resistance testing made easy',           specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 8,  name: 'Rain Test Chamber',           category: 'medical',  image: Product2, link: '/rain_test_chamber',          description: 'IPX1 to IPX6 water ingress testing',              specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 9,  name: 'Vibration Test Chamber',      category: 'trading',  image: Product4, link: '#',                           description: 'Simulate real-world vibration conditions',         specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 10, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: prd6,     link: '/thermal_cycling_chamber',   description: 'Accelerated thermal stress testing',              specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 11, name: 'Climatic Test Chamber',       category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing',   specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 12, name: 'Salt Spray Test Chamber',     category: 'pharma',   image: Product3, link: '/salt_spray_test_chamber',    description: 'Corrosion resistance testing made easy',           specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 13, name: 'Rain Test Chamber',           category: 'medical',  image: Product2, link: '/rain_test_chamber',          description: 'IPX1 to IPX6 water ingress testing',              specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 14, name: 'Vibration Test Chamber',      category: 'trading',  image: Product4, link: '#',                           description: 'Simulate real-world vibration conditions',         specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 15, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber',   description: 'Accelerated thermal stress testing',              specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 16, name: 'Climatic Test Chamber',       category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing',   specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 17, name: 'Salt Spray Test Chamber',     category: 'pharma',   image: Product3, link: '/salt_spray_test_chamber',    description: 'Corrosion resistance testing made easy',           specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 18, name: 'Rain Test Chamber',           category: 'medical',  image: prd6,     link: '/rain_test_chamber',          description: 'IPX1 to IPX6 water ingress testing',              specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 19, name: 'Vibration Test Chamber',      category: 'trading',  image: Product4, link: '#',                           description: 'Simulate real-world vibration conditions',         specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 20, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product3, link: '/thermal_cycling_chamber',   description: 'Accelerated thermal stress testing',              specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 21, name: 'Climatic Test Chamber',       category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing',   specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 22, name: 'Salt Spray Test Chamber',     category: 'pharma',   image: Product3, link: '/salt_spray_test_chamber',    description: 'Corrosion resistance testing made easy',           specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 23, name: 'Rain Test Chamber',           category: 'medical',  image: Product2, link: '/rain_test_chamber',          description: 'IPX1 to IPX6 water ingress testing',              specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 24, name: 'Vibration Test Chamber',      category: 'trading',  image: Product4, link: '#',                           description: 'Simulate real-world vibration conditions',         specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 25, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber',   description: 'Accelerated thermal stress testing',              specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
];

const categories = [
  { value: '*',        label: 'All'      },
  { value: 'industry', label: 'Industry' },
  { value: 'pharma',   label: 'Pharma'   },
  { value: 'medical',  label: 'Medical'  },
  { value: 'trading',  label: 'Trading'  },
];

// Section entrance — fires once on scroll-in, never on filter change
const sectionVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Zig-zag animation variants for staggered entrance
const getStaggeredVariants = (index) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
    y: index % 3 === 0 ? -30 : 30,
    rotate: index % 2 === 0 ? -8 : 8,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      delay: index * 0.03, // Staggered delay for wave effect
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    x: index % 2 === 0 ? 30 : -30,
    y: index % 3 === 0 ? 20 : -20,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
});

const ProductsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filter, setFilter]   = useState('*');
  const [isAnimating, setIsAnimating] = useState(false);
  const pendingFilter         = useRef(null);
  const rafRef                = useRef(null);
  const timerRef              = useRef(null);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  // Enhanced filter change with zig-zag animation
  const handleFilterChange = useCallback((val) => {
    if (val === filter || isAnimating) return;
    
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);

    pendingFilter.current = val;
    setIsAnimating(true);

    // Quick fade out with slight scale
    timerRef.current = setTimeout(() => {
      setFilter(pendingFilter.current);
      
      // Allow new products to render before animation
      rafRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    }, 150);
  }, [filter, isAnimating]);

  const filteredProducts = filter === '*'
    ? products
    : products.filter(p => p.category === filter);

  return (
    <section
      ref={ref}
      className="ps-section py-20 relative overflow-hidden"
      style={{ background: 'var(--surface-default)' }}
    >
      {/* Ambient blobs */}
      <div className="ps-blobs" aria-hidden="true">
        <div className="ps-blob ps-blob--tl" />
        <div className="ps-blob ps-blob--br" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        {/* <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <span className="ps-eyebrow">Our Products</span>
          <h2 className="ps-heading">Explore Our Range</h2>
          <p className="ps-subheading">
            Cutting-edge testing solutions for modern laboratories
          </p>
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
        >
          <span style={{
            display: 'block',
            color: 'var(--color-primary-500)',
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--text-sm)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-2)',
          }}>
            Our Products
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-2xl))',
            lineHeight: 'var(--leading-tight)',
            color: isDark ? 'var(--text-heading)' : 'var(--color-neutral-900)',
            margin: 0,
          }}>
            Explore Our Range
          </h2>
          {/* <p className="ps-subheading">
            Cutting-edge testing solutions for modern laboratories
          </p> */}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.12 }}
          className="ps-filters"
          role="tablist"
          aria-label="Product categories"
        >
          {categories.map((cat) => {
            const isActive = filter === cat.value;
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(cat.value)}
                disabled={isAnimating}
                className={`ps-filter-btn${isActive ? ' ps-filter-btn--active' : ''}${isAnimating ? ' ps-filter-btn--disabled' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filterPill"
                    className="ps-filter-pill"
                    transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                  />
                )}
                <span className="ps-filter-label">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Products Grid with Zig-Zag Animation */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.22 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="ps-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  custom={index}
                  variants={getStaggeredVariants(index)}
                  initial="hidden"
                  animate={isAnimating ? "hidden" : "visible"}
                  exit="exit"
                  className="flip-card"
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  <div className="flip-card-inner">
                    {/* Front — full-bleed image */}
                    <div className="flip-card-face flip-card-front">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="flip-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="flip-scrim" />
                      <div className="flip-front-label">
                        <span className="flip-front-name">{product.name}</span>
                        <span className="flip-front-cat">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Back — details */}
                    <div className="flip-card-face flip-card-back">
                      <div className="flip-back-body">

                        <div className="flip-back-header">
                          <div className="flip-accent-bar" />
                          <h3 className="flip-back-title">{product.name}</h3>
                          <span className="flip-back-badge">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                          </span>
                        </div>

                        <p className="flip-back-desc">{product.description}</p>

                        <div className="flip-back-specs">
                          <p className="flip-specs-label">Key Specifications</p>
                          <p className="flip-specs-value">{product.specs}</p>
                        </div>

                        <Link
                          to={product.link}
                          className="flip-cta"
                          onClick={(e) => product.link === '#' && e.preventDefault()}
                        >
                          <span>Learn More</span>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>

                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link to="/products" className="ps-view-all">
            <span>View All Products</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>

      <style jsx>{`

        /* ── Ambient blobs ─────────────────────────────────── */
        .ps-blobs {
          position: absolute; inset: 0;
          pointer-events: none; overflow: hidden;
        }
        .ps-blob {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.07;
        }
        .ps-blob--tl {
          top: -140px; left: -140px;
          background: radial-gradient(circle, var(--color-primary-500), transparent 70%);
        }
        .ps-blob--br {
          bottom: -140px; right: -140px;
          background: radial-gradient(circle, var(--color-primary-400), transparent 70%);
        }

        /* ── Header ───────────────────────────────────────── */
        .ps-eyebrow {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-primary-500);
          background: ${isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)'};
          padding: 0.28rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 0.85rem;
        }
        .ps-heading {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--text-heading);
          margin: 0 0 0.55rem;
        }
        .ps-subheading {
          font-size: 1rem;
          color: var(--text-muted);
          margin: 0;
        }

        /* ── Filter tabs ───────────────────────────────────── */
        .ps-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
          margin-bottom: 3.2rem;
        }
        .ps-filter-btn {
          position: relative;
          padding: 0.48rem 1.25rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--border-default);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease;
          outline: none;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .ps-filter-btn--disabled {
          opacity: 0.6;
          cursor: wait;
          pointer-events: none;
        }
        .ps-filter-btn:focus-visible {
          box-shadow: 0 0 0 3px rgba(59,130,246,0.35);
        }
        .ps-filter-btn--active {
          color: var(--btn-primary-text);
          border-color: var(--btn-primary-border);
          box-shadow: 0 4px 14px rgba(59,130,246,0.26);
        }
        .ps-filter-pill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: var(--btn-primary-bg);
          z-index: 0;
        }
        .ps-filter-label {
          position: relative;
          z-index: 1;
        }

        /* ── Grid ──────────────────────────────────────────── */
        .ps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 540px)  { .ps-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ps-grid { grid-template-columns: repeat(4, 1fr); } }

        /* ── Flip card shell ───────────────────────────────── */
        .flip-card {
          perspective: 1100px;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          transform-style: preserve-3d;
          transition: transform 0.52s cubic-bezier(0.35, 0, 0.15, 1);
          will-change: transform;
        }
        .flip-card:hover .flip-card-inner,
        .flip-card:focus-within .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* ── Shared face ───────────────────────────────────── */
        .flip-card-face {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1px solid var(--card-border);
          box-shadow: var(--card-shadow);
        }

        /* ── Front ─────────────────────────────────────────── */
        .flip-card-front { background: var(--card-bg); }
        .flip-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.52s cubic-bezier(0.35, 0, 0.15, 1);
        }
        .flip-card:hover .flip-img { transform: scale(1.07); }
        .flip-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.74) 0%,
            rgba(0,0,0,0.18) 48%,
            transparent 100%
          );
        }
        .flip-front-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1rem 1rem 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
        }
        .flip-front-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          font-family: var(--font-display);
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .flip-front-cat {
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.58);
        }

        /* ── Back ──────────────────────────────────────────── */
        .flip-card-back {
          transform: rotateY(180deg);
          background: var(--card-bg);
          box-shadow: var(--card-shadow-hover, 0 12px 40px rgba(0,0,0,0.18));
        }
        .flip-back-body {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.05rem;
        }
        .flip-back-header { margin-bottom: 0.65rem; }
        .flip-accent-bar {
          width: 1.75rem; height: 2.5px;
          background: var(--color-primary-500);
          border-radius: 4px;
          margin-bottom: 0.55rem;
        }
        .flip-back-title {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.28;
          margin: 0 0 0.38rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .flip-back-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.16rem 0.5rem;
          border-radius: 999px;
          background: ${isDark ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.1)'};
          color: var(--color-primary-500);
        }
        .flip-back-desc {
          font-size: 0.74rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 0.7rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .flip-back-specs { margin-bottom: 0.7rem; }
        .flip-specs-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.26rem;
        }
        .flip-specs-value {
          font-size: 0.72rem;
          color: var(--text-primary);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── CTA ───────────────────────────────────────────── */
        .flip-cta {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
          padding: 0.48rem 0.78rem;
          border-radius: 8px;
          font-size: 0.74rem;
          font-weight: 700;
          text-decoration: none;
          background: ${isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.06)'};
          border: 1px solid var(--border-default);
          color: var(--text-primary);
          transition: background 0.18s ease, color 0.18s ease,
                      border-color 0.18s ease, transform 0.18s ease,
                      box-shadow 0.18s ease;
        }
        .flip-cta:hover {
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          border-color: var(--btn-primary-border);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(59,130,246,0.3);
        }
        .flip-cta svg { transition: transform 0.18s ease; flex-shrink: 0; }
        .flip-cta:hover svg { transform: translateX(3px); }

        /* ── View All ──────────────────────────────────────── */
        .ps-view-all {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.82rem 2.1rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          border: 1px solid var(--btn-primary-border);
          box-shadow: 0 4px 18px rgba(59,130,246,0.24);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ps-view-all:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 28px rgba(59,130,246,0.36);
        }
        .ps-view-all svg { transition: transform 0.2s ease; }
        .ps-view-all:hover svg { transform: translateX(4px); }

      `}</style>
    </section>
  );
};

export default ProductsSection;