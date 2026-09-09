// Product-specific brochure registry.
//
// Products with their own PDF point at a file in `public/brochures/` (served
// as a static asset, never bundled). Products that don't have a dedicated
// brochure yet are mapped to the company profile — pass `null` as the file.
// To add one later: drop the PDF in public/brochures/ and replace the null.
// Any route not listed here (home, about, contact…) also gets the company profile.
//
// Keys are the product route paths from App.jsx.

import companyProfilePdf from '../assets/Website_Gallery_img/Profile_SESS.pdf';

export const COMPANY_BROCHURE = {
  key: 'company',
  product: 'Company Brochure',
  title: 'Company Brochure',
  subtitle: 'SESS profile, products & capabilities — PDF',
  file: companyProfilePdf,
};

const BROCHURE_BASE = '/brochures';

const define = (path, product, file, subtitle) => [
  path,
  file === null ? COMPANY_BROCHURE : {
    key: path.replace(/^\//, ''),
    product,
    title: `${product} Brochure`,
    subtitle: subtitle || `${product} specifications, features & options — PDF`,
    file: `${BROCHURE_BASE}/${file}`,
  },
];

export const PRODUCT_BROCHURES = Object.fromEntries([
  // ── Dedicated brochures ───────────────────────────────────────────────
  define('/climatic-test-chamber',      'Climatic Test Chamber',               'climatic-test-chamber.pdf'),     // Climatic / Thermal Cyclic — PLC variant
  define('/thermal-cyclic-chamber',     'Thermal Cyclic Chamber',              'thermal-cyclic-chamber.pdf'),    // Climatic / Thermal Cyclic — controller variant
  define('/vibration-test-chamber',     'Vibration Combined Climatic Chamber', 'vibration-test-chamber.pdf'),
  define('/battery-test-chamber',       'Battery Test Chamber',                'battery-test-chamber.pdf'),
  define('/flame-proof-hot-air-oven',   'Flame-Proof Hot Air Oven',            'flame-proof-hot-air-oven.pdf'),
  define('/thermal-shock-chamber',      'Thermal Shock Chamber',               'thermal-shock-chamber.pdf'),
  define('/walk-in-chamber',            'Walk-in Chamber',                     'walk-in-chamber.pdf'),

  // ── No dedicated brochure yet → company profile ───────────────────────
  define('/salt-spray-test-chamber',    'Salt Spray Test Chamber',             null),
  define('/rain-test-chamber',          'Rain Test Chamber',                   null),
  define('/tabletop-test-chamber',      'Tabletop Climatic Test Chamber',      null),
  define('/dust-chamber',               'Dust Chamber',                        null),
  define('/tensile-chamber',            'Tensile Test Chamber',                null),
]);

/** Brochure for the current route; company brochure for non-product routes. */
export function getBrochureForPath(pathname = '') {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PRODUCT_BROCHURES[clean] || COMPANY_BROCHURE;
}

/** Brochure by product name (as shown in the hero), e.g. from openBrochure('Walk-in Chamber'). */
export function getBrochureForProduct(productName = '') {
  const needle = productName.trim().toLowerCase();
  if (!needle) return null;
  return Object.values(PRODUCT_BROCHURES).find(b => b.product.toLowerCase() === needle) || null;
}
