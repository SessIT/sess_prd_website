import batteryTestImage from '../assets/product/Battery.webp';
import climaticTestImage from '../assets/product/Climatic_chamber_front.webp';
import saltSprayImage from '../assets/product/Salt Spray.webp';
import rainTestImage from '../assets/product/Rain Test.webp';
import vibrationTestImage from '../assets/product/VibrationChamber.webp';
import thermalCyclicImage from '../assets/product/Thermal Cyclic.webp';
import flameProofImage from '../assets/product/Flame-Proof Hot Air Oven.webp';
import thermalShockImage from '../assets/product/ThermalShockTestChamber.webp';
import tabletopImage from '../assets/product/TabletopChamber.webp';
import walkInImage from '../assets/product/walkin.webp';
import dustImage from '../assets/product/DustChamber.webp';
import tensileImage from '../assets/product/TensileChamber.webp';

const chamberCatalog = [
  {
    key: 'climatic',
    name: 'Climatic Test Chamber',
    image: climaticTestImage,
    description: 'Controlled temperature and humidity testing for reliable environmental validation.',
    link: '/climatic-test-chamber',
  },
  {
    key: 'battery',
    name: 'Battery Test Chamber',
    image: batteryTestImage,
    description: 'Safety-engineered chamber for battery cell, module, and pack testing.',
    link: '/battery-test-chamber',
  },
  {
    key: 'salt-spray',
    name: 'Salt Spray Test Chamber',
    image: saltSprayImage,
    description: 'Corrosion testing chamber for evaluating product durability in salt mist conditions.',
    link: '/salt-spray-test-chamber',
  },
  {
    key: 'rain',
    name: 'Rain Test Chamber',
    image: rainTestImage,
    description: 'Water-ingress test chamber for checking product performance in simulated rain.',
    link: '/rain-test-chamber',
  },
  {
    key: 'vibration',
    name: 'Vibration Combined Climatic Test Chamber',
    image: vibrationTestImage,
    description: 'Combined vibration and climatic testing for demanding product validation.',
    link: '/vibration-test-chamber',
  },
  {
    key: 'thermal-cyclic',
    name: 'Thermal Cycling Chamber',
    image: thermalCyclicImage,
    description: 'Programmable thermal cycling for reliable environmental stress testing.',
    link: '/thermal-cyclic-chamber',
  },
  {
    key: 'flame-proof',
    name: 'Flame-Proof Hot Air Oven',
    image: flameProofImage,
    description: 'Safety-engineered oven for high-temperature testing and drying applications.',
    link: '/flame-proof-hot-air-oven',
  },
  {
    key: 'thermal-shock',
    name: 'Thermal Shock Chamber',
    image: thermalShockImage,
    description: 'Rapid temperature-transition testing for accelerated reliability validation.',
    link: '/thermal-shock-chamber',
  },
  {
    key: 'tabletop',
    name: 'Tabletop Test Chamber',
    image: tabletopImage,
    description: 'Compact environmental testing for smaller samples and components.',
    link: '/tabletop-test-chamber',
  },
  {
    key: 'walk-in',
    name: 'Walk-In Chamber',
    image: walkInImage,
    description: 'Large-scale controlled temperature and humidity testing for complete assemblies.',
    link: '/walk-in-chamber',
  },
  {
    key: 'dust',
    name: 'Dust Chamber',
    image: dustImage,
    description: 'Dust ingress testing for product durability and IP validation.',
    link: '/dust-chamber',
  },
  {
    key: 'tensile',
    name: 'Tensile Chamber',
    image: tensileImage,
    description: 'Temperature-controlled tensile testing for material performance validation.',
    link: '/tensile-chamber',
  },
];

export function getRelatedChambers(currentChamber) {
  const currentIndex = chamberCatalog.findIndex((chamber) => chamber.key === currentChamber);
  const startIndex = currentIndex === -1 ? 0 : currentIndex;

  return Array.from({ length: 4 }, (_, index) => ({
    ...chamberCatalog[(startIndex + index + 1) % chamberCatalog.length],
    id: index + 1,
  }));
}

export function getChamberNameFromPath(path) {
  return chamberCatalog.find((chamber) => chamber.link === path)?.name ?? 'Previous Chamber';
}
