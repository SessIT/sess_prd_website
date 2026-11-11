import React, { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// Swiper (JS + CSS) loads only when the carousel goes live — see HeroSwiper.jsx.
const HeroSwiper = lazy(() => import("./HeroSwiper"));

import Slider1 from "../assets/SESS_batterytestchamberbanner_Homepage.webp";
import Slider2 from "../assets/SESS_thermalcyclicchamberbanner_Homepage.webp";
import Slider3 from "../assets/SESS_flameproofovenbanner_Homepage.webp";
import Slider1Sm from "../assets/SESS_batterytestchamberbanner_Homepage_mobile.webp";
import Slider2Sm from "../assets/SESS_thermalcyclicchamberbanner_Homepage_mobile.webp";
import Slider3Sm from "../assets/SESS_flameproofovenbanner_Homepage_mobile.webp";

// Phones get the 640w file (~half the bytes). Keep in sync with the hero
// preload in vite.config.js (imagesizes must match for the preload to be used).
const HERO_SIZES = "(max-width: 767px) calc(100vw - 4rem), 680px";
const HERO_MIN_H = "calc(100vh - 100px)";


const slides = [
  {
    image: Slider1,
    imageSm: Slider1Sm,
    title: "Battery Test Chamber",
    subtitle: '"Industrial-Grade Battery Validation Starts Here."',
    description: "Our chambers replicate real-world stress to ensure battery systems meet the highest safety and reliability standards.",
    link: "/battery-test-chamber",
  },
  {
    image: Slider2,
    imageSm: Slider2Sm,
    title: "Thermal Cyclic Test Chamber",
    subtitle: '"Precision Testing for Thermal Resilience."',
    description: "Accelerate validation of thermal resilience with accurate and programmable transition control.",
    link: "/thermal-cyclic-chamber",
  },
  {
    image: Slider3,
    imageSm: Slider3Sm,
    title: "Flame Proof Oven",
    subtitle: '"Where Heat Meets Hazard, We Deliver Confidence."',
    description: "Engineered to perform where failure isn't an option. Our flameproof systems ensure safety in the most demanding industrial zones.",
    link: "/flame-proof-hot-air-oven",
  },
];

const HeroSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // index.html paints a static copy of slide 1 (#hero-shell, see heroShell in
  // vite.config.js) before any JS runs. Drop it before this hero's first paint.
  useLayoutEffect(() => {
    document.getElementById("hero-shell")?.remove();
  }, []);

  // The carousel goes live (Swiper loads, autoplay starts) on the visitor's
  // first interaction, or 10s after load. Until then slide 1 is plain markup:
  // Swiper's init forced a full-page layout (~450ms on a throttled phone) in
  // the middle of page load, and rotating early made slide 2 the LCP element.
  const [live, setLive] = useState(false);
  useEffect(() => {
    const events = ["scroll", "pointerdown", "keydown", "touchstart"];
    let timer;
    const start = () => {
      cleanup();
      setLive(true);
    };
    const onLoad = () => { timer = setTimeout(start, 10000); };
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return cleanup;
  }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 30,
    width: "44px",
    height: "44px",
    borderRadius: "var(--border-radius-full)",
    border: `1px solid ${isDark ? "var(--border-default)" : "var(--color-neutral-300)"}`,
    background: isDark ? "rgba(2,6,23,0.90)" : "var(--surface-default)",
    color: isDark ? "var(--text-body)" : "var(--color-neutral-500)",
    cursor: "pointer",
    transition: "var(--transition-base)",
    boxShadow: "var(--shadow-sm)",
  };

  const arrowHover = e => {
    e.currentTarget.style.borderColor = "var(--color-primary-500)";
    e.currentTarget.style.color       = "var(--color-primary-500)";
  };
  const arrowUnhover = e => {
    e.currentTarget.style.borderColor = isDark ? "var(--border-default)" : "var(--color-neutral-300)";
    e.currentTarget.style.color       = isDark ? "var(--text-body)" : "var(--color-neutral-500)";
  };

  const renderSlide = (slide, index) => (
    <div
      className="relative flex items-center w-full overflow-hidden"
      style={{
        minHeight: "calc(100vh - 100px)",
        background: isDark ? "var(--color-neutral-950)" : "var(--bg-subtle)",
      }}
    >
      {/* Static gradient + slowly drifting orbs. The orbs animate with CSS
          transforms only (compositor thread); the old framer-motion loops
          animated background-position and repainted every frame. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? "linear-gradient(270deg, #020617, #0f172a, #111827, #020617)"
            : "linear-gradient(270deg, var(--color-neutral-50), var(--color-neutral-100), var(--color-neutral-0), var(--color-neutral-50))",
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="sess-orb-a"
          style={{
            position: "absolute", top: "2.5rem", right: "5rem",
            width: "288px", height: "288px", borderRadius: "50%",
            filter: "blur(48px)", opacity: 0.20,
            background: isDark ? "var(--color-primary-500)" : "var(--color-primary-200)",
          }}
        />
        <div
          className="sess-orb-b"
          style={{
            position: "absolute", bottom: "2.5rem", left: "6rem",
            width: "288px", height: "288px", borderRadius: "50%",
            filter: "blur(48px)", opacity: 0.20,
            background: isDark ? "var(--color-secondary-500)" : "var(--color-secondary-100)",
          }}
        />
      </div>

      {/* Centered content row — capped so ultra-wide (2K/4K) screens
          don't push the text to the far-left edge of the viewport */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-[1760px] mx-auto">
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 md:px-16 py-10 md:py-0 lg:pl-24">
        {/* No JS animation here: slide 1 is the LCP element and must paint
            at once; Swiper mounts every slide at load, so slides 2-3 used to
            finish their entrance offscreen. Kept framer-motion out of the
            homepage's critical path. */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="min-w-0" style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color: "var(--color-primary-500)",
            }}>
              {slide.title}
            </span>
            <div style={{ flex: 1, height: "1px", background: isDark ? "var(--border-default)" : "var(--color-neutral-300)" }} />
          </div>

          <h2
            className="text-center mb-5"
            style={{
              color: isDark ? "var(--text-heading)" : "var(--color-neutral-900)",
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(var(--text-2xl), 3vw, var(--text-3xl))",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {slide.subtitle}
          </h2>

          <p
            className="text-center leading-relaxed mb-6 max-w-sm mx-auto"
            style={{
              fontSize: "var(--text-sm)",
              color: isDark ? "var(--text-body)" : "var(--color-neutral-500)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            {slide.description}
          </p>

          <div className="flex justify-center">
            <Link
              to={slide.link}
              className="hover:scale-[1.04] active:scale-[0.96]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-3) var(--space-5)",
                borderRadius: "var(--border-radius-full)",
                // primary-700: white text on primary-500 failed WCAG contrast (2.6:1)
                background: "var(--color-primary-700)",
                color: "var(--color-neutral-0)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-semibold)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-widest)",
                textDecoration: "none",
                transition: "var(--transition-base)",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#006060"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary-700)"}
            >
              Learn More<span className="sr-only"> about the {slide.title}</span>
              <FaArrowRight style={{ fontSize: "12px" }} />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[55%] flex items-center justify-center px-8 py-10 md:py-0">
        <img
          key={index}
          src={slide.image}
          srcSet={`${slide.imageSm} 640w, ${slide.image} 900w`}
          sizes={HERO_SIZES}
          alt={slide.title}
          width={900}
          height={765}
          fetchPriority={index === 0 ? "high" : "low"}
          loading={index === 0 ? "eager" : "lazy"}
          decoding={index === 0 ? "sync" : "async"}
          className="w-full h-auto max-w-lg xl:max-w-xl object-contain drop-shadow-xl"
          style={{ maxHeight: "100vh" }}
        />
      </div>
      </div>
    </div>
  );
  const staticSlide = <div className="w-full" style={{ minHeight: HERO_MIN_H }}>{renderSlide(slides[0], 0)}</div>;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: "calc(100vh - 100px)",
        background: isDark ? "var(--color-neutral-950)" : "var(--bg-subtle)",
      }}
    >
      <button
        ref={prevRef}
        className="hidden md:flex items-center justify-center"
        style={{ ...arrowStyle, left: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
        aria-label="Previous slide"
        onMouseEnter={arrowHover} onMouseLeave={arrowUnhover}
      >
        <FaArrowLeft style={{ fontSize: "14px" }} />
      </button>

      <button
        ref={nextRef}
        className="hidden md:flex items-center justify-center"
        style={{ ...arrowStyle, right: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
        aria-label="Next slide"
        onMouseEnter={arrowHover} onMouseLeave={arrowUnhover}
      >
        <FaArrowRight style={{ fontSize: "14px" }} />
      </button>

      {live ? (
        <Suspense fallback={staticSlide}>
          <HeroSwiper slides={slides} renderSlide={renderSlide} prevRef={prevRef} nextRef={nextRef} minHeight={HERO_MIN_H} />
        </Suspense>
      ) : staticSlide}
    </section>
  );
};

export default HeroSlider;