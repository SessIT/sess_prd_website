import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cpu, Zap, BarChart3, Settings2, Shield,
  ArrowRight, ChevronRight, Activity, Layers,
  GitBranch, MonitorCheck, Wrench, FlaskConical,
} from 'lucide-react';

// ─────────────────────────────────────────────────────
// FLOATING PARTICLE
// ─────────────────────────────────────────────────────
const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.14 }}
    animate={{ y: [0, -35, 0], opacity: [0.08, 0.22, 0.08], scale: [1, 1.35, 1] }}
    transition={{ duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

// ─────────────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────────────
const ServiceCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, scale: 1.015 }}
    className="relative p-6 overflow-hidden transition-all duration-500 border shadow-lg cursor-default group bg-white/80 backdrop-blur-md border-slate-200/70 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/15"
  >
    {/* Hover gradient wash */}
    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-br from-cyan-50/60 via-cyan-50/30 to-transparent rounded-2xl" />

    {/* Left accent bar */}
    <motion.div
      initial={{ scaleY: 0 }}
      whileHover={{ scaleY: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="absolute left-0 top-0 bottom-0 w-[3px] origin-center rounded-l-2xl
                 bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600 shadow-lg shadow-cyan-400/40"
    />

    {/* Icon */}
    <motion.div
      whileHover={{ rotate: 6, scale: 1.12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="inline-flex items-center justify-center w-12 h-12 mb-4 transition-shadow duration-300 border shadow-md rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-100 border-cyan-200/60 group-hover:shadow-cyan-300/50"
    >
      <item.icon className="w-6 h-6 text-cyan-500" strokeWidth={1.6} />
    </motion.div>

    {/* Title */}
    <h3 className="mb-2 text-base font-bold transition-colors duration-300 text-slate-800 group-hover:text-cyan-600">
      {item.title}
    </h3>

    {/* Description */}
    <p className="text-sm leading-relaxed transition-colors duration-300 text-slate-500 group-hover:text-slate-600">
      {item.description}
    </p>

    {/* Bottom tag */}
    <div className="flex flex-wrap gap-2 mt-4">
      {item.tags.map((t, i) => (
        <span key={i}
          className="text-[10px] px-2.5 py-1 rounded-full font-semibold
                     bg-cyan-50 text-cyan-600 border border-cyan-200/60
                     group-hover:bg-cyan-100 group-hover:border-cyan-300 transition-all duration-300">
          {t}
        </span>
      ))}
    </div>

    {/* Inset glow on hover */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ boxShadow: 'inset 0 0 28px rgba(251,146,60,0.14)' }}
    />
  </motion.div>
);

// ─────────────────────────────────────────────────────
// WORKFLOW STEP
// ─────────────────────────────────────────────────────
const WorkflowStep = ({ step, index, total }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex flex-col items-center text-center"
  >
    {/* Connector line */}
    {index < total - 1 && (
      <div className="absolute z-0 hidden w-full h-px md:block left-28 top-6"
        style={{ background: 'linear-gradient(to right, #00b3b3, #00b3b3)'}} />
    )}

    {/* Step circle */}
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative z-10 flex items-center justify-center w-12 h-12 mb-3 rounded-full shadow-lg bg-gradient-to-br from-cyan-500 to-cyan-500 shadow-cyan-400/30"
    >
      <step.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border-2 border-cyan-400
                      flex items-center justify-center text-[9px] font-black text-cyan-600">
        {index + 1}
      </div>
    </motion.div>

    <h4 className="mb-1 text-sm font-bold text-slate-200">{step.title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed max-w-[130px]">{step.desc}</p>
  </motion.div>
);

// ─────────────────────────────────────────────────────
// TECH BADGE
// ─────────────────────────────────────────────────────
// const TechBadge = ({ name, color, index }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.8 }}
//     whileInView={{ opacity: 1, scale: 1 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.4, delay: index * 0.06, type: 'spring', stiffness: 250 }}
//     whileHover={{ y: -4, scale: 1.06 }}
//     className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border bg-white/90 backdrop-blur-sm
//                shadow-md hover:shadow-lg transition-all duration-300 cursor-default"
//     style={{ borderColor: `${color}33` }}
//   >
//     <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}88` }} />
//     <span className="text-sm font-semibold text-slate-700">{name}</span>
//   </motion.div>
// );

// ═════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════
const LabviewPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  // ── Particles ──────────────────────────────────────
  const particles = [
    { x: 8,  y: 15, size: 70, delay: 0,   color: 'rgb(59 130 246)' },
    { x: 82, y: 8,  size: 95, delay: 1.4, color: '#f59e0b' },
    { x: 48, y: 72, size: 55, delay: 0.7, color: '#fb923c' },
    { x: 92, y: 55, size: 75, delay: 2.1, color: '#fbbf24' },
    { x: 18, y: 88, size: 45, delay: 0.9, color: 'rgb(59 130 246)' },
    { x: 68, y: 38, size: 60, delay: 2.8, color: '#f59e0b' },
  ];

  // ── Services ────────────────────────────────────────
  const services = [
    {
      icon: Cpu,
      title: 'PLC Programming & Integration',
      description: 'Expert PLC programming for Siemens, Allen-Bradley, Mitsubishi, and Schneider platforms. We design ladder logic, function block diagrams, and structured text for reliable industrial automation.',
      tags: ['Siemens S7', 'Allen-Bradley', 'Modbus'],
    },
    {
      icon: Activity,
      title: 'LabVIEW Application Development',
      description: 'Custom LabVIEW VIs and test executive applications for data acquisition, instrument control, and automated measurement using NI hardware and GPIB/USB/PXI interfaces.',
      tags: ['NI DAQ', 'GPIB', 'VISA'],
    },
    {
      icon: BarChart3,
      title: 'SCADA & HMI Design',
      description: 'WinCC, Ignition, and LabVIEW-based SCADA systems with real-time dashboards, historical trending, alarm management, and secure remote monitoring capabilities.',
      tags: ['WinCC', 'Ignition', 'OPC-UA'],
    },
    {
      icon: FlaskConical,
      title: 'Automated Test Systems (ATE)',
      description: 'Turn-key ATE solutions using NI TestStand + LabVIEW for functional testing, burn-in, production validation, and regulatory compliance across electronics and mechanical systems.',
      tags: ['NI TestStand', 'ATE', 'IEC 61010'],
    },
    {
      icon: GitBranch,
      title: 'Process Control & Feedback Loops',
      description: 'Closed-loop PID controller design, tuning, and commissioning for temperature, pressure, flow, and motion control applications in industrial furnaces and test chcyans.',
      tags: ['PID Tuning', 'Motion Control', 'Feedback'],
    },
    {
      icon: MonitorCheck,
      title: 'Condition Monitoring & IoT',
      description: 'Real-time condition monitoring of equipment using vibration, temperature, and current sensors connected via Ethernet/IP, PROFINET, and MQTT to cloud dashboards.',
      tags: ['PROFINET', 'MQTT', 'Edge IoT'],
    },
  ];

  // ── Stats ───────────────────────────────────────────
  const stats = [
    { label: 'PLCs Programmed',      value: 120,  suffix: '+' },
    { label: 'LabVIEW Applications Efficiency', value: 85,   suffix: '%' },
    { label: 'Test Systems Built',   value: 40,   suffix: '+' },
    { label: 'Customer Uptime',      value: 99,   suffix: '%' },
  ];

  // ── Workflow ────────────────────────────────────────
  const workflow = [
    { icon: Layers,      title: 'Requirement Analysis', desc: 'Process & I/O mapping with client team' },
    { icon: GitBranch,   title: 'Architecture Design',  desc: 'Control logic & HMI screen planning' },
    { icon: Cpu,         title: 'PLC / LabVIEW Coding', desc: 'Structured, modular, documented code' },
    { icon: FlaskConical,title: 'Commissioning & FAT',  desc: 'Factory acceptance test & site trial' },
    { icon: Shield,      title: 'Handover & Support',   desc: '24/7 remote support & SLA coverage' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-cyan-50/20">

      {/* ── Hero ──────────────────────────────────────── */}
      <section
                     ref={heroRef}
                     className="relative overflow-hidden text-white"
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
             
                     <div className="relative w-full px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
                       <motion.div
                         initial={{ opacity: 0, y: 40 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                         className="max-w-3xl mx-auto text-center"
                       >
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
                           Driven by Innovation. Defined by Quality.
                         </motion.div>
             
                         <motion.h1
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                           className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-4xl bg-clip-text bg-gradient-to-r from-white to-blue-200">
                           PLC & LabView Programming
                         </motion.h1>
             
                         <motion.p
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.45, duration: 0.6 }}
                           className="px-4 text-base leading-relaxed text-gray-200 sm:text-lg md:text-lg">
                           Leading manufacturer of climatic test chambers and industrial refrigeration systems delivering innovative, energy-efficient solutions.                   </motion.p>
                       </motion.div>
                     </div>
                   </section>

      {/* ════════════════ STATS BAR ════════════════ */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-px overflow-hidden border shadow-2xl bg-cyan-100 border-cyan-100 md:grid-cols-4 rounded-2xl"
          >
            {stats.map((s, i) => (
              <div key={i}
                className="flex flex-col items-center px-6 py-6 text-center transition-colors duration-300 bg-white/95 backdrop-blur-sm hover:bg-cyan-50/80">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-cyan-500 tabular-nums">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wider uppercase text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SERVICES ════════════════ */}
      <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <span
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
              Our Capabilites
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                lineHeight: "var(--leading-tight)",
                color: "black",
                margin: "0px",
              }}
            >
              End-to-End Automation Solutions
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => (
              <ServiceCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ WORKFLOW ════════════════ */}
      <section className="relative px-4 py-20 overflow-hidden sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">

        {/* Background orbs */}
        <motion.div
          className="absolute rounded-full bg-cyan-500 -top-24 -right-24 w-72 h-72 blur-3xl"
          animate={{ opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ pointerEvents: 'none' }}
        />
        <motion.div
          className="absolute rounded-full -bottom-24 -left-24 w-72 h-72 bg-cyan-500 blur-3xl"
          animate={{ opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1.2 }}
          style={{ pointerEvents: 'none' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span
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
              Our Capabilites
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                lineHeight: "var(--leading-tight)",
                color: "white",
                margin: "0px",
              }}
            >
              End-to-End Automation Solutions
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {workflow.map((step, i) => (
              <WorkflowStep key={i} step={step} index={i} total={workflow.length} />
            ))}
          </div>

          {/* Highlight row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3"
          >
            {[
              { icon: Shield,      label: 'ISO-Compliant',     sub: 'All systems meet IEC & ISA standards' },
              { icon: Zap,         label: '48-hr Response',    sub: 'Quick turnaround on emergency support' },
              { icon: MonitorCheck, label: '99% Uptime SLA',   sub: 'Remote monitoring & proactive alerts' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-start gap-4 p-5 transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/8 hover:border-cyan-400/30"
              >
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/20 border-cyan-400/20">
                  <item.icon className="w-5 h-5 text-cyan-300" strokeWidth={1.6} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">{item.label}</div>
                  <div className="text-xs leading-relaxed text-slate-400">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-10 overflow-hidden text-center border shadow-2xl rounded-3xl sm:p-14 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-slate-700/50"
          >
            {/* Background orbs */}
            <motion.div
              className="absolute w-56 h-56 rounded-full bg-cyan-500 -top-20 -right-20 blur-3xl"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              style={{ pointerEvents: 'none' }}
            />
            <motion.div
              className="absolute w-56 h-56 rounded-full -bottom-20 -left-20 bg-cyan-500 blur-3xl"
              animate={{ opacity: [0.12, 0.22, 0.12] }}
              transition={{ duration: 5.5, repeat: Infinity, delay: 1 }}
              style={{ pointerEvents: 'none' }}
            />

            <div className="relative z-10">
              {/* Badge */}
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
              Ready to Automate your Process?
            </motion.span>
            <motion.h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                lineHeight: "var(--leading-tight)",
                color: "white",
                margin: "0px",
              }}
            >
              Let's Build your Next Automation System Together
            </motion.h2>


              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row"
              >
                <motion.a
                  href="/#/contact"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 20px #008080' }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden text-base font-bold text-white transition-all duration-300 shadow-xl cursor-pointer group/cta rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 hover:from-cyan-600 hover:via-cyan-500 hover:to-cyan-600"
                >
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/0 to-white/10 group-hover/cta:opacity-100" />
                  <span className="relative flex items-center gap-2">
                    Start a Project
                    <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </motion.div>
                  </span>
                </motion.a>
              </motion.div>

              {/* Trust tags */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-5 mt-8 text-sm sm:flex-row text-slate-400"
              >
                {['IEC-Compliant Code', 'Siemens & NI Certified', 'On-Site & Remote Support'].map((t, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-400">✓</span>
                      <span>{t}</span>
                    </div>
                    {i < 2 && <div className="hidden w-px h-4 sm:block bg-slate-700" />}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LabviewPage;
