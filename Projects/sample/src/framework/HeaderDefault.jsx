import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars, FaTimes, FaChevronDown, FaPhone, FaEnvelope,
  FaSun, FaMoon, FaPlus, FaInstagram, FaFacebookF, FaTwitter, FaBlog,
} from "react-icons/fa";
// import { useTheme } from "../context/ThemeContext";
import Logo from "../assets/sess_logo_png_color.png";
import LogoWhite from "../assets/sess_logo_white.png";

const Header = () => {
  const [isOpen, setIsOpen]               = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showTopBar]                      = useState(true);
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const location  = useLocation();
  // const { theme, toggleTheme } = useTheme();
  // const isDark = theme === "dark";

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
            { name: "Climatic Test Chamber",   path: "/environmental_test_chamber" },
            { name: "Salt Spray Test Chamber", path: "/salt_spray_test_chamber" },
            { name: "Rain Test Chamber",       path: "/rain_test_chamber" },
            { name: "Vibration Test Chamber",  path: "#" },
            { name: "Thermal Cycling Chamber", path: "/thermal_cycling_chamber" },
          ],
        },
        {
          category: "Pharma",
          links: [
            { name: "Humidity Test Chamber",  path: "#" },
            { name: "Stability Test Chamber", path: "#" },
            { name: "Co2 Incubators",         path: "#" },
            { name: "Deep-freezer",           path: "#" },
          ],
        },
        {
          category: "Medical",
          links: [
            { name: "Blood Bank Refrigerator", path: "#" },
            { name: "BOD Incubator",           path: "#" },
            { name: "Incubators",              path: "#" },
            { name: "Plasma Freezer",          path: "#" },
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
    background: "rgba(255,255,255,0.20)",
    color: "var(--color-neutral-0)",
    borderRadius: "var(--border-radius-full)",
    padding: "6px",
    transition: "var(--transition-base)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
          background:  "var(--gradient-brand)",
          borderBottom:  "none",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-10 text-xs" style={{ color: "var(--color-neutral-0)" }}>

            {/* Contact — Desktop */}
            <div className="items-center hidden space-x-4 md:flex">
              <a href="tel:+919444427748" className="flex items-center gap-1 transition-opacity hover:opacity-80">
                <FaPhone style={{ fontSize: "10px" }} />
                <span>+91 94444 27748</span>
              </a>
              <span className="opacity-50">|</span>
              <a href="mailto:easwari.kjsb@gmail.com" className="flex items-center gap-1 transition-opacity hover:opacity-80">
                <FaEnvelope style={{ fontSize: "10px" }} />
                <span>easwari.kjsb@gmail.com</span>
              </a>
            </div>

            {/* Contact — Mobile (icons only) */}
            <div className="flex items-center space-x-3 md:hidden">
              <a href="tel:+919444427748"           className="hover:opacity-80"><FaPhone /></a>
              <a href="mailto:easwari.kjsb@gmail.com" className="hover:opacity-80"><FaEnvelope /></a>
            </div>

            {/* Marquee — Desktop */}
            <div className="items-center flex-1 hidden overflow-hidden md:flex" style={{ marginLeft: "5rem", marginRight: "12rem" }}>
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
            <div className="absolute items-center hidden mr-2 md:flex right-2">
              <AnimatePresence>
                {showSocialIcons && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="flex items-center mr-2 space-x-2"
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
            <div className="flex flex-1 overflow-hidden md:hidden" style={{ marginLeft: "1rem", marginRight: "6.3rem" }}>
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
            <div className="fixed z-50 flex items-center space-x-1 md:hidden right-1">
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
              {/* <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme}
                style={{ ...themeBtnStyle, padding: "4px" }}
              >
                {isDark ? <FaSun size={10} /> : <FaMoon size={10} />}
              </motion.button> */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ MAIN HEADER ══════════════════════════════════════ */}
      {/* 🔧 FIX 4: Adjusted z-index and positioning */}
      <header
        className="fixed w-full py-4 transition-all duration-300"
        style={{
          top: showTopBar ? "40px" : "0",
          zIndex: 35, // Changed from 40 to 35
          background:  "white",
          color: "var(--color-neutral-900)",
          // boxShadow: "var(--shadow-lg)",
        }}
      >
        <nav className="px-4 mx-auto">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="relative z-50">
              <img src={Logo} alt="SESS" style={{ height: "48px" }} />
            </Link>

            {/* Desktop Nav */}
            <div className="items-center hidden space-x-1 lg:flex">
              {navItems.map((item, index) => (
                <div key={index} className="relative group"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  {item.path ? (
                    <Link to={item.path}
                      className="block px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg"
                      style={{
                        color: location.pathname === item.path
                          ? "var(--color-primary-500)"
                          : "var(--color-neutral-700)",
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--color-primary-500)"; e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = location.pathname === item.path ? "var(--color-primary-500)" : "var(--color-neutral-700)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg"
                      style={{
                        color: "var(--color-neutral-700)",
                        fontFamily: "var(--font-body)",
                        background: "transparent",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--color-primary-500)"; e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--color-neutral-700)"; e.currentTarget.style.background = "transparent"; }}
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
                        className="absolute right-0 mt-2 rounded-lg top-full"
                        style={{
                          zIndex: 45, // 🔧 FIX 5: Added proper z-index for dropdown
                          background: "white",
                          boxShadow: "var(--shadow-xl)",
                        }}
                      >
                        {item.label === "Products" ? (
                          /* Mega menu */
                          <div className="grid grid-cols-3 gap-4 p-6" style={{ minWidth: "600px" }}>
                            {item.items.map((col, idx) => (
                              <div key={idx}>
                                <h4 className="mb-2 font-bold" style={{ color: "var(--color-primary-500)", fontFamily: "var(--font-display)" }}>
                                  {col.category}
                                </h4>
                                <ul className="space-y-2">
                                  {col.links.map((link, li) => (
                                    <li key={li}>
                                      <Link to={link.path}
                                        className="text-sm transition-colors"
                                        style={{ color: "var(--text-muted)" }}
                                        onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
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
                                    style={{ color: "var(--text-muted)" }}
                                    onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
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
            <button onClick={() => setIsOpen(!isOpen)} className="relative z-50 p-2 lg:hidden">
              {isOpen
                ? <FaTimes  style={{ fontSize: "24px", color:  "var(--color-neutral-800)" }} />
                : <FaBars   style={{ fontSize: "24px", color:  "var(--color-neutral-800)" }} />
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
                    className="fixed inset-y-0 right-0 w-full overflow-y-auto md:w-96 lg:hidden"
                    style={{
                      top: showTopBar ? "40px" : "0",
                      zIndex: 45,
                      background: "white",
                      boxShadow: "var(--shadow-2xl)",
                    }}
                  >
                    <div className="px-6 pt-24 pb-8">
                      {navItems.map((item, index) => (
                        <div key={index} className="mb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          {item.path ? (
                            <Link to={item.path}
                              className="block py-3 text-lg font-medium transition-colors"
                              style={{ color: "var(--color-neutral-800)", fontFamily: "var(--font-body)" }}
                              onClick={() => setIsOpen(false)}
                              onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                              onMouseLeave={e => e.currentTarget.style.color = "var(--color-neutral-800)"}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <>
                              {/* Mobile dropdown button */}
                              <button
                                onClick={() => toggleMobileDropdown(index)}
                                className="flex items-center justify-between w-full py-3 text-lg font-medium transition-colors"
                                style={{ color: "var(--color-neutral-800)", fontFamily: "var(--font-body)" }}
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
                                    className="pl-4 mb-3 overflow-hidden"
                                  >
                                    {item.label === "Products" ? (
                                      /* Products mega menu for mobile */
                                      <div className="space-y-4">
                                        {item.items.map((col, ci) => (
                                          <div key={ci}>
                                            <p className="mb-2 text-xs font-bold" style={{ color: "var(--color-primary-500)" }}>
                                              {col.category}
                                            </p>
                                            <ul className="space-y-2">
                                              {col.links.map((link, li) => (
                                                <li key={li}>
                                                  <Link
                                                    to={link.path}
                                                    className="block py-1 text-sm transition-colors"
                                                    style={{ color: "var(--text-muted)" }}
                                                    onClick={() => setIsOpen(false)}
                                                    onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
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
                                              className="block py-1 text-sm transition-colors"
                                              style={{ color: "var(--text-muted)" }}
                                              onClick={() => setIsOpen(false)}
                                              onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary-500)"}
                                              onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
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