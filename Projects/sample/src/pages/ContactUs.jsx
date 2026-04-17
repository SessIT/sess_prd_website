import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON — follows cursor on hover
───────────────────────────────────────────── */
const MagneticButton = ({ children, className, style, type, disabled, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={className}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

/* ─────────────────────────────────────────────
   FLOATING PARTICLE
───────────────────────────────────────────── */
const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.15 }}
    animate={{ y: [0, -30, 0], opacity: [0.1, 0.25, 0.1], scale: [1, 1.3, 1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ─────────────────────────────────────────────
   TILT CARD — 3D tilt on mouse hover
───────────────────────────────────────────── */
const TiltCard = ({ children, className, style }) => {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 12);
    rotX.set(-py * 12);
  };
  const handleLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 800, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   ANIMATED INPUT FIELD
───────────────────────────────────────────── */
const FloatingInput = ({ label, id, name, type = 'text', value, onChange, required, placeholder, as: Tag = 'input', rows }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <motion.label
        htmlFor={id}
        className="absolute z-10 font-medium transition-all duration-300 pointer-events-none left-4"
        animate={{
          top: focused || hasValue ? -10 : Tag === 'textarea' ? 14 : '50%',
          translateY: focused || hasValue ? 0 : Tag === 'textarea' ? 0 : '-50%',
          fontSize: focused || hasValue ? '11px' : '14px',
          color: focused ? 'rgb(2 174 178)' : hasValue ? '#6b7280' : '#9ca3af',
          background: focused || hasValue ? 'white' : 'transparent',
          paddingLeft: focused || hasValue ? 4 : 0,
          paddingRight: focused || hasValue ? 4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}{required && ' *'}
      </motion.label>

      <Tag
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={focused ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-4 text-sm text-gray-800 transition-all duration-300 border-2 outline-none resize-none rounded-2xl bg-white/70 backdrop-blur-sm"
        style={{
          borderColor: focused ? 'rgb(2 174 178)' : '#e5e7eb',
          boxShadow: focused ? '0 4px 20px rgba(2,174,178,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
          paddingTop: Tag === 'textarea' ? '1.25rem' : '1rem',
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   CONTACT INFO ITEM
───────────────────────────────────────────── */
const InfoItem = ({ icon, title, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="flex items-start gap-4 cursor-default group"
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{ x: hov ? 6 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-2xl"
        animate={{ background: hov ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', scale: hov ? 1.1 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <div className="mt-1 text-sm leading-relaxed text-blue-200">{children}</div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const ContactLink = ({ href, children, className = '' }) => (
  <a
    href={href}
    className={`transition-colors duration-200 hover:text-cyan-700 ${className}`}
  >
    {children}
  </a>
);

/* ─────────────────────────────────────────────
   DEPARTMENT CONTACT CARD — compact landscape tile (3-col grid)
───────────────────────────────────────────── */
const DepartmentContactCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.94, y: 12 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.42, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, boxShadow: '0 20px 44px rgba(2,174,178,0.14)' }}
    className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-[0_6px_22px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 transition-all duration-300 hover:ring-cyan-200 cursor-default"
  >
    {/* top accent bar */}
    <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    {/* badge + status */}
    <div className="flex items-center gap-2 mb-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-50 to-blue-100 text-[11px] font-black text-cyan-700 shadow-inner transition-transform duration-300 group-hover:scale-110">
        {item.badge}
      </div>
      {/* department name */}
      <h3 className="mt-2 mb-2.5 text-sm font-bold leading-snug text-slate-900 truncate">{item.department}</h3>
      <span className="right-4 absolute h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" />
    </div>

    {/* contact details */}
    <div className="justify-between space-y-1 text-sm font-medium text-slate-600">
      <p className="flex items-center gap-1.5 truncate">
        <svg className="w-4 h-4 shrink-0 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <ContactLink href={`tel:${item.phone.replace(/\s+/g, '')}`} className="text-slate-700">{item.phone}</ContactLink>
      </p>
      <p className="flex items-center gap-1.5 truncate">
        <svg className="w-4 h-4 shrink-0 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <ContactLink href={`mailto:${item.email}`} className="truncate text-slate-700">{item.email}</ContactLink>
      </p>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   BRANCH CARD — portrait style
───────────────────────────────────────────── */
const BranchCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ x: 4 }}
    className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-[0_6px_22px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(2,174,178,0.13)] hover:ring-cyan-200 cursor-default"
  >
    <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-cyan-400 to-blue-500" />

    <div className="flex items-center gap-4 pl-2">
      {/* icon */}
      <div className="grid w-10 h-10 transition-transform duration-300 shadow-inner shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-50 to-blue-100 group-hover:scale-110">
        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h1M9 13h1M9 17h1M14 13h1M14 17h1" />
        </svg>
      </div>

      {/* details */}
      <div className="flex-1 min-w-0">
        <h3 className="mb-1.5 text-sm font-bold leading-snug text-slate-900 truncate">{item.name}</h3>
        <div className="space-y-1 text-sm font-medium text-slate-600">
          <p className="flex items-center gap-1.5 truncate">
            <svg className="w-4 h-4 shrink-0 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <ContactLink href={`tel:${item.phone.replace(/\s+/g, '')}`} className="text-slate-700">{item.phone}</ContactLink>
          </p>
          <p className="flex items-center gap-1.5 truncate">
            <svg className="w-4 h-4 shrink-0 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <ContactLink href={`mailto:${item.email}`} className="truncate text-slate-700">{item.email}</ContactLink>
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   REGIONAL PARTNER CARD — landscape style
───────────────────────────────────────────── */
const PartnerCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ x: -4 }}
    className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-[0_6px_22px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(99,60,210,0.12)] hover:ring-violet-200 cursor-default"
  >
    <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-violet-400 to-fuchsia-500" />

    <div className="flex items-center gap-4 pl-2">
      {/* icon */}
      <div className="grid w-10 h-10 transition-transform duration-300 shadow-inner shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-100 group-hover:scale-110">
        <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0zm6 1a3 3 0 10-3-5.197M6 11a3 3 0 113-5.197" />
        </svg>
      </div>

      {/* details */}
      <div className="flex-1 min-w-0">
        <h3 className="mb-1.5 text-sm font-bold leading-snug text-slate-900 truncate">{item.name}</h3>
        <div className="space-y-1 text-sm font-medium text-slate-600">
          <p className="flex items-center gap-1.5 truncate">
            <svg className="w-4 h-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <ContactLink href={`tel:${item.phone.replace(/\s+/g, '')}`} className="text-slate-700">{item.phone}</ContactLink>
          </p>
          <p className="flex items-center gap-1.5 truncate">
            <svg className="w-4 h-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <ContactLink href={`mailto:${item.email}`} className="truncate text-slate-700">{item.email}</ContactLink>
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await new Promise((r) => setTimeout(r, 1800));
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3500);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const particles = [
    { x: 10, y: 20, size: 60, delay: 0,   color: 'rgb(2 174 178)' },
    { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
    { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
    { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
    { x: 20, y: 85, size: 40, delay: 1,   color: '#0ea5e9' },
    { x: 65, y: 40, size: 55, delay: 3,   color: 'rgb(2 174 178)' },
  ];

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  // 9 department contacts — rendered in a 3×3 grid
  const chennaiDepartmentContacts = [
    { badge: 'MD', department: 'Managing Director',  phone: '+91 94444 59430', email: 'easwari.kjsb@gmail.com' },
    { badge: 'TD', department: 'Technical Director',  phone: '+91 94444 27748', email: 'info@sess.co.in' },
    { badge: 'AD', department: 'Administrative',      phone: '+91 75488 73688', email: 'admin@sess.co.in' },
    { badge: 'HR', department: 'Human Resources',                  phone: '+91 75488 70106', email: 'hr@sess.co.in' },
    { badge: 'PM', department: 'Production Manager',  phone: '+91 75488 70206', email: 'tech-support@sess.co.in' },
    { badge: 'QT', department: 'Quality/Design Team',        phone: '+91 75488 70516', email: 'design.qc@sess.co.in' },
    { badge: 'SM', department: 'Service Manager',     phone: '+91 75488 73690', email: 'tech-support@sess.co.in' },
    { badge: 'PT', department: 'Purchasing Team',     phone: '+91 75488 74688', email: 'purchase@sess.co.in' },
  ];

  // 3 branch offices
  const branchCards = [
    { name: 'Bangalore',   phone: '+91 90664 38450', email: 'tech-support@sess.co.in' },
    { name: 'Pune',  phone: '+91 73488 79688', email: 'tech-support@sess.co.in' },
    { name: 'Delhi', phone: '+91 75488 79688', email: 'tech-support@sess.co.in' },
  ];

  // 3 regional partners
  const partnerCards = [
    { name: 'West India Partner',  phone: '+91 94444 59430', email: 'info@sess.co.in' },
    { name: 'North India Partner', phone: '+91 94444 27748', email: 'info@sess.co.in' },
    { name: 'East India PartnerD',  phone: '+91 75488 74688', email: 'easwari.kjsb@gmail.com' },
  ];

  return (
    <div className="overflow-hidden" style={{ cursor: 'default' }}>

      {/* ══════════════════════════════════════════
          SECTION 1 — BANNER / HERO
      ══════════════════════════════════════════ */}
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
              We’re Here to Help You.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-4xl bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Get In Touch
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="px-4 text-base leading-relaxed text-gray-200 sm:text-lg md:text-lg">
              Contact us for customized climatic test chambers, refrigeration systems, and expert technical support.            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — CONTACT INFO + FORM
      ══════════════════════════════════════════ */}
      <section className="px-4 py-8 bg-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl"
            style={{
              // boxShadow: '0 32px 80px 12px rgba(2,174,178,0.12), 0 0 0 1px rgba(0,179,179,0.18)',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid #00b3b3',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* LEFT PANEL */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative p-10 overflow-hidden text-white lg:col-span-2"
                style={{ background: 'var(--gradient-brand)' }}
              >
                {[{ x: '5%', y: '8%', s: 100 }, { x: '70%', y: '55%', s: 80 }, { x: '20%', y: '80%', s: 60 }].map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full mix-blend-screen"
                    style={{ width: p.s, height: p.s, left: p.x, top: p.y, background: 'rgba(255,255,255,0.05)', filter: 'blur(16px)' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
                  />
                ))}

                <div className="relative z-10 flex flex-col h-full space-y-8">
                  <div>
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-[0.15em] mb-2">Contact Information</p>
                    <h2 className="mb-3 text-2xl font-bold">Let's Build Something Great</h2>
                    <p className="text-sm leading-relaxed text-blue-200">
                      Sri Easwari Scientific Solution Pvt Ltd — your trusted partner for environmental test chambers and precision scientific solutions.
                    </p>
                  </div>

                  <div className="flex-1 space-y-6">
                    <InfoItem
                      title="Visit Our Facility"
                      icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    >
                      Door No 2/298, ANE Garden,<br />
                      Perumal kovil Street, Srinivasapuram,<br />
                      Paraniputhur post, Iyyappanthangal,<br />
                      Chennai - 600 122.
                    </InfoItem>

                    <InfoItem
                      title="Let's Talk"
                      icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
                    >
                      <span className="font-medium text-white/80">Phone:</span> +91 75488 73688<br />
                      <span className="font-medium text-white/80">Mobile:</span> +91 75488 70106
                    </InfoItem>

                    <InfoItem
                      title="Working Hours"
                      icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    >
                      Monday to Saturday<br />
                      9:30 AM – 6:30 PM
                    </InfoItem>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT PANEL / FORM */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-10 bg-white lg:col-span-3"
              >
                <div className="max-w-xl">
                  <div className="mb-10">
                    <motion.span
                      className="inline-block text-sm font-bold uppercase tracking-[0.15em] mb-2"
                      style={{ color: 'rgb(2 174 178)' }}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Send a Message
                    </motion.span>
                    <h2 className="mb-2 text-3xl font-bold text-gray-900" style={{ letterSpacing: '-0.02em' }}>We'd Love to Hear From You</h2>
                    <p className="text-sm leading-relaxed text-gray-500">
                      Please complete the form. Our team will respond within two business days.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FloatingInput label="Full Name" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FloatingInput label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="hello@example.com" />
                      <FloatingInput label="Phone Number" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 12345 67890" />
                    </div>

                    <FloatingInput label="Your Message" id="message" name="message" as="textarea" rows={5} value={formData.message} onChange={handleChange} required placeholder="Tell us about your requirements…" />

                    <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row">
                      <MagneticButton
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        style={{
                          background: 'var(--gradient-brand)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'white',
                          fontWeight: 700,
                          padding: '0.9rem 2.4rem',
                          borderRadius: '100px',
                          border: 'none',
                          cursor: formStatus === 'submitting' ? 'not-allowed' : 'pointer',
                          opacity: formStatus === 'submitting' ? 0.75 : 1,
                          boxShadow: '0 8px 28px rgba(2,174,178,0.35)',
                          letterSpacing: '0.02em',
                          fontSize: '0.95rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : formStatus === 'success' ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            Message Sent!
                          </>
                        ) : formStatus === 'error' ? 'Try Again' : (
                          <>
                            Send Message
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </>
                        )}
                      </MagneticButton>
                    </div>

                    <AnimatePresence>
                      {formStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          className="flex items-start gap-3 p-4 text-sm border bg-emerald-50 border-emerald-200 text-emerald-800 rounded-2xl"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          Thanks for reaching out! Our team will get back to you shortly.
                        </motion.div>
                      )}
                      {formStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 text-sm text-red-800 border border-red-200 bg-red-50 rounded-2xl"
                        >
                          Something went wrong. Please try again later.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* SECTION 3 - CONTACT NETWORK */}
      <section className="relative px-4 py-12 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
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
              Contanct Directory
            </motion.span>
            <motion.h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                lineHeight: "var(--leading-tight)",
                color: "black",
                margin: "0px",
              }}
            >
              Reach the right Desk Faster
            </motion.h2>
          </motion.div>

          {/* ── DEPARTMENT CONTACTS — 3×3 landscape grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl p-6 shadow-[0_24px_70px_rgba(15,23,42,0.2)] mb-6"
          >
            <div className="relative">
              {/* header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-400/15">
                  <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-2 mb-2.5 text-base font-bold leading-snug text-slate-900 truncate">Department Contacts</h3>
              </div>

              {/* 3×3 grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {chennaiDepartmentContacts.map((item, index) => (
                  <DepartmentContactCard key={item.department} item={item} index={index} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── BRANCHES — 1 row × 3 cols ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className='mb-4'
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-50">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h1M9 13h1M9 17h1M14 13h1M14 17h1" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-600">Our Other Office's</p>
                <h3 className="text-base font-bold leading-none text-slate-900">Branch's</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {branchCards.map((item, index) => (
                <BranchCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          {/* ── REGIONAL PARTNERS — 1 row × 3 cols ── */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0zm6 1a3 3 0 10-3-5.197M6 11a3 3 0 113-5.197" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-600">Channel Partners</p>
                <h3 className="text-base font-bold leading-none text-slate-900">Regional Partners</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {partnerCards.map((item, index) => (
                <PartnerCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — MAP
      ══════════════════════════════════════════ */}

      <section className="px-4 bg-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden border border-gray-100 rounded-2xl"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #00b3b3' }}
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgba(2,174,178,0.1)' }}>
                <svg className="w-4 h-4" style={{ color: 'rgb(2 174 178)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Our Location</h3>
                <p className="text-xs text-gray-400">Iyyappanthangal, Chennai - 600 122</p>
              </div>
            </div>
            <div className="relative w-full" style={{ height: '420px' }}>
              <iframe
                title="SESS Office Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(15%) contrast(1.05)' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.038677333783!2d80.12924997321086!3d13.033209013528332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261ad624f5ea1%3A0xea4e39d0daf5271c!2sSRI%20EASWARI%20SCIENTIFIC%20SOLUTION%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1774509646021!5m2!1sen!2sin"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — FEATURE CARDS
      ══════════════════════════════════════════ */}
      <section className="px-4 py-12 pb-24 bg-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: (
                  <svg className="w-6 h-6" style={{ color: 'rgb(2 174 178)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Quality Assurance',
                text: 'All our environmental test chambers undergo rigorous quality testing and certification.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" style={{ color: 'rgb(2 174 178)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Trusted Partner',
                text: 'Serving industries across India with reliable and precision-engineered solutions.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" style={{ color: 'rgb(2 174 178)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Expert Support',
                text: 'Our technical team provides end-to-end support from selection to installation.',
              },
            ].map((card, i) => (
              <TiltCard
                key={i}
                className="p-6 bg-white border border-gray-100 cursor-default rounded-2xl"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
              >
                <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl" style={{ background: 'rgba(2,174,178,0.08)' }}>
                    {card.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{card.text}</p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
