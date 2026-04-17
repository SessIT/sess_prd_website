import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Cog, Gauge, Cpu, Wrench,
  Rocket, Shield, Microscope, Leaf,
  ArrowRight
} from 'lucide-react';
import TechStack from '../framework/UI/TechStack';

import web_dev from '../assets/Website_Gallery_img/sess_web_dev.png';
import webapp_dev from '../assets/Website_Gallery_img/sess_webapp_dev.png';
import soft_dev from '../assets/Website_Gallery_img/sess_soft_dev.jpeg';
import digi_mkt from '../assets/Website_Gallery_img/sess_digi_mart.jpeg';
import sms_email from '../assets/Website_Gallery_img/sess_bulk_sms_email.jpeg';
import seo_social from '../assets/Website_Gallery_img/sess_seo.jpeg';
/* ─── Floating particle (hero only) ─── */
const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.15 }}
    animate={{ y: [0, -30, 0], opacity: [0.1, 0.25, 0.1], scale: [1, 1.3, 1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ─── Premium Feature Card with Smooth Animations ─── */
const FeatureCard = ({ card, index }) => {
  // const [hoveredTag, setHoveredTag] = React.useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="relative flex overflow-hidden transition-all duration-500 ease-out border shadow-lg group bg-gradient-to-br from-white via-slate-50/50 to-slate-50 rounded-2xl border-slate-200/60 hover:shadow-2xl hover:shadow-cyan-500/20 backdrop-blur-sm"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 transition-all duration-700 pointer-events-none bg-gradient-to-r from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5" />

      {/* Left – content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.2, duration: 0.6 }}
        className="relative z-10 flex flex-col flex-1 min-w-0 px-6 py-4"
      >
        {/* Title + tags in one row */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 mb-2"
        >
          <h3 className="font-bold transition-colors duration-300 text-md text-slate-900 group-hover:text-cyan-600 whitespace-nowrap">
            {card.title}
          </h3>
        </motion.div>

        {/* Tags with stagger animation */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.35, duration: 0.5, staggerChildren: 0.08 }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {card.tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 + 0.35 + i * 0.05, duration: 0.4 }}
              onHoverStart={() => setHoveredTag(i)}
              onHoverEnd={() => setHoveredTag(null)}
              className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 
                         text-cyan-700 font-semibold border border-cyan-200/50 transition-all duration-300
                         hover:from-cyan-100 hover:to-blue-100 hover:border-cyan-400/50 hover:shadow-sm cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div> */}

        {/* Description with smooth reveal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.45, duration: 0.6 }}
          className="flex-grow text-sm leading-relaxed text-justify transition-colors duration-300 text-slate-600 group-hover:text-slate-700"
        >
          {card.description}
        </motion.p>
      </motion.div>

      {/* Right – thumbnail with premium effects */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="container relative flex-shrink-0 w-56 h-56 overflow-hidden"
      >
        <motion.img
          src={card.image}
          alt={card.title}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="object-cover w-full h-full"
        />

        {/* Premium gradient overlay */}
        <motion.div
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent"
        />

        {/* Smooth-reveal bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />

        {/* Premium icon badge with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08 + 0.3, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg 
                     hover:shadow-cyan-500/40 transition-all duration-300 hover:bg-white"
        >
          {card.icon}
        </motion.div>

        {/* Corner accent light */}
        <motion.div
          className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-cyan-400 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ pointerEvents: 'none' }}
        />
      </motion.div>

      {/* Premium accent bar with smooth reveal */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute top-0 bottom-0 left-0 w-1 origin-center shadow-lg bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-600 shadow-cyan-500/50"
      />

      {/* Smooth border glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow: 'inset 0 0 30px rgba(6, 182, 212, 0.2)'
        }}
      />
    </motion.div>
  );
};

/* ─── Main component ─── */
const ItTeam = () => {
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
      title: 'Website Development',
      description: 'We provide professional website development services with responsive design, fast loading speed, and SEO-friendly structure. Our expert team builds modern, mobile-friendly websites tailored for business growth. Boost your online presence with secure and scalable web solutions.',
      tags: ['Responsive', 'Secure', 'Scalable'],
      image: web_dev,
    },
    {
      id: 2,
      icon: <Gauge className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />,
      title: 'Web Application Development',
      description: 'Our web application development services deliver scalable, secure, and high-performance solutions. We create custom web apps using the latest technologies to streamline business operations. Improve user experience with fast, responsive, and cloud-based applications.',
      tags: ['UX/UI', 'Optimized', 'Interactive'],
      image: webapp_dev,
    },
    {
      id: 3,
      icon: <Cpu className="w-5 h-5 text-purple-500" strokeWidth={1.5} />,
      title: 'Custom Software Development',
      description: 'We offer custom software development tailored to your business needs and workflow automation. Our solutions improve productivity, efficiency, and performance with secure and scalable systems. From enterprise software to small business tools, we deliver high-quality applications.',
      tags: ['Enterprise', 'Agile', 'Cloud-Ready'],
      image: soft_dev,
    //   image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format',
    },
    {
      id: 4,
      icon: <Wrench className="w-5 h-5 text-amber-500" strokeWidth={1.5} />,
      title: 'Digital Marketing Services',
      description: 'Our digital marketing services help grow your brand visibility and generate high-quality leads. We use proven strategies including PPC, content marketing, and online advertising. Increase website traffic, conversions, and ROI with targeted campaigns.',
      tags: ['Conversion', 'Analytics', 'Growth'],
      image: digi_mkt,
    //   image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format',
    },
    {
      id: 5,
      icon: <Rocket className="w-5 h-5 text-rose-500" strokeWidth={1.5} />,
      title: 'SEO & Social Media Marketing',
      description: 'Boost your search engine rankings with our expert SEO services and social media marketing strategies. We optimize websites with high-ranking keywords, backlinks, and on-page SEO techniques. Grow your audience on platforms like Facebook, Instagram, and LinkedIn.',
      tags: ['Organic Traffic', 'SEO Expert', 'Content-Driven'],
      image: seo_social,
    //   image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&auto=format',
    },
    {
      id: 6,
      icon: <Shield className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />,
      title: 'Bulk SMS & Email Marketing',
      description: 'Reach your customers instantly with bulk SMS and email marketing campaigns. We provide reliable, fast, and cost-effective messaging solutions for promotions and updates. Improve customer engagement with targeted email campaigns and automation tools.',
      tags: ['Automation', 'Personalized', 'Campaign'],
      image: sms_email,
    //   image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative flex items-center overflow-hidden text-white"
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

        <div className="relative w-full px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-md border-white/25"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Stay Updated. Stay Ahead.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-white to-blue-200"
            >
              IT Team
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base leading-relaxed text-gray-200 sm:text-lg"
            >
              Stay updated on latest innovations, product launches, and industry events in climatic testing solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, index) => (
            <FeatureCard key={card.id} card={card} index={index} />
          ))}
        </div>
        
        {/* ── Tech Stack Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-16 border-t border-slate-200/40"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 text-center"
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
              Powered By
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
              Our Tech Stack's
            </motion.h2>            
          </motion.div>
          
          <TechStack showHeader={false} />
        </motion.div>
        {/* ── Premium Bottom CTA with High Conversion ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative max-w-4xl p-12 mx-auto overflow-hidden border shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-3xl border-slate-700/50"
          >
            {/* Animated background orbs */}
            <motion.div
              className="absolute rounded-full -top-20 -right-20 w-60 h-60 bg-cyan-500 blur-3xl"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ pointerEvents: 'none' }}
            />
            <motion.div
              className="absolute bg-blue-500 rounded-full -bottom-20 -left-20 w-60 h-60 blur-3xl"
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              style={{ pointerEvents: 'none' }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 
                           rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-cyan-300"
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full animate-pulse bg-cyan-400" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" />
                </span>
                AI-Powered Solutions Available Now
              </motion.div>

              {/* Main Headline - Powerful & Tech-Focused */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mb-4 text-2xl font-black tracking-tight text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200"
              >
                Accelerate Innovation with <br />Next-Gen AI & Cloud Solutions
              </motion.p>              

              {/* Secondary text - Value proposition */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mb-8 text-sm text-slate-400"
              >
                Discover how AI integration & system optimization drive operational efficiency by 60% while reducing costs and accelerating time-to-innovation
              </motion.p>

              {/* CTA Button - Premium with micro-interactions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <motion.a
                  href="https://www.sesstech.sess.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden text-base font-bold text-white transition-all duration-300 shadow-xl cursor-pointer group/cta bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-600 hover:via-cyan-500 hover:to-blue-600 rounded-2xl hover:shadow-2xl"
                >
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/0 to-white/10 group-hover/cta:opacity-100" />
                  <span className="relative flex items-center gap-2">
                    Go to Website
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </motion.div>
                  </span>
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="/#/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block py-4 font-semibold text-center transition-all duration-300 border cursor-pointer px-7 border-slate-600 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 rounded-2xl hover:bg-slate-800/50 backdrop-blur-sm"
                >
                  Start Your AI Journey
                </motion.a>
              </motion.div>

              {/* Trust elements */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-6 mt-8 text-sm sm:flex-row text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">✓</span>
                  <span>AI-Driven Insights</span>
                </div>
                <div className="hidden w-px h-4 sm:block bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">✓</span>
                  <span>Tech Experts</span>
                </div>
                <div className="hidden w-px h-4 sm:block bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">✓</span>
                  <span>Cloud-Native Ready</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItTeam;