import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { climaticTestChamberProduct } from '../data/productData';

function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0.15,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.1, 0.25, 0.1],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

function FadeIn({ children, delay = 0, dir = 'up', className = '', style = {} }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transformMap = {
    up: 'translateY(44px)',
    left: 'translateX(-44px)',
    right: 'translateX(44px)',
    none: 'none',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transformMap[dir],
        transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, dark = false }) {
  return (
    <FadeIn dir="up" className="text-center">
      <span
        style={{
          display: 'block',
          color: 'var(--color-primary-400)',
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--text-sm)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        {eyebrow}
      </span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--font-weight-bold)',
          fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))',
          lineHeight: 'var(--leading-tight)',
          color: dark ? 'white' : '#000',
          margin: '0px',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

function ProductDetail() {
  const product = climaticTestChamberProduct;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState(0);
  const heroRef = useRef(null);

  const images = product.productDetails.images;
  const currentImage = images[currentImageIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${product.title} | SESS Engineering`;
  }, [product.title]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = [
    { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
    { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
    { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
    { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
    { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden font-sans text-slate-800 bg-white"
    >
      <section
        ref={heroRef}
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--gradient-brand)', minHeight: '340px', display: 'flex', alignItems: 'center' }}
      >
        {[
          { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
          { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
          { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
        ].map((blob, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              width: blob.w,
              height: blob.w,
              background: blob.color,
              top: blob.top,
              bottom: blob.bottom,
              left: blob.left,
              right: blob.right,
              opacity: 0.18,
            }}
            animate={{
              x: (mousePos.x - 0.5) * (20 + index * 10),
              y: (mousePos.y - 0.5) * (15 + index * 8),
              scale: [1, 1.12, 1],
            }}
            transition={{
              x: { type: 'spring', stiffness: 30, damping: 20 },
              y: { type: 'spring', stiffness: 30, damping: 20 },
              scale: { duration: 6 + index * 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {particles.map((particle, index) => (
          <Particle key={index} {...particle} />
        ))}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative w-full px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
              {product.hero.tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-4xl bg-clip-text bg-gradient-to-r from-white to-blue-200"
            >
              {product.hero.mainTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="px-4 text-base leading-relaxed text-gray-200 sm:text-lg md:text-lg"
            >
              {product.hero.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-12 bg-white sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <FadeIn dir="left">
              <div className="relative">
                <div className="relative overflow-hidden border border-gray-100 shadow-xl bg-gray-50 rounded-xl">
                  <motion.img
                    key={currentImage.id}
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="object-contain w-full bg-white h-80 sm:h-96"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                  />
                  <div className="absolute px-4 py-2 text-xs font-semibold text-white rounded-full left-4 top-4 bg-slate-900/80 backdrop-blur">
                    {currentImage.title}
                  </div>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 rounded-full shadow-lg left-4 top-1/2 bg-white/90 text-slate-900 hover:bg-cyan-500 hover:text-white"
                    aria-label="Previous product image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 rounded-full shadow-lg right-4 top-1/2 bg-white/90 text-slate-900 hover:bg-cyan-500 hover:text-white"
                    aria-label="Next product image"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2 mt-5">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`overflow-hidden rounded-lg border transition-all ${
                        index === currentImageIndex
                          ? 'border-cyan-500 shadow-lg ring-2 ring-cyan-500/20'
                          : 'border-gray-100 hover:border-cyan-300'
                      }`}
                      aria-label={`Show ${image.title}`}
                    >
                      <img src={image.src} alt={image.alt} className="object-cover w-full h-16 sm:h-20" />
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn dir="right" delay={0.15}>
              <div>
                <div className="mb-2.5">
                  <span
                    style={{
                      display: 'block',
                      color: 'var(--color-primary-400)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Product Overview
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))',
                      lineHeight: 'var(--leading-tight)',
                      color: 'black',
                      margin: '0px',
                    }}
                  >
                    {product.title}
                  </h2>
                </div>
                <div className="w-14 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 mb-5 rounded-full" />
                <p className="mb-4 text-justify text-sm leading-relaxed text-gray-600 sm:text-base">
                  {product.description}
                </p>
                {product.productDetails.overview.map((text, index) => (
                  <p key={index} className="mb-4 text-justify text-sm leading-relaxed text-gray-600 sm:text-base">
                    {text}
                  </p>
                ))}

                <div className="grid gap-4 mt-8 sm:grid-cols-2">
                  {product.productDetails.keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="p-5 transition-all border border-gray-100 rounded-lg bg-gray-50 hover:bg-slate-800 hover:border-cyan-500/50 group"
                    >
                      <div className="mb-3 text-3xl">{feature.icon}</div>
                      <h3 className="mb-2 text-sm font-semibold text-slate-900 group-hover:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-600 group-hover:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Efficiency Benefits"
            title={product.benefits.title}
            subtitle={product.benefits.subtitle}
            dark
          />
          <div className="grid gap-2 mt-12 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
            {product.benefits.benefitsList.map((benefit, index) => (
              <FadeIn key={benefit.id} delay={index * 0.07} dir="up">
                <div className="relative h-full p-8 overflow-hidden transition-all duration-300 border rounded-lg shadow-lg cursor-default bg-slate-800/50 sm:p-10 hover:bg-white/5 group border-white/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50">
                  <div className="mb-5 text-4xl transition-transform duration-300 group-hover:scale-110">{benefit.icon}</div>
                  <h3 className="mb-3 text-lg text-white font-sans-serif">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 bg-white sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Technical Data"
            title={product.specifications.title}
            subtitle="Comprehensive technical details of your testing solution"
          />

          {product.specifications.isTable ? (
            <div className="mt-12 overflow-x-auto sm:mt-16">
              <table className="w-full border-collapse border border-gray-400 bg-white text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white sticky top-0">
                    <th className="border border-gray-400 px-2 py-2 text-left font-bold min-w-32">
                      Specification
                    </th>
                    <th className="border border-gray-400 px-2 py-2 text-center font-bold min-w-12">
                      Unit
                    </th>
                    {product.specifications.models.map((model, idx) => (
                      <th
                        key={idx}
                        className="border border-gray-400 px-1 py-2 text-center font-bold text-xs bg-gray-800 min-w-20 whitespace-nowrap"
                      >
                        {model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.specs.map((category, categoryIdx) => (
                    <React.Fragment key={category.category}>
                      <tr className="bg-gray-900 text-white">
                        <td
                          colSpan={product.specifications.models.length + 2}
                          className="border border-gray-400 px-4 py-2 font-bold text-sm"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((item, itemIdx) => (
                        <tr
                          key={`${category.category}-${itemIdx}`}
                          className={itemIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <td className="border border-gray-400 px-2 py-2 font-bold text-gray-900 text-xs min-w-32 align-top">
                            {item.label}
                          </td>
                          <td className="border border-gray-400 px-2 py-2 text-center text-gray-600 text-xs font-semibold min-w-12 align-top">
                            {item.unit || ''}
                          </td>
                          {product.specifications.models.map((model, modelIdx) => {
                            const cellValue = item.values ? item.values[modelIdx] : '';
                            return (
                              <td
                                key={`${item.label}-${modelIdx}`}
                                className="border border-gray-400 px-1 py-2 text-center text-gray-800 font-medium hover:bg-blue-50 align-top min-w-20 break-words text-xs"
                              >
                                {cellValue || '—'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className="mt-8 space-y-3 text-xs text-gray-700 border-t border-gray-200 pt-6 max-w-4xl">
                <p>
                  <strong>(*)</strong> Upon customer request, customized sizes are also available.
                </p>
                <p>
                  <strong>(*)</strong> Low GWP refrigerants of R449a, R448a, and R508B are available upon
                  request.
                </p>
                <p>
                  <strong>(*)</strong> The performance data refer to an operating room (ambient) temperature
                  of +26°C, 415 V/50 Hz nominal voltage, without test specimen and without accessories.
                </p>
                <p>
                  <strong>(*)</strong> Sound Pressure Level: Using a calibrated instrument, the weighted
                  sound pressure level was measured in free-field environments at a height of 1 meter from
                  the floor and a distance of 1 meter from the equipment surface.
                </p>
              </div>
            </div>
          ) : null}

          {product.standards?.length > 0 && (
            <div className="pt-12 mt-12 border-t border-gray-100">
              <SectionHeader eyebrow="Compliance" title="Standards Supported" />
              <div className="grid gap-6 mt-10 md:grid-cols-2">
                {product.standards.map((standard, index) => (
                  <FadeIn key={standard.title} delay={index * 0.1} dir="up">
                    <div className="h-full p-6 transition-all border border-gray-100 bg-gray-50 rounded-xl hover:bg-slate-800 group">
                      <h3 className="mb-4 text-lg font-bold text-slate-900 group-hover:text-white">{standard.title}</h3>
                      <ul className="space-y-2">
                        {standard.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 group-hover:text-gray-300">
                            <span className="mt-1 font-bold text-cyan-500">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Controller System" title={product.controller.title} subtitle={product.controller.subtitle} dark />

          <div className="grid items-center gap-12 mt-12 lg:grid-cols-2 sm:mt-16">
            <FadeIn dir="left">
              <div className="relative overflow-hidden border rounded-lg shadow-2xl bg-slate-800/50 border-white/10">
                <img src={product.controller.image} alt="Touchscreen Controller" className="object-cover w-full h-72 sm:h-96" />
                <div className="absolute px-5 py-4 text-white border rounded-lg bottom-5 left-5 right-5 bg-slate-900/80 border-white/10 backdrop-blur">
                  <p className="text-lg font-bold">Intuitive Design</p>
                  <p className="text-sm text-gray-300">Easy to use interface</p>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-5">
              {product.controller.features.map((feature, index) => (
                <FadeIn key={feature.id} delay={index * 0.06} dir="right">
                  <div className="flex gap-4 p-4 transition-all border rounded-lg cursor-default group bg-slate-800/50 border-white/10 hover:bg-white/5 hover:border-cyan-500/50">
                    <div className="flex items-center justify-center flex-shrink-0 text-2xl text-white transition-transform rounded-lg shadow-lg w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 group-hover:rotate-6">
                      {feature.icon}
                    </div>
                    <div className="pt-1">
                      <h3 className="mb-1 text-lg font-bold text-white">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 bg-white sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="More Solutions"
            title="Related Products"
            subtitle="Explore our complete range of testing and conditioning solutions"
          />

          <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
            {product.relatedProducts.map((relatedProduct, index) => (
              <FadeIn key={relatedProduct.id} delay={index * 0.08} dir="up">
                <div className="h-full overflow-hidden transition-all border border-gray-100 rounded-lg bg-gray-50 hover:bg-slate-800 hover:border-cyan-500/50 group">
                  <div className="overflow-hidden bg-white h-44">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-white">
                      {relatedProduct.name}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-gray-600 group-hover:text-gray-300">
                      {relatedProduct.description}
                    </p>
                    <a href={relatedProduct.link} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-400">
                      Learn More
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default ProductDetail;
