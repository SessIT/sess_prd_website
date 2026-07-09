import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

// Import the floating components
import FloatingParticles from './UI/FloatingParticles';
import FloatingIcons from './UI/FloatingIcons';
import FloatingOrbs from './UI/FloatingOrbs';

// Import your product images
import Product1 from '../assets/product/environmental.png';
import Product2 from '../assets/product/Salt Spray.png';
import Product3 from '../assets/product/Rain Test.png';
import Product4 from '../assets/product/Walk In.png';
import Product5 from '../assets/product/Thermal Cyclic.png';
import Product6 from '../assets/product/Thermal Shock.png';
import Product7 from '../assets/product/CO2 Test Chamber.png';
import Product8 from '../assets/product/Climatic Test Chamber.png';
import Product9 from '../assets/product/Flame-Proof Hot Air Oven.png';
import Product10 from '../assets/product/Battery.png';
import Product11 from '../assets/product/hotair-oven.png';

const products = [
  { id: 1, name: 'Environmetal Test Chamber', category: 'industry', image: Product1, link: '/products', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Top Rated' },
  { id: 2, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product2, link: '/salt-spray-test-chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'Certified' },
  { id: 3, name: 'Rain Test Chamber', category: 'medical', image: Product3, link: '/rain-test-chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Flow rate: 1–100 L/min adjustable', badge: 'IPX6' },
  { id: 4, name: 'Walk In Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Freq: 5–2000Hz · Payload: 100kg', badge: 'New' },
  { id: 5, name: 'Thermal Cyclic Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp: 5°C/min · Cycles: Customizable', badge: 'Best Seller' },
  { id: 6, name: 'Thermal Shock Chamber', category: 'industry', image: Product6, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Pro' },
  { id: 7, name: 'Salt Spray Chamber', category: 'pharma', image: Product7, link: '/salt-spray-test-chamber', description: 'Advanced corrosion resistance testing', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'Certified' },
  { id: 8, name: 'Rain Test System', category: 'medical', image: Product8, link: '/rain-test-chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Flow rate: 1–100 L/min adjustable', badge: 'IPX6' },
  { id: 9, name: 'Flame-Proof Hot Air Oven', category: 'trading', image: Product9, link: '#', description: 'High-precision vibration simulation', specs: 'Freq: 5–2000Hz · Payload: 100kg', badge: 'New' },
  { id: 10, name: 'Battery Test Chamber', category: 'industry', image: Product10, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp: 5°C/min · Cycles: Customizable', badge: 'Best Seller' },
  { id: 11, name: 'Hot Air Oven', category: 'industry', image: Product11, link: '/environmental_test_chamber', description: 'Precision climate control — next generation', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Pro' },
  { id: 12, name: 'Corrosion Test Chamber', category: 'pharma', image: Product2, link: '/salt-spray-test-chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'Certified' },
];

// Category → accent colour (used only in dynamic inline styles)
// const categoryColors = {
//   industry: { main: '#00b3b3', soft: 'rgba(0,179,179,0.15)', pill: 'linear-gradient(135deg,#00b3b3cc,#00b3b388)' },
//   pharma: { main: '#2a56a6', soft: 'rgba(42,86,166,0.15)', pill: 'linear-gradient(135deg,#2a56a6cc,#2a56a688)' },
//   medical: { main: '#16a34a', soft: 'rgba(22,163,74,0.15)', pill: 'linear-gradient(135deg,#16a34acc,#16a34a88)' },
// };

// Badge colour map (dynamic inline only)
const getBadgeStyle = (badge) => {
  const map = {
    'Top Rated': { bg: 'rgba(245,184,0,0.18)', color: '#f500db55', border: 'rgba(245,184,0,0.4)' },
    'Certified': { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', border: 'rgba(22,163,74,0.4)' },
    'IPX6': { bg: 'rgba(42,86,166,0.15)', color: '#4a70b4', border: 'rgba(42,86,166,0.4)' },
    'New': { bg: 'rgba(220,38,38,0.15)', color: '#ef4444', border: 'rgba(220,38,38,0.4)' },
    'Best Seller': { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' },
    'Pro': { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', border: 'rgba(99,102,241,0.4)' },
    'GMP Ready': { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', border: 'rgba(22,163,74,0.4)' },
    'ISO 60529': { bg: 'rgba(42,86,166,0.15)', color: '#4a70b4', border: 'rgba(42,86,166,0.4)' },
    'Multi-Axis': { bg: 'rgba(245,184,0,0.18)', color: '#f500db55', border: 'rgba(245,184,0,0.4)' },
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
      /* Card shell — Tailwind */
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
        /* hover: scale handled by motion spring, so no Tailwind hover:scale */
      ].join(' ')}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Spotlight */}
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
//   const col = categoryColors[product.category] || categoryColors.industry;
//   const badgeStyle = getBadgeStyle(product.badge);
  const delay = (index % 5) * 0.06 + Math.floor(index / 5) * 0.04;

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
        {/* Image container */}
        <div
            className="relative w-full p-2 overflow-hidden group"
            style={{ aspectRatio: '1/1' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            />

            {/* 🔥 HOVER OVERLAY */}
            <div
            className={`
                absolute inset-0 flex items-end justify-center        
                transition-all duration-300
                ${hovered ? 'opacity-100' : 'opacity-0'}
            `}
            >
            <h3 className={`
                mb-0 px-4 py-1 text-xs text-center
                rounded-sm backdrop-blur-md w-full
                ${isDark ? 'text-black bg-white/70' : 'text-black bg-black/10'}
            `}
            >
            {product.name}
            </h3>
            </div>
        </div>
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
      {/* ── Floating ambient elements ── */}
      {/* <FloatingParticles isDark={isDark} containerRef={sectionRef} />
      <FloatingIcons isDark={isDark} containerRef={sectionRef} />
      <FloatingOrbs isDark={isDark} /> */}

      {/* ── Mesh blobs ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        {/* Blob A */}
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
        {/* Blob B */}
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
        {/* Blob C */}
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

      {/* ── Dot grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }}
      />

      {/* ── Keyframes (only for blob drift & shimmer — cannot be expressed in Tailwind) ── */}
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

      {/* ─── Main container ─── */}
      <div className="container relative z-10 px-4 mx-auto">

        {/* ── Section header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          {/* Eyebrow row */}
          <motion.span
              style={{
                display: "block",
                color: "var(--color-primary-400)",
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-semibold)",
                fontSize: "var(--text-sm)",
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                marginBottom: "var(--space-2)",
              }}
            >
              Our Product
            </motion.span>
            <motion.h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                lineHeight: "var(--leading-tight)",
                color: isDark ? 'white' : 'black',
                margin: "0px",
              }}
            >
              Engineering excellence in every chamber
            </motion.h2>
        </motion.div>

        {/* ── Products grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
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
            {/* Shimmer sweep */}
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