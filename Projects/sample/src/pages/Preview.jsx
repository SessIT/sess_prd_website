import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// function FbFeed() {
//   return (
//     <div className="flex flex-col gap-2.5">
//       <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
//         <div className="w-9 h-9 rounded-full bg-[#1877f2] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
//           S
//         </div>
//         <div>
//           <div className="text-gray-200 font-bold text-xs">SESS Official</div>
//           <div className="text-gray-500 text-[10px]">
//             Sri Easwari Scientific Solution Pvt Ltd
//           </div>
//         </div>
//       </div>
//       {fbPosts.map((p, i) => (
//         <div
//           key={i}
//           className="bg-neutral-800/50 rounded-xl p-3 border border-neutral-700"
//         >
//           <div className="text-gray-500 text-[10px] mb-1.5">{p.time}</div>
//           <div className="text-gray-200 text-xs leading-relaxed mb-2.5">
//             {p.text}
//           </div>
//           <div className="flex gap-4 border-t border-neutral-700 pt-2">
//             <span className="text-[#1877f2] text-[11px]">👍 {p.likes}</span>
//             <span className="text-gray-500 text-[11px]">💬 {p.comments}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

//fbfeed
function FbFeed() {
  return (
    <div className="flex justify-center w-full">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/sesschennai"
        data-tabs="timeline"
        data-width="340"
        data-height="500"
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

function TweetFeed({ isActive }) {
  const ref = useRef(null);
  const loadedRef = useRef(false); // 👈 prevent multiple loads

  useEffect(() => {
    if (!isActive) return; // only load when visible
    if (!window.twttr) return;
    if (loadedRef.current) return; // 👈 stop reloading

    const timer = setTimeout(() => {
      if (ref.current) {
        window.twttr.widgets.load(ref.current);
        loadedRef.current = true; // ✅ mark as loaded
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div ref={ref} className="flex justify-center w-full">
      <a
        className="twitter-timeline"
        data-height="300"
        data-theme="dark"
        href="https://twitter.com/sesschennai"
      >
        Tweets by sesschennai
      </a>
    </div>
  );
}

export default function SocialMediaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);

  //fb useeffects
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_APP_ID", // optional (can keep or remove)
        xfbml: true,
        version: "v18.0",
      });

      window.FB.XFBML.parse();
    };

    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);
  }, []);

  //twitter
  useEffect(() => {
  if (window.twttr) return;

  const script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;

  document.body.appendChild(script);
}, []);

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
      content: (
  <TweetFeed isActive={activeCarouselIndex === 2} />
),
fullContent: (
  <TweetFeed isActive={expanded === "tw"} />
)
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <div id="fb-root"></div>
      <div>
        
      </div>
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