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
   SOCIAL PANEL (Desktop)
───────────────────────────────────────────── */
function SocialPanel({ expanded, color, header, children, onExpand, onClose }) {
  return (
    <div
      className={`transition-all duration-500 overflow-hidden flex flex-col min-w-0 ${
        expanded ? "flex-[0_0_100%]" : "flex-1"
      }`}
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

/* ─────────────────────────────────────────────
   IPHONE FRAME
───────────────────────────────────────────── */
function IphoneFrame({ children, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -15, scale: 0.8, y: 100 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              rotate: 0,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.8 },
            }
          : {}
      }
      className="relative mx-auto"
    >
      <div className="relative w-[300px] sm:w-[340px] md:w-[380px] mx-auto">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-20 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
        </div>

        {/* Phone Body */}
        <div className="relative bg-black rounded-[44px] p-3 shadow-2xl">
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

/* ─────────────────────────────────────────────
   CAROUSEL (Mobile)
───────────────────────────────────────────── */
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
              activeIndex === idx ? "w-6 h-1.5 bg-cyan-400" : "w-1.5 h-1.5 bg-white/50"
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

/* ─────────────────────────────────────────────
   MOBILE SOCIAL PANEL
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   FACEBOOK FEED — Dynamic (real FB Page embed)
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   INSTAGRAM FEED — Dynamic (real IG post embed)
───────────────────────────────────────────── */
function IgFeed({ isActive }) {
  const ref = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    if (loadedRef.current) return;

    const timer = setTimeout(() => {
      if (ref.current && window.instgrm) {
        window.instgrm.Embeds.process();
        loadedRef.current = true;
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div ref={ref} className="flex justify-center w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DWDdZtFCU8b/"
        data-instgrm-version="14"
        style={{ width: "100%" }}
      ></blockquote>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TWITTER FEED — Dynamic (real Twitter timeline embed)
───────────────────────────────────────────── */
function TweetFeed({ isActive }) {
  const ref = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    if (!window.twttr) return;
    if (loadedRef.current) return;

    const timer = setTimeout(() => {
      if (ref.current) {
        window.twttr.widgets.load(ref.current);
        loadedRef.current = true;
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div ref={ref} className="flex justify-center w-full">
      <blockquote className="twitter-tweet">
          {/* <p lang="en" dir="ltr">
            May this Pongal bring new opportunities and continued success.
            <br />
            <br />
            Happy Pongal from our team to yours!!
          </p>
          &mdash; SESS (@sesschennai){" "} */}
          <a href="https://twitter.com/sesschennai/status/2011299219097981243">
            {/* January 14, 2026 */}
          </a>
        </blockquote>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function SocialMediaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);

  /* ── Load Facebook SDK ── */
  useEffect(() => {
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
  }, []);

  /* ── Load Twitter SDK ── */
  useEffect(() => {
    if (window.twttr) return;

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ── Load Instagram SDK ── */
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.id = "insta-sdk";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ── Section visibility for iPhone animation ── */
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
      color: "#222733",
      label: "Follow on Facebook",
      header: (
        <div className="flex items-center gap-2">
          <span className="bg-white text-[#1877f2] font-black text-sm w-6 h-6 rounded flex items-center justify-center">
            f
          </span>
          <span className="text-white font-bold text-sm">Facebook</span>
        </div>
      ),
      content: <FbFeed />,
      fullContent: <FbFeed />,
    },
    {
      id: "ig",
      color: "#00b3b3",
      label: "Follow on Instagram",
      header: (
        <div className="flex items-center gap-2">
          <span className="text-lg">📸</span>
          <span className="text-white font-bold text-sm">Instagram</span>
        </div>
      ),
      content: <IgFeed isActive={activeCarouselIndex === 1} />,
      fullContent: <IgFeed isActive={expanded === "ig"} />,
    },
    {
      id: "tw",
      color: "#222733",
      label: "Follow on X",
      header: (
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-base font-serif">𝕏</span>
          <span className="text-white font-bold text-sm">Twitter</span>
        </div>
      ),
      content: <TweetFeed isActive={activeCarouselIndex === 2} />,
      fullContent: <TweetFeed isActive={expanded === "tw"} />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-white-100 to-white-400"
    >
      <div id="fb-root"></div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto">
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
              color: "#000",
              margin: "0px",
            }}
          >
            Our Social Media Timelines
          </h2>
          {/* <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto mt-4">
            Follow our latest updates, product launches and industry insights across all
            platforms. On mobile, swipe or use arrows to browse feeds. On desktop, click{" "}
            <strong className="text-cyan-400">View</strong> to expand any feed.
          </p> */}
        </FadeIn>

        {/* ── Mobile Carousel View ── */}
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

        {/* ── Desktop Landscape Phone View ── */}
        <div className="hidden md:block">
          <FadeIn dir="up" delay={0.15}>
            <div className="flex justify-center mt-2 sm:mt-6">
              <div className="relative w-full max-w-5xl">
                <div className="relative bg-black rounded-3xl p-2 shadow-2xl">
                  <div className="bg-black rounded-2xl overflow-hidden h-[400px] relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-700 z-10" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-700 z-10" />
                    <div className="flex h-full overflow-hidden rounded-xl gap-3">
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

                  {/* Volume Buttons */}
                  <div className="absolute left-[-3px] top-24 w-[3px] h-[30px] bg-gray-700 rounded-l-full"></div>
                  <div className="absolute left-[-3px] top-36 w-[3px] h-[30px] bg-gray-700 rounded-l-full"></div>

                  {/* Power Button */}
                  <div className="absolute right-[-3px] top-32 w-[3px] h-[40px] bg-gray-700 rounded-r-full"></div>
                </div>
              </div>
            </div>

            {/* <div className="text-center mt-5 text-gray-500 text-xs uppercase tracking-wider">
              Tap "View" to expand a platform within the phone · Tap "Close" to return to
              three-panel view
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
                    boxShadow:
                      i === 0
                        ? "0 4px 20px rgba(24,119,242,.35)"
                        : i === 1
                        ? "0 4px 20px rgba(220,39,67,.3)"
                        : "0 4px 20px rgba(255,255,255,.15)",
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div> */}
          </FadeIn>
        </div>
      </div>

      {/* ── Full Screen Modal (Mobile only) ── */}
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
                {socialItems.find((item) => item.id === expanded)?.fullContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}