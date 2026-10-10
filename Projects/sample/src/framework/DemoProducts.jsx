import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';
import { SectionHeader } from './SharedUI';

// Import the floating components
import FloatingParticles from './UI/FloatingParticles';
import FloatingIcons from './UI/FloatingIcons';
import FloatingOrbs from './UI/FloatingOrbs';

// Import your product images
import Product1 from '../assets/product/Climatic_chamber_front.webp';
import Product2 from '../assets/product/Salt Spray.webp';
import Product3 from '../assets/product/Rain Test.webp';
import Product4 from '../assets/product/VibrationChamber.webp';
import Product5 from '../assets/product/Thermal Cyclic.webp';
import Product6 from '../assets/product/TabletopChamber.webp';
import Product7 from '../assets/product/walkin.webp';
import Product8 from '../assets/product/DustChamber.webp';
import Product9 from '../assets/product/Flame-Proof Hot Air Oven.webp';
import Product10 from '../assets/product/Battery.webp';
import Product11 from '../assets/product/ThermalShockTestChamber.webp';
import Product12 from '../assets/product/TensileChamber.webp';

const products = [
  { id: 1, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/climatic-test-chamber', description: 'Precision climate control for reliable testing', specs: 'Temperature and humidity control', badge: 'Top Rated' },
  { id: 6, name: 'Battery Test Chamber', category: 'industry', image: Product10, link: '/battery-test-chamber', description: 'Safe, controlled battery validation', specs: 'Temperature controlled battery testing', badge: 'New' },
  { id: 2, name: 'Salt Spray Test Chamber', category: 'industry', image: Product2, link: '/salt-spray-test-chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117 compliant', badge: 'Certified' },
  { id: 3, name: 'Rain Test Chamber', category: 'industry', image: Product3, link: '/rain-test-chamber', description: 'Water ingress testing for product validation', specs: 'Adjustable flow rate', badge: 'IPX6' },
  { id: 4, name: 'Vibration Combined Climatic Test Chamber', category: 'industry', image: Product4, link: '/vibration-test-chamber', description: 'Simulate real-world vibration conditions', specs: 'Frequency and payload configurable', badge: 'New' },
  { id: 5, name: 'Thermal Cyclic Chamber', category: 'industry', image: Product5, link: '/thermal-cyclic-chamber', description: 'Accelerated thermal stress testing', specs: 'Programmable thermal cycles', badge: 'Best Seller' },
  { id: 7, name: 'Flame Proof Hot Air Oven', category: 'industry', image: Product9, link: '/flame-proof-hot-air-oven', description: 'Safe heating for hazardous industrial environments', specs: 'Flame-proof construction and precise temperature control', badge: 'New' },
  { id: 8, name: 'Thermal Shock Chamber', category: 'industry', image: Product11, link: '/thermal-shock-chamber', description: 'Rapid temperature transition testing', specs: 'Wide temperature range and fast cycling', badge: 'New' },
  { id: 9, name: 'Tabletop Test Chamber', category: 'industry', image: Product6, link: '/tabletop-test-chamber', description: 'Compact testing solution for various applications', specs: 'Space-saving design and easy operation', badge: 'New' },
  { id: 10, name: 'Walk-In Chamber', category: 'industry', image: Product7, link: '/walk-in-chamber', description: 'Spacious testing environment for large products', specs: 'Customizable size and features', badge: 'New' },
  { id: 11, name: 'Dust Chamber', category: 'industry', image: Product8, link: '/dust-chamber', description: 'Dust resistance testing for products', specs: 'EUCAR Hazard Level 7 compliant', badge: 'New' },
  { id: 12, name: 'Tensile Chamber', category: 'industry', image: Product12, link: '/tensile-chamber', description: 'Material testing under tensile stress', specs: 'Precise tensile testing capabilities', badge: 'New' },
];

// Badge colour map (dynamic inline only)
const getBadgeStyle = (badge) => {
  const map = {
    'Top Rated': { bg: 'rgba(245,184,0,0.18)', color: '#b45309', border: 'rgba(245,184,0,0.4)' },
    'Certified': { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', border: 'rgba(22,163,74,0.4)' },
    'IPX6': { bg: 'rgba(42,86,166,0.15)', color: '#4a70b4', border: 'rgba(42,86,166,0.4)' },
    'New': { bg: 'rgba(220,38,38,0.15)', color: '#ef4444', border: 'rgba(220,38,38,0.4)' },
    'Best Seller': { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' },
    'Pro': { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', border: 'rgba(99,102,241,0.4)' },
    'GMP Ready': { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', border: 'rgba(22,163,74,0.4)' },
    'ISO 60529': { bg: 'rgba(42,86,166,0.15)', color: '#4a70b4', border: 'rgba(42,86,166,0.4)' },
    'Multi-Axis': { bg: 'rgba(245,184,0,0.18)', color: '#b45309', border: 'rgba(245,184,0,0.4)' },
    'ALT Ready': { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' },
  };
  return map[badge] || { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' };
};

// ─────────────────────────────────────────────
// 3-D Tilt wrapper  (motion values only, no CSS)
// ─────────────────────────────────────────────
const TiltCard = ({ children, isDark }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
    setSpotX(((e.clientX - r.left) / r.width) * 100);
    setSpotY(((e.clientY - r.top) / r.height) * 100);
  }, [x, y]);

  const onEnter = () => { scale.set(1.03); setHovered(true); };
  const onLeave = () => { x.set(0); y.set(0); scale.set(1); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      className={[
        'relative rounded-[10px] overflow-hidden cursor-pointer',
        'border transition-[border-color,box-shadow] duration-300 will-change-transform',
        isDark
          ? 'bg-gradient-to-br from-[#1c2230] to-[#161b22] border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]'
          : 'bg-gradient-to-br from-white to-[#f5f7fa] border-black/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]',
        'hover:border-[rgba(0,179,179,0.35)]',
        isDark
          ? 'hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,179,179,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]'
          : 'hover:shadow-[0_20px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,179,179,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]',
      ].join(' ')}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className="absolute inset-0 rounded-[18px] pointer-events-none z-[3] transition-all duration-150"
        style={{
          background: hovered
            ? `radial-gradient(200px circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.10), transparent 70%)`
            : 'transparent',
        }}
      />
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Single product card
// ─────────────────────────────────────────────
const ProductCard = ({ product, index, isAnimating, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 5) * 0.06 + Math.floor(index / 5) * 0.04;
  const badgeStyle = getBadgeStyle(product.badge);

  const variants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 22, delay } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isAnimating ? 'hidden' : 'visible'}
      exit="exit"
      style={{ perspective: '1280px' }}
    >
      <TiltCard isDark={isDark}>
        <Link
          to={product.link}
          onClick={(e) => product.link === '#' && e.preventDefault()}
          className="block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image container */}
          <div
              className="relative w-full p-2 overflow-hidden bg-white group"
              style={{ aspectRatio: '1/1' }}
          >
              {/* Category badge */}
              {/* <span
                className={`absolute top-3 left-3 z-[2] px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase backdrop-blur-sm transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
                style={{
                  background: badgeStyle.bg,
                  color: badgeStyle.color,
                  border: `1px solid ${badgeStyle.border}`,
                }}
              >
                {product.badge}
              </span> */}

              {/* Image */}
              <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="object-contain w-full h-full transition-transform duration-500"
              style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
              />

              {/* Soft teal glow rising from the bottom on hover */}
              <div
                className={`absolute inset-x-0 bottom-0 h-20 pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(to top, rgba(0,179,179,0.12), transparent)' }}
              />
          </div>

          {/* Info bar — always visible: name + spec line + arrow, with an
              animated gradient underline on hover (no more blank strip) */}
          <div
            className={`relative px-4 pt-3 pb-3.5 border-t transition-colors duration-300 ${
              isDark ? 'border-white/[0.06]' : 'border-black/[0.05]'
            } ${
              hovered
                ? (isDark ? 'bg-[rgba(0,179,179,0.10)]' : 'bg-[#f0fbfb]')
                : (isDark ? 'bg-transparent' : 'bg-white')
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3
                title={product.name}
                className={`m-0 text-sm font-semibold leading-snug truncate transition-colors duration-300 ${
                  hovered ? 'text-[#00b3b3]' : isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {product.name}
              </h3>
              <span
                className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                  hovered
                    ? 'bg-[#00b3b3] text-white translate-x-0 opacity-100 shadow-[0_4px_10px_rgba(0,179,179,0.35)]'
                    : `${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-400'} -translate-x-1 opacity-70`
                }`}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <p
              title={product.description}
              className={`m-0 mt-1 text-xs leading-snug truncate transition-opacity duration-300 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              } ${hovered ? 'opacity-100' : 'opacity-60'}`}
            >
              {product.description}
            </p>

            {/* Gradient underline sweep */}
            <span
              className={`absolute bottom-0 left-0 h-[2.5px] w-full origin-left transition-transform duration-500 ease-out ${
                hovered ? 'scale-x-100' : 'scale-x-0'
              }`}
              style={{ background: 'linear-gradient(90deg, #00b3b3, #2a56a6)' }}
            />
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
const ProductsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filter, setFilter] = useState('*');
  const [isAnimating, setIsAnimating] = useState(false);
  const [filterCount, setFilterCount] = useState({});
  const pendingFilter = useRef(null);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  const setRefs = useCallback((node) => {
    sectionRef.current = node;
    ref(node);
  }, [ref]);

  useEffect(() => {
    const counts = { '*': products.length };
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    setFilterCount(counts);
  }, []);

  const handleFilterChange = useCallback((val) => {
    if (val === filter || isAnimating) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingFilter.current = val;
    setIsAnimating(true);
    timerRef.current = setTimeout(() => {
      setFilter(pendingFilter.current);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(false)));
    }, 180);
  }, [filter, isAnimating]);

  const filteredProducts = filter === '*' ? products : products.filter(p => p.category === filter);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const filterBarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={setRefs}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ background: 'var(--surface-default)' }}
    >
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            top: '-200px', left: '-150px',
            background: 'radial-gradient(circle, rgba(0,179,179,0.12), transparent 70%)',
            filter: 'blur(120px)',
            animation: 'blobDrift 18s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            bottom: '-150px', right: '-100px',
            background: 'radial-gradient(circle, rgba(42,86,166,0.10), transparent 70%)',
            filter: 'blur(120px)',
            animation: 'blobDrift 22s ease-in-out infinite alternate-reverse',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            top: '40%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(245,184,0,0.06), transparent 70%)',
            filter: 'blur(120px)',
            animation: 'blobDrift 26s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }}
      />

      <style>{`
        @keyframes blobDrift {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(30px,-20px) scale(1.06); }
          100% { transform: translate(-20px,30px) scale(0.95); }
        }
        @keyframes shimmerPass {
          0%,100% { background-position: -100% 0; }
          50%     { background-position:  200% 0; }
        }
        .animate-shimmer-btn {
          animation: shimmerPass 2.8s ease-in-out infinite;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
          background-size: 200% 100%;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <SectionHeader eyebrow="Our Product" title="Engineering excellence in every chamber" isDark={isDark} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isAnimating={isAnimating}
                isDark={isDark}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to="/products"
            className={[
              'group inline-flex items-center gap-[0.7rem] px-[2.4rem] py-[0.88rem]',
              'rounded-full text-[0.9rem] font-bold font-body no-underline text-white',
              'relative overflow-hidden tracking-[0.01em]',
              'transition-[transform,box-shadow] duration-[220ms]',
              'hover:-translate-y-[3px] hover:scale-[1.02]',
            ].join(' ')}
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
              boxShadow: '0 4px 20px rgba(0,179,179,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,179,179,0.45), inset 0 1px 0 rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,179,179,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'}
          >
            <span
              className="absolute inset-0 pointer-events-none animate-shimmer-btn"
              aria-hidden="true"
            />
            <span className="relative z-[1]">View All Products</span>
            <span className="relative z-[1] inline-flex transition-transform duration-200 group-hover:translate-x-1">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>       
      </div>
    </section>
  );
};

export default ProductsSection;
