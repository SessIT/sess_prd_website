import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cert1 from "../assets/clients/ISO_cert.jpg";
import cert2 from "../assets/clients/Tuv_cert.jpg";
import cert3 from "../assets/clients/startup_cert.png";
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

function Counter({ target, suffix = "" }) {
  const [n, setN] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.ceil(target / 55);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        setN(target);
        clearInterval(t);
      } else setN(cur);
    }, 18);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const companyPoints = [
  {
    icon: "🏭",
    title: "Founded 2006",
    desc: "Pioneering environmental test solutions from Chennai, India for 18+ years.",
  },
  {
    icon: "📜",
    title: "ISO & CE Certified",
    desc: "Globally recognised quality and safety certifications across all products.",
  },
  {
    icon: "⚙️",
    title: "Full-Service",
    desc: "Manufacturing, trading, warranty, calibration and AMC under one roof.",
  },
  {
    icon: "🌐",
    title: "Pan-India Reach",
    desc: "Trusted by over 500 clients across pharma, defence, automotive and more.",
  },
];
const stats = [
  { val: 18, suf: "+", label: "Years of Excellence" },
  { val: 30, suf: "+", label: "Skilled Professionals" },
  { val: 500, suf: "+", label: "Projects Delivered" },
  { val: 100, suf: "%", label: "Client Satisfaction" },
];
const whyCards = [
  {
    icon: "👑",
    title: "Industry Expertise",
    desc: "Over 10 years of experience in environmental testing across diverse verticals.",
  },
  {
    icon: "✏️",
    title: "Innovative Solutions",
    desc: "Cutting-edge technology and fully customised chcyan designs for every need.",
  },
  {
    icon: "🎧",
    title: "Dedicated Team",
    desc: "More than 30+ highly skilled and motivated professionals at your service.",
  },
  {
    icon: "👁️",
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
  },
  {
    badge: "CE",
    sub: "Marked",
    label: "European Conformity Standard",
    color: "#0e7a52",
    img: cert2,
  },
  {
    badge: "TÜV",
    sub: "India",
    label: "Technical Inspection Body",
    color: "#b8860b",
    img: cert3,
  },  
];
const processes = [
  {
    icon: "🔬",
    title: "Research & Development",
    desc: "Continuous innovation ensuring chcyans meet evolving global testing standards.",
  },
  {
    icon: "🏗️",
    title: "Production & Inspection",
    desc: "Multi-stage in-house manufacturing with rigorous quality inspection at every step.",
  },
  {
    icon: "✅",
    title: "Quality Assurance",
    desc: "Comprehensive QA/QC testing, simulation, storage and conditioning protocols.",
  },
];
const competencies = [
  {
    icon: "💡",
    title: "Technical Consulting",
    desc: "Expert guidance from concept to deployment, pre-sales and post-sales support included.",
  },
  {
    icon: "🔧",
    title: "Manufacturing",
    desc: "In-house fabrication ensuring precision, durability and on-time delivery.",
  },
  {
    icon: "📅",
    title: "AMC & Calibration",
    desc: "Annual maintenance contracts, refurbishment and certified calibration nationwide.",
  },
];
const industries = [
  { emoji: "⚡", name: "Electronics" },
  { emoji: "🚗", name: "Automotive" },
  { emoji: "🪖", name: "Military & Defence" },
  { emoji: "🚀", name: "Aeronautics & Aerospace" },
  { emoji: "🧪", name: "Plastic & Rubber" },
  { emoji: "🏥", name: "Hospital & Research" },
];

/* ─────────────────────────────────────────────
   SOCIAL DATA
───────────────────────────────────────────── */
const fbPosts = [
  {
    time: "2h ago",
    text: "Our latest Climatic Test Chcyan has just been shipped to a leading automotive client in Pune! 🚗🔬 #SESS #QualityTesting",
    likes: 48,
    comments: 7,
  },
  {
    time: "1d ago",
    text: "Proud to announce our ISO 9001:2015 recertification! A testament to our unwavering commitment to quality. 🏅",
    likes: 112,
    comments: 19,
  },
  {
    time: "3d ago",
    text: "Team SESS participated in the Environmental Testing Expo 2025 at Chennai Trade Centre. Great connections made!",
    likes: 76,
    comments: 11,
  },
];
const igPosts = [
  {
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=300&fit=crop",
    caption: "Precision in every component 🔩",
    likes: 203,
  },
  {
    img: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=300&h=300&fit=crop",
    caption: "Where science meets engineering ⚙️",
    likes: 178,
  },
  {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=300&fit=crop",
    caption: "Testing the boundaries 🌡️",
    likes: 241,
  },
  {
    img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=300&h=300&fit=crop",
    caption: "Built for excellence ✅",
    likes: 189,
  },
];
const tweets = [
  {
    time: "30m ago",
    text: "Exciting news! SESS is expanding its product line with next-gen Thermal Shock Chcyans for the defence sector. Stay tuned! 🇮🇳 #MakeInIndia",
    rt: 23,
    likes: 67,
  },
  {
    time: "6h ago",
    text: "Did you know? Our Salt Spray Test Chcyans comply with ASTM B117 & ISO 9227 standards. Talk to our experts today!",
    rt: 14,
    likes: 45,
  },
  {
    time: "2d ago",
    text: "Happy to share that we completed 500+ successful chcyan installations across India! Thank you for your trust 🙏 #SESS",
    rt: 31,
    likes: 88,
  },
];

/* ─────────────────────────────────────────────
   SOCIAL PANEL
───────────────────────────────────────────── */
function SocialPanel({ expanded, color, header, children, onExpand, onClose }) {
  return (
    <div
      className={`transition-all duration-500 overflow-hidden flex flex-col min-w-0 ${expanded ? "flex-[0_0_100%]" : "flex-1"}`}
    >
      <div
        className="flex items-center justify-between flex-shrink-0 px-3 py-2"
        style={{ background: color }}
      >
        {header}
        {!expanded ? (
          <button
            onClick={onExpand}
            className="bg-white/20 text-white rounded-md px-3 py-1 text-xs font-bold cursor-pointer"
          >
            View
          </button>
        ) : (
          <button
            onClick={onClose}
            className="bg-white/20 text-white rounded-md px-3 py-1 text-xs font-bold cursor-pointer"
          >
            ✕ Close
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2.5 bg-neutral-900 scrollbar-thin">
        {children}
      </div>
    </div>
  );
}

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
      <div className="relative w-[300px] sm:w-[340px] md:w-[380px] mx-auto">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-20 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
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

// Carousel Component for Mobile
function SocialCarousel({ activeIndex, onIndexChange, children }) {
  const totalSlides = React.Children.count(children);
  
  return (
    <div className="relative h-full">
      <div className="overflow-hidden h-full">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full overflow-y-auto">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onIndexChange(idx)}
            className={`transition-all rounded-full ${
              activeIndex === idx 
                ? "w-6 h-1.5 bg-cyan-400" 
                : "w-1.5 h-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={() => onIndexChange((activeIndex - 1 + totalSlides) % totalSlides)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all z-10"
      >
        ←
      </button>
      <button
        onClick={() => onIndexChange((activeIndex + 1) % totalSlides)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all z-10"
      >
        →
      </button>
    </div>
  );
}

// Mobile Social Panel Component
function SocialPanelMobile({ color, header, children, onViewClick }) {
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between flex-shrink-0 px-4 py-3"
        style={{ background: color }}
      >
        {header}
        <button
          onClick={onViewClick}
          className="bg-white/20 text-white rounded-md px-4 py-1.5 text-xs font-bold cursor-pointer hover:bg-white/30 transition-all"
        >
          View Full
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 bg-neutral-900">
        {children}
      </div>
    </div>
  );
}

function FbFeed() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
        <div className="w-9 h-9 rounded-full bg-[#1877f2] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
          S
        </div>
        <div>
          <div className="text-gray-200 font-bold text-xs">SESS Official</div>
          <div className="text-gray-500 text-[10px]">
            Sri Easwari Scientific Solution Pvt Ltd
          </div>
        </div>
      </div>
      {fbPosts.map((p, i) => (
        <div
          key={i}
          className="bg-neutral-800/50 rounded-xl p-3 border border-neutral-700"
        >
          <div className="text-gray-500 text-[10px] mb-1.5">{p.time}</div>
          <div className="text-gray-200 text-xs leading-relaxed mb-2.5">
            {p.text}
          </div>
          <div className="flex gap-4 border-t border-neutral-700 pt-2">
            <span className="text-[#1877f2] text-[11px]">👍 {p.likes}</span>
            <span className="text-gray-500 text-[11px]">💬 {p.comments}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function IgFeed() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
          S
        </div>
        <div>
          <div className="text-white font-bold text-xs">sess_official</div>
          <div className="text-gray-500 text-[10px]">
            Environmental Test Solutions
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {igPosts.map((p, i) => (
          <div key={i} className="rounded-lg overflow-hidden relative">
            <img
              src={p.img}
              alt=""
              className="w-full aspect-square object-cover block"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-5">
              <div className="text-white text-[9px] leading-tight">
                {p.caption}
              </div>
              <div className="text-[#f58529] text-[9px] mt-0.5">
                ❤️ {p.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TweetFeed() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
        <div className="w-9 h-9 rounded-full bg-black border border-neutral-700 flex items-center justify-center text-white font-black text-base flex-shrink-0">
          𝕏
        </div>
        <div>
          <div className="text-gray-200 font-bold text-xs">@SESS_India</div>
          <div className="text-gray-600 text-[10px]">
            Sri Easwari Scientific Solution
          </div>
        </div>
      </div>
      {tweets.map((t, i) => (
        <div
          key={i}
          className="bg-black rounded-xl p-3 border border-neutral-800"
        >
          <div className="text-gray-600 text-[10px] mb-1.5">{t.time}</div>
          <div className="text-gray-200 text-xs leading-relaxed mb-2.5">
            {t.text}
          </div>
          <div className="flex gap-4 border-t border-neutral-800 pt-2">
            <span className="text-[#1d9bf0] text-[11px]">🔁 {t.rt}</span>
            <span className="text-[#f91880] text-[11px]">❤️ {t.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


function SocialMediaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);

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

  const socialItems = [
    {
      id: "fb",
      color: "#1877f2",
      label: "Follow on Facebook",
      header: (
        <div className="flex items-center gap-2">
          <span className="bg-white text-[#1877f2] font-black text-sm w-6 h-6 rounded flex items-center justify-center">f</span>
          <span className="text-white font-bold text-sm">Facebook</span>
        </div>
      ),
      content: <FbFeed />,
      fullContent: <FbFeed />
    },
    {
      id: "ig",
      color: "linear-gradient(90deg,#f09433,#dc2743,#bc1888)",
      label: "Follow on Instagram",
      header: (
        <div className="flex items-center gap-2">
          <span className="text-lg">📸</span>
          <span className="text-white font-bold text-sm">Instagram</span>
        </div>
      ),
      content: <IgFeed />,
      fullContent: <IgFeed />
    },
    {
      id: "tw",
      color: "#000000",
      label: "Follow on X",
      header: (
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-base font-serif">𝕏</span>
          <span className="text-white font-bold text-sm">X (Twitter)</span>
        </div>
      ),
      content: <TweetFeed />,
      fullContent: <TweetFeed />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn dir="up" className="text-center">
          <span
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
                    Connect With Us
                  </span>
            <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "white",
                      margin: "0px",
                    }}
                  >
                    Our Social Media Timelines                    
                  </h2>
          {/* <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto mb-5 rounded-full" /> */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto mt-4">
            Follow our latest updates, product launches and industry insights
            across all platforms. On mobile, swipe or use arrows to browse feeds. 
            On desktop, click <strong className="text-cyan-400">View</strong> to expand any feed.
          </p>
        </FadeIn>

        {/* Mobile Carousel View */}
        <div className="block md:hidden mt-12">
          <IphoneFrame isVisible={isVisible}>
            <SocialCarousel 
              activeIndex={activeCarouselIndex} 
              onIndexChange={setActiveCarouselIndex}
            >
              {socialItems.map((item, idx) => (
                <SocialPanelMobile
                  key={idx}
                  color={item.color}
                  header={item.header}
                  onViewClick={() => setExpanded(item.id)}
                >
                  {item.content}
                </SocialPanelMobile>
              ))}
            </SocialCarousel>
          </IphoneFrame>
        </div>

        {/* Desktop View - Landscape Phone Layout */}
        <div className="hidden md:block">
          <FadeIn dir="up" delay={0.15}>
            <div className="flex justify-center mt-12 sm:mt-16">
              {/* Landscape Phone Frame */}
              <div className="relative w-full max-w-5xl">
                <div className="relative bg-black rounded-3xl p-2 shadow-2xl">
                  {/* Dynamic Island (on top for landscape) */}
                  {/* <div className="absolute -top-50 right-0  w-[100px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-8 h-1.5 bg-gray-800 rounded-full"></div>
                  </div> */}
                  
                  {/* Screen Content */}
                  <div className="bg-black rounded-2xl overflow-hidden h-[400px] relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-700 z-10" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-700 z-10" />
                    <div className="flex h-full overflow-hidden rounded-xl">
                      {socialItems.map((item) => (
                        <SocialPanel
                          key={item.id}
                          expanded={expanded === item.id}
                          color={item.color}
                          header={item.header}
                          onExpand={() => setExpanded(item.id)}
                          onClose={() => setExpanded(null)}
                        >
                          {item.fullContent}
                        </SocialPanel>
                      ))}
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

            <div className="text-center mt-5 text-gray-500 text-xs uppercase tracking-wider">
              Tap "View" to expand a platform within the phone · Tap "Close" to return to three-panel view
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
              {socialItems.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold transition-transform hover:-translate-y-0.5"
                  style={{
                    background: s.color,
                    color: "#fff",
                    boxShadow: i === 0 
                      ? "0 4px 20px rgba(24,119,242,.35)"
                      : i === 1 
                        ? "0 4px 20px rgba(220,39,67,.3)"
                        : "0 4px 20px rgba(255,255,255,.15)",
                  }}
                >
                  {s.label}
                </a>
              ))}
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 md:hidden"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-md h-[80vh] bg-black rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setExpanded(null)}
                  className="bg-white/20 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  ✕
                </button>
              </div>
              <div className="h-full overflow-y-auto">
                {socialItems.find(item => item.id === expanded)?.fullContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="font-sans text-slate-800 overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: "var(--gradient-brand)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -45, 0],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6 border border-white/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ISO & CE Certified Company
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              About Sess
            </h1>
            <p className="text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed px-4">
              Sri Easwari Scientific Solution Pvt. Ltd. — a pioneering leader in
              environmental test solutions, delivering precision, innovation and
              excellence since 2010.
            </p>
          </motion.div>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 lg:h-56">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto text-slate-50 fill-current"
          >
            <path
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div> */}
      </section>

      {/* Company Section */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <FadeIn dir="left">
              <div>
                <div
                  className="mb-2.5"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <span
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
                    Who We Are
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "black",
                      margin: "0px",
                    }}
                  >
                    Innovating Testing Solutions{" "}
                    <span style={{ color: "var(--color-primary-400)" }}>
                      Since 2010
                    </span>
                  </h2>
                </div>
                <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mb-5 rounded-full" />
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Sri Easwari Scientific Solution Pvt. Ltd. is a solutions-based
                  organisation at the forefront of environmental test
                  technology. Since inception in 2006, we have specialised in
                  Manufacturing, Trading, Warranty and Service activities across
                  diverse verticals.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Our expertise is built through deep collaboration with clients
                  across India, and we specialise in Climatic, Thermal Cyclic,
                  Temperature, Humidity, Vibration and Altitude testing — backed
                  by over a decade of proven excellence and an unwavering
                  commitment to customer satisfaction.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {companyPoints.map((p, i) => (
                    <FadeIn key={i} delay={0.1 + i * 0.07} dir="up">
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">{p.icon}</div>
                        <div className="font-bold text-sm text-slate-800 mb-1">
                          {p.title}
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {p.desc}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn dir="right" delay={0.15}>
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                  <div className="relative z-10">
                    <div
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
                    Our Core Offerings
                  </div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-white mb-6">
                      Advanced Environmental Testing Solutions
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Climatic Test Chcyans",
                        "Thermal Shock Test Chcyans",
                        "Salt Spray & Corrosion Chcyans",
                        "Vibration Combined Climatic Chcyans",
                        "ESS Thermal Cyclic Test Chcyans",
                        "Humidity & Stability Chcyans",
                        "Pharma & Medical Incubators",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 py-2 border-b border-white/10 last:border-b-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-white/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-cyan-500 text-slate-900 font-bold p-4 rounded-xl shadow-lg z-20 text-center">
                  <strong className="block font-serif text-2xl sm:text-3xl">
                    18+
                  </strong>
                  Years of Trust
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn dir="up" className="text-center">
            <span
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
                    Why Choose SESS?
                  </span>
            <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "white",
                      margin: "0px",
                    }}
                  >
                    The SESS Advantage                    
                  </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mt-12 sm:mt-16">
            {whyCards.map((c, i) => (
              <FadeIn key={i} delay={i * 0.1} dir="up">
                <div className="bg-slate-800/50 p-8 sm:p-10 hover:bg-white/5 transition-all cursor-default group">
                  <div className="w-14 h-14 rounded-full border-2 border-cyan-500/30 flex items-center justify-center text-2xl mb-5 group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all">
                    {c.icon}
                  </div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-white mb-3">
                    {c.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {c.desc}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}      
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
            <FadeIn dir="up">
            <span
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
                    Our Credentials
                  </span>
            <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "#000",
                      margin: "0px",
                    }}
                  >
                    Globally Recognised Standards                  
                  </h2>
            <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mb-5 rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
                Certifications that reflect our steadfast commitment to quality,
                safety and international compliance across every product and
                service we offer.
            </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-16">
                {certs.map((c, i) => (
                    <FadeIn key={i} delay={i * 0.1} dir="up">
                    
                    {/* A4 Ratio Card */}
                    <div className="rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all aspect-[1/1.414] bg-white">
                        
                        {/* Image Section */}
                        <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                            src={c.img}
                            alt={c.label}
                            className="w-full h-full object-contain"
                        />
                        </div>

                    </div>

                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* Processes & Competencies */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn dir="up">
            <span
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
                    How We Operate
                  </span>
            <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "#000",
                      margin: "0px",
                    }}
                  >
                    Processes & Competencies                    
                  </h2>
            <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-10 sm:mt-12">
            <FadeIn dir="left" delay={0.1}>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold text-slate-800 pb-3 border-b-2 border-cyan-500 mb-6">
                  Our Processes
                </div>
                {processes.map((item, i) => (
                  <div className="flex gap-4 mb-6 items-start" key={i}>
                    <div className="w-12 h-12 flex-shrink-0 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn dir="right" delay={0.2}>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold text-slate-800 pb-3 border-b-2 border-cyan-500 mb-6">
                  Our Competencies
                </div>
                {competencies.map((item, i) => (
                  <div className="flex gap-4 mb-6 items-start" key={i}>
                    <div className="w-12 h-12 flex-shrink-0 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn dir="up" className="text-center">
            <span
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
                    Application Sectors
                  </span>
            <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
                      lineHeight: "var(--leading-tight)",
                      color: "#000",
                      margin: "0px",
                    }}
                  >
                    Industries We Serve                    
                  </h2>
            {/* <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto mb-5 rounded-full" /> */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mt-4">
              SESS testing solutions are trusted across a wide spectrum of
              high-demand industries worldwide.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-10 sm:mt-12">
            {industries.map((ind, i) => (
              <FadeIn key={i} delay={i * 0.07} dir="up">
                <div className="bg-gray-50 rounded-xl p-5 sm:p-6 text-center border border-gray-100 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all group">
                  <span className="text-3xl sm:text-4xl block mb-3 group-hover:scale-110 transition-transform">
                    {ind.emoji}
                  </span>
                  <div className="text-xs font-semibold text-slate-700 group-hover:text-white transition-colors">
                    {ind.name}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section - Updated with iPhone Animation */}
      <SocialMediaSection />      
    </div>
  );
}