import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGooglePlusG } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Logo from '../assets/sess_logo_white.png';
import LogoColor from '../assets/sess_logo_png_color.png';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  /* ── Theme-aware values (same pattern as Header.jsx) ── */
  const bg          = isDark ? '#0d1117'              : '#1e293b';          // dark: near-black | light: slate-navy
  const bgBottom    = isDark ? 'rgba(0,0,0,0.60)'     : 'rgba(0,0,0,0.30)';
  const textMuted   = isDark ? 'var(--color-neutral-400)' : 'var(--color-neutral-300)';
  const socialBg    = isDark ? 'var(--color-neutral-800)' : 'rgba(255,255,255,0.10)';
  const dividerColor= isDark ? 'rgba(255,255,255,0.08)'   : 'rgba(255,255,255,0.12)';

  const linkHover   = e => e.currentTarget.style.color = 'var(--color-primary-400)';
  const linkUnhover = e => e.currentTarget.style.color = textMuted;

  const socialLinks = [
    { icon: FaFacebookF,   url: 'https://www.facebook.com/profile.php?id=100067759313976', label: 'Facebook' },
    { icon: FaTwitter,     url: 'https://x.com/sesschennai',   label: 'Twitter' },
    { icon: FaInstagram,   url: 'https://www.instagram.com/sesschennai/', label: 'Instagram' },
    { icon: FaYoutube,     url: 'https://www.youtube.com/@sesschennai', label: 'YouTube' },
    // { icon: FaGooglePlusG, url: 'https://plus.google.com',     label: 'Google Plus' },
  ];

  const productLinks = [
    { name: 'Climatic Test Chamber',          path: '#' },
    { name: 'Basic Salt Spray Test Chamber',  path: '#' },
    { name: 'Thermal Test Chamber',           path: '#' },
    { name: 'Hot and Cold Test Chamber',      path: '#' },
    { name: 'Dust Chamber',                   path: '#' },
  ];

  const quickLinks = [
    { path: '/',         label: 'Home' },
    { path: '/about',    label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/services', label: 'Services' },
    { path: '/gallery',  label: 'Gallery' },
    { path: '/contact',  label: 'Contact Us' },
  ];

  /* ── Reusable section heading ─────────────────────────── */
  const SectionHeading = ({ children }) => (
    <h3 style={{
      color: 'var(--color-primary-400)',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-weight-semibold)',
      fontSize: 'var(--text-lg)',
      marginBottom: 'var(--space-6)',
    }}>
      {children}
    </h3>
  );

  /* ── Reusable link list item ──────────────────────────── */
  const FooterLink = ({ to, children }) => (
    <li>
      <Link to={to}
        style={{ color: textMuted, fontSize: 'var(--text-sm)', textDecoration: 'none', transition: 'var(--transition-fast)' }}
        onMouseEnter={linkHover}
        onMouseLeave={linkUnhover}
      >
        {children}
      </Link>
    </li>
  );

  return (
    <footer style={{ background: bg, color: 'var(--color-neutral-0)', transition: 'background var(--transition-slow)' }}>

      {/* ── MAIN FOOTER ─────────────────────────────────── */}
      <div style={{ padding: 'var(--space-16) 0' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* About + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
            >
              <img
                src={isDark ? Logo : Logo}
                alt="SESS"
                style={{ height: '48px', marginBottom: 'var(--space-6)' }}
              />
              <p style={{ color: textMuted, marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-sm)' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      aria-label={social.label}
                      style={{
                        width: '40px', height: '40px',
                        background: socialBg,
                        borderRadius: 'var(--border-radius-full)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: textMuted,
                        border: '1px solid ' + dividerColor,
                        transition: 'var(--transition-base)',
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--color-primary-500)';
                        e.currentTarget.style.color = 'var(--color-neutral-0)';
                        e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = socialBg;
                        e.currentTarget.style.color = textMuted;
                        e.currentTarget.style.borderColor = dividerColor;
                      }}
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
            >
              <SectionHeading>Products</SectionHeading>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {productLinks.map((p, i) => (
                  <FooterLink key={i} to={p.path}>{p.name}</FooterLink>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
            >
              <SectionHeading>Contact Information</SectionHeading>
              <address style={{ fontStyle: 'normal', color: textMuted, fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', lineHeight: 'var(--leading-relaxed)' }}>
                <p style={{ margin: 0 }}>
                  Door No 2/298, ANE Garden, Perumal kovil Street, Srinivasapuram,
                  Paraniputhur post, Iyyappanthangal, Chennai - 600 122.
                </p>
                <p style={{ margin: 0 }}>
                  Email:{' '}
                  <a href="mailto:easwari.kjsb@gmail.com"
                    style={{ color: textMuted, transition: 'var(--transition-fast)', textDecoration: 'none' }}
                    onMouseEnter={linkHover} onMouseLeave={linkUnhover}
                  >
                    easwari.kjsb@gmail.com
                  </a>
                </p>
                <p style={{ margin: 0 }}>
                  Phone:{' '}
                  <a href="tel:+919444427748"
                    style={{ color: textMuted, transition: 'var(--transition-fast)', textDecoration: 'none' }}
                    onMouseEnter={linkHover} onMouseLeave={linkUnhover}
                  >
                    +91 94444 27748
                  </a>
                </p>
                <a href="/#/contact"
                  style={{ color: 'var(--color-primary-400)', textDecoration: 'underline', transition: 'var(--transition-fast)', width: 'fit-content' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-300)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-primary-400)'}
                >
                  View Direction
                </a>
              </address>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
            >
              <SectionHeading>Quick Links</SectionHeading>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {quickLinks.map((link, i) => (
                  <FooterLink key={i} to={link.path}>{link.label}</FooterLink>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── DIVIDER ─────────────────────────────────────── */}
      <div style={{ height: '1px', background: dividerColor, margin: '0 1rem' }} />

      {/* ── COPYRIGHT BAR ───────────────────────────────── */}
      <div style={{ background: bgBottom, padding: 'var(--space-6) 0', transition: 'background var(--transition-slow)' }}>
        <div className="container mx-auto px-4">
          <div
            className="flex flex-col md:flex-row justify-between items-center"
            style={{ color: textMuted, fontSize: 'var(--text-sm)', gap: 'var(--space-4)' }}
          >
            <p style={{ margin: 0 }}>
              &copy; 2026 SESS is Proudly Powered by{' '}
              <a href="https://www.sesstech.sess.co.in" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--color-primary-400)', textDecoration: 'none', transition: 'var(--transition-fast)' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                SESS IT Team.
              </a>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <Link to="#"
                style={{ color: textMuted, textDecoration: 'none', transition: 'var(--transition-fast)' }}
                onMouseEnter={linkHover} onMouseLeave={linkUnhover}
              >
                Term and Condition
              </Link>
              <span style={{ color: dividerColor }}>|</span>
              <Link to="#"
                style={{ color: textMuted, textDecoration: 'none', transition: 'var(--transition-fast)' }}
                onMouseEnter={linkHover} onMouseLeave={linkUnhover}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;