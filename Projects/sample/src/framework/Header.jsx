import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars, FaTimes, FaChevronDown, FaPhone, FaEnvelope,
  FaSun, FaMoon, FaPlus, FaInstagram, FaFacebookF, FaTwitter, FaBlog,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Logo from "../assets/sess_logo_png.png";
import LogoWhite from "../assets/sess_logo_white.png";

const Header = () => {
  const [isOpen, setIsOpen]               = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showTopBar]                      = useState(true);
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const location  = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setShowSocialIcons(false);
  }, [location]);

  // 🔧 FIX 1: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* ── DATA ─────────────────────────────────────────────── */
  const socialLinks = [
    { icon: <FaInstagram />, name: "Instagram", url: "https://instagram.com" },
    { icon: <FaFacebookF />, name: "Facebook",  url: "https://facebook.com" },
    { icon: <FaTwitter />,   name: "Twitter",   url: "https://twitter.com" },
    { icon: <FaBlog />,      name: "Blog",      url: "https://blog.com" },
  ];

  const marqueeItems = [
    "🏭 Leading Environmental Test Chamber Manufacturer",
    "⭐ 25+ Years of Excellence",
    "🌍 Serving 500+ Clients Globally",
    "🔬 ISO Certified Company",
    "📦 Fast Delivery Across India",
    "💡 Custom Solutions Available",
  ];

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    {
      label: "Products",
      dropdown: true,
      items: [
        {
          category: "Industry",
          links: [
            { name: "Climatic Test Chamber",   path: "/climatic-test-chamber" },
            { name: "Salt Spray Test Chamber", path: "/salt-spray-test-chamber" },
            { name: "Rain Test Chamber",       path: "/rain-test-chamber" },
            { name: "Vibration Test Chamber",  path: "/vibration_test_chamber" },
            { name: "Thermal Cycling Chamber", path: "/thermal_cycling_chamber" },
          ],
        },
        {
          category: "Pharma",
          links: [
            { name: "Humidity Test Chamber",  path: "/humidity_test_chamber" },
            { name: "Stability Test Chamber", path: "/stability_test_chamber" },
            { name: "Co2 Incubators",         path: "/co2_incubators" },
            { name: "Deep-freezer",           path: "/deep_freezer" },
          ],
        },
        {
          category: "Medical",
          links: [
            { name: "Blood Bank Refrigerator", path: "/blood_bank_refrigerator" },
            { name: "BOD Incubator",           path: "/ bod_incubator" },
            { name: "Incubators",              path: "/incubators" },
            { name: "Plasma Freezer",          path: "/plasma_freezer" },
          ],
        },
      ],
    },
    {
      label: "Services",
      dropdown: true,
      items: [
        { path: "/design",  label: "Design Services" },
        { path: "/labview-plc", label: "LabView & PLC" },
        { path: "/it",    label: "Software Development - IT" },
      ],
    },
    {
      label: "Company",
      dropdown: true,
      items: [
        { path: "/career",  label: "Career" },
        { path: "/gallery", label: "Gallery" },
        { path: "/news",    label: "News and Events" },
      ],
    },
    { path: "/contact", label: "Contact Us" },
  ];

  // 🔧 FIX 2: Mobile dropdown toggle function
  const toggleMobileDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  /* ── SHARED INLINE STYLE HELPERS ─────────────────────── */
  const socialBtnStyle = {
    background: isDark ? "var(--surface-raised)" : "rgba(255,255,255,0.20)",
    color: "var(--color-neutral-0)",
    borderRadius: "var(--border-radius-full)",
    padding: "6px",
    transition: "var(--transition-base)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const themeBtnStyle = {
    background: isDark ? "var(--color-primary-400)" : "var(--color-neutral-800)",
    color: isDark ? "var(--color-neutral-900)" : "var(--color-neutral-0)",
    borderRadius: "var(--border-radius-full)",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "var(--transition-base)",
  };

  return (
    <>
      {/* ═══ TOP BAR ══════════════════════════════════════════ */}
      {/* 🔧 FIX 3: Reduced z-index to prevent overlap */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0"
        style={{
          zIndex: 40, // Changed from 50 to 40
          background: isDark ? "var(--color-neutral-900)" : "var(--gradient-brand)",
          borderBottom: isDark ? "1px solid var(--border-default)" : "none",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs" style={{ color: "var(--color-neutral-0)" }}>

            {/* Contact — Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+919444427748" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <FaPhone style={{ fontSize: "10px" }} />
                <span>+91 94444 27748</span>
              </a>
              <span className="opacity-50">|</span>
              <a href="mailto:easwari.kjsb@gmail.com" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <FaEnvelope style={{ fontSize: "10px" }} />
                <span>easwari.kjsb@gmail.com</span>
              </a>
            </div>

            {/* Contact — Mobile (icons only) */}
            <div className="flex md:hidden items-center space-x-3">
              <a href="tel:+919444427748"           className="hover:opacity-80"><FaPhone /></a>
              <a href="mailto:easwari.kjsb@gmail.com" className="hover:opacity-80"><FaEnvelope /></a>
            </div>

            {/* Marquee — Desktop */}
            <div className="hidden md:flex flex-1 overflow-hidden items-center" style={{ marginLeft: "5rem", marginRight: "12rem" }}>
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
                className="whitespace-nowrap"
              >
                {marqueeItems.map((item, i) => (
                  <span key={i} className="mx-4">
                    {item}
                    {i < marqueeItems.length - 1 && <span className="mx-4 opacity-50">✦</span>}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Social Icons + Plus — Desktop */}
            <div className="hidden md:flex items-center mr-2 absolute right-10">
              <AnimatePresence>
                {showSocialIcons && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2 mr-2"
                  >
                    {socialLinks.map((s, i) => (
                      <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.1 }} style={socialBtnStyle} title={s.name}
                      >
                        <span style={{ fontSize: "12px" }}>{s.icon}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowSocialIcons(!showSocialIcons)}
                style={socialBtnStyle} aria-label="Social media"
              >
                <FaPlus size={12} />
              </motion.button>
            </div>

            {/* Marquee — Mobile */}
            <div className="flex md:hidden flex-1 overflow-hidden" style={{ marginLeft: "1rem", marginRight: "8.3rem" }}>
              <motion.div
                animate={{ x: [0, -500] }}
                transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 15, ease: "linear" } }}
                className="whitespace-nowrap"
              >
                {marqueeItems.map((item, i) => (
                  <span key={i} className="mx-2" style={{ fontSize: "10px" }}>
                    {item}
                    {i < marqueeItems.length - 1 && <span className="mx-2 opacity-50">✦</span>}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Social + Theme — Mobile overlay */}
            <div className="md:hidden fixed right-3 z-50 flex items-center space-x-1">
              <AnimatePresence>
                {showSocialIcons && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="flex items-center space-x-1"
                  >
                    {socialLinks.map((s, i) => (
                      <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
                        style={{ ...socialBtnStyle, padding: "4px" }}
                      >
                        <span style={{ fontSize: "10px" }}>{s.icon}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowSocialIcons(!showSocialIcons)}
                style={{ ...socialBtnStyle, padding: "4px" }}
              >
                <FaPlus size={10} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme}
                style={{ ...themeBtnStyle, padding: "4px" }}
              >
                {isDark ? <FaSun size={10} /> : <FaMoon size={10} />}
              </motion.button>
            </div>

            {/* Theme Toggle — Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme}
                style={{ ...themeBtnStyle, padding: "6px" }} aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={theme}
                    initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}
                  >
                    {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ═══ MAIN HEADER ══════════════════════════════════════ */}
      {/* 🔧 FIX 4: Adjusted z-index and positioning */}
      <header
        className="fixed w-full transition-all duration-300 py-4"
        style={{
          top: showTopBar ? "40px" : "0",
          zIndex: 35, // Changed from 40 to 35
          background: isDark ? "var(--color-neutral-900)" : "var(--surface-default)",
          color: isDark ? "var(--text-heading)" : "var(--color-neutral-900)",
          boxShadow: isDark
            ? "0 0px 2px var(--color-neutral-0)"
            : "var(--shadow-lg)",
        }}
      >
        <nav className="mx-auto px-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="relative z-50">
              <img src={isDark ? LogoWhite : Logo} alt="SESS" style={{ height: "48px" }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative group"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  {item.path ? (
                    <Link to={item.path}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 block"
                      style={{
                        color: location.pathname === item.path
                          ? "var(--color-primary-500)"
                          : isDark ? "var(--text-body)" : "var(--color-neutral-700)",
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--color-primary-500)"; e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = location.pathname === item.path ? "var(--color-primary-500)" : isDark ? "var(--text-body)" : "var(--color-neutral-700)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="px-4 py-2 text-sm font-medium flex items-center gap-1 rounded-lg transition-colors duration-300"
                      style={{
                        color: isDark ? "var(--text-body)" : "var(--color-neutral-700)",
                        fontFamily: "var(--font-body)",
                        background: "transparent",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--color-primary-500)"; e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = isDark ? "var(--text-body)" : "var(--color-neutral-700)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      {item.label}
                      <FaChevronDown style={{ fontSize: "10px" }} />
                    </button>
                  )}

                  {/* Dropdown - Desktop */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 rounded-lg"
                        style={{
                          zIndex: 45, // 🔧 FIX 5: Added proper z-index for dropdown
                          background: isDark ? "var(--surface-raised)" : "var(--surface-default)",
                          boxShadow: "var(--shadow-xl)",
                        }}
                      >
                        {item.label === "Products" ? (
                          /* Mega menu */
                          <div className="grid grid-cols-3 gap-4 p-6" style={{ minWidth: "600px" }}>
                            {item.items.map((col, idx) => (
                              <div key={idx}>
                                <h4 className="font-bold mb-2" style={{ color: "var(--color-primary-500)", fontFamily: "var(--font-display)" }}>
                                  {col.category}
                                </h4>
                                <ul className="space-y-2">
                                  {col.links.map((link, li) => (
                                    <li key={li}>
                                      <Link to={link.path}
                                        className="text-sm transition-colors"
                                        style={{ color: isDark ? "var(--text-body)" : "var(--text-muted)" }}
                                        onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                        onMouseLeave={e => e.currentTarget.style.color = isDark ? "var(--text-body)" : "var(--text-muted)"}
                                      >
                                        {link.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Single column */
                          <div className="p-4" style={{ minWidth: "220px" }}>
                            <ul className="space-y-2">
                              {item.items.map((sub, idx) => (
                                <li key={idx}>
                                  <Link to={sub.path}
                                    className="block text-sm transition-colors"
                                    style={{ color: isDark ? "var(--text-body)" : "var(--text-muted)" }}
                                    onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                    onMouseLeave={e => e.currentTarget.style.color = isDark ? "var(--text-body)" : "var(--text-muted)"}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative z-50 p-2">
              {isOpen
                ? <FaTimes  style={{ fontSize: "24px", color: isDark ? "var(--text-heading)" : "var(--color-neutral-800)" }} />
                : <FaBars   style={{ fontSize: "24px", color: isDark ? "var(--text-heading)" : "var(--color-neutral-800)" }} />
              }
            </button>

            {/* 🔧 FIX 6: Completely redesigned mobile drawer with proper dropdowns */}
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 lg:hidden"
                    style={{
                      top: showTopBar ? "40px" : "0",
                      zIndex: 40,
                    }}
                  />
                  
                  {/* Drawer */}
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween" }}
                    className="fixed inset-y-0 right-0 w-full md:w-96 lg:hidden overflow-y-auto"
                    style={{
                      top: showTopBar ? "40px" : "0",
                      zIndex: 45,
                      background: isDark ? "var(--color-neutral-900)" : "var(--surface-default)",
                      boxShadow: "var(--shadow-2xl)",
                    }}
                  >
                    <div className="pt-24 pb-8 px-6">
                      {navItems.map((item, index) => (
                        <div key={index} className="mb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          {item.path ? (
                            <Link to={item.path}
                              className="block py-3 text-lg font-medium transition-colors"
                              style={{ color: isDark ? "var(--text-heading)" : "var(--color-neutral-800)", fontFamily: "var(--font-body)" }}
                              onClick={() => setIsOpen(false)}
                              onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                              onMouseLeave={e => e.currentTarget.style.color = isDark ? "var(--text-heading)" : "var(--color-neutral-800)"}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <>
                              {/* Mobile dropdown button */}
                              <button
                                onClick={() => toggleMobileDropdown(index)}
                                className="w-full flex items-center justify-between py-3 text-lg font-medium transition-colors"
                                style={{ color: isDark ? "var(--text-heading)" : "var(--color-neutral-800)", fontFamily: "var(--font-body)" }}
                              >
                                <span>{item.label}</span>
                                <motion.div
                                  animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <FaChevronDown style={{ fontSize: "12px" }} />
                                </motion.div>
                              </button>
                              
                              {/* Mobile dropdown content */}
                              <AnimatePresence>
                                {activeDropdown === index && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden pl-4 mb-3"
                                  >
                                    {item.label === "Products" ? (
                                      /* Products mega menu for mobile */
                                      <div className="space-y-4">
                                        {item.items.map((col, ci) => (
                                          <div key={ci}>
                                            <p className="text-xs font-bold mb-2" style={{ color: "var(--color-primary-500)" }}>
                                              {col.category}
                                            </p>
                                            <ul className="space-y-2">
                                              {col.links.map((link, li) => (
                                                <li key={li}>
                                                  <Link
                                                    to={link.path}
                                                    className="block text-sm py-1 transition-colors"
                                                    style={{ color: isDark ? "var(--text-body)" : "var(--text-muted)" }}
                                                    onClick={() => setIsOpen(false)}
                                                    onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                                    onMouseLeave={e => e.currentTarget.style.color = isDark ? "var(--text-body)" : "var(--text-muted)"}
                                                  >
                                                    {link.name}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      /* Regular dropdown for mobile */
                                      <ul className="space-y-2">
                                        {item.items.map((sub, idx) => (
                                          <li key={idx}>
                                            <Link
                                              to={sub.path}
                                              className="block text-sm py-1 transition-colors"
                                              style={{ color: isDark ? "var(--text-body)" : "var(--text-muted)" }}
                                              onClick={() => setIsOpen(false)}
                                              onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                              onMouseLeave={e => e.currentTarget.style.color = isDark ? "var(--text-body)" : "var(--text-muted)"}
                                            >
                                              {sub.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </div>
        </nav>
      </header>

      {/* 🔧 FIX 7: Spacer to prevent content from hiding behind fixed header */}
      <div style={{ height: showTopBar ? "calc(40px + 80px)" : "80px" }} />
    </>
  );
};

export default Header;