import React from "react";
import {
  Handshake,
  Headphones,
  AlertTriangle,
  GraduationCap,
  Settings,
  Wrench,
  Microscope,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import ServicesSection from "../framework/ServicesSection";

export default function Service() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden " style={{ background: "var(--gradient-brand)" }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6">
  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
    Our Services
  </span>
</h1>

<p className="text-base sm:text-lg text-gray-300 leading-relaxed">
  Sri Easwari Scientific Solution Pvt. Ltd. (SESS) is an ISO & CE certified
  company delivering reliable, high-precision environmental testing solutions.
  We provide end-to-end services tailored to meet industry standards and customer needs.
</p>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 px-6 md:px-16 text-center">
        <p className="max-w-4xl mx-auto text-gray-600 text-lg">
          <span className="text-cyan-400 font-semibold">
            Our Service Support Group offers
          </span>{" "}
          complete engineering and technical support, prompt emergency service,
          instrumentation upgrades, equipment relocation services and more. We
          also offer{" "}
          <span className="text-cyan-400 font-semibold">
            RetroFit –
          </span>{" "}
          an alternative for many long existing systems.
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section className="px-6 md:px-16 space-y-12 pb-16">

        {/* CARD 1 */}
        <ServiceCard
          title="General / Warranty Support"
          content={`SESS chambers comes with warranty which is valid till 12 months from installations or 14 months from invoicing. During the warranty tenure our service engineers will regularly visit your site and will perform general maintenance to ensure uninterrupted testing.`}
        />

        {/* CARD 2 */}
        <ServiceCard
          title="Preventive Maintenance Plan"
          content={`Preventive Maintenance plan is part of annual maintenance contract for periodic maintenance of SESS test chambers. It includes regular visits, emergency support and monitoring of all systems like mechanical, electrical, instrumentation and refrigeration.`}
        />

        {/* CARD 3 */}
        <ServiceCard
          title="Comprehensive Maintenance Plan"
          content={`Comprehensive maintenance plan covers complete service needs including repair, replacement, calibration and performance optimization. All components are thoroughly checked and serviced to ensure optimal performance of the chamber.`}
        />
      </section>

      {/* FEATURE GRID */}
      <ServicesSection />

      {/* ACHIEVEMENTS */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-lg font-bold text-cyan-400 mb-10">
          Our Achievement
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="group">
              <img
                src={`./src/assets/clients/client${item}.jpg`}
                alt="client"
                className="w-full h-28 object-cover rounded-md shadow-md group-hover:scale-105 transition"
                style={{padding: '15px'}}
              />
              <p className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-cyan-400">
                More Details →
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* SERVICE CARD */
function ServiceCard({ title, content }) {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold uppercase text-cyan-400 mb-4">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}