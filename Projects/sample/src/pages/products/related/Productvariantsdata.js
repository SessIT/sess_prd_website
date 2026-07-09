// ─────────────────────────────────────────────────────────────
// src/data/productVariantsData.js
// SINGLE SOURCE OF TRUTH for all product detail pages.
// URL pattern:  /<category>/<id>   e.g. /climatic-test-chamber/1
// To add/edit a product → edit ONLY this file. Design stays same.
// ─────────────────────────────────────────────────────────────

// Product Images (adjust paths/files as per your assets folder)
import prd1 from '../../../assets/product/Climatic Test Chamber.png';
import prd2 from '../../../assets/product/Battery.png';
import prd3 from '../../../assets/product/CO2 Test Chamber.png';
import prd4 from '../../../assets/product/controller.jpeg';

const productVariantsData = {
  // ══════════════════════════════════════════════
  // 1. CLIMATIC TEST CHAMBER →  /climatic-test-chamber/:id
  // ══════════════════════════════════════════════
  'climatic-test-chamber': {
    categoryTitle: 'Climatic Test Chamber',
    categoryLink: '/climatic-test-chamber',
    variants: {
      1: {
        id: 1,
        name: '450L Climatic Test Chamber',
        tagline: 'Mid-capacity chamber for standard product and component testing',
        image: prd1,
        description:
          'The 450L Climatic Test Chamber is built for standard product and component testing with precise temperature and humidity simulation. Its balanced footprint makes it ideal for R&D labs and quality departments that need reliable, repeatable results without occupying large floor space.',
        specifications: [
          { label: 'Internal Volume', value: '450 Litres' },
          { label: 'Temperature Range', value: '-40°C to +180°C' },
          { label: 'Humidity Range', value: '10% to 98% RH' },
          { label: 'Temperature Accuracy', value: '±0.5°C' },
          { label: 'Humidity Accuracy', value: '±2% RH' },
          { label: 'Internal Dimensions (W×D×H)', value: '750 × 750 × 800 mm' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Programmable touch-screen controller with data logging',
          'SS 304 interior with rounded corners for easy cleaning',
          'Cable port for live testing of powered devices',
          'Over-temperature and refrigeration safety protection',
          'TCP/IP remote monitoring support',
          'Complies with IEC 60068-2 test standards',
        ],
        applications: ['Electronics', 'Automotive Components', 'Pharma Stability', 'Material Research'],
      },
      2: {
        id: 2,
        name: '600L Climatic Test Chamber',
        tagline: 'Larger test space for bigger assemblies and multi-unit batches',
        image: prd2,
        description:
          'The 600L Climatic Test Chamber offers extra internal volume for testing bigger assemblies or multiple units in a single batch. Enhanced airflow design ensures uniform temperature and humidity distribution across the entire workspace.',
        specifications: [
          { label: 'Internal Volume', value: '600 Litres' },
          { label: 'Temperature Range', value: '-40°C to +180°C' },
          { label: 'Humidity Range', value: '10% to 98% RH' },
          { label: 'Temperature Accuracy', value: '±0.5°C' },
          { label: 'Humidity Accuracy', value: '±2% RH' },
          { label: 'Internal Dimensions (W×D×H)', value: '850 × 800 × 900 mm' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Uniform airflow for multi-unit batch testing',
          'Programmable multi-segment test profiles',
          'Viewing window with internal illumination',
          'USB data export for compliance reporting',
          'Audible and visual alarm system',
          'Low-noise refrigeration system',
        ],
        applications: ['Batch Testing', 'Consumer Appliances', 'Defence Components', 'Battery Testing'],
      },
      3: {
        id: 3,
        name: '1000L Climatic Test Chamber',
        tagline: 'High-capacity chamber built for industrial-scale testing',
        image: prd3,
        description:
          'The 1000L Climatic Test Chamber is engineered for industrial-scale environmental testing. Heavy-duty construction, powerful refrigeration, and a wide test space make it suitable for large components and sub-assemblies under demanding test cycles.',
        specifications: [
          { label: 'Internal Volume', value: '1000 Litres' },
          { label: 'Temperature Range', value: '-70°C to +180°C' },
          { label: 'Humidity Range', value: '10% to 98% RH' },
          { label: 'Temperature Accuracy', value: '±0.5°C' },
          { label: 'Humidity Accuracy', value: '±2% RH' },
          { label: 'Internal Dimensions (W×D×H)', value: '1000 × 1000 × 1000 mm' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Cascade refrigeration for deep low temperatures',
          'Heavy-duty reinforced shelving',
          'Rapid temperature change rate options',
          'Remote monitoring via TCP/IP',
          'Multi-level safety interlocks',
          'Industrial-grade insulation for efficiency',
        ],
        applications: ['Industrial Equipment', 'Automotive Assemblies', 'Aerospace', 'Telecom Hardware'],
      },
      4: {
        id: 4,
        name: '1500L Climatic Test Chamber',
        tagline: 'Our largest capacity, for full-scale product and bulk testing',
        image: prd4,
        description:
          'The 1500L Climatic Test Chamber is our largest standard model, designed for full-scale products and bulk testing. Walk-up access, wide door opening, and robust environmental control make it the choice for high-volume industrial validation.',
        specifications: [
          { label: 'Internal Volume', value: '1500 Litres' },
          { label: 'Temperature Range', value: '-70°C to +180°C' },
          { label: 'Humidity Range', value: '10% to 98% RH' },
          { label: 'Temperature Accuracy', value: '±0.5°C' },
          { label: 'Humidity Accuracy', value: '±2% RH' },
          { label: 'Internal Dimensions (W×D×H)', value: '1150 × 1150 × 1150 mm' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Wide-opening door for large product loading',
          'High-uniformity airflow across full volume',
          'Extended continuous-run reliability',
          'Custom rack and fixture options',
          'Advanced alarm and safety systems',
          'Energy-optimised refrigeration design',
        ],
        applications: ['Full-Scale Products', 'Bulk Validation', 'Heavy Engineering', 'EV Components'],
      },
    },
  },

  // ══════════════════════════════════════════════
  // 2. SALT SPRAY TEST CHAMBER →  /salt-spray-test-chamber/:id
  //    ⚠️ EDIT: replace sample specs with your real data
  // ══════════════════════════════════════════════
  'salt-spray-test-chamber': {
    categoryTitle: 'Salt Spray Test Chamber',
    categoryLink: '/salt-spray-test-chamber',
    variants: {
      1: {
        id: 1,
        name: '32,000L Packaging Simulation Chamber',
        tagline: 'Large-scale chamber for packaging testing and simulation',
        image: prd1,
        description:
          'A large-scale simulation chamber engineered for packaging testing under controlled environmental conditions, supporting bulk loads and long-duration test cycles.',
        specifications: [
          { label: 'Internal Volume', value: '32,000 Litres' },
          { label: 'Temperature Range', value: '+5°C to +60°C' },
          { label: 'Humidity Range', value: '30% to 95% RH' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Walk-in construction for bulk packaging loads',
          'Uniform environmental distribution',
          'Programmable long-duration test cycles',
          'Remote monitoring support',
        ],
        applications: ['Packaging Validation', 'Logistics Simulation', 'FMCG', 'Export Compliance'],
      },
      2: {
        id: 2,
        name: '4500L Conditioning Chamber for Food Process',
        tagline: 'Specialized chamber for food industry testing and conditioning',
        image: prd2,
        description:
          'Purpose-built conditioning chamber for the food industry, delivering hygienic construction and precise environmental control for process validation.',
        specifications: [
          { label: 'Internal Volume', value: '4500 Litres' },
          { label: 'Temperature Range', value: '+5°C to +60°C' },
          { label: 'Humidity Range', value: '30% to 95% RH' },
          { label: 'Interior', value: 'Food-grade SS 304' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Food-grade stainless steel interior',
          'Easy-clean rounded-corner design',
          'Precise humidity conditioning',
          'Data logging for audit compliance',
        ],
        applications: ['Food Processing', 'Shelf-Life Study', 'Dairy', 'Bakery & Confectionery'],
      },
      3: {
        id: 3,
        name: '2340L Television Testing Climatic Chamber',
        tagline: 'Optimized for electronics and television product testing',
        image: prd3,
        description:
          'A climatic chamber optimised for televisions and large electronics, with live-power test ports and glare-free observation for on-screen verification during cycles.',
        specifications: [
          { label: 'Internal Volume', value: '2340 Litres' },
          { label: 'Temperature Range', value: '-40°C to +150°C' },
          { label: 'Humidity Range', value: '10% to 98% RH' },
          { label: 'Cable Ports', value: 'Multiple live-test ports' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Live-power testing ports for running devices',
          'Large viewing window for on-screen checks',
          'Anti-condensation window heating',
          'Programmable test profiles',
        ],
        applications: ['Televisions', 'Displays', 'Consumer Electronics', 'Set-Top Devices'],
      },
      4: {
        id: 4,
        name: 'High-Temperature N2 Purging Test Chamber',
        tagline: 'Advanced nitrogen purging system for extreme temperature testing',
        image: prd4,
        description:
          'An advanced chamber with nitrogen purging for oxidation-free, extreme high-temperature testing of sensitive components and materials.',
        specifications: [
          { label: 'Temperature Range', value: 'Ambient to +300°C' },
          { label: 'Purging Medium', value: 'Nitrogen (N2)' },
          { label: 'Oxygen Level Control', value: '< 100 ppm' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Automated N2 purging and O2 monitoring',
          'Oxidation-free high-temperature environment',
          'High-precision temperature uniformity',
          'Safety interlocks for gas handling',
        ],
        applications: ['Semiconductors', 'Metallurgy', 'Aerospace Materials', 'Specialty Coatings'],
      },
    },
  },

  // ══════════════════════════════════════════════
  // 3. RAIN TEST CHAMBER →  /rain-test-chamber/:id
  //    ⚠️ EDIT: replace sample specs with your real data
  // ══════════════════════════════════════════════
  'rain-test-chamber': {
    categoryTitle: 'Rain Test Chamber',
    categoryLink: '/rain-test-chamber',
    variants: {
      1: {
        id: 1,
        name: '32,000L Packaging Simulation Chamber',
        tagline: 'Large-scale chamber for packaging testing and simulation',
        image: prd1,
        description:
          'A large-scale simulation chamber engineered for packaging testing under controlled environmental conditions, supporting bulk loads and long-duration test cycles.',
        specifications: [
          { label: 'Internal Volume', value: '32,000 Litres' },
          { label: 'Temperature Range', value: '+5°C to +60°C' },
          { label: 'Humidity Range', value: '30% to 95% RH' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Walk-in construction for bulk packaging loads',
          'Uniform environmental distribution',
          'Programmable long-duration test cycles',
          'Remote monitoring support',
        ],
        applications: ['Packaging Validation', 'Logistics Simulation', 'FMCG', 'Export Compliance'],
      },
      2: {
        id: 2,
        name: '4500L Conditioning Chamber for Food Process',
        tagline: 'Specialized chamber for food industry testing and conditioning',
        image: prd2,
        description:
          'Purpose-built conditioning chamber for the food industry, delivering hygienic construction and precise environmental control for process validation.',
        specifications: [
          { label: 'Internal Volume', value: '4500 Litres' },
          { label: 'Temperature Range', value: '+5°C to +60°C' },
          { label: 'Humidity Range', value: '30% to 95% RH' },
          { label: 'Interior', value: 'Food-grade SS 304' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Food-grade stainless steel interior',
          'Easy-clean rounded-corner design',
          'Precise humidity conditioning',
          'Data logging for audit compliance',
        ],
        applications: ['Food Processing', 'Shelf-Life Study', 'Dairy', 'Bakery & Confectionery'],
      },
      3: {
        id: 3,
        name: '2340L Television Testing Climatic Chamber',
        tagline: 'Optimized for electronics and television product testing',
        image: prd3,
        description:
          'A climatic chamber optimised for televisions and large electronics, with live-power test ports and glare-free observation for on-screen verification during cycles.',
        specifications: [
          { label: 'Internal Volume', value: '2340 Litres' },
          { label: 'Temperature Range', value: '-40°C to +150°C' },
          { label: 'Humidity Range', value: '10% to 98% RH' },
          { label: 'Cable Ports', value: 'Multiple live-test ports' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Live-power testing ports for running devices',
          'Large viewing window for on-screen checks',
          'Anti-condensation window heating',
          'Programmable test profiles',
        ],
        applications: ['Televisions', 'Displays', 'Consumer Electronics', 'Set-Top Devices'],
      },
      4: {
        id: 4,
        name: 'High-Temperature N2 Purging Test Chamber',
        tagline: 'Advanced nitrogen purging system for extreme temperature testing',
        image: prd4,
        description:
          'An advanced chamber with nitrogen purging for oxidation-free, extreme high-temperature testing of sensitive components and materials.',
        specifications: [
          { label: 'Temperature Range', value: 'Ambient to +300°C' },
          { label: 'Purging Medium', value: 'Nitrogen (N2)' },
          { label: 'Oxygen Level Control', value: '< 100 ppm' },
          { label: 'Controller', value: 'Programmable Touch-Screen PLC' },
          { label: 'Power Supply', value: '415V, 3 Phase, 50Hz' },
        ],
        features: [
          'Automated N2 purging and O2 monitoring',
          'Oxidation-free high-temperature environment',
          'High-precision temperature uniformity',
          'Safety interlocks for gas handling',
        ],
        applications: ['Semiconductors', 'Metallurgy', 'Aerospace Materials', 'Specialty Coatings'],
      },
    },
  },
};

export default productVariantsData;