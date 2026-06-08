// Static Product Data Structure - Can be easily converted to dynamic later
import prd1 from '../assets/product/Climatic Test Chamber.png';
import prd2 from '../assets/product/CO2 Test Chamber.png';
import prd3 from '../assets/product/Environmetal.png';
import prd4 from '../assets/product/Flame-Proof Hot Air Oven.png';
// import prd5 from '../assets/product/Temperature-Humidity-Chart.jpg';
export const climaticTestChamberProduct = {
  id: 'climatic-test-chamber-klima',
  title: 'Climatic Test Chamber',
  subtitle: 'For Temperature & Humidity Simulations',
  description: 'KLIMA range of Climatic Chambers accurately simulate temperature and humidity conditions within its test space. With its redesigned structure, enhanced refrigeration system, and intelligent controller, KLIMA now delivers even greater efficiency and ensures uninterrupted testing.',
  
  // Hero Section
  hero: {
    backgroundGradient: 'linear-gradient(135deg, rgb(34, 229, 245, 0.95) 0%, rgb(59, 91, 255, 0.95) 100%)',
    tagline: 'Precision-Engineered for Performance',
    mainTitle: 'Climatic Test Chamber',
    subtitle: 'For Temperature & Humidity Simulations',
    ctaText: 'Request Quote',
  },

  // Section 1: Product Details with Images
  productDetails: {
    images: [
      {
        id: 1,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Hiacc_Climatic_Test_Chamber.png',
        alt: 'Climatic Test Chamber Front View',
        title: 'Front View',
      },
      {
        id: 2,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Hiacc_Climatic_Test_Chamber_thump1.png',
        alt: 'Cross-section showing internal components',
        title: 'Internal Components',
      },
      {
        id: 3,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Hiacc_Climatic_test_Chamber_thump2.png',
        alt: 'Side View',
        title: 'Side View',
      },
      {
        id: 4,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Temperature-Chart.jpg',
        alt: 'Temperature Control Chart',
        title: 'Temperature Chart',
      },
      {
        id: 5,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Temperature-Humidity-Chart.jpg',
        alt: 'Temperature and Humidity Chart',
        title: 'Temperature-Humidity Chart',
      },
    ],
    overview: [
      'Featuring an optimized heating and cooling system, KLIMA offers superior performance and energy efficiency.',
      'The chamber can be tailored to meet various test standards, providing versatility for diverse testing needs.',
      'It boasts a larger viewing window, ports for live specimen testing, a visual alarm system for added safety, improved mobility, and a compact footprint for space-saving convenience.',
    ],
    keyFeatures: [
      {
        icon: '🌡️',
        title: 'Temperature Range',
        description: '-70°C to +180°C (Cascade) & -40°C to +180°C (Single)',
      },
      {
        icon: '💧',
        title: 'Humidity Range',
        description: '10% RH to 98% RH',
      },
      {
        icon: '📊',
        title: 'Advanced Control',
        description: 'Intelligent controller with TCP/IP and Serial Communication',
      },
      {
        icon: '🔒',
        title: 'Safety Features',
        description: 'Lockable one-handed door latch with visual alarm system',
      },
    ],
  },

  // Section 2: Benefits Section
  benefits: {
    title: 'With KLIMA, You Can Save Both Time and Money',
    subtitle: 'Maximize efficiency while minimizing operational costs',
    benefitsList: [
      {
        id: 1,
        title: 'Energy Efficiency',
        description: 'Energy saving refrigerants R404A and R23 reduce operational costs',
        icon: '⚡',
      },
      {
        id: 2,
        title: 'Frost-Free Operation',
        description: 'Automatic frost removal system ensures continuous testing without interruptions',
        icon: '❄️',
      },
      {
        id: 3,
        title: 'Enhanced Performance',
        description: 'Optimized heating and cooling system delivers superior test results faster',
        icon: '🚀',
      },
      {
        id: 4,
        title: 'Reduced Maintenance',
        description: 'Three-sided component access and easy maintenance design',
        icon: '🔧',
      },
      {
        id: 5,
        title: 'Space Saving',
        description: 'Compact footprint design fits seamlessly in any laboratory',
        icon: '📐',
      },
      {
        id: 6,
        title: 'Superior Durability',
        description: 'Non-settling rigid stone wool insulation and heavy-duty construction',
        icon: '💪',
      },
    ],
  },

  // Section 3: Technical Specifications - KLIMA Models Complete Table
  specifications: {
    title: 'Technical Specifications',
    isTable: true,
    models: [
      'KLIMA-120/-40C/3K',
      'KLIMA-120/-70C/3K',
      'KLIMA-225/-40C/3K',
      'KLIMA-225/-70C/3K',
      'KLIMA-340/-40C/3K',
      'KLIMA-340/-70C/3K',
      'KLIMA-450/-40C/3K',
      'KLIMA-450/-70C/3K',
      'KLIMA-600/-40C/3K',
      'KLIMA-600/-70C/3K',
      'KLIMA-1000/-40C/3K',
      'KLIMA-1000/-70C/3K',
      'KLIMA-1500/-40C/3K',
      'KLIMA-1500/-70C/3K',
    ],
    specs: [
      {
        category: 'TEST SPACE DIMENSIONS',
        items: [
          {
            label: 'Test space volume',
            unit: 'L',
            values: ['120', '120', '225', '225', '340', '340', '448', '448', '612', '612', '1000', '1000', '1500', '1500'],
          },
          {
            label: 'Width',
            unit: 'mm',
            values: ['500', '500', '600', '600', '700', '700', '700', '700', '800', '800', '1000', '1000', '1000', '1000'],
          },
          {
            label: 'Depth',
            unit: 'mm',
            values: ['400', '400', '500', '500', '600', '600', '800', '800', '850', '850', '1000', '1000', '1500', '1500'],
          },
          {
            label: 'Height',
            unit: 'mm',
            values: ['600', '600', '750', '750', '800', '800', '800', '800', '900', '900', '1000', '1000', '1000', '1000'],
          },
        ],
      },
      {
        category: 'PERFORMANCE DATA FOR TEMPERATURE TESTS',
        items: [
          {
            label: 'Maximum temperature',
            unit: '°C',
            values: ['180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180'],
          },
          {
            label: 'Minimum temperature discontinuous',
            unit: '°C',
            values: ['-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70'],
          },
          {
            label: 'Rate of temperature change, cooling',
            unit: '°C/min',
            values: ['3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3'],
          },
          {
            label: 'Rate of temperature change, heating',
            unit: '°C/min',
            values: ['3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5'],
          },
          {
            label: 'Temperature control accuracy, in time',
            unit: '°C',
            values: ['±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1'],
          },
          {
            label: 'Heat compensation, max. at +20°C',
            unit: 'W',
            values: ['850', '1000', '850', '1000', '900', '1100', '900', '1100', '1000', '1200', '1000', '1200', '1000', '1200'],
          },
        ],
      },
      {
        category: 'PERFORMANCE DATA FOR CLIMATE TESTS',
        items: [
          {
            label: 'Maximum temperature',
            unit: '°C',
            values: ['85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85'],
          },
          {
            label: 'Minimum temperature',
            unit: '°C',
            values: ['10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10'],
          },
          {
            label: 'Humidity range',
            unit: '%RH',
            values: ['10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98'],
          },
          {
            label: 'Humidity deviation, in time',
            unit: '%RH',
            values: ['±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3'],
          },
          {
            label: 'Temperature deviation, in time',
            unit: '%RH',
            values: ['±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3'],
          },
          {
            label: 'Test Standard Compliance',
            unit: '',
            values: ['IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards'],
          },
        ],
      },
      {
        category: 'TEST SPACE LOADING CAPACITY',
        items: [
          {
            label: 'Load, max.',
            unit: 'kg',
            values: ['80', '80', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100'],
          },
          {
            label: 'Load per grid',
            unit: 'kg',
            values: ['20', '20', '20', '20', '25', '25', '25', '25', '30', '30', '30', '30', '30', '30'],
          },
          {
            label: 'Possible number of insert grids',
            unit: 'piece',
            values: ['4', '4', '5', '5', '6', '6', '6', '6', '7', '7', '7', '7', '7', '7'],
          },
        ],
      },
      {
        category: 'POWER/CONNECTION DATA',
        items: [
          {
            label: 'Voltage rating',
            unit: 'V',
            values: ['3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz'],
          },
          {
            label: 'Connected Load',
            unit: 'kW',
            values: ['8.5', '11', '9.5', '12', '10', '13', '11.5', '14', '14.5', '17', '16', '19.5', '17', '20'],
          },
          {
            label: 'Sound pressure level',
            unit: 'dB(A)',
            values: ['72', '74', '72', '74', '72', '74', '73', '74', '73', '74', '73', '74', '73', '74'],
          },
          {
            label: 'Total weight',
            unit: 'kg',
            values: ['450', '500', '490', '540', '540', '600', '600', '680', '720', '780', '820', '900', '900', '1000'],
          },
          {
            label: 'Refrigerant System',
            unit: 'type',
            values: ['R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23'],
          },
        ],
      },
    ],
  },

  // Section 4: Controller Features
  controller: {
    title: 'Touchscreen Intelligent Controller',
    subtitle: 'Advanced control system for precision testing',
    image: 'https://via.placeholder.com/400x300?text=Touchscreen+Controller',
    features: [
      {
        id: 1,
        title: 'Intuitive Touchscreen Interface',
        description: 'User-friendly design makes setup and operation simple for technicians of all levels',
        icon: '📱',
      },
      {
        id: 2,
        title: 'Real-time Data Logging',
        description: 'Continuous monitoring and recording of all chamber parameters with high precision',
        icon: '📊',
      },
      {
        id: 3,
        title: 'Programmable Test Cycles',
        description: 'Create and save custom test profiles for repeatability and consistency',
        icon: '⚙️',
      },
      {
        id: 4,
        title: 'Remote Monitoring',
        description: 'TCP/IP connectivity enables remote access and control from anywhere',
        icon: '🌐',
      },
      {
        id: 5,
        title: 'Advanced Alarms',
        description: 'Visual and audible alarms alert operators to any deviations or issues',
        icon: '🚨',
      },
      {
        id: 6,
        title: 'Data Export',
        description: 'Export test data in multiple formats for analysis and compliance reporting',
        icon: '💾',
      },
    ],
  },

  // Section 5: Related Products
  relatedProducts: [
    {
      id: 1,
      name: '32,000L Packaging Simulation Chamber',
      image: prd1,
      description: 'Large-scale chamber for packaging testing and simulation',
      link: '#',
    },
    {
      id: 2,
      name: '4500L Conditioning Chamber for Food Process',
      image: prd2,
      description: 'Specialized chamber for food industry testing and conditioning',
      link: '#',
    },
    {
      id: 3,
      name: '2340L Television Testing Climatic Chamber',
      image: prd3,
      description: 'Optimized for electronics and television product testing',
      link: '#',
    },
    {
      id: 4,
      name: 'High-Temperature N2 Purging Test Chamber',
      image: prd4,
      description: 'Advanced nitrogen purging system for extreme temperature testing',
      link: '#',
    },
  ],

  // Compliance & Standards
  standards: [
    {
      title: 'IEC Standards',
      items: [
        'IEC 60068-2-30: Environmental testing Part 2-30',
        'IEC 60068-2-78: Environmental testing Part 2-78',
        'IEC 60068-2-1: Cold test',
        'IEC 60068-2-2: Dry heat test',
        'IEC 60068-2-14: Change of temperature test',
      ],
    },
    {
      title: 'ISO Standards',
      items: [
        'ISO 9000 Part II Sec. 1 to 4, 1977',
        'ISO 9000 Part IV, 2008',
        'ISO 9000 Part V Sec. 1 & 2, 1981',
        'ISO 9000 Part VI, 1978',
      ],
    },
  ],
};

// Export function to get product data - ready for dynamic implementation
export const getProductData = (productId) => {
  // In future, this will fetch from API or database
  if (productId === 'climatic-test-chamber') {
    return climaticTestChamberProduct;
  }
  return null;
};
