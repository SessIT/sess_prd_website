import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

import Product1  from '../assets/product1.jpeg';
import Product2  from '../assets/product2.jpeg';
import Product3  from '../assets/product3.jpeg';
import Product4  from '../assets/prd2.jpeg';
import Product5 from '../assets/prd3.jpeg';
import prd6 from '../assets/prd1.jpeg'

const products = [
  { id: 1, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 2, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product3, link: '/salt_spray_test_chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 3, name: 'Rain Test Chamber', category: 'medical', image: Product2, link: '/rain_test_chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 4, name: 'Vibration Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 5, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 6, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 7, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product3, link: '/salt_spray_test_chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 8, name: 'Rain Test Chamber', category: 'medical', image: Product2, link: '/rain_test_chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 9, name: 'Vibration Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 10, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: prd6, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 11, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 12, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product3, link: '/salt_spray_test_chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 13, name: 'Rain Test Chamber', category: 'medical', image: Product2, link: '/rain_test_chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 14, name: 'Vibration Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 15, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 16, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 17, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product3, link: '/salt_spray_test_chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 18, name: 'Rain Test Chamber', category: 'medical', image: prd6, link: '/rain_test_chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 19, name: 'Vibration Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 20, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product3, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
  { id: 21, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C, Humidity: 20% to 98%' },
  { id: 22, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product3, link: '/salt_spray_test_chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117, JIS Z2371 compliant' },
  { id: 23, name: 'Rain Test Chamber', category: 'medical', image: Product2, link: '/rain_test_chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Adjustable flow rate: 1-100 L/min' },
  { id: 24, name: 'Vibration Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Frequency: 5-2000Hz, Payload: 100kg' },
  { id: 25, name: 'Thermal Cyclic Test Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp rate: 5°C/min, Cycles: Customizable' },
];

const categories = [
  { value: '*', label: 'All' },
  { value: 'industry', label: 'Industry' },
  { value: 'pharma', label: 'Pharma' },
  { value: 'medical', label: 'Medical' },
  { value: 'trading', label: 'Trading' },
];

const ProductsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('*');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // ─── REMOVED: flippedCards state & handleCardClick (now handled via CSS hover) ───

  const filteredProducts = filter === '*'
    ? products
    : products.filter(p => p.category === filter);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--surface-default)' }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-2 px-3 py-1 rounded-full"
            style={{ 
              color: 'var(--color-primary-500)',
              background: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.05)'
            }}
          >
            Our Products
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))', lineHeight: 'var(--leading-tight)', color: 'var(--text-heading)', margin: '0px'}}
          >
            Explore Our Range
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            Cutting-edge testing solutions for modern laboratories
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => {
            const isActive = filter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => handleFilterChange(cat.value)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-lg scale-105' 
                    : 'hover:bg-primary-50 dark:hover:bg-primary-900/30'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--btn-primary-bg)' : 'transparent',
                  color: isActive ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                  border: `1px solid ${isActive ? 'var(--btn-primary-border)' : 'var(--border-default)'}`,
                }}
              >
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: 'var(--btn-primary-bg)' }}
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Products Grid — 4 cards per row, square aspect ratio, hover-flip */}
        <motion.div
          layout
          transition={{ duration: 0.2, type: "tween" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.05,
                  type: "tween",
                  ease: "easeOut"
                }}
                // ─── CHANGED: "flip-card" wrapper drives hover via CSS ───
                className="flip-card"
              >
                {/* ─── CHANGED: aspect-square replaces h-[320px] ─── */}
                <div className="flip-card-inner w-full aspect-square">

                  {/* Front Side — Full Image */}
                  <div
                    className="flip-card-front absolute inset-0 rounded-xl overflow-hidden"
                    style={{
                      background: 'var(--card-bg)',
                      border: 'var(--border-width-thin) solid var(--card-border)',
                      borderRadius: 'var(--card-radius)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Back Side — Details */}
                  <div
                    className="flip-card-back absolute inset-0 rounded-xl overflow-hidden"
                    style={{
                      background: 'var(--card-bg)',
                      border: 'var(--border-width-thin) solid var(--card-border)',
                      borderRadius: 'var(--card-radius)',
                      boxShadow: 'var(--card-shadow-hover)',
                    }}
                  >
                    <div className="h-full flex flex-col p-5">

                      {/* Header */}
                      <div className="mb-3">
                        <div
                          className="w-10 h-0.5 mb-3 rounded-full"
                          style={{ background: 'var(--color-primary-500)' }}
                        />
                        <h3
                          className="text-base font-bold mb-1.5 line-clamp-2"
                          style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-heading)',
                          }}
                        >
                          {product.name}
                        </h3>
                        <span
                          className="inline-block text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.1)',
                            color: 'var(--color-primary-500)',
                          }}
                        >
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="text-xs mb-3 leading-relaxed line-clamp-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {product.description}
                      </p>

                      {/* Specifications */}
                      <div className="mb-4">
                        <p
                          className="text-[10px] font-semibold mb-1.5 uppercase tracking-wider"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Key Specifications
                        </p>
                        <p
                          className="text-xs leading-relaxed line-clamp-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {product.specs}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={product.link}
                        className="mt-auto inline-flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group/btn"
                        style={{
                          background: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.05)',
                          border: '1px solid var(--border-default)',
                          color: 'var(--text-primary)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--btn-primary-bg)';
                          e.currentTarget.style.color = 'var(--btn-primary-text)';
                          e.currentTarget.style.borderColor = 'var(--btn-primary-border)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.05)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                          e.currentTarget.style.borderColor = 'var(--border-default)';
                        }}
                      >
                        <span className="font-semibold text-xs">Learn More</span>
                        <svg
                          className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              border: '1px solid var(--btn-primary-border)',
            }}
          >
            <span>View All Products</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>

      {/* ─── UPDATED CSS: hover-driven flip + square card via aspect-square ─── */}
      <style jsx>{`
        /* Square card — aspect-square on the motion wrapper sets the height */
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }

        /* Inner wrapper: relative + aspect-square makes the card perfectly square */
        .flip-card-inner {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ─── CHANGED: hover triggers the flip instead of a JS class ─── */
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Both faces share the same backface-visibility setup */
        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Back face starts rotated 180° so it appears when parent flips */
        .flip-card-back {
          transform: rotateY(180deg);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .grid > * {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;