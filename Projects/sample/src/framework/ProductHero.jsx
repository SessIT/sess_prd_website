import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { openEnquiry } from './openEnquiry';

// ProductHero Section
const ProductHero = ({ product }) => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = [
    { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
    { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
    { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
    { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
    { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
    { x: 65, y: 40, size: 55, delay: 3, color: 'rgb(2 174 178)' }
  ];

  const Particle = ({ x, y, size, delay, color }) => (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0.15
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.1, 0.25, 0.1],
        scale: [1, 1.3, 1]
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    />
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden text-white"
      style={{ 
        background: 'linear-gradient(135deg, rgb(34, 229, 245, 0.95) 0%, rgb(59, 91, 255, 0.95) 100%)',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Animated background blobs */}
      {[
        { color: '#22e5f5', top: '-15%', right: '-10%', w: 420 },
        { color: '#3b5bff', bottom: '-20%', left: '-8%', w: 380 },
        { color: 'rgb(94, 240, 255)', top: '30%', left: '40%', w: 260 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            width: b.w,
            height: b.w,
            background: b.color,
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            opacity: 0.18,
          }}
          animate={{
            x: (mousePos.x - 0.5) * (20 + i * 10),
            y: (mousePos.y - 0.5) * (15 + i * 8),
            scale: [1, 1.12, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 30, damping: 20 },
            y: { type: 'spring', stiffness: 30, damping: 20 },
            scale: { duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div className="relative w-full px-4 py-20 mx-auto max-w-7xl 2xl:max-w-[1440px] sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-md border-white/25"
            style={{ letterSpacing: '0.03em' }}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            {product.hero.tagline}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            {product.hero.mainTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mb-8 text-base leading-relaxed text-white/90 sm:text-lg md:text-xl"
          >
            {product.hero.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openEnquiry(product.hero.mainTitle)}
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-white bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors duration-200 border border-white/30"
          >
            {product.hero.ctaText}
            <span className="text-lg">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero;
