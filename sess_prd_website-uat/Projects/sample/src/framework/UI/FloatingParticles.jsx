import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FloatingParticles = ({ isDark, containerRef }) => {
  const [particles, setParticles] = useState([]);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef?.current) {
        const height = containerRef.current.offsetHeight;
        setContainerHeight(height);
      } else {
        // Fallback to window height if no container ref
        setContainerHeight(window.innerHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [containerRef]);

  useEffect(() => {
    if (containerHeight === 0) return;
    
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, () => ({
      id: Math.random(),
      left: `${Math.random() * 100}%`,
      animationDuration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      size: 4 + Math.random() * 8,
      opacity: 0.1 + Math.random() * 0.2,
      // Dynamic travel distance based on container height
      travelDistance: containerHeight + 100,
    }));
    setParticles(newParticles);
  }, [containerHeight]);

  if (containerHeight === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            bottom: "-20px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: isDark ? "var(--color-primary-400)" : "var(--color-primary-300)",
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -particle.travelDistance],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.animationDuration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;