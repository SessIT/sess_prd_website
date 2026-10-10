import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { openEnquiry } from './openEnquiry';
import Logo from '../assets/sess_logo_white.webp';

/* ─── Magnetic Social Button ───────────────────────── */
const MagneticSocial = ({ icon: Icon, url, label, delay }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
      viewport={{ once: true }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-center w-11 h-11 rounded-full cursor-pointer"
    >
      {/* Glow ring */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 18px 4px rgba(56,189,248,0.45)' }} />
      {/* Background */}
      <span className="absolute inset-0 rounded-full border border-white/10 bg-white/5 group-hover:bg-sky-500/20 group-hover:border-sky-400/40 transition-all duration-300" />
      <Icon className="relative z-10 text-slate-400 group-hover:text-sky-300 transition-colors duration-300" size={15} />
    </motion.a>
  );
};

/* ─── Animated Link ─────────────────────────────────── */
const FooterLink = ({ to, children, delay = 0 }) => (
  <motion.li
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    viewport={{ once: true }}
  >
    <Link
      to={to}
      className="group flex items-center gap-2 text-slate-400 hover:text-cyan-300 text-sm transition-colors duration-200"
    >
      <span className="block w-0 h-px bg-cyan-400 group-hover:w-4 transition-all duration-300" />
      {children}
    </Link>
  </motion.li>
);

/* ─── Section Heading ───────────────────────────────── */
// h2: footer columns are top-level sections; an h3 here skipped a level on
// pages without an h2 above the footer (Lighthouse "heading-order").
const SectionHeading = ({ children, delay = 0 }) => (
  <motion.h2
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="text-base font-semibold mb-6 tracking-widest uppercase"
    style={{
      background: 'linear-gradient(90deg, #00b3b3, #00b3b3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    {children}
  </motion.h2>
);

/* ─── Glass Card Wrapper ────────────────────────────── */
const GlassCard = ({ children, delay = 0, className = '', accent = 'sky' }) => {
  const accentMap = {
    sky:    { border: 'rgba(45,212,191,0.25)',  glow: 'rgba(45,212,191,0.12)' },
    violet: { border: 'rgba(45,212,191,0.25)',  glow: 'rgba(45,212,191,0.12)' },
    teal:   { border: 'rgba(45,212,191,0.25)',  glow: 'rgba(45,212,191,0.12)' },
    rose:   { border: 'rgba(45,212,191,0.25)',  glow: 'rgba(45,212,191,0.12)' },
  };
  const c = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={`relative rounded-2xl p-6 overflow-hidden ${className}`}
      style={{
        background: 'rgba(15,23,42,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${c.border}`,
        boxShadow: `0 4px 32px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Top-left inner shine */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)' }} />
      {/* Corner accent dot */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/* ─── Divider with center glow ──────────────────────── */
const GlowDivider = () => (
  <div className="relative h-px mx-4 my-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)' }} />
  </div>
);

/* ─── Footer ────────────────────────────────────────── */
const Footer = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://www.facebook.com/profile.php?id=100067759313976', label: 'Facebook' },
    { icon: FaTwitter,   url: 'https://x.com/sesschennai',                               label: 'Twitter' },
    { icon: FaInstagram, url: 'https://www.instagram.com/sesschennai/',                   label: 'Instagram' },
    { icon: FaYoutube,   url: 'https://www.youtube.com/@sesschennai',                     label: 'YouTube' },
  ];

  const productLinks = [
    { name: 'Climatic Test Chamber',          path: '/climatic-test-chamber' },
    { name: 'Battery Test Chamber',           path: '/battery-test-chamber' },
    { name: 'Salt Spray Test Chamber',        path: '/salt-spray-test-chamber' },
    { name: 'Rain Test Chamber',              path: '/rain-test-chamber' },
    { name: 'Vibration Combined Test Chamber', path: '/vibration-test-chamber' },
    { name: 'Thermal Cycling Chamber',        path: '/thermal-cyclic-chamber' },
    { name: 'Thermal Shock Test Chamber',     path: '/thermal-shock-chamber' },
    { name: 'Flame Proof Hot Air Oven',       path: '/flame-proof-hot-air-oven' },
    { name: 'Tabletop Test Chamber',          path: '/tabletop-test-chamber' },
    { name: 'Walk-In Chamber',                path: '/walk-in-chamber' },
    { name: 'Dust Chamber',                   path: '/dust-chamber' },
    { name: 'Tensile Chamber',                path: '/tensile-chamber' },
  ];

  const quickLinks = [
    { path: '/',          label: 'Home' },
    { path: '/about',     label: 'About' },
    { path: '/products',  label: 'Products' },
    { path: '/services',  label: 'Services' },
    { path: '/gallery',   label: 'Gallery' },
    { path: '/career',    label: 'Career' },
    { path: '/news',      label: 'News and Events' },
    { path: '/brochure',  label: 'Company Brochure' },
    { path: '/contact',   label: 'Contact Us' },
    { path: '/sitemap',   label: 'Sitemap' },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060d1a 0%, #080f1e 60%, #030813 100%)' }}
    >
      {/* ── Ambient background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)', top: '-10%', left: '-5%' }} />
        <div className="absolute w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', top: '20%', right: '5%' }} />
        <div className="absolute w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.04) 0%, transparent 70%)', bottom: '15%', left: '40%' }} />

        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }} />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* ── Col 1: Brand + Social ── */}
            <GlassCard delay={0} accent="sky">
              <motion.img
                src={Logo}
                alt="SESS"
                width={295}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto max-w-full object-contain object-left mb-5"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-slate-400 text-sm leading-relaxed mb-6"
              >
                Trusted manufacturer of precision environmental test chambers,
                delivering reliability and innovation across industries.
              </motion.p>

              {/* Social row */}
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((s, i) => (
                  <MagneticSocial key={i} icon={s.icon} url={s.url} label={s.label} delay={0.1 + i * 0.07} />
                ))}
              </div>

              {/* Decorative bottom bar */}
              <div className="mt-6 h-px w-full rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.5), rgba(139,92,246,0.3), transparent)' }} />
            </GlassCard>

            {/* ── Col 2: Products ── */}
            <GlassCard delay={0.1} accent="violet">
              <SectionHeading delay={0.1}>Products</SectionHeading>
              <ul className="space-y-3 list-none p-0 m-0">
                {productLinks.map((p, i) => (
                  <FooterLink key={i} to={p.path} delay={0.15 + i * 0.06}>{p.name}</FooterLink>
                ))}
              </ul>
            </GlassCard>

            {/* ── Col 3: Contact ── */}
            <GlassCard delay={0.2} accent="teal">
              <SectionHeading delay={0.2}>Contact Information</SectionHeading>
              <address className="not-italic text-slate-400 text-sm leading-relaxed space-y-3">
                <motion.p
                  className="m-0"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }} viewport={{ once: true }}
                >
                  Door No 2/298, ANE Garden, Perumal kovil Street,
                  Srinivasapuram, Paraniputhur post, Iyyappanthangal,
                  Chennai — 600 122.
                </motion.p>

                <motion.p
                  className="m-0"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.35 }} viewport={{ once: true }}
                >
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-0.5">Email</span>
                  <a href="mailto:easwari.kjsb@gmail.com"
                    className="text-teal-400 hover:text-teal-300 transition-colors duration-200 break-all">
                    easwari.kjsb@gmail.com
                  </a>
                </motion.p>

                <motion.p
                  className="m-0"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }} viewport={{ once: true }}
                >
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-0.5">Phone</span>
                  <a href="tel:+919444427748"
                    className="text-teal-400 hover:text-teal-300 transition-colors duration-200">
                    +91 94444 27748
                  </a>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.45 }} viewport={{ once: true }}
                >
                  <a
                    href="https://www.google.com/maps/dir//''/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x3a5261ad624f5ea1:0xea4e39d0daf5271c!3e0?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-1 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-teal-300 border border-teal-500/30 hover:bg-teal-500/10 transition-all duration-200"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    View Directions
                  </a>
                </motion.div>
              </address>
            </GlassCard>

            {/* ── Col 4: Quick Links ── */}
            <GlassCard delay={0.3} accent="rose">
              <SectionHeading delay={0.3}>Quick Links</SectionHeading>
              <ul className="space-y-3 list-none p-0 m-0">
                {quickLinks.map((link, i) => (
                  <FooterLink key={i} to={link.path} delay={0.35 + i * 0.06}>{link.label}</FooterLink>
                ))}
              </ul>

              {/* Small CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                viewport={{ once: true }}
                className="mt-6 p-3 rounded-xl text-center"
                style={{ background: 'rgba(0,179,179,0.06)', border: '1px solid rgba(0,179,179,0.20)' }}
              >
                <p className="text-xs text-slate-500 mb-2">Need a quote?</p>
                <button
                  onClick={() => openEnquiry()}
                  className="text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 tracking-wide bg-transparent border-none cursor-pointer"
                >
                  Request a Quote →
                </button>
              </motion.div>
            </GlassCard>

          </div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <GlowDivider />

      {/* ── COPYRIGHT BAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 py-5"
        style={{ background: 'rgba(0,0,0,0.4)' }}
      >
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p className="m-0">
              &copy; {new Date().getFullYear()} SESS — Proudly built by{' '}
              <a
                href="https://sesstech.sess.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-300 transition-colors duration-200"
              >
                SESS IT Team
              </a>
            </p>
            <div className="flex items-center gap-5">
              {[
                { label: 'Terms & Conditions', path: '/terms-and-conditions' },
                { label: 'Privacy Policy',     path: '/privacy-policy' },
                { label: 'Sitemap',            path: '/sitemap' },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-slate-700">|</span>}
                  <Link to={item.path} className="hover:text-slate-300 transition-colors duration-200">{item.label}</Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </footer>
  );
};

export default Footer;
