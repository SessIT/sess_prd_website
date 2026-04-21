import DomeGallery from '../framework/Sample';
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from "react";

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

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    
      useEffect(() => {
        const handle = (e) => {
          setMousePos({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
          });
        };
        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
      }, []);
    
      const particles = [
        { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
        { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
        { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
        { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
        { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
        { x: 65, y: 40, size: 55, delay: 3, color: 'rgb(2 174 178)' }
      ];
  return (
    <div>
                              <section
                                 ref={heroRef}
                                 className="relative text-white overflow-hidden"
                                 style={{ background: 'var(--gradient-brand)', minHeight: '340px', display: 'flex', alignItems: 'center' }}
                               >
                                 {[
                                   { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
                                   { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
                                   { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
                                 ].map((b, i) => (
                                   <motion.div
                                     key={i}
                                     className="absolute rounded-full mix-blend-multiply filter blur-3xl"
                                     style={{
                                       width: b.w, height: b.w,
                                       background: b.color,
                                       top: b.top, bottom: b.bottom, left: b.left, right: b.right,
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
                         
                                 {particles.map((p, i) => <Particle key={i} {...p} />)}
                         
                                 <div
                                   className="absolute inset-0 opacity-[0.04]"
                                   style={{
                                     backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                                     backgroundSize: '48px 48px',
                                   }}
                                 />
                         
                                 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                                   <motion.div
                                     initial={{ opacity: 0, y: 40 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                     className="text-center max-w-3xl mx-auto"
                                   >
                                     <motion.div
                                       initial={{ scale: 0.8, opacity: 0 }}
                                       animate={{ scale: 1, opacity: 1 }}
                                       transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                                       className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium mb-8 border border-white/25"
                                       style={{ letterSpacing: '0.03em' }}
                                     >
                                       <span className="relative flex h-2 w-2">
                                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                         <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                       </span>
                                       Showcasing Excellence in Every Project.
                                     </motion.div>
                         
                                     <motion.h1
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                       className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                       Gallery
                                     </motion.h1>
                         
                                     <motion.p
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                       transition={{ delay: 0.45, duration: 0.6 }}
                                       className="text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed px-4">
                                       View our advanced climatic test chambers, refrigeration systems, and successful industrial project installations.                               
                                     </motion.p>
                                   </motion.div>
                                 </div>
                               </section>

      {/* <div style={{ width: '100vw', height: '100vh' }}>        */}
      <div className="w-full relative h-[500px] sm:h-[600px] lg:h-[800px]">    
        <DomeGallery
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={10}
          grayscale
        />
      </div>
    </div>
    
  );
}