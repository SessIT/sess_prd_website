import React from 'react';
import { Link } from 'react-router-dom';

const POPULAR = [
  { to: '/products', label: 'All Test Chambers' },
  { to: '/climatic-test-chamber', label: 'Climatic Test Chamber' },
  { to: '/thermal-shock-chamber', label: 'Thermal Shock Chamber' },
  { to: '/salt-spray-test-chamber', label: 'Salt Spray Test Chamber' },
  { to: '/services', label: 'Services & AMC' },
  { to: '/contact', label: 'Contact Us' },
];

// Catch-all route. SeoManager marks it noindex; the server returns HTTP 404.
const NotFound = () => (
  <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '70vh' }}>
    <section
      className="relative overflow-hidden py-16 text-center text-white"
      style={{ background: 'linear-gradient(135deg, #00b3b3 0%, #2a56a6 100%)' }}
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">Error 404</p>
      <h1 className="text-4xl font-bold tracking-tight" style={{ color: "#fff" }}>Page Not Found</h1>
      <p className="mx-auto mt-3 max-w-xl px-4 text-white/85">
        The page you are looking for has moved or no longer exists.
      </p>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14 text-center lg:px-8">
      <h2 className="mb-6 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Popular pages
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {POPULAR.map((p) => (
          <Link
            key={p.to}
            to={p.to}
            className="rounded-full border px-5 py-2 text-sm font-medium transition-colors hover:bg-cyan-600 hover:text-white"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            {p.label}
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default NotFound;
