// Per-route SEO metadata. Keys are route paths (must match App.jsx routes).
// Title target: under 60 chars. Description target: 150-160 chars.
const SITE = 'SESS';
const BASE_URL = 'https://www.sess.co.in';

export { BASE_URL };

export const DEFAULT_SEO = {
  title: 'Environmental Test Chambers Manufacturer in India | Sri Easwari Scientific Solution Pvt Ltd',
  description:
    'Sri Easwari Scientific Solution Pvt Ltd is a leading manufacturer of Environmental Test Chambers in India including Climatic Test Chambers, Thermal Shock Chambers, Salt Spray Chambers, Vibration Chambers, and Customized HVAC & Industrial Automation Solutions.',
};

export const SEO_CONFIG = {
  '/': DEFAULT_SEO,
  '/about': {
    title: `About Us | Environmental Test Chamber Experts | ${SITE}`,
    description:
      'Learn about Sri Easwari Scientific Solution Pvt Ltd — ISO & CE certified manufacturer of environmental test chambers since 2010, serving 500+ clients across India and worldwide.',
  },
  '/products': {
    title: `Environmental Test Chambers & Products | ${SITE}`,
    description:
      'Explore our full range of environmental test chambers: climatic, thermal shock, salt spray, vibration, battery, dust, rain and walk-in chambers — built and customized in India.',
  },
  '/services': {
    title: `Testing Chamber Services, AMC & Calibration | ${SITE}`,
    description:
      'Installation, maintenance, calibration, refurbishment and AMC services for environmental test chambers by SESS — fast support for all makes across India.',
  },
  '/gallery': {
    title: `Gallery | Test Chamber Projects & Facility | ${SITE}`,
    description:
      'View photos of SESS manufacturing facilities, delivered environmental test chambers, client installations and turnkey testing laboratory projects across India.',
  },
  '/career': {
    title: `Careers | Join Our Engineering Team | ${SITE}`,
    description:
      'Build your career with Sri Easwari Scientific Solution Pvt Ltd. Openings in design, production, service and automation engineering for environmental test systems.',
  },
  '/news': {
    title: `News & Blogs | Environmental Testing Insights | ${SITE}`,
    description:
      'Latest news, articles and insights from SESS on environmental testing, test chamber technology, industry standards and company updates.',
  },
  '/contact': {
    title: `Contact Us | Get a Quote | ${SITE}`,
    description:
      'Contact Sri Easwari Scientific Solution Pvt Ltd in Chennai for environmental test chamber enquiries, quotes and support. Call +91 94444 27748 or send us a message.',
  },
  '/brochure': {
    title: `Product Brochure | ${SITE}`,
    description:
      'Browse and download the SESS product brochure covering our complete range of environmental test chambers and testing solutions.',
  },
  '/design': {
    title: `Design & Engineering Team | ${SITE}`,
    description:
      'Meet the SESS design and engineering team — experts in custom environmental test chamber design, HVAC systems and control panel engineering.',
  },
  '/labview-plc': {
    title: `LabVIEW & PLC Automation Solutions | ${SITE}`,
    description:
      'Custom LabVIEW and PLC based automation, data acquisition and control systems for test chambers and industrial applications by SESS.',
  },
  '/it': {
    title: `IT & Software Solutions | ${SITE}`,
    description:
      'Software and IT solutions from SESS — test data management, reporting systems and custom applications for testing laboratories and industry.',
  },
  '/climatic-test-chamber': {
    title: `Climatic Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'SESS manufactures climatic test chambers for temperature and humidity testing with precise control, wide ranges and custom sizes. Get a quote today.',
  },
  '/battery-test-chamber': {
    title: `Battery Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'Battery test chambers by SESS for safe testing of EV and lithium-ion batteries — temperature cycling, explosion-safe construction and custom configurations.',
  },
  '/salt-spray-test-chamber': {
    title: `Salt Spray Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'Salt spray (fog) test chambers by SESS for corrosion resistance testing per ASTM B117 and IS standards. Durable build, precise control and custom sizes.',
  },
  '/rain-test-chamber': {
    title: `Rain Test Chamber (IP Testing) Manufacturer | ${SITE}`,
    description:
      'Rain test chambers by SESS for IPX1-IPX9 water ingress testing of enclosures, automotive parts and electronics as per IS/IEC 60529 standards.',
  },
  '/vibration-test-chamber': {
    title: `Vibration Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'Vibration test systems and combined environment chambers by SESS for automotive, electronics and defence component testing with custom fixtures.',
  },
  '/thermal-cyclic-chamber': {
    title: `Thermal Cyclic Chamber Manufacturer in India | ${SITE}`,
    description:
      'Thermal cycling chambers by SESS for rapid temperature cycling and stress screening of electronics and components with programmable profiles.',
  },
  '/thermal-shock-chamber': {
    title: `Thermal Shock Chamber Manufacturer in India | ${SITE}`,
    description:
      'Two-zone and three-zone thermal shock chambers by SESS for rapid hot-cold transfer testing of components per MIL and JEDEC standards.',
  },
  '/flame-proof-hot-air-oven': {
    title: `Flame Proof Hot Air Oven Manufacturer | ${SITE}`,
    description:
      'Flame proof hot air ovens by SESS for safe drying and heating in hazardous areas — flameproof construction with precise temperature control.',
  },
  '/tabletop-test-chamber': {
    title: `Tabletop Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'Compact tabletop environmental test chambers by SESS — bench-top temperature and humidity testing for labs with limited space.',
  },
  '/walk-in-chamber': {
    title: `Walk-In Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'Walk-in environmental chambers by SESS for large product testing — custom room-size temperature and humidity chambers built to your specification.',
  },
  '/dust-chamber': {
    title: `Dust Test Chamber (IP5X/IP6X) Manufacturer | ${SITE}`,
    description:
      'Dust test chambers by SESS for IP5X and IP6X dust ingress testing of enclosures and components as per IS/IEC 60529 standards.',
  },
  '/tensile-chamber': {
    title: `Tensile Test Chamber Manufacturer in India | ${SITE}`,
    description:
      'Environmental tensile test chambers by SESS for material testing under controlled temperature — integrates with UTM machines.',
  },
  '/sitemap': {
    title: `Sitemap | ${SITE}`,
    description: 'Browse all pages of the SESS website — products, services, company information and resources.',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${SITE}`,
    description: 'Read how Sri Easwari Scientific Solution Pvt Ltd collects, uses and protects your personal information.',
  },
  '/terms-and-conditions': {
    title: `Terms & Conditions | ${SITE}`,
    description: 'Terms and conditions for using the Sri Easwari Scientific Solution Pvt Ltd website and services.',
  },
};
