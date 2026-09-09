import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCube, FaTools, FaBuilding, FaFileAlt, FaHome, FaArrowRight, FaSitemap } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const SECTIONS = [
  {
    title: 'Main Pages',
    icon: <FaHome />,
    accent: '#00b3b3',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'All Products', path: '/products' },
      { label: 'Services', path: '/services' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
  {
    title: 'Products',
    icon: <FaCube />,
    accent: '#2a56a6',
    links: [
      { label: 'Climatic Test Chamber', path: '/climatic-test-chamber' },
      { label: 'Battery Test Chamber', path: '/battery-test-chamber' },
      { label: 'Salt Spray Test Chamber', path: '/salt-spray-test-chamber' },
      { label: 'Rain Test Chamber', path: '/rain-test-chamber' },
      { label: 'Vibration Combined Climatic Test Chamber', path: '/vibration-test-chamber' },
      { label: 'Thermal Cycling Chamber', path: '/thermal-cyclic-chamber' },
      { label: 'Thermal Shock Chamber', path: '/thermal-shock-chamber' },
      { label: 'Flame Proof Hot Air Oven', path: '/flame-proof-hot-air-oven' },
      { label: 'Tabletop Test Chamber', path: '/tabletop-test-chamber' },
      { label: 'Walk-In Chamber', path: '/walk-in-chamber' },
      { label: 'Dust Chamber', path: '/dust-chamber' },
      { label: 'Tensile Chamber', path: '/tensile-chamber' },
    ],
  },
  {
    title: 'Services',
    icon: <FaTools />,
    accent: '#0ea5e9',
    links: [
      { label: 'Design Services', path: '/design' },
      { label: 'LabView & PLC', path: '/labview-plc' },
      { label: 'Software Development - IT', path: '/it' },
    ],
  },
  {
    title: 'Company',
    icon: <FaBuilding />,
    accent: '#8b5cf6',
    links: [
      { label: 'Career', path: '/career' },
      { label: 'News and Events', path: '/news' },
      { label: 'Company Brochure', path: '/brochure' },
    ],
  },
  {
    title: 'Legal',
    icon: <FaFileAlt />,
    accent: '#f59e0b',
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms & Conditions', path: '/terms-and-conditions' },
    ],
  },
];

const Sitemap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const totalPages = SECTIONS.reduce((n, s) => n + s.links.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: 'var(--bg-primary)', minHeight: '70vh' }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #00b3b3 0%, #2a56a6 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-sm backdrop-blur-md">
            <FaSitemap /> {totalPages} pages
          </span>
          <h1 className="text-4xl font-bold tracking-tight">Sitemap</h1>
          <p className="mx-auto mt-3 max-w-xl px-4 text-white/85">
            Every page on the SESS website, organised in one place.
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.08, duration: 0.5 }}
              className={`rounded-2xl p-6 ${section.title === 'Products' ? 'md:row-span-2' : ''}`}
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}`,
                boxShadow: isDark ? 'none' : '0 8px 30px rgba(15,23,42,0.06)',
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                  style={{ background: section.accent, boxShadow: `0 8px 20px ${section.accent}44` }}
                >
                  {section.icon}
                </span>
                <div>
                  <h2 className="m-0 text-lg font-bold" style={{ color: 'var(--text-heading)' }}>
                    {section.title}
                  </h2>
                  <span className="text-xs" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                    {section.links.length} page{section.links.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <ul className="m-0 list-none space-y-1 p-0">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200"
                      style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${section.accent}14`; e.currentTarget.style.color = section.accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isDark ? '#cbd5e1' : '#334155'; }}
                    >
                      {link.label}
                      <FaArrowRight className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ fontSize: 10, color: section.accent }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Sitemap;
