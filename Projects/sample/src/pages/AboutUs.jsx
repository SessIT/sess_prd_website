import React, { useEffect, useRef, useState } from "react";
import { Award, Lightbulb, Users, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import cert1 from "../assets/clients/ISO_cert.jpg";
import cert2 from "../assets/clients/Tuv_cert.jpg";
import cert3 from "../assets/clients/startup_cert.png";
import MD from '../assets/Website_Gallery_img/md.png';
import TD from '../assets/Website_Gallery_img/td.png';
import icon6 from '../assets/Website_Gallery_img/1.jpg.jpeg';
import icon5 from '../assets/Website_Gallery_img/2.png';
import icon4 from '../assets/Website_Gallery_img/3.png';
import icon3 from '../assets/Website_Gallery_img/4.png';
import icon2 from '../assets/Website_Gallery_img/5.png';
import icon1 from '../assets/Website_Gallery_img/6.png';
import cert1Pdf from "../assets/Website_Gallery_img/ISO_certificate.pdf";
import cert2Pdf from "../assets/Website_Gallery_img/pro_certificate.pdf";
import cert3Pdf from "../assets/Website_Gallery_img/about_msme.pdf";

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

function FadeIn({
  children,
  delay = 0,
  dir = "up",
  className = "",
  style = {},
}) {
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

const whyCards = [
    {
    icon: Award,
    title: "Industry Expertise",
    desc: "Over 10 years of experience in environmental testing across diverse verticals.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    desc: "Cutting-edge technology and fully customised designs for every need.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    desc: "More than 30+ highly skilled and motivated professionals at your service.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Focus",
    desc: "Tailored solutions, exceptional pre-sales and post-sales support always.",
  },
];
const certs = [
  {
    badge: "ISO",
    sub: "9001:2015",
    label: "Quality Management System",
    color: "#1a4fa3",
    img: cert1,
    pdf: cert1Pdf,  
  },
  {
    badge: "CE",
    sub: "Marked",
    label: "European Conformity Standard",
    color: "#0e7a52",
    img: cert2,
    pdf: cert2Pdf,  
  },
  {
    badge: "TÜV",
    sub: "India",
    label: "Technical Inspection Body",
    color: "#b8860b",
    img: cert3,
    pdf: cert3Pdf,
  },  
  {
    badge: "CE",
    sub: "Marked",
    label: "European Conformity Standard",
    color: "#0e7a52",
    img: cert2,
    pdf: cert2Pdf,  
  },
];
const industries = [
  { emoji: icon1, name: "Electronics" },
  { emoji: icon2, name: "Automotive" },
  { emoji: icon3, name: "Military & Defence" },
  { emoji: icon4, name: "Aeronautics & Aerospace" },
  { emoji: icon5, name: "Plastic & Rubber" },
  { emoji: icon6, name: "Hospital & Research" },
];

const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: color,
      opacity: 0.15
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.1, 0.25, 0.1],
      scale: [1, 1.3, 1]
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }}
  />
);

/* ─────────────────────────────────────────────
   SOCIAL PANEL
───────────────────────────────────────────── */
// iPhone 17 Pro Max Frame Component
function IphoneFrame({ children, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -15, scale: 0.8, y: 100 }}
      animate={isVisible ? { 
        opacity: 1, 
        rotate: 0, 
        scale: 1, 
        y: 0,
        transition: { 
          type: "spring", 
          damping: 20, 
          stiffness: 100,
          duration: 0.8 
        }
      } : {}}
      className="relative mx-auto"
    >
      {/* iPhone 17 Pro Max Frame */}
      <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] mx-auto">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-20 flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* Phone Body */}
        <div className="relative bg-black rounded-[44px] p-3 shadow-2xl">
          {/* Screen Content */}
          <div className="bg-black rounded-[32px] overflow-hidden h-[560px] sm:h-[620px] relative">
            {children}
          </div>
        </div>
        
        {/* Volume Buttons */}
        <div className="absolute left-[-3px] top-24 w-[3px] h-[30px] bg-gray-700 rounded-l-full"></div>
        <div className="absolute left-[-3px] top-36 w-[3px] h-[30px] bg-gray-700 rounded-l-full"></div>
        
        {/* Power Button */}
        <div className="absolute right-[-3px] top-32 w-[3px] h-[40px] bg-gray-700 rounded-r-full"></div>
      </div>
    </motion.div>
  );
}

// YouTube Video Component
const YouTubeVideo = ({ videoUrl }) => {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;

  return (
    <div className="w-full h-full bg-black">
      <iframe
        className="w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

function SocialMediaSection() {
  const [isVisible, setIsVisible] = useState(false);
  // const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);

  // YouTube video URL
  const videoUrl = "https://youtu.be/NuXrjvzKIVM?si=i1cuMrMv1S5JcBLP";

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

  // Single video item
  const videoItem = {
    id: "video",
    color: "#ff0000",
    label: "Watch Video",
    header: (
      <div className="flex items-center gap-2">
        <span className="text-lg">▶️</span>
        <span className="text-sm font-bold text-white">Featured Video</span>
      </div>
    ),
    content: <YouTubeVideo videoUrl={videoUrl} />,
    fullContent: <YouTubeVideo videoUrl={videoUrl} />
  };

  return (
    <section 
      ref={sectionRef}
      className="px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
        <FadeIn dir="up" className="text-center">
          <span
            style={{
              display: "block",
              color: "var(--color-primary-500)",
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-2)",
            }}
          >
            Watch Now
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
              lineHeight: "var(--leading-tight)",
              color: "var(--color-neutral-0)",
              margin: "0px",
            }}
          >
            Featured Video
          </h2>          
        </FadeIn>

        {/* Mobile Carousel View - Single Video */}
        <div className="block mt-12 md:hidden">
          <IphoneFrame isVisible={isVisible}>
            <div className="overflow-hidden bg-black rounded-2xl">
              <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
                {videoItem.header}
                <button
                  onClick={() => setExpanded(videoItem.id)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Full Screen
                </button>
              </div>
              <div className="h-[500px]">
                <YouTubeVideo videoUrl={videoUrl} />
              </div>
            </div>
          </IphoneFrame>
        </div>

        {/* Desktop View - Video Player */}
        <div className="hidden md:block">
          <FadeIn dir="up" delay={0.15}>
            <div className="flex justify-center mt-12 sm:mt-16">
              <div className="relative w-full max-w-5xl">
                <div className="relative p-2 bg-black shadow-2xl rounded-3xl">
                  {/* Screen Content */}
                  <div className="bg-black rounded-2xl overflow-hidden h-[400px] relative">
                    <div className="absolute z-10 w-2 h-2 -translate-y-1/2 rounded-full left-3 top-1/2 bg-neutral-700" />
                    <div className="absolute z-10 w-2 h-2 -translate-y-1/2 rounded-full right-3 top-1/2 bg-neutral-700" />
                    <div className="w-full h-full">
                      <YouTubeVideo videoUrl={videoUrl} />
                    </div>
                  </div>
                  
                  {/* Volume Buttons for Landscape */}
                  <div className="absolute left-[-3px] top-24 w-[3px] h-[30px] bg-gray-700 rounded-l-full"></div>
                  <div className="absolute left-[-3px] top-36 w-[3px] h-[30px] bg-gray-700 rounded-l-full"></div>
                  
                  {/* Power Button */}
                  <div className="absolute right-[-3px] top-32 w-[3px] h-[40px] bg-gray-700 rounded-r-full"></div>
                </div>
              </div>
            </div>

          </FadeIn>
        </div>
      </div>

      {/* Full Screen Modal for Mobile View Only */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg md:hidden"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-md h-[80vh] bg-black rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute z-10 top-4 right-4">
                <button
                  onClick={() => setExpanded(null)}
                  className="flex items-center justify-center w-10 h-10 text-white transition-all rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
                >
                  ✕
                </button>
              </div>
              <div className="h-full">
                <YouTubeVideo videoUrl={videoUrl} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CertCard({ cert: c, index: i }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    setTilt({ x: rotateX, y: rotateY });

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(6,182,212,0.15) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  const badgeColors = ["#1a4fa3", "#0e7a52", "#b8860b"];
  const color = badgeColors[i] || "#1a4fa3";

  return (
    <a
      href={c.pdf}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "block",
        textDecoration: "none",
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      <div style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        aspectRatio: "1 / 1.414",
        transform: hovered
          ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03) translateY(-6px)`
          : "rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)",
        transition: hovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s cubic-bezier(.25,.8,.25,1), box-shadow 0.5s ease",
        boxShadow: hovered
          ? `0 30px 60px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(6,182,212,0.4), 0 0 40px -8px ${color}55`
          : "0 4px 24px -4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)",
        background: "white",
        transformStyle: "preserve-3d",
      }}>

        {/* Mouse-follow glow */}
        <div ref={glowRef} style={{
          position: "absolute", inset: 0, zIndex: 2,
          borderRadius: "20px", pointerEvents: "none",
          transition: "background 0.05s ease",
        }} />

        {/* Shimmer sweep on hover */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3, borderRadius: "20px",
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: hovered ? "0% 0%" : "100% 0%",
          transition: "background-position 0.6s ease",
          pointerEvents: "none",
        }} />

        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "4px", zIndex: 4,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(.25,.8,.25,1)",
        }} />

        {/* Badge pill */}
        <div style={{
          position: "absolute", top: "16px", right: "16px", zIndex: 5,
          background: `${color}18`,
          border: `1px solid ${color}44`,
          borderRadius: "999px",
          padding: "4px 12px",
          fontSize: "11px",
          fontWeight: "600",
          color: color,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          backdropFilter: "blur(4px)",
          transform: hovered ? "translateZ(20px) scale(1.05)" : "translateZ(0px) scale(1)",
          transition: "transform 0.3s ease",
        }}>
          {c.badge} {c.sub}
        </div>

        {/* Cert image */}
        <div style={{
          width: "100%", height: "90%",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "36px 24px 14px",
        }}>
          <img
            src={c.img}
            alt={c.label}
            style={{
              width: "100%", height: "100%",
              objectFit: "contain",
              transform: hovered ? "translateZ(12px) scale(1.02)" : "translateZ(0px) scale(1)",
              transition: "transform 0.4s ease",
              filter: hovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.12))" : "none",
            }}
          />
        </div>

        {/* Bottom label bar — slides up on hover */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
          padding: "14px 20px",
          background: "linear-gradient(to top, rgba(255,255,255,0.98) 70%, transparent)",
          display: "flex", alignItems: "right", justifyContent: "right",
          transform: hovered ? "translateY(0px)" : "translateY(4px)",
          opacity: hovered ? 1 : 0.7,
          transition: "transform 0.35s ease, opacity 0.35s ease",
        }}>          
          {/* Open PDF arrow */}
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: `${color}15`,
            border: `1px solid ${color}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hovered ? "scale(1.15) rotate(0deg)" : "scale(0.9) rotate(-45deg)",
            transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1)",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

      </div>
    </a>
  );
}
/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function AboutUs() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const particles = [
    { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
    { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
    { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
    { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
    { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
    { x: 65, y: 40, size: 55, delay: 3, color: 'rgb(2 174 178)' }
  ];

  return (
    <div className="overflow-x-hidden font-sans text-slate-800">
      {/* Hero Section */}
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
       
               <div className="relative w-full px-4 py-20 mx-auto max-w-7xl 2xl:max-w-[1440px] sm:px-6 lg:px-8">
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
                     className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-white to-blue-200">
                     About Us
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

      {/* Company Section */}
      <section className="px-5 py-12 bg-white sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            
            {/* LEFT SIDE - Text Content */}
            <FadeIn dir="left">
              <div>
                <div className="mb-2.5">
                  <span
                    style={{
                      display: "block",
                      color: "var(--color-primary-500)",
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-semibold)",
                      fontSize: "var(--text-sm)",
                      letterSpacing: "var(--tracking-wider)",
                      textTransform: "uppercase",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    Who We Are
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "var(--color-neutral-900)",
                      margin: "0px",
                    }}
                  >
                    Innovating Testing Solutions{" "}
                    <span style={{ color: "var(--color-primary-500)" }}>
                      Since 2010
                    </span>
                  </h2>
                </div>
                <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mb-5 rounded-full" />
                <p className="mb-4 text-justify text-sm leading-relaxed text-gray-600 sm:text-base">
                  Sri Easwari Scientific Solution India Pvt. Ltd. (SESS) 
                  is an ISO & CE certified company specializing in advanced 
                  environmental testing and thermal engineering solutions. 
                  Since our inception in 2010, we have been delivering high-performance and 
                  reliable test chambers to industries requiring precise and controlled testing environments.
                </p>
                <p className="mb-6 text-justify text-sm leading-relaxed text-gray-600 sm:text-base">
                  We design, manufacture, and integrate a wide range of environmental test 
                  systems including Climatic Test Chambers, Thermal Shock Chambers, Walk-in 
                  Chambers, Salt Spray Chambers, Rain Test Chambers, Burn-in Ovens, and Custom 
                  Test Chambers tailored to specific customer requirements.
                </p>
                <p className="mb-6 text-justify text-sm leading-relaxed text-gray-600 sm:text-base">
                  At SESS, our core strength lies in engineering customization and control system expertise. 
                  We develop intelligent systems using Siemens PLC, HMI, and advanced data logging solutions, 
                  enabling accurate test control, audit-ready reports, and seamless integration with customer processes.
                </p>
              </div>
            </FadeIn>

            {/* RIGHT SIDE - Director Cards */}
            <FadeIn dir="right" delay={0.15}>

              {/* ── MOBILE: stacked cards ── */}
              <div className="flex flex-col gap-6 md:hidden">
                {[
                  {
                    src: MD,
                    name: "P Alagueaswari",
                    role: "Managing Director",
                    gradientFrom: "from-cyan-500",
                    gradientTo: "to-blue-500",
                    glowColor: "from-cyan-400 to-blue-500",
                    borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                  },
                  {
                    src: TD,
                    name: "A Paramanantham",
                    role: "Technical Director",
                    gradientFrom: "from-blue-600",
                    gradientTo: "to-indigo-500",
                    glowColor: "from-blue-400 to-indigo-500",
                    borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
                  },
                ].map((person, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 p-4 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl"
                  >
                    {/* Blob image */}
                    <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: i * 0.5 }}
                        className={`absolute -inset-3 bg-gradient-to-r ${person.glowColor} opacity-40 `}
                        style={{ borderRadius: person.borderRadius }}
                      />
                      <motion.div
                        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: i * 0.8 }}
                        className={`absolute -inset-1.5 bg-gradient-to-br ${person.glowColor} opacity-25`}
                        style={{ borderRadius: person.borderRadius }}
                      />
                      <div
                        className="relative w-full h-full overflow-hidden shadow-lg"
                        style={{ borderRadius: person.borderRadius }}
                      >
                        <img
                          src={person.src}
                          alt={person.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-base font-bold leading-tight text-slate-800">
                        {person.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-cyan-500">
                        {person.role}
                      </p>
                      <div className={`mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r ${person.glowColor}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── DESKTOP: overlapping blob layout ── */}
              <div className="relative hidden w-full md:block min-h-[380px] lg:min-h-[500px]">
                
                {/* Person 1 — top left */}
                <div className="absolute" style={{ top: 0, left: "2%", width: "43%" }}>
                  <div className="relative cursor-pointer group">
                    <motion.div
                      animate={{ rotate: [0, 90, -90, 0] }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute opacity-50 bg-gradient-to-r from-cyan-400 to-blue-500 "
                      style={{
                        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                        inset: "-14px",
                      }}
                    />
                    <motion.div
                      animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                      className="absolute bg-gradient-to-br from-sky-300 to-cyan-500 opacity-30"
                      style={{
                        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                        inset: "-7px",
                      }}
                    />
                    <div
                      className="relative overflow-hidden shadow-xl"
                      style={{
                        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <img
                        src={MD}
                        alt="P Alagueaswari"
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="pl-4 mt-8 text-center">
                    <p className=" text-slate-800 text-md">P Alagueaswari</p>
                    <span className="text-sm text-cyan-500 ">Managing Director</span>
                  </div>
                </div>

                {/* Person 2 — bottom right */}
                <div className="absolute" style={{ bottom: 0, right: "5%", width: "43%" }}>
                  <div className="relative cursor-pointer group">
                    <motion.div
                      animate={{ rotate: [0, -90, 90, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute opacity-50 bg-gradient-to-r from-blue-500 to-indigo-500 "
                      style={{
                        borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
                        inset: "-14px",
                      }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, repeatType: "reverse", delay: 0.8 }}
                      className="absolute bg-gradient-to-br from-indigo-300 to-blue-500 opacity-30"
                      style={{
                        borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
                        inset: "-7px",
                      }}
                    />
                    <div
                      className="relative overflow-hidden shadow-xl"
                      style={{
                        borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <img
                        src={TD}
                        alt="A Paramanantham"
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="pl-4 mt-8 text-center">
                    <p className=" text-slate-800 text-md">A Paramanantham</p>
                    <span className="text-sm text-cyan-500 ">Technical Director</span>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Why Choose Section */}      
      <section className="px-5 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <FadeIn dir="up" className="text-center">
            <span
              style={{
                display: "block",
                color: "var(--color-primary-500)",
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-semibold)",
                fontSize: "var(--text-sm)",
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                marginBottom: "var(--space-2)",
              }}
            >
              Why Choose SESS?
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                lineHeight: "var(--leading-tight)",
                color: "var(--color-neutral-0)",
                margin: "0px",
              }}
            >
              The SESS Advantage
            </h2>
          </FadeIn>

          <div className="grid gap-2 mt-12 overflow-hidden sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
            {whyCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeIn key={i} delay={i * 0.1} dir="up">
                  <div className="relative h-full p-8 overflow-hidden transition-all duration-300 border rounded-lg shadow-lg cursor-default bg-slate-800/50 sm:p-10 hover:bg-white/5 group border-white/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50">

                    {/* Default state: icon + title centered */}
                    <div className="flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-3">
                      <div className="flex items-center justify-center mb-5 transition-all duration-300 border-2 rounded-full w-14 h-14 border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-glow">
                        <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                      </div>
                      <div className="text-lg text-white font-sans-serif sm:text-lg">
                        {c.title}
                      </div>
                    </div>

                    {/* Hover state: icon + title + desc */}
                    <div className="absolute inset-0 flex flex-col justify-center p-8 transition-all duration-300 translate-y-3 rounded-lg opacity-0 sm:p-10 group-hover:opacity-100 group-hover:translate-y-0 bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex items-center justify-center mb-5 transition-all duration-300 border-2 rounded-full w-14 h-14 border-cyan-500 bg-cyan-500/10 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                      </div>
                      <div className="mb-3 text-lg text-white font-sans-serif sm:text-lg">
                        {c.title}
                      </div>
                      <div className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {c.desc}
                      </div>
                    </div>

                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>     
      
      {/* Certifications Section */}
      <section className="relative px-5 py-12 overflow-hidden bg-white sm:py-16 md:py-20 sm:px-6 lg:px-8">

        {/* Decorative background orbs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "260px", height: "260px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="relative mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <FadeIn dir="up">
            <span style={{
              display: "block",
              color: "var(--color-primary-500)",
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-2)",
              textAlign: "center",
            }}>
              Our Credentials
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
              lineHeight: "var(--leading-tight)",
              color: "var(--color-neutral-900)",
              margin: "0px",
              textAlign: "center",
            }}>
              Globally Recognised Standards
            </h2>
            {/* <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mb-5 rounded-full" /> */}
            {/* <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Certifications that reflect our steadfast commitment to quality,
              safety and international compliance across every product and service we offer.
            </p> */}
          </FadeIn>

          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 sm:mt-16 lg:max-w-5xl lg:mx-auto">
            {certs.map((c, i) => (
              <FadeIn key={i} delay={i * 0.15} dir="up">
                <CertCard cert={c} index={i} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Processes & Competencies */}
      {/* Vision, Mission & Values */}
    <section className="px-5 py-12 overflow-hidden sm:py-16 md:py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
        <FadeIn dir="up" className="text-center">
          <span
            style={{
              display: "block",
              color: "var(--color-primary-500)",
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-2)",
            }}
          >
            Who We Are
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
              lineHeight: "var(--leading-tight)",
              color: "var(--color-neutral-0)",
              margin: "0px",
            }}
          >
            Our Foundation
          </h2>      
        </FadeIn>

        <div className="grid gap-8 mt-12 sm:grid-cols-1 lg:grid-cols-3 sm:mt-16">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full p-8 text-justify transition-all duration-500 border bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border-white/10 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105">
              {/* Animated Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 transition-all duration-500 rounded-full bg-cyan-500/20 blur-xl group-hover:blur-2xl"></div>
                <div className="relative flex items-center justify-center w-16 h-16 transition-transform duration-500 transform shadow-lg rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 group-hover:rotate-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-4 text-2xl font-bold" style={{ color: "var(--color-neutral-0)" }}>
                Our Vision
              </h3>
              
              {/* Divider */}
              <div className="w-12 h-1 mb-5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
              
              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                To be a leading manufacturer of climatic test chambers and industrial refrigeration systems in India, delivering innovative, reliable, and energy-efficient solutions for global industries and research applications.          
              </p>

              {/* Decorative Elements */}
              <div className="flex gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/10"></div>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full p-8 text-justify transition-all duration-500 border bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border-white/10 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105">
              {/* Animated Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 transition-all duration-500 rounded-full bg-cyan-500/20 blur-xl group-hover:blur-2xl"></div>
                <div className="relative flex items-center justify-center w-16 h-16 transition-transform duration-500 transform shadow-lg rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 group-hover:rotate-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-4 text-2xl font-bold" style={{ color: "var(--color-neutral-0)" }}>
                Our Mission
              </h3>
              
              {/* Divider */}
              <div className="w-12 h-1 mb-5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
              
              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                  To design and deliver high-quality environmental test chambers, laboratory equipment, and PLC automation solutions that ensure performance, precision, and customer satisfaction.
                  We focus on custom engineering, timely delivery, and dependable service support for industries across India.          
              </p>

              {/* Decorative Elements */}
              <div className="flex gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/10"></div>
              </div>
            </div>
          </motion.div>

          {/* Our Values Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full p-8 text-justify transition-all duration-500 border bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border-white/10 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105">
              {/* Animated Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 transition-all duration-500 rounded-full bg-cyan-500/20 blur-xl group-hover:blur-2xl"></div>
                <div className="relative flex items-center justify-center w-16 h-16 transition-transform duration-500 transform shadow-lg rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 group-hover:rotate-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-4 text-2xl font-bold" style={{ color: "var(--color-neutral-0)" }}>
                Our Values
              </h3>
              
              {/* Divider */}
              <div className="w-12 h-1 mb-5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
              
              {/* Values List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
                  <div>
                    <span className="block mb-1 font-semibold text-cyan-400">Quality Excellence</span>
                    <p className="text-sm text-gray-400">Delivering durable and high-performance products</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
                  <div>
                    <span className="block mb-1 font-semibold text-cyan-400">Innovation</span>
                    <p className="text-sm text-gray-400">Adopting advanced technology in testing and automation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
                  <div>
                    <span className="block mb-1 font-semibold text-cyan-400">Customer Focus</span>
                    <p className="text-sm text-gray-400">Providing tailored solutions and strong support</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
                  <div>
                    <span className="block mb-1 font-semibold text-cyan-400">Integrity </span>
                    <p className="text-sm text-gray-400">Maintaining transparency and ethical practices</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
                  <div>
                    <span className="block mb-1 font-semibold text-cyan-400">Reliability </span>
                    <p className="text-sm text-gray-400">Ensuring consistent performance and trust</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              {/* <div className="flex gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500/10"></div>
              </div> */}
            </div>
          </motion.div>
        </div>

        {/* Bottom Decorative Wave */}
        {/* <div className="relative mt-16">
          <div className="absolute inset-0 flex justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          </div>
        </div> */}
      </div>
    </section>

      {/* Industries Section */}
      <section className="px-5 py-12 bg-white sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <FadeIn dir="up" className="text-center">
            <span
                    style={{
                      display: "block",
                      color: "var(--color-primary-500)",
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-semibold)",
                      fontSize: "var(--text-sm)",
                      letterSpacing: "var(--tracking-wider)",
                      textTransform: "uppercase",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    Application Sectors
                  </span>
            <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "var(--color-neutral-900)",
                      margin: "0px",
                    }}
                  >
                    Industries We Serve                    
                  </h2>
            {/* <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto mb-5 rounded-full" /> */}
            {/* <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              SESS testing solutions are trusted across a wide spectrum of
              high-demand industries worldwide.
            </p> */}
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 mt-10 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4 sm:mt-12">
            {industries.map((ind, i) => (
              <FadeIn key={i} delay={i * 0.07} dir="up">
               <div className="p-5 text-center transition-all border border-gray-100 bg-gray-50 rounded-xl sm:p-6 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg group">

                  <img
                    src={ind.emoji}
                    alt={ind.name}
                    className="object-contain w-20 h-20 mx-auto mb-4 transition-transform duration-300 sm:w-20 sm:h-20 group-hover:scale-110"
                  />

                  <div className="font-semibold transition-colors text-md text-slate-700 group-hover:text-white" 
                  style={{fontFamily: 'var(--font-display)'}}
                  >
                    {ind.name}
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section — no horizontal padding here: SocialMediaSection
          applies its own px, doubling it indented this section vs its siblings */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800">
            <SocialMediaSection />
      </section>
    </div>
  );
}