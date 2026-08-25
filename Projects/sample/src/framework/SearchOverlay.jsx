import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes, FaArrowRight, FaCube, FaTools, FaBuilding, FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

/* ── Searchable site index ─────────────────────────────── */
const SEARCH_INDEX = [
  // Products
  { title: 'Climatic Test Chamber', path: '/climatic-test-chamber', group: 'Products', keywords: 'temperature humidity environmental stability climate' },
  { title: 'Battery Test Chamber', path: '/battery-test-chamber', group: 'Products', keywords: 'ev lithium cell battery safety testing' },
  { title: 'Salt Spray Test Chamber', path: '/salt-spray-test-chamber', group: 'Products', keywords: 'corrosion fog nss cass rust coating' },
  { title: 'Rain Test Chamber', path: '/rain-test-chamber', group: 'Products', keywords: 'water spray ip ipx ingress waterproof' },
  { title: 'Vibration Combined Climatic Test Chamber', path: '/vibration-test-chamber', group: 'Products', keywords: 'shaker agree combined vibration' },
  { title: 'Thermal Cycling Chamber', path: '/thermal-cyclic-chamber', group: 'Products', keywords: 'cyclic temperature cycling fatigue' },
  { title: 'Thermal Shock Chamber', path: '/thermal-shock-chamber', group: 'Products', keywords: 'hot cold zone rapid transfer shock' },
  { title: 'Flame Proof Hot Air Oven', path: '/flame-proof-hot-air-oven', group: 'Products', keywords: 'oven drying industrial flameproof atex' },
  { title: 'Tabletop Test Chamber', path: '/tabletop-test-chamber', group: 'Products', keywords: 'benchtop compact small mini chamber' },
  { title: 'Walk-In Chamber', path: '/walk-in-chamber', group: 'Products', keywords: 'room large drive-in walkin panel' },
  { title: 'Dust Chamber', path: '/dust-chamber', group: 'Products', keywords: 'sand dust ip5x ip6x ingress' },
  { title: 'Tensile Chamber', path: '/tensile-chamber', group: 'Products', keywords: 'utm universal testing machine interface tensile' },
  { title: 'All Products', path: '/products', group: 'Products', keywords: 'catalogue catalog chambers list' },
  // Services
  { title: 'Design Services', path: '/design', group: 'Services', keywords: 'cad mechanical product design engineering' },
  { title: 'LabView & PLC', path: '/labview-plc', group: 'Services', keywords: 'automation programming scada controls' },
  { title: 'Software Development - IT', path: '/it', group: 'Services', keywords: 'web development seo digital marketing software' },
  { title: 'Our Services', path: '/services', group: 'Services', keywords: 'support installation maintenance training calibration' },
  // Company
  { title: 'About Us', path: '/about', group: 'Company', keywords: 'company sess sri easwari scientific solution history' },
  { title: 'Career', path: '/career', group: 'Company', keywords: 'jobs hiring vacancy apply work' },
  { title: 'Gallery', path: '/gallery', group: 'Company', keywords: 'photos images factory machines' },
  { title: 'News and Events', path: '/news', group: 'Company', keywords: 'blog updates expo events' },
  { title: 'Contact Us', path: '/contact', group: 'Company', keywords: 'phone email address enquiry reach quote' },
  // Resources
  { title: 'Company Brochure', path: '/brochure', group: 'Resources', keywords: 'pdf profile download flipbook catalogue' },
  { title: 'Sitemap', path: '/sitemap', group: 'Resources', keywords: 'all pages links map site' },
  { title: 'Privacy Policy', path: '/privacy-policy', group: 'Resources', keywords: 'legal data protection gdpr' },
  { title: 'Terms & Conditions', path: '/terms-and-conditions', group: 'Resources', keywords: 'legal terms conditions warranty' },
];

const GROUP_ICONS = {
  Products: <FaCube />,
  Services: <FaTools />,
  Company: <FaBuilding />,
  Resources: <FaFileAlt />,
};

const POPULAR = ['Climatic Test Chamber', 'Salt Spray Test Chamber', 'Battery Test Chamber', 'Walk-In Chamber'];

/* ── Highlight matched part of a title ─────────────────── */
const Highlight = ({ text, query }) => {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: '#00b3b3', fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  /* Filtered + grouped results */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map();
    results.forEach(item => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group).push(item);
    });
    return [...map.entries()];
  }, [results]);

  const go = useCallback((path) => {
    onClose();
    setQuery('');
    navigate(path);
  }, [navigate, onClose]);

  /* Reset + focus on open, lock scroll */
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  /* Keyboard: Esc close, arrows navigate, Enter select */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      else if (e.key === 'Enter' && results[activeIdx]) go(results[activeIdx].path);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, results, activeIdx, go, onClose]);

  const surface = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)';
  const textMain = isDark ? '#e2e8f0' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  // NOTE: no AnimatePresence here — with React StrictMode + portals its exit
  // phase can leave an invisible fixed overlay that blocks clicks. Conditional
  // rendering guarantees the node is removed; entry animations still play.
  if (!isOpen) return null;

  return createPortal(
    (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: isDark ? 'rgba(2,6,23,0.82)' : 'rgba(8,18,32,0.55)',
            backdropFilter: 'blur(10px)',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            padding: '10vh 16px 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: 'min(640px, 100%)',
              background: surface,
              border: `1px solid ${isDark ? 'rgba(0,179,179,0.28)' : 'rgba(0,179,179,0.22)'}`,
              borderRadius: '18px',
              boxShadow: isDark
                ? '0 28px 80px rgba(0,0,0,0.66), 0 0 40px rgba(0,179,179,0.08)'
                : '0 28px 80px rgba(15,23,42,0.28)',
              overflow: 'hidden',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search the website"
          >
            {/* Input row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: `1px solid ${border}` }}>
              <FaSearch style={{ color: '#00b3b3', fontSize: 16, flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, services, pages…"
                aria-label="Search"
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  color: textMain, fontSize: '1rem', fontFamily: 'var(--font-body)',
                }}
              />
              <kbd style={{
                fontSize: 10, padding: '3px 7px', borderRadius: 6, letterSpacing: '0.05em',
                border: `1px solid ${border}`, color: textMuted, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.04)',
              }}>ESC</kbd>
              <button
                onClick={onClose}
                aria-label="Close search"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: textMuted, display: 'flex', padding: 4 }}
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{ maxHeight: '55vh', overflowY: 'auto', padding: '10px 8px 14px' }}>
              {/* Empty state → popular searches */}
              {!query.trim() && (
                <div style={{ padding: '10px 12px' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: textMuted }}>
                    Popular searches
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {POPULAR.map(p => {
                      const item = SEARCH_INDEX.find(i => i.title === p);
                      return (
                        <button
                          key={p}
                          onClick={() => item && go(item.path)}
                          style={{
                            padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
                            fontSize: 13, fontFamily: 'var(--font-body)', color: '#00b3b3',
                            background: isDark ? 'rgba(0,179,179,0.10)' : 'rgba(0,179,179,0.07)',
                            border: '1px solid rgba(0,179,179,0.30)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,179,179,0.18)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(0,179,179,0.10)' : 'rgba(0,179,179,0.07)'; }}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No results */}
              {query.trim() && results.length === 0 && (
                <div style={{ textAlign: 'center', padding: '34px 16px', color: textMuted }}>
                  <FaSearch style={{ fontSize: 26, opacity: 0.35, marginBottom: 10 }} />
                  <p style={{ margin: 0, fontSize: 14 }}>
                    No results for “<span style={{ color: textMain }}>{query}</span>”
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: 12 }}>
                    Try “chamber”, “salt spray”, “career”…
                  </p>
                </div>
              )}

              {/* Grouped results */}
              {grouped.map(([group, items]) => (
                <div key={group} style={{ marginBottom: 6 }}>
                  <p style={{
                    display: 'flex', alignItems: 'center', gap: 7, margin: '10px 12px 6px',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: textMuted,
                  }}>
                    <span style={{ color: '#00b3b3', fontSize: 10 }}>{GROUP_ICONS[group]}</span>
                    {group}
                    <span style={{
                      fontSize: 10, padding: '1px 7px', borderRadius: 999,
                      background: isDark ? 'rgba(0,179,179,0.12)' : 'rgba(0,179,179,0.08)', color: '#00b3b3',
                    }}>{items.length}</span>
                  </p>
                  {items.map(item => {
                    const flatIdx = results.indexOf(item);
                    const active = flatIdx === activeIdx;
                    return (
                      <button
                        key={item.path}
                        onClick={() => go(item.path)}
                        onMouseEnter={() => setActiveIdx(flatIdx)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', textAlign: 'left', cursor: 'pointer',
                          padding: '11px 14px', borderRadius: 10, border: 'none',
                          fontFamily: 'var(--font-body)', fontSize: 14, color: textMain,
                          background: active ? (isDark ? 'rgba(0,179,179,0.14)' : 'rgba(0,179,179,0.08)') : 'transparent',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <span><Highlight text={item.title} query={query.trim()} /></span>
                        <FaArrowRight style={{ fontSize: 11, color: '#00b3b3', opacity: active ? 1 : 0, transition: 'opacity 0.15s ease' }} />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer hint */}
            <div style={{
              display: 'flex', gap: 16, padding: '10px 18px',
              borderTop: `1px solid ${border}`, fontSize: 11, color: textMuted,
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.02)',
            }}>
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
    ),
    document.body
  );
};

export default SearchOverlay;
