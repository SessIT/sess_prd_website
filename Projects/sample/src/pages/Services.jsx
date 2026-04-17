import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {CompassCalibration,Engineering,Construction,AcUnit,Build,SystemUpdate,SettingsInputComponent,SupportAgent,Key,Layers,School} from "@mui/icons-material";
import AutoRenewIcon from "@mui/icons-material/AutoRenew";

import OtherDepartmentsSection from "../framework/OtherDept";

// Import achievement images directly
import client1 from "../assets/clients/client1.jpg";
import client2 from "../assets/clients/client2.jpg";
import client3 from "../assets/clients/client3.jpg";
import client4 from "../assets/clients/client4.jpg";
import client5 from "../assets/clients/client5.jpg";
import client6 from "../assets/clients/client6.jpg";

// ── Icon map (id → MUI icon component) ────────────────────────────────────
const iconMap = {
  1:  CompassCalibration,
  2:  Engineering,
  3:  Construction,
  4:  AcUnit,
  5:  Build,
  6:  SystemUpdate,
  7:  SettingsInputComponent,
  8:  AutoRenewIcon,
  9:  SupportAgent,
  10: Key,
  11: Layers,
  12: School,
};

// ── Achievement images array ──────────────────────────────────
const achievementImages = [
  { id: 1, src: client1, alt: "Client 1" },
  { id: 2, src: client2, alt: "Client 2" },
  { id: 3, src: client3, alt: "Client 3" },
  { id: 4, src: client4, alt: "Client 4" },
  { id: 5, src: client5, alt: "Client 5" },
  { id: 6, src: client6, alt: "Client 6" },
];

// ── Shared data (single source of truth) ──────────────────────────────────
const steps = [
  {
    id: 1,
    number: 1,
    title: "Calibration",
    description: "NABL accredited calibration ensuring 100% precision for scientific testing instruments.",
  },
  {
    id: 2,
    number: 2,
    title: "Maintenance",
    description: "Expert preventive maintenance (AMC) to eliminate downtime for environmental chambers.",
  },
  {
    id: 3,
    number: 3,
    title: "Installation",
    description: "Professional on-site installation and commissioning of industrial testing systems.",
  },
  {
    id: 4,
    number: 4,
    title: "Refrigeration",
    description: "Energy-efficient refrigeration upgrades for ultra-low temperature climatic chambers.",
  },
  {
    id: 5,
    number: 5,
    title: "Servicing",
    description: "Rapid repair and servicing for all brands of environmental equipment.",
  },
  {
    id: 6,
    number: 6,
    title: "Software Upgrades",
    description: "Latest controller software upgrades for enhanced automation and data logging.",
  },
  {
    id: 7,
    number: 7,
    title: "Spare Parts",
    description: "Genuine equipment spare parts available in stock for immediate replacement.",
  },
  {
    id: 8,
    number: 8,
    title: "Refurbishment",
    description: "Complete equipment refurbishment to modernize old chambers with latest technology.",
  },
  {
    id: 9,
    number: 9,
    title: "Technical Consulting",
    description: "Expert technical consultation for troubleshooting and complex scientific testing projects.",
  },
  {
    id: 10,
    number: 10,
    title: "Rental Services",
    description: "Flexible test chamber rentals on daily or monthly basis across India.",
  },
  {
    id: 11,
    number: 11,
    title: "Multiple Brands Support",
    description: "Comprehensive multibrand service support for various environmental testing manufacturers.",
  },
  {
    id: 12,
    number: 12,
    title: "Training Programs",
    description: " Professional technical training on environmental testing trends and equipment operation.",
  },
];

// ── Spotlight Card Component ───────────────────────────────────────────────
const SpotlightCard = ({ step, index, isActive, onMouseEnter, onMouseLeave }) => {
  const cardRef = useRef(null);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[step.id] || Build;
  const isHighlighted = isActive || isHovered;

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotPos({ x, y });
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    handleMouseMove(e);
    onMouseEnter(step.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl p-6 text-center overflow-hidden transition-all duration-300 border-2 cursor-pointer
        ${isHighlighted ? "border-[#00b3b3] shadow-xl -translate-y-2.5" : "border-transparent shadow-sm hover:shadow-md"}
        bg-white`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* ── Spotlight radial overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 2 : 0,
          background: `radial-gradient(circle 140px at ${spotPos.x}% ${spotPos.y}%, rgba(0,179,179,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 100%)`,
        }}
      />

      {/* Top gradient bar — slides in on active */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00b3b3] to-[#06b6d4] transition-all duration-300
          ${isHighlighted ? "scale-x-100" : "scale-x-0"}`}
      />

      {/* Number + Icon row */}
      <div className="flex justify-between items-center mb-5">
        <div
          className={`text-xl font-extrabold transition-all duration-300
            ${isHighlighted ? "text-[#00b3b3]" : "text-[#a9abac]"}`}
        >
          {String(step.number).padStart(2, "0")}
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
            ${isHighlighted
              ? "bg-gradient-to-r from-[#00b3b3] to-[#06b6d4] rotate-[10deg]"
              : "bg-[#f8fafc]"}`}
        >
          <IconComponent
            size={22}
            className={`transition-colors duration-300 ${isHighlighted ? "text-white" : "text-[#00b3b3]"}`}
          />
        </div>
      </div>

      {/* Title + Description */}
      <div className="mb-5 text-justify">
        <h3 className="text-base font-semibold mb-2 text-[#0f172a]">{step.title}</h3>
        <p className="text-sm text-[#64748b] leading-relaxed line-clamp-3">{step.description}</p>
      </div>

      {/* Bottom progress bar */}
      <div className="h-1 bg-[#e2e8f0] rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-[#00b3b3] to-[#06b6d4] transition-all duration-500
            ${isHighlighted ? "w-full" : "w-0"}`}
        />
      </div>
    </div>
  );
};

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

// ── Main Page ──────────────────────────────────────────────────────────────
const Service = () => {
  const [activeCard, setActiveCard]   = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollRef  = useRef(null);
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

  // Auto-rotate highlighted card every 3 s
  useEffect(() => {
    const cardTimer = setInterval(() => {
      setActiveCard((prev) => (prev === null ? 1 : prev === steps.length ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(cardTimer);
  }, []);

  // Sync the horizontal scroll track with the activeCard position
  useEffect(() => {
    if (scrollRef.current && activeCard !== null) {
      const CARD_W   = 180 + 16;
      const target   = (activeCard - 1) * CARD_W;
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [activeCard]);

  return (
    <div className="w-full bg-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
                           Reliable Service. Maximum Performance.
                         </motion.div>
             
                         <motion.h1
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                           className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                           Our Services
                         </motion.h1>
             
                         <motion.p
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.45, duration: 0.6 }}
                           className="text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed px-4">
                           Expert installation, maintenance, calibration, and PLC automation services for reliable industrial performance.                         </motion.p>
                       </motion.div>
                     </div>
                   </section>

      {/* ── 12 CARDS  –  smooth horizontal scroll ────────────────────────── */}
      <section className="py-14 px-6 md:px-16 bg-gradient-to-br from-[#f6f8ff] to-[#f0f4ff]">
        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
          {steps.map((step, index) => (
            <SpotlightCard
              key={step.id}
              step={step}
              index={index}
              isActive={activeCard === step.id}
              onMouseEnter={(id) => setHoveredCard(id)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </section>

      <OtherDepartmentsSection  />
      
      {/* ── ACHIEVEMENTS ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-lg font-bold text-cyan-400 mb-10">
          Our Achievement
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {achievementImages.map((client) => (
            <div key={client.id} className="group">
              <img
                src={client.src}
                alt={client.alt}
                className="w-full h-28 object-cover rounded-md shadow-md group-hover:scale-105 transition"
                style={{padding: '15px'}}
              />
              <p className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-cyan-400">
                More Details →
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;