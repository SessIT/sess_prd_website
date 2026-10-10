import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../context/ThemeContext';
import { FaFacebookF } from 'react-icons/fa';
import { SectionHeader } from './SharedUI';

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, dir = "up", className = "", style = {} }) {
  const [ref, inView] = useInView();
  const map = {
    up: "translateY(44px)",
    left: "translateX(-44px)",
    right: "translateX(44px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : map[dir],
        transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FACEBOOK FEED — Dynamic (real FB Page embed)
───────────────────────────────────────────── */
function FbFeed({ isDark }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* No data-width: with adapt-container-width the SDK measures the
          container, so the iframe never overflows a narrow column. */}
      <div
        className="fb-page"
        style={{ width: '100%', maxWidth: '100%' }}
        data-href="https://www.facebook.com/sesschennai"
        data-tabs="timeline"
        data-height="400"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/sesschennai"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/sesschennai">
            Sri Easwari Scientific Solution
          </a>
        </blockquote>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RIGHT SIDE CONTENT SECTION
───────────────────────────────────────────── */
function RightSideContent({ isDark }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  // Validation functions
  const validateName = (value) => {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!value.trim()) {
      return "Name is required";
    } else if (!nameRegex.test(value)) {
      return "Name should only contain alphabets and spaces (2-50 characters)";
    }
    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!value.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(value)) {
      return "Please enter a valid email address (e.g., name@example.com)";
    }
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors({ ...errors, name: validateName(value) });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    
    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
      return;
    }
    
    // Handle successful form submission
    console.log("Form submitted:", { name, email });
    alert("Thank you for connecting with us!");
    setName("");
    setEmail("");
    setErrors({ name: "", email: "" });
  };

  return (
    <div className="flex flex-col justify-center h-full px-6 lg:px-8 py-8">
      <FadeIn dir="left" delay={0.1}>
        <SectionHeader
          eyebrow="Connect With Us"
          title="News, Blogs, Case Studies"
          isDark={isDark}
          style={{ marginBottom: 'var(--space-2)' }}
        />
      </FadeIn>

      <FadeIn dir="left" delay={0.3}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: "var(--text-base)",
            lineHeight: "1.6",
            color: isDark ? '#94a3b8' : '#4a5568',
            marginBottom: "2rem",
          }}
        >
          Keep up with the latest happenings from the world of Reliability Testing.
        </p>
      </FadeIn>

      <FadeIn dir="left" delay={0.4}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "var(--text-base)",
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                border: `1px solid ${errors.name ? "#ef4444" : (isDark ? '#333333' : '#e2e8f0')}`,
                borderRadius: "0.5rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = "#00b3b3";
                  e.target.style.boxShadow = "0 0 0 3px rgba(0,179,179,0.1)";
                }
              }}
              onBlur={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = isDark ? '#333333' : '#e2e8f0';
                }
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.name && (
              <p style={{
                color: "#ef4444",
                fontSize: "var(--text-xs)",
                marginTop: "0.25rem",
                marginLeft: "0.25rem"
              }}>
                {errors.name}
              </p>
            )}
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "var(--text-base)",
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                border: `1px solid ${errors.email ? "#ef4444" : (isDark ? '#333333' : '#e2e8f0')}`,
                borderRadius: "0.5rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = "#00b3b3";
                  e.target.style.boxShadow = "0 0 0 3px rgba(0,179,179,0.1)";
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = isDark ? '#333333' : '#e2e8f0';
                }
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.email && (
              <p style={{
                color: "#ef4444",
                fontSize: "var(--text-xs)",
                marginTop: "0.25rem",
                marginLeft: "0.25rem"
              }}>
                {errors.email}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "var(--text-base)",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#00b3b3",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#00c3b3";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#00b3b3";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Subscribe Now
          </button>
        </form>
      </FadeIn>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function SocialMediaSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  /* ── Load Facebook SDK — only once the section is near the viewport,
     so its ~440 KB of scripts/images don't slow the initial page load ── */
  const [loadFb, setLoadFb] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadFb(true);
          io.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!loadFb) return;
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({ xfbml: true, version: "v18.0" });
      window.FB.XFBML.parse();
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, [loadFb]);

  /* ── Re-adapt the FB iframe when the viewport is resized ──
     adapt-container-width only measures at parse time, so without this the
     fixed-size iframe overflows after any resize/zoom change. */
  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => window.FB?.XFBML?.parse(), 400);
    };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, []);

  /* ── Section visibility for animation ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{
        backgroundColor: isDark ? '#050505' : '#f9fafb',
      }}
    >
      {/* ================= PREMIUM BACKGROUND ================= */}

      {/* Aurora Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: '200%',
            height: '200%',
            background: isDark
              ? 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.15), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,0,150,0.12), transparent 40%)'
              : 'radial-gradient(circle at 30% 30%, rgba(0,150,255,0.12), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,0,120,0.10), transparent 40%)',
            backgroundSize: '200% 200%',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Floating Light Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: isDark
                ? 'rgba(0,255,255,0.08)'
                : 'rgba(0,150,255,0.06)',
              filter: 'blur(100px)',
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
            }}
          />
        ))}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
        >
          <SectionHeader eyebrow="Stay Connected" title="Our Social Media Presence" isDark={isDark} />
        </motion.div>

        <div className="w-full">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column - Facebook Feed */}
            <FadeIn dir="right" delay={0.1} className="h-full">
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl h-full flex flex-col"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,179,179,0.2)',
                  boxShadow: isDark 
                    ? '0 0 30px rgba(0,255,255,0.1)' 
                    : '0 0 30px rgba(0,179,179,0.1)',
                }}
              >
                <div className="px-6 py-4" style={{
                  borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,179,179,0.1)',
                }}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex items-center justify-center w-8 h-8 rounded"
                      style={{
                        backgroundColor: '#00b3b3',
                        color: '#ffffff',
                      }}
                    >
                      <FaFacebookF className="text-white" />
                    </div>
                    <h3 
                      className="font-bold text-lg"
                      style={{
                        color: 'var(--color-primary-500)',
                      }}
                    >
                      Facebook Feed
                    </h3>
                  </div>
                </div>
                <div
                  className="p-4 flex-1 flex items-center justify-center"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#f9fafb',
                    minHeight: '408px',
                  }}
                >
                  <FbFeed isDark={isDark} />
                </div>
              </div>
            </FadeIn>

            {/* Right Column - Content Form */}
            <FadeIn dir="left" delay={0.2} className="h-full">
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl h-full"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,179,179,0.2)',
                  boxShadow: isDark 
                    ? '0 0 30px rgba(0,255,255,0.1)' 
                    : '0 0 30px rgba(0,179,179,0.1)',
                }}
              >
                <RightSideContent isDark={isDark} />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}