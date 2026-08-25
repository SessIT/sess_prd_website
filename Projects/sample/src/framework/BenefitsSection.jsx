import { motion } from 'framer-motion';

// Benefits Section - "With KLIMA, you can save both time and money"
const BenefitsSection = ({ product }) => {
  const benefits = product.benefits.benefitsList;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 md:py-24">
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
            {product.benefits.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {product.benefits.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto" />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.15)',
              }}
              className="group relative bg-white rounded-xl p-8 border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500 opacity-0 group-hover:opacity-5 rounded-full transform translate-x-10 -translate-y-10 group-hover:-translate-x-8 group-hover:translate-y-8 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-lg mb-6">
            Experience the efficiency and cost savings of KLIMA today
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors duration-200"
          >
            Get a Free Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
