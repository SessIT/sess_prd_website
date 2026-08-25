import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Cog, Gauge, Cpu, Wrench,
  Rocket, Shield, Microscope, Leaf,
  ArrowRight
} from 'lucide-react';
import prd_des from '../assets/Website_Gallery_img/sess_prd_des.png';
import mech_des from '../assets/Website_Gallery_img/sess_mech_des.png';
import rev_eng from '../assets/Website_Gallery_img/sess_rev_engg.png';
import elec_sch from '../assets/Website_Gallery_img/sess_elec_schm.png';
import design_spt from '../assets/Website_Gallery_img/sess_des_spt.png';
import strc_des from '../assets/Website_Gallery_img/sess_strc_des.png';
import thermal_engg from '../assets/Website_Gallery_img/sess_them_engg.png';
import heat_load from '../assets/Website_Gallery_img/sess_heat_calc.png';

/* ─── Floating particle (hero only) ─── */
const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.15 }}
    animate={{ y: [0, -30, 0], opacity: [0.1, 0.25, 0.1], scale: [1, 1.3, 1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ─── Compact rectangle card ─── */
const FeatureCard = ({ card, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="group relative flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden border border-slate-100
               shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out"
  >
    {/* Top (mobile/tablet) / Left (desktop) – thumbnail; row layout waits for
        lg so the text column never collapses in the 2-col tablet grid */}
    <div className="relative w-full h-52 lg:w-56 lg:h-auto flex-shrink-0 overflow-hidden">
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0" />
    </div>

    {/* Bottom (mobile) / Right (desktop) – content */}
    <div className="flex flex-col flex-1 px-5 py-4 min-w-0">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <h3 className="text-md font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors duration-200">
          {card.title}
        </h3>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed text-justify">
        {card.description}
      </p>
    </div>

    {/* Subtle left-accent bar on hover */}
    <div
      className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500 scale-y-0 origin-center
                 group-hover:scale-y-100 transition-transform duration-300 ease-out rounded-full"
    />
  </motion.div>
);

/* ─── Main component ─── */
const MachineDesignTeam = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const particles = [
    { x: 10, y: 20, size: 60, delay: 0,   color: 'rgb(2,174,178)' },
    { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
    { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2,174,178)' },
    { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
    { x: 20, y: 85, size: 40, delay: 1,   color: '#0ea5e9' },
    { x: 65, y: 40, size: 55, delay: 3,   color: 'rgb(2,174,178)' },
  ];

  const cards = [
    {
      id: 1,
      icon: <Cog className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />,
      title: 'Product Design Services',
      description: 'Innovative product design solutions combining creativity, engineering expertise, and user-focused development to create functional, market-ready products.',
      tags: ['±0.001mm', 'ISO 9001:2025'],
      image: prd_des,
    },
    {
      id: 2,
      icon: <Gauge className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />,
      title: 'Mechanical Design Services',
      description: ' Precision mechanical design of components and assemblies using advanced engineering principles for reliable, cost-effective, and high-performance solutions.',
      tags: ['Efficiency: 94%', 'CFD Verified'],
      image: mech_des,
    },
    {
      id: 3,
      icon: <Cpu className="w-5 h-5 text-purple-500" strokeWidth={1.5} />,
      title: 'Reverse Engineering Services',
      description: 'Accurate reverse engineering to analyze, recreate, and improve existing products, helping recover design data and enhance performance.',
      tags: ['IIoT Ready', 'AI-Powered'],
      image: rev_eng,
    },
    {
      id: 4,
      icon: <Wrench className="w-5 h-5 text-amber-500" strokeWidth={1.5} />,
      title: 'Electrical Schematic Design',
      description: 'Professional electrical schematic and circuit design services for efficient system development, troubleshooting, and technical documentation.',
      tags: ['Lead Time: 48h', 'Metal/Plastic'],
      image: design_spt,
    },
    {
      id: 5,
      icon: <Rocket className="w-5 h-5 text-rose-500" strokeWidth={1.5} />,
      title: 'Design Support Services',
      description: ' Comprehensive CAD design support including 3D modeling, detailed drawings, tolerance analysis, and design optimization for prototyping and production.',
      tags: ['AS9100D', 'Composite Expert'],
      image: strc_des,
    },
    {
      id: 6,
      icon: <Shield className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />,
      title: 'Structural Design Services',
      description: 'High-quality structural engineering design ensuring strength, stability, and durability under real-world operating conditions.',
      tags: ['Safety Factor: 3.5×', 'FEA Tested'],
      image: thermal_engg,
    },
    {
      id: 7,
      icon: <Microscope className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />,
      title: 'Thermal Load Engineering Services',
      description: 'Advanced thermal load analysis for accurate HVAC system design, ensuring optimal performance and energy efficiency.',
      tags: ['Wear +200%', 'Patented'],
      image: elec_sch,
    },
    {
      id: 8,
      icon: <Leaf className="w-5 h-5 text-green-500" strokeWidth={1.5} />,
      title: 'Heat Load Calculation Services',
      description: 'Reliable residential, commercial, and industrial heat load calculations for precise HVAC sizing and energy-efficient climate control systems.',
      tags: ['Carbon Neutral', 'ISO 14001'],
      image: heat_load,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative text-white overflow-hidden flex items-center"
        style={{ background: 'var(--gradient-brand)', minHeight: '300px' }}
      >
        {[
          { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
          { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
          { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-3xl"
            style={{ width: b.w, height: b.w, background: b.color, top: b.top, bottom: b.bottom, left: b.left, right: b.right, opacity: 0.18 }}
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

        <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium mb-6 border border-white/25"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Stay Updated. Stay Ahead.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            >
              Products Design
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-200 leading-relaxed"
            >
              Stay updated on latest innovations, product launches, and industry events in climatic testing solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <FeatureCard key={card.id} card={card} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Engineer the Future?</h3>
            <p className="text-slate-300 mb-6 text-base">
              Let's collaborate on your next breakthrough machine design project.
            </p>            
            <motion.a
              href="/#/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }}
                              whileTap={{ scale: 0.98 }}
                              className="group/cta inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500
                                         hover:from-cyan-600 hover:via-cyan-500 hover:to-blue-600 text-white rounded-2xl font-bold text-base
                                         shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
                              <span className="relative flex items-center gap-2">
                                Schedule a Consultation
                                <motion.div
                                  animate={{ x: [0, 6, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                                </motion.div>
                              </span>
                            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MachineDesignTeam;