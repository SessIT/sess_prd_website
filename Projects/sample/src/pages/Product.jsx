import React, { useState, useEffect, useRef } from "react";
import {motion} from 'framer-motion';
import img1 from '../assets/product/Environmetal.webp'
import ProductsSection from "../framework/ProductsSection";

const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: color,
      opacity: 0.15
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.1, 0.25, 0.1],
      scale: [1, 1.3, 1]
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }}
  />
);

const Products = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    
      useEffect(() => {
        const handle = (e) => {
          setMousePos({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
          });
        };
        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
      }, []);
    
      const particles = [
        { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
        { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
        { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
        { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
        { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
        { x: 65, y: 40, size: 55, delay: 3, color: 'rgb(2 174 178)' }
      ];

  return (
    <div className="w-full">

      {/* HERO SECTION */}
                               <section
                                 ref={heroRef}
                                 className="relative overflow-hidden text-white"
                                 style={{ background: 'var(--gradient-brand)', minHeight: '340px', display: 'flex', alignItems: 'center' }}
                               >
                                 {[
                                   { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
                                   { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
                                   { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
                                 ].map((b, i) => (
                                   <motion.div
                                     key={i}
                                     className="absolute rounded-full mix-blend-multiply filter blur-3xl"
                                     style={{
                                       width: b.w, height: b.w,
                                       background: b.color,
                                       top: b.top, bottom: b.bottom, left: b.left, right: b.right,
                                       opacity: 0.18,
                                     }}
                                     animate={{
                                       x: (mousePos.x - 0.5) * (20 + i * 10),
                                       y: (mousePos.y - 0.5) * (15 + i * 8),
                                       scale: [1, 1.12, 1],
                                     }}
                                     transition={{
                                       x: { type: 'spring', stiffness: 30, damping: 20 },
                                       y: { type: 'spring', stiffness: 30, damping: 20 },
                                       scale: { duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' },
                                     }}
                                   />
                                 ))}
                         
                                 {particles.map((p, i) => <Particle key={i} {...p} />)}
                         
                                 <div
                                   className="absolute inset-0 opacity-[0.04]"
                                   style={{
                                     backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                                     backgroundSize: '48px 48px',
                                   }}
                                 />
                         
                                 <div className="relative w-full px-4 py-20 mx-auto max-w-7xl 2xl:max-w-[1440px] sm:px-6 lg:px-8">
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
                                       Precision-Engineered for Performance.
                                     </motion.div>
                         
                                     <motion.h1
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                       className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-white to-blue-200">
                                       Products
                                     </motion.h1>
                         
                                     <motion.p
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                       transition={{ delay: 0.45, duration: 0.6 }}
                                       className="px-4 text-base leading-relaxed text-gray-200 sm:text-lg md:text-lg">
                                       Discover high-performance climatic test chambers and industrial refrigeration systems for diverse applications.
                                     </motion.p>
                                   </motion.div>
                                 </div>
                               </section>

                               <ProductsSection />

      {/* INTRO SECTION */}
      {/* <section className="py-12">
        <div className="grid items-center max-w-6xl gap-10 px-4 mx-auto md:grid-cols-2">

          {/* TEXT *}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-cyan-600">
              Experience Unmatched Precision and Reliability with SESS Climatic Test Chambers!
            </h3>
            <p className="mb-6 text-gray-700">
SESS specializes in manufacturing customized climatic test chambers designed to meet your unique testing needs. From compact tabletop models to expansive walk-in chambers, our products offer a remarkable temperature range from 250°C to -180°C and impressive ramp rates from 0.1°C/min to 100°C/min.            </p>

            <h3 className="mb-3 text-lg font-semibold text-cyan-600">
              Why Choose SESS?
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li><b>Advanced Data Logging:</b> Our test chamber software, powecyan by NI/LabVIEW-based technology, IoT, and remote software, ensures comprehensive data logging and analysis.</li>
              <li><b>Superior Safety and Reliability:</b>Designed with a focus on component life, test specimen safety, and user safety, our chambers promise trouble-free operation 24/7.</li>
              <li><b>Tailocyan Solutions:</b>We welcome and accommodate special requirements, providing bespoke solutions to fit your specific testing parameters.Partner with SESS for state-of-the-art climatic test chambers that deliver precision, safety, and reliability.</li>
            </ul>
          </div>

          {/* IMAGE *}
          <div>
            <img
              src={img1}
              alt="test"
              className="w-full rounded shadow"
            />
          </div>

        </div>
      </section> */}

      {/* FEATURES SECTION */}
      {/* <section className="py-12 text-white bg-gray-900">
        <div className="grid max-w-6xl gap-10 px-4 mx-auto md:grid-cols-2">

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Climatic Test Chamber Key Features</h3>

            {[
          {
            title: "Temperature Control",
            desc: "Ability to maintain and control a wide range of temperatures, both high and low, to simulate different climatic conditions."
          },
          {
            title: "Humidity Control",
            desc: "Controls and monitors relative humidity levels to test the effects of moisture on materials and products."
          },
          {
            title: "Energy Efficiency",
            desc: "Features designed to minimize energy consumption while maintaining precise environmental conditions."
          },
          {
            title: "Airflow Management",
            desc: "Ensures proper circulation of air within the chamber to evenly distribute temperature and humidity, and to avoid hot or cold spots."
          },
          {
            title: "User Interface",
            desc: " A control panel or software interface for setting up and programming test conditions, monitoring progress, and accessing data."
          }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">

            {/* Circle Bullet *}
            <div className="w-4 h-3 mt-2 border-2 border-white rounded-full"></div>

            {/* Content *}
            <p className="text-[15px] leading-7 text-gray-300">
              <span className="font-semibold text-cyan-500">
                {item.title}:
              </span>{" "}
              {item.desc}
            </p>

          </div>
        ))}
          </div>

          <div className="space-y-3">
            {[
          {
            title: "Testing Size and Capacity",
            desc: "Various chamber sizes and capacities are available to accommodate different types and sizes of products."
          },
          {
            title: "Safety Features",
            desc: "Includes alarms, shut-off systems, and safety interlocks to protect both the equipment and the operator."
          },
          {
            title: "Temperature and Humidity Cycles",
            desc: "Ability to create and maintain specific temperature and humidity cycles, including rapid changes, to test the product's durability and reliability over time."
          },
          {
            title: "Instrumentation and Monitoring",
            desc: "Equipped with sensors, data loggers, and control systems to monitor and record temperature, humidity, and other environmental parameters."
          },
          {
            title: "Compliance",
            desc: "Often designed to meet industry standards and regulations for environmental testing, such as those from ASTM, ISO, or IEC."
          }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">

            {/* Circle Bullet *}
            <div className="w-4 h-3 mt-2 border-2 border-white rounded-full"></div>

            {/* Content *}
            <p className="text-[15px] leading-7 text-gray-300">
              <span className="font-semibold text-cyan-500">
                {item.title}:
              </span>{" "}
              {item.desc}
            </p>

          </div>
        ))}
          </div>

        </div>
      </section> */}

      {/* SPECIFICATIONS */}
      {/* SPECIFICATIONS */}
{/* <section className="py-16 bg-gray-100">
  <div className="grid gap-12 px-6 mx-auto max-w-7xl 2xl:max-w-[1440px] md:grid-cols-3">

    <div className="space-y-8 md:col-span-2">

      <h2 className="text-4xl font-semibold text-cyan-500">
        Specifications
      </h2>

      <div>
        <h4 className="mb-2 font-medium text-cyan-500">
          Temperature Range
        </h4>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Low Temperature:</span> Typically from -70°C to -10°C.{" "}
          <span className="font-semibold">High Temperature:</span> Typically from 60°C to 180°C or higher.{" "}
          <span className="font-semibold">Accuracy:</span> ±0.1°C to ±1.0°C.
        </p>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-cyan-500">
          Humidity Range
        </h4>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Relative Humidity:</span> Typically from 10% to 98% RH.{" "}
          <span className="font-semibold">Accuracy:</span> ±2% to ±5% RH.
        </p>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-cyan-500">
          Temperature and Humidity Control
        </h4>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Temperature Stability:</span> ±0.1°C to ±2.0°C.{" "}
          <span className="font-semibold">Humidity Stability:</span> ±1% RH to ±3% RH.
        </p>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-cyan-500">
          Chamber Size
        </h4>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Interior Dimensions:</span> Ranges from small (e.g., 0.5 cubic meters) to large (e.g., 10 cubic meters or more).
        </p>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Load Capacity:</span> Depending on the size, from a few kilograms to several tons.
        </p>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-cyan-500">
          Airflow System
        </h4>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Type:</span> Forced convection, cross-flow, or other designs to ensure uniform distribution of temperature and humidity.
        </p>
        <p className="leading-7 text-gray-700">
          <span className="font-semibold">Air Exchange Rate:</span> Specific to the chamber design, ensuring effective circulation.
        </p>
      </div>

    </div>
    <div className="p-4 text-center bg-white border border-gray-300 shadow-sm">

      <a
        href="../assets/Website_Gallery_img/Profile_SESS.pdf"   // 🔥 replace with your actual PDF path
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/products/product6.png" // 🔥 brochure image
          alt="Brochure"
          className="object-cover w-full h-auto transition duration-300 hover:scale-105"
        />
      </a>

      <p className="mt-4 text-lg font-medium text-cyan-500">
        Download Brochure
      </p>

    </div>

  </div>
</section> */}

      {/* VARIETIES */}
      {/* <section className="py-12 text-white bg-gray-900">
        <div className="max-w-6xl px-4 mx-auto">

          <h3 className="mb-10 text-center text-cyan-500">
            Varieties of Chambers
          </h3>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              { img: img1, title: "Thermal Shock Test Chamber" },
              { img: img1, title: "Vibration Test Chamber" },
              { img: img1, title: "Sess Test Chamber" },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden border-b-2 group border-cyan-500">
                <img src={`${item.img}`} alt="" />

                <div className="absolute inset-0 flex items-center justify-center p-4 text-center transition opacity-0 bg-black/70 group-hover:opacity-100">
                  <div>
                    <h4 className="text-lg">{item.title}</h4>
                    <p className="mt-2 text-sm text-gray-300">
                      Description here...
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section> */}

      {/* OTHER PRODUCTS */}
      {/* <section className="py-12 bg-gray-100">
        <div className="max-w-6xl px-4 mx-auto">

          <h3 className="mb-10 text-center text-cyan-600">
            Other Environmental Test Chambers
          </h3>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              { img: img1, title: "Salt Spray Test Chamber" },
              { img: img1, title: "Rain Test Chamber" },
              { img: img1, title: "Vibration Test Chamber" },
            ].map((item, i) => (
              <div key={i} className="transition bg-white shadow hover:shadow-lg">
                <img src={`${item.img}`} alt="" />

                <div className="p-4 text-center">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Learn more →
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Products;