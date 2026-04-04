import React from "react";
import {motion} from 'framer-motion';
import img1 from '../assets/product/1.png'

const ClimaticTestChamber = () => {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: "var(--gradient-brand)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -45, 0],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6 border border-white/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ISO & CE Certified Company
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Climatic test chambera
            </h1>
            <p className="text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed px-4">
              Sri Easwari Scientific Solution Pvt. Ltd. — a pioneering leader in
              environmental test solutions, delivering precision, innovation and
              excellence since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h3 className="text-cyan-600 font-semibold text-lg mb-3">
              Experience Unmatched Precision and Reliability with SESS Climatic Test Chambers!
            </h3>
            <p className="mb-6 text-gray-700">
SESS specializes in manufacturing customized climatic test chambers designed to meet your unique testing needs. From compact tabletop models to expansive walk-in chambers, our products offer a remarkable temperature range from 250°C to -180°C and impressive ramp rates from 0.1°C/min to 100°C/min.            </p>

            <h3 className="text-cyan-600 font-semibold text-lg mb-3">
              Why Choose SESS?
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li><b>Advanced Data Logging:</b> Our test chamber software, powecyan by NI/LabVIEW-based technology, IoT, and remote software, ensures comprehensive data logging and analysis.</li>
              <li><b>Superior Safety and Reliability:</b>Designed with a focus on component life, test specimen safety, and user safety, our chambers promise trouble-free operation 24/7.</li>
              <li><b>Tailocyan Solutions:</b>We welcome and accommodate special requirements, providing bespoke solutions to fit your specific testing parameters.Partner with SESS for state-of-the-art climatic test chambers that deliver precision, safety, and reliability.</li>
            </ul>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src={img1}
              alt="test"
              className="w-full rounded shadow"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">

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

            {/* Circle Bullet */}
            <div className="w-4 h-3 mt-2 border-2 border-white rounded-full"></div>

            {/* Content */}
            <p className="text-[15px] leading-7 text-gray-300">
              <span className="text-cyan-500 font-semibold">
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

            {/* Circle Bullet */}
            <div className="w-4 h-3 mt-2 border-2 border-white rounded-full"></div>

            {/* Content */}
            <p className="text-[15px] leading-7 text-gray-300">
              <span className="text-cyan-500 font-semibold">
                {item.title}:
              </span>{" "}
              {item.desc}
            </p>

          </div>
        ))}
          </div>

        </div>
      </section>

      {/* SPECIFICATIONS */}
      {/* SPECIFICATIONS */}
<section className="bg-gray-100 py-16">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

    {/* LEFT SIDE */}
    <div className="md:col-span-2 space-y-8">

      {/* Title */}
      <h2 className="text-4xl font-semibold text-cyan-500">
        Specifications
      </h2>

      {/* Block */}
      <div>
        <h4 className="text-cyan-500 font-medium mb-2">
          Temperature Range
        </h4>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Low Temperature:</span> Typically from -70°C to -10°C.{" "}
          <span className="font-semibold">High Temperature:</span> Typically from 60°C to 180°C or higher.{" "}
          <span className="font-semibold">Accuracy:</span> ±0.1°C to ±1.0°C.
        </p>
      </div>

      <div>
        <h4 className="text-cyan-500 font-medium mb-2">
          Humidity Range
        </h4>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Relative Humidity:</span> Typically from 10% to 98% RH.{" "}
          <span className="font-semibold">Accuracy:</span> ±2% to ±5% RH.
        </p>
      </div>

      <div>
        <h4 className="text-cyan-500 font-medium mb-2">
          Temperature and Humidity Control
        </h4>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Temperature Stability:</span> ±0.1°C to ±2.0°C.{" "}
          <span className="font-semibold">Humidity Stability:</span> ±1% RH to ±3% RH.
        </p>
      </div>

      <div>
        <h4 className="text-cyan-500 font-medium mb-2">
          Chamber Size
        </h4>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Interior Dimensions:</span> Ranges from small (e.g., 0.5 cubic meters) to large (e.g., 10 cubic meters or more).
        </p>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Load Capacity:</span> Depending on the size, from a few kilograms to several tons.
        </p>
      </div>

      <div>
        <h4 className="text-cyan-500 font-medium mb-2">
          Airflow System
        </h4>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Type:</span> Forced convection, cross-flow, or other designs to ensure uniform distribution of temperature and humidity.
        </p>
        <p className="text-gray-700 leading-7">
          <span className="font-semibold">Air Exchange Rate:</span> Specific to the chamber design, ensuring effective circulation.
        </p>
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="border border-gray-300 p-4 bg-white shadow-sm text-center">

      <a
        href="../assets/Website_Gallery_img/Profile_SESS.pdf"   // 🔥 replace with your actual PDF path
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/products/product6.png" // 🔥 brochure image
          alt="Brochure"
          className="w-full h-auto object-cover hover:scale-105 transition duration-300"
        />
      </a>

      <p className="text-cyan-500 mt-4 font-medium text-lg">
        Download Brochure
      </p>

    </div>

  </div>
</section>

      {/* VARIETIES */}
      <section className="bg-gray-900 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4">

          <h3 className="text-center text-cyan-500 mb-10">
            Varieties of Chambers
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              { img: img1, title: "Thermal Shock Test Chamber" },
              { img: img1, title: "Vibration Test Chamber" },
              { img: img1, title: "Sess Test Chamber" },
            ].map((item, i) => (
              <div key={i} className="relative group overflow-hidden border-b-2 border-cyan-500">
                <img src={`${item.img}`} alt="" />

                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-center p-4 transition">
                  <div>
                    <h4 className="text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-300 mt-2">
                      Description here...
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">

          <h3 className="text-center text-cyan-600 mb-10">
            Other Environmental Test Chambers
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              { img: img1, title: "Salt Spray Test Chamber" },
              { img: img1, title: "Rain Test Chamber" },
              { img: img1, title: "Vibration Test Chamber" },
            ].map((item, i) => (
              <div key={i} className="bg-white shadow hover:shadow-lg transition">
                <img src={`${item.img}`} alt="" />

                <div className="p-4 text-center">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-2">
                    Learn more →
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default ClimaticTestChamber;