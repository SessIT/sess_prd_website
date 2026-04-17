import React from "react";
import { motion } from "framer-motion";

const FloatingOrbs = ({ isDark }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ 
          y: ["0%", "100%", "0%"], 
          x: ["0%", "10%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "5%",
          width: "clamp(150px, 30vw, 300px)",
          height: "clamp(150px, 30vw, 300px)",
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.15,
          background: isDark ? "var(--color-primary-500)" : "var(--color-primary-200)",
        }}
      />
      <motion.div
        animate={{ 
          y: ["100%", "0%", "100%"], 
          x: ["0%", "-10%", "0%"],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "10%",
          width: "clamp(200px, 35vw, 350px)",
          height: "clamp(200px, 35vw, 350px)",
          borderRadius: "50%",
          filter: "blur(70px)",
          opacity: 0.12,
          background: isDark ? "var(--color-secondary-500)" : "var(--color-secondary-100)",
        }}
      />
      <motion.div
        animate={{ 
          y: ["50%", "0%", "50%"], 
          x: ["0%", "15%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "50%",
          top: "20%",
          width: "clamp(120px, 25vw, 250px)",
          height: "clamp(120px, 25vw, 250px)",
          borderRadius: "50%",
          filter: "blur(55px)",
          opacity: 0.1,
          background: isDark ? "var(--color-accent-500)" : "var(--color-accent-100)",
        }}
      />
    </div>
  );
};

export default FloatingOrbs;