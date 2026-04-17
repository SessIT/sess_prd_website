import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BadgeSVG from "./Badges";

const CHAMBER_BADGES = [
  { name: "TEMP", shape: "circle", color: "#E24B4A", borderColor: "#00b3b3" },
  { name: "RH", shape: "circle", color: "#378ADD", borderColor: "#00b3b3" },
  { name: "RAIN", shape: "circle", color: "#378ADD", borderColor: "#00b3b3" },
  // { name: "Altitude", shape: "square", color: "#7F77DD", borderColor: "#7F77DD" },
  // { name: "Pressure", shape: "hexagon", color: "#EF9F27", borderColor: "#EF9F27" },
  // { name: "Volt", shape: "diamond", color: "#EF9F27", borderColor: "#EF9F27" },
  // { name: "Vibration", shape: "double-circle", color: "#1D9E75", borderColor: "#1D9E75" },
  // { name: "UV Index", shape: "octagon", color: "#D85A30", borderColor: "#D85A30" },
  // { name: "Wind", shape: "parallelogram", color: "#5DCAA5", borderColor: "#5DCAA5" },
  // { name: "Thermal Cycle", shape: "double-circle", color: "#E24B4A", borderColor: "#378ADD" },
  // { name: "Dew Point", shape: "pentagon", color: "#1D9E75", borderColor: "#1D9E75" },
  // { name: "Fan RPM", shape: "square", color: "#7F77DD", borderColor: "#7F77DD" },
];

const FloatingIcons = ({ isDark, containerRef }) => {
  const [items, setItems] = useState([]);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef?.current) {
        const height = containerRef.current.offsetHeight;
        setContainerHeight(height);
      } else {
        setContainerHeight(window.innerHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [containerRef]);

  useEffect(() => {
    if (containerHeight === 0) return;
    
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      badgeIndex: i % CHAMBER_BADGES.length,
      left: `${5 + Math.random() * 90}%`,
      duration: 16 + Math.random() * 5,
      delay: Math.random() * 16,
      opacity: 0.18 + Math.random() * 0.18,
      xDrift: (Math.random() - 0.5) * 100,
      travelDistance: containerHeight + 140,
    }));
    setItems(generated);
  }, [containerHeight]);

  if (containerHeight === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {items.map((item) => {
        const badge = CHAMBER_BADGES[item.badgeIndex];
        return (
          <motion.div
            key={item.id}
            style={{
              position: "absolute",
              left: item.left,
              top: "-80px",
            }}
            animate={{
              y: [0, item.travelDistance],
              x: [0, item.xDrift],
              rotate: [0, 360],
              opacity: [0, item.opacity, item.opacity, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
          >
            <BadgeSVG badge={badge} isDark={isDark} />
          </motion.div>
        );
      })}
    </div>
    
  );
};

export default FloatingIcons;