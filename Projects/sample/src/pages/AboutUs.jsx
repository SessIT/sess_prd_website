import React, { useEffect, useRef, useState } from "react";
import { Award, Lightbulb, Users, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import cert1 from "../assets/clients/ISO_cert.jpg";
import cert2 from "../assets/clients/Tuv_cert.jpg";
import cert3 from "../assets/clients/startup_cert.png";
import MD from '../assets/Website_Gallery_img/md.png';
import TD from '../assets/Website_Gallery_img/td.png';
import icon1 from '../assets/Website_Gallery_img/1.jpg.jpeg';
import icon2 from '../assets/Website_Gallery_img/2.png';
import icon3 from '../assets/Website_Gallery_img/3.png';
import icon4 from '../assets/Website_Gallery_img/4.png';
import icon5 from '../assets/Website_Gallery_img/5.png';
import icon6 from '../assets/Website_Gallery_img/6.png';
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
  { emoji: icon1, name: "Electronics" },
  { emoji: icon2, name: "Automotive" },
  { emoji: icon3, name: "Military & Defence" },
  { emoji: icon4, name: "Aeronautics & Aerospace" },
  { emoji: icon5, name: "Plastic & Rubber" },
  { emoji: icon6, name: "Hospital & Research" },
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
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop- text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all z-10"
      >
        ←
      </button>
      <button
        onClick={() => onIndexChange((activeIndex + 1) % totalSlides)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop- text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all z-10"
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

// YouTube Video Component
const YouTubeVideo = ({ videoUrl }) => {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

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
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
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
        <span className="text-white font-bold text-sm">Featured Video</span>
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
            Watch Now
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
            Featured Video
          </h2>          
        </FadeIn>

        {/* Mobile Carousel View - Single Video */}
        <div className="block md:hidden mt-12">
          <IphoneFrame isVisible={isVisible}>
            <div className="bg-black rounded-2xl overflow-hidden">
              <div className="p-3 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 flex justify-between items-center">
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
                <div className="relative bg-black rounded-3xl p-2 shadow-2xl">
                  {/* Screen Content */}
                  <div className="bg-black rounded-2xl overflow-hidden h-[400px] relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-700 z-10" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-700 z-10" />
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
                  className="bg-white/20 backdrop-blur text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/30 transition-all"
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
          padding: "36px 24px 48px",
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop- rounded-full px-4 py-2 text-sm font-medium mb-6 border border-white/20"
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
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* LEFT SIDE - Text Content */}
            <FadeIn dir="left">
              <div>
                <div className="mb-2.5">
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
                  organisation at the forefront of environmental test technology.
                  Since inception in 2006, we have specialised in Manufacturing,
                  Trading, Warranty and Service activities across diverse verticals.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Our expertise is built through deep collaboration with clients
                  across India, and we specialise in Climatic, Thermal Cyclic,
                  Temperature, Humidity, Vibration and Altitude testing — backed
                  by over a decade of proven excellence and an unwavering
                  commitment to customer satisfaction.
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
                    className="flex items-center gap-5 bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-sm"
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
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <p className="font-bold text-slate-800 text-base leading-tight">
                        {person.name}
                      </p>
                      <p className="text-cyan-500 text-sm font-semibold mt-1">
                        {person.role}
                      </p>
                      <div className={`mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r ${person.glowColor}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── DESKTOP: overlapping blob layout ── */}
              <div className="hidden md:block relative w-full" style={{ height: "420px" }}>
                
                {/* Person 1 — top left */}
                <div className="absolute" style={{ top: 0, left: "2%", width: "43%" }}>
                  <div className="relative group cursor-pointer">
                    <motion.div
                      animate={{ rotate: [0, 90, -90, 0] }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 "
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
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="mt-8 pl-4 text-center">
                    <p className=" text-slate-800 text-md">P Alagueaswari</p>
                    <span className="text-sm text-cyan-500 ">Managing Director</span>
                  </div>
                </div>

                {/* Person 2 — bottom right */}
                <div className="absolute" style={{ bottom: 0, right: "5%", width: "43%" }}>
                  <div className="relative group cursor-pointer">
                    <motion.div
                      animate={{ rotate: [0, -90, 90, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50 "
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
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="mt-8 pl-4 text-center">
                    <p className=" text-slate-800 text-md">A Paramanantham</p>
                    <span className="text-sm text-cyan-500 ">Technical Director</span>
                  </div>
                </div>

                {/* Connector line between the two */}
                {/* <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-cyan-300 to-indigo-400 opacity-40"
                  style={{ height: "120px" }}
                /> */}
                {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 opacity-60" /> */}

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
            {whyCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeIn key={i} delay={i * 0.1} dir="up">
                  <div className="relative bg-slate-800/50 p-8 sm:p-10 hover:bg-white/5 transition-all duration-300 cursor-default group overflow-hidden h-full">

                    {/* Default state: icon + title centered */}
                    <div className="flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-3">
                      <div className="w-14 h-14 rounded-full border-2 border-cyan-500/30 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                      </div>
                      <div className="font-serif text-lg sm:text-lg font-bold text-white">
                        {c.title}
                      </div>
                    </div>

                    {/* Hover state: icon + title + desc */}
                    <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <div className="w-14 h-14 rounded-full border-2 border-cyan-500 bg-cyan-500/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                      </div>
                      <div className="font-serif text-lg sm:text-lg font-bold text-white mb-3">
                        {c.title}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
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
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-white relative overflow-hidden">

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

        <div className="max-w-7xl mx-auto relative">
          <FadeIn dir="up">
            <span style={{
              display: "block",
              color: "var(--color-primary-400)",
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
              color: "#000",
              margin: "0px",
              textAlign: "center",
            }}>
              Globally Recognised Standards
            </h2>
            {/* <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mb-5 rounded-full" /> */}
            {/* <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              Certifications that reflect our steadfast commitment to quality,
              safety and international compliance across every product and service we offer.
            </p> */}
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-12 sm:mt-16">
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
<section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
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
        Who We Are
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
        Our Foundation
      </h2>      
    </FadeIn>

    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 mt-12 sm:mt-16">
      {/* Vision Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="group"
      >
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105 h-full">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 font-serif">
            Our Vision
          </h3>
          
          {/* Divider */}
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mb-5"></div>
          
          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            To be a globally recognized leader in providing innovative, sustainable, and integrated engineering solutions that shape a better future for generations to come.
          </p>

          {/* Decorative Elements */}
          <div className="mt-6 flex gap-2">
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
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105 h-full">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 font-serif">
            Our Mission
          </h3>
          
          {/* Divider */}
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mb-5"></div>
          
          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            To deliver exceptional engineering solutions through innovation, integrity, and collaboration, while empowering our people and creating sustainable value for our clients and communities.
          </p>

          {/* Decorative Elements */}
          <div className="mt-6 flex gap-2">
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
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105 h-full">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 font-serif">
            Our Values
          </h3>
          
          {/* Divider */}
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mb-5"></div>
          
          {/* Values List */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 group/item">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
              <div>
                <span className="text-cyan-400 font-semibold block mb-1">Innovation</span>
                <p className="text-gray-400 text-sm">Pushing boundaries through creative thinking and cutting-edge solutions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 group/item">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
              <div>
                <span className="text-cyan-400 font-semibold block mb-1">Integrity</span>
                <p className="text-gray-400 text-sm">Acting with honesty, transparency, and ethical responsibility</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          {/* <div className="mt-6 flex gap-2">
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
            {/* <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mt-4">
              SESS testing solutions are trusted across a wide spectrum of
              high-demand industries worldwide.
            </p> */}
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-10 sm:mt-12">
            {industries.map((ind, i) => (
              <FadeIn key={i} delay={i * 0.07} dir="up">
               <div className="bg-gray-50 rounded-xl p-5 sm:p-6 text-center border border-gray-100 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all group">

                  <img
                    src={ind.emoji}
                    alt={ind.name}
                    className="w-20 h-20 sm:w-20 sm:h-20 mx-auto mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="text-xs font-semibold text-slate-700 group-hover:text-white transition-colors">
                    {ind.name}
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
            <SocialMediaSection />
      </section>
    </div>
  );
}