import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Slider1 from "../assets/prd1.jpeg";
import Slider2 from "../assets/prd2.jpeg";
import Slider3 from "../assets/prd3.jpeg";

// IMPORTANT: declare OUTSIDE the component, only once
const MotionLink = motion(Link);

const slides = [
  {
    image: Slider1,
    title: "Battery Test Chamber",
    subtitle: '"Industrial-Grade Battery Validation Starts Here."',
    description: "Our chambers replicate real-world stress to ensure battery systems meet the highest safety and reliability standards.",
    link: "/battery-test-chamber",
  },
  {
    image: Slider2,
    title: "Thermal Cyclic Test Chamber",
    subtitle: '"Precision Testing for Thermal Resilience."',
    description: "Accelerate validation of thermal resilience with accurate and programmable transition control.",
    link: "/thermal-cyclic-chamber",
  },
  {
    image: Slider3,
    title: "Flame Proof Oven",
    subtitle: '"Where Heat Meets Hazard, We Deliver Confidence."',
    description: "Engineered to perform where failure isn't an option. Our flameproof systems ensure safety in the most demanding industrial zones.",
    link: "/flame-proof-hot-air-oven",
  },
];

const HeroSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params && swiper.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex items-center w-full overflow-hidden"
              style={{
                minHeight: "calc(100vh - 100px)",
                background: isDark ? "var(--color-neutral-950)" : "var(--bg-subtle)",
              }}
            >
              <motion.div className="absolute inset-0 z-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: isDark
                      ? "linear-gradient(270deg, #020617, #0f172a, #111827, #020617)"
                      : "linear-gradient(270deg, var(--color-neutral-50), var(--color-neutral-100), var(--color-neutral-0), var(--color-neutral-50))",
                    backgroundSize: "400% 400%",
                  }}
                />
              </motion.div>

              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: "2.5rem", right: "5rem",
                    width: "288px", height: "288px", borderRadius: "50%",
                    filter: "blur(48px)", opacity: 0.20,
                    background: isDark ? "var(--color-primary-500)" : "var(--color-primary-200)",
                  }}
                />
                <motion.div
                  animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
                <motion.div
                  key={`text-${index}`}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                >
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

                  <h1
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
                  </h1>

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
                    <MotionLink
                      to={slide.link}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-3)",
                        padding: "var(--space-3) var(--space-5)",
                        borderRadius: "var(--border-radius-full)",
                        background: "var(--color-primary-500)",
                        color: "var(--color-neutral-0)",
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-weight-semibold)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--tracking-widest)",
                        textDecoration: "none",
                        transition: "var(--transition-base)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--color-primary-700)"}
                      onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary-500)"}
                    >
                      Learn More
                      <FaArrowRight style={{ fontSize: "12px" }} />
                    </MotionLink>
                  </div>
                </motion.div>
              </div>

              <div className="w-full md:w-[55%] flex items-center justify-center px-8 py-10 md:py-0">
                <motion.img
                  key={index}
                  src={slide.image}
                  alt={slide.title}
                  initial={{ opacity: 0, x: -40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full max-w-lg xl:max-w-xl object-contain drop-shadow-xl"
                  style={{ maxHeight: "100vh" }}
                />
              </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;