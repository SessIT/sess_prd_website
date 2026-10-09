// Per-route SEO metadata. Keys are route paths (must match App.jsx routes).
// Used at runtime by SeoManager.jsx AND at build time by vite.config.js
// (prerenders a static <head> per route so crawlers/social apps see it
// without running JS) — keep this file free of browser-only imports.
//
// Title target: 50-60 chars. Description target: 140-160 chars.
// Keywords: 6-10 phrases people actually search, most important first.
const SITE = 'SESS';
const COMPANY = 'Sri Easwari Scientific Solution Pvt Ltd';
const BASE_URL = 'https://www.sess.co.in';
const DEFAULT_IMAGE = '/images/og/sess-default.jpg';

export { BASE_URL, COMPANY };

// Site-wide organisation details — used for JSON-LD structured data.
export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: COMPANY,
  alternateName: 'SESS',
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/images/sess_logo_png.png`,
  image: `${BASE_URL}${DEFAULT_IMAGE}`,
  description:
    'Manufacturer of environmental test chambers in Chennai, India — climatic, thermal shock, salt spray, battery, rain, dust, vibration and walk-in chambers.',
  foundingDate: '2010',
  email: 'sales@sess.co.in',
  telephone: '+91-94444-27748',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Door No 2/298, ANE Garden, Perumal Kovil Street, Srinivasapuram, Paraniputhur Post, Iyyappanthangal',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600122',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-94444-27748',
      contactType: 'sales',
      email: 'sales@sess.co.in',
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  ],
  sameAs: [
    'https://www.facebook.com/sesschennai',
    'https://www.instagram.com/sesschennai/',
    'https://www.youtube.com/@sesschennai',
    'https://x.com/sesschennai',
  ],
};

export const DEFAULT_SEO = {
  title: 'Environmental Test Chamber Manufacturer in India | SESS',
  description:
    'SESS, Chennai — manufacturer of environmental test chambers in India: climatic, thermal shock, salt spray, battery, rain, dust & walk-in chambers. Get a quote.',
  keywords:
    'environmental test chamber manufacturer, environmental test chamber India, climatic test chamber, temperature humidity chamber, thermal shock chamber, salt spray chamber, battery test chamber, test chamber manufacturer Chennai, SESS',
  image: DEFAULT_IMAGE,
};

// `product` marks product pages: adds a Products breadcrumb and a product share image.
// (No schema.org Product: without a price/offer Google Search Console flags it as invalid.)
const product = (name, slug) => ({ product: { name, image: `/images/og/${slug}.jpg` }, image: `/images/og/${slug}.jpg` });

export const SEO_CONFIG = {
  '/': { ...DEFAULT_SEO, name: 'Home' },
  '/about': {
    name: 'About Us',
    title: `About SESS | Test Chamber Manufacturer Since 2010`,
    description:
      'Sri Easwari Scientific Solution Pvt Ltd (SESS) has designed and built environmental test chambers in Chennai since 2010, serving 500+ clients across India.',
    keywords:
      'about SESS, Sri Easwari Scientific Solution, environmental test chamber company, test chamber manufacturer Chennai, testing equipment manufacturer India',
  },
  '/products': {
    name: 'Products',
    title: `Environmental Test Chambers – Full Product Range | ${SITE}`,
    description:
      'Explore SESS environmental test chambers: climatic, thermal shock, thermal cycling, salt spray, battery, rain, dust, vibration, walk-in and tabletop models.',
    keywords:
      'environmental test chambers, test chamber price India, climatic chamber, humidity chamber, thermal shock chamber, salt spray chamber, battery test chamber, walk-in chamber, dust test chamber, rain test chamber',
  },
  '/services': {
    name: 'Services',
    title: `Test Chamber Service, AMC & Calibration in India | ${SITE}`,
    description:
      'Installation, preventive maintenance, calibration, refurbishment and AMC for environmental test chambers — fast on-site support across India from SESS.',
    keywords:
      'test chamber service, environmental chamber AMC, chamber calibration, test chamber repair, chamber refurbishment, humidity chamber maintenance India',
  },
  '/gallery': {
    name: 'Gallery',
    title: `Gallery – Test Chamber Installations & Facility | ${SITE}`,
    description:
      'Photos of SESS environmental test chambers, client installations, manufacturing facility and turnkey testing laboratory projects delivered across India.',
    keywords:
      'test chamber photos, environmental chamber installation, SESS factory, testing laboratory projects, test chamber gallery',
  },
  '/career': {
    name: 'Careers',
    title: `Careers at SESS – Engineering Jobs in Chennai | ${SITE}`,
    description:
      'Join Sri Easwari Scientific Solution in Chennai. Openings in mechanical design, refrigeration, production, field service and PLC/LabVIEW automation.',
    keywords:
      'SESS careers, engineering jobs Chennai, refrigeration engineer jobs, service engineer jobs, PLC engineer jobs Chennai, test chamber company jobs',
  },
  '/news': {
    name: 'News & Blogs',
    title: `News & Blogs – Environmental Testing Insights | ${SITE}`,
    description:
      'News, articles and insights from SESS on environmental testing, test chamber technology, IEC/ISO testing standards, exhibitions and company updates.',
    keywords:
      'environmental testing blog, test chamber news, environmental testing standards, climatic testing articles, SESS news',
  },
  '/contact': {
    name: 'Contact Us',
    title: `Contact SESS Chennai – Test Chamber Quote & Support`,
    description:
      'Contact Sri Easwari Scientific Solution, Chennai, for test chamber quotes, service and support. Call +91 94444 27748 or email sales@sess.co.in.',
    keywords:
      'contact SESS, test chamber quote, environmental chamber enquiry, test chamber supplier Chennai, SESS phone number, SESS address',
  },
  '/brochure': {
    name: 'Brochure',
    title: `Company Profile & Product Brochure | ${SITE}`,
    description:
      'View the SESS company profile and product brochure online — specifications for our full range of environmental test chambers and testing solutions.',
    keywords:
      'SESS brochure, test chamber brochure, environmental test chamber catalogue, company profile, test chamber specifications PDF',
  },
  '/design': {
    name: 'Design Team',
    title: `Custom Test Chamber Design & Engineering | ${SITE}`,
    description:
      'SESS design team engineers custom environmental test chambers — 3D CAD, refrigeration and airflow design, control panels and special-purpose test rigs.',
    keywords:
      'custom test chamber design, special purpose test chamber, chamber engineering, refrigeration system design, test rig design India',
  },
  '/labview-plc': {
    name: 'LabVIEW & PLC',
    title: `LabVIEW & PLC Automation, Data Acquisition | ${SITE}`,
    description:
      'Custom LabVIEW and PLC automation from SESS — test-bench control, data acquisition (DAQ), SCADA/HMI and test chamber integration for industry and labs.',
    keywords:
      'LabVIEW programming, PLC automation, data acquisition system, test bench automation, SCADA HMI development, LabVIEW developer Chennai',
  },
  '/it': {
    name: 'IT Solutions',
    title: `IT & Software Solutions for Labs and Industry | ${SITE}`,
    description:
      'SESS IT team builds test data management, reporting dashboards, web apps and custom software for testing laboratories and manufacturing companies.',
    keywords:
      'IT solutions Chennai, test data management software, laboratory software, custom software development, web application development',
  },
  '/climatic-test-chamber': {
    name: 'Climatic Test Chamber',
    title: `Climatic Test Chamber (Temperature & Humidity) | ${SITE}`,
    description:
      'Climatic test chambers for temperature and humidity testing to IEC 60068-2-1/-2/-30/-78. Precise control, PLC/HMI, data logging and custom sizes.',
    keywords:
      'climatic test chamber, temperature humidity chamber, humidity test chamber, environmental chamber, IEC 60068-2-78 damp heat, climatic chamber manufacturer India',
    ...product('Climatic Test Chamber', 'climatic-test-chamber'),
  },
  '/battery-test-chamber': {
    name: 'Battery Test Chamber',
    title: `Battery Test Chamber for EV & Li-ion Cells | ${SITE}`,
    description:
      'Battery test chambers for EV and lithium-ion cells, modules and packs — temperature cycling with safety-focused construction and custom configurations.',
    keywords:
      'battery test chamber, EV battery testing chamber, lithium ion battery test chamber, battery thermal chamber, battery safety chamber, battery environmental chamber India',
    ...product('Battery Test Chamber', 'battery-test-chamber'),
  },
  '/salt-spray-test-chamber': {
    name: 'Salt Spray Test Chamber',
    title: `Salt Spray Test Chamber – Corrosion Testing | ${SITE}`,
    description:
      'Salt spray (fog) test chambers for corrosion testing to ISO 9227 and IS 9000. Corrosion-proof build, precise fog control and custom chamber sizes.',
    keywords:
      'salt spray test chamber, salt fog chamber, corrosion test chamber, ISO 9227 salt spray, neutral salt spray test, salt spray chamber manufacturer India',
    ...product('Salt Spray Test Chamber', 'salt-spray-test-chamber'),
  },
  '/rain-test-chamber': {
    name: 'Rain Test Chamber',
    title: `Rain Test Chamber – IPX1 to IPX9K Testing | ${SITE}`,
    description:
      'Rain test chambers for IPX1–IPX9K water ingress testing of enclosures, automotive parts and electronics as per IEC 60529 and ISO 20653.',
    keywords:
      'rain test chamber, IP testing chamber, water ingress test, IPX4 test chamber, IPX9K test, IEC 60529 water test, ingress protection testing India',
    ...product('Rain Test Chamber', 'rain-test-chamber'),
  },
  '/vibration-test-chamber': {
    name: 'Vibration Test Chamber',
    title: `Vibration Combined Climatic Test Chamber | ${SITE}`,
    description:
      'Combined vibration and climatic test chambers (AGREE) for automotive, electronics and defence testing to IEC 60068-2-6/-64 and MIL-STD-810.',
    keywords:
      'vibration test chamber, combined environment chamber, AGREE chamber, vibration climatic chamber, vibration shaker chamber, IEC 60068-2-64 testing',
    ...product('Vibration Combined Climatic Chamber', 'vibration-test-chamber'),
  },
  '/thermal-cyclic-chamber': {
    name: 'Thermal Cyclic Chamber',
    title: `Thermal Cycling Chamber – Rapid Temperature Test | ${SITE}`,
    description:
      'Thermal cycling chambers for rapid temperature change testing and stress screening of electronics to IEC 60068-2-14, with programmable profiles.',
    keywords:
      'thermal cycling chamber, thermal cyclic chamber, rapid temperature change chamber, temperature cycling test, ESS chamber, IEC 60068-2-14',
    ...product('Thermal Cyclic Chamber', 'thermal-cyclic-chamber'),
  },
  '/thermal-shock-chamber': {
    name: 'Thermal Shock Chamber',
    title: `Thermal Shock Test Chamber – Two-Zone | ${SITE}`,
    description:
      'Two-zone thermal shock test chambers for rapid hot-to-cold transfer testing of electronic components and assemblies, with fast recovery times.',
    keywords:
      'thermal shock chamber, thermal shock test chamber, two zone thermal shock, hot cold shock test, temperature shock chamber, thermal shock chamber manufacturer India',
    ...product('Thermal Shock Chamber', 'thermal-shock-chamber'),
  },
  '/flame-proof-hot-air-oven': {
    name: 'Flame Proof Hot Air Oven',
    title: `Flame Proof Hot Air Oven Manufacturer | ${SITE}`,
    description:
      'Flame proof hot air ovens for safe drying, curing and heating in hazardous areas — flameproof construction with precise, uniform temperature control.',
    keywords:
      'flame proof hot air oven, flameproof oven, explosion proof oven, industrial hot air oven, hazardous area oven, hot air oven manufacturer Chennai',
    ...product('Flame Proof Hot Air Oven', 'flame-proof-hot-air-oven'),
  },
  '/tabletop-test-chamber': {
    name: 'Tabletop Test Chamber',
    title: `Tabletop (Benchtop) Climatic Test Chamber | ${SITE}`,
    description:
      'Compact tabletop climatic test chambers for temperature and humidity testing in labs with limited space — benchtop size, full-size performance.',
    keywords:
      'tabletop test chamber, benchtop environmental chamber, compact humidity chamber, small climatic chamber, bench top temperature chamber',
    ...product('Tabletop Climatic Test Chamber', 'tabletop-test-chamber'),
  },
  '/walk-in-chamber': {
    name: 'Walk-In Chamber',
    title: `Walk-In Environmental Test Chamber | ${SITE}`,
    description:
      'Walk-in environmental chambers for large products and vehicles — custom room-size temperature and humidity test chambers built to your specification.',
    keywords:
      'walk-in chamber, walk in environmental chamber, walk-in humidity chamber, drive-in test chamber, large climatic chamber, walk-in test room India',
    ...product('Walk-In Chamber', 'walk-in-chamber'),
  },
  '/dust-chamber': {
    name: 'Dust Test Chamber',
    title: `Dust Test Chamber – IP5X / IP6X Testing | ${SITE}`,
    description:
      'Dust test chambers for IP5X/IP6X and IP5K/IP6K dust ingress testing of enclosures and automotive parts as per IEC 60529 and ISO 20653.',
    keywords:
      'dust test chamber, dust chamber, IP5X dust test, IP6X test chamber, sand and dust chamber, IEC 60529 dust test, ISO 20653 dust test',
    ...product('Dust Test Chamber', 'dust-chamber'),
  },
  '/tensile-chamber': {
    name: 'Tensile Test Chamber',
    title: `Tensile Test Chamber for UTM – Temp Testing | ${SITE}`,
    description:
      'Environmental tensile test chambers that fit universal testing machines (UTM) for material testing at controlled high and low temperatures.',
    keywords:
      'tensile test chamber, UTM environmental chamber, UTM temperature chamber, high low temperature tensile testing, material testing chamber',
    ...product('Tensile Test Chamber', 'tensile-chamber'),
  },
  '/sitemap': {
    name: 'Sitemap',
    title: `Sitemap | ${SITE}`,
    description: 'Browse all pages of the SESS website — environmental test chamber products, services, company information and resources.',
    keywords: 'SESS sitemap, environmental test chambers, test chamber products',
  },
  '/privacy-policy': {
    name: 'Privacy Policy',
    title: `Privacy Policy | ${SITE}`,
    description: 'Read how Sri Easwari Scientific Solution Pvt Ltd collects, uses and protects the personal information you share with us.',
    keywords: 'SESS privacy policy',
  },
  '/terms-and-conditions': {
    name: 'Terms & Conditions',
    title: `Terms & Conditions | ${SITE}`,
    description: 'Terms and conditions for using the Sri Easwari Scientific Solution Pvt Ltd website, products and services.',
    keywords: 'SESS terms and conditions',
  },
};

export const NOT_FOUND_SEO = {
  title: `Page Not Found | ${SITE}`,
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
  noindex: true,
};

// Full SEO record for a path: merges defaults, resolves absolute URLs and
// builds the JSON-LD graph. Shared by the runtime manager and the build step.
export function resolveSeo(pathname) {
  const known = SEO_CONFIG[pathname];
  const seo = { ...DEFAULT_SEO, ...(known || NOT_FOUND_SEO) };
  const url = BASE_URL + (pathname === '/' ? '/' : pathname);
  const image = BASE_URL + (seo.image || DEFAULT_IMAGE);

  const graph = [ORGANIZATION];
  if (pathname === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: COMPANY,
      publisher: { '@id': ORGANIZATION['@id'] },
    });
  }
  if (known && pathname !== '/') {
    const crumbs = [{ name: 'Home', url: `${BASE_URL}/` }];
    if (seo.product) crumbs.push({ name: 'Products', url: `${BASE_URL}/products` });
    crumbs.push({ name: seo.name, url });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    });
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph.map((node) => {
      const n = { ...node };
      delete n['@context'];
      return n;
    }),
  };

  return { ...seo, url, image, noindex: !!seo.noindex, jsonLd };
}
