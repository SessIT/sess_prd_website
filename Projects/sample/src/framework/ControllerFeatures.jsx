import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Touchscreen Controller Features Section
const ControllerFeatures = ({ product }) => {
  const controller = product.controller;
  const features = controller.features;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 md:py-24">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {controller.title}
          </h2>
          <p className="text-lg text-gray-600">
            {controller.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={controller.image}
                alt="Touchscreen Controller"
                className="w-full h-auto"
              />
            </div>
            {/* Floating element */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-6 right-2 lg:-right-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl"
            >
              <p className="font-bold text-lg">Intuitive Design</p>
              <p className="text-sm opacity-90">Easy to use interface</p>
            </motion.div>
          </motion.div>

          {/* Right: Features List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={featureVariants}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.2 },
                }}
                className="flex gap-4 group cursor-pointer"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="flex-shrink-0 flex items-center text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Experience Advanced Control Technology
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our intelligent touchscreen controller puts complete testing control at your fingertips with real-time monitoring, precise programming, and remote access capabilities.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-white text-cyan-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Schedule a Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ControllerFeatures;
