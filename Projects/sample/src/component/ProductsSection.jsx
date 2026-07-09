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
import Product1 from '../assets/product/1.png';
import Product2 from '../assets/product/2.png';
import Product3 from '../assets/product/3.png';
import Product4 from '../assets/product/4.png';
import Product5 from '../assets/product/5.png';
import Product6 from '../assets/product/6.png';
import Product7 from '../assets/product/7.png';
import Product8 from '../assets/product/8.png';
import Product9 from '../assets/product/9.png';
import Product10 from '../assets/product/10.png';

const products = [
  { id: 1, name: 'Climatic Test Chamber', category: 'industry', image: Product1, link: '/products', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Top Rated' },
  { id: 2, name: 'Salt Spray Test Chamber', category: 'pharma', image: Product2, link: '/salt-spray-test-chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'Certified' },
  { id: 3, name: 'Rain Test Chamber', category: 'medical', image: Product3, link: '/rain-test-chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Flow rate: 1–100 L/min adjustable', badge: 'IPX6' },
  { id: 4, name: 'Vibration Test Chamber', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration conditions', specs: 'Freq: 5–2000Hz · Payload: 100kg', badge: 'New' },
  { id: 5, name: 'Thermal Cyclic Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp: 5°C/min · Cycles: Customizable', badge: 'Best Seller' },
  { id: 6, name: 'Environmental Chamber', category: 'industry', image: Product6, link: '/environmental_test_chamber', description: 'Precision climate control for reliable testing', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Pro' },
  { id: 7, name: 'Salt Spray Chamber', category: 'pharma', image: Product7, link: '/salt-spray-test-chamber', description: 'Advanced corrosion resistance testing', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'Certified' },
  { id: 8, name: 'Rain Test System', category: 'medical', image: Product8, link: '/rain-test-chamber', description: 'IPX1 to IPX6 water ingress testing', specs: 'Flow rate: 1–100 L/min adjustable', badge: 'IPX6' },
  { id: 9, name: 'Vibration System', category: 'trading', image: Product9, link: '#', description: 'High-precision vibration simulation', specs: 'Freq: 5–2000Hz · Payload: 100kg', badge: 'New' },
  { id: 10, name: 'Thermal Stress Chamber', category: 'industry', image: Product10, link: '/thermal_cycling_chamber', description: 'Accelerated thermal stress testing', specs: 'Ramp: 5°C/min · Cycles: Customizable', badge: 'Best Seller' },
  { id: 11, name: 'Climatic Chamber Pro', category: 'industry', image: Product1, link: '/environmental_test_chamber', description: 'Precision climate control — next generation', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Pro' },
  { id: 12, name: 'Corrosion Test Chamber', category: 'pharma', image: Product2, link: '/salt-spray-test-chamber', description: 'Corrosion resistance testing made easy', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'Certified' },
  { id: 13, name: 'Rain Ingress System', category: 'medical', image: Product3, link: '/rain-test-chamber', description: 'Full IPX rating water ingress platform', specs: 'Flow rate: 1–100 L/min adjustable', badge: 'IPX6' },
  { id: 14, name: 'Dynamic Vibration Unit', category: 'trading', image: Product4, link: '#', description: 'Simulate real-world vibration for durability', specs: 'Freq: 5–2000Hz · Payload: 100kg', badge: 'New' },
  { id: 15, name: 'Rapid Thermal Chamber', category: 'industry', image: Product5, link: '/thermal_cycling_chamber', description: 'Ultra-fast thermal cycling for stress testing', specs: 'Ramp: 5°C/min · Cycles: Customizable', badge: 'Best Seller' },
  { id: 16, name: 'Precision Climate Unit', category: 'industry', image: Product6, link: '/environmental_test_chamber', description: 'Engineering-grade climate control chamber', specs: 'Temp: -70°C to 180°C · Humidity: 20%–98%', badge: 'Top Rated' },
  { id: 17, name: 'Pharma Salt Spray', category: 'pharma', image: Product7, link: '/salt-spray-test-chamber', description: 'Pharmaceutical-grade corrosion testing', specs: 'ASTM B117 · JIS Z2371 compliant', badge: 'GMP Ready' },
  { id: 18, name: 'Medical Rain Test Unit', category: 'medical', image: Product8, link: '/rain-test-chamber', description: 'Medical device water ingress compliance', specs: 'Flow rate: 1–100 L/min adjustable', badge: 'ISO 60529' },
  { id: 19, name: 'Industrial Vibration Lab', category: 'trading', image: Product9, link: '#', description: 'Multi-axis vibration testing platform', specs: 'Freq: 5–2000Hz · Payload: 100kg', badge: 'Multi-Axis' },
  { id: 20, name: 'Advanced Thermal System', category: 'industry', image: Product10, link: '/thermal_cycling_chamber', description: 'Next-gen accelerated life testing', specs: 'Ramp: 5°C/min · Cycles: Customizable', badge: 'ALT Ready' },
];

const categories = [
  { value: '*', label: 'All Products', icon: '◈' },
  { value: 'industry', label: 'Industry', icon: '⚙' },
  { value: 'pharma', label: 'Pharma', icon: '⚗' },
  { value: 'medical', label: 'Medical', icon: '⊕' },
  { value: 'trading', label: 'Trading', icon: '◎' },
];

// Category → accent colour (used only in dynamic inline styles)
const categoryColors = {
  industry: { main: '#00b3b3', soft: 'rgba(0,179,179,0.15)', pill: 'linear-gradient(135deg,#00b3b3cc,#00b3b388)' },
  pharma: { main: '#2a56a6', soft: 'rgba(42,86,166,0.15)', pill: 'linear-gradient(135deg,#2a56a6cc,#2a56a688)' },
  medical: { main: '#16a34a', soft: 'rgba(22,163,74,0.15)', pill: 'linear-gradient(135deg,#16a34acc,#16a34a88)' },
  trading: { main: '#f500db55', soft: 'rgba(245,184,0,0.15)', pill: 'linear-gradient(135deg,#f500db55cc,#f500db5588)' },
};

// Badge colour map (dynamic inline only)
// const getBadgeStyle = (badge) => {
//   const map = {
//     'Top Rated': { bg: 'rgba(245,184,0,0.18)', color: '#f500db55', border: 'rgba(245,184,0,0.4)' },
//     'Certified': { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', border: 'rgba(22,163,74,0.4)' },
//     'IPX6': { bg: 'rgba(42,86,166,0.15)', color: '#4a70b4', border: 'rgba(42,86,166,0.4)' },
//     'New': { bg: 'rgba(220,38,38,0.15)', color: '#ef4444', border: 'rgba(220,38,38,0.4)' },
//     'Best Seller': { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' },
//     'Pro': { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', border: 'rgba(99,102,241,0.4)' },
//     'GMP Ready': { bg: 'rgba(22,163,74,0.15)', color: '#16a34a', border: 'rgba(22,163,74,0.4)' },
//     'ISO 60529': { bg: 'rgba(42,86,166,0.15)', color: '#4a70b4', border: 'rgba(42,86,166,0.4)' },
//     'Multi-Axis': { bg: 'rgba(245,184,0,0.18)', color: '#f500db55', border: 'rgba(245,184,0,0.4)' },
//     'ALT Ready': { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' },
//   };
//   return map[badge] || { bg: 'rgba(0,179,179,0.15)', color: '#00b3b3', border: 'rgba(0,179,179,0.4)' };
// };

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
        'relative rounded-[18px] overflow-hidden cursor-pointer',
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
  const col = categoryColors[product.category] || categoryColors.industry;
  // const badgeStyle = getBadgeStyle(product.badge);
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
      style={{ perspective: '1200px' }}
    >
      <TiltCard isDark={isDark}>
        {/* ── Glow ring (dynamic colour via inline) ── */}
        <div
          className="absolute -inset-px rounded-[19px] p-px pointer-events-none opacity-0 transition-opacity duration-300 z-[2] group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${col.main}, transparent 60%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
          aria-hidden="true"
        />

        {/* ── Image container ── */}
        <div
          className={[
            'relative w-full overflow-hidden',
            isDark ? 'bg-[#0d1117]' : 'bg-[#f0f2f5]',
          ].join(' ')}
          style={{ aspectRatio: '4/3' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Product image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover block will-change-transform transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />

          {/* Shimmer sweep */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
              backgroundPosition: hovered ? '200% 0' : '-100% 0',
              transition: hovered ? 'background-position 0.7s ease' : 'none',
            }}
          />

          {/* Colour wash bottom */}
          <div
            className="absolute inset-0 pointer-events-none z-[2] transition-opacity duration-300"
            style={{
              background: `linear-gradient(to top, ${col.main}55 0%, transparent 60%)`,
              opacity: hovered ? 1 : 0.75,
            }}
          />

          {/* Badge */}
          {/* <div
            className="absolute top-[10px] right-[10px] z-[4] px-[0.6rem] py-[0.22rem] rounded-full text-[0.6rem] font-bold tracking-[0.06em] uppercase backdrop-blur-[8px] transition-[transform,box-shadow] duration-200"
            style={{
              background:  badgeStyle.bg,
              color:       badgeStyle.color,
              border:      `1px solid ${badgeStyle.border}`,
              transform:   hovered ? 'scale(1.08)' : 'scale(1)',
              boxShadow:   hovered ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {product.badge}
          </div> */}
        </div>

        {/* ── Content ── */}
        <div
          className="flex flex-col gap-2 px-[1.15rem] pt-[1.1rem] pb-[1.2rem] relative z-[2]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Category pill */}
          <span
            className="inline-flex self-start px-[0.6rem] py-[0.18rem] rounded-full text-[0.62rem] font-bold tracking-[0.05em] uppercase"
            style={{ background: col.soft, color: col.main }}
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>

          {/* Product name */}
          <h3
            className="font-display text-sm font-bold leading-[1.3] m-0 line-clamp-2 transition-colors duration-200"
            style={{ color: hovered ? col.main : 'var(--text-heading)' }}
          >
            {product.name}
          </h3>

          {/* Explore CTA */}
          <Link
            to={product.link}
            className="mt-1 inline-flex items-center justify-between gap-2 px-[0.85rem] py-[0.52rem] rounded-[10px] text-[0.73rem] font-bold no-underline transition-all duration-[220ms]"
            style={{
              color: col.main,
              background: hovered ? col.main : col.soft,
              // color: hovered ? '#fff' : col.main,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
              borderColor: hovered ? 'transparent' : undefined,
              transform: hovered ? 'translateY(-1px)' : 'none',
              boxShadow: hovered ? `0 6px 20px ${col.main}55` : 'none',
            }}
            onClick={(e) => product.link === '#' && e.preventDefault()}
          >
            <span>Explore Product</span>
            <span
              className="inline-flex transition-transform duration-200"
              style={{ transform: hovered ? 'translateX(3px)' : 'none' }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${col.main}, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />
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
      <FloatingParticles isDark={isDark} containerRef={sectionRef} />
      <FloatingIcons isDark={isDark} containerRef={sectionRef} />
      <FloatingOrbs isDark={isDark} />

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
          <div className="flex items-center justify-center gap-3 mb-4">
            
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[var(--color-primary-500)] font-body">
              Our Products
            </span>
            
          </div>

          {/* Title */}
          <h2
            className="font-display font-extrabold leading-[1.15] tracking-[-0.02em] mb-4 text-[var(--text-heading)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Engineering{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-500))' }}
            >
              Excellence
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base text-[var(--text-muted)] max-w-[480px] mx-auto leading-[1.65]">
            Precision-engineered test chambers trusted by industry leaders worldwide
          </p>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          variants={filterBarVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          role="tablist"
          aria-label="Product categories"
          className="relative z-20 flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const isActive = filter === cat.value;
            const col = categoryColors[cat.value] || null;
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={isActive}
                disabled={isAnimating}
                onClick={() => handleFilterChange(cat.value)}
                className={[
                  'relative inline-flex items-center gap-[0.4rem] px-[1.1rem] py-2 rounded-full',
                  'text-[0.78rem] font-semibold font-body overflow-hidden outline-none',
                  'transition-[color,border-color,transform] duration-200',
                  'backdrop-blur-[8px] -webkit-tap-highlight-color-transparent',
                  isActive
                    ? 'text-white border border-transparent'
                    : [
                      'text-[var(--text-muted)] border border-[var(--border-default)]',
                      isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]',
                      'hover:border-[var(--color-primary-400)] hover:text-[var(--text-heading)] hover:-translate-y-px',
                    ].join(' '),
                  isAnimating ? 'opacity-55 cursor-wait pointer-events-none' : '',
                ].join(' ')}
              >
                {/* Animated pill bg */}
                {isActive && (
                  <motion.span
                    layoutId="filterPill"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    className="absolute inset-0 z-0 rounded-full"
                    style={{ background: col ? col.pill : 'var(--btn-primary-bg)' }}
                  />
                )}
                <span className="relative z-[1] text-[0.9rem] opacity-85">{cat.icon}</span>
                <span className="relative z-[1]">{cat.label}</span>
                <span
                  className="relative z-[1] inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[0.62rem] font-bold"
                  style={{ background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.18)' }}
                >
                  {filterCount[cat.value] || 0}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Products grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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

        {/* ── View All CTA ── */}
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