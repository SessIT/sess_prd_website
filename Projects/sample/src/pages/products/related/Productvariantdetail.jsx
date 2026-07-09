// ─────────────────────────────────────────────────────────────
// src/pages/products/ProductVariantDetail.jsx
// ONE page for all 12 products. Design is identical everywhere;
// only the data changes (fed from productVariantsData.js by id).
// Route: /<category>/:id   → category comes in as a prop.
// ─────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import productVariantsData from './Productvariantsdata';

/* Shared fade-in (same pattern as the category pages) */
function FadeIn({ children, delay = 0, dir = 'up' }) {
  const offset = dir === 'up' ? { y: 24 } : dir === 'left' ? { x: -24 } : { x: 24 };
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProductVariantDetail({ category }) {
  const { id } = useParams();

  // Scroll to top whenever the user jumps between variants
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [category, id]);

  const categoryData = productVariantsData[category];
  const variant = categoryData?.variants?.[id];

  /* ── Guard: wrong id in URL ── */
  if (!categoryData || !variant) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="text-slate-500">The product you're looking for doesn't exist or has moved.</p>
        <Link
          to={categoryData?.categoryLink || '/products'}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  // The other 3 variants in this category (for the bottom section)
  const otherVariants = Object.values(categoryData.variants).filter(
    (v) => String(v.id) !== String(id)
  );

  return (
    <main className="bg-white">
      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="px-5 pt-28 pb-16 sm:px-6 lg:px-8 sm:pt-32 sm:pb-20"
        style={{
          background:
            'linear-gradient(135deg, rgb(34, 229, 245, 0.95) 0%, rgb(59, 91, 255, 0.95) 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <FadeIn>
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/80">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to={categoryData.categoryLink} className="hover:text-white transition-colors">
                {categoryData.categoryTitle}
              </Link>
              <ChevronRight size={14} />
              <span className="font-semibold text-white">{variant.name}</span>
            </nav>
          </FadeIn>

          <div className="grid items-center gap-10 md:grid-cols-2">
            <FadeIn delay={0.08}>
              <div>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {variant.name}
                </h1>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                  {variant.tagline}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-100 transition-colors"
                >
                  Request Quote
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.16} dir="right">
              <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
                <img
                  src={variant.image}
                  alt={variant.name}
                  className="mx-auto h-64 w-full object-contain sm:h-80"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────── */}
      <section className="px-5 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-cyan-600">
              Overview
            </span>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {variant.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SPECIFICATIONS ───────────────────────── */}
      <section className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
              Technical Specifications
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              {variant.specifications.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-2 sm:gap-4 sm:px-8 ${
                    i !== variant.specifications.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-500">{spec.label}</span>
                  <span className="text-sm font-bold text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section className="px-5 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">Key Features</h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {variant.features.map((feature, i) => (
              <FadeIn key={feature} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-cyan-500/40 transition-colors">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-cyan-600" />
                  <span className="text-sm leading-relaxed text-slate-700">{feature}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ─────────────────────────── */}
      {variant.applications?.length > 0 && (
        <section className="px-5 pb-16 sm:px-6 lg:px-8 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Applications</h2>
              <div className="flex flex-wrap gap-3">
                {variant.applications.map((app) => (
                  <span
                    key={app}
                    className="rounded-full border border-cyan-500/30 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── OTHER MODELS IN THIS RANGE ───────────── */}
      <section className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
              Other Models in This Range
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherVariants.map((rp, i) => (
              <FadeIn key={rp.id} delay={i * 0.07}>
                <div className="group h-full overflow-hidden rounded-2xl border border-slate-100 bg-white hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden bg-white p-6">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-white transition-colors">
                      {rp.name}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-500 group-hover:text-slate-300 transition-colors">
                      {rp.tagline}
                    </p>
                    <Link
                      to={`${categoryData.categoryLink}/${rp.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-400 transition-colors"
                    >
                      Learn More
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 duration-200" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                to={categoryData.categoryLink}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors"
              >
                <ArrowLeft size={16} /> Back to {categoryData.categoryTitle}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}